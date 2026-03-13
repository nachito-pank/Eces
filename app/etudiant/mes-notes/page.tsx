import adminsData from '@/data/admins.json';

export default function MesNotesPage() {
  const etudiant = (adminsData as any).etudiants?.[0] || { notes: [] };
  const notes = etudiant.notes || [];

  return (
    <main className="w-full p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h1 className="text-xl font-bold">Mes notes</h1>
        <p className="mt-2 text-sm text-slate-500">Consultez vos notes par matière et session.</p>

        <div className="mt-6 grid grid-cols-1 gap-4">
          {notes.length > 0 ? (
            notes.map((n: any, idx: number) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg border">
                <h3 className="font-semibold">{n.matiere}</h3>
                <div className="text-sm text-gray-600">Devoir: {n.noteDevoir ?? '-'} — Session: {n.noteSession ?? '-'}</div>
              </div>
            ))
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg">Aucune note disponible.</div>
          )}
        </div>
      </div>
    </main>
  );
}
