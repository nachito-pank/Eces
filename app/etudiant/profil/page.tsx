import Navbar from "@/components/etudiant/Navbar";
import Sidebar from "@/components/etudiant/Sidebar";
import etudiantData from "../../../data/etudiant.json";
import { CircleUser } from "lucide-react";

export default function ProfilPage() {
	const data = etudiantData as any;
	const profil = data.profil || {};

	return (
		<>
			<Sidebar />
			<Navbar />
			<div className="place-items-center dark:text-black bg-[rgb(232,232,232)] dark:bg-gray-900 overflow-scroll overflow-x-hidden fixed right-0 bottom-0 h-[89%] w-[75%]">
				<div className="p-8 h-full w-full flex flex-col gap-6">
					<div className="flex items-center justify-between">
						<h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Profil</h1>
						<div className="flex items-center gap-3">
							<button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Modifier</button>
						</div>
					</div>

					<div className="flex-1 overflow-auto">
						<div className="p-6 rounded-2xl bg-white shadow flex gap-6 items-center">
							<CircleUser size={70} fill="gray"/>
							<div>
								<h2 className="text-lg font-semibold">{profil.prenom} {profil.nom}</h2>
								<p className="text-sm text-gray-600">{profil.email}</p>
								<p className="text-sm text-gray-600">{profil.filiere} — {profil.niveau}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
