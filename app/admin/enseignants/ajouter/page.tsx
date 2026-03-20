"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  User,
  BookOpen,
  Check,
  Loader2,
  AlertCircle,
  X,
  GraduationCap,
} from "lucide-react";
import { enseignantsApi, filieresApi } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// classes réutilisables pour les inputs, labels et sections du formulaire
const INPUT =
  "block w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 text-sm";
const LABEL =
  "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5";
const PANEL =
  "bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 sm:p-6";

// liste statique des niveaux pour la sélection
const NIVEAUX_DISPONIBLES = ["L1", "L2", "L3", "M1", "M2"];

export default function AjouterEnseignantPage() {
  // navigation Next.js
  const router = useRouter();

  // liste des filières récupérées depuis l'API
  const [filieres, setFilieres] = useState<any[]>([]);

  // état local du formulaire, valeurs initiales
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    telephone: "",
    matieres: [] as string[],
    filieres: [] as string[],
    niveaux: [] as string[],
    statut: "Actif",
    dateEmbauche: new Date().toISOString().split("T")[0],
  });
  const [submitting, setSubmitting] = useState(false); // état du bouton de soumission
  const [showSuccess, setShowSuccess] = useState(false); // message succès une fois enregistré
  const [error, setError] = useState<string | null>(null); // message d'erreur global

  // récupération des filières au montage de la page
  useEffect(() => {
    filieresApi
      .getAll()
      .then((r) => setFilieres(r.filieres))
      .catch(() => {});
  }, []);

  const matieresDisponibles = useMemo(() => {
    const set = new Set<string>();
    filieres
      .filter((f) => formData.filieres.includes(f.nom))
      .forEach((f) => (f.matieres || []).forEach((m: string) => set.add(m)));
    return Array.from(set).sort();
  }, [filieres, formData.filieres]);

  // chaque fois que la liste de matières disponibles change, on retire les matières invalides
  useEffect(() => {
    setFormData((p) => ({
      ...p,
      matieres: p.matieres.filter((m) => matieresDisponibles.includes(m)),
    }));
  }, [matieresDisponibles]);

  // gère les saisies utilisateur pour inputs et selects
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  // bascule une filière dans le formulaire (sélection/désélection)
  const toggleFiliere = (nom: string) =>
    setFormData((p) => ({
      ...p,
      filieres: p.filieres.includes(nom)
        ? p.filieres.filter((f) => f !== nom)
        : [...p.filieres, nom],
    }));

  // bascule une matière dans le formulaire (sélection/désélection)
  const toggleMatiere = (m: string) =>
    setFormData((p) => ({
      ...p,
      matieres: p.matieres.includes(m)
        ? p.matieres.filter((x) => x !== m)
        : [...p.matieres, m],
    }));

  // bascule un niveau de diplôme dans la sélection
  const toggleNiveau = (n: string) =>
    setFormData((p) => ({
      ...p,
      niveaux: p.niveaux.includes(n)
        ? p.niveaux.filter((x) => x !== n)
        : [...p.niveaux, n],
    }));

  // validation et envoi du formulaire à l'API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.matieres.length === 0) {
      setError("Veuillez sélectionner au moins une matière.");
      return;
    }
    if (formData.niveaux.length === 0) {
      setError("Veuillez sélectionner au moins un niveau.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await enseignantsApi.create({ ...formData });
      setShowSuccess(true);
      setTimeout(() => router.push("/admin/enseignants"), 1500);
    } catch (err: any) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  // initiales affichées dans la carte de prévisualisation
  const initials =
    `${formData.prenom.charAt(0)}${formData.nom.charAt(0)}`.toUpperCase();

  return (
    <div className="space-y-6">
      {/* fil d'Ariane */}
      <nav className="flex text-sm text-slate-500 dark:text-slate-400 font-medium flex-wrap gap-1">
        <Link
          href="/admin/enseignants"
          className="hover:text-blue-600 dark:hover:text-blue-400"
        >
          Enseignants
        </Link>
        <ChevronRight className="w-4 h-4 mx-1 shrink-0" />
        <span className="text-slate-900 dark:text-slate-100">
          Ajouter un enseignant
        </span>
      </nav>

      {showSuccess && (
        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl flex items-center">
          <Check className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">
            Enseignant ajouté avec succès. Redirection...
          </span>
        </div>
      )}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl flex items-center">
          <AlertCircle className="w-5 h-5 mr-3 shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* formulaire principal + aperçu en temps réel */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start"
      >
        {/* carte de prévisualisation du nouvel enseignant */}
        <div className="lg:col-span-1 lg:sticky lg:top-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="h-24 bg-linear-to-r from-blue-900 to-blue-700" />
            <div className="px-6 pb-6 relative">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl border-4 border-white dark:border-slate-800 shadow-sm absolute -top-10 bg-blue-500">
                {initials || "?"}
              </div>
              <div className="pt-14">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {formData.prenom || "Prénom"} {formData.nom || "Nom"}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {formData.matieres.length > 0
                    ? formData.matieres.join(", ")
                    : "Aucune matière"}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${formData.statut === "Actif" ? "bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"}`}
                  >
                    {formData.statut}
                  </span>
                  {formData.niveaux.map((n) => (
                    <span
                      key={n}
                      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-violet-50 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-800"
                    >
                      {n}
                    </span>
                  ))}
                  {formData.filieres.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700 flex flex-col gap-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center px-4 py-2 bg-linear-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white text-sm font-medium rounded-xl disabled:opacity-60"
                  >
                    {submitting && (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    )}{" "}
                    Ajouter l&apos;enseignant
                  </button>
                  <Link
                    href="/admin/enseignants"
                    className="w-full flex items-center justify-center px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-xl"
                  >
                    Annuler
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-5">
          {/* contenu du formulaire : informations et réglages de l'enseignant */}
          {/* Informations personnelles */}
          <div className={PANEL}>
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
                { label: "Prénom *", name: "prenom", ph: "Marie", req: true },
                { label: "Nom *", name: "nom", ph: "Dupont", req: true },
                {
                  label: "Email *",
                  name: "email",
                  ph: "marie@ecole.fr",
                  req: true,
                  type: "email",
                },
                {
                  label: "Téléphone",
                  name: "telephone",
                  ph: "+242 06 000 0000",
                },
              ].map(({ label, name, ph, req, type }) => (
                <div key={name}>
                  <label htmlFor={name} className={LABEL}>{label}</label>
                  <Input
                    id={name}
                    type={type || "text"}
                    name={name}
                    required={req}
                    value={(formData as any)[name]}
                    onChange={handleChange}
                    className={INPUT}
                    placeholder={ph}
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label htmlFor="motDePasse" className={LABEL}>Mot de passe *</label>
                <Input
                  id="motDePasse"
                  type="password"
                  name="motDePasse"
                  required
                  value={formData.motDePasse}
                  onChange={handleChange}
                  className={INPUT}
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Informations académiques */}
          <div className={PANEL}>
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
                  Filières *{" "}
                  <span className="text-xs font-normal text-slate-400 dark:text-slate-500">
                    — les matières disponibles dépendent de ce choix
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-2 p-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                  {filieres.map((f) => (
                    <label
                      key={f.id}
                      className="flex items-center cursor-pointer gap-2 py-1"
                    >
                      <input
                        type="checkbox"
                        checked={formData.filieres.includes(f.nom)}
                        onChange={() => toggleFiliere(f.nom)}
                        className="rounded border-slate-300 dark:border-slate-600 text-blue-600 w-4 h-4 shrink-0"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-200 truncate">
                        {f.nom}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Matières */}
              <div className="sm:col-span-2">
                <label className={LABEL}>
                  Matières *{" "}
                  <span className="text-xs font-normal text-slate-400 dark:text-slate-500">
                    ({formData.matieres.length} sélectionnée
                    {formData.matieres.length > 1 ? "s" : ""})
                  </span>
                </label>
                {formData.filieres.length === 0 ? (
                  <div className="p-4 border border-dashed border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700/30 text-center">
                    <BookOpen className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-400 dark:text-slate-500">
                      Sélectionnez d&apos;abord une ou plusieurs filières pour
                      voir les matières disponibles.
                    </p>
                  </div>
                ) : (
                  <div className="border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700/50 overflow-hidden">
                    {formData.matieres.length > 0 && (
                      <div className="flex flex-wrap gap-2 p-3 border-b border-slate-200 dark:border-slate-600 bg-blue-50/60 dark:bg-blue-900/10">
                        {formData.matieres.map((m) => (
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
                      {matieresDisponibles.map((m) => (
                        <label
                          key={m}
                          className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${formData.matieres.includes(m) ? "bg-blue-50 dark:bg-blue-900/30" : "hover:bg-slate-100 dark:hover:bg-slate-600/50"}`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.matieres.includes(m)}
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
                    Niveaux enseignés *{" "}
                    <span className="text-xs font-normal text-slate-400 dark:text-slate-500">
                      ({formData.niveaux.length} sélectionné
                      {formData.niveaux.length > 1 ? "s" : ""})
                    </span>
                  </span>
                </label>
                <div className="flex flex-wrap gap-2 p-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                  {NIVEAUX_DISPONIBLES.map((n) => {
                    const selected = formData.niveaux.includes(n);
                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => toggleNiveau(n)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-semibold border transition-all ${selected ? "bg-violet-600 dark:bg-violet-500 text-white border-violet-600 dark:border-violet-500 shadow-sm" : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-violet-300 dark:hover:border-violet-600 hover:text-violet-600 dark:hover:text-violet-400"}`}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="statut" className={LABEL}>Statut</label>
                <select
                  id="statut"
                  name="statut"
                  value={formData.statut}
                  onChange={handleChange}
                  className={INPUT}
                >
                  <option value="Actif">Actif</option>
                  <option value="Inactif">Inactif</option>
                </select>
              </div>
              <div>
                <label htmlFor="dateEmbauche" className={LABEL}>Date d&apos;embauche *</label>
                <Input
                  id="dateEmbauche"
                  type="date"
                  name="dateEmbauche"
                  required
                  value={formData.dateEmbauche}
                  onChange={handleChange}
                  className={INPUT}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
