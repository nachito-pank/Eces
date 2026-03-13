"use client";

import { AnimatedTabsImpl as Tabs } from "@/components/ui/tabs";
import Image from "next/image";

import React from "react";
import type { Cours, Notification, Paiement, Note } from "@/types/etudiant";
import adminsData from "../data/admins.json";

type RawCourse = {
  id: number;
  jour: string;
  heureDebut: string;
  heureFin: string;
  matiere: string;
  enseignant?: string;
  salle: string;
};

type RawSession = {
  id: number;
  matiere: string;
  date: string;
  heure: string;
  salle: string;
  site?: string;
};

export default function TabsDemo() {
  const data = (adminsData as any)?.espaceEtudiantDemo as {
    emploiDuTempsCours?: RawCourse[];
    emploiDuTempsSessions?: RawSession[];
  };

  const rawCourses: RawCourse[] = data.emploiDuTempsCours || [];
  const rawSessions: RawSession[] = data.emploiDuTempsSessions || [];

  const emploiDuTempsCours: Cours[] = rawCourses.map((c: RawCourse) => ({
    id: c.id,
    jour: c.jour,
    heureDebut: c.heureDebut,
    heureFin: c.heureFin,
    matiere: c.matiere,
    salle: c.salle,
  }));

  const emploiDuTempsSessions: Cours[] = rawSessions.map((s: RawSession) => ({
    id: s.id,
    jour: s.date,
    heureDebut: s.heure,
    heureFin: s.heure,
    matiere: s.matiere,
    salle: s.salle,
  }));

  const tabs = [
    {
      title: "Cours",
      value: "Cours",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-linear-to-br from-[rgb(30,39,142)] to-[rgb(67,80,219)]">
          <span className="flex gap-5 items-center">
              <Image 
                        src="/images/book_8092583.png"
                        alt="cours Logo"
                        width={70}
                        height={70}
                      />
              <p className="text-[16px]">Consultation des matières, enseignants et contenus pédagogiques associés</p>
            </span>
          <DashboardCoursContent />
        </div>
      ),
    },
    {
      title: "Calendrier",
      value: "calendrier",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-linear-to-br from-[rgb(30,39,142)] to-[rgb(67,80,219)]">
            <span className="flex gap-5 items-center">
              <Image 
                        src="/images/calendar_673045.png"
                        alt="calendrier Logo"
                        width={70}
                        height={70}
                      />
              <p className="text-[16px]">planification et suivi des emplois du temps et événements</p>
            </span>
          <DashboardEdtContent emploiDuTempsCours={emploiDuTempsCours} emploiDuTempsSessions={emploiDuTempsSessions} />
        </div>
      ),
    },
    {
      title: "Moyenne",
      value: "moyenne",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-linear-to-br from-[rgb(30,39,142)] to-[rgb(67,80,219)]">
          <span className="flex gap-5 items-center">
              <Image 
                        src="/images/clipboard_1070559.png"
                        alt="moyenne Logo"
                        width={70}
                        height={70}
                      />
              <p className="text-[16px]">Visualisation rapide de la moyenne générale et de l’évolution des résultats</p>
            </span>
          <DashboardMoyenneContent />
        </div>
      ),
    },
    {
      title: "Messages",
      value: "messages",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-linear-to-br from-[rgb(30,39,142)] to-[rgb(67,80,219)]">
          <span className="flex gap-5 items-center">
              <Image 
                        src="/images/email_16604698.png"
                        alt="moyenne Logo"
                        width={70}
                        height={70}
                      />
              <p className="text-[16px]">Consultation des annonces importantes et des informations administratives</p>
            </span>
          <DashboardMessagetContent />
        </div>
      ),
    },
    {
      title: "Statut paiement",
      value: "Statut paiement",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-linear-to-br from-[rgb(30,39,142)] to-[rgb(67,80,219)]">
          <span className="flex gap-5 items-center">
              <Image 
                        src="/images/wallet_3258446.png"
                        alt="moyenne Logo"
                        width={70}
                        height={70}
                      />
              <p className="text-[16px]">Gestion et suivi des paiements liés à la scolarité et aux frais académiques</p>
            </span>
          <DashboardPaiementContent />
        </div>
      ),
    },
  ];

  return (
    <div className="h-80 md:h-110 perspective-[1000px] relative flex flex-col max-w-5xl mx-auto w-full  items-start justify-start font-mono font-semibold">
      <Tabs tabs={tabs} />
    </div>
  );
}

// const DummyContent = () => {
//   return (
//           <div>
//             Contenu
//           </div>
//     <img
//       src="/linear.webp"
//       alt="dummy image"
//       width="1000"
//       height="1000"
//       className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
//     />
    
