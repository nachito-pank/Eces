'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Users, GraduationCap, AlertTriangle, Check, X, BookOpen, Layers, Loader2, AlertCircle } from 'lucide-react';
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
    setLoading(true); setError(null);
    try { const res = await filieresApi.getAll(); setFilieres(res.filieres); }
    catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchFilieres(); }, []);

  const handleSaveEdit = async () => {
    if (!editingId) return;
    setSaving(true);
    try { const res = await filieresApi.update(editingId, editData); setFilieres((p) => p.map((f) => f.id === editingId ? res.filiere : f)); setEditingId(null); }
    catch (err: any) { setError(err.message); }
    finally { setSaving(false); }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const res = await filieresApi.create({ ...addData, nbEtudiants: Number(addData.nbEtudiants), nbEnseignants: Number(addData.nbEnseignants) });
      setFilieres((p) => [...p, res.filiere]);
      setShowAddModal(false);
      setAddData({ nom: '', code: '', cycle: '', niveau: '', nbEtudiants: 0, nbEnseignants: 0 });
    } catch (err: any) { setError(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!showDeleteModal) return;
    try { await filieresApi.delete(showDeleteModal); setFilieres((p) => p.filter((f) => f.id !== showDeleteModal)); setShowDeleteModal(null); }
    catch (err: any) { setError(err.message); setShowDeleteModal(null); }
  };

  const inputCls = "block w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 text-sm";
  const editInputCls = "block w-full px-3 py-2 border border-blue-300 dark:border-blue-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 text-sm";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-title font-bold text-slate-900 dark:text-slate-100">Filières</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gérez les filières d&apos;enseignement</p>
        </div>
        <button onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white text-sm font-medium rounded-xl shadow-sm transition-all">
          <Plus className="w-4 h-4 mr-2" /> Ajouter une filière
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl flex items-center">
          <AlertCircle className="w-5 h-5 mr-3 shrink-0" /><span className="text-sm">{error}</span>
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
              <div key={filiere.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden relative group">
                <div className={`h-2 w-full ${colorClass}`} />
                {isEditing ? (
                  <div className="p-5 space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Nom</label>
                      <Input type="text" value={editData.nom} onChange={(e) => setEditData({ ...editData, nom: e.target.value })} className={editInputCls} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Code</label>
                      <Input type="text" value={editData.code} onChange={(e) => setEditData({ ...editData, code: e.target.value })} className={editInputCls} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Cycle</label>
                        <select value={editData.cycle} onChange={(e) => setEditData({ ...editData, cycle: e.target.value })} className={editInputCls}>
                          <option value="">--</option>{CYCLES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Niveau</label>
                        <select value={editData.niveau} onChange={(e) => setEditData({ ...editData, niveau: e.target.value })} className={editInputCls}>
                          <option value="">--</option>{NIVEAUX.map((n) => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Étudiants</label>
                        <Input type="number" value={editData.nbEtudiants} onChange={(e) => setEditData({ ...editData, nbEtudiants: Number(e.target.value) })} className={editInputCls} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Enseignants</label>
                        <Input type="number" value={editData.nbEnseignants} onChange={(e) => setEditData({ ...editData, nbEnseignants: Number(e.target.value) })} className={editInputCls} />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button onClick={handleSaveEdit} disabled={saving}
                        className="flex-1 flex items-center justify-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-60">
                        {saving ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Check className="w-3 h-3 mr-1.5" />} Enregistrer
                      </button>
                      <button onClick={() => setEditingId(null)}
                        className="flex-1 flex items-center justify-center px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-lg transition-colors">
                        <X className="w-3 h-3 mr-1.5" /> Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 mb-2">{filiere.code}</span>
                        <h3 className="text-lg font-title font-bold text-slate-900 dark:text-slate-100 leading-tight">{filiere.nom}</h3>
                      </div>
                      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0">
                        <button onClick={() => { setEditingId(filiere.id); setEditData({ ...filiere }); }}
                          className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => setShowDeleteModal(filiere.id)}
                          className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {filiere.cycle && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-800">
                          <BookOpen className="w-3 h-3" />{filiere.cycle}
                        </span>
                      )}
                      {filiere.niveau && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-800">
                          <Layers className="w-3 h-3" />{filiere.niveau}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 dark:bg-slate-700/60 rounded-xl p-3 border border-slate-100 dark:border-slate-700">
                        <div className="flex items-center text-slate-500 dark:text-slate-400 mb-1">
                          <GraduationCap className="w-4 h-4 mr-1.5" /><span className="text-xs font-medium">Étudiants</span>
                        </div>
                        <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{filiere.nbEtudiants}</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-700/60 rounded-xl p-3 border border-slate-100 dark:border-slate-700">
                        <div className="flex items-center text-slate-500 dark:text-slate-400 mb-1">
                          <Users className="w-4 h-4 mr-1.5" /><span className="text-xs font-medium">Enseignants</span>
                        </div>
                        <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{filiere.nbEnseignants}</p>
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
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto border dark:border-slate-700">
            <h3 className="text-lg font-title font-bold text-slate-900 dark:text-slate-100 mb-4">Ajouter une filière</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              {[{ label: 'Nom *', key: 'nom', ph: 'Ex: Sciences Politiques' }, { label: 'Code *', key: 'code', ph: 'Ex: SCP' }].map(({ label, key, ph }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
                  <Input type="text" required value={(addData as any)[key]} onChange={(e) => setAddData({ ...addData, [key]: e.target.value })} className={inputCls} placeholder={ph} />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                {[{ label: 'Cycle *', key: 'cycle', opts: CYCLES }, { label: 'Niveau *', key: 'niveau', opts: NIVEAUX }].map(({ label, key, opts }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
                    <select required value={(addData as any)[key]} onChange={(e) => setAddData({ ...addData, [key]: e.target.value })} className={inputCls}>
                      <option value="">--</option>{opts.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[{ label: 'Nb Étudiants', key: 'nbEtudiants' }, { label: 'Nb Enseignants', key: 'nbEnseignants' }].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
                    <Input type="number" min={0} value={(addData as any)[key]} onChange={(e) => setAddData({ ...addData, [key]: Number(e.target.value) })} className={inputCls} />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-xl transition-colors">Annuler</button>
                <button type="submit" disabled={saving}
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-60">
                  {saving && <Loader2 className="w-4 h-4 mr-2 inline animate-spin" />} Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-md w-full p-6 border dark:border-slate-700">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-center text-slate-900 dark:text-slate-100 mb-2">Supprimer la filière</h3>
            <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-6">Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-xl">Annuler</button>
              <button onClick={handleDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
