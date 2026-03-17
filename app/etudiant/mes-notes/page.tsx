/* eslint-disable @typescript-eslint/no-explicit-any */
import adminsData from '@/data/admins.json';

type NoteRow = {
  id: number;
  matiere: string;
  devoir: number;
  session: number;
  coefficient: number;
};

export default function StudentNotesPage() {
  const etudiant = (adminsData as any).etudiants?.[1] || { notes: [] };
  const rawNotes = etudiant.notes || [];

  const notes: NoteRow[] = (rawNotes as any[]).map((n: any, idx: number) => ({
    id: idx,
    matiere: String(n.matiere ?? ''),
    devoir: Number(n.noteDevoir ?? n.devoir ?? 0),
    session: Number(n.noteSession ?? n.session ?? 0),
    coefficient: Number(n.coefficient ?? 1),
  }));

  const calculerMoyenne = (devoir: number, session: number) => {
    return ((devoir + session) / 2).toFixed(2);
  };

  return (
    <main className="w-full p-6 dark:text-gray-900">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl w-full text-center max-sm:text-xl md:text-3xl font-bold text-gray-900">Notes & Moyennes</h1>
        </div>

        <div className="mt-6 overflow-auto">
          <div className="p-4 rounded-2xl bg-white shadow">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-center">
                  <th className="p-2">Matière</th>
                  <th className="p-2">Devoir</th>
                  <th className="p-2">Session</th>
                  <th className="p-2">Moyenne</th>
                  <th className="p-2">Coef</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note: NoteRow) => (
                  <tr key={note.id} className="border-t text-center">
                    <td className="p-2">{note.matiere}</td>
                    <td className="p-2">{note.devoir}</td>
                    <td className="p-2">{note.session}</td>
                    <td className="p-2">{calculerMoyenne(note.devoir, note.session)}</td>
                    <td className="p-2">{note.coefficient ?? 1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}