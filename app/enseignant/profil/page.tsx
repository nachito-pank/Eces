'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import FormField from '@/components/ui/FormField';
import {
  User,
  Mail,
  Phone,
  BookOpenText,
  Pencil,
  Camera,
  X
} from 'lucide-react';

import adminsData from '@/data/admins.json';
import coursData from '@/data/admins.json';

// ✅ Clés de stockage définies
const STORAGE_KEY = 'enseignant_profile';
const STORAGE_IMAGE_KEY = 'enseignant_profile_image';

const getDefaultProfile = () => {
  // ✅ Utilise adminsData.enseignants (pas adminsData.enseignants[0].profile)
  const enseignant = adminsData.enseignants[0];

  return {
    prenom: enseignant.prenom,
    nom: enseignant.nom,
    email: enseignant.email,
    phone: enseignant.telephone || '',
    matiere: Array.isArray(enseignant.matieres)
      ? enseignant.matieres.join(', ')
      : '',
  };
};

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profile, setProfile] = useState(getDefaultProfile);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setProfile(prev => ({ ...prev, ...JSON.parse(saved) }));

      const savedImage = localStorage.getItem(STORAGE_IMAGE_KEY);
      if (savedImage) setProfileImage(savedImage);
    } catch {
      // ignore parse errors
    }
  }, []);

  const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleLogout = () => {
    console.log('Déconnexion');
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => setProfileImage(null);

  const handleSaveProfile = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      if (profileImage) localStorage.setItem(STORAGE_IMAGE_KEY, profileImage);
      else localStorage.removeItem(STORAGE_IMAGE_KEY);

      alert('Profil mis à jour !');
      setIsEditingProfile(false);
    } catch {
      alert('Erreur lors de la sauvegarde.');
    }
  };

  const handleCancelEdit = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedImage = localStorage.getItem(STORAGE_IMAGE_KEY);
      setProfile(saved ? { ...getDefaultProfile(), ...JSON.parse(saved) } : getDefaultProfile());
      setProfileImage(savedImage);
    } catch {
      setProfile(getDefaultProfile());
      setProfileImage(null);
    }
    setIsEditingProfile(false);
  };

  // ✅ Utilise profile.prenom et profile.nom (cohérent avec getDefaultProfile)
  const user = {
    name: `${profile.prenom} ${profile.nom}`,
    role: 'Enseignant',
    notifications: 3,
  };

  // ✅ cours vient de enseignants.json, étudiants vient de admins.json
  const cours = coursData.cours;
  const etudiants = adminsData.etudiants;

  // ✅ Prochain cours : premier cours de la liste (pas de nextCourse dans le JSON)
  const nextCourse = cours.length > 0
    ? { subject: cours[0].title, time: 'À définir', room: 'À définir' }
    : null;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sidebar + Main */}
      <div className="flex p-8">

        <main className="flex-1 ml-10">
          <div className="max-w-6xl mx-auto">
            {/* ✅ Utilise profile.prenom et profile.nom */}
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              Bonjour, {profile.prenom} {profile.nom}
            </h1>
            <p className="text-slate-600 mb-6">Voici un aperçu de votre activité.</p>

            {/* Section Profil */}
            <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
              <div className="bg-linear-to-r from-slate-50 to-white px-1 py-1">
                <div className="flex flex-col lg:flex-row">
                  {/* Photo */}
                  <div className="flex items-center justify-center p-8 lg:p-10 lg:border-r lg:border-slate-200/80 lg:pr-12">
                    <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl ring-2 ring-slate-100 bg-slate-100">
                      {profileImage ? (
                        <img src={profileImage} alt="Photo de profil" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-500 to-blue-600">
                          <User className="w-16 h-16 sm:w-20 sm:h-20 text-white/90" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
                    {!isEditingProfile ? (
                      <>
                        <div className="space-y-4">
                          <div>
                            {/* ✅ Utilise profile.prenom et profile.nom */}
                            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                              {profile.prenom} {profile.nom}
                            </h2>
                            <span className="inline-block mt-1 px-3 py-0.5 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
                              Enseignant
                            </span>
                          </div>
                          <div className="space-y-2.5 pt-2">
                            <div className="flex items-center gap-3 text-slate-600">
                              <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                                <Mail className="w-4 h-4 text-slate-500" />
                              </div>
                              <span className="text-sm font-medium">{profile.email}</span>
                            </div>
                            {profile.phone && (
                              <div className="flex items-center gap-3 text-slate-600">
                                <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                                  <Phone className="w-4 h-4 text-slate-500" />
                                </div>
                                <span className="text-sm font-medium">{profile.phone}</span>
                              </div>
                            )}
                            {profile.matiere && (
                              <div className="flex items-center gap-3 text-slate-600">
                                <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                                  <BookOpenText className="w-4 h-4 text-slate-500" />
                                </div>
                                <span className="text-sm font-medium">{profile.matiere}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          onClick={() => setIsEditingProfile(true)}
                          variant="outline"
                          className="mt-6 w-fit flex items-center gap-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50"
                        >
                          <Pencil className="w-4 h-4" />
                          Modifier le profil
                        </Button>
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Modifier mon profil</h3>
                        {/* Formulaire de modification */}
                        <div className="space-y-5">
                          {/* Image et bouton changer */}
                          <div className="flex flex-col sm:flex-row items-start gap-4">
                            <div className="flex items-center gap-4">
                              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center shrink-0">
                                {profileImage ? (
                                  <div className="relative w-full h-full">
                                    <img src={profileImage} alt="Aperçu" className="w-full h-full object-cover" />
                                    <button
                                      type="button"
                                      onClick={(e) => { e.preventDefault(); removeProfileImage(); }}
                                      className="absolute top-0 right-0 p-1 bg-rose-500 hover:bg-rose-600 text-white rounded-bl-lg"
                                      title="Supprimer la photo"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ) : (
                                  <User className="w-10 h-10 text-slate-400" />
                                )}
                              </div>
                              <div>
                                <label className="cursor-pointer">
                                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                  <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100">
                                    <Camera className="w-4 h-4" />
                                    Changer la photo
                                  </span>
                                </label>
                                <p className="text-xs text-slate-500 mt-2">JPG, PNG. Max 2 Mo</p>
                              </div>
                            </div>
                          </div>

                          {/* ✅ Champs du formulaire avec les bons noms de clés */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField label="Prénom" name="prenom" value={profile.prenom} onChange={handleProfileChange} />
                            <FormField label="Nom" name="nom" value={profile.nom} onChange={handleProfileChange} />
                            <FormField label="Email" name="email" type="email" value={profile.email} onChange={handleProfileChange} />
                            <FormField label="Téléphone" name="phone" value={profile.phone} onChange={handleProfileChange} />
                            <div className="sm:col-span-2">
                              <FormField label="Matières" name="matiere" value={profile.matiere} onChange={handleProfileChange} placeholder="Ex: Mathématiques, Algorithmique" />
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button onClick={handleSaveProfile} className="bg-blue-600 text-white hover:bg-blue-700">
                              Sauvegarder
                            </Button>
                            <Button onClick={handleCancelEdit} variant="outline">
                              Annuler
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </main>
      </div>
    </div>
  );
}