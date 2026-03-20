"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  Mail,
  Phone,
  Calendar,
  User,
  BookOpen,
  Edit2,
  Trash2,
  Check,
  X,
  AlertTriangle,
  Loader2,
  AlertCircle,
  GraduationCap,
} from "lucide-react";
import { enseignantsApi, filieresApi } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// classes utilitaires Tailwind utilisées pour la présentation des panneaux et champs
const PANEL ="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700";
const FVIEW ="px-3 py-2 bg-slate-50 dark:bg-slate-700/60 rounded-xl text-sm text-slate-900 dark:text-slate-100";
const FEDIT ="block w-full px-3 py-2 border border-blue-300 dark:border-blue-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 text-sm";
const LABEL ="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5";

// liste des niveaux disponibles pour le sélecteur interactif
const NIVEAUX_DISPONIBLES = ["L1", "L2", "L3", "M1", "M2"];

export default function EnseignantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [enseignant, setEnseignant] = useState<any>(null);
  const [filieres, setFilieres] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([enseignantsApi.getById(id), filieresApi.getAll()])
      .then(([enRes, filRes]) => {
        const data = {
          ...enRes.enseignant,
          matieres: Array.isArray(enRes.enseignant.matieres)
            ? enRes.enseignant.matieres
            : [],
          niveaux: Array.isArray(enRes.enseignant.niveaux)
            ? enRes.enseignant.niveaux
            : [],
        };
        setEnseignant(data);
        setFormData({ ...data });
        setFilieres(filRes.filieres);
      })
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const matieresDisponibles = useMemo(() => {
    if (!formData) return [];
    const set = new Set<string>();
    filieres
      .filter((f) => (formData.filieres || []).includes(f.nom))
      .forEach((f) => (f.matieres || []).forEach((m: string) => set.add(m)));
    return Array.from(set).sort();
  }, [filieres, formData?.filieres]);

  useEffect(() => {
    if (!formData || !isEditing) return;
    setFormData((p: any) => ({
      ...p,
      matieres: (p.matieres || []).filter((m: string) =>
        matieresDisponibles.includes(m),
      ),
    }));
  }, [matieresDisponibles, isEditing]);

  const handleSave = async () => {
    if (!formData.matieres || formData.matieres.length === 0) {
      setError("Veuillez sélectionner au moins une matière.");
      return;
    }
    if (!formData.niveaux || formData.niveaux.length === 0) {
      setError("Veuillez sélectionner au moins un niveau.");
      return;
    }
    setSaving(true);
    try {
      const res = await enseignantsApi.update(id, formData);
      const updated = {
        ...res.enseignant,
        matieres: Array.isArray(res.enseignant.matieres)
          ? res.enseignant.matieres
          : [],
        niveaux: Array.isArray(res.enseignant.niveaux)
          ? res.enseignant.niveaux
          : [],
      };
      setEnseignant(updated);
      setFormData({ ...updated });
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // supprime l'enseignant puis redirige vers la liste
  const handleDelete = async () => {
    try {
      await enseignantsApi.delete(id);
      router.push("/admin/enseignants");
    } catch (err: any) {
      setError(err.message);
      setShowDeleteModal(false);
    }
  };

  // met à jour les valeurs du formulaire lors des modifications des champs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggleFiliere = (nom: string) => {
    if (!isEditing) return;
    setFormData((p: any) => ({
      ...p,
      filieres: (p.filieres || []).includes(nom)
        ? p.filieres.filter((f: string) => f !== nom)
        : [...(p.filieres || []), nom],
    }));
  };

  const toggleMatiere = (m: string) => {
    if (!isEditing) return;
    setFormData((p: any) => ({
      ...p,
      matieres: (p.matieres || []).includes(m)
        ? p.matieres.filter((x: string) => x !== m)
        : [...(p.matieres || []), m],
    }));
  };

  const toggleNiveau = (n: string) => {
    if (!isEditing) return;
    setFormData((p: any) => ({
      ...p,
      niveaux: (p.niveaux || []).includes(n)
        ? p.niveaux.filter((x: string) => x !== n)
        : [...(p.niveaux || []), n],
    }));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  if (error && !enseignant)
    return (
      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl flex items-center">
        <AlertCircle className="w-5 h-5 mr-3" />
        {error}
      </div>
    );
  if (!enseignant) return null;

  const currentMatieres: string[] = formData?.matieres || [];
  const currentNiveaux: string[] = formData?.niveaux || [];

  return (
    <div className="space-y-6">
      <nav className="flex text-sm text-slate-500 dark:text-slate-400 font-medium flex-wrap gap-1">
        <Link
          href="/admin/enseignants"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Enseignants
        </Link>
        <ChevronRight className="w-4 h-4 mx-1 shrink-0" />
        <span className="text-slate-900 dark:text-slate-100">
          {enseignant.prenom} {enseignant.nom}
        </span>
      </nav>

      {showSuccess && (
        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl flex items-center">
          <Check className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">
            Modifications enregistrées.
          </span>
        </div>
      )}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl flex items-center">
          <AlertCircle className="w-5 h-5 mr-3" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Carte profil enseignant + commandes d'édition / suppression */}
        <div className="lg:col-span-1 lg:sticky lg:top-8">
          <div className={`${PANEL} overflow-hidden`}>
            <div className="h-24 bg-linear-to-r from-blue-900 to-blue-700" />
            <div className="px-6 pb-6 relative">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl border-4 border-white dark:border-slate-800 shadow-sm absolute -top-10 bg-blue-500">
                {enseignant.avatar}
              </div>
              <div className="pt-14">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {enseignant.prenom} {enseignant.nom}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {enseignant.matieres?.join(", ")}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${enseignant.statut === "Actif" ? "bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"}`}
                  >
                    {enseignant.statut}
                  </span>
                  {(enseignant.niveaux || []).map((n: string) => (
                    <span
                      key={n}
                      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-violet-50 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-800"
                    >
                      {n}
                    </span>
                  ))}
                </div>
                <div className="mt-5 space-y-2.5">
                  {[
                    { Icon: Mail, val: enseignant.email },
                    {
                      Icon: Phone,
                      val: enseignant.telephone || "Non renseigné",
                    },
                    {
                      Icon: Calendar,
                      val: `Embauché le ${enseignant.dateEmbauche}`,
                    },
                  ].map(({ Icon, val }) => (
                    <div
                      key={val}
                      className="flex items-center text-sm text-slate-600 dark:text-slate-300"
                    >
                      <Icon className="w-4 h-4 mr-3 text-slate-400 dark:text-slate-500 shrink-0" />
                      <span className="truncate">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700 flex flex-col gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-60"
                      >
                        {saving ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Check className="w-4 h-4 mr-2" />
                        )}{" "}
                        Enregistrer
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({ ...enseignant });
                          setError(null);
                        }}
                        className="w-full flex items-center justify-center px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-xl"
                      >
                        <X className="w-4 h-4 mr-2" /> Annuler
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full flex items-center justify-center px-4 py-2 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-xl transition-colors"
                      >
                        <Edit2 className="w-4 h-4 mr-2" /> Modifier le profil
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full flex items-center justify-center px-4 py-2 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 text-sm font-medium rounded-xl transition-colors"
                      >
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
          {/* Infos personnelles */}
          <div className={`${PANEL} p-5 sm:p-6`}>
            <div className="flex items-center mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center mr-3">
                <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Informations personnelles
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Prénom", name: "prenom" },
                { label: "Nom", name: "nom" },
                { label: "Email", name: "email", type: "email" },
                { label: "Téléphone", name: "telephone" },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label htmlFor={name} className={LABEL}>{label}</label>
                  {isEditing ? (
                    <Input
                      id={name}
                      type={type || "text"}
                      name={name}
                      value={formData[name] || ""}
                      onChange={handleChange}
                      className={FEDIT}
                    />
                  ) : (
                    <div className={FVIEW}>{enseignant[name] || "—"}</div>
                  )}
                </div>
              ))}
              <div>
                <label htmlFor="motDePasse" className={LABEL}>Mot de passe</label>
                {isEditing ? (
                  <Input
                    id="motDePasse"
                    type="text"
                    name="motDePasse"
                    value={formData.motDePasse || ""}
                    onChange={handleChange}
                    placeholder="Nouveau mot de passe"
                    className={FEDIT}
                  />
                ) : (
                  <div className={FVIEW}>••••••••</div>
                )}
              </div>
            </div>
          </div>

          {/* Infos académiques */}
          <div className={`${PANEL} p-5 sm:p-6`}>
            <div className="flex items-center mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center mr-3">
                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Informations académiques
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Filières */}
              <div className="sm:col-span-2">
                <label className={LABEL}>
                  Filières
                  {isEditing && (
                    <span className="ml-1.5 text-xs font-normal text-slate-400 dark:text-slate-500">
                      — les matières disponibles dépendent de ce choix
                    </span>
                  )}
                </label>
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-2 p-3 border border-blue-300 dark:border-blue-600 rounded-xl bg-white dark:bg-slate-700">
                    {filieres.map((f: any) => (
                      <label
                        key={f.id}
                        className="flex items-center cursor-pointer gap-2 py-0.5"
                      >
                        <input
                          type="checkbox"
                          checked={(formData.filieres || []).includes(f.nom)}
                          onChange={() => toggleFiliere(f.nom)}
                          className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 w-4 h-4 shrink-0"
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-200 truncate">
                          {f.nom}
                        </span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className={FVIEW}>
                    {enseignant.filieres?.join(", ") || "—"}
                  </div>
                )}
              </div>

              {/* Matières */}
              <div className="sm:col-span-2">
                <label className={LABEL}>
                  Matières
                  {isEditing && (
                    <span className="ml-1.5 text-xs font-normal text-slate-400 dark:text-slate-500">
                      ({currentMatieres.length} sélectionnée
                      {currentMatieres.length > 1 ? "s" : ""})
                    </span>
                  )}
                </label>
                {!isEditing ? (
                  <div className={FVIEW}>
                    {enseignant.matieres?.join(", ") || "—"}
                  </div>
                ) : (formData.filieres || []).length === 0 ? (
                  <div className="p-4 border border-dashed border-blue-200 dark:border-blue-700 rounded-xl bg-blue-50/30 dark:bg-blue-900/10 text-center">
                    <BookOpen className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-400 dark:text-slate-500">
                      Sélectionnez d&apos;abord une ou plusieurs filières pour
                      voir les matières disponibles.
                    </p>
                  </div>
                ) : (
                  <div className="border border-blue-300 dark:border-blue-600 rounded-xl bg-white dark:bg-slate-700 overflow-hidden">
                    {currentMatieres.length > 0 && (
                      <div className="flex flex-wrap gap-2 p-3 border-b border-blue-100 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-900/10">
                        {currentMatieres.map((m: string) => (
                          <span
                            key={m}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                          >
                            {m}
                            <Button
                              type="button"
                              onClick={() => toggleMatiere(m)}
                              className="ml-0.5 hover:text-blue-900 dark:hover:text-blue-100"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 p-3 max-h-64 overflow-y-auto">
                      {matieresDisponibles.map((m: string) => (
                        <label
                          key={m}
                          className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${currentMatieres.includes(m) ? "bg-blue-50 dark:bg-blue-900/30" : "hover:bg-slate-50 dark:hover:bg-slate-600/50"}`}
                        >
                          <input
                            type="checkbox"
                            checked={currentMatieres.includes(m)}
                            onChange={() => toggleMatiere(m)}
                            className="rounded border-slate-300 dark:border-slate-600 text-blue-600 w-4 h-4 shrink-0"
                          />
                          <span className="text-sm text-slate-700 dark:text-slate-200 leading-tight">
                            {m}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Niveaux */}
              <div className="sm:col-span-2">
                <label className={LABEL}>
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    Niveaux enseignés
                    {isEditing && (
                      <span className="text-xs font-normal text-slate-400 dark:text-slate-500">
                        ({currentNiveaux.length} sélectionné
                        {currentNiveaux.length > 1 ? "s" : ""})
                      </span>
                    )}
                  </span>
                </label>
                {!isEditing ? (
                  <div className="flex flex-wrap gap-2">
                    {(enseignant.niveaux || []).length > 0 ? (
                      enseignant.niveaux.map((n: string) => (
                        <span
                          key={n}
                          className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-semibold bg-violet-50 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-800"
                        >
                          {n}
                        </span>
                      ))
                    ) : (
                      <div className={FVIEW}>—</div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 p-3 border border-blue-300 dark:border-blue-600 rounded-xl bg-white dark:bg-slate-700">
                    {NIVEAUX_DISPONIBLES.map((n) => {
                      const selected = currentNiveaux.includes(n);
                      return (
                        <Button
                          key={n}
                          type="button"
                          onClick={() => toggleNiveau(n)}
                          className={`px-4 py-1.5 rounded-lg text-sm font-semibold border transition-all ${selected ? "bg-violet-600 dark:bg-violet-500 text-white border-violet-600 dark:border-violet-500 shadow-sm" : "bg-white dark:bg-slate-600 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-500 hover:border-violet-300 dark:hover:border-violet-600 hover:text-violet-600 dark:hover:text-violet-400"}`}
                        >
                          {n}
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="statut" className={LABEL}>Statut</label>
                {isEditing ? (
                  <select
                    id="statut"
                    name="statut"
                    value={formData.statut}
                    onChange={handleChange}
                    className={FEDIT}
                  >
                    <option value="Actif">Actif</option>
                    <option value="Inactif">Inactif</option>
                  </select>
                ) : (
                  <div className={FVIEW}>{enseignant.statut}</div>
                )}
              </div>
              <div>
                <label htmlFor="dateEmbauche" className={LABEL}>Date d&apos;embauche</label>
                {isEditing ? (
                  <Input
                    id="dateEmbauche"
                    type="date"
                    name="dateEmbauche"
                    value={formData.dateEmbauche}
                    onChange={handleChange}
                    className={FEDIT}
                  />
                ) : (
                  <div className={FVIEW}>{enseignant.dateEmbauche}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${PANEL} max-w-md w-full p-6`}>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-center text-slate-900 dark:text-slate-100 mb-2">
              Supprimer l&apos;enseignant
            </h3>
            <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-6">
              Êtes-vous sûr de vouloir supprimer{" "}
              <strong>
                {enseignant.prenom} {enseignant.nom}
              </strong>{" "}
              ?
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-xl"
              >
                Annuler
              </Button>
              <Button
                onClick={handleDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl"
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
