'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronRight, 
  Mail, 
  Phone, 
  Calendar, 
  User, 
  Shield, 
  Edit2,
  Trash2,
  Check,
  X,
  AlertTriangle
} from 'lucide-react';
import db from '@/data/admins.json';
import { Input } from '@/components/ui/input';

const ALL_DROITS = [
  'Gestion Étudiants',
  'Gestion Filieres',
  'Gestion Enseignants',
  'Rapports',
  'Statistiques',
  'Paramètres'
];

export default function SousAdminDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  
  const [admin, setAdmin] = useState<any>(() => db.sousAdmins.find(a => a.id === id) || null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(() => db.sousAdmins.find(a => a.id === id) || null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!admin) {
      router.push('/sous-admins');
    }
  }, [admin, router]);

  if (!admin) return null;

  const handleSave = () => {
    setAdmin(formData);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDelete = () => {
    router.push('/sous-admins');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleDroit = (droit: string) => {
    if (!isEditing) return;
    
    const currentDroits = [...formData.droits];
    const index = currentDroits.indexOf(droit);
    
    if (index > -1) {
      currentDroits.splice(index, 1);
    } else {
      currentDroits.push(droit);
    }
    
    setFormData({ ...formData, droits: currentDroits });
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-slate-500 font-medium">
        <Link href="/sous-admins" className="hover:text-blue-600 transition-colors">Sous-Admins</Link>
        <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
        <span className="text-slate-900">{admin.prenom} {admin.nom}</span>
      </nav>

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center">
          <Check className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">Modifications enregistrées avec succès.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column - Profile Card (Sticky) */}
        <div className="lg:col-span-1 sticky top-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-blue-900 to-blue-700"></div>
            <div className="px-6 pb-6 relative">
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-title font-bold text-2xl border-4 border-white shadow-sm absolute -top-10"
                style={{ backgroundColor: admin.couleur }}
              >
                {admin.avatar}
              </div>
              
              <div className="pt-16">
                <h2 className="text-xl font-title font-bold text-slate-900">{admin.prenom} {admin.nom}</h2>
                <p className="text-sm text-slate-500">{admin.role}</p>
                
                <div className="mt-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    admin.statut === 'Actif' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {admin.statut}
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-sm text-slate-600">
                    <Mail className="w-4 h-4 mr-3 text-slate-400" />
                    {admin.email}
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Phone className="w-4 h-4 mr-3 text-slate-400" />
                    {admin.telephone || 'Non renseigné'}
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Calendar className="w-4 h-4 mr-3 text-slate-400" />
                    Créé le {admin.dateCreation}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3">
                  {isEditing ? (
                    <>
                      <button 
                        onClick={handleSave}
                        className="w-full flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl transition-colors"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Enregistrer
                      </button>
                      <button 
                        onClick={() => {
                          setIsEditing(false);
                          setFormData(admin);
                        }}
                        className="w-full flex items-center justify-center px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-colors"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Annuler
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="w-full flex items-center justify-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium rounded-xl transition-colors"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Modifier le profil
                      </button>
                      <button 
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full flex items-center justify-center px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-sm font-medium rounded-xl transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Supprimer
                      </button>
                    </>
                  )}
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
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Prénom</label>
                {isEditing ? (
                  <Input 
                    type="text" 
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                ) : (
                  <div className="px-3 py-2 bg-slate-50 border border-transparent rounded-xl text-sm text-slate-900">{admin.prenom}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nom</label>
                {isEditing ? (
                  <Input 
                    type="text" 
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                ) : (
                  <div className="px-3 py-2 bg-slate-50 border border-transparent rounded-xl text-sm text-slate-900">{admin.nom}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                {isEditing ? (
                  <Input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                ) : (
                  <div className="px-3 py-2 bg-slate-50 border border-transparent rounded-xl text-sm text-slate-900">{admin.email}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Téléphone</label>
                {isEditing ? (
                  <Input 
                    type="text" 
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                ) : (
                  <div className="px-3 py-2 bg-slate-50 border border-transparent rounded-xl text-sm text-slate-900">{admin.telephone || '-'}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Mot de passe</label>
                {isEditing ? (
                  <Input 
                    type="text" 
                    name="motDePasse"
                    value={formData.motDePasse || ''}
                    onChange={handleChange}
                    placeholder="Nouveau mot de passe"
                    className="block w-full px-3 py-2 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                ) : (
                  <div className="px-3 py-2 bg-slate-50 border border-transparent rounded-xl text-sm text-slate-900">••••••••</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Rôle</label>
                {isEditing ? (
                  <Input 
                    type="text" 
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                ) : (
                  <div className="px-3 py-2 bg-slate-50 border border-transparent rounded-xl text-sm text-slate-900">{admin.role}</div>
                )}
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
                const hasDroit = isEditing ? formData.droits.includes(droit) : admin.droits.includes(droit);
                return (
                  <div 
                    key={droit}
                    onClick={() => toggleDroit(droit)}
                    className={`flex items-center p-4 rounded-xl border-2 transition-all ${
                      isEditing ? 'cursor-pointer' : 'cursor-default opacity-80'
                    } ${
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
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-title font-bold text-center text-slate-900 mb-2">Supprimer le sous-admin</h3>
            <p className="text-sm text-center text-slate-500 mb-6">
              Êtes-vous sûr de vouloir supprimer <strong>{admin.prenom} {admin.nom}</strong> ? Cette action est irréversible.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
