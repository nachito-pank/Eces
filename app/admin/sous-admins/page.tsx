'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Plus, Shield, Loader2, AlertCircle } from 'lucide-react';
import { sousAdminsApi } from '@/lib/api';

export default function SousAdminsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [sousAdmins, setSousAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSousAdmins = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await sousAdminsApi.getAll();
      setSousAdmins(res.sousAdmins);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSousAdmins(); }, []);

  const filtered = sousAdmins.filter((a) =>
    [a.nom, a.prenom, a.role].some((v) =>
      (v || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-title font-bold text-slate-900">Sous-Administrateurs</h1>
          <p className="text-slate-500 mt-1">Gérez les accès et les droits</p>
        </div>
        <Link href="/admin/sous-admins/ajouter"
          className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white text-sm font-medium rounded-xl shadow-sm transition-all">
          <Plus className="w-4 h-4 mr-2" /> Ajouter un sous-admin
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center">
          <AlertCircle className="w-5 h-5 mr-3" />
          <span className="text-sm">{error}</span>
          <button onClick={fetchSousAdmins} className="ml-auto text-xs underline">Réessayer</button>
        </div>
      )}

      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input type="text" placeholder="Rechercher par nom, prénom, rôle..."
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors bg-white shadow-sm" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16"><Loader2 className="w-8 h-8 text-blue-500 animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.length > 0 ? filtered.map((admin) => (
            <div key={admin.id} onClick={() => router.push(`/admin/sous-admins/${admin.id}`)}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer group">
              <div className="h-16 bg-gradient-to-r from-blue-900 to-blue-700 relative">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg border-4 border-white shadow-sm absolute -bottom-7 left-5"
                  style={{ backgroundColor: admin.couleur || '#10B981' }}>
                  {admin.avatar}
                </div>
              </div>
              <div className="pt-9 px-5 pb-5">
                <div className="flex justify-between items-start">
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {admin.prenom} {admin.nom}
                    </h3>
                    <p className="text-sm text-slate-500 truncate">{admin.role}</p>
                  </div>
                  <span className={`ml-2 shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    admin.statut === 'Actif' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {admin.statut}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                    <Shield className="w-3 h-3 mr-1" /> Droits d&apos;accès
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {admin.droits?.map((droit: string, idx: number) => (
                      <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600">
                        {droit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-100 border-dashed">
              <div className="flex flex-col items-center justify-center text-slate-500">
                <Search className="w-8 h-8 mb-3 text-slate-300" />
                <p className="text-sm">Aucun sous-administrateur trouvé{searchTerm && ` pour "${searchTerm}"`}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
