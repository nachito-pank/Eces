/* eslint-disable @typescript-eslint/no-explicit-any */
import adminsData from '@/data/admins.json';
const EdtPage = () => {
  const data = (adminsData as any).emploiDuTemps || {};

  return (
    <main className="w-full p-6">
      <div className="">
        <div className="lg:col-span-2">
          <div className="bg-gray-100 rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Emploi du temps</h1>
              <div className="flex items-center max-sm:hidden gap-3">
                <input type="date" className="px-3 py-2 rounded-lg bg-white/90 text-sm" />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Aujourd&apos;hui</button>
              </div>
            </div>

            <div className="mt-6 gap-4">
              <article className="p-4 rounded-2xl bg-white shadow">
                <h3 className="font-semibold dark:text-gray-900">Semaine en cours</h3>
                <div className="mt-3 space-y-3 text-sm max-sm:text-[10px] text-gray-700">
                  {data.length > 0 ? (
                    data.map((d: any) => (
                      <div key={d.id} className="p-4 max-sm:mt-5 rounded-xl bg-blue-100">
  <span className="font-semibold block mb-4">
    {d.filiere} - {d.niveau} / {d.code}
  </span>

  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-linear-to-br from-blue-400 to-blue-300">
        <th className="border p-2">Jour</th>
        <th className="border p-2 max-sm:p-0">08:00-10:00</th>
        <th className="border p-2 max-sm:p-0">10:00-12:00</th>
      </tr>
    </thead>

    <tbody>
      {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"].map((jour) => (
        <tr key={jour}>
          <td className="border max-sm:p-0 p-2 font-medium">{jour}</td>

          {["08:00", "10:00"].map((heure) => {
            const cours = d.cours.find(
              (c: any) => c.jour === jour && c.heureDebut === heure
            );

            return (
              <td key={heure} className="border p-2  max-sm:p-1">
                {cours ? (
                  <div className="text-sm max-sm:text-[8px] bg-gray-300">
                    <div className="font-semibold">{cours.matiere}</div>
                    <div>{cours.salle}</div>
                    <div className="text-gray-500">{cours.professeur}</div>
                  </div>
                ) : (
                  "-"
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
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