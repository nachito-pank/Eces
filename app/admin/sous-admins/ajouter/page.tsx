"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  User,
  Shield,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { sousAdminsApi } from "@/lib/api";

const ALL_DROITS = [
  "Gestion Étudiants",
  "Gestion Filieres",
  "Gestion Enseignants",
  "Rapports",
  "Statistiques",
  "Paramètres",
];
const INPUT =
  "block w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 text-sm";
const LABEL =
  "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5";
const PANEL =
  "bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 sm:p-6";

export default function AjouterSousAdminPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    telephone: "",
    role: "",
    statut: "Actif",
    droits: [] as string[],
  });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };
  const toggleDroit = (droit: string) =>
    setFormData((p) => ({
      ...p,
      droits: p.droits.includes(droit)
        ? p.droits.filter((d) => d !== droit)
        : [...p.droits, droit],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await sousAdminsApi.create(formData);
      setShowSuccess(true);
      setTimeout(() => router.push("/admin/sous-admins"), 1500);
    } catch (err: any) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  const initials =
    `${formData.prenom.charAt(0)}${formData.nom.charAt(0)}`.toUpperCase();

  return (
    <div className="space-y-6">
      <nav className="flex text-sm text-slate-500 dark:text-slate-400 font-medium flex-wrap gap-1">
        <Link
          href="/admin/sous-admins"
          className="hover:text-blue-600 dark:hover:text-blue-400"
        >
          Sous-Admins
        </Link>
        <ChevronRight className="w-4 h-4 mx-1 shrink-0" />
        <span className="text-slate-900 dark:text-slate-100">
          Ajouter un sous-admin
        </span>
      </nav>

      {showSuccess && (
        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl flex items-center">
          <Check className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">
            Sous-admin ajouté avec succès. Redirection...
          </span>
        </div>
      )}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl flex items-center">
          <AlertCircle className="w-5 h-5 mr-3 shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start"
      >
        <div className="lg:col-span-1 lg:sticky lg:top-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="h-24 bg-linear-to-r from-blue-900 to-blue-700" />
            <div className="px-6 pb-6 relative">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl border-4 border-white dark:border-slate-800 shadow-sm absolute -top-10 bg-emerald-500">
                {initials || "?"}
              </div>
              <div className="pt-14">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {formData.prenom || "Prénom"} {formData.nom || "Nom"}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {formData.role || "Rôle"}
                </p>
                <div className="mt-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${formData.statut === "Actif" ? "bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"}`}
                  >
                    {formData.statut}
                  </span>
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
                    Ajouter le sous-admin
                  </button>
                  <Link
                    href="/admin/sous-admins"
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
                { label: "Prénom *", name: "prenom", ph: "Emma", req: true },
                { label: "Nom *", name: "nom", ph: "Petit", req: true },
                {
                  label: "Email *",
                  name: "email",
                  ph: "emma@ecole.fr",
                  req: true,
                  type: "email",
                },
                {
                  label: "Téléphone",
                  name: "telephone",
                  ph: "+242 06 000 0000",
                },
                {
                  label: "Mot de passe *",
                  name: "motDePasse",
                  ph: "••••••••",
                  req: true,
                  type: "password",
                },
                {
                  label: "Rôle *",
                  name: "role",
                  ph: "Sous-Admin RH",
                  req: true,
                },
              ].map(({ label, name, ph, req, type }) => (
                <div key={name}>
                  <label className={LABEL}>{label}</label>
                  <input
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
            </div>
          </div>

          <div className={PANEL}>
            <div className="flex items-center mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center mr-3">
                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Droits d&apos;accès
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ALL_DROITS.map((droit) => {
                const active = formData.droits.includes(droit);
                return (
                  <div
                    key={droit}
                    onClick={() => toggleDroit(droit)}
                    className={`flex items-center p-3.5 rounded-xl border-2 transition-all cursor-pointer ${active ? "border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/30" : "border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-600"}`}
                  >
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center mr-3 shrink-0 ${active ? "bg-blue-500 border-blue-500" : "border-slate-300 dark:border-slate-600"}`}
                    >
                      {active && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span
                      className={`text-sm font-medium ${active ? "text-blue-900 dark:text-blue-300" : "text-slate-600 dark:text-slate-400"}`}
                    >
                      {droit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
