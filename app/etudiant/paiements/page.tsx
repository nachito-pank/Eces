import adminsData from '@/data/admins.json';

export default function PaiementsPage() {
  const etudiant = (adminsData as any).etudiants?.[0] || { paiements: [] };
  const paiements = etudiant.paiements || [];

  return (
    <main className="w-full p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Paiements</h1>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">Nouveau paiement</button>
          </div>
        </div>

        <div className="mt-6">
          <div className="p-4 rounded-2xl bg-white shadow">
            <ul className="space-y-3">
              {paiements.length > 0 ? (
                paiements.map((p: any) => (
                  <li key={p.id} className="p-3 rounded-lg bg-gray-100 grid grid-cols-1">
                    <p className="font-semibold">{p.description}</p>
                    <div className="text-sm text-gray-600 mt-1">{p.date} — {p.statut} {p.mode ? `— ${p.mode}` : ''}</div>
                    <div className="text-sm font-medium mt-2">Montant: {p.montant.toLocaleString()}</div>
                  </li>
                ))
              ) : (
                <li className="p-3 rounded-lg bg-gray-100">Aucun paiement.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
