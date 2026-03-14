'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight, Mail, Phone, Calendar, User, BookOpen,
  Edit2, Trash2, Check, X, AlertTriangle, Loader2, AlertCircle
} from 'lucide-react';
import { etudiantsApi, filieresApi } from '@/lib/api';
import { Input } from '@/components/ui/input';

export default function EtudiantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [etudiant, setEtudiant] = useState<any>(null);
  const [filieres, setFilieres] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [etRes, filRes] = await Promise.all([
          etudiantsApi.getById(id),
          filieresApi.getAll(),
        ]);
        setEtudiant(etRes.etudiant);
        setFormData(etRes.etudiant);
        setFilieres(filRes.filieres);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await etudiantsApi.update(id, formData);
      setEtudiant(res.etudiant);
      setFormData(res.etudiant);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await etudiantsApi.delete(id);
      router.push('/admin/etudiants');
    } catch (err: any) {
      setError(err.message);
      setShowDeleteModal(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[300px]">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );

  if (error && !etudiant) return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center">
      <AlertCircle className="w-5 h-5 mr-3" />
      <span>{error}</span>
    </div>
  );

  if (!etudiant) return null;

  return (
    <div className="space-y-6">
      <nav className="flex text-sm text-slate-500 font-medium flex-wrap gap-1">
        <Link href="/admin/etudiants" className="hover:text-blue-600 transition-colors">Étudiants</Link>
        <ChevronRight className="w-4 h-4 mx-1 shrink-0" />
        <span className="text-slate-900">{etudiant.prenom} {etudiant.nom}</span>
      </nav>

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center">
          <Check className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">Modifications enregistrées avec succès.</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center">
          <AlertCircle className="w-5 h-5 mr-3" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Profile Card */}
        <div className="lg:col-span-1 lg:sticky lg:top-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-blue-900 to-blue-700" />
            <div className="px-6 pb-6 relative">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl border-4 border-white shadow-sm absolute -top-10"
                style={{ backgroundColor: etudiant.couleur || '#3B82F6' }}
              >
                {etudiant.avatar}
              </div>
              <div className="pt-14">
                <h2 className="text-xl font-bold text-slate-900">{etudiant.prenom} {etudiant.nom}</h2>
                <p className="text-sm text-slate-500">{etudiant.filiere} — {etudiant.niveau}</p>
                <code className="mt-2 inline-block bg-slate-100 px-2 py-1 rounded text-xs font-mono text-slate-700">
                  {etudiant.matricule}
                </code>
                <div className="mt-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    etudiant.statut === 'Actif' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {etudiant.statut}
                  </span>
                </div>
                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center text-sm text-slate-600">
                    <Mail className="w-4 h-4 mr-3 text-slate-400 shrink-0" />
                    <span className="truncate">{etudiant.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Phone className="w-4 h-4 mr-3 text-slate-400 shrink-0" />
                    {etudiant.telephone || 'Non renseigné'}
                  </div>
                </div>
                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col gap-2">
                  {isEditing ? (
                    <>
                      <button onClick={handleSave} disabled={saving}
                        className="w-full flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-60">
                        {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
                        Enregistrer
                      </button>
                      <button onClick={() => { setIsEditing(false); setFormData(etudiant); }}
                        className="w-full flex items-center justify-center px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-colors">
                        <X className="w-4 h-4 mr-2" /> Annuler
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setIsEditing(true)}
                        className="w-full flex items-center justify-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium rounded-xl transition-colors">
                        <Edit2 className="w-4 h-4 mr-2" /> Modifier
                      </button>
                      <button onClick={() => setShowDeleteModal(true)}
                        className="w-full flex items-center justify-center px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-sm font-medium rounded-xl transition-colors">
                        <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Panels */}
        <div className="lg:col-span-2 space-y-5">
          {/* Personal Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6">
            <div className="flex items-center mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Informations personnelles</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Prénom', name: 'prenom', type: 'text' },
                { label: 'Nom', name: 'nom', type: 'text' },
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Téléphone', name: 'telephone', type: 'text' },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
                  {isEditing ? (
                    <Input type={type} name={name} value={formData[name] || ''} onChange={handleChange}
                      className="block w-full px-3 py-2 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm" />
                  ) : (
                    <div className="px-3 py-2 bg-slate-50 rounded-xl text-sm text-slate-900">{etudiant[name] || '—'}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Academic Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6">
            <div className="flex items-center mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Informations académiques</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Matricule</label>
                <div className="px-3 py-2 bg-slate-100 rounded-xl text-sm font-mono text-slate-700">{etudiant.matricule}</div>
                <p className="text-xs text-slate-400 mt-1">Le matricule est immuable</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Filière</label>
                {isEditing ? (
                  <select name="filiere" value={formData.filiere || ''} onChange={handleChange}
                    className="block w-full px-3 py-2 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm bg-white">
                    <option value="">-- Choisir --</option>
                    {filieres.map((f: any) => <option key={f.id} value={f.nom}>{f.nom}</option>)}
                  </select>
                ) : (
                  <div className="px-3 py-2 bg-slate-50 rounded-xl text-sm text-slate-900">{etudiant.filiere || '—'}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Niveau</label>
                {isEditing ? (
                  <Input type="text" name="niveau" value={formData.niveau || ''} onChange={handleChange}
                    className="block w-full px-3 py-2 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm" />
                ) : (
                  <div className="px-3 py-2 bg-slate-50 rounded-xl text-sm text-slate-900">{etudiant.niveau || '—'}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Statut</label>
                {isEditing ? (
                  <select name="statut" value={formData.statut} onChange={handleChange}
                    className="block w-full px-3 py-2 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm bg-white">
                    <option value="Actif">Actif</option>
                    <option value="Inactif">Inactif</option>
                  </select>
                ) : (
                  <div className="px-3 py-2 bg-slate-50 rounded-xl text-sm text-slate-900">{etudiant.statut}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-center text-slate-900 mb-2">Supprimer l&apos;étudiant</h3>
            <p className="text-sm text-center text-slate-500 mb-6">
              Êtes-vous sûr de vouloir supprimer <strong>{etudiant.prenom} {etudiant.nom}</strong> ? Cette action est irréversible.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-colors">
                Annuler
              </button>
              <button onClick={handleDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-colors">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
