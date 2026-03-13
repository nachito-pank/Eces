"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, User, Mail, Phone, BookOpen, GraduationCap, Edit, Trash2, Users } from 'lucide-react';
import adminsData from '@/data/admins.json';
import ProfesseurForm from '@/components/dashboard/sous-admin/ProfesseurForm';

export default function ProfesseursPage() {
  const [professeurs, setProfesseurs] = useState(adminsData.enseignants || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFiliere, setFilterFiliere] = useState('tous');
  const [filterNiveau, setFilterNiveau] = useState('tous');
  const [professeurToEdit, setProfesseurToEdit] = useState(null);

  // Get unique filières and niveaux from professeurs
  const uniqueFilieres = ['tous', ...new Set(professeurs.flatMap(prof => prof.filieres || []))];
  const uniqueNiveaux = ['tous', ...new Set(professeurs.flatMap(prof => prof.niveaux || []))];

  const filteredProfesseurs = professeurs.filter(prof => {
    const matchesSearch = prof.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prof.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prof.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFiliere = filterFiliere === 'tous' || prof.filieres?.includes(filterFiliere);
    const matchesNiveau = filterNiveau === 'tous' || prof.niveaux?.includes(filterNiveau);
    
    return matchesSearch && matchesFiliere && matchesNiveau;
  });

  const handleProfesseurSubmit = (data: any) => {
    if (professeurToEdit) {
      // Mode édition
      setProfesseurs(prev => prev.map(prof => prof.id === data.id ? data : prof));
      setProfesseurToEdit(null);
    } else {
      // Mode ajout
      setProfesseurs(prev => [...prev, data]);
    }
  };

  const handleEditProfesseur = (professeur: any) => {
    setProfesseurToEdit(professeur);
  };

  const handleDeleteProfesseur = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce professeur ?')) {
      setProfesseurs(prev => prev.filter(prof => prof.id !== id));
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Actif': return 'bg-green-100 text-green-800 border-green-200';
      case 'Inactif': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAvatarColor = (couleur: string) => {
    return couleur || '#3B82F6';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            Professeurs
          </h1>
          <p className="text-gray-600 mt-1">Gérez les professeurs et leurs attributions</p>
        </div>
        <ProfesseurForm onSubmit={handleProfesseurSubmit} professeurToEdit={professeurToEdit} />
      </div>

      {/* Filtres et recherche */}
      <Card className="border-blue-100">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Rechercher par nom, prénom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Filière</label>
              <select 
                value={filterFiliere} 
                onChange={(e) => setFilterFiliere(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm"
              >
                {uniqueFilieres.map(filiere => (
                  <option key={filiere} value={filiere}>
                    {filiere === 'tous' ? 'Toutes les filières' : filiere}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Niveau</label>
              <select 
                value={filterNiveau} 
                onChange={(e) => setFilterNiveau(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm"
              >
                {uniqueNiveaux.map(niveau => (
                  <option key={niveau} value={niveau}>
                    {niveau === 'tous' ? 'Tous les niveaux' : niveau}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-900">{professeurs.length}</div>
            <div className="text-sm text-blue-700">Total Professeurs</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-900">{professeurs.filter(p => p.statut === 'Actif').length}</div>
            <div className="text-sm text-green-700">Professeurs Actifs</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-900">
              {new Set(professeurs.flatMap(p => p.matieres || [])).size}
            </div>
            <div className="text-sm text-purple-700">Matières Enseignées</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <GraduationCap className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-900">
              {new Set(professeurs.flatMap(p => p.filieres || [])).size}
            </div>
            <div className="text-sm text-orange-700">Filières Couvertes</div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des professeurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfesseurs.map((professeur) => (
          <Card key={professeur.id} className="group hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50/50 hover:to-blue-50 overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                    style={{ backgroundColor: getAvatarColor(professeur.couleur) }}
                  >
                    {professeur.avatar || `${professeur.prenom.charAt(0)}${professeur.nom.charAt(0)}`.toUpperCase()}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {professeur.prenom} {professeur.nom}
                    </CardTitle>
                    <Badge className={getStatutColor(professeur.statut)}>
                      {professeur.statut}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditProfesseur(professeur)}
                    className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteProfesseur(professeur.id)}
                    className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 truncate">{professeur.email}</span>
                </div>
                {professeur.telephone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{professeur.telephone}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    Matières ({professeur.matieres?.length || 0})
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {(professeur.matieres || []).slice(0, 3).map((matiere, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        {matiere}
                      </Badge>
                    ))}
                    {(professeur.matieres || []).length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{(professeur.matieres || []).length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <GraduationCap className="h-3 w-3" />
                    Filières ({professeur.filieres?.length || 0})
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {(professeur.filieres || []).slice(0, 2).map((filiere, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        {filiere}
                      </Badge>
                    ))}
                    {(professeur.filieres || []).length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{(professeur.filieres || []).length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-gray-700 mb-2">Niveaux</div>
                  <div className="flex flex-wrap gap-1">
                    {(professeur.niveaux || []).map((niveau, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                        {niveau}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {professeur.dateEmbauche && (
                <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                  Embauché le: {new Date(professeur.dateEmbauche).toLocaleDateString('fr-FR')}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProfesseurs.length === 0 && (
        <Card className="text-center py-20 border-dashed border-gray-200">
          <CardContent>
            <Users className="h-20 w-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun professeur trouvé</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              {searchTerm || filterFiliere !== 'tous' || filterNiveau !== 'tous' 
                ? 'Aucun professeur ne correspond à vos critères de recherche.'
                : 'Commencez par ajouter le premier professeur à l\'école.'}
            </p>
            <ProfesseurForm onSubmit={handleProfesseurSubmit} triggerText="Ajouter le premier professeur" />
          </CardContent>
        </Card>
      )}

      <ProfesseurForm onSubmit={handleProfesseurSubmit} professeurToEdit={professeurToEdit} triggerText="Ajouter un professeur" />
    </div>
  );
}
