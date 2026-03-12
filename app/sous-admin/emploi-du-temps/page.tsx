"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CalendarDays, Download, Plus, Eye, BookOpen, Clock, MapPin, User } from 'lucide-react';
import sousAdminsData from '@/data/sous-admins.json';
import type { EmploiDuTempsCours, EmploiDuTempsSession } from '@/components/dashboard/types/sousadmin';

export default function EmploiDuTempsPage() {
  const [activeTab, setActiveTab] = useState('cours');
  const [selectedEdt, setSelectedEdt] = useState<EmploiDuTempsCours | null>(null);

  const edtCours: EmploiDuTempsCours[] = sousAdminsData.emploiDuTemps || [];
  const edtSessions: EmploiDuTempsSession[] = sousAdminsData.emploiDuTempsSessions || [];

  // Group sessions by filière and niveau
  const sessionsGrouped = edtSessions.reduce((acc, session) => {
    const key = `${session.filiere}-${session.niveau}`;
    if (!acc[key]) {
      acc[key] = {
        filiere: session.filiere,
        niveau: session.niveau,
        sessions: []
      };
    }
    acc[key].sessions.push(session);
    return acc;
  }, {} as Record<string, { filiere: string; niveau: string; sessions: EmploiDuTempsSession[] }>);

  const downloadEdt = (type: 'cours' | 'sessions', filiere: string, niveau: string) => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = `EDT_${type}_${filiere}_${niveau}.pdf`;
    link.click();
    alert(`Téléchargement EDT ${type} ${filiere} ${niveau}...`);
  };

  // Cours Card Component
  const CoursCard = ({ edt }: { edt: EmploiDuTempsCours }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-purple-50/50 hover:to-purple-50 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-lg font-semibold text-gray-900">{edt.filiere}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                {edt.niveau}
              </Badge>
              <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono text-gray-700">
                {edt.code}
              </code>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-purple-600">{edt.cours.length}</span>
            <span className="text-sm text-gray-500">cours</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {edt.cours.slice(0, 4).map((cours, idx) => (
            <div key={idx} className="bg-white p-2 rounded-lg border border-gray-100">
              <div className="flex items-center gap-1 mb-1">
                <Clock className="h-3 w-3 text-gray-400" />
                <span className="text-xs font-medium text-gray-600">{cours.heureDebut}</span>
              </div>
              <p className="text-sm font-medium text-gray-900 truncate">{cours.matiere}</p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500 truncate">{cours.salle}</span>
              </div>
            </div>
          ))}
        </div>
        {edt.cours.length > 4 && (
          <p className="text-xs text-gray-500 text-center">+{edt.cours.length - 4} autres cours</p>
        )}
        <div className="flex gap-2 pt-2 border-t border-gray-100">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setSelectedEdt(edt)}
            className="flex-1 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200"
          >
            <Eye className="h-4 w-4 mr-1" />
            Voir
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => downloadEdt('cours', edt.filiere, edt.niveau)}
            className="hover:bg-green-50 hover:text-green-600 hover:border-green-200"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Sessions Group Component
  const SessionsGroup = ({ group }: { group: { filiere: string; niveau: string; sessions: EmploiDuTempsSession[] } }) => (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-100">
              <CalendarDays className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">{group.filiere}</CardTitle>
              <CardDescription>{group.niveau} - {group.sessions.length} sessions</CardDescription>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => downloadEdt('sessions', group.filiere, group.niveau)}
            className="hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
          >
            <Download className="h-4 w-4 mr-1" />
            Exporter
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {group.sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-xs text-gray-500">Session</div>
                  <Badge variant="secondary" className="text-xs">{session.session}</Badge>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-xs text-gray-500">Date</div>
                  <div className="text-sm font-medium">{new Date(session.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</div>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-xs text-gray-500">Heure</div>
                  <div className="text-sm font-medium">{session.heure}</div>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-xs text-gray-500">Salle</div>
                  <code className="text-xs bg-orange-50 px-2 py-1 rounded text-orange-700">{session.salle}</code>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 font-medium">{session.matiere}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => alert('Fonctionnalité à implémenter')}
                  className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  // Modal pour voir les détails d'un EDT
  const EdtDetailsModal = () => (
    <Dialog open={!!selectedEdt} onOpenChange={() => setSelectedEdt(null)}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-purple-600" />
            Emploi du Temps - {selectedEdt?.filiere} - {selectedEdt?.niveau}
          </DialogTitle>
          <DialogDescription>
            Planning hebdomadaire des cours
          </DialogDescription>
        </DialogHeader>
        {selectedEdt && (
          <div className="space-y-6">
            {/* Vue grille */}
            <div className="bg-gray-50 rounded-xl p-4 overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-8 gap-2">
                  {/* En-têtes */}
                  <div className="font-semibold text-sm text-gray-700 p-2">Heure</div>
                  {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map(jour => (
                    <div key={jour} className="font-semibold text-sm text-gray-700 p-2 text-center">{jour}</div>
                  ))}
                  
                  {/* Créneaux horaires */}
                  {['08:00-10:00', '10:00-12:00', '14:00-16:00', '16:00-18:00'].map(creneau => (
                    <div key={creneau} className="contents">
                      <div className="text-xs text-gray-600 p-2 font-medium">{creneau}</div>
                      {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map(jour => {
                        const cours = selectedEdt.cours.find(c => c.jour === jour && 
                          ((c.heureDebut === '08:00' && creneau === '08:00-10:00') ||
                           (c.heureDebut === '10:00' && creneau === '10:00-12:00') ||
                           (c.heureDebut === '14:00' && creneau === '14:00-16:00') ||
                           (c.heureDebut === '16:00' && creneau === '16:00-18:00')));
                        
                        return (
                          <div key={`${jour}-${creneau}`} className="p-1 min-h-[60px]">
                            {cours ? (
                              <div className="bg-purple-100 border border-purple-200 rounded-lg p-2 h-full">
                                <div className="text-xs font-semibold text-purple-900 truncate">{cours.matiere}</div>
                                <div className="text-xs text-purple-700 truncate">{cours.professeur}</div>
                                <div className="text-xs text-purple-600 truncate">{cours.salle}</div>
                              </div>
                            ) : (
                              <div className="bg-white border border-gray-200 rounded-lg h-full"></div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Liste détaillée */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Détail des cours</h3>
              <div className="grid gap-3">
                {selectedEdt.cours.map((cours, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <CalendarDays className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{cours.jour} - {cours.heureDebut} à {cours.heureFin}</div>
                        <div className="text-sm text-gray-600">{cours.matiere}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{cours.professeur}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{cours.salle}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent">
            Emplois du Temps
          </h1>
          <p className="text-gray-600 mt-1">Gérez les planning des cours et sessions d'examens</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-1">
          <TabsTrigger value="cours" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">
            <BookOpen className="h-4 w-4 mr-2" />
            Cours Hebdomadaires
          </TabsTrigger>
          <TabsTrigger value="sessions" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">
            <CalendarDays className="h-4 w-4 mr-2" />
            Sessions d'Examens
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="cours" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Planning des Cours</h2>
                <p className="text-gray-600">Emplois du temps par filière et niveau</p>
              </div>
              <Button onClick={() => alert('Fonctionnalité à implémenter')} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un EDT
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {edtCours.map((edt) => (
                <CoursCard key={edt.id} edt={edt} />
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sessions" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Sessions d'Examens</h2>
                <p className="text-gray-600">Planning des examens par filière et niveau</p>
              </div>
              <Button onClick={() => alert('Fonctionnalité à implémenter')} className="bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Session
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.values(sessionsGrouped).map((group, idx) => (
                <SessionsGroup key={idx} group={group} />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <EdtDetailsModal />
    </div>
  );
}

