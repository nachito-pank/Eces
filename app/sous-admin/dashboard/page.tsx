"use client";

import { motion, type Variants } from "framer-motion";
import { LayoutDashboard, MessageSquare, Newspaper, CalendarDays, BookOpen, User, ChevronRight, Sparkles, TrendingUp, Activity, Zap } from 'lucide-react';
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
      case 'blue': return 'text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/40';
      case 'green': return 'text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/60 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/40';
      case 'purple': return 'text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/60 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/40';
      case 'orange': return 'text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/60 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/40';
      default: return 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900';
    }
  };

  const getCardColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent dark:from-blue-500/20 dark:via-blue-500/10 border-blue-200/50 dark:border-blue-800/30';
      case 'green': return 'bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent dark:from-emerald-500/20 dark:via-emerald-500/10 border-emerald-200/50 dark:border-emerald-800/30';
      case 'purple': return 'bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent dark:from-purple-500/20 dark:via-purple-500/10 border-purple-200/50 dark:border-purple-800/30';
      case 'orange': return 'bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-500/20 dark:via-amber-500/10 border-amber-200/50 dark:border-amber-800/30';
      default: return 'bg-gradient-to-br from-slate-500/10 via-slate-500/5 to-transparent dark:from-slate-500/20 dark:via-slate-500/10 border-slate-200/50 dark:border-slate-800/30';
    }
  };

  const getBadgeColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 dark:from-blue-900/60 dark:to-blue-800/60 dark:text-blue-300 border border-blue-300/50 dark:border-blue-700/50';
      case 'green': return 'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 dark:from-emerald-900/60 dark:to-emerald-800/60 dark:text-emerald-300 border border-emerald-300/50 dark:border-emerald-700/50';
      case 'purple': return 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 dark:from-purple-900/60 dark:to-purple-800/60 dark:text-purple-300 border border-purple-300/50 dark:border-purple-700/50';
      case 'orange': return 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 dark:from-amber-900/60 dark:to-amber-800/60 dark:text-amber-300 border border-amber-300/50 dark:border-amber-700/50';
      default: return 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 dark:from-slate-700 dark:to-slate-600 dark:text-slate-300 border border-slate-300/50 dark:border-slate-600/50';
    }
  };

  const stats = [
    { title: 'Messages Envoyés', value: messagesCount, change: '+12%', icon: MessageSquare, color: 'blue', href: '/sous-admin/messages', trend: 'up' },
    { title: 'Actualités Publiées', value: actualitesCount, change: '+5', icon: Newspaper, color: 'green', href: '/sous-admin/actualites', trend: 'up' },
    { title: 'Emplois du Temps Cours', value: edtCoursCount, change: 'À jour', icon: CalendarDays, color: 'purple', href: '/sous-admin/emploi-du-temps', trend: 'stable' },
    { title: 'Sessions.Examens', value: edtSessionsCount, change: '1 à venir', icon: BookOpen, color: 'orange', href: '/sous-admin/emploi-du-temps', trend: 'up' }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900/20">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 p-3 sm:p-0"
      >
        <motion.div variants={itemVariants} className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl text-white shadow-lg shadow-indigo-500/25">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
                Dashboard Central
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Bienvenue dans votre espace de gestion des contenus et communications.</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <Link key={index} href={stat.href} className="block outline-none group">
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-300 border ${getCardColor(stat.color)} backdrop-blur-sm bg-white/70 dark:bg-slate-800/70`}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-white/20 to-transparent rounded-full -mr-12 -mt-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                      className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${getIconColor(stat.color)} shadow-md`}
                    >
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>
                    <div className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-widest ${getBadgeColor(stat.color)} shadow-sm`}>
                      <div className="flex items-center gap-1">
                        {stat.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                        {stat.trend === 'stable' && <Activity className="w-3 h-3" />}
                        {stat.change}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <motion.h3 
                      className="text-2xl sm:text-4xl font-extrabold bg-linear-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {stat.value}
                    </motion.h3>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 leading-tight">{stat.title}</p>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-white/5 to-transparent transform -skew-x-12"></div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl sm:rounded-[2rem] border border-white/50 dark:border-slate-700/50 shadow-xl shadow-indigo-500/10 p-4 sm:p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-linear-to-br from-orange-500 to-pink-600 rounded-xl text-white">
                <Zap className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold bg-linear-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Activités Fréquentes</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/sous-admin/messages">
                  <div className="flex items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-linear-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/30 dark:to-indigo-800/30 hover:from-blue-100/80 hover:to-indigo-100/80 dark:hover:from-blue-900/40 dark:hover:to-indigo-800/40 border border-blue-200/50 dark:border-blue-800/30 transition-all group shadow-md hover:shadow-lg">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-linear-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center mr-3 sm:mr-4 group-hover:from-blue-600 group-hover:to-blue-700 transition-all shadow-lg">
                      <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">Diffuser un message</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">À l'attention des étudiants</p>
                    </div>
                  </div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/sous-admin/actualites">
                  <div className="flex items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-linear-to-br from-emerald-50/80 to-green-50/80 dark:from-emerald-900/30 dark:to-green-800/30 hover:from-emerald-100/80 hover:to-green-100/80 dark:hover:from-emerald-900/40 dark:hover:to-green-800/40 border border-emerald-200/50 dark:border-emerald-800/30 transition-all group shadow-md hover:shadow-lg">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center mr-3 sm:mr-4 group-hover:from-emerald-600 group-hover:to-emerald-700 transition-all shadow-lg">
                      <Newspaper className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">Créer une actualité</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Publier sur le portail d'accueil</p>
                    </div>
                  </div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/sous-admin/emploi-du-temps">
                  <div className="flex items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-linear-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-900/30 dark:to-pink-800/30 hover:from-purple-100/80 hover:to-pink-100/80 dark:hover:from-purple-900/40 dark:hover:to-pink-800/40 border border-purple-200/50 dark:border-purple-800/30 transition-all group shadow-md hover:shadow-lg">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-linear-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center mr-3 sm:mr-4 group-hover:from-purple-600 group-hover:to-purple-700 transition-all shadow-lg">
                      <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">Gérer les Emplois du temps</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Uploader les PDF pour la semaine</p>
                    </div>
                  </div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/sous-admin/profil">
                  <div className="flex items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-linear-to-br from-gray-50/80 to-slate-50/80 dark:from-gray-800/30 dark:to-slate-700/30 hover:from-gray-100/80 hover:to-slate-100/80 dark:hover:from-gray-700/40 dark:hover:to-slate-600/40 border border-gray-200/50 dark:border-gray-700/30 transition-all group shadow-md hover:shadow-lg">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-linear-to-br from-gray-600 to-gray-700 text-white flex items-center justify-center mr-3 sm:mr-4 group-hover:from-gray-700 group-hover:to-gray-800 transition-all shadow-lg">
                      <User className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">Mon Espace</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Gestion du profil et paramètres</p>
                    </div>
                  </div>
                </Link>
              </motion.div>

            </div>
          </motion.div>

          {/* Recent Activity Mini-Feed */}
          <motion.div variants={itemVariants} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl sm:rounded-[2rem] border border-white/50 dark:border-slate-700/50 shadow-xl shadow-indigo-500/10 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col mb-4 sm:mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl text-white">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold bg-linear-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Activité Récente</h2>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 mt-2 bg-linear-to-r from-green-100 to-emerald-100 dark:from-green-900/60 dark:to-emerald-900/60 rounded-lg w-fit text-xs font-bold text-green-800 dark:text-green-300 border border-green-300/50 dark:border-green-700/50">
                 <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                En temps réel
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-green-200 dark:before:via-green-800 before:to-transparent">
              {[
                { action: 'Message de relance envoyé aux L1', time: 'il y a 5 min', icon: MessageSquare, bg: 'from-blue-500 to-blue-600' },
                { action: 'Actualité publiée : Planning Examens', time: 'il y a 2h', icon: Newspaper, bg: 'from-emerald-500 to-emerald-600' },
                { action: 'EDT mis à jour (Génie Informatique)', time: 'hier à 14:00', icon: CalendarDays, bg: 'from-purple-500 to-purple-600' },
              ].map((activity, index) => (
                 <motion.div 
                   key={index} 
                   className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: index * 0.1 }}
                 >
                  <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border-4 border-white dark:border-slate-900 bg-linear-to-br ${activity.bg} text-white shrink-0 md:order-1 relative z-10 mx-0 md:mx-auto shadow-lg`}>
                      <activity.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <motion.div 
                    className="w-[calc(100%-3.5rem)] sm:w-[calc(50%-2.5rem)] p-2 sm:p-3 rounded-lg sm:rounded-xl bg-linear-to-br from-gray-50 to-white dark:from-gray-800/60 dark:to-gray-700/60 border border-gray-200/50 dark:border-gray-700/50 shadow-sm ml-3 sm:ml-4 md:ml-0 hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.02 }}
                  >
                      <div className="flex items-center justify-between mb-1">
                          <time className="text-xs font-bold text-gray-500 dark:text-gray-400">{activity.time}</time>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">{activity.action}</p>
                  </motion.div>
              </motion.div>
            ))}
            </div>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
