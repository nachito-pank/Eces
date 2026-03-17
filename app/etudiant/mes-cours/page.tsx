/* eslint-disable @typescript-eslint/no-explicit-any */
import adminsData from '@/data/admins.json';

export default function MesCoursPage() {
  const etudiant = (adminsData as any).etudiants?.[0] || { notes: [] };
  const matieres: string[] = Array.from(
    new Set<string>((etudiant.notes || []).map((n: any) => String(n.matiere ?? '')).filter(Boolean))
  );

  return (
    <main className="w-full p-6">
      <div className="bg-white rounded-2xl dark:text-gray-900 shadow-sm border border-slate-100 p-6">
        <h1 className="text-xl font-bold">Mes cours</h1>
        <p className="mt-2 text-sm text-slate-500">Liste des cours inscrits et ressources.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {matieres.length > 0 ? (
            matieres.map((m: string) => (
              <div key={m} className="p-4 bg-gray-50 rounded-lg border">
                <h3 className="font-semibold">{m}</h3>
                <p className="text-sm text-gray-500">Ressources et informations du cours.</p>
              </div>
            ))
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg">Aucun cours inscrit.</div>
          )}
        </div>
      </div>
    </main>
  );
}
