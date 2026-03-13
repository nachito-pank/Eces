import adminsData from '@/data/admins.json';
import { CircleUser } from 'lucide-react';

export default function ProfilPage() {
	const etudiant = (adminsData as any).etudiants?.[0] || {};

	return (
		<main className="w-full p-6">
			<div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl md:text-3xl font-bold text-gray-900">Profil</h1>
					<div className="flex items-center gap-3">
						<button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Modifier</button>
					</div>
				</div>

				<div className="mt-6">
					<div className="p-6 rounded-2xl bg-white shadow flex gap-6 items-center">
						<CircleUser size={70} fill="gray" />
						<div>
							<h2 className="text-lg font-semibold">{etudiant.prenom} {etudiant.nom}</h2>
							<p className="text-sm text-gray-600">{etudiant.email}</p>
							<p className="text-sm text-gray-600">{etudiant.filiere} — {etudiant.niveau}</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
