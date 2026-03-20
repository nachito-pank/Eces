"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Newspaper, Trash2, Edit, Eye, Plus, Sparkles, Filter, TrendingUp, Zap } from 'lucide-react';
import adminsData from '@/data/admins.json';
import ActuCard from '@/components/dashboard/sous-admin/ActuCard';
import ActuForm from '@/components/dashboard/sous-admin/ActuForm';
import type { Actualite } from '@/types/sousadmin';

export default function ActualitesPage() {
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [filterStatus, setFilterStatus] = useState<'tous' | 'publie' | 'brouillon'>('tous');
  const [actualiteToEdit, setActualiteToEdit] = useState<Actualite | null>(null);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [showActuForm, setShowActuForm] = useState(false);

  useEffect(() => {
    setActualites((((adminsData as any).actualites || []) as Actualite[]));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowFloatingButton(scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addActualite = (newActuData: any) => {
    if (actualiteToEdit) {
      // Mode édition
      setActualites(prev => prev.map(actu => actu.id === actualiteToEdit.id ? {
        ...actualiteToEdit,
        titre: newActuData.titre,
        contenu: newActuData.contenu,
        statut: newActuData.statut,
        ...(newActuData.image && { image: URL.createObjectURL(newActuData.image) })
      } : actu));
      setActualiteToEdit(null);
      setShowActuForm(false);
    } else {
      // Mode ajout
      const newActualite: Actualite = {
        id: `act_${Date.now()}`,
        titre: newActuData.titre,
        contenu: newActuData.contenu,
        datePublication: new Date().toISOString(),
        auteur: 'Sous-Admin',
        statut: newActuData.statut,
        ...(newActuData.image && { image: URL.createObjectURL(newActuData.image) })
      };
      setActualites(prev => [newActualite, ...prev]);
      setShowActuForm(false);
    }
  };

  const deleteActualite = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
      setActualites(prev => prev.filter(actu => actu.id !== id));
    }
  };

  const handleEditActualite = (actualite: Actualite) => {
    setActualiteToEdit(actualite);
    // Ouvrir automatiquement le modal
    setTimeout(() => {
      const dialogTrigger = document.querySelector('[data-actu-form-trigger]') as HTMLElement;
      if (dialogTrigger) {
        dialogTrigger.click();
      }
    }, 100);
  };

  const filteredActualites = useMemo(() => {
    return actualites.filter((actu) => {
      const matchesSearch = actu.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          actu.contenu.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = !dateFilter || actu.datePublication.startsWith(dateFilter);
      const matchesStatus = filterStatus === 'tous' || actu.statut === filterStatus;
      return matchesSearch && matchesDate && matchesStatus;
    });
  }, [actualites, searchTerm, dateFilter, filterStatus]);

  return (
    <div className="space-y-6 relative">
      {/* Bouton flottant pour créer une actualité */}
      {showFloatingButton && (
        <button
          onClick={() => setShowActuForm(true)}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full p-3 sm:p-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-1 sm:gap-2"
        >
          <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline text-xs sm:text-sm">Nouvelle actualité</span>
        </button>
      )}

      {/* Modal pour le formulaire d'actualité */}
      {showActuForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                {actualiteToEdit ? 'Modifier l\'actualité' : 'Nouvelle actualité'}
              </h3>
              <button
                onClick={() => {
                  setShowActuForm(false);
                  setActualiteToEdit(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl sm:text-base p-1"
              >
                ✕
              </button>
            </div>
            <ActuForm onSubmit={addActualite} actualiteToEdit={actualiteToEdit} />
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-gray-900 to-green-900 bg-clip-text dark:text-gray-300">
            Actualités
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Publiez et gérez les nouvelles de l&apos;école</p>
        </div>
        <ActuForm onSubmit={addActualite} actualiteToEdit={actualiteToEdit} />
      </div>

      {/* Statistiques en haut */}
      <Card>
        <CardContent className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center p-4 sm:p-6 bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">{actualites.length}</div>
            <div className="text-sm text-green-700 font-medium">Total Actualités</div>
          </div>
          <div className="text-center p-4 sm:p-6 bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">{actualites.filter(a => a.statut === 'publie').length}</div>
            <div className="text-sm text-blue-700 font-medium">Publiées</div>
          </div>
          <div className="text-center p-4 sm:p-6 bg-linear-to-br from-orange-50 to-yellow-100 rounded-2xl">
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">{filteredActualites.length}</div>
            <div className="text-sm text-orange-700 font-medium">Résultats actuels</div>
          </div>
        </CardContent>
      </Card>

      {/* Filtres */}
      <Card className="border-green-100">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Rechercher par titre ou contenu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm dark:bg-gray-600"
              />
            </div>
            <Input
              type="month"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              placeholder="Filtrer par date"
              className="max-w-sm text-sm dark:bg-gray-600"
            />
            <div className="flex gap-2">
              {(['tous', 'publie', 'brouillon'] as const).map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? 'default' : 'outline'}
                  onClick={() => setFilterStatus(status)}
                  className="whitespace-nowrap text-xs sm:text-sm"
                >
                  {status === 'tous' ? 'Tous' : status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grille actualités */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredActualites.map((actualite) => (
          <div key={actualite.id} className="relative group">
            <div className="h-full flex flex-col">
              <ActuCard actualite={actualite} />
              <div className="mt-2 flex gap-2 justify-center sm:justify-start">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditActualite(actualite)}
                  className="h-8 px-3 bg-white/90 hover:bg-white border-gray-200 hover:border-blue-300 text-blue-600 text-xs"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Modifier</span>
                  <span className="sm:hidden">Modif</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => deleteActualite(actualite.id)}
                  className="h-8 px-3 bg-white/90 hover:bg-white border-gray-200 hover:border-red-300 text-red-600 text-xs"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Supprimer</span>
                  <span className="sm:hidden">Suppr</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    // Créer un modal professionnel pour voir le contenu
                    const modal = document.createElement('div');
                    modal.className = 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm';
                    modal.innerHTML = `
                      <div class="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-gray-200">
                        <div class="flex flex-col h-full">
                          <!-- En-tête -->
                          <div class="relative bg-linear-to-r from-blue-600 to-purple-600 p-4 sm:p-6 text-white">
                            <div class="flex justify-between items-start">
                              <div class="flex-1">
                                <h2 class="text-xl sm:text-2xl font-bold mb-2">${actualite.titre}</h2>
                                <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-blue-100">
                                  <span class="text-sm font-medium">Par ${actualite.auteur}</span>
                                  <span class="text-sm">${new Date(actualite.datePublication).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                              </div>
                              <button onclick="this.closest('.fixed').remove()" class="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/20 rounded-lg">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                          
                          <!-- Contenu avec image à droite et texte à gauche -->
                          <div class="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
                            <div class="max-w-6xl mx-auto">
                              <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div class="flex flex-col lg:flex-row">
                                  <!-- Texte à gauche -->
                                  <div class="flex-1 p-4 sm:p-6 lg:p-8">
                                    <div class="prose prose-lg max-w-none">
                                      <div class="text-gray-800 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">${actualite.contenu.replace(/\n/g, '<br>')}</div>
                                    </div>
                                  </div>
                                  
                                  <!-- Image à droite -->
                                  ${actualite.image ? `
                                    <div class="lg:w-96 w-full lg:border-l border-gray-200 bg-gray-50 p-4 sm:p-6">
                                      <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                                        <img 
                                          src="${actualite.image}" 
                                          alt="${actualite.titre}" 
                                          class="w-full h-auto max-h-96 object-contain block"
                                        />
                                      </div>
                                    </div>
                                  ` : `
                                    <!-- Espace vide quand pas d'image -->
                                    <div class="lg:w-96"></div>
                                  `}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <!-- Pied avec statut -->
                          <div class="bg-white border-t border-gray-200 px-4 sm:px-6 py-4">
                            <div class="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <span class="text-sm text-gray-600">
                                Statut: <span class="font-medium ${actualite.statut === 'publie' ? 'text-green-600' : 'text-yellow-600'}">${actualite.statut === 'publie' ? 'Publié' : 'Brouillon'}</span>
                              </span>
                              <span class="text-xs text-gray-400">
                                ID: ${actualite.id}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    `;
                    
                    // Styles CSS pour le modal
                    const style = document.createElement('style');
                    style.textContent = `
                      .prose { 
                        color: #1f2937; 
                        line-height: 1.75; 
                        font-size: 16px;
                        font-family: system-ui, -apple-system, sans-serif;
                      }
                      .prose p { margin: 0; }
                      .backdrop-blur-sm { backdrop-filter: blur(4px); }
                      .aspect-video { aspect-ratio: 16 / 9; }
                    `;
                    document.head.appendChild(style);
                    
                    // Gestion du clic pour fermer
                    modal.onclick = (e) => {
                      if (e.target === modal) {
                        modal.remove();
                        style.remove();
                      }
                    };
                    
                    // Gestion de la touche Échap
                    const handleEscape = (e: KeyboardEvent) => {
                      if (e.key === 'Escape') {
                        modal.remove();
                        style.remove();
                        document.removeEventListener('keydown', handleEscape);
                      }
                    };
                    document.addEventListener('keydown', handleEscape);
                    
                    document.body.appendChild(modal);
                  }}
                  className="h-8 px-3 bg-white/90 hover:bg-white border-gray-200 hover:border-green-300 text-green-600 text-xs"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Voir</span>
                  <span className="sm:hidden">Voir</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredActualites.length === 0 && (
        <Card className="text-center py-20 border-dashed border-gray-200">
          <CardContent>
            <Newspaper className="h-20 w-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucune actualité</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Publiez la première actualité pour informer les étudiants des dernières nouvelles de l'école.
            </p>
            <ActuForm onSubmit={addActualite} actualiteToEdit={actualiteToEdit} triggerText="Publier la première actualité" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

