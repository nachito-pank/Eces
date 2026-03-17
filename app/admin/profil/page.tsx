'use client';

import { useState, useEffect } from 'react';
import { User, Lock, Mail, Check, AlertCircle, Loader2 } from 'lucide-react';
import { profilApi } from '@/lib/api';
import { Input } from '@/components/ui/input';

export default function ModificationIdentifiantsPage() {
  const [adminData, setAdminData] = useState({ nom: '', email: '', motDePasse: '' });
  const [originalData, setOriginalData] = useState({ nom: '', email: '', motDePasse: '' });
  const [passwords, setPasswords] = useState({ ancien: '', nouveau: '', confirmation: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    profilApi.get()
      .then((res) => {
        const d = { nom: res.admin.nom, email: res.admin.email, motDePasse: '' };
        setAdminData(d); setOriginalData(d);
      })
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const getInitiales = (nom: string) => nom.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminData((p) => ({ ...p, [e.target.name]: e.target.value })); setError('');
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((p) => ({ ...p, [e.target.name]: e.target.value })); setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    const nomChange = adminData.nom.trim() !== originalData.nom;
    const emailChange = adminData.email.trim() !== originalData.email;
    const pwdReq = passwords.ancien || passwords.nouveau || passwords.confirmation;
    if (!nomChange && !emailChange && !pwdReq) { setError('Aucune modification détectée.'); return; }
    if (pwdReq) {
      if (!passwords.ancien || !passwords.nouveau || !passwords.confirmation) { setError('Veuillez remplir tous les champs de mot de passe.'); return; }
      if (passwords.nouveau !== passwords.confirmation) { setError('Les nouveaux mots de passe ne correspondent pas.'); return; }
      if (passwords.nouveau.length < 6) { setError('Le nouveau mot de passe doit contenir au moins 6 caractères.'); return; }
    }
    setSaving(true);
    try {
      const payload: any = { nom: adminData.nom.trim(), email: adminData.email.trim() };
      if (pwdReq) payload.motDePasse = passwords.nouveau;
      await profilApi.update(payload);
      const updated = { ...adminData, motDePasse: pwdReq ? passwords.nouveau : adminData.motDePasse };
      setAdminData(updated); setOriginalData(updated);
      setPasswords({ ancien: '', nouveau: '', confirmation: '' });
      setShowSuccess(true); setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) { setError(err.message); }
    finally { setSaving(false); }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[300px]">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );

  const inputCls = "block w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 text-sm";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-title font-bold text-slate-900 dark:text-slate-100">Identifiants</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Gérez vos informations de connexion administrateur</p>
      </div>

      {showSuccess && (
        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl flex items-center">
          <Check className="w-5 h-5 mr-3 flex-shrink-0" />
          <span className="text-sm font-medium">Informations mises à jour avec succès.</span>
        </div>
      )}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl flex items-center">
          <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" /><span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Profile card */}
        <div className="lg:col-span-1 lg:sticky lg:top-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white font-title font-bold text-3xl mx-auto mb-4 border-4 border-blue-50 dark:border-blue-900">
              {getInitiales(adminData.nom || 'A')}
            </div>
            <h2 className="text-xl font-title font-bold text-slate-900 dark:text-slate-100">{adminData.nom}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">{adminData.email}</p>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
              Administrateur Principal
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Account info */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 sm:p-6">
              <div className="flex items-center mb-5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center mr-3">
                  <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-title font-semibold text-slate-900 dark:text-slate-100">Informations du compte</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Nom complet</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    </div>
                    <Input type="text" name="nom" required value={adminData.nom} onChange={handleAdminChange}
                      className={`${inputCls} pl-10`} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email de connexion</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    </div>
                    <Input type="email" name="email" required value={adminData.email} onChange={handleAdminChange}
                      className={`${inputCls} pl-10`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 sm:p-6">
              <div className="flex items-center mb-5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center mr-3">
                  <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-title font-semibold text-slate-900 dark:text-slate-100">Modifier le mot de passe</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Ancien mot de passe</label>
                  <Input type="password" name="ancien" value={passwords.ancien} onChange={handlePasswordChange}
                    className={inputCls} placeholder="••••••••" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Nouveau mot de passe</label>
                    <Input type="password" name="nouveau" value={passwords.nouveau} onChange={handlePasswordChange}
                      className={inputCls} placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Confirmer le mot de passe</label>
                    <Input type="password" name="confirmation" value={passwords.confirmation} onChange={handlePasswordChange}
                      className={inputCls} placeholder="••••••••" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="submit" disabled={saving}
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white text-sm font-medium rounded-xl shadow-sm transition-all flex items-center justify-center disabled:opacity-60">
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
