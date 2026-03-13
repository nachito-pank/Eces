import React from 'react';

interface Notification {
  id: number;
  title: string;
  time?: string;
}

const sample: Notification[] = [
  { id: 1, title: 'Nouveau devoir: Mathématiques', time: 'Il y a 2h' },
  { id: 2, title: 'Annonce: Cours annulé', time: 'Hier' },
];

export default function NotificationsList({ items = sample }: { items?: Notification[] }) {
  return (
    <div>
      <ul className="space-y-3">
        {items.map((n) => (
          <li key={n.id} className="p-3 rounded-lg bg-white border border-slate-100 shadow-sm">
            <div className="text-sm font-medium text-slate-900">{n.title}</div>
            {n.time && <div className="text-xs text-slate-500 mt-1">{n.time}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
