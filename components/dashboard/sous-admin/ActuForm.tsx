"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Image, Newspaper } from 'lucide-react';
import type { FormActu, Actualite } from '@/types/sousadmin';

interface ActuFormProps {
  onSubmit: (data: FormActu) => void;
  triggerText?: string;
  actualiteToEdit?: Actualite | null;
}

export default function ActuForm({ onSubmit, triggerText = 'Nouvelle Actualité', actualiteToEdit }: ActuFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormActu>({
    titre: actualiteToEdit?.titre || '',
    contenu: actualiteToEdit?.contenu || '',
    image: null,
    statut: actualiteToEdit?.statut || 'publie',
  });
  const [preview, setPreview] = useState<string | null>(actualiteToEdit?.image || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!actualiteToEdit) {
      setFormData({ titre: '', contenu: '', image: null, statut: 'publie' });
      setPreview(null);
    }
    setOpen(false);
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({ ...prev, statut: value as 'publie' | 'brouillon' | 'archive' }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button 
        data-actu-form-trigger
        onClick={() => setOpen(true)}
        className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex items-center gap-2 shadow-lg w-full sm:w-auto"
      >
        <Newspaper className="h-4 w-4" />
        <span>{triggerText}</span>
      </Button>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Newspaper className="h-6 w-6 text-blue-600" />
            {actualiteToEdit ? 'Modifier l\'Actualité' : 'Publier une Actualité'}
          </DialogTitle>
          <DialogDescription>{actualiteToEdit ? 'Modifiez les informations de l\'actualité' : 'Partagez les dernières nouvelles de l\'école'}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">Titre <span className="text-red-500">*</span></label>
            <Input
              value={formData.titre}
              onChange={(e) => setFormData(prev => ({ ...prev, titre: e.target.value }))}
              placeholder="Entrez un titre accrocheur..."
              className="min-h-12 text-lg w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">Contenu <span className="text-red-500">*</span></label>
            <textarea
              value={formData.contenu}
              onChange={(e) => setFormData(prev => ({ ...prev, contenu: e.target.value }))}
              placeholder="Rédigez le contenu complet de l'actualité..."
              className="min-h-37.5 text-sm w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Image className="h-4 w-4" />
              Image (optionnelle)
            </div>
            <Input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
            {preview && (
              <div className="mt-2 p-2 bg-blue-50 rounded-lg border-2 border-dashed border-blue-200">
                <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg shadow-md" />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">Statut</label>
            <Select value={formData.statut} onValueChange={(value) => handleStatusChange(value!)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="publie">Publiée</SelectItem>
                <SelectItem value="brouillon">Brouillon</SelectItem>
                <SelectItem value="archive">Archivée</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg">
            {actualiteToEdit ? 'Mettre à jour' : 'Publier'}
          </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
