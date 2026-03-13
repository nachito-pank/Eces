import adminsData from '@/data/admins.json';

const EdtPage = () => {
  const etudiant = (adminsData as any).etudiants?.[0] || {};
  const edtCours = (adminsData as any).emploiDuTemps?.[0] || {}
  const edtSessions = etudiant.emploiDuTempsSessions || [];

  return (
    <main className="w-full p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Emploi du temps</h1>
              <div className="flex items-center gap-3">
                <input type="date" className="px-3 py-2 rounded-lg bg-white/90 text-sm" />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Aujourd&apos;hui</button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <article className="p-4 rounded-2xl bg-white shadow">
                <h3 className="font-semibold">Semaine en cours</h3>
                <div className="mt-3 space-y-3 text-sm text-gray-700">
                  {edtCours.length > 0 ? (
                    edtCours.map((c: any) => (
                      <div key={c.id} className="p-3 rounded-lg bg-gray-100">
                        <span className="font-medium">{c.cours.jour}</span> — {c.heureDebut}–{c.heureFin} • {c.matiere} • Salle {c.salle}{c.enseignant ? ` • ${c.enseignant}` : ''}
                      </div>
                    ))
                  ) : (
                    <div className="p-3 rounded-lg bg-gray-100">Aucun cours planifié.</div>
                  )}
                </div>
              </article>

              <article className="p-4 rounded-2xl bg-white shadow">
                <h3 className="font-semibold">Prochaines sessions</h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {edtSessions.length > 0 ? (
                    edtSessions.map((s: any) => (
                      <li key={s.id} className="p-3 rounded-lg bg-gray-100">{s.date} — {s.matiere} — {s.salle}{s.site ? ` • ${s.site}` : ''}</li>
                    ))
                  ) : (
                    <li className="p-3 rounded-lg bg-gray-100">Aucune session prévue.</li>
                  )}
                </ul>
              </article>
            </div>

            <section className="mt-4 p-4 rounded-2xl bg-white shadow">
              <h3 className="font-semibold">Détails</h3>
              <p className="mt-2 text-sm text-gray-600">Sélectionnez un créneau pour voir les informations détaillées (enseignant, salle, ressources).</p>
            </section>
          </div>
        </div>

        <aside className="p-4 rounded-2xl bg-white shadow h-full">
          <h4 className="font-semibold">Légende & Actions</h4>
          <div className="mt-3 space-y-3 text-sm text-gray-700">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-blue-500"/> Cours</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-green-400"/> Session</div>
            <button className="mt-4 w-full px-3 py-2 bg-green-600 text-white rounded-lg shadow">Exporter (PDF)</button>
            <button className="mt-2 w-full px-3 py-2 bg-gray-200 text-gray-800 rounded-lg">Imprimer</button>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default EdtPage;