//   );
// };
export const DashboardEdtContent = ({
  emploiDuTempsCours,
  emploiDuTempsSessions,
}: {
  emploiDuTempsCours: Cours[];
  emploiDuTempsSessions: Cours[];
}) => {
  return (
          <div className="mt-6 text-xs bg-[rgb(44,55,172)] text-gray-900 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[rgb(232,232,232)] dark:bg-gray-900 p-6 rounded-xl shadow">
          <h3 className=" font-semibold text-gray-900 dark:text-white mb-4">Cours</h3>
          <ul className="space-y-2">
            {emploiDuTempsCours.slice(0, 2).map((c: Cours) => (
              <li key={c.id} className="p-3 rounded-lg shadow-sm bg-gray-50">
                <p className="font-semibold">{c.matiere}</p>
                <p>{c.jour} {c.heureDebut} - {c.heureFin}</p>
                <p>Salle {c.salle}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[rgb(232,232,232)] dark:bg-gray-900 p-6 rounded-xl shadow">
          <h3 className="text-xs text-gray-900 dark:text-white font-semibold mb-4">Sessions</h3>
          <ul className="space-y-2">
            {emploiDuTempsSessions.slice(0, 2).map((s: Cours) => (
              <li key={s.id} className="p-3 rounded-lg shadow-sm bg-gray-50">
                <p className="font-semibold">{s.matiere}</p>
                <p>{s.jour} {s.heureDebut} - {s.heureFin}</p>
                <p>Salle {s.salle}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    
  );
};

export const DashboardMessagetContent = () => {
  const data = (adminsData as any)?.espaceEtudiantDemo as { notifications?: Notification[] };
  const notifications: Notification[] = data.notifications || [];

  return (
    <div className="mt-6 text-xs bg-[rgb(232,232,232)] dark:bg-gray-900 text-gray-900 p-4 rounded-xl">
      <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Annonces</h3>
      <ul className="space-y-2">
        {notifications.slice(0, 2).map((n: Notification) => (
          <li key={n.id} className="p-3 rounded-lg shadow-sm bg-gray-50">
            <p className="font-semibold">{n.message}</p>
            <p className="text-xs text-gray-500">{n.date}</p>
          </li>
        ))}
        {notifications.length === 0 && (
          <li className="p-3 rounded-lg bg-gray-50">Aucune annonce.</li>
        )}
      </ul>
    </div>
  );
};

export const DashboardCoursContent = ()=> {
  const data = (adminsData as any)?.espaceEtudiantDemo as { emploiDuTempsCours?: RawCourse[] };
  const rawCourses: RawCourse[] = data.emploiDuTempsCours || [];

  const cours: Cours[] = rawCourses.map((c: RawCourse) => ({
    id: c.id,
    jour: c.jour,
    heureDebut: c.heureDebut,
    heureFin: c.heureFin,
    matiere: c.matiere,
    salle: c.salle,
  }));

  return (
    <div className="mt-6 text-xs bg-[rgb(232,232,232)] dark:bg-gray-900 text-gray-900 p-4 rounded-xl">
      <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Matières</h3>
      <ul className="space-y-2">
        {cours.slice(0, 2).map((c: Cours) => (
          <li key={c.id} className="p-3 rounded-lg shadow-sm bg-gray-50">
            <p className="font-semibold">{c.matiere}</p>
            <p className="text-sm">{c.jour} {c.heureDebut} - {c.heureFin}</p>
            <p className="text-sm">Salle {c.salle}</p>
          </li>
        ))}
        {cours.length === 0 && (
          <li className="p-3 rounded-lg bg-gray-50">Aucun cours disponible.</li>
        )}
      </ul>
    </div>
  )
}

export const DashboardPaiementContent = ()=> {
  const data = (adminsData as any)?.espaceEtudiantDemo as { paiements?: Paiement[] };
  const paiements: Paiement[] = data.paiements || [];

  return (
    <div className="mt-6 text-xs bg-[rgb(232,232,232)] dark:bg-gray-900 text-gray-900 p-4 rounded-xl">
      <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Paiements</h3>
      <ul className="space-y-2">
        {paiements.slice(0, 2).map((p: Paiement) => (
          <li key={p.id} className="p-3 grid grid-cols-2 rounded-lg shadow-sm bg-gray-50">
            <p className="font-semibold">{p.description}</p>
            <p className="text-sm">{p.date} — {p.statut}</p>
            {p.mode && <p className="text-sm">Mode: {p.mode}</p>}
            <p className="text-sm">Montant: {p.montant.toLocaleString()}</p>
          </li>
        ))}
        {paiements.length === 0 && (
          <li className="p-3 rounded-lg bg-gray-50">Aucun paiement enregistré.</li>
        )}
      </ul>
    </div>
  )
}

export const DashboardMoyenneContent = ()=> {
  const data = (adminsData as any)?.espaceEtudiantDemo as { notes?: Note[] };
  const notes: Note[] = data.notes || [];

  const subjectsWithAvg = notes.map((n: Note) => ({
    ...n,
    avg: (n.devoir + n.session) / 2,
    coefficient: n.coefficient ?? 1,
  }));

  const totalWeight = subjectsWithAvg.reduce((s, n) => s + (n.coefficient || 1), 0);
  const overallAverage = notes.length
    ? Math.round((subjectsWithAvg.reduce((s, n) => s + n.avg * (n.coefficient || 1), 0) / (totalWeight || 1)) * 10) / 10
    : 0;

  const topSubjects = subjectsWithAvg.sort((a, b) => b.avg - a.avg).slice(0, 2);

  return (
    <div className="mt-6 text-xs bg-[rgb(232,232,232)] dark:bg-gray-900 text-gray-900 p-4 rounded-xl">
      <span className="flex items-center gap-5">
        <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">Moyenne générale :</h3>
        <p className="text-lg font-bold mb-1">{overallAverage}</p>
      </span>

      <h4 className="font-semibold mb-1">Notes & Moyenne</h4>
      <ul className="space-y-2">
        {topSubjects.map((s) => (
          <li key={s.id} className="p-3 grid grid-cols-2 rounded-lg shadow-sm bg-gray-50">
            <p className="font-semibold">{s.matiere}</p>
            <p className="text-sm">Coef: {s.coefficient}</p>
            <p className="text-sm">Devoir: {s.devoir} — Session: {s.session}</p>
            <p className="text-sm">Moyenne: {Math.round(s.avg * 10) / 10}</p>
          </li>
        ))}
        {notes.length === 0 && (
          <li className="p-3 rounded-lg bg-gray-50">Aucune note disponible.</li>
        )}
      </ul>
    </div>
  )
}