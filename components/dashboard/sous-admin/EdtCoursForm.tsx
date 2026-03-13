"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, CalendarDays, Clock, MapPin, User, Trash2 } from 'lucide-react';
import adminsData from '@/data/admins.json';
import type { EmploiDuTempsCours, FormEdtCours } from '@/types/sousadmin';

interface EdtCoursFormProps {
  onSubmit: (data: EmploiDuTempsCours) => void;
  edtToEdit?: EmploiDuTempsCours | null;
  triggerText?: string;
}

export default function EdtCoursForm({ onSubmit, edtToEdit, triggerText = 'Ajouter un EDT' }: EdtCoursFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormEdtCours>({
    niveau: edtToEdit?.niveau || '',
    filiere: edtToEdit?.filiere || '',
    code: edtToEdit?.code || '',
    cours: edtToEdit?.cours?.map(cours => ({ ...cours, classe: cours.classe || '' })) || []
  });

  useEffect(() => {
    if (edtToEdit) {
      setFormData({
        niveau: edtToEdit.niveau || '',
        filiere: edtToEdit.filiere || '',
        code: edtToEdit.code || '',
        cours: edtToEdit.cours?.map(cours => ({ ...cours, classe: cours.classe || '' })) || []
      });
    }
  }, [edtToEdit]);

  const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const creneaux = [
    { debut: '08:00', fin: '10:00' },
    { debut: '10:00', fin: '12:00' },
    { debut: '12:00', fin: '14:00' },
    { debut: '14:00', fin: '16:00' },
    { debut: '16:00', fin: '18:00' }
  ];

  const filieres = adminsData.filieres || [];
  const enseignants = adminsData.enseignants || [];

  // Extraire tous les niveaux uniques depuis les enseignants et les filières
  const niveauxFromEnseignants = Array.from(new Set(
    enseignants.flatMap((enseignant: any) => enseignant.niveaux || [])
  ));
  const niveauxFromFilieres = Array.from(new Set(
    filieres.map((filiere: any) => filiere.niveau).filter(Boolean)
  ));
  const niveauxDisponibles = Array.from(new Set([...niveauxFromEnseignants, ...niveauxFromFilieres]));
  
  // Créer une structure pour les filières par niveau
  const filieresGrouped = niveauxDisponibles.reduce((acc: Record<string, Array<{ id: string; nom: string; niveau: string }>>, niveau: string) => {
    acc[niveau] = filieres
      .filter((filiere: any) => filiere.niveau === niveau)
      .map((filiere: any) => ({
        id: filiere.id.toString(),
        nom: filiere.nom,
        niveau: filiere.niveau
      }));
    return acc;
  }, {} as Record<string, Array<{ id: string; nom: string; niveau: string }>>);

  const addCours = () => {
    setFormData(prev => ({
      ...prev,
      cours: [...prev.cours, {
        jour: '',
        heureDebut: '',
        heureFin: '',
        matiere: '',
        salle: '',
        professeur: '',
        classe: ''
      }]
    }));
  };

  const removeCours = (index: number) => {
    setFormData(prev => ({
      ...prev,
      cours: prev.cours.filter((_, i) => i !== index)
    }));
  };

  const updateCours = (index: number, field: keyof typeof formData.cours[0], value: string) => {
    setFormData(prev => ({
      ...prev,
      cours: prev.cours.map((cours, i) => 
        i === index ? { ...cours, [field]: value || '' } : cours
      )
    }));
  };

  const validateProfesseurLimit = (professeur: string, currentIndex: number) => {
    const coursDuProf = formData.cours.filter((cours, index) => 
      cours.professeur === professeur && index !== currentIndex
    );
    return coursDuProf.length < 3;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const edtData: EmploiDuTempsCours = {
      id: edtToEdit?.id || Date.now().toString(),
      ...formData
    };
    onSubmit(edtData);
    if (!edtToEdit) {
      setFormData({
        niveau: '',
        filiere: '',
        code: '',
        cours: []
      });
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button 
        data-edt-cours-form-trigger
        onClick={() => setOpen(true)}
        className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2 shadow-lg"
      >
        {edtToEdit ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        <span>{edtToEdit ? 'Modifier EDT' : triggerText}</span>
      </Button>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto rounded-2xl p-8">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-purple-600" />
            {edtToEdit ? 'Modifier l\'Emploi du Temps' : 'Créer un Emploi du Temps'}
          </DialogTitle>
          <DialogDescription>
            {edtToEdit ? 'Modifiez les informations de l\'emploi du temps' : 'Configurez l\'emploi du temps pour une filière et un niveau'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informations générales */}
          <div className="bg-gray-50 rounded-xl p-6" style={{maxHeight: '180px', overflowY: 'auto'}}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-purple-600" />
              Informations générales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Niveau <span className="text-red-500">*</span></label>
                <Select value={formData.niveau} onValueChange={(value: string | null) => setFormData(prev => ({ ...prev, niveau: value || '' }))}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Sélectionner un niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    {niveauxDisponibles.map((niveau: string) => (
                      <SelectItem key={niveau} value={niveau}>{niveau}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Filière <span className="text-red-500">*</span></label>
                <Select 
                  value={formData.filiere} 
                  onValueChange={(value: string | null) => setFormData(prev => ({ ...prev, filiere: value || '' }))}
                  disabled={!formData.niveau}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Sélectionner une filière" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.niveau && filieresGrouped[formData.niveau] ? 
                      filieresGrouped[formData.niveau].map((filiere: { id: string; nom: string; niveau: string }) => (
                        <SelectItem key={filiere.id} value={filiere.nom}>{filiere.nom}</SelectItem>
                      )) : 
                      <SelectItem value="" disabled>Aucune filière disponible</SelectItem>
                    }
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Code</label>
                <Input
                  value={formData.code}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                  placeholder="Ex: GI-L1"
                  className="h-12"
                />
              </div>
            </div>
          </div>

          {/* Liste des cours */}
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                Liste des cours ({formData.cours.length})
              </h3>
              <Button type="button" onClick={addCours} variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un cours
              </Button>
            </div>

            {formData.cours.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg bg-white">
                <CalendarDays className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Aucun cours ajouté</p>
                <Button type="button" onClick={addCours} variant="outline" className="mt-4">
                  Ajouter le premier cours
                </Button>
              </div>
            ) : (
              <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
                {formData.cours.map((cours, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-semibold text-gray-900">Cours {index + 1}</h4>
                      <Button 
                        type="button" 
                        onClick={() => removeCours(index)} 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-purple-600" />
                            Jour
                          </label>
                          <Select value={cours.jour} onValueChange={(value: string | null) => updateCours(index, 'jour', value || '')}>
                            <SelectTrigger className="h-12">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {jours.map(jour => (
                                <SelectItem key={jour} value={jour}>{jour}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <Clock className="h-4 w-4 text-purple-600" />
                            Créneau
                          </label>
                          <Select 
                            value={`${cours.heureDebut}-${cours.heureFin}`} 
                            onValueChange={(value: string | null) => {
                              if (value) {
                                const [debut, fin] = value.split('-');
                                updateCours(index, 'heureDebut', debut);
                                updateCours(index, 'heureFin', fin);
                              }
                            }}
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {creneaux.map(creneau => (
                                <SelectItem key={creneau.debut} value={`${creneau.debut}-${creneau.fin}`}>
                                  {creneau.debut} - {creneau.fin}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Matière</label>
                          <Input
                            value={cours.matiere}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCours(index, 'matiere', e.target.value)}
                            placeholder="Nom de la matière"
                            className="h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-purple-600" />
                            Salle
                          </label>
                          <Input
                            value={cours.salle}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCours(index, 'salle', e.target.value)}
                            placeholder="Ex: A101"
                            className="h-12"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <User className="h-4 w-4 text-purple-600" />
                            Professeur
                          </label>
                          <Select 
                            value={cours.professeur || ''} 
                            onValueChange={(value: string | null) => {
                              if (value && validateProfesseurLimit(value, index)) {
                                updateCours(index, 'professeur', value);
                              } else if (value) {
                                alert('Ce professeur a déjà atteint la limite de 3 cours par jour.');
                              }
                            }}
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Sélectionner un professeur" />
                            </SelectTrigger>
                            <SelectContent>
                              {enseignants && enseignants.length > 0 ? 
                                enseignants.map(enseignant => (
                                  <SelectItem key={enseignant.id} value={`${enseignant.prenom} ${enseignant.nom}`}>
                                    {enseignant.prenom} {enseignant.nom}
                                  </SelectItem>
                                )) : 
                                <SelectItem value="" disabled>Aucun enseignant disponible</SelectItem>
                              }
                            </SelectContent>
                          </Select>
                          {cours.professeur && (
                            <Badge variant="outline" className="text-xs mt-2">
                              {formData.cours.filter(c => c.professeur === cours.professeur).length}/3 cours
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Classe</label>
                          <Input
                            value={cours.classe || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCours(index, 'classe', e.target.value)}
                            placeholder="Optionnel"
                            className="h-12"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>

        <DialogFooter className="gap-3 pt-6">
          <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
            Annuler
          </Button>
          <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700 shadow-lg" disabled={!formData.niveau || !formData.filiere || !formData.code || formData.cours.length === 0}>
            {edtToEdit ? 'Mettre à jour' : 'Créer l\'emploi du temps'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
