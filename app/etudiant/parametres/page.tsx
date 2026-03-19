"use client";

import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { 
  Settings, Bell, Shield, Palette, 
  HelpCircle, ChevronRight, Moon, Sun, MonitorSmartphone 
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';

export default function ParametresPage() {
  const { theme, setTheme } = useTheme();
  if (!theme) return null
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

  const handleAction = (message: string) => {
    toast.success(message);
  };

  

  return (
    <main className="w-full min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] p-4 md:p-8 font-sans">
      <motion.div 
        className="max-w-4xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <p className="text-xs font-black tracking-[0.2em] text-[#55719e] dark:text-blue-400 uppercase mb-2">
            Configuration Générale
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0A2540] dark:text-white flex items-center gap-3">
            <Settings className="w-8 h-8 text-[#033481] dark:text-blue-500" />
            Paramètres
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          
          {/* Section: Apparence */}
          <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-[#0A2540] dark:text-white mb-6 flex items-center gap-3">
              <Palette className="w-5 h-5 text-indigo-500" /> Apparence
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => { setTheme('light'); handleAction('Thème Clair activé'); }}
                className={`flex-1 flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all ${theme === 'light' ? 'border-[#033481] bg-blue-50 dark:bg-blue-900/20' : 'border-slate-100 dark:border-slate-800 hover:border-blue-200'}`}
              >
                <Sun className={`w-8 h-8 mb-3 ${theme === 'light' ? 'text-[#033481] dark:text-blue-400' : 'text-slate-400'}`} />
                <span className={`font-bold text-sm ${theme === 'light' ? 'text-[#033481] dark:text-blue-400' : 'text-slate-500'}`}>Clair</span>
              </button>
              
              <button 
                onClick={() => { setTheme('dark'); handleAction('Thème Sombre activé'); }}
                className={`flex-1 flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all ${theme === 'dark' ? 'border-[#033481] bg-blue-50 dark:bg-blue-900/20' : 'border-slate-100 dark:border-slate-800 hover:border-blue-200'}`}
              >
                <Moon className={`w-8 h-8 mb-3 ${theme === 'dark' ? 'text-[#033481] dark:text-blue-400' : 'text-slate-400'}`} />
                <span className={`font-bold text-sm ${theme === 'dark' ? 'text-[#033481] dark:text-blue-400' : 'text-slate-500'}`}>Sombre</span>
              </button>

              <button 
                onClick={() => { setTheme('system'); handleAction('Thème du système appliqué'); }}
                className={`flex-1 flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all ${theme === 'system' ? 'border-[#033481] bg-blue-50 dark:bg-blue-900/20' : 'border-slate-100 dark:border-slate-800 hover:border-blue-200'}`}
              >
                <MonitorSmartphone className={`w-8 h-8 mb-3 ${theme === 'system' ? 'text-[#033481] dark:text-blue-400' : 'text-slate-400'}`} />
                <span className={`font-bold text-sm ${theme === 'system' ? 'text-[#033481] dark:text-blue-400' : 'text-slate-500'}`}>Système</span>
              </button>
            </div>
          </div>

          {/* Section: Notifications */}
          <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-[#0A2540] dark:text-white mb-6 flex items-center gap-3">
              <Bell className="w-5 h-5 text-amber-500" /> Notifications
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Push Notifications</p>
                  <p className="text-sm font-medium text-slate-500">Mises à jour des notes et cours</p>
                </div>
                <button 
                  onClick={() => {
                    setNotificationsEnabled(!notificationsEnabled);
                    handleAction(notificationsEnabled ? "Notifications désactivées" : "Notifications activées");
                  }}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${notificationsEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${notificationsEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Section: Sécurité & Confidentialité */}
          <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-[#0A2540] dark:text-white mb-6 flex items-center gap-3">
              <Shield className="w-5 h-5 text-emerald-500" /> Sécurité
            </h3>
            
            <div className="space-y-3">
              <button onClick={() => handleAction('Ouverture du gestionnaire de mots de passe...')} className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <span className="font-bold text-sm text-slate-700 dark:text-slate-300">Modifier le mot de passe</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#033481] transition-colors" />
              </button>
              <button onClick={() => handleAction('Paramètres de confidentialité mis à jour.')} className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <span className="font-bold text-sm text-slate-700 dark:text-slate-300">Gérer la confidentialité</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#033481] transition-colors" />
              </button>
            </div>
          </div>

          {/* Section: Autres */}
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-bold text-[#0A2540] dark:text-white mb-6 flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-purple-500" /> Assistance
            </h3>
            
            <div className="space-y-3">
              <button onClick={() => handleAction('Redirection vers le centre d\'aide...')} className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <span className="font-bold text-sm text-slate-700 dark:text-slate-300">Centre d&apos;aide et Support</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#033481] transition-colors" />
              </button>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </main>
  );
}
