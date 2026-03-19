'use client';

import Link from 'next/link';
import { motion, type Variants } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Calendar,
  ChevronRight,
} from 'lucide-react';

import adminsData from '@/data/admins.json';
import coursData from '@/data/admins.json';

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

export default function EnseignantDashboardPage() {
  const etudiant = (adminsData as any).etudiants?.[0] || null;

  const etudiants = adminsData.etudiants;
  const cours = coursData.cours;
  const nextCourse = cours.length > 0
    ? { subject: cours[0].title, time: 'À définir', room: 'À définir' }
    : null;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full p-3 sm:p-0 space-y-8"
    >
      <motion.div variants={itemVariants} className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Tableau de Bord</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Gérez vos modules et suivez vos étudiants facilement</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-4">
            <motion.h2 variants={itemVariants} className="text-xl font-bold text-slate-900 dark:text-white mb-5">Accès rapide</motion.h2>
            
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <Link href="/enseignant/cours" className="block outline-none">
                <div className="bg-white dark:bg-slate-900/50 rounded-[2rem] p-6 hover:-translate-y-1 hover:shadow-xl dark:shadow-none transition-all duration-300 border border-slate-200/50 dark:border-slate-800/60 h-full group">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Mes Cours</p>
                      <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">{cours.length}</p>
                    </div>
                    <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BookOpen className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="mt-8 flex items-center text-blue-600 dark:text-blue-400 text-sm font-bold">
                    Gérer mes ressources <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link href="/enseignant/etudiants" className="block outline-none">
                <div className="bg-white dark:bg-slate-900/50 rounded-[2rem] p-6 hover:-translate-y-1 hover:shadow-xl dark:shadow-none transition-all duration-300 border border-slate-200/50 dark:border-slate-800/60 h-full group">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Mes Étudiants</p>
                      <p className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">{etudiants.length}</p>
                    </div>
                    <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <GraduationCap className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                  <div className="mt-8 flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-bold">
                    Voir mes classes <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link href="/enseignant/emploi-du-temps" className="block outline-none">
                <div className="bg-white dark:bg-slate-900/50 rounded-[2rem] p-6 hover:-translate-y-1 hover:shadow-xl dark:shadow-none transition-all duration-300 border border-slate-200/50 dark:border-slate-800/60 h-full group">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Emploi du temps</p>
                      <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">Visuel</p>
                    </div>
                    <div className="w-14 h-14 bg-amber-50 dark:bg-amber-900/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Calendar className="w-7 h-7 text-amber-600 dark:text-amber-400" />
                    </div>
                  </div>
                  <div className="mt-8 flex items-center text-amber-600 dark:text-amber-400 text-sm font-bold">
                    Consulter la grille <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Prochain cours */}
            {nextCourse && (
              <motion.div variants={itemVariants}>
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/60 rounded-[2rem] p-8 shadow-sm">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Prochain cours à venir</h2>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-[1.5rem] p-6 gap-4 group">
                    <div>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{nextCourse.subject}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          <Calendar className="w-3 h-3 mr-1.5" />
                          {nextCourse.time}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {nextCourse.room}
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/enseignant/emploi-du-temps"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center whitespace-nowrap"
                    >
                      Ouvrir l'agenda
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
        </div>
      </div>
    </motion.div>
  )
}