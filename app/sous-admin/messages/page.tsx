"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Search, Trash2, Edit, Eye } from 'lucide-react';
import adminsData from '@/data/admins.json';
import MessageForm from '@/components/dashboard/sous-admin/MessageForm';
import type { Message } from '@/types/sousadmin';

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchDate, setSearchDate] = useState<string>('');
  const [filterNiveau, setFilterNiveau] = useState<string>('tous');
  const [messageToEdit, setMessageToEdit] = useState<Message | null>(null);

  useEffect(() => {
    setMessages((adminsData.messages || []) as Message[]);
  }, []);

  // Get unique niveaux from destinataires (sans 'tous' pour éviter le doublon)
  const uniqueNiveaux = [...new Set(messages.map(msg => {
    if (msg.destinataire.includes('L1')) return 'L1';
    if (msg.destinataire.includes('L2')) return 'L2';
    if (msg.destinataire.includes('L3')) return 'L3';
    if (msg.destinataire.includes('Master')) return 'Master';
    return 'tous';
  }))].filter(niveau => niveau !== 'tous');

  const filteredMessages = messages.filter(msg => {
    const msgDate = new Date(msg.dateEnvoi).toISOString().split('T')[0];
    const dateFilter = !searchDate || msgDate === searchDate;
    
    let niveauFilter = filterNiveau === 'tous';
    if (filterNiveau !== 'tous') {
      if (filterNiveau === 'L1' && msg.destinataire.includes('L1')) niveauFilter = true;
      if (filterNiveau === 'L2' && msg.destinataire.includes('L2')) niveauFilter = true;
      if (filterNiveau === 'L3' && msg.destinataire.includes('L3')) niveauFilter = true;
      if (filterNiveau === 'Master' && (msg.destinataire.includes('Master') || msg.destinataire.includes('Master'))) niveauFilter = true;
    }
    
    return dateFilter && niveauFilter;
  });

  const handleSendMessage = (data: any) => {
    if (messageToEdit) {
      // Mode édition
      setMessages(prev => prev.map(msg => msg.id === messageToEdit.id ? {
        ...messageToEdit,
        destinataire: data.destinataire,
        contenu: data.contenu,
        dateEnvoi: new Date().toISOString()
      } : msg));
      setMessageToEdit(null);
    } else {
      // Mode ajout
      const newMessage = {
        id: `msg_${Date.now()}`,
        expediteur: 'sousadmin_001',
        nomExpediteur: 'Votre Nom',
        destinataire: data.destinataire,
        contenu: data.contenu,
        dateEnvoi: new Date().toISOString(),
        type: 'envoye' as const
      };
      setMessages(prev => [newMessage, ...prev]);
    }
  };

  const deleteMessage = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      setMessages(prev => prev.filter(msg => msg.id !== id));
    }
  };

  const handleEditMessage = (message: Message) => {
    setMessageToEdit(message);
  };

  return (
    <div className="space-y-6 ">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-gray-900 to-blue-900 bg-clip-text dark:text-gray-300">
            Messages
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Gérez vos communications avec les étudiants</p>
        </div>
        <MessageForm onSend={handleSendMessage} messageToEdit={messageToEdit} />
      </div>

      {/* Filtres et recherche */}
      <Card className="border-blue-100">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex-1">
              <h3 className="text-sm dark:text-gray-300 font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Search className="h-4 w-4 text-blue-600" />
                Filtrer les messages
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">Recherche par date</label>
                  <Input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="w-full"
                    placeholder="Sélectionner une date"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchDate('')}
                    className="whitespace-nowrap text-xs sm:text-sm px-2 sm:px-4"
                  >
                    Réinitialiser
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600">Filtrer par niveau:</span>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={filterNiveau === 'tous' ? 'default' : 'outline'} 
                  onClick={() => setFilterNiveau('tous')}
                  size="sm"
                  className="whitespace-nowrap text-xs sm:text-sm"
                >
                  Tous
                </Button>
                {uniqueNiveaux.map(niveau => (
                  <Button 
                    key={niveau}
                    variant={filterNiveau === niveau ? 'default' : 'outline'} 
                    onClick={() => setFilterNiveau(niveau)}
                    size="sm"
                    className="whitespace-nowrap text-xs sm:text-sm"
                  >
                    {niveau}
                  </Button>
                ))}
              </div>
            </div>
          {(searchDate || filterNiveau !== 'tous') && (
            <div className="p-2 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                Filtres actifs: {searchDate && `Date: ${searchDate}`} {filterNiveau !== 'tous' && `Niveau: ${filterNiveau}`}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>

      {/* Liste des messages */}
      <div className="grid gap-4 ">
        {filteredMessages.map((message) => (
          <Card key={message.id} className="hover:shadow-md hover:shadow-blue-100 transition-all border-blue-50 hover:border-blue-200">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-300">{message.nomExpediteur}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{message.destinataire}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={message.type === 'envoye' ? 'default' : 'secondary'}>
                  {message.type.toUpperCase()}
                </Badge>
                {message.type !== 'envoye' && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditMessage(message)}
                    className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed dark:text-gray-300">{message.contenu}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300">
                <span>{new Date(message.dateEnvoi).toLocaleString('fr-FR')}</span>
                <div className="flex gap-1 ml-auto">
                  {message.type !== 'envoye' && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 p-0  hover:bg-green-50 text-green-500 hover:text-green-600" 
                      onClick={() => alert(message.contenu)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
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
              <MessageForm onSend={handleSendMessage} messageToEdit={messageToEdit} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

