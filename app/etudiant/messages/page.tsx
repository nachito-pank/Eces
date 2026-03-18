"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import adminsData from '@/data/admins.json';
import { Send, Users, Search, Hash, Paperclip, Smile, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const etudiant = (adminsData as any).etudiants?.[1] || (adminsData as any).etudiants?.[0] || { nom: "Moi", filiere: "Général", niveau: "" };
  const groupName = `${etudiant.filiere} ${etudiant.niveau ? '- ' + etudiant.niveau : ''}`.trim();

  useEffect(() => {
    const rawMessages = (adminsData as any).messages || [];
    // Pour simuler un chat, on inverse l'ordre des messages entrants (les plus récents en bas)
    setMessages([...rawMessages].reverse());
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: `msg_${Date.now()}`,
      expediteur: 'moi',
      nomExpediteur: etudiant.nom || 'Moi',
      contenu: newMessage.trim(),
      dateEnvoi: new Date().toISOString(),
      type: 'envoye' // On se sert du type envoye pour marquer les messages de l'utilisateur actif dans la discussion
    };

    setMessages([...messages, msg]);
    setNewMessage('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <main className="w-full min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] p-4 md:p-8 font-sans flex flex-col">
      <motion.div 
        className="max-w-6xl mx-auto w-full flex-1 flex flex-col space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* En-tête : Informations du Groupe (Filière) */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-900/80 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-[1.2rem] bg-gradient-to-br from-indigo-500 to-[#033481] flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
              <Hash className="w-7 h-7" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[10px] font-black tracking-[0.2em] text-[#55719e] dark:text-blue-400 uppercase mb-1">
                Espace de Discussion
              </p>
              <h1 className="text-2xl font-extrabold tracking-tight text-[#0A2540] dark:text-white flex items-center gap-2">
                Groupe {groupName}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
            <div className="flex flex-col items-center md:mr-2">
              <div className="flex -space-x-3 mb-1">
                <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">AK</div>
                <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700">ML</div>
                <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-amber-100 flex items-center justify-center text-[10px] font-bold text-amber-700">SJ</div>
              </div>
              <p className="text-[10px] font-bold text-[#55719e] uppercase tracking-widest"><Users className="w-3 h-3 inline mr-1" strokeWidth={2.5}/> 42 Membres</p>
            </div>
            <button className="w-11 h-11 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-[#55719e] transition-colors shadow-sm border border-slate-200 dark:border-slate-700">
              <Search className="w-5 h-5" />
            </button>
            <button className="w-11 h-11 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-[#55719e] transition-colors shadow-sm border border-slate-200 dark:border-slate-700">
              <Info className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Zone de Chat Principale */}
        <motion.div variants={itemVariants} className="flex-1 bg-white dark:bg-slate-900/50 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800/60 overflow-hidden flex flex-col min-h-[500px]">
          
          {/* Fil de Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
            {/* Note de bienvenue / séparateur de date */}
            <div className="flex items-center justify-center mb-8">
              <span className="px-4 py-1.5 bg-[#F8FAFC] dark:bg-slate-800/50 rounded-full text-[10px] font-black text-[#55719e] uppercase tracking-widest border border-slate-200 dark:border-slate-700">
                Début de l'année scolaire
              </span>
            </div>

            {messages.map((message, idx) => {
              const isMe = message.type === 'envoye';
              const initiales = message.nomExpediteur ? message.nomExpediteur.substring(0, 2).toUpperCase() : 'EC';
              const time = new Date(message.dateEnvoi).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
              
              // On affiche l'avatar uniquement s'il n'y a pas deux messages de suite de la même personne
              const showAvatar = !isMe && (idx === 0 || messages[idx - 1].nomExpediteur !== message.nomExpediteur);
              // Marge réduite si les messages se suivent
              const isConsecutive = !isMe && idx > 0 && messages[idx - 1].nomExpediteur === message.nomExpediteur;
              
              return (
                <div key={message.id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'} ${isConsecutive ? '-mt-4' : ''}`}>
                  <div className={`flex gap-3 max-w-[85%] md:max-w-[70%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    {/* Avatar (seulement pour les autres) */}
                    {!isMe && (
                      <div className="separator shrink-0 w-10 2xl:w-12 flex flex-col justify-end">
                        {showAvatar && (
                          <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 text-[#0A2540] dark:text-white flex items-center justify-center text-xs font-black tracking-wider shadow-sm mt-1 border border-slate-100 dark:border-slate-600">
                            {initiales}
                          </div>
                        )}
                      </div>
                    )}

                    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      {/* Nom et Heure (afficher si avatar visible) */}
                      {!isMe && showAvatar && (
                        <div className="flex items-center gap-2 mb-1.5 px-1 mt-2">
                          <span className="text-xs font-bold text-[#033481] dark:text-blue-400">{message.nomExpediteur}</span>
                          <span className="text-[10px] font-bold text-[#94a6c2]">{time}</span>
                        </div>
                      )}
                      
                      {/* Bulle de Message */}
                      <div className={`relative px-5 py-3.5 text-[14px] font-medium leading-relaxed
                        ${isMe 
                          ? 'bg-[#0A2540] dark:bg-blue-600 text-white rounded-2xl rounded-tr-sm shadow-md' 
                          : 'bg-[#F8FAFC] dark:bg-slate-800 text-[#0A2540] dark:text-slate-100 rounded-2xl rounded-tl-sm border border-slate-200/60 dark:border-slate-700/50 shadow-sm'
                        }
                      `}>
                        {message.contenu}
                        
                        {/* Heure insérée dans la bulle pour les messages de l'utilisateur ou messages groupés */}
                        <div className={`text-[9px] font-bold mt-1 text-right uppercase tracking-[0.1em] ${isMe ? 'text-blue-200/80' : 'text-[#94a6c2]'}`}>
                          {(isMe || !showAvatar) ? time : ''}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} className="h-4" />
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-6 bg-white dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800">
            <form onSubmit={handleSendMessage} className="flex items-end gap-3 max-w-5xl mx-auto">
              {/* Bouton d'attachement (Optionnel) */}
              <button type="button" className="p-3.5 text-[#94a6c2] hover:text-[#033481] hover:bg-blue-50 dark:hover:bg-slate-800 rounded-[1.2rem] transition-colors shrink-0 shadow-sm border border-slate-200 dark:border-slate-700">
                <Paperclip className="w-5 h-5" />
              </button>
              
              <div className="flex-1 relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`Envoyer un message à #${groupName}...`}
                  className="w-full bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] py-3.5 pl-6 pr-14 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#033481] dark:focus:border-blue-500 transition-all text-[15px] font-semibold text-[#0A2540] dark:text-white placeholder:text-[#94a6c2] resize-none min-h-[54px] max-h-[120px] shadow-sm"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
                <button type="button" className="absolute right-3 bottom-2 p-1.5 text-[#94a6c2] hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-xl transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
              </div>

              <button 
                type="submit"
                disabled={!newMessage.trim()}
                className="p-3.5 bg-[#033481] hover:bg-[#022863] disabled:opacity-50 disabled:hover:bg-[#033481] text-white rounded-[1.2rem] transition-all shadow-lg shadow-blue-900/20 shrink-0"
              >
                <Send className="w-5 h-5 ml-0.5" />
              </button>
            </form>
            <p className="text-center mt-3 text-[10px] font-black text-[#94a6c2] uppercase tracking-[0.2em]">
              Entrée pour envoyer • Maj + Entrée pour un retour à la ligne
            </p>
          </div>

        </motion.div>
      </motion.div>
    </main>
  );
}
