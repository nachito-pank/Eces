"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, User, Mail, Phone, BookOpen, GraduationCap, X } from 'lucide-react';
import adminsData from '@/data/admins.json';

interface ProfesseurFormProps {
  onSubmit: (data: any) => void;
  professeurToEdit?: any;
  triggerText?: string;
}

export default function ProfesseurForm({ onSubmit, professeurToEdit, triggerText = 'Ajouter un Professeur' }: ProfesseurFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    role: 'enseignant',
    id: professeurToEdit?.id || Date.now(),
    nom: professeurToEdit?.nom || '',
    prenom: professeurToEdit?.prenom || '',
    email: professeurToEdit?.email || '',
    motDePasse: professeurToEdit?.motDePasse || 'prof123',
    telephone: professeurToEdit?.telephone || '',
    matieres: professeurToEdit?.matieres || [],
    filieres: professeurToEdit?.filieres || [],
    niveaux: professeurToEdit?.niveaux || [],
    statut: professeurToEdit?.statut || 'Actif',
    dateEmbauche: professeurToEdit?.dateEmbauche || new Date().toISOString().split('T')[0],
    avatar: professeurToEdit?.avatar || '',
    couleur: professeurToEdit?.couleur || '#3B82F6'
  });

  const [newMatiere, setNewMatiere] = useState('');
  const [newFiliere, setNewFiliere] = useState('');
  const [newNiveau, setNewNiveau] = useState('');

  const filieres = adminsData.filieres || [];
  const niveauxDisponibles = ['L1', 'L2', 'L3', 'M1', 'M2', 'L+1'];
  const couleurs = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#EC4899', '#F97316', '#6366F1', '#84CC16'];

  const addMatiere = () => {
    if (newMatiere.trim() && !formData.matieres.includes(newMatiere.trim())) {
      setFormData(prev => ({
        ...prev,
        matieres: [...prev.matieres, newMatiere.trim()]
      }));
      setNewMatiere('');
    }
  };

  const removeMatiere = (matiere: string) => {
    setFormData(prev => ({
      ...prev,
      matieres: prev.matieres.filter((m: string) => m !== matiere)
    }));
  };

  const addFiliere = () => {
    if (newFiliere.trim() && !formData.filieres.includes(newFiliere.trim())) {
      setFormData(prev => ({
        ...prev,
        filieres: [...prev.filieres, newFiliere.trim()]
      }));
      setNewFiliere('');
    }
  };

  const removeFiliere = (filiere: string) => {
    setFormData(prev => ({
      ...prev,
      filieres: prev.filieres.filter((f: string) => f !== filiere)
    }));
  };

  const addNiveau = () => {
    if (newNiveau.trim() && !formData.niveaux.includes(newNiveau.trim())) {
      setFormData(prev => ({
        ...prev,
        niveaux: [...prev.niveaux, newNiveau.trim()]
      }));
      setNewNiveau('');
    }
  };

  const removeNiveau = (niveau: string) => {
    setFormData(prev => ({
      ...prev,
      niveaux: prev.niveaux.filter((n: string) => n !== niveau)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Générer l'avatar à partir du nom et prénom
    if (!formData.avatar) {
      const avatar = `${formData.prenom.charAt(0)}${formData.nom.charAt(0)}`.toUpperCase();
      setFormData(prev => ({ ...prev, avatar }));
    }
    
    onSubmit(formData);
    if (!professeurToEdit) {
      setFormData({
        role: 'enseignant',
        id: Date.now(),
        nom: '',
        prenom: '',
        email: '',
        motDePasse: 'prof123',
        telephone: '',
        matieres: [],
        filieres: [],
        niveaux: [],
        statut: 'Actif',
        dateEmbauche: new Date().toISOString().split('T')[0],
        avatar: '',
        couleur: '#3B82F6'
      });
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button 
        onClick={() => setOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 shadow-lg"
      >
        {professeurToEdit ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        <span>{professeurToEdit ? 'Modifier Professeur' : triggerText}</span>
      </Button>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <User className="h-6 w-6 text-blue-600" />
            {professeurToEdit ? 'Modifier le Professeur' : 'Ajouter un Professeur'}
          </DialogTitle>
          <DialogDescription>
            {professeurToEdit ? 'Modifiez les informations du professeur' : 'Configurez les informations du nouveau professeur'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations personnelles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Nom <span className="text-red-500">*</span></label>
              <Input
                value={formData.nom}
                onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
                placeholder="Nom du professeur"
                className="h-12 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Prénom <span className="text-red-500">*</span></label>
              <Input
                value={formData.prenom}
                onChange={(e) => setFormData(prev => ({ ...prev, prenom: e.target.value }))}
                placeholder="Prénom du professeur"
                className="h-12 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block flex items-center gap-1">
                <Mail className="h-4 w-4" />
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="email@ecole.fr"
                className="h-12 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block flex items-center gap-1">
                <Phone className="h-4 w-4" />
                Téléphone
              </label>
              <Input
                value={formData.telephone}
                onChange={(e) => setFormData(prev => ({ ...prev, telephone: e.target.value }))}
                placeholder="+33 6 12 34 56 78"
                className="h-12 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Date d'embauche</label>
              <Input
                type="date"
                value={formData.dateEmbauche}
                onChange={(e) => setFormData(prev => ({ ...prev, dateEmbauche: e.target.value }))}
                className="h-12 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Statut</label>
              <Select value={formData.statut} onValueChange={(value) => setFormData(prev => ({ ...prev, statut: value ?? 'Actif' }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="Inactif">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Matières */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 block flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Matières enseignées
            </label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={newMatiere}
                onChange={(e) => setNewMatiere(e.target.value)}
                placeholder="Ajouter une matière"
                className="h-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMatiere())}
              />
              <Button type="button" onClick={addMatiere} variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Ajouter
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.matieres.map((matiere: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 flex items-center gap-1">
                  {matiere}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-blue-600" 
                    onClick={() => removeMatiere(matiere)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Filières */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 block">Filières</label>
            <div className="flex gap-2">
              <Select value={newFiliere} onValueChange={(value) => setNewFiliere(value ?? '')}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Sélectionner une filière" />
                </SelectTrigger>
                <SelectContent>
                  {filieres.map(filiere => (
                    <SelectItem key={filiere.id} value={filiere.nom}>{filiere.nom}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={addFiliere} variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Ajouter
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.filieres.map((filiere: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
                  {filiere}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-green-600" 
                    onClick={() => removeFiliere(filiere)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Niveaux */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 block flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Niveaux
            </label>
            <div className="flex gap-2">
              <Select value={newNiveau} onValueChange={(value) => setNewNiveau(value ?? '')}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Sélectionner un niveau" />
                </SelectTrigger>
                <SelectContent>
                  {niveauxDisponibles.map(niveau => (
                    <SelectItem key={niveau} value={niveau}>{niveau}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={addNiveau} variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Ajouter
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.niveaux.map((niveau: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200 flex items-center gap-1">
                  {niveau}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-purple-600" 
                    onClick={() => removeNiveau(niveau)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Couleur */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 block">Couleur de profil</label>
            <div className="flex gap-2">
              {couleurs.map(couleur => (
                <button
                  key={couleur}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, couleur }))}
                  className={`w-8 h-8 rounded-full border-2 ${formData.couleur === couleur ? 'border-gray-900' : 'border-gray-300'}`}
                  style={{ backgroundColor: couleur }}
                />
              ))}
            </div>
          </div>

          <DialogFooter className="gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 shadow-lg" disabled={!formData.nom || !formData.prenom || !formData.email}>
              {professeurToEdit ? 'Mettre à jour' : 'Ajouter le professeur'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
