import adminsData from '@/data/admins.json';

type Devoir = {
  id: number;
  matiere: string;
  note: number | null;
};

export default function DevoirsPage() {
  const etudiant = (adminsData as any).etudiants?.[0] || { notes: [] };
  const devoirs: Devoir[] = (etudiant.notes || []).map((n: any, idx: number) => ({
    id: idx,
    matiere: String(n.matiere ?? ''),
    note: typeof n.noteDevoir === 'number' ? n.noteDevoir : null,
  }));

  return (
    <main className="w-full p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h1 className="text-xl font-bold">Devoirs</h1>
        <p className="mt-2 text-sm text-slate-500">Vos devoirs en attente et leurs échéances.</p>

        <div className="mt-6 grid grid-cols-1 gap-4">
          {devoirs.length > 0 ? (
            devoirs.map((d: Devoir) => (
              <div key={d.id} className="p-4 bg-gray-50 rounded-lg border">
                <h3 className="font-semibold">{d.matiere}</h3>
                <p className="text-sm text-gray-600">Note devoir: {d.note ?? 'Non rendu'}</p>
              </div>
            ))
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg">Aucun devoir listé.</div>
          )}
        </div>
      </div>
    </main>
  );
}
