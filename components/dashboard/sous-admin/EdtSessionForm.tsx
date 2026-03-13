"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, CalendarDays, Clock, MapPin } from 'lucide-react';
import adminsData from '@/data/admins.json';
import type { EmploiDuTempsSession, FormEdtSession } from '@/types/sousadmin';

interface EdtSessionFormProps {
  onSubmit: (data: EmploiDuTempsSession) => void;
  sessionToEdit?: EmploiDuTempsSession | null;
  triggerText?: string;
}

export default function EdtSessionForm({ onSubmit, sessionToEdit, triggerText = 'Nouvelle Session' }: EdtSessionFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormEdtSession>({
    filiere: sessionToEdit?.filiere || '',
    code: sessionToEdit?.code || '',
    niveau: sessionToEdit?.niveau || '',
    session: sessionToEdit?.session || '',
    matiere: sessionToEdit?.matiere || '',
    date: sessionToEdit?.date || '',
    heure: sessionToEdit?.heure || '',
    duree: sessionToEdit?.duree || '',
    salle: sessionToEdit?.salle || '',
    site: sessionToEdit?.site || ''
  });

  const filieres = adminsData.filieres || [];
  const sessions = ['Session 1', 'Session 2', 'Session 3', 'Rattrapage'];

  const filieresGrouped = filieres.reduce((acc, filiere) => {
    const key = filiere.niveau || 'LP';
    if (!acc[key]) acc[key] = [];
    acc[key].push(filiere);
    return acc;
  }, {} as Record<string, typeof filieres>);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sessionData: EmploiDuTempsSession = {
      id: sessionToEdit?.id || Date.now(),
      ...formData,
      data: new Date().toISOString() // Ajout du champ data manquant
    };
    onSubmit(sessionData);
    if (!sessionToEdit) {
      setFormData({
        filiere: '',
        code: '',
        niveau: '',
        session: '',
        matiere: '',
        date: '',
        heure: '',
        duree: '',
        salle: '',
        site: ''
      });
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button 
          data-edt-session-form-trigger
          className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2 shadow-lg"
        >
          {sessionToEdit ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          <span>{sessionToEdit ? 'Modifier Session' : triggerText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-orange-600" />
            {sessionToEdit ? 'Modifier la Session d\'Examen' : 'Créer une Session d\'Examen'}
          </DialogTitle>
          <DialogDescription>
            {sessionToEdit ? 'Modifiez les informations de la session' : 'Configurez une nouvelle session d\'examen'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Niveau <span className="text-red-500">*</span></label>
              <Select value={formData.niveau} onValueChange={(value) => setFormData(prev => ({ ...prev, niveau: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un niveau" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(filieresGrouped).map(niveau => (
                    <SelectItem key={niveau} value={niveau}>{niveau}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Filière <span className="text-red-500">*</span></label>
              <Select 
                value={formData.filiere} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, filiere: value }))}
                disabled={!formData.niveau}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une filière" />
                </SelectTrigger>
                <SelectContent>
                  {formData.niveau && filieresGrouped[formData.niveau]?.map(filiere => (
                    <SelectItem key={filiere.id} value={filiere.nom}>{filiere.nom}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Code</label>
              <Input
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                placeholder="Ex: GI-L1"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Session <span className="text-red-500">*</span></label>
              <Select value={formData.session} onValueChange={(value) => setFormData(prev => ({ ...prev, session: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une session" />
                </SelectTrigger>
                <SelectContent>
                  {sessions.map(session => (
                    <SelectItem key={session} value={session}>{session}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Matière <span className="text-red-500">*</span></label>
              <Input
                value={formData.matiere}
                onChange={(e) => setFormData(prev => ({ ...prev, matiere: e.target.value }))}
                placeholder="Nom de la matière"
                className="h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Date <span className="text-red-500">*</span></label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Heure <span className="text-red-500">*</span></label>
              <Input
                type="time"
                value={formData.heure}
                onChange={(e) => setFormData(prev => ({ ...prev, heure: e.target.value }))}
                className="h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Durée <span className="text-red-500">*</span></label>
              <Select value={formData.duree} onValueChange={(value) => setFormData(prev => ({ ...prev, duree: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une durée" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 heure</SelectItem>
                  <SelectItem value="2h">2 heures</SelectItem>
                  <SelectItem value="3h">3 heures</SelectItem>
                  <SelectItem value="4h">4 heures</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Salle <span className="text-red-500">*</span></label>
              <Input
                value={formData.salle}
                onChange={(e) => setFormData(prev => ({ ...prev, salle: e.target.value }))}
                placeholder="Ex: A101"
                className="h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Site</label>
              <Select value={formData.site} onValueChange={(value) => setFormData(prev => ({ ...prev, site: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un site" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Campus Principal">Campus Principal</SelectItem>
                  <SelectItem value="Campus Annexe">Campus Annexe</SelectItem>
                  <SelectItem value="En Ligne">En Ligne</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700 shadow-lg" disabled={!formData.niveau || !formData.filiere || !formData.session || !formData.matiere || !formData.date || !formData.heure || !formData.duree || !formData.salle}>
              {sessionToEdit ? 'Mettre à jour' : 'Créer la session'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
