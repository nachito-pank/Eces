'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronRight, 
  User, 
  Shield, 
  Check,
  X
} from 'lucide-react';

const ALL_DROITS = [
  'Gestion Étudiants',
  'Gestion Filieres',
  'Gestion Enseignants',
  'Rapports',
  'Statistiques',
  'Paramètres'
];

export default function AjouterSousAdminPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    telephone: '',
    role: '',
    statut: 'Actif',
    droits: [] as string[],
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleDroit = (droit: string) => {
    const currentDroits = [...formData.droits];
    const index = currentDroits.indexOf(droit);
    
    if (index > -1) {
      currentDroits.splice(index, 1);
    } else {
      currentDroits.push(droit);
    }
    
    setFormData({ ...formData, droits: currentDroits });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      router.push('/sous-admins');
    }, 1500);
  };

  // Generate initials for preview
  const initials = `${formData.prenom.charAt(0) || ''}${formData.nom.charAt(0) || ''}`.toUpperCase();
  const avatarColor = '#10B981'; // Default green for preview

  return (
    <div className="space-y-6">
      <nav className="flex text-sm text-slate-500 font-medium">
        <Link href="/sous-admins" className="hover:text-blue-600 transition-colors">Sous-Admins</Link>
        <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
        <span className="text-slate-900">Ajouter un sous-admin</span>
      </nav>

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center">
          <Check className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">Sous-admin ajouté avec succès. Redirection...</span>
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
                <p className="text-sm text-slate-500">{formData.role || 'Rôle'}</p>
                
                <div className="mt-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    formData.statut === 'Actif' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {formData.statut}
                  </span>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3">
                  <button 
                    type="submit"
                    className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white text-sm font-medium rounded-xl transition-all shadow-sm"
                  >
                    Ajouter le sous-admin
                  </button>
                  <Link 
                    href="/sous-admins"
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
                <input 
                  type="text" 
                  name="prenom"
                  required
                  value={formData.prenom}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Emma"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nom *</label>
                <input 
                  type="text" 
                  name="nom"
                  required
                  value={formData.nom}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Petit"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="emma.petit@ecole.fr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Téléphone</label>
                <input 
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
                <input 
                  type="password" 
                  name="motDePasse"
                  required
                  value={formData.motDePasse}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Rôle *</label>
                <input 
                  type="text" 
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Sous-Admin RH"
                />
              </div>
              
            </div>
          </div>

          {/* Droits Panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-title font-semibold text-slate-900">Droits d&apos;accès</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ALL_DROITS.map((droit) => {
                const hasDroit = formData.droits.includes(droit);
                return (
                  <div 
                    key={droit}
                    onClick={() => toggleDroit(droit)}
                    className={`flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      hasDroit 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-slate-100 bg-white hover:border-slate-200'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${
                      hasDroit ? 'bg-blue-500 border-blue-500' : 'border-slate-300'
                    }`}>
                      {hasDroit && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className={`text-sm font-medium ${hasDroit ? 'text-blue-900' : 'text-slate-600'}`}>
                      {droit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
