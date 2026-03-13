import etudiantData from "../../../data/etudiant.json";
import { Note } from "@/types/etudiant";

export default function StudentNotesPage() {
  const data = etudiantData as { notes?: Note[] };
  const notes: Note[] = data.notes || [];

  const calculerMoyenne = (devoir: number, session: number) => {
    return ((devoir + session) / 2).toFixed(2);
  };

  return (
    <>
      <div className="place-items-center bg-[rgb(232,232,232)] dark:bg-gray-900 overflow-scroll overflow-x-hidden fixed right-0 bottom-0 h-[89%] w-[75%]">
        <div className="p-8 h-full w-full flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Notes & Moyennes</h1>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Exporter</button>
            </div>
          </div>

          <div className="flex-1 overflow-auto dark:text-black">
            <div className="p-4 rounded-2xl bg-white shadow">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="pb-2">Matière</th>
                    <th className="pb-2">Devoir</th>
                    <th className="pb-2">Session</th>
                    <th className="pb-2">Moyenne</th>
                    <th className="pb-2">Coef</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.map((note) => (
                    <tr key={note.id} className="border-t">
                      <td className="py-2">{note.matiere}</td>
                      <td className="py-2">{note.devoir}</td>
                      <td className="py-2">{note.session}</td>
                      <td className="py-2">{calculerMoyenne(note.devoir, note.session)}</td>
                      <td className="py-2">{note.coefficient ?? 1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}