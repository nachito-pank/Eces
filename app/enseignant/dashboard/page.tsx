'use client';

import { Card } from '@/components/ui/card';

import {
  BookOpen,
  GraduationCap,
  Calendar,
  ChevronRight,

} from 'lucide-react';

import StatCard from '@/components/dashboard/StatCard';
import NotificationsList from '@/components/dashboard/NotificationsList';
import adminsData from '@/data/admins.json';
import coursData from '@/data/admins.json';

import Link from 'next/link';

export default function EnseignantDashboardPage() {
  const etudiant = (adminsData as any).etudiants?.[0] || null;

  const devoirsCount = etudiant?.notes ? etudiant.notes.length : 0;
  const moyenne = etudiant?.moyenne ?? '-';
  const prochainsCours = etudiant?.notes?.slice(0, 3).map((n: any) => n.matiere) || [];
  const etudiants = adminsData.etudiants;
  const cours = coursData.cours;
  const nextCourse = cours.length > 0
    ? { subject: cours[0].title, time: 'À définir', room: 'À définir' }
    : null;


  return (
    <main className="w-full p-3">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-4">
          {/* Accès rapide */}
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Accès rapide</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <Link href="/enseignant/cours">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Mes Cours</p>
                      {/* ✅ cours vient de enseignants.json */}
                      <p className="text-3xl font-bold text-blue-600">{cours.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                    Voir les cours <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </Link>

              <Link href="/enseignant/etudiants">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Mes Étudiants</p>
                      {/* ✅ etudiants vient de admins.json */}
                      <p className="text-3xl font-bold text-emerald-600">{etudiants.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-emerald-600 text-sm font-medium">
                    Voir les étudiants <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </Link>

              <Link href="/enseignant/emploi-du-temps">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Emploi du temps</p>
                      <p className="text-lg font-bold text-amber-600">Voir</p>
                    </div>
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-amber-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-amber-600 text-sm font-medium">
                    Consulter <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </Link>
            </div>

            {/* Prochain cours */}
            {nextCourse && (
              <Card className="p-6 bg-violet-600">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Prochain cours</h2>
                <div className="flex items-center justify-between bg-blue-50 rounded-lg p-4">
                  <div>
                    <p className="font-medium text-slate-800">{nextCourse.subject}</p>
                    <p className="text-sm text-slate-600 mt-1">
                      {nextCourse.time} — {nextCourse.room}
                    </p>
                  </div>
                  <Link
                    href="/enseignant/emploi-du-temps"
                    className="text-blue-600 font-medium text-sm flex items-center"
                  >
                    Voir l&apos;emploi du temps <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </Card>
            )}
      </div>
      </div>
    </main>
  )
}