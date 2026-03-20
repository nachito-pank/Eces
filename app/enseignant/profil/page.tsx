'use client';

import React, { useState, useEffect } from 'react';
import { motion, type Variants } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

const STORAGE_KEY = 'enseignant_profile';
const STORAGE_IMAGE_KEY = 'enseignant_profile_image';

const getDefaultProfile = () => {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full p-3 sm:p-0 space-y-8"
    >
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">

        {/* Header */}
        <motion.div variants={itemVariants} className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Bonjour, {profile.prenom} {profile.nom}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Voici un aperçu de votre activité.</p>
        </motion.div>

        {/* Section Profil */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/60 rounded-[2rem] shadow-sm overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row">

            {/* Photo */}
            <div className="flex items-center justify-center p-8 lg:p-10 lg:border-r lg:border-slate-200/80 dark:lg:border-slate-800/60">
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-xl ring-2 ring-slate-100 dark:ring-slate-800 bg-slate-100 dark:bg-slate-800">
                {profileImage ? (
                  <img src={profileImage} alt="Photo de profil" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
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
                      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {profile.prenom} {profile.nom}
                      </h2>
                      <span className="inline-block mt-1.5 px-3 py-0.5 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 border border-blue-100 dark:border-blue-800/50 rounded-full">
                        Enseignant
                      </span>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                        <div className="w-9 h-9 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                          <Mail className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        </div>
                        <span className="text-sm font-medium">{profile.email}</span>
                      </div>
                      {profile.phone && (
                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                          <div className="w-9 h-9 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                            <Phone className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                          </div>
                          <span className="text-sm font-medium">{profile.phone}</span>
                        </div>
                      )}
                      {profile.matiere && (
                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                          <div className="w-9 h-9 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                            <BookOpenText className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                          </div>
                          <span className="text-sm font-medium">{profile.matiere}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="mt-6 w-fit flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm transition"
                  >
                    <Pencil className="w-4 h-4" />
                    Modifier le profil
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5">
                    Modifier mon profil
                  </h3>

                  <div className="space-y-5">
                    {/* Image */}
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                        {profileImage ? (
                          <div className="relative w-full h-full">
                            <img src={profileImage} alt="Aperçu" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={(e) => { e.preventDefault(); removeProfileImage(); }}
                              className="absolute top-0 right-0 p-1 bg-rose-500 hover:bg-rose-600 text-white rounded-bl-lg transition"
                              title="Supprimer la photo"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <User className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                        )}
                      </div>
                      <div>
                        <label className="cursor-pointer">
                          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                          <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-xl transition border border-blue-100 dark:border-blue-800/50">
                            <Camera className="w-4 h-4" />
                            Changer la photo
                          </span>
                        </label>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">JPG, PNG. Max 2 Mo</p>
                      </div>
                    </div>

                    {/* Champs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Prénom" name="prenom" value={profile.prenom} onChange={handleProfileChange} />
                      <FormField label="Nom" name="nom" value={profile.nom} onChange={handleProfileChange} />
                      <FormField label="Email" name="email" type="email" value={profile.email} onChange={handleProfileChange} />
                      <FormField label="Téléphone" name="phone" value={profile.phone} onChange={handleProfileChange} />
                      <div className="sm:col-span-2">
                        <FormField label="Matières" name="matiere" value={profile.matiere} onChange={handleProfileChange} placeholder="Ex: Mathématiques, Algorithmique" />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={handleSaveProfile}
                        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white font-bold text-sm transition shadow-md hover:shadow-lg"
                      >
                        Sauvegarder
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-sm transition"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}