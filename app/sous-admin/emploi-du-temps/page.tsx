"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CalendarDays, Download, Plus, Eye, BookOpen, Clock, MapPin, User, Edit } from 'lucide-react';
import adminsData from '@/data/admins.json';
import type { EmploiDuTempsCours, EmploiDuTempsSession } from '@/types/sousadmin';
import EdtCoursForm from '@/components/dashboard/sous-admin/EdtCoursForm';
import EdtSessionForm from '@/components/dashboard/sous-admin/EdtSessionForm';
import { generateEdtPdf } from '@/utils/pdfGenerator';

export default function EmploiDuTempsPage() {
  const [activeTab, setActiveTab] = useState('cours');
  const [selectedEdt, setSelectedEdt] = useState<EmploiDuTempsCours | null>(null);
  const [edtToEdit, setEdtToEdit] = useState<EmploiDuTempsCours | null>(null);
  const [sessionToEdit, setSessionToEdit] = useState<EmploiDuTempsSession | null>(null);
  const [edtCours, setEdtCours] = useState<EmploiDuTempsCours[]>(adminsData.emploiDuTemps || []);
  const [edtSessions, setEdtSessions] = useState<EmploiDuTempsSession[]>(adminsData.emploiDuTempsSessions || []);

  const handleEdtSubmit = (data: EmploiDuTempsCours) => {
    if (edtToEdit) {
      // Mode édition
      setEdtCours(prev => prev.map(edt => edt.id === data.id ? data : edt));
      setEdtToEdit(null);
    } else {
      // Mode ajout
      setEdtCours(prev => [...prev, data]);
    }
  };

  const handleSessionSubmit = (data: EmploiDuTempsSession) => {
    if (sessionToEdit) {
      // Mode édition
      setEdtSessions(prev => prev.map(session => session.id === data.id ? data : session));
      setSessionToEdit(null);
    } else {
      // Mode ajout
      setEdtSessions(prev => [...prev, data]);
    }
  };

  const handleEditEdt = (edt: EmploiDuTempsCours) => {
    setEdtToEdit(edt);
    // Ouvrir automatiquement le modal
    setTimeout(() => {
      const dialogTrigger = document.querySelector('[data-edt-cours-form-trigger]') as HTMLElement;
      if (dialogTrigger) {
        dialogTrigger.click();
      }
    }, 100);
  };

  const handleEditSession = (session: EmploiDuTempsSession) => {
    setSessionToEdit(session);
    // Ouvrir automatiquement le modal
    setTimeout(() => {
      const dialogTrigger = document.querySelector('[data-edt-session-form-trigger]') as HTMLElement;
      if (dialogTrigger) {
        dialogTrigger.click();
      }
    }, 100);
  };

  const handleViewSessionDetails = (session: EmploiDuTempsSession) => {
    // Créer un modal professionnel pour voir les détails de la session
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-200">
        <div class="flex flex-col h-full">
          <!-- En-tête -->
          <div class="relative bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white">
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <h2 class="text-2xl font-bold mb-2">Détails de la Session d'Examen</h2>
                <div class="flex items-center gap-4 text-orange-100">
                  <span class="text-sm font-medium">${session.matiere}</span>
                  <span class="text-sm">•</span>
                  <span class="text-sm">${session.session}</span>
                </div>
              </div>
              <button onclick="this.closest('.fixed').remove()" class="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/20 rounded-lg">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Contenu -->
          <div class="flex-1 overflow-y-auto p-6 bg-gray-50">
            <div class="max-w-4xl mx-auto">
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  <!-- Colonne gauche -->
                  <div class="space-y-4">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                      </div>
                      <div>
                        <div class="text-sm text-gray-500">Matière</div>
                        <div class="font-semibold text-gray-900">${session.matiere}</div>
                      </div>
                    </div>
                    
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <div class="text-sm text-gray-500">Date</div>
                        <div class="font-semibold text-gray-900">${new Date(session.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                      </div>
                    </div>
                    
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <div class="text-sm text-gray-500">Heure</div>
                        <div class="font-semibold text-gray-900">${session.heure}</div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Colonne droite -->
                  <div class="space-y-4">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <div class="text-sm text-gray-500">Durée</div>
                        <div class="font-semibold text-gray-900">${session.duree}</div>
                      </div>
                    </div>
                    
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                      </div>
                      <div>
                        <div class="text-sm text-gray-500">Salle</div>
                        <div class="font-semibold text-gray-900">${session.salle}</div>
                      </div>
                    </div>
                    
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <div class="text-sm text-gray-500">Site</div>
                        <div class="font-semibold text-gray-900">${session.site}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Pied avec informations supplémentaires -->
          <div class="bg-white border-t border-gray-200 px-6 py-4">
            <div class="max-w-4xl mx-auto flex items-center justify-between">
              <div class="flex items-center gap-4">
                <span class="text-sm text-gray-600">
                  <span class="font-medium">Filière:</span> ${session.filiere}
                </span>
                <span class="text-sm text-gray-600">
                  <span class="font-medium">Niveau:</span> ${session.niveau}
                </span>
                <span class="text-sm text-gray-600">
                  <span class="font-medium">Code:</span> ${session.code}
                </span>
              </div>
              <span class="text-xs text-gray-400">
                ID: ${session.id}
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Gestion du clic pour fermer
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    };
    
    // Gestion de la touche Échap
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
    
    document.body.appendChild(modal);
  };

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

  const downloadEdt = async (type: 'cours' | 'sessions', filiere: string, niveau: string, data?: any) => {
    try {
      if (type === 'cours') {
        const edtData = edtCours.find(edt => edt.filiere === filiere && edt.niveau === niveau);
        if (edtData) {
          await generateEdtPdf({
            filiere,
            niveau,
            type: 'cours',
            data: edtData
          });
        }
      } else {
        const sessionData = edtSessions.filter(session => session.filiere === filiere && session.niveau === niveau);
        if (sessionData.length > 0) {
          await generateEdtPdf({
            filiere,
            niveau,
            type: 'sessions',
            data: sessionData
          });
        }
      }
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Une erreur est survenue lors de la génération du PDF');
    }
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
            onClick={() => handleEditEdt(edt)}
            className="flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
          >
            <Edit className="h-4 w-4 mr-1" />
            Modifier
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
                  onClick={() => handleViewSessionDetails(session)}
                  className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleEditSession(session)}
                  className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600"
                >
                  <Edit className="h-4 w-4" />
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
              <EdtCoursForm onSubmit={handleEdtSubmit} edtToEdit={edtToEdit} />
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
              <EdtSessionForm onSubmit={handleSessionSubmit} sessionToEdit={sessionToEdit} />
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

