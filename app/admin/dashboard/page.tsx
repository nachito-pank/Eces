'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  UserCog, 
  BookOpen, 
  GraduationCap,
  Plus,
  ArrowRight,
  Settings
} from 'lucide-react';
import db from '@/data/admins.json';

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState(() => {
    return {
      enseignants: db.enseignants.length,
      sousAdmins: db.sousAdmins.length,
      filieres: db.filieres.length,
      etudiants: db.etudiants.length
    };
  });

  const statCards = [
    { 
      title: 'Enseignants', 
      value: stats.enseignants, 
      icon: Users, 
      color: 'bg-blue-500', 
      href: '/enseignants' 
    },
    { 
      title: 'Sous-Admins', 
      value: stats.sousAdmins, 
      icon: UserCog, 
      color: 'bg-emerald-500', 
      href: '/sous-admins' 
    },
    { 
      title: 'Filières', 
      value: stats.filieres, 
      icon: BookOpen, 
      color: 'bg-amber-500', 
      href: '/filieres' 
    },
    { 
      title: 'Étudiants', 
      value: stats.etudiants, 
      icon: GraduationCap, 
      color: 'bg-purple-500', 
      href: '/filieres' 
    },
  ];

  return (
    <div className="space-y-8 p-3">
      <div>
        <h1 className="text-2xl font-title font-bold text-slate-900">Tableau de bord</h1>
        <p className="text-slate-500 mt-1">Vue d&apos;ensemble de votre établissement</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div 
            key={card.title}
            onClick={() => router.push(card.href)}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden group hover:-translate-y-1 relative"
          >
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${card.color}`} />
            <div className="p-6 pl-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-slate-900">{card.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color} bg-opacity-10`}>
                  <card.icon className={`w-6 h-6 ${card.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Teachers */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-title font-semibold text-slate-900">Enseignants récents</h2>
            <Link href="/enseignants" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
              Voir tout <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {db.enseignants.slice(-4).reverse().map((enseignant) => (
              <div key={enseignant.id} className="flex items-center p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm"
                  style={{ backgroundColor: enseignant.couleur }}
                >
                  {enseignant.avatar}
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-slate-900">{enseignant.prenom} {enseignant.nom}</p>
                  <p className="text-xs text-slate-500">{enseignant.matieres?.join(', ')}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-wrap gap-1">
                    {enseignant.filieres?.map((f: string) => (
                      <span key={f} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {f}
                      </span>
                    ))}
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    enseignant.statut === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {enseignant.statut}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-title font-semibold text-slate-900 mb-6">Raccourcis</h2>
          <div className="space-y-3">
            <Link href="/admin/enseignants/ajouter" className="flex items-center p-3 rounded-xl bg-blue-800 text-blue-50 hover:bg-blue-100 hover:text-blue-800 transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-blue-800 flex items-center justify-center mr-3 group-hover:scale-110 text-white transition-transform">
                <Plus className="w-4 h-4" />
              </div>
              <span className="font-medium text-sm">Ajouter un enseignant</span>
            </Link>
            <Link href="/admin/sous-admins/ajouter" className="flex items-center p-3 rounded-xl bg-emerald-600 text-emerald-50 hover:bg-emerald-100 hover:text-emerald-600 transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center mr-3 group-hover:scale-110 text-emerald-100 transition-transform">
                <Plus className="w-4 h-4" />
              </div>
              <span className="font-medium text-sm">Ajouter un sous-admin</span>
            </Link>
            <Link href="/admin/filieres" className="flex items-center p-3 rounded-xl bg-amber-600 text-amber-50 hover:bg-amber-100 hover:text-amber-600 transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center text-amber-50 justify-center mr-3 group-hover:scale-110 transition-transform">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-medium text-sm">Gérer les filières</span>
            </Link>
            <Link href="/admin/profil" className="flex items-center p-3 rounded-xl bg-slate-500 text-slate-50 hover:bg-slate-100 hover:text-slate-500 transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-slate-500 flex items-center text-slate-50 justify-center mr-3 group-hover:scale-110 transition-transform">
                <Settings className="w-4 h-4" />
              </div>
              <span className="font-medium text-sm">Paramètres compte</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
