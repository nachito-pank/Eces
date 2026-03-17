'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Plus, Edit2, Trash2, User, Mail, Loader2, AlertCircle } from 'lucide-react';
import { etudiantsApi } from '@/lib/api';

export default function EtudiantsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [etudiants, setEtudiants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEtudiants = async () => {
    setLoading(true); setError(null);
    try { const res = await etudiantsApi.getAll(); setEtudiants(res.etudiants); }
    catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchEtudiants(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) return;
    try { await etudiantsApi.delete(id); setEtudiants((p) => p.filter((e) => e.id !== id)); }
    catch (err: any) { alert('Erreur : ' + err.message); }
  };

  const filtered = etudiants.filter((e) =>
    [e.nom, e.prenom, e.matricule, e.filiere].some((v) =>
      (v || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const statutClass = (s: string) =>
    s === 'Actif'
      ? 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-400'
      : 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-400';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-title font-bold text-slate-900 dark:text-slate-100">Étudiants</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gérez les inscriptions et le suivi des étudiants</p>
        </div>
        <Link href="/admin/etudiants/ajouter"
          className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white text-sm font-medium rounded-xl shadow-sm transition-all">
          <Plus className="w-4 h-4 mr-2" /> Ajouter un étudiant
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl flex items-center">
          <AlertCircle className="w-5 h-5 mr-3" /><span className="text-sm">{error}</span>
          <button onClick={fetchEtudiants} className="ml-auto text-xs underline">Réessayer</button>
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            </div>
            <input type="text" placeholder="Rechercher par nom, prénom, matricule, filière..."
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors" />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="w-8 h-8 text-blue-500 animate-spin" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                  {['Étudiant','Matricule','Filière','Niveau','Statut','Actions'].map((h, i) => (
                    <th key={h} className={`text-left p-4 font-semibold text-slate-900 dark:text-slate-200 whitespace-nowrap ${i === 2 ? 'hidden md:table-cell' : ''} ${i === 3 ? 'hidden lg:table-cell' : ''} ${i === 5 ? 'text-right' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {filtered.map((etudiant) => (
                  <tr key={etudiant.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-medium text-sm shrink-0"
                          style={{ backgroundColor: etudiant.couleur || '#3B82F6' }}>
                          {etudiant.avatar}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-slate-900 dark:text-slate-100 truncate">{etudiant.prenom} {etudiant.nom}</p>
                          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            <Mail className="w-3 h-3 shrink-0" /><span className="truncate">{etudiant.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <code className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-xs font-mono whitespace-nowrap">
                        {etudiant.matricule}
                      </code>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                        {etudiant.filiere}
                      </span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <span className="text-sm text-slate-700 dark:text-slate-300">{etudiant.niveau}</span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statutClass(etudiant.statut)}`}>
                        {etudiant.statut}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => router.push(`/admin/etudiants/${etudiant.id}`)}
                          className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(etudiant.id)}
                          className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <User className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-200 mb-2">Aucun étudiant trouvé</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {searchTerm ? 'Essayez une autre recherche' : 'Commencez par ajouter des étudiants'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
