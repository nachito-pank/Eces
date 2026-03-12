'use client';

import { useState, useEffect } from 'react';
import { User, Lock, Mail, Check, AlertCircle, Loader2 } from 'lucide-react';
import adminsData from '@/data/admins.json';
import { Input } from '@/components/ui/input';

// Type pour les données admin issues du JSON
interface AdminData {
  nom: string;
  email: string;
  motDePasse: string;
}

export default function ModificationIdentifiantsPage() {
  const [adminData, setAdminData] = useState<AdminData>({
    nom: '',
    email: '',
    motDePasse: '',
  });

  // Données originales pour détecter les vraies modifications
  const [originalData, setOriginalData] = useState<AdminData>({
    nom: '',
    email: '',
    motDePasse: '',
  });

  const [passwords, setPasswords] = useState({
    ancien: '',
    nouveau: '',
    confirmation: '',
  });

  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  // Chargement des données depuis admins.json au montage
  useEffect(() => {
    const admin: AdminData = adminsData.admin as AdminData;
    setAdminData({
      nom: admin.nom,
      email: admin.email,
      motDePasse: admin.motDePasse,
    });
    setOriginalData({
      nom: admin.nom,
      email: admin.email,
      motDePasse: admin.motDePasse,
    });
    setLoading(false);
  }, []);

  // Initiales pour l'avatar (ex: "Admin Principal" → "AP")
  const getInitiales = (nom: string) =>
    nom
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Vérification champs obligatoires
    if (!adminData.nom.trim() || !adminData.email.trim()) {
      setError("Veuillez remplir le nom et l'email.");
      return;
    }

    const nomChange = adminData.nom.trim() !== originalData.nom;
    const emailChange = adminData.email.trim() !== originalData.email;
    const passwordRequested =
      passwords.ancien || passwords.nouveau || passwords.confirmation;

    // Aucune modification détectée
    if (!nomChange && !emailChange && !passwordRequested) {
      setError('Aucune modification détectée.');
      return;
    }
    // Validation changement de mot de passe
    if (passwordRequested) {
      if (!passwords.ancien || !passwords.nouveau || !passwords.confirmation) {
        setError('Veuillez remplir tous les champs de mot de passe.');
        return;
      }
      if (passwords.ancien !== adminData.motDePasse) {
        setError("L'ancien mot de passe est incorrect.");
        return;
      }
      if (passwords.nouveau !== passwords.confirmation) {
        setError('Les nouveaux mots de passe ne correspondent pas.');
        return;
      }
      if (passwords.nouveau.length < 6) {
        setError(
          'Le nouveau mot de passe doit contenir au moins 6 caractères.'
        );
        return;
      }
    }

    // Mise à jour des données en mémoire (simule la sauvegarde dans le JSON)
    const updatedAdmin: AdminData = {
      nom: adminData.nom.trim(),
      email: adminData.email.trim(),
      motDePasse: passwordRequested
        ? passwords.nouveau
        : adminData.motDePasse,
    };

    // Met à jour l'état local et la référence originale
    setAdminData(updatedAdmin);
    setOriginalData(updatedAdmin);

    // Dans une vraie app Next.js, on ferait ici un appel API :
    // await fetch('/api/admin/update', { method: 'PUT', body: JSON.stringify(updatedAdmin) });

    setPasswords({ ancien: '', nouveau: '', confirmation: '' });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-title font-bold text-slate-900">
          Identifiants
        </h1>
        <p className="text-slate-500 mt-1">
          Gérez vos informations de connexion administrateur
        </p>
      </div>

      {/* Notification succès */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center">
          <Check className="w-5 h-5 mr-3 flex-shrink-0" />
          <span className="text-sm font-medium">
            Informations mises à jour avec succès.
          </span>
        </div>
      )}

      {/* Notification erreur */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center">
          <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        {/* Carte profil — colonne gauche */}
        <div className="lg:col-span-1 lg:sticky lg:top-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white font-title font-bold text-3xl mx-auto mb-4 border-4 border-blue-50">
              {getInitiales(adminData.nom)}
            </div>
            {/* Nom et email mis à jour dynamiquement depuis le JSON */}
            <h2 className="text-xl font-title font-bold text-slate-900">
              {adminData.nom}
            </h2>
            <p className="text-sm text-slate-500 mb-6">{adminData.email}</p>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
              Administrateur Principal
            </div>
          </div>
        </div>

        {/* Formulaire — colonne droite */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Panel informations du compte */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-lg font-title font-semibold text-slate-900">
                  Informations du compte
                </h3>
              </div>

              <div className="space-y-4">
                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Nom complet
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-slate-400" />
                    </div>
                    <Input
                      type="text"
                      name="nom"
                      required
                      value={adminData.nom}
                      onChange={handleAdminChange}
                      className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email de connexion
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-slate-400" />
                    </div>
                    <Input
                      type="email"
                      name="email"
                      required
                      value={adminData.email}
                      onChange={handleAdminChange}
                      className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Panel mot de passe */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                  <Lock className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-lg font-title font-semibold text-slate-900">
                  Modifier le mot de passe
                </h3>
              </div>

              <div className="space-y-4">
                {/* Ancien mot de passe */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Ancien mot de passe
                  </label>
                  <Input
                    type="password"
                    name="ancien"
                    value={passwords.ancien}
                    onChange={handlePasswordChange}
                    className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="••••••••"
                  />
                </div>

                {/* Nouveau + Confirmation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Nouveau mot de passe
                    </label>
                    <Input
                      type="password"
                      name="nouveau"
                      value={passwords.nouveau}
                      onChange={handlePasswordChange}
                      className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Confirmer le mot de passe
                    </label>
                    <Input
                      type="password"
                      name="confirmation"
                      value={passwords.confirmation}
                      onChange={handlePasswordChange}
                      className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton soumettre */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 
                  bg-gradient-to-r from-blue-900 to-blue-700 
                  hover:from-blue-800 hover:to-blue-600 
                  text-white text-sm font-medium rounded-xl shadow-sm 
                  transition-all flex items-center justify-center"
              >
                <Check className="w-4 h-4 mr-2" />
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}