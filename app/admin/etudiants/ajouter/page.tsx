'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, User, BookOpen, Check, Loader2, AlertCircle } from 'lucide-react';
import { etudiantsApi, filieresApi } from '@/lib/api';
import { Input } from '@/components/ui/input';

export default function AjouterEtudiantPage() {
  const router = useRouter();
  const [filieres, setFilieres] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    nom: '', prenom: '', email: '', motDePasse: '',
    telephone: '', filiere: '', niveau: '', statut: 'Actif',
  });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    filieresApi.getAll()
      .then((res) => {
        setFilieres(res.filieres);
        if (res.filieres.length > 0) {
          setFormData((prev) => ({ ...prev, filiere: res.filieres[0].nom }));
        }
      })
      .catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await etudiantsApi.create(formData);
      setShowSuccess(true);
      setTimeout(() => router.push('/admin/etudiants'), 1500);
    } catch (err: any) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  const initials = `${formData.prenom.charAt(0)}${formData.nom.charAt(0)}`.toUpperCase();

  return (
    <div className="space-y-6">
      <nav className="flex text-sm text-slate-500 font-medium flex-wrap gap-1">
        <Link href="/admin/etudiants" className="hover:text-blue-600 transition-colors">Étudiants</Link>
        <ChevronRight className="w-4 h-4 mx-1 shrink-0" />
        <span className="text-slate-900">Ajouter un étudiant</span>
      </nav>

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center">
          <Check className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">Étudiant ajouté avec succès. Redirection...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center">
          <AlertCircle className="w-5 h-5 mr-3 shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Preview Card */}
        <div className="lg:col-span-1 lg:sticky lg:top-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-blue-900 to-blue-700" />
            <div className="px-6 pb-6 relative">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl border-4 border-white shadow-sm absolute -top-10 bg-blue-500">
                {initials || '?'}
              </div>
              <div className="pt-14">
                <h2 className="text-xl font-bold text-slate-900">
                  {formData.prenom || 'Prénom'} {formData.nom || 'Nom'}
                </h2>
                <p className="text-sm text-slate-500">{formData.filiere || 'Filière'} — {formData.niveau || 'Niveau'}</p>
                <div className="mt-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    formData.statut === 'Actif' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {formData.statut}
                  </span>
                </div>
                <p className="mt-4 text-xs text-slate-400">Le matricule sera généré automatiquement.</p>
                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col gap-2">
                  <button type="submit" disabled={submitting}
                    className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white text-sm font-medium rounded-xl transition-all shadow-sm disabled:opacity-60">
                    {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Ajouter l&apos;étudiant
                  </button>
                  <Link href="/admin/etudiants"
                    className="w-full flex items-center justify-center px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-colors">
                    Annuler
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6">
            <div className="flex items-center mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Informations personnelles</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Prénom *</label>
                <Input type="text" name="prenom" required value={formData.prenom} onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Jean" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nom *</label>
                <Input type="text" name="nom" required value={formData.nom} onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Dupont" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
                <Input type="email" name="email" required value={formData.email} onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm" placeholder="jean.dupont@ecole.fr" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Téléphone</label>
                <Input type="text" name="telephone" value={formData.telephone} onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm" placeholder="+242 06 000 0000" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Mot de passe *</label>
                <Input type="password" name="motDePasse" required value={formData.motDePasse} onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm" placeholder="••••••••" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6">
            <div className="flex items-center mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Informations académiques</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Filière *</label>
                <select name="filiere" required value={formData.filiere} onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm bg-white">
                  <option value="">-- Choisir --</option>
                  {filieres.map((f: any) => <option key={f.id} value={f.nom}>{f.nom}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Niveau *</label>
                <Input type="text" name="niveau" required value={formData.niveau} onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm" placeholder="L1, L2, M1…" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Statut</label>
                <select name="statut" value={formData.statut} onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm bg-white">
                  <option value="Actif">Actif</option>
                  <option value="Inactif">Inactif</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
