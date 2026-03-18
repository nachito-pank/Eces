"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { MessageSquare, Send } from 'lucide-react';
import type { FormMessage } from '@/types/sousadmin';

interface MessageFormProps {
  onSend: (data: FormMessage) => void;
  messageToEdit?: any;
  triggerText?: string;
}

export default function MessageForm({ onSend, messageToEdit, triggerText = 'Nouveau Message' }: MessageFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormMessage>({
    destinataire: messageToEdit?.destinataire || 'tous',
    contenu: messageToEdit?.contenu || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.contenu.trim()) {
      onSend(formData);
      if (!messageToEdit) {
        setFormData({ destinataire: 'tous', contenu: '' });
      }
      setOpen(false);
    }
  };

  const handleDestinataireChange = (value: string | null) => {
    setFormData(prev => ({ ...prev, destinataire: value || 'tous' }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-blue-600 rounded-md text-white p-1 hover:bg-blue-700 flex items-center gap-2 shadow-md w-full max-sm:w-auto sm:w-auto">
          <MessageSquare className="h-4 w-4" />
          <span>{triggerText}</span>
      </DialogTrigger>
      <DialogContent className="max-w-md sm:max-w-lg mx-auto rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-blue-600" />
            {messageToEdit ? 'Modifier le Message' : 'Envoyer un Message'}
          </DialogTitle>
          <DialogDescription>{messageToEdit ? 'Modifiez votre message' : 'Envoyez un message aux étudiants'}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="destinataire" className="text-sm font-medium text-gray-700">Destinataire</Label>
            <Select value={formData.destinataire} onValueChange={handleDestinataireChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous les étudiants</SelectItem>
                <SelectItem value="etudiants_GI">Génie Informatique</SelectItem>
                <SelectItem value="etudiants_CGE">Comptabilité-Gestion</SelectItem>
                <SelectItem value="etudiants_RH">Ressources Humaines</SelectItem>
                <SelectItem value="etudiants_MAC">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contenu" className="text-sm font-medium text-gray-700">Message</Label>
            <Input
              id="contenu"
              type="text"
              value={formData.contenu}
              onChange={(e) => setFormData(prev => ({ ...prev, contenu: e.target.value }))}
              placeholder="Tapez votre message..."
              className="min-h-[120px] w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <Send className="h-4 w-4" />
              {messageToEdit ? 'Mettre à jour' : 'Envoyer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

