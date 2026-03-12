'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronRight, 
  User, 
  BookOpen, 
  Check,
  X
} from 'lucide-react';
import db from '@/data/admins.json';
import { Input } from '@/components/ui/input';

export default function AjouterEnseignantPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    telephone: '',
    matieres: '',
    filieres: [db.filieres[0]?.nom || ''],
    statut: 'Actif',
    dateEmbauche: new Date().toISOString().split('T')[0],
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      router.push('/enseignants');
    }, 1500);
  };

  // Generate initials for preview
  const initials = `${formData.prenom.charAt(0) || ''}${formData.nom.charAt(0) || ''}`.toUpperCase();
  const avatarColor = '#3B82F6'; // Default blue for preview

  return (
    <div className="space-y-6">
      <nav className="flex text-sm text-slate-500 font-medium">
        <Link href="/enseignants" className="hover:text-blue-600 transition-colors">Enseignants</Link>
        <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
        <span className="text-slate-900">Ajouter un enseignant</span>
      </nav>

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center">
          <Check className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">Enseignant ajouté avec succès. Redirection...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column - Live Preview */}
        <div className="lg:col-span-1 sticky top-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-blue-900 to-blue-700"></div>
            <div className="px-6 pb-6 relative">
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-title font-bold text-2xl border-4 border-white shadow-sm absolute -top-10"
                style={{ backgroundColor: avatarColor }}
              >
                {initials || '?'}
              </div>
              
              <div className="pt-16">
                <h2 className="text-xl font-title font-bold text-slate-900">
                  {formData.prenom || 'Prénom'} {formData.nom || 'Nom'}
                </h2>
                <p className="text-sm text-slate-500">{formData.matieres || 'Matières'}</p>
                
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    formData.statut === 'Actif' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {formData.statut}
                  </span>
                  {formData.filieres?.map((f: string) => (
                    <span key={f} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3">
                  <button 
                    type="submit"
                    className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white text-sm font-medium rounded-xl transition-all shadow-sm"
                  >
                    Ajouter l&apos;enseignant
                  </button>
                  <Link 
                    href="/enseignants"
                    className="w-full flex items-center justify-center px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-colors"
                  >
                    Annuler
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form Panels */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info Panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-title font-semibold text-slate-900">Informations personnelles</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Prénom *</label>
                <Input 
                  type="text" 
                  name="prenom"
                  required
                  value={formData.prenom}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Jean"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nom *</label>
                <Input 
                  type="text" 
                  name="nom"
                  required
                  value={formData.nom}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Dupont"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
                <Input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="jean.dupont@ecole.fr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Téléphone</label>
                <Input 
                  type="text" 
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="+33 6 00 00 00 00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Mot de passe *</label>
                <Input 
                  type="password" 
                  name="motDePasse"
                  required
                  value={formData.motDePasse}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Academic Info Panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-title font-semibold text-slate-900">Informations académiques</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Matières * <span className="text-xs text-slate-400 font-normal">(séparées par des virgules)</span></label>
                <Input 
                  type="text" 
                  name="matieres"
                  required
                  value={formData.matieres}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Mathématiques, Physique"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Filières *</label>
                <div className="space-y-2 p-3 border border-slate-200 rounded-xl bg-slate-50">
                  {db.filieres.map(f => (
                    <label key={f.id} className="flex items-center cursor-pointer">
                      <Input
                        type="checkbox"
                        checked={formData.filieres?.includes(f.nom)}
                        onChange={(e) => {
                          const newFilieres = e.target.checked 
                            ? [...(formData.filieres || []), f.nom]
                            : (formData.filieres || []).filter((name: string) => name !== f.nom);
                          setFormData({ ...formData, filieres: newFilieres });
                        }}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span className="ml-2 text-sm text-slate-700">{f.nom}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Statut</label>
                <select 
                  name="statut"
                  value={formData.statut}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                >
                  <option value="Actif">Actif</option>
                  <option value="Inactif">Inactif</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Date d&apos;embauche *</label>
                <Input 
                  type="date" 
                  name="dateEmbauche"
                  required
                  value={formData.dateEmbauche}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
