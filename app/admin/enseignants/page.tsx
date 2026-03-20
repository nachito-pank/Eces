/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  AlertCircle,
} from "lucide-react";

// Page d'administration des enseignants
// - liste et recherche
// - édition rapide et suppression
// - redirection vers détails/ajout
import { enseignantsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function EnseignantsPage() {
  // hook de navigation Next.js
  const router = useRouter();

  // état local du filtre de recherche
  const [searchTerm, setSearchTerm] = useState("");

  // données de la liste d'enseignants reçues de l'API
  const [enseignants, setEnseignants] = useState<any[]>([]);

  // état d'affichage lors du chargement des données
  const [loading, setLoading] = useState(true);

  // message d'erreur éventuellement affiché à l'utilisateur
  const [error, setError] = useState<string | null>(null);

  // récupération des enseignants depuis l'API (appel unique au montage)
  const fetchEnseignants = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await enseignantsApi.getAll();
      setEnseignants(res.enseignants);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEnseignants();
  }, []);

  // suppression d'un enseignant (écran de confirmation + mise à jour locale)
  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet enseignant ?")) return;
    try {
      await enseignantsApi.delete(id);
      setEnseignants((p) => p.filter((e) => e.id !== id));
    } catch (err: any) {
      alert("Erreur : " + err.message);
    }
  };

  // filtre de recherche sur nom/prénom/matières/filières/niveaux ; accessible dès la frappe
  const filtered = enseignants.filter((e) =>
    [
      e.nom,
      e.prenom,
      ...(e.matieres || []),
      ...(e.filieres || []),
      ...(e.niveaux || []),
    ].some((v) => (v || "").toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <div className="space-y-6">
      {/* en-tête de page : titre + bouton d'ajout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-title font-bold text-slate-900 dark:text-slate-100">
            Enseignants
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gérez l&apos;équipe pédagogique
          </p>
        </div>
        <Link
          href="/admin/enseignants/ajouter"
          className="inline-flex items-center px-4 py-2.5 bg-linear-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white text-sm font-medium rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 mr-2" /> Ajouter un enseignant
        </Link>
      </div>

      {/* affichage d'une erreur de chargement avec bouton de réessai */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl flex items-center">
          <AlertCircle className="w-5 h-5 mr-3" />
          <span className="text-sm">{error}</span>
          <button
            onClick={fetchEnseignants}
            className="ml-auto text-xs underline"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* conteneur principal de la table et du champ de recherche -> responsive */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="Rechercher par nom, matière, filière, niveau..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 text-sm transition-colors"
            />
          </div>
        </div>

        {/* spinner pendant le chargement puis affichage de la table */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
                  <th className="px-4 sm:px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Enseignant
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden md:table-cell">
                    Matière
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden lg:table-cell">
                    Filière
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden lg:table-cell">
                    Niveaux
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden sm:table-cell">
                    Contact
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {/* affichage des lignes filtrées, interaction click pour détail */}
                {filtered.length > 0 ? (
                  filtered.map((e) => (
                    <tr
                      key={e.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors cursor-pointer"
                      onClick={() => router.push(`/admin/enseignants/${e.id}`)}
                    >
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-medium text-sm shrink-0"
                            style={{ backgroundColor: e.couleur || "#3B82F6" }}
                          >
                            {e.avatar}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                              {e.prenom} {e.nom}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              Depuis {new Date(e.dateEmbauche).getFullYear()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                        <div className="text-sm text-slate-900 dark:text-slate-200 max-w-45 truncate">
                          {e.matieres?.join(", ")}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {e.filieres?.map((f: string) => (
                            <span
                              key={f}
                              className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {(e.niveaux || []).length > 0 ? (
                            e.niveaux.map((n: string) => (
                              <span
                                key={n}
                                className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-violet-50 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-800"
                              >
                                {n}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-slate-400 dark:text-slate-500">
                              —
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden sm:table-cell whitespace-nowrap">
                        <div className="text-sm text-slate-900 dark:text-slate-200">
                          {e.email}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {e.telephone}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            e.statut === "Actif"
                              ? "bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                              : "bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
                          }`}
                        >
                          {e.statut}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
                        <div
                          className="flex items-center justify-end space-x-1"
                          onClick={(ev) => ev.stopPropagation()}
                        >
                          <Button
                            onClick={() =>
                              router.push(`/admin/enseignants/${e.id}`)
                            }
                            className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={(ev) => handleDelete(e.id, ev)}
                            className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <Search className="w-8 h-8 mb-3 text-slate-300 dark:text-slate-600 mx-auto" />
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Aucun enseignant trouvé
                        {searchTerm && ` pour "${searchTerm}"`}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
