import StatCard from '@/components/dashboard/StatCard';
import NotificationsList from '@/components/dashboard/NotificationsList';
import adminsData from '@/data/admins.json';

export default function EtudiantDashboardPage() {
  const etudiant = (adminsData as any).etudiants?.[0] || null;

  const devoirsCount = etudiant?.notes ? etudiant.notes.length : 0;
  const moyenne = etudiant?.moyenne ?? '-';
  const prochainsCours = etudiant?.notes?.slice(0, 3).map((n: any) => n.matiere) || [];

  return (
    <main className="w-full p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-xl font-bold text-slate-900">Tableau de bord</h2>
            <p className="mt-2 text-sm text-slate-500">Vue d'ensemble des cours, devoirs et notifications.</p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard title="Devoirs cette semaine" value={devoirsCount} hint={`${devoirsCount} à rendre`} />
            <StatCard title="Moyenne générale" value={moyenne} hint="Dernière mise à jour" />
          </div>

          <div className="mt-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-medium">Prochains cours</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {prochainsCours.length > 0 ? (
                  prochainsCours.map((c: string) => <li key={c}>{c}</li>)
                ) : (
                  <li>Aucun cours planifié.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-medium">Notifications</h3>
            <div className="mt-4">
              <NotificationsList />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}