'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Mail, Phone, Calendar, User, Shield, Edit2, Trash2, Check, X, AlertTriangle, Loader2, AlertCircle } from 'lucide-react';
import { sousAdminsApi } from '@/lib/api';
import { Input } from '@/components/ui/input';

const ALL_DROITS = ['Gestion Étudiants', 'Gestion Filieres', 'Gestion Enseignants', 'Rapports', 'Statistiques', 'Paramètres'];
const PANEL = "bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700";
const FVIEW = "px-3 py-2 bg-slate-50 dark:bg-slate-700/60 rounded-xl text-sm text-slate-900 dark:text-slate-100";
const FEDIT = "block w-full px-3 py-2 border border-blue-300 dark:border-blue-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 text-sm";
const LABEL = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5";

export default function SousAdminDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [admin, setAdmin] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    sousAdminsApi.getById(id)
      .then((res) => { setAdmin(res.sousAdmin); setFormData(res.sousAdmin); })
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await sousAdminsApi.update(id, formData);
      setAdmin(res.sousAdmin); setFormData(res.sousAdmin);
      setIsEditing(false); setShowSuccess(true); setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) { setError(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await sousAdminsApi.delete(id); router.push('/admin/sous-admins'); }
    catch (err: any) { setError(err.message); setShowDeleteModal(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggleDroit = (droit: string) => {
    if (!isEditing) return;
    setFormData((p: any) => ({ ...p, droits: p.droits.includes(droit) ? p.droits.filter((d: string) => d !== droit) : [...p.droits, droit] }));
  };

  if (loading) return <div className="flex items-center justify-center min-h-[300px]"><Loader2 className="w-8 h-8 text-blue-500 animate-spin" /></div>;
  if (error && !admin) return <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl flex items-center"><AlertCircle className="w-5 h-5 mr-3" />{error}</div>;
  if (!admin) return null;

  return (
    <div className="space-y-6">
      <nav className="flex text-sm text-slate-500 dark:text-slate-400 font-medium flex-wrap gap-1">
        <Link href="/admin/sous-admins" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sous-Admins</Link>
        <ChevronRight className="w-4 h-4 mx-1 shrink-0" />
        <span className="text-slate-900 dark:text-slate-100">{admin.prenom} {admin.nom}</span>
      </nav>

      {showSuccess && <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl flex items-center"><Check className="w-5 h-5 mr-3" /><span className="text-sm font-medium">Modifications enregistrées.</span></div>}
      {error && <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl flex items-center"><AlertCircle className="w-5 h-5 mr-3" /><span className="text-sm">{error}</span></div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-1 lg:sticky lg:top-8">
          <div className={`${PANEL} overflow-hidden`}>
            <div className="h-24 bg-gradient-to-r from-blue-900 to-blue-700" />
            <div className="px-6 pb-6 relative">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl border-4 border-white dark:border-slate-800 shadow-sm absolute -top-10"
                style={{ backgroundColor: admin.couleur || '#10B981' }}>{admin.avatar}</div>
              <div className="pt-14">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{admin.prenom} {admin.nom}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">{admin.role}</p>
                <div className="mt-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${admin.statut === 'Actif' ? 'bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'}`}>{admin.statut}</span>
                </div>
                <div className="mt-5 space-y-2.5">
                  {[{ Icon: Mail, val: admin.email }, { Icon: Phone, val: admin.telephone || 'Non renseigné' }, { Icon: Calendar, val: `Créé le ${admin.dateCreation}` }].map(({ Icon, val }) => (
                    <div key={val} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                      <Icon className="w-4 h-4 mr-3 text-slate-400 dark:text-slate-500 shrink-0" /><span className="truncate">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700 flex flex-col gap-2">
                  {isEditing ? (
                    <>
                      <button onClick={handleSave} disabled={saving} className="w-full flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl disabled:opacity-60">
                        {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />} Enregistrer
                      </button>
                      <button onClick={() => { setIsEditing(false); setFormData(admin); }} className="w-full flex items-center justify-center px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-xl">
                        <X className="w-4 h-4 mr-2" /> Annuler
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setIsEditing(true)} className="w-full flex items-center justify-center px-4 py-2 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-xl">
                        <Edit2 className="w-4 h-4 mr-2" /> Modifier le profil
                      </button>
                      <button onClick={() => setShowDeleteModal(true)} className="w-full flex items-center justify-center px-4 py-2 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 text-sm font-medium rounded-xl">
                        <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-5">
          <div className={`${PANEL} p-5 sm:p-6`}>
            <div className="flex items-center mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center mr-3"><User className="w-4 h-4 text-blue-600 dark:text-blue-400" /></div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Informations personnelles</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{ label: 'Prénom', name: 'prenom' }, { label: 'Nom', name: 'nom' }, { label: 'Email', name: 'email', type: 'email' }, { label: 'Téléphone', name: 'telephone' }, { label: 'Rôle', name: 'role' }].map(({ label, name, type }) => (
                <div key={name}>
                  <label className={LABEL}>{label}</label>
                  {isEditing ? <Input type={type || 'text'} name={name} value={formData[name] || ''} onChange={handleChange} className={FEDIT} />
                    : <div className={FVIEW}>{admin[name] || '—'}</div>}
                </div>
              ))}
              <div>
                <label className={LABEL}>Mot de passe</label>
                {isEditing ? <Input type="text" name="motDePasse" value={formData.motDePasse || ''} onChange={handleChange} placeholder="Nouveau mot de passe" className={FEDIT} />
                  : <div className={FVIEW}>••••••••</div>}
              </div>
              <div>
                <label className={LABEL}>Statut</label>
                {isEditing ? (
                  <select name="statut" value={formData.statut} onChange={handleChange} className={FEDIT}>
                    <option value="Actif">Actif</option><option value="Inactif">Inactif</option>
                  </select>
                ) : <div className={FVIEW}>{admin.statut}</div>}
              </div>
            </div>
          </div>

          <div className={`${PANEL} p-5 sm:p-6`}>
            <div className="flex items-center mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center mr-3"><Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" /></div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Droits d&apos;accès</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ALL_DROITS.map((droit) => {
                const active = isEditing ? formData.droits.includes(droit) : admin.droits.includes(droit);
                return (
                  <div key={droit} onClick={() => toggleDroit(droit)}
                    className={`flex items-center p-3.5 rounded-xl border-2 transition-all ${isEditing ? 'cursor-pointer' : 'cursor-default opacity-90'} ${active ? 'border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/30' : 'border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800'}`}>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 shrink-0 ${active ? 'bg-blue-500 border-blue-500' : 'border-slate-300 dark:border-slate-600'}`}>
                      {active && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className={`text-sm font-medium ${active ? 'text-blue-900 dark:text-blue-300' : 'text-slate-600 dark:text-slate-400'}`}>{droit}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${PANEL} max-w-md w-full p-6`}>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 mx-auto mb-4"><AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" /></div>
            <h3 className="text-lg font-bold text-center text-slate-900 dark:text-slate-100 mb-2">Supprimer le sous-admin</h3>
            <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-6">Êtes-vous sûr de vouloir supprimer <strong>{admin.prenom} {admin.nom}</strong> ?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-xl">Annuler</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
