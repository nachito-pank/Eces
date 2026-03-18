"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import adminsData from '@/data/admins.json';
import { Bell, CheckCheck, Circle, Settings, Info, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotificationsPage() {
  const data = (adminsData as any).espaceEtudiantDemo || { notifications: [] };
  const notifications = data.notifications || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  // Icône et couleur selon le type de notification (si disponible)
  const getNotificationStyle = (message: string) => {
    const msgLower = message.toLowerCase();
    if (msgLower.includes('paiement') || msgLower.includes('frais')) return { color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10 rounded-full p-3' };
    if (msgLower.includes('cours') || msgLower.includes('professeur')) return { color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10 rounded-full p-3' };
    if (msgLower.includes('examen') || msgLower.includes('note')) return { color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10 rounded-full p-3' };
    if (msgLower.includes('urgent') || msgLower.includes('attention')) return { color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-500/10 rounded-full p-3' };
    return { color: 'text-[#033481] dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20 rounded-full p-3' };
  };

  return (
    <main className="w-full min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] p-4 md:p-8 font-sans">
      <motion.div 
        className="max-w-4xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* En-tête */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-black tracking-[0.2em] text-[#55719e] dark:text-blue-400 uppercase mb-2">
              Centre de communication
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0A2540] dark:text-white flex items-center gap-3">
              <Bell className="w-8 h-8 text-[#033481] dark:text-blue-500" />
              Notifications
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-[#55719e] hover:text-[#0A2540] dark:text-slate-400 dark:hover:text-white rounded-xl font-bold text-sm transition-all shadow-sm border border-slate-200 dark:border-slate-800">
              <Settings className="w-4 h-4" />
              Gérer
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#033481] hover:bg-[#022863] text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/20">
              <CheckCheck className="w-4 h-4" />
              Tout marquer lu
            </button>
          </div>
        </motion.div>

        {/* Liste des Notifications */}
        <motion.div variants={containerVariants} className="bg-white dark:bg-slate-900/80 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-[#033481] dark:bg-blue-500 rounded-full"></div>
              <h2 className="text-lg font-bold text-[#0A2540] dark:text-white tracking-tight">Récents</h2>
            </div>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-[#033481] dark:text-blue-400 rounded-lg text-xs font-black tracking-widest uppercase">
              {notifications.length} Nouvelle(s)
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/60 p-2 md:p-4">
            {notifications.length > 0 ? notifications.map((n: any, idx: number) => {
              const style = getNotificationStyle(n.message);
              // Alterner entre lues et non lues pour le visuel
              const isUnread = idx < 2; 

              return (
                <motion.div 
                  variants={itemVariants}
                  key={n.id || idx} 
                  className={`group flex items-start gap-5 p-4 md:p-5 rounded-[1.5rem] transition-colors ${isUnread ? 'bg-[#F8FAFC] dark:bg-slate-800/60' : 'bg-transparent dark:bg-transparent'} hover:bg-slate-50 dark:hover:bg-slate-800/40`}
                >
                  <div className={style.bg}>
                    <Bell className={`w-5 h-5 ${style.color}`} />
                  </div>
                  
                  <div className="flex-1 mt-1">
                    <p className={`text-[15px] leading-snug ${isUnread ? 'font-bold text-[#0A2540] dark:text-white' : 'font-semibold text-slate-700 dark:text-slate-300'}`}>
                      {n.message}
                    </p>
                    <p className="text-xs font-bold text-[#94a6c2] mt-2 tracking-wider flex items-center gap-2 uppercase">
                      <Clock className="w-3.5 h-3.5" />
                      {n.date}
                    </p>
                  </div>

                  <div className="flex items-center self-center pl-4">
                    {isUnread ? (
                      <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                    ) : (
                      <Circle className="w-4 h-4 text-slate-200 dark:text-slate-700" />
                    )}
                  </div>
                </motion.div>
              );
            }) : (
              <div className="py-24 flex flex-col items-center justify-center text-center">
                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-full mb-6">
                  <CheckCheck className="w-12 h-12 text-[#94a6c2] dark:text-slate-500" />
                </div>
                <p className="text-xl font-extrabold text-[#0A2540] dark:text-white mb-2 tracking-tight">Vous êtes à jour</p>
                <p className="text-sm font-semibold text-[#55719e] max-w-sm">Aucune nouvelle notification. Nous vous informerons dès qu'il y aura du nouveau sur votre dossier.</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
