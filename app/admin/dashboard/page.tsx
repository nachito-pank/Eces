/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Users, UserCog, BookOpen, GraduationCap,
  Plus, ArrowRight, Settings
} from 'lucide-react';
import { etudiantsApi, enseignantsApi, filieresApi, sousAdminsApi } from '@/lib/api';

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

  const statCards = [
    { title: 'Enseignants', value: stats.enseignants, icon: Users,         bg: 'bg-blue-500',    iconBg: 'bg-blue-100 dark:bg-blue-900/40',    iconColor: 'text-blue-500',    href: '/admin/enseignants' },
    { title: 'Sous-Admins', value: stats.sousAdmins,  icon: UserCog,       bg: 'bg-emerald-500', iconBg: 'bg-emerald-100 dark:bg-emerald-900/40', iconColor: 'text-emerald-500', href: '/admin/sous-admins' },
    { title: 'Filières',    value: stats.filieres,    icon: BookOpen,      bg: 'bg-amber-500',   iconBg: 'bg-amber-100 dark:bg-amber-900/40',   iconColor: 'text-amber-500',   href: '/admin/filieres' },
    { title: 'Étudiants',   value: stats.etudiants,   icon: GraduationCap, bg: 'bg-purple-500',  iconBg: 'bg-purple-100 dark:bg-purple-900/40', iconColor: 'text-purple-500',  href: '/admin/etudiants' },
  ];

  return (
    <div className="space-y-8 p-3 sm:p-0">
      <div>
        <h1 className="text-2xl font-title font-bold text-slate-900 dark:text-slate-100">Tableau de bord</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Vue d&apos;ensemble de votre établissement</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card) => (
          <div key={card.title} onClick={() => router.push(card.href)}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden group hover:-translate-y-1 relative border border-transparent dark:border-slate-700">
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${card.bg}`} />
            <div className="p-4 sm:p-6 pl-5 sm:pl-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{card.title}</p>
                  {loading ? (
                    <div className="h-8 w-12 bg-slate-100 dark:bg-slate-700 rounded animate-pulse" />
                  ) : (
                    <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">{card.value}</p>
                  )}
                </div>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                  <card.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${card.iconColor}`} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Recent Teachers */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-transparent dark:border-slate-700 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-title font-semibold text-slate-900 dark:text-slate-100">Enseignants récents</h2>
            <Link href="/admin/enseignants" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center">
              Voir tout <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-14 bg-slate-100 dark:bg-slate-700 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {recentEnseignants.map((enseignant) => (
                <div key={enseignant.id}
                  className="flex items-center p-3 sm:p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-600 cursor-pointer"
                  onClick={() => router.push(`/admin/enseignants/${enseignant.id}`)}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm shrink-0"
                    style={{ backgroundColor: enseignant.couleur || '#3B82F6' }}>
                    {enseignant.avatar}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{enseignant.prenom} {enseignant.nom}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{enseignant.matieres?.join(', ')}</p>
                  </div>
                  <span className={`ml-2 shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    enseignant.statut === 'Actif'
                      ? 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-400'
                  }`}>
                    {enseignant.statut}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-transparent dark:border-slate-700 p-5 sm:p-6">
          <h2 className="text-lg font-title font-semibold text-slate-900 dark:text-slate-100 mb-5">Raccourcis</h2>
          <div className="space-y-3">

            {[
              { href: '/admin/enseignants/ajouter', label: 'Ajouter un enseignant', color: 'bg-blue-800',    icon: Plus },
              { href: '/admin/sous-admins/ajouter', label: 'Ajouter un sous-admin', color: 'bg-emerald-600', icon: Plus },
              { href: '/admin/filieres',            label: 'Gérer les filières',    color: 'bg-amber-600',   icon: BookOpen },
              { href: '/admin/profile',             label: 'Paramètres compte',     color: 'bg-slate-500',   icon: Settings },
            ].map(({ href, label, color, icon: Icon }) => (
              <Link key={href} href={href}
                className={`flex items-center p-3 rounded-xl ${color} text-white hover:opacity-90 transition-opacity group`}>
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
