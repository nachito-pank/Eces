"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, Search, Trash2, Edit } from 'lucide-react';
import sousAdminsData from '@/data/sous-admins.json';
import MessageForm from '@/components/dashboard/sous-admin/MessageForm';
import type { Message } from '@/components/dashboard/types/sousadmin';

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'tous' | 'envoye'>('tous');

  useEffect(() => {
    setMessages(sousAdminsData.messages || []);
  }, []);

  const filteredMessages = messages.filter(msg => 
    msg.contenu.toLowerCase().includes(search.toLowerCase()) &&
    (filterType === 'tous' || msg.type === filterType)
  );

  const handleSendMessage = (data: any) => {
    const newMessage = {
      id: `msg_${Date.now()}`,
      expedition: 'sousadmin_001',
      nomExpediteur: 'Votre Nom',
      destinataire: data.destinataire,
      contenu: data.contenu,
      dateEnvoi: new Date().toISOString(),
      type: 'envoye' as const
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            Messages
          </h1>
          <p className="text-gray-600 mt-1">Gérez vos communications avec les étudiants</p>
        </div>
        <MessageForm onSend={handleSendMessage} />
      </div>

      {/* Filtres et recherche */}
      <Card className="border-blue-100">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <Input
              placeholder="Rechercher un message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md flex-1"
              icon={<Search className="h-4 w-4 ml-3 text-gray-400" />}
            />
            <div className="flex gap-2">
              <Button 
                variant={filterType === 'tous' ? 'default' : 'outline'} 
                onClick={() => setFilterType('tous')}
                className="whitespace-nowrap"
              >
                Tous
              </Button>
              <Button 
                variant={filterType === 'envoye' ? 'default' : 'outline'} 
                onClick={() => setFilterType('envoye')}
                className="whitespace-nowrap"
              >
                Envoyés
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des messages */}
      <div className="grid gap-4">
        {filteredMessages.map((message) => (
          <Card key={message.id} className="hover:shadow-md hover:shadow-blue-100 transition-all border-blue-50 hover:border-blue-200">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{message.nomExpediteur}</h3>
                    <p className="text-sm text-gray-500">{message.destinataire}</p>
                  </div>
                </div>
                <Badge variant={message.type === 'envoye' ? 'default' : 'secondary'}>
                  {message.type.toUpperCase()}
                </Badge>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">{message.contenu}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{new Date(message.dateEnvoi).toLocaleString('fr-FR')}</span>
                <div className="flex gap-1 ml-auto">
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-100">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-red-50 text-red-500 hover:text-red-600" onClick={() => deleteMessage(message.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredMessages.length === 0 && (
          <Card>
            <CardContent className="text-center py-16">
              <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun message</h3>
              <p className="text-gray-500 mb-6">Commencez par envoyer votre premier message aux étudiants</p>
              <MessageForm onSend={handleSendMessage} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

