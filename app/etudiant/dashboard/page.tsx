/* eslint-disable @typescript-eslint/no-explicit-any */
import TabsDemo from '@/components/tabs-demo';
import adminsData from '@/data/admins.json';
import { Card } from '@/components/ui/card';
import { Award, BookOpen, Calendar, ChevronRight, CreditCard, MessageCircle, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function EtudiantDashboardPage() {

    const cours = (adminsData as any).cours || { notes: [] };
    const etudiant = (adminsData as any).etudiants[6] || { notes: [] };
    // const cours = etudiant.cours || []
  return (
    <main className="w-full p-6">
      <TabsDemo/>
      <div className="grid mt-25 max-sm:mt-0 grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-4">
          
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-5">
              <Link href="/etudiant/mes-cours">
                <Card className="p-6 hover:shadow-md duration-300 hover:-translate-y-2 shadow-blue-600 transition-all cursor-pointer h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Mes Cours</p>
                      
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

              <Link href="/etudiant/mes-notes">
                <Card className="p-6 hover:shadow-md duration-300 hover:-translate-y-2 shadow-emerald-600 transition-all cursor-pointer h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Ma Moyenne</p>
                    
                      <p className="text-3xl font-bold text-emerald-600">{etudiant.moyenne}</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-emerald-600 text-sm font-medium">
                    Voir mes notes <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </Link>

              <Link href="/etudiant/emploi-du-temps">
                <Card className="p-6 hover:shadow-md duration-300 hover:-translate-y-2 shadow-amber-600 transition-all cursor-pointer h-full">
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

              <Link href="/etudiant/messages">
                <Card className="p-6 hover:shadow-md duration-300 hover:-translate-y-2 shadow-purple-600 transition-all cursor-pointer h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Messages</p>
                      <p className="text-lg font-bold text-purple-600">Voir</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-purple-600 text-sm font-medium">
                    Consulter <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </Link>

              <Link href="/etudiant/paiements">
                <Card className="p-6 hover:shadow-md duration-300 hover:-translate-y-2 shadow-olive-600 transition-all cursor-pointer h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Statut de paiement</p>
                      <p className="text-lg font-bold text-olive-600">Voir</p>
                    </div>
                    <div className="w-12 h-12 bg-olive-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-olive-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-olive-600 text-sm font-medium">
                    Consulter <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </Link>

              <Link href="/etudiant/notifications">
                <Card className="p-6 hover:shadow-md duration-300 hover:-translate-y-2 shadow-fuchsia-600 transition-all cursor-pointer h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">notifications</p>
                      <p className="text-lg font-bold text-fuchsia-600">Voir</p>
                    </div>
                    <div className="w-12 h-12 bg-fuchsia-100 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-fuchsia-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-fuchsia-600 text-sm font-medium">
                    Consulter <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </Link>
            </div>
      </div>
      </div>
    </main>
  );
}