import etudiantData from "../../../data/etudiant.json";
import { Paiement } from "@/types/etudiant";

export default function PaiementsPage() {
  const data = etudiantData as { paiements?: Paiement[] };
  const paiements: Paiement[] = data.paiements || [];

  return (
    <>
      <div className="place-items-center dark:text-black bg-[rgb(232,232,232)] dark:bg-gray-900 overflow-scroll overflow-x-hidden fixed right-0 bottom-0 h-[89%] w-[75%]">
        <div className="p-8 h-full w-full flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Paiements</h1>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">Nouveau paiement</button>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="p-4 rounded-2xl bg-white shadow">
              <ul className="space-y-3">
                {paiements.map((p) => (
                  <li key={p.id} className="p-3 rounded-lg bg-gray-100 grid grid-cols-1">
                    <p className="font-semibold">{p.description}</p>
                    <div className="text-sm text-gray-600 mt-1">{p.date} — {p.statut} {p.mode ? `— ${p.mode}` : ""}</div>
                    <div className="text-sm font-medium mt-2">Montant: {p.montant.toLocaleString()}</div>
                  </li>
                ))}
                {paiements.length === 0 && <li className="p-3 rounded-lg bg-gray-100">Aucun paiement.</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
