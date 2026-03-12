// import Navbar from "@/components/etudiant/Navbar";
// import Sidebar from "@/components/etudiant/Sidebar";
import etudiantData from "../../../data/etudiant.json";
// import { Cours } from "@/types/etudiant";

const EdtPage = () => {
  return (<>
      {/* <Sidebar/>
      <Navbar/> */}
      <div className="place-items-center bg-[rgb(232,232,232)] dark:bg-gray-900 overflow-scroll overflow-x-hidden fixed right-0 bottom-0 h-[89%] w-[75%]">
        <div className="p-8 h-full w-full flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Emploi du temps</h1>
            <div className="flex items-center gap-3">
              <input type="date" className="px-3 py-2 rounded-lg bg-white/90 text-sm" />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Aujourd&apos;hui</button>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            <div className="lg:col-span-2 flex flex-col gap-4 overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <article className="p-4 rounded-2xl bg-white shadow">
                  <h3 className="font-semibold dark:text-black">Semaine en cours</h3>
                  <div className="mt-3 space-y-3 text-sm text-gray-700">
                    {(etudiantData.emploiDuTempsCours || []).map((c: any) => (
                      <div key={c.id} className="p-3 rounded-lg bg-gray-100">
                        <span className="font-medium">{c.jour}</span> — {c.heureDebut}–{c.heureFin} • {c.matiere} • Salle {c.salle}{c.enseignant ? ` • ${c.enseignant}` : ''}
                      </div>
                    ))}
                  </div>
                </article>

                <article className="p-4 rounded-2xl bg-white shadow">
                  <h3 className="font-semibold dark:text-black">Prochaines sessions</h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    {(etudiantData.emploiDuTempsSessions || []).map((s: any) => (
                      <li key={s.id} className="p-3 rounded-lg bg-gray-100">{s.date} — {s.matiere} — {s.salle}{s.site ? ` • ${s.site}` : ''}</li>
                    ))}
                  </ul>
                </article>
              </div>

              <section className="mt-2 p-4 rounded-2xl bg-white shadow">
                <h3 className="font-semibold dark:text-black">Détails</h3>
                <p className="mt-2 text-sm text-gray-600">Sélectionnez un créneau pour voir les informations détaillées (enseignant, salle, ressources).</p>
              </section>
            </div>

            <aside className="p-4 rounded-2xl bg-white shadow h-full">
              <h4 className="font-semibold dark:text-black">Légende & Actions</h4>
              <div className="mt-3 space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-blue-500"/> Cours</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-green-400"/> Session</div>
                <button className="mt-4 w-full px-3 py-2 bg-green-600 text-white rounded-lg shadow">Exporter (PDF)</button>
                <button className="mt-2 w-full px-3 py-2 bg-gray-200 text-gray-800 rounded-lg">Imprimer</button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export default EdtPage;