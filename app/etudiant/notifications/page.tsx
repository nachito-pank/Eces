import adminsData from '@/data/admins.json';

export default function NotificationsPage() {
  const etudiant = (adminsData as any).etudiants?.[0] || { notifications: [] };
  const notifications = etudiant.notifications || [];

  return (
    <main className="w-full p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Notifications</h1>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Marquer tout lu</button>
          </div>
        </div>

        <div className="mt-6">
          <div className="p-4 rounded-2xl bg-white shadow">
            <ul className="space-y-3">
              {notifications.length > 0 ? (
                notifications.map((n: any) => (
                  <li key={n.id} className="p-3 rounded-lg bg-gray-100">
                    <p className="font-semibold">{n.message}</p>
                    <p className="text-xs text-gray-500">{n.date}</p>
                  </li>
                ))
              ) : (
                <li className="p-3 rounded-lg bg-gray-100">Aucune notification.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
