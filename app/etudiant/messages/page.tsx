import adminsData from '@/data/admins.json';

export default function MessagesPage() {
  const etudiant = (adminsData as any).etudiants?.[0] || { messages: [] };
  const messages = etudiant.messages || [];

  return (
    <main className="w-full p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h1 className="text-xl font-bold">Messages</h1>
        <p className="mt-2 text-sm text-slate-500">Vos conversations et annonces.</p>

        <div className="mt-6">
          {messages.length > 0 ? (
            <ul className="space-y-3">
              {messages.map((m: any) => (
                <li key={m.id} className="p-3 rounded-lg bg-gray-100">
                  <p className="font-semibold">{m.titre || m.sujet || 'Message'}</p>
                  <p className="text-sm text-gray-600">{m.contenu || m.texte}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg">Aucun message récent.</div>
          )}
        </div>
      </div>
    </main>
  );
}
