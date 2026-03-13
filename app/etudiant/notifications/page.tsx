import etudiantData from "../../../data/etudiant.json";
import { Notification } from "@/types/etudiant";

export default function NotificationsPage() {
  const data = etudiantData as { notifications?: Notification[] };
  const notifications: Notification[] = data.notifications || [];

  return (
    <>
      <div className="place-items-center dark:text-black bg-[rgb(232,232,232)] dark:bg-gray-900 overflow-scroll overflow-x-hidden fixed right-0 bottom-0 h-[89%] w-[75%]">
        <div className="p-8 h-full w-full flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Marquer tout lu</button>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="p-4 rounded-2xl bg-white shadow">
              <ul className="space-y-3">
                {notifications.map((n) => (
                  <li key={n.id} className="p-3 rounded-lg bg-gray-100">
                    <p className="font-semibold">{n.message}</p>
                    <p className="text-xs text-gray-500">{n.date}</p>
                  </li>
                ))}
                {notifications.length === 0 && <li className="p-3 rounded-lg bg-gray-100">Aucune notification.</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
