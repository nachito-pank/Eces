"use client";

import { AnimatedTabsImpl as Tabs } from "@/components/ui/tabs";
import React from "react";
import { Award, BookOpen, Calendar, CreditCard, MessageSquare, Download, Presentation, Filter, Activity, BarChart3, TrendingUp, History, ShieldCheck, PieChart, Users, BellRing, Bell } from "lucide-react";

// Sous-composant pour afficher les puces textuelles avec icône
const FeaturePoint = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="flex items-center gap-3 p-4 bg-white/10 dark:bg-slate-900/40 rounded-xl backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors">
    <div className="p-2 bg-white/10 rounded-lg text-white">
      {icon}
    </div>
    <span className="text-sm font-semibold text-blue-50 leading-snug">{text}</span>
  </div>
);

export default function TabsDemo() {
  const tabs = [
    {
      title: "Mes Cours",
      value: "cours",
      content: (
        <div className="w-full relative h-[90%] rounded-[2rem] p-8 md:p-12 text-white bg-gradient-to-br from-[#033481] to-blue-700 shadow-xl overflow-hidden flex flex-col justify-center border border-blue-400/20">
          <BookOpen className="w-64 h-64 absolute -bottom-10 -right-10 text-white opacity-[0.03] pointer-events-none transform -rotate-12" />
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-300" />
              Module d'Apprentissage
            </h2>
            <p className="text-blue-100 font-medium mb-8 text-sm md:text-base leading-relaxed">
              Consultez vos matières, retrouvez vos enseignants et parcourez tous les supports pédagogiques associés (PDF, TP, Td).
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <FeaturePoint icon={<Download className="w-5 h-5"/>} text="Téléchargement des PDF sécurisés" />
               <FeaturePoint icon={<Filter className="w-5 h-5"/>} text="Filtres par matière et enseignant" />
               <FeaturePoint icon={<Presentation className="w-5 h-5"/>} text="Aperçu rapide document A4" />
               <FeaturePoint icon={<Activity className="w-5 h-5"/>} text="Tri automatisé et intelligent" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Calendrier",
      value: "calendrier",
      content: (
        <div className="w-full relative h-[90%] rounded-[2rem] p-8 md:p-12 text-white bg-gradient-to-br from-indigo-700 to-[#0A2540] shadow-xl overflow-hidden flex flex-col justify-center border border-indigo-500/20">
          <Calendar className="w-64 h-64 absolute -bottom-10 -right-10 text-white opacity-[0.03] pointer-events-none transform -rotate-12" />
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-indigo-300" />
              Emplois du Temps
            </h2>
            <p className="text-indigo-100 font-medium mb-8 text-sm md:text-base leading-relaxed">
              Une planification simplifiée. Récupérez les plannings PDF de chaque semaine pour votre filière et votre niveau en un simple clic.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <FeaturePoint icon={<History className="w-5 h-5"/>} text="Historique des semaines passées" />
               <FeaturePoint icon={<BarChart3 className="w-5 h-5"/>} text="Indicateur d'heures dynamiques" />
               <FeaturePoint icon={<Download className="w-5 h-5"/>} text="Exportation et aperçu Paysage" />
               <FeaturePoint icon={<Users className="w-5 h-5"/>} text="Groupé par Major et Niveau" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Notes",
      value: "note",
      content: (
        <div className="w-full relative h-[90%] rounded-[2rem] p-8 md:p-12 text-white bg-gradient-to-br from-emerald-600 to-teal-900 shadow-xl overflow-hidden flex flex-col justify-center border border-emerald-400/20">
          <Award className="w-64 h-64 absolute -bottom-10 -right-10 text-white opacity-[0.03] pointer-events-none transform -rotate-12" />
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3 flex items-center gap-3">
              <Award className="w-8 h-8 text-emerald-300" />
              Performances & Résultats
            </h2>
            <p className="text-emerald-100 font-medium mb-8 text-sm md:text-base leading-relaxed">
              Visualisation complète de votre dossier académique avec calcul en temps réel de votre moyenne générale et des statistiques par matière.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <FeaturePoint icon={<TrendingUp className="w-5 h-5"/>} text="Suivi de moyenne avec animations" />
               <FeaturePoint icon={<ShieldCheck className="w-5 h-5"/>} text="Calcul pondéré Devoir/Session" />
               <FeaturePoint icon={<PieChart className="w-5 h-5"/>} text="Lettres de performances (A+, B)" />
               <FeaturePoint icon={<Award className="w-5 h-5"/>} text="Rendu du tableau élégant" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Messages",
      value: "messages",
      content: (
        <div className="w-full relative h-[90%] rounded-[2rem] p-8 md:p-12 text-white bg-gradient-to-br from-fuchsia-700 to-purple-900 shadow-xl overflow-hidden flex flex-col justify-center border border-purple-500/20">
          <MessageSquare className="w-64 h-64 absolute -bottom-10 -right-10 text-white opacity-[0.03] pointer-events-none transform -rotate-12" />
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3 flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-purple-300" />
              Espace Discussion
            </h2>
            <p className="text-purple-100 font-medium mb-8 text-sm md:text-base leading-relaxed">
              Un espace d'échange fluide interactif comme votre application de messagerie préférée. Restez connecté avec le groupe de votre filière.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <FeaturePoint icon={<Users className="w-5 h-5"/>} text="Salon organisé par filière" />
               <FeaturePoint icon={<BellRing className="w-5 h-5"/>} text="Avatars intelligents générés" />
               <FeaturePoint icon={<History className="w-5 h-5"/>} text="Défilement de lecture continu" />
               <FeaturePoint icon={<MessageSquare className="w-5 h-5"/>} text="Bulles d'envoi et de réception" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Paiements",
      value: "Statut paiement",
      content: (
        <div className="w-full relative h-[90%] rounded-[2rem] p-8 md:p-12 text-white bg-gradient-to-br from-slate-700 to-slate-900 shadow-xl overflow-hidden flex flex-col justify-center border border-slate-600/30">
          <CreditCard className="w-64 h-64 absolute -bottom-10 -right-10 text-white opacity-[0.03] pointer-events-none transform -rotate-12" />
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3 flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-slate-300" />
              Statuts Financiers
            </h2>
            <p className="text-slate-100 font-medium mb-8 text-sm md:text-base leading-relaxed">
              L'historique détaillé de votre scolarité. Retrouvez vos reçus de versement dans une vue digne d'un relevé bancaire professionnel.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <FeaturePoint icon={<ShieldCheck className="w-5 h-5"/>} text="KPI: Total payé et en l'attente" />
               <FeaturePoint icon={<Download className="w-5 h-5"/>} text="Extraction des PDF de relevé" />
               <FeaturePoint icon={<Activity className="w-5 h-5"/>} text="Factures avec indicateur couleur" />
               <FeaturePoint icon={<Bell className="w-5 h-5"/>} text="Connexion pôle financier" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-[450px] md:h-[30rem] max-sm:hidden perspective-[1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start font-mono font-semibold">
      <Tabs tabs={tabs} />
    </div>
  );
}