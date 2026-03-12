'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Users, GraduationCap, AlertTriangle, Check, X, BookOpen, Layers } from 'lucide-react';
import db from '@/data/admins.json';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const COLORS = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500'];

const CYCLES = ['Licence', 'Master', 'Doctorat'];
const NIVEAUX = ['Bac+1', 'Bac+2', 'Bac+3', 'Bac+4', 'Bac+5'];

export default function FilieresPage() {
  const [filieres, setFilieres] = useState(db.filieres);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>(null);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [addData, setAddData] = useState({ nom: '', code: '', cycle: '', niveau: '', nbEtudiants: 0, nbEnseignants: 0 });
  
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

  const handleEditClick = (filiere: any) => {
    setEditingId(filiere.id);
    setEditData({ ...filiere });
  };

  const handleSaveEdit = () => {
    setFilieres(filieres.map(f => f.id === editingId ? editData : f));
    setEditingId(null);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFiliere = {
      ...addData,
      id: Math.max(...filieres.map(f => f.id)) + 1,
      nbEtudiants: Number(addData.nbEtudiants),
      nbEnseignants: Number(addData.nbEnseignants)
    };
    setFilieres([...filieres, newFiliere]);
    setShowAddModal(false);
    setAddData({ nom: '', code: '', cycle: '', niveau: '', nbEtudiants: 0, nbEnseignants: 0 });
  };

  const handleDelete = () => {
    if (showDeleteModal) {
      setFilieres(filieres.filter(f => f.id !== showDeleteModal));
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
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2.5 bg-linear-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white text-sm font-medium rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une filière
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filieres.map((filiere, index) => {
          const isEditing = editingId === filiere.id;
          const colorClass = COLORS[index % COLORS.length];

          return (
            <div key={filiere.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative group">
              <div className={`h-2 w-full ${colorClass}`}></div>
              
              {isEditing ? (
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Nom de la filière</label>
                    <Input 
                      type="text" 
                      value={editData.nom}
                      onChange={(e) => setEditData({...editData, nom: e.target.value})}
                      className="block w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Code</label>
                    <Input 
                      type="text" 
                      value={editData.code}
                      onChange={(e) => setEditData({...editData, code: e.target.value})}
                      className="block w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Cycle</label>
                      <select
                        title="Cycle"
                        value={editData.cycle}
                        onChange={(e) => setEditData({...editData, cycle: e.target.value})}
                        className="block w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                      >
                        <option value="">-- Choisir --</option>
                        {CYCLES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Niveau</label>
                      <select
                        title="Niveau"
                        value={editData.niveau}
                        onChange={(e) => setEditData({...editData, niveau: e.target.value})}
                        className="block w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                      >
                        <option value="">-- Choisir --</option>
                        {NIVEAUX.map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Étudiants</label>
                      <Input 
                        type="number" 
                        value={editData.nbEtudiants}
                        onChange={(e) => setEditData({...editData, nbEtudiants: Number(e.target.value)})}
                        className="block w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Enseignants</label>
                      <Input 
                        type="number" 
                        value={editData.nbEnseignants}
                        onChange={(e) => setEditData({...editData, nbEnseignants: Number(e.target.value)})}
                        className="block w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={handleSaveEdit}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors"
                    >
                      <Check className="w-3 h-3 mr-1.5" /> Enregistrer
                    </button>
                    <button 
                      onClick={() => setEditingId(null)}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors"
                    >
                      <X className="w-3 h-3 mr-1.5" /> Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-100 text-blue-800 mb-2">
                        {filiere.code}
                      </span>
                      <h3 className="text-xl font-title font-bold text-slate-900">{filiere.nom}</h3>
                    </div>
                    <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        onClick={() => handleEditClick(filiere)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors mr-1"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        onClick={() => setShowDeleteModal(filiere.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Cycle & Niveau badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {filiere.cycle && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                        <BookOpen className="w-3 h-3" />
                        {filiere.cycle}
                      </span>
                    )}
                    {filiere.niveau && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                        <Layers className="w-3 h-3" />
                        {filiere.niveau}
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-2">
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

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-title font-bold text-slate-900 mb-4">Ajouter une filière</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nom de la filière *</label>
                <Input 
                  type="text" 
                  required
                  value={addData.nom}
                  onChange={(e) => setAddData({...addData, nom: e.target.value})}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Ex: Sciences Politiques"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Code *</label>
                <Input 
                  type="text" 
                  required
                  value={addData.code}
                  onChange={(e) => setAddData({...addData, code: e.target.value})}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Ex: SCP"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Cycle *</label>
                  <select
                    title="Cycle"
                    required
                    value={addData.cycle}
                    onChange={(e) => setAddData({...addData, cycle: e.target.value})}
                    className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                  >
                    <option value="">-- Choisir --</option>
                    {CYCLES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Niveau *</label>
                  <select
                    title="Niveau"
                    required
                    value={addData.niveau}
                    onChange={(e) => setAddData({...addData, niveau: e.target.value})}
                    className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                  >
                    <option value="">-- Choisir --</option>
                    {NIVEAUX.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Nb Étudiants</label>
                  <Input 
                    type="number" 
                    value={addData.nbEtudiants}
                    onChange={(e) => setAddData({...addData, nbEtudiants: Number(e.target.value)})}
                    className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Nb Enseignants</label>
                  <Input 
                    type="number" 
                    value={addData.nbEnseignants}
                    onChange={(e) => setAddData({...addData, nbEnseignants: Number(e.target.value)})}
                    className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-colors"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-title font-bold text-center text-slate-900 mb-2">Supprimer la filière</h3>
            <p className="text-sm text-center text-slate-500 mb-6">
              Êtes-vous sûr de vouloir supprimer cette filière ? Cette action est irréversible.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteModal(null)}
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