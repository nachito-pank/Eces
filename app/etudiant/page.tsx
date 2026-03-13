export default function EtudiantPage() {
  return (
    <main className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-xl font-bold text-slate-900">Mes cours</h2>
            <p className="mt-2 text-sm text-slate-500">Liste des cours et prochaines échéances.</p>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-medium">Profil</h3>
            <p className="mt-2 text-sm text-slate-500">Informations rapides sur l&apos;étudiant.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
