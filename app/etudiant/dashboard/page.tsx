import StatCard from '@/components/dashboard/StatCard';
import NotificationsList from '@/components/dashboard/NotificationsList';

export default function EtudiantDashboardPage() {
  return (
    <main className="w-full p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-xl font-bold text-slate-900">Tableau de bord</h2>
            <p className="mt-2 text-sm text-slate-500">Vue d'ensemble des cours, devoirs et notifications.</p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard title="Devoirs cette semaine" value={3} hint="3 à rendre" />
            <StatCard title="Moyenne générale" value="14.2" hint="Dernière mise à jour" />
          </div>

          <div className="mt-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-medium">Prochains cours</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>Algèbre linéaire — Lundi 9:00</li>
                <li>Programmation — Mardi 11:00</li>
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