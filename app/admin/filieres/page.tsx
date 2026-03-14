'use client';

import { useState, useEffect } from 'react';
import {
  Plus, Edit2, Trash2, Users, GraduationCap, AlertTriangle, Check, X,
  BookOpen, Layers, Loader2, AlertCircle
} from 'lucide-react';
import { filieresApi } from '@/lib/api';
import { Input } from '@/components/ui/input';

const CYCLES = ['Licence', 'Master', 'Doctorat'];
const NIVEAUX = ['Bac+1', 'Bac+2', 'Bac+3', 'Bac+4', 'Bac+5'];
const COLORS = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500', 'bg-rose-500', 'bg-cyan-500'];

export default function FilieresPage() {
  const [filieres, setFilieres] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addData, setAddData] = useState({ nom: '', code: '', cycle: '', niveau: '', nbEtudiants: 0, nbEnseignants: 0 });
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchFilieres = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await filieresApi.getAll();
      setFilieres(res.filieres);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFilieres(); }, []);

  const handleSaveEdit = async () => {
    if (!editingId) return;
    setSaving(true);
    try {
      const res = await filieresApi.update(editingId, editData);
      setFilieres((prev) => prev.map((f) => f.id === editingId ? res.filiere : f));
      setEditingId(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await filieresApi.create({
        ...addData,
        nbEtudiants: Number(addData.nbEtudiants),
        nbEnseignants: Number(addData.nbEnseignants),
      });
      setFilieres((prev) => [...prev, res.filiere]);
      setShowAddModal(false);
      setAddData({ nom: '', code: '', cycle: '', niveau: '', nbEtudiants: 0, nbEnseignants: 0 });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!showDeleteModal) return;
    try {
      await filieresApi.delete(showDeleteModal);
      setFilieres((prev) => prev.filter((f) => f.id !== showDeleteModal));
      setShowDeleteModal(null);
    } catch (err: any) {
      setError(err.message);
      setShowDeleteModal(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-title font-bold text-slate-900">Filières</h1>
          <p className="text-slate-500 mt-1">Gérez les filières d&apos;enseignement</p>
        </div>
        <button onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white text-sm font-medium rounded-xl shadow-sm transition-all">
          <Plus className="w-4 h-4 mr-2" /> Ajouter une filière
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center">
          <AlertCircle className="w-5 h-5 mr-3 shrink-0" />
          <span className="text-sm">{error}</span>
          <button onClick={fetchFilieres} className="ml-auto text-xs underline">Réessayer</button>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16"><Loader2 className="w-8 h-8 text-blue-500 animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filieres.map((filiere, index) => {
            const isEditing = editingId === filiere.id;
            const colorClass = COLORS[index % COLORS.length];

            return (
              <div key={filiere.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative group">
                <div className={`h-2 w-full ${colorClass}`} />
                {isEditing ? (
                  <div className="p-5 space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Nom</label>
                      <Input type="text" value={editData.nom} onChange={(e) => setEditData({ ...editData, nom: e.target.value })}
                        className="block w-full px-3 py-2 border border-blue-300 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Code</label>
                      <Input type="text" value={editData.code} onChange={(e) => setEditData({ ...editData, code: e.target.value })}
                        className="block w-full px-3 py-2 border border-blue-300 rounded-lg text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Cycle</label>
                        <select value={editData.cycle} onChange={(e) => setEditData({ ...editData, cycle: e.target.value })}
                          className="block w-full px-3 py-2 border border-blue-300 rounded-lg text-sm bg-white">
                          <option value="">--</option>
                          {CYCLES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Niveau</label>
                        <select value={editData.niveau} onChange={(e) => setEditData({ ...editData, niveau: e.target.value })}
                          className="block w-full px-3 py-2 border border-blue-300 rounded-lg text-sm bg-white">
                          <option value="">--</option>
                          {NIVEAUX.map((n) => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Étudiants</label>
                        <Input type="number" value={editData.nbEtudiants} onChange={(e) => setEditData({ ...editData, nbEtudiants: Number(e.target.value) })}
                          className="block w-full px-3 py-2 border border-blue-300 rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Enseignants</label>
                        <Input type="number" value={editData.nbEnseignants} onChange={(e) => setEditData({ ...editData, nbEnseignants: Number(e.target.value) })}
                          className="block w-full px-3 py-2 border border-blue-300 rounded-lg text-sm" />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button onClick={handleSaveEdit} disabled={saving}
                        className="flex-1 flex items-center justify-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-60">
                        {saving ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Check className="w-3 h-3 mr-1.5" />} Enregistrer
                      </button>
                      <button onClick={() => setEditingId(null)}
                        className="flex-1 flex items-center justify-center px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors">
                        <X className="w-3 h-3 mr-1.5" /> Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-100 text-blue-800 mb-2">
                          {filiere.code}
                        </span>
                        <h3 className="text-lg font-title font-bold text-slate-900 leading-tight">{filiere.nom}</h3>
                      </div>
                      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0">
                        <button onClick={() => { setEditingId(filiere.id); setEditData({ ...filiere }); }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => setShowDeleteModal(filiere.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {filiere.cycle && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                          <BookOpen className="w-3 h-3" />{filiere.cycle}
                        </span>
                      )}
                      {filiere.niveau && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                          <Layers className="w-3 h-3" />{filiere.niveau}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <div className="flex items-center text-slate-500 mb-1">
                          <GraduationCap className="w-4 h-4 mr-1.5" />
                          <span className="text-xs font-medium">Étudiants</span>
                        </div>
                        <p className="text-lg font-bold text-slate-900">{filiere.nbEtudiants}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <div className="flex items-center text-slate-500 mb-1">
                          <Users className="w-4 h-4 mr-1.5" />
                          <span className="text-xs font-medium">Enseignants</span>
                        </div>
                        <p className="text-lg font-bold text-slate-900">{filiere.nbEnseignants}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-title font-bold text-slate-900 mb-4">Ajouter une filière</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nom *</label>
                <Input type="text" required value={addData.nom} onChange={(e) => setAddData({ ...addData, nom: e.target.value })}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-sm" placeholder="Ex: Sciences Politiques" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Code *</label>
                <Input type="text" required value={addData.code} onChange={(e) => setAddData({ ...addData, code: e.target.value })}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-sm" placeholder="Ex: SCP" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Cycle *</label>
                  <select required value={addData.cycle} onChange={(e) => setAddData({ ...addData, cycle: e.target.value })}
                    className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white">
                    <option value="">--</option>
                    {CYCLES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Niveau *</label>
                  <select required value={addData.niveau} onChange={(e) => setAddData({ ...addData, niveau: e.target.value })}
                    className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white">
                    <option value="">--</option>
                    {NIVEAUX.map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Nb Étudiants</label>
                  <Input type="number" min={0} value={addData.nbEtudiants} onChange={(e) => setAddData({ ...addData, nbEtudiants: Number(e.target.value) })}
                    className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Nb Enseignants</label>
                  <Input type="number" min={0} value={addData.nbEnseignants} onChange={(e) => setAddData({ ...addData, nbEnseignants: Number(e.target.value) })}
                    className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-sm" />
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-colors">Annuler</button>
                <button type="submit" disabled={saving}
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-60">
                  {saving && <Loader2 className="w-4 h-4 mr-2 inline animate-spin" />} Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-center text-slate-900 mb-2">Supprimer la filière</h3>
            <p className="text-sm text-center text-slate-500 mb-6">Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl">Annuler</button>
              <button onClick={handleDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
