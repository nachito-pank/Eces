import adminsData from '@/data/admins.json';

export default function EmploiTempsPage() {
  const etudiant = (adminsData as any).etudiants?.[0] || {};
  const edtCours = etudiant.emploiDuTempsCours || [];

  return (
    <main className="w-full p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h1 className="text-xl font-bold">Emploi du temps</h1>
        <p className="mt-2 text-sm text-slate-500">Votre planning hebdomadaire.</p>

        <div className="mt-6">
          {edtCours.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {edtCours.map((c: any) => (
                <div key={c.id} className="p-3 rounded-lg bg-gray-50 border">
                  <div className="font-medium">{c.jour} — {c.heureDebut}–{c.heureFin}</div>
                  <div className="text-sm text-gray-600">{c.matiere} • Salle {c.salle}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg">Aucun planning disponible.</div>
          )}
        </div>
      </div>
    </main>
  );
}
