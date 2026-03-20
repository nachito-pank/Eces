"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Search, Trash2, Edit, Eye, PenSquare, Calendar, Send, Filter, Sparkles, TrendingUp } from 'lucide-react';
import adminsData from '@/data/admins.json';
import MessageForm from '@/components/dashboard/sous-admin/MessageForm';
import type { Message } from '@/types/sousadmin';

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchDate, setSearchDate] = useState<string>('');
  const [filterNiveau, setFilterNiveau] = useState<string>('tous');
  const [messageToEdit, setMessageToEdit] = useState<Message | null>(null);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);

  useEffect(() => {
    setMessages((adminsData.messages || []) as Message[]);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowFloatingButton(scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      setShowMessageForm(false);
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
      setShowMessageForm(false);
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
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-blue-900/20">
      <div className="space-y-6 relative">
        {/* Bouton flottant pour écrire un message */}
        <AnimatePresence>
          {showFloatingButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={() => setShowMessageForm(true)}
              className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full p-3 sm:p-4 shadow-xl transition-all duration-300 flex items-center gap-1 sm:gap-2"
            >
              <PenSquare className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline text-xs sm:text-sm font-medium">Nouveau message</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Modal pour le formulaire de message */}
        <AnimatePresence>
          {showMessageForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-2 sm:p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 w-full max-w-md max-h-[85vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg sm:text-xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {messageToEdit ? 'Modifier le message' : 'Nouveau message'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowMessageForm(false);
                      setMessageToEdit(null);
                    }}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <MessageForm onSend={handleSendMessage} messageToEdit={messageToEdit} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl text-white shadow-lg shadow-blue-500/25">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Messages
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Gérez vos communications avec les étudiants</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <MessageForm onSend={handleSendMessage} messageToEdit={messageToEdit} />
          </div>
        </motion.div>

        {/* Filtres et recherche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-blue-200/50 dark:border-blue-800/30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-linear-to-br from-orange-500 to-pink-600 rounded-xl text-white">
                  <Filter className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Filtres</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Filtrer par date"
                  />
                </div>
                <select
                  value={filterNiveau}
                  onChange={(e) => setFilterNiveau(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="tous">Tous les niveaux</option>
                  {uniqueNiveaux.map((niveau) => (
                    <option key={niveau} value={niveau}>{niveau}</option>
                  ))}
                </select>
                <div className="flex items-center justify-center px-4 py-2 bg-linear-to-r from-blue-100 to-indigo-100 dark:from-blue-900/60 dark:to-indigo-900/60 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                      {filteredMessages.length} message{filteredMessages.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Liste des messages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {message.contenu.substring(0, 50)}...
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className={`${
                            message.type === 'envoye' 
                              ? 'bg-linear-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/60 dark:to-emerald-900/60 dark:text-green-300'
                              : 'bg-linear-to-r from-gray-100 to-slate-100 text-gray-800 dark:from-gray-800/60 dark:to-slate-800/60 dark:text-gray-300'
                          }`}>
                            {message.type}
                          </Badge>
                          <Badge className="bg-linear-to-r from-blue-100 to-indigo-100 text-blue-800 dark:from-blue-900/60 dark:to-indigo-900/60 dark:text-blue-300">
                            {message.destinataire}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {message.contenu}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(message.dateEnvoi).toLocaleDateString()}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditMessage(message)}
                          className="hover:bg-blue-50 dark:hover:bg-blue-900/30 border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Modifier
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteMessage(message.id)}
                          className="hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredMessages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-10 w-10 text-gray-400 dark:text-gray-500" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-gray-400" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">Aucun message trouvé</p>
              <Sparkles className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Essayez de modifier vos filtres ou d'envoyer un nouveau message
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

