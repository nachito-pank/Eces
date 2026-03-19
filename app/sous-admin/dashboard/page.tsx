"use client";

import { motion, type Variants } from "framer-motion";
import { LayoutDashboard, MessageSquare, Newspaper, CalendarDays, BookOpen, User, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import adminsData from '@/data/admins.json';

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

export default function SousAdminDashboard() {
  const messagesCount = adminsData.messages?.length || 0;
  const actualitesCount = adminsData.actualites?.length || 0;
  const edtCoursCount = adminsData.emploiDuTemps?.length || 0;
  const edtSessionsCount = adminsData.emploiDuTempsSessions?.length || 0;

  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/60 bg-blue-50 dark:bg-blue-900/30';
      case 'green': return 'text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-900/30';
      case 'purple': return 'text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/60 bg-purple-50 dark:bg-purple-900/30';
      case 'orange': return 'text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-900/30';
      default: return 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800';
    }
  };

  const getBadgeColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60';
      case 'green': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60';
      case 'purple': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-400 border border-purple-200 dark:border-purple-800/60';
      case 'orange': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700';
    }
  };

  const stats = [
    { title: 'Messages Envoyés', value: messagesCount, change: '+12%', icon: MessageSquare, color: 'blue', href: '/sous-admin/messages' },
    { title: 'Actualités Publiées', value: actualitesCount, change: '+5', icon: Newspaper, color: 'green', href: '/sous-admin/actualites' },
    { title: 'Emplois du Temps Cours', value: edtCoursCount, change: 'À jour', icon: CalendarDays, color: 'purple', href: '/sous-admin/emploi-du-temps' },
    { title: 'Sessions.Examens', value: edtSessionsCount, change: '1 à venir', icon: BookOpen, color: 'orange', href: '/sous-admin/emploi-du-temps' }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 p-3 sm:p-0"
    >
      <motion.div variants={itemVariants} className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl text-indigo-600 dark:text-indigo-400">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Dashboard Central</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Bienvenue dans votre espace de gestion des contenus et communications.</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <Link key={index} href={stat.href} className="block outline-none">
            <div className="bg-white dark:bg-slate-900/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:-translate-y-1 hover:shadow-xl dark:shadow-none transition-all duration-300 border border-slate-200/50 dark:border-slate-800/60 h-full group flex flex-col justify-between">
              
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${getIconColor(stat.color)} transition-transform duration-300 group-hover:scale-110`}>
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-widest ${getBadgeColor(stat.color)}`}>
                  {stat.change}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-1">{stat.value}</h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 leading-tight">{stat.title}</p>
              </div>

            </div>
          </Link>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white dark:bg-slate-900/50 rounded-xl sm:rounded-[2rem] border border-slate-200/50 dark:border-slate-800/60 p-4 sm:p-6 lg:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">Activités Fréquentes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            
            <Link href="/sous-admin/messages">
              <div className="flex items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">Diffuser un message</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">À l'attention des étudiants</p>
                </div>
              </div>
            </Link>

            <Link href="/sous-admin/actualites">
              <div className="flex items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Newspaper className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">Créer une actualité</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Publier sur le portail d'accueil</p>
                </div>
              </div>
            </Link>

            <Link href="/sous-admin/emploi-du-temps">
              <div className="flex items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">Gérer les Emplois du temps</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Uploader les PDF pour la semaine</p>
                </div>
              </div>
            </Link>

            <Link href="/sous-admin/profil">
              <div className="flex items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-slate-600 group-hover:text-white transition-colors">
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">Mon Espace</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Gestion du profil et paramètres</p>
                </div>
              </div>
            </Link>

          </div>
        </motion.div>

        {/* Recent Activity Mini-Feed */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900/50 rounded-xl sm:rounded-[2rem] border border-slate-200/50 dark:border-slate-800/60 p-4 sm:p-6 lg:p-8 shadow-sm">
          <div className="flex flex-col mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">Activité Récente</h2>
            <div className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 mt-2 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit text-xs font-bold text-slate-600 dark:text-slate-400">
               <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              En temps réel
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
            {[
              { action: 'Message de relance envoyé aux L1', time: 'il y a 5 min', icon: MessageSquare, bg: 'bg-blue-500' },
              { action: 'Actualité publiée : Planning Examens', time: 'il y a 2h', icon: Newspaper, bg: 'bg-emerald-500' },
              { action: 'EDT mis à jour (Génie Informatique)', time: 'hier à 14:00', icon: CalendarDays, bg: 'bg-purple-500' },
            ].map((activity, index) => (
               <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border-4 border-white dark:border-slate-900 ${activity.bg} text-white shrink-0 md:order-1 relative z-10 mx-0 md:mx-auto shadow-sm`}>
                      <activity.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <div className="w-[calc(100%-3.5rem)] sm:w-[calc(50%-2.5rem)] p-2 sm:p-3 rounded-lg sm:rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 shadow-sm ml-3 sm:ml-4 md:ml-0">
                      <div className="flex items-center justify-between mb-1">
                          <time className="text-xs font-bold text-slate-400 dark:text-slate-500">{activity.time}</time>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">{activity.action}</p>
                  </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
}
