/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { motion, type Variants } from "framer-motion";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Users, UserCog, BookOpen, GraduationCap,
  Plus, ArrowRight, Settings
} from 'lucide-react';
import { etudiantsApi, enseignantsApi, filieresApi, sousAdminsApi } from '@/lib/api';

// animation variants for page-wide entrance effects
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// animation variants for each card / item block
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

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({ enseignants: 0, sousAdmins: 0, filieres: 0, etudiants: 0 });
  const [recentEnseignants, setRecentEnseignants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [enRes, saRes, filRes, etRes] = await Promise.all([
          enseignantsApi.getAll(),
          sousAdminsApi.getAll(),
          filieresApi.getAll(),
          etudiantsApi.getAll(),
        ]);
        setStats({
          enseignants: enRes.enseignants.length,
          sousAdmins:  saRes.sousAdmins.length,
          filieres:    filRes.filieres.length,
          etudiants:   etRes.etudiants.length,
        });
        setRecentEnseignants([...enRes.enseignants].slice(-4).reverse());
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // configuration des statistiques affichées dans les 4 cartes supérieures
  const statCards = [
    { title: 'Enseignants', value: stats.enseignants, icon: Users,         bg: 'bg-blue-500',    iconBg: 'bg-blue-100 dark:bg-blue-900/40',    iconColor: 'text-blue-600 dark:text-blue-400',    href: '/admin/enseignants' },
    { title: 'Sous-Admins', value: stats.sousAdmins,  icon: UserCog,       bg: 'bg-emerald-500', iconBg: 'bg-emerald-100 dark:bg-emerald-900/40', iconColor: 'text-emerald-600 dark:text-emerald-400', href: '/admin/sous-admins' },
    { title: 'Filières',    value: stats.filieres,    icon: BookOpen,      bg: 'bg-amber-500',   iconBg: 'bg-amber-100 dark:bg-amber-900/40',   iconColor: 'text-amber-600 dark:text-amber-400',   href: '/admin/filieres' },
    { title: 'Étudiants',   value: stats.etudiants,   icon: GraduationCap, bg: 'bg-purple-500',  iconBg: 'bg-purple-100 dark:bg-purple-900/40', iconColor: 'text-purple-600 dark:text-purple-400',  href: '/admin/etudiants' },
  ];

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible" 
      className="space-y-8 p-3 sm:p-0"
    >
      <motion.div variants={itemVariants} className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Tableau de bord</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Vue d'ensemble de l'établissement</p>
      </motion.div>

      {/* Stats Grid */}
      {/* Statistiques cartes rapides */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card) => (
          <div key={card.title} onClick={() => router.push(card.href)}
            className="bg-white dark:bg-slate-900/50 rounded-2xl shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 cursor-pointer overflow-hidden group hover:-translate-y-1 relative border border-slate-200/50 dark:border-slate-800/60">
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${card.bg}`} />
            <div className="p-5 sm:p-6 pl-6 sm:pl-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">{card.title}</p>
                  {loading ? (
                    <div className="h-8 w-12 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                  ) : (
                    <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{card.value}</p>
                  )}
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconBg} group-hover:scale-110 transition-transform`}>
                  <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* bloc 'Enseignants récents' ; lecture et navigation vers detail ou liste */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white dark:bg-slate-900/50 rounded-[2rem] shadow-sm border border-slate-200/50 dark:border-slate-800/60 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Enseignants récents</h2>
            <Link href="/admin/enseignants" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold flex items-center group">
              Voir tout <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {recentEnseignants.map((enseignant) => (
                <div key={enseignant.id}
                  className="flex items-center p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-200 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer"
                  onClick={() => router.push(`/admin/enseignants/${enseignant.id}`)}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm"
                    style={{ backgroundColor: enseignant.couleur || '#3B82F6' }}>
                    {enseignant.avatar}
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <p className="text-base font-bold text-slate-900 dark:text-white truncate">{enseignant.prenom} {enseignant.nom}</p>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{enseignant.matieres?.join(', ')}</p>
                  </div>
                  <span className={`ml-3 shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    enseignant.statut === 'Actif'
                      ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60'
                      : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/60'
                  }`}>
                    {enseignant.statut}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Bloc action rapide pour navigation rapide et création / configuration */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900/50 rounded-[2rem] shadow-sm border border-slate-200/50 dark:border-slate-800/60 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">Raccourcis Rapides</h2>
          <div className="space-y-4">
            {[
              { href: '/admin/enseignants/ajouter', label: 'Ajouter un enseignant', color: 'bg-blue-600 hover:bg-blue-700', shadow: 'shadow-blue-600/20', icon: Plus },
              { href: '/admin/sous-admins/ajouter', label: 'Ajouter un sous-admin', color: 'bg-emerald-600 hover:bg-emerald-700', shadow: 'shadow-emerald-600/20', icon: Plus },
              { href: '/admin/filieres',            label: 'Gestion des filières',  color: 'bg-amber-600 hover:bg-amber-700', shadow: 'shadow-amber-600/20', icon: BookOpen },
              { href: '/admin/profile',             label: 'Configuration & Profil',color: 'bg-slate-600 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700', shadow: 'shadow-slate-600/20', icon: Settings },
            ].map(({ href, label, color, shadow, icon: Icon }) => (
              <Link key={href} href={href}
                className={`flex items-center p-4 rounded-2xl ${color} text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${shadow} group`}>
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-sm tracking-wide">{label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
