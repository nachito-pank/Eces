"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import adminsData from '@/data/admins.json';
import { User, Mail, ShieldCheck, MapPin, GraduationCap, Phone, Briefcase, Camera, CircleCheckBig, ArrowRight, FileText } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

export default function ProfilPage() {
  const etudiant = (adminsData as any).etudiants?.[0] || (adminsData as any).etudiants?.[0] || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};
  return (
    <main className="w-full min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] p-4 md:p-8 font-sans">
      <motion.div 
        className="max-w-5xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* En-tête de page Profil */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-black tracking-[0.2em] text-[#55719e] dark:text-blue-400 uppercase mb-2">
            Espace Personnel
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0A2540] dark:text-white flex items-center gap-3">
            <User className="w-8 h-8 text-[#033481] dark:text-blue-500" />
            Mon Profil
          </h1>
        </motion.div>

        {/* Bannière d'en-tête utilisateur */}
        <motion.div variants={itemVariants} className="relative bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden mt-6">
          {/* Cover Photo */}
          <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#033481] to-indigo-600 dark:from-blue-900 dark:to-slate-800 relative">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          </div>
          
          <div className="px-6 md:px-10 pb-8 relative flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 -mt-16 md:-mt-20">
            {/* Avatar statique (géré par l'administration) */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-slate-900 shadow-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                 {/* {etudiant.avatar ? (
                   <img src={etudiant.avatar} alt="Avatar" className="w-full h-full object-cover" />
                 ) : ( */}
                   <User className="w-20 h-20 text-slate-400 dark:text-slate-500" />
                 {/* )} */}
              </div>
              <div className="absolute bottom-2 right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 shadow-sm" title="Actif"></div>
            </div>

            {/* Infos rapides */}
            <div className="flex-1 text-center md:text-left pt-4 md:pt-0">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A2540] dark:text-white tracking-tight">
                  {etudiant.prenom} {etudiant.nom}
                </h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold text-xs rounded-full uppercase tracking-widest border border-emerald-200 dark:border-emerald-800/60 mx-auto md:mx-0">
                  <ShieldCheck className="w-3.5 h-3.5" /> Compte Vérifié
                </span>
              </div>
              <p className="text-[#55719e] dark:text-slate-400 font-medium text-sm md:text-base flex items-center justify-center md:justify-start gap-2 mb-4">
                <GraduationCap className="w-5 h-5" /> Étudiant(e) en {etudiant.filiere} — {etudiant.niveau}
              </p>
            </div>
            
            {/* Info : Aucune modification possible */}
            <div className="w-full md:w-auto mt-4 md:mt-0">
               <span className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700">
                 <ShieldCheck className="w-4 h-4" /> Géré par la scolarité
               </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne Informations personnelles (Gauche) */}
          <motion.div variants={containerVariants} className="lg:col-span-2 space-y-8">
            
            <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 p-8">
               <h3 className="text-lg font-bold text-[#0A2540] dark:text-white mb-6 flex items-center gap-3">
                 <Briefcase className="w-5 h-5 text-blue-500" /> 
                 Détails Académiques
               </h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                  <div>
                    <p className="text-[10px] font-black uppercase text-[#94a6c2] tracking-widest mb-1.5">Matricule Étudiant</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                      {etudiant.matricule || "MA-2025-8X90"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-[#94a6c2] tracking-widest mb-1.5">Filière</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                      {etudiant.filiere}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-[#94a6c2] tracking-widest mb-1.5">Niveau Actuel</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                      {etudiant.niveau}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-[#94a6c2] tracking-widest mb-1.5">Année de Validation</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                      2025 - 2026
                    </p>
                  </div>
               </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 p-8">
               <h3 className="text-lg font-bold text-[#0A2540] dark:text-white mb-6 flex items-center gap-3">
                 <Mail className="w-5 h-5 text-indigo-500" /> 
                 Coordonnées & Contacts
               </h3>
               
               <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                        <Mail className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-[#94a6c2] tracking-widest mb-0.5">Adresse Email Principale</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{etudiant.email}</p>
                      </div>
                    </div>
                    <CircleCheckBig className="w-5 h-5 text-emerald-500 hidden md:block" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-emerald-200 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                        <Phone className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-[#94a6c2] tracking-widest mb-0.5">Téléphone Secours</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">+241 77 00 00 00</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-amber-200 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                        <MapPin className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-[#94a6c2] tracking-widest mb-0.5">Lieu de résidence</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Libreville, Gabon</p>
                      </div>
                    </div>
                  </div>
               </div>
            </motion.div>
          </motion.div>

          {/* Colonne Info de sécurité & Extra (Droite) */}
          <motion.div variants={containerVariants} className="space-y-8">
            
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#033481] to-blue-700 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-900/20">
               <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
               <h3 className="text-lg font-bold mb-2 relative z-10 flex items-center gap-2">
                 <ShieldCheck className="w-5 h-5" /> Centre de Sécurité
               </h3>
               <p className="text-blue-200 text-sm font-medium mb-6 relative z-10">
                 Votre compte est hautement sécurisé. Assurez-vous de renouveler votre mot de passe tous les semestres.
               </p>
               <button className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm transition-colors border border-white/20 relative z-10">
                 Modifier le mot de passe
               </button>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 p-8">
               <h3 className="text-lg font-bold text-[#0A2540] dark:text-white mb-6">Documents Légaux</h3>
               <div className="space-y-4">
                 <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                       <FileText className="w-4 h-4" />
                     </div>
                     <span className="font-bold text-sm text-slate-700 dark:text-slate-300">Certificat de Scolarité</span>
                   </div>
                   <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                 </button>
                 <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center">
                       <FileText className="w-4 h-4" />
                     </div>
                     <span className="font-bold text-sm text-slate-700 dark:text-slate-300">Règlement Intérieur</span>
                   </div>
                   <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-red-500 transition-colors" />
                 </button>
               </div>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
