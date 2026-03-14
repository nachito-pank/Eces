/* eslint-disable @typescript-eslint/no-explicit-any */
import adminsData from '@/data/admins.json';
const EdtPage = () => {
  const data = (adminsData as any).emploiDuTemps || {};
  console.log(data)

  return (
    <main className="w-full p-6">
      <div className="">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Emploi du temps</h1>
              <div className="flex items-center gap-3">
                <input type="date" className="px-3 py-2 rounded-lg bg-white/90 text-sm" />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Aujourd&apos;hui</button>
              </div>
            </div>

            <div className="mt-6 gap-4">
              <article className="p-4 rounded-2xl bg-white shadow">
                <h3 className="font-semibold">Semaine en cours</h3>
                <div className="mt-3 space-y-3 text-sm text-gray-700">
                  {data.length > 0 ? (
                    data.map((d: any) => (
                      <div key={d.id} className="p-3 rounded-lg bg-gray-100">
                        <span>{d.filiere} - {d.niveau} / {d.code}</span>
                            {d.cours.map((c:any) => (
                              <div key={d.id}>
                                <span>{c.jour}-{c.heureDebut}:{c.heureFin}-{c.matiere}-{c.salle}-{c.professeur}</span>
                              </div>
                            ))}
                      </div>
                    ))
                  ) : (
                    <div className="p-3 rounded-lg bg-gray-100">Aucun cours planifié.</div>
                  )}
                </div>
              </article>
            </div>

            <section className="mt-4 p-4 rounded-2xl bg-white shadow">
              <h3 className="font-semibold">Détails</h3>
              <p className="mt-2 text-sm text-gray-600">Sélectionnez un créneau pour voir les informations détaillées (enseignant, salle, ressources).</p>
            </section>
          </div>
        </div>

        
      </div>
    </main>
  );
}

export default EdtPage;