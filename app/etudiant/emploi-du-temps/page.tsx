"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import adminsData from '@/data/admins.json';
import { Download, Printer, Calendar as CalendarIcon, Clock, MapPin, Eye, FileText, X, GraduationCap, Search, Layers } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { toast } from 'sonner';

export default function EdtPage() {
  const data = (adminsData as any).emploiDuTemps || [];
  const [selectedWeek, setSelectedWeek] = useState("Semaine 42");
  const [previewFile, setPreviewFile] = useState<{title: string, subtitle: string} | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Grouper les données par Filière puis par Niveau
  const groupedData = data.reduce((acc: any, curr: any) => {
    const fil = curr.filiere || "Général";
    const niv = curr.niveau || "Non spécifié";
    
    if (!acc[fil]) acc[fil] = {};
    if (!acc[fil][niv]) acc[fil][niv] = [];
    acc[fil][niv].push({
      id: curr.id,
      filiere: fil,
      niveau: niv,
      code: curr.code || "Unique"
    });
    return acc;
  }, {});

  const filieres = Object.keys(groupedData).filter(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24 
    } 
  }
};

  return (
    <main className="w-full min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] p-4 md:p-8 font-sans">
      <motion.div 
        className="max-w-6xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* En-tête (Mêmes Principes que Moyenne & Cours) */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-black tracking-[0.2em] text-[#55719e] dark:text-blue-400 uppercase mb-2">
              Organisation Académique
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0A2540] dark:text-white flex items-center gap-3">
              <CalendarIcon className="w-8 h-8 text-[#033481] dark:text-blue-500" />
              Emplois du Temps
            </h1>
          </div>
          
          {/* Barre de recherche */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#94a6c2]" />
            </div>
            <input
              type="text"
              placeholder="Rechercher une filière..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-[#033481] outline-none transition-all shadow-sm text-sm font-bold text-[#0A2540] dark:text-slate-100 placeholder:text-[#94a6c2]"
            />
          </div>
        </motion.div>

        {/* KPIs */}
        <motion.div variants={itemVariants} className="bg-[#0344A6] p-4 lg:px-8 rounded-[1.5rem] shadow-lg flex items-center justify-around text-white">
          <div className="text-center flex flex-col items-center">
            <div className="p-2 bg-blue-500/20 rounded-lg mb-2"><Clock className="w-5 h-5 text-blue-200" /></div>
            <p className="text-xl font-black tracking-tighter">{selectedWeek}</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-blue-200 mt-1">Période Active</p>
          </div>
          <div className="w-px h-12 bg-blue-400/20"></div>
          <div className="text-center flex flex-col items-center">
            <div className="p-2 bg-blue-500/20 rounded-lg mb-2"><Layers className="w-5 h-5 text-blue-200" /></div>
            <p className="text-2xl font-black tracking-tighter">{data.length}</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-blue-200 mt-1">Classes Gérées</p>
          </div>
          <div className="w-px h-12 bg-blue-400/20"></div>
          <div className="text-center flex flex-col items-center">
            <div className="p-2 bg-blue-500/20 rounded-lg mb-2"><MapPin className="w-5 h-5 text-blue-200" /></div>
            <p className="text-2xl font-black tracking-tighter">Campus</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-blue-200 mt-1">Localisation Centrale</p>
          </div>
        </motion.div>

        {/* Groupes Filières & Niveaux */}
        <motion.div variants={containerVariants} className="space-y-10">
          {filieres.length > 0 ? filieres.map((filiere) => {
            const niveaux = Object.keys(groupedData[filiere]);
            
            return (
              <motion.div 
                variants={itemVariants} 
                key={filiere}
                className="bg-white dark:bg-slate-900/80 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden"
              >
                {/* En-tête Filière */}
                <div className="p-6 border-b flex items-center gap-5 bg-blue-50/50 dark:bg-blue-900/10 border-blue-100/50 dark:border-blue-800/20">
                  <div className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <GraduationCap className="w-7 h-7 text-[#033481] dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-[1.4rem] font-extrabold text-[#0A2540] dark:text-white mb-0.5 tracking-tight">
                      Filière : {filiere}
                    </h2>
                    <p className="text-[10px] font-black text-[#55719e] uppercase tracking-widest">
                      {niveaux.length} NIVEAUX ENREGISTRÉS
                    </p>
                  </div>
                </div>

                {/* Blocs Niveaux */}
                <div className="p-4 md:p-6 space-y-8">
                  {niveaux.map((niveau, idx) => {
                    const classes = groupedData[filiere][niveau];

                    return (
                      <div key={niveau} className={idx !== 0 ? "pt-8 border-t border-slate-100 dark:border-slate-800" : ""}>
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-1.5 h-5 bg-emerald-500 rounded-full"></div>
                          <h3 className="text-lg font-bold text-[#0A2540] dark:text-slate-100">
                            Niveau : {niveau}
                          </h3>
                        </div>

                        {/* Liste des groupes (fichiers) pour ce niveau */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {classes.map((cls: any) => (
                            <div 
                              key={cls.id}
                              className="group bg-slate-50 dark:bg-slate-800/40 rounded-[1.5rem] border border-slate-200/60 dark:border-slate-700/50 p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-5 hover:bg-white hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 hover:-translate-y-1 transition-all"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center shrink-0 border border-red-100/50 dark:border-red-500/20 pb-0.5">
                                  <FileText className="w-6 h-6 text-red-500" />
                                </div>
                                <div>
                                  <h4 className="text-[15px] font-bold text-[#0A2540] dark:text-slate-100 group-hover:text-[#033481] dark:group-hover:text-blue-400 transition-colors mb-1">
                                    Planning • Groupe {cls.code}
                                  </h4>
                                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#94a6c2] tracking-wider uppercase">
                                    <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-700 text-[#55719e] dark:text-slate-300 shadow-sm">
                                      PDF
                                    </span>
                                    <span>• {selectedWeek}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 xl:self-center self-end">
                                <button 
                                  onClick={() => setPreviewFile({
                                    title: `Planning Groupe ${cls.code}`, 
                                    subtitle: `${cls.filiere} - Niveau ${cls.niveau}`
                                  })}
                                  title="Aperçu"
                                  className="flex items-center gap-1.5 px-3 py-2 bg-blue-100/50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-[#033481] dark:text-blue-400 rounded-lg font-black text-[10px] transition-colors uppercase tracking-widest"
                                >
                                  <Eye className="w-4 h-4" />
                                  <span className="hidden sm:inline">Aperçu</span>
                                </button>
                                <button 
                                  onClick={() => toast.success(`Téléchargement de l'emploi du temps (Groupe ${cls.code})`)}
                                  className="p-2 bg-white hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 shadow-sm text-[#55719e] hover:text-[#033481] dark:hover:text-blue-400 rounded-lg transition-colors border border-slate-200 dark:border-slate-600"
                                  title="Télécharger"
                                >
                                  <Download className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => toast.success("Préparation pour l'impression en cours...")}
                                  className="p-2 bg-white hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 shadow-sm text-[#55719e] hover:text-[#0A2540] dark:hover:text-white rounded-lg transition-colors border border-slate-200 dark:border-slate-600"
                                  title="Imprimer"
                                >
                                  <Printer className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          }) : (
            <div className="py-24 bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400">
              <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-full mb-6">
                <Search className="w-12 h-12 text-[#94a6c2] dark:text-slate-500" />
              </div>
              <p className="text-xl font-extrabold text-[#0A2540] dark:text-white mb-2 tracking-tight">Aucune filière trouvée</p>
              <p className="text-sm font-semibold text-[#55719e]">Essayez de modifier vos termes de recherche.</p>
            </div>
          )}
        </motion.div>

      </motion.div>

      {/* Modal d'aperçu de fichier (Preview PDF) */}
      <AnimatePresence>
        {previewFile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#0A2540]/60 dark:bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-[#0B1120] rounded-[2rem] shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden border border-slate-200/50 dark:border-slate-800/80"
            >
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl">
                <div className="flex items-center gap-5">
                  <div className="p-3 rounded-xl bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0A2540] dark:text-white">{previewFile.title}</h3>
                    <p className="text-[10px] font-black text-[#55719e] uppercase tracking-widest mt-0.5">{previewFile.subtitle} • PDF SÉCURISÉ</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => toast.success(`Création de l'archive PDF...`)} className="flex items-center gap-2 px-5 py-2.5 bg-[#033481] hover:bg-[#022863] text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-blue-900/20">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Télécharger</span>
                  </button>
                  <button onClick={() => toast.success(`Ouverture de la boîte de dialogue d'impression...`)} className="flex items-center gap-2 px-5 py-2.5 bg-slate-200 dark:bg-slate-800 text-[#0A2540] dark:text-white rounded-xl font-bold text-sm transition-colors">
                    <Printer className="w-4 h-4" />
                  </button>
                  <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                  <button 
                    onClick={() => setPreviewFile(null)}
                    className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6" strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              {/* Faux Visualiseur PDF Orienté Agenda */}
              <div className="flex-1 bg-[#F1F5F9] dark:bg-slate-950 p-6 md:p-12 overflow-y-auto">
                <div className="max-w-4xl mx-auto bg-white dark:bg-[#0f1525] shadow-sm border border-slate-200 dark:border-slate-800 h-[800px] rounded-lg p-10 md:p-16 relative overflow-hidden flex flex-col">
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.02] pointer-events-none">
                    <CalendarIcon className="w-96 h-96" />
                  </div>

                  {/* Squelette de tableau d'emploi du temps */}
                  <div className="animate-pulse opacity-70 w-full">
                    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-sm w-1/2 mb-4 mx-auto"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-sm w-1/4 mb-12 mx-auto"></div>
                    
                    {/* Colonnes d'en-tête */}
                    <div className="grid grid-cols-6 gap-2 mb-4">
                      <div className="h-8 bg-transparent"></div>
                      <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-sm"></div>
                      <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-sm"></div>
                      <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-sm"></div>
                      <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-sm"></div>
                      <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-sm"></div>
                    </div>

                    {/* Lignes de cours */}
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="grid grid-cols-6 gap-2 mb-2 h-24">
                        <div className="h-full bg-slate-100/50 dark:bg-slate-800/50 rounded-sm flex items-center justify-center p-2">
                           <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded-sm"></div>
                        </div>
                        <div className="h-full bg-blue-100/50 dark:bg-blue-900/20 rounded-sm border border-blue-200/50 dark:border-blue-800/50"></div>
                        <div className="h-full bg-slate-100/50 dark:bg-slate-800/30 rounded-sm border-2 border-dashed border-slate-200 dark:border-slate-800/50"></div>
                        <div className="h-full bg-emerald-100/50 dark:bg-emerald-900/20 rounded-sm border border-emerald-200/50 dark:border-emerald-800/50"></div>
                        <div className="h-full bg-slate-100/50 dark:bg-slate-800/30 rounded-sm border-2 border-dashed border-slate-200 dark:border-slate-800/50"></div>
                        <div className="h-full bg-indigo-100/50 dark:bg-indigo-900/20 rounded-sm border border-indigo-200/50 dark:border-indigo-800/50"></div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex justify-center flex-col items-center pt-20">
                    <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-full mb-4">
                      <Eye className="w-8 h-8 text-[#033481] dark:text-blue-400"/>
                    </div>
                    <p className="text-[#0A2540] dark:text-slate-300 font-bold text-lg mb-1">Aperçu du Planning Généré</p>
                    <p className="text-sm font-semibold text-[#55719e]">Version d'impression optimisée pour format A4 Paysage.</p>
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

