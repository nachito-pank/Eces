"use client";

import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  CalendarDays, 
  Download, 
  Edit, 
  Eye, 
  Plus, 
  BookOpen, 
  Clock, 
  MapPin, 
  Building, 
  Timer, 
  User 
} from 'lucide-react';
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
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50/50 hover:to-blue-50 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg font-semibold text-gray-900">{edt.filiere}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                {edt.niveau}
              </Badge>
              <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono text-gray-700">
                {edt.code}
              </code>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-blue-600">{edt.cours.length}</span>
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
            className="flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
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
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          {group.sessions.map((session) => (
            <div key={session.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden">
              {/* En-tête avec informations principales */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-3 border-b border-orange-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200 px-3 py-1 text-sm font-medium">
                      Session {session.session}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(session.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {session.heure}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
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
              </div>
              
              {/* Contenu principal avec matière et salle */}
              <div className="p-4">
                {/* Matière - ligne dédiée avec espace suffisant */}
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-orange-600" />
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Matière</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight">
                    {session.matiere}
                  </h3>
                </div>
                
                {/* Informations secondaires en dessous */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Salle */}
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-orange-600" />
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Salle</div>
                      <div className="bg-orange-100 text-orange-800 px-3 py-1.5 rounded-lg font-medium text-sm border border-orange-200 whitespace-nowrap">
                        {session.salle}
                      </div>
                    </div>
                  </div>
                  
                  {/* Site si présent */}
                  {session.site && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-orange-600" />
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Site</div>
                        <div className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg font-medium text-sm border border-gray-200 whitespace-nowrap">
                          {session.site}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Durée si présente */}
                  {session.duree && (
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Durée</div>
                        <div className="text-sm font-medium text-gray-700">
                          {session.duree}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent">
            Emplois du Temps
          </h1>
          <p className="text-gray-600 mt-1">Gérez les planning des cours et sessions d'examens</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-1">
          <TabsTrigger value="cours" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md text-sm">
            <BookOpen className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Cours Hebdomadaires</span>
            <span className="sm:hidden">Cours</span>
          </TabsTrigger>
          <TabsTrigger value="sessions" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md text-sm">
            <CalendarDays className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Sessions d'Examens</span>
            <span className="sm:hidden">Sessions</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="cours" className="mt-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Planning des Cours</h2>
                <p className="text-gray-600">Emplois du temps par filière et niveau</p>
              </div>
              <EdtCoursForm onSubmit={handleEdtSubmit} edtToEdit={edtToEdit} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {edtCours.map((edt) => (
                <CoursCard key={edt.id} edt={edt} />
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sessions" className="mt-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Sessions d'Examens</h2>
                <p className="text-gray-600">Planning des examens par filière et niveau</p>
              </div>
              <EdtSessionForm onSubmit={handleSessionSubmit} sessionToEdit={sessionToEdit} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Object.values(sessionsGrouped).map((group, idx) => (
                <Card key={idx} className="group hover:shadow-lg transition-all duration-300 border border-blue-100 bg-gradient-to-br from-white to-blue-50/30 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                          <CalendarDays className="h-5 w-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-base font-bold text-white leading-tight" style={{display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {group.filiere}
                          </CardTitle>
                          <CardDescription className="text-blue-100 text-xs font-medium">
                            {group.niveau} • {group.sessions.length} session{group.sessions.length > 1 ? 's' : ''}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4">
                    {/* Première session en aperçu */}
                    {group.sessions.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-col gap-2 mb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1.5 text-xs font-semibold">
                              Session {group.sessions[0].session}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                              <CalendarDays className="h-3 w-3" />
                              <span className="whitespace-nowrap">
                                {new Date(group.sessions[0].date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                              <Clock className="h-3 w-3" />
                              <span className="whitespace-nowrap font-medium">
                                {group.sessions[0].heure}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex items-center gap-1 mb-2">
                            <BookOpen className="h-3 w-3 text-blue-600" />
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Matière</span>
                          </div>
                          <h4 className="text-sm font-semibold text-gray-900 leading-snug" style={{wordBreak: 'break-word', overflowWrap: 'break-word', lineHeight: '1.4'}}>
                            {group.sessions[0].matiere}
                          </h4>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100">
                            <MapPin className="h-3 w-3 text-blue-600 flex-shrink-0" />
                            <span className="text-xs font-medium text-blue-800 whitespace-nowrap">
                              {group.sessions[0].salle}
                            </span>
                          </div>
                          
                          {group.sessions[0].site && (
                            <div className="flex items-center gap-1.5 bg-purple-50 px-3 py-1.5 rounded-md border border-purple-100">
                              <Building className="h-3 w-3 text-purple-600 flex-shrink-0" />
                              <span className="text-xs font-medium text-purple-800 whitespace-nowrap">
                                {group.sessions[0].site}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Indicateur de sessions supplémentaires */}
                    {group.sessions.length > 1 && (
                      <div className="text-center py-2 border-t border-blue-100">
                        <span className="text-xs text-gray-500">
                          +{group.sessions.length - 1} autre{group.sessions.length - 1 > 1 ? 's' : ''} session{group.sessions.length - 1 > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                    
                    {/* Boutons d'action */}
                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => downloadEdt('sessions', group.filiere, group.niveau)}
                        className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50 text-xs"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Exporter
                      </Button>
                      <Button 
                          variant="default"
                          size="sm"
                          onClick={() => {
                            // Créer un modal simple pour voir toutes les sessions
                            const modal = document.createElement('div');
                            modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4';
                            modal.style.cssText = 'animation: fadeIn 0.3s ease-out';
                            
                            // Contenu HTML simple
                            let sessionsHtml = '';
                            group.sessions.forEach((session) => {
                              const formattedDate = new Date(session.date).toLocaleDateString('fr-FR', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              });
                              
                              sessionsHtml += `
                                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 1.25rem; margin-bottom: 1rem;">
                                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; gap: 1rem;">
                                    <div style="flex: 1; min-width: 0;">
                                      <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
                                        <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 600; font-size: 0.875rem;">
                                          Session ${session.session}
                                        </div>
                                        <div style="display: flex; align-items: center; gap: 0.5rem; color: #64748b; font-size: 0.875rem; background: #f1f5f9; padding: 0.375rem 0.75rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
                                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                          </svg>
                                          <span>${formattedDate}</span>
                                        </div>
                                        <div style="display: flex; align-items: center; gap: 0.5rem; color: #64748b; font-size: 0.875rem; background: #f1f5f9; padding: 0.375rem 0.75rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
                                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                          </svg>
                                          <span>${session.heure}</span>
                                        </div>
                                      </div>
                                      <h3 style="font-size: 1.125rem; font-weight: 600; color: #1e293b; margin-bottom: 1rem; line-height: 1.4; word-break: break-word;">
                                        ${session.matiere}
                                      </h3>
                                    </div>
                                    <div style="display: flex; gap: 0.5rem;">
                                      <button onclick="alert('Détails de la session ' + ${session.id})" style="padding: 0.5rem; border-radius: 0.5rem; border: none; background: #dbeafe; color: #1e40af; cursor: pointer;">
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                        </svg>
                                      </button>
                                      <button onclick="alert('Éditer la session ' + ${session.id})" style="padding: 0.5rem; border-radius: 0.5rem; border: none; background: #dcfce7; color: #166534; cursor: pointer;">
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                  
                                  <div style="display: flex; flex-wrap: gap: 0.5rem;">
                                    <div style="display: flex; align-items: center; gap: 0.375rem; padding: 0.5rem 0.875rem; border-radius: 0.5rem; font-size: 0.813rem; font-weight: 500; border: 1px solid #f59e0b; background: #fef3c7; color: #92400e;">
                                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                      </svg>
                                      <span>${session.salle}</span>
                                    </div>
                                    ${session.site ? `
                                    <div style="display: flex; align-items: center; gap: 0.375rem; padding: 0.5rem 0.875rem; border-radius: 0.5rem; font-size: 0.813rem; font-weight: 500; border: 1px solid #9333ea; background: #f3e8ff; color: #6b21a8;">
                                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                      </svg>
                                      <span>${session.site}</span>
                                    </div>
                                    ` : ''}
                                    ${session.duree ? `
                                    <div style="display: flex; align-items: center; gap: 0.375rem; padding: 0.5rem 0.875rem; border-radius: 0.5rem; font-size: 0.813rem; font-weight: 500; border: 1px solid #22c55e; background: #dcfce7; color: #166534;">
                                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                      </svg>
                                      <span>${session.duree}</span>
                                    </div>
                                    ` : ''}
                                  </div>
                                </div>
                              `;
                            });
                            
                            modal.innerHTML = `
                              <div style="max-width: 900px; width: 100%; background: white; border-radius: 1rem; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
                                <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem;">
                                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                    <div style="flex: 1; min-width: 0;">
                                      <h1 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 0.5rem; line-height: 1.2;">${group.filiere} - ${group.niveau}</h1>
                                      <div style="display: flex; align-items: center; gap: 1rem; color: rgba(255,255,255,0.9); font-size: 0.875rem;">
                                        <span style="background: rgba(255,255,255,0.2); padding: 0.25rem 0.75rem; border-radius: 9999px; font-weight: 500;">${group.sessions.length} session${group.sessions.length > 1 ? 's' : ''}</span>
                                      </div>
                                    </div>
                                    <button onclick="this.closest('.fixed').remove()" style="background: rgba(255, 255, 255, 0.2); border: 1px solid rgba(255, 255, 255, 0.3); color: white; padding: 0.5rem; border-radius: 0.5rem; cursor: pointer;">
                                      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                                
                                <div style="max-height: 60vh; overflow-y: auto; padding: 1.5rem; background: #f8fafc;">
                                  <div style="display: grid; gap: 1rem;">
                                    ${sessionsHtml}
                                  </div>
                                </div>
                                
                                <div style="background: white; border-top: 1px solid #e2e8f0; padding: 1.5rem;">
                                  <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                                    <div>
                                      <button onclick="alert('Export PDF pour ${group.filiere} ${group.niveau}')" style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; border: none; cursor: pointer; font-weight: 500; display: flex; align-items: center; gap: 0.5rem;">
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                        </svg>
                                        Exporter PDF
                                      </button>
                                    </div>
                                    <div style="color: #64748b; font-size: 0.75rem;">
                                      ${group.sessions.length} session${group.sessions.length > 1 ? 's' : ''} • ${group.filiere} ${group.niveau}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            `;
                            
                            document.body.appendChild(modal);
                            modal.onclick = (e) => {
                              if (e.target === modal) {
                                modal.remove();
                              }
                            };
                          }}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Détails
                        </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <EdtDetailsModal />
    </div>
  );
}

