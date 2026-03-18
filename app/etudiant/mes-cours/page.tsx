"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import adminsData from '@/data/admins.json';
import { Download, Printer, Eye, BookOpen, Code, BrainCircuit, Globe, LineChart, FileText, Search, BookMarked, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export default function MesCoursPage() {
  // On utilise l'étudiant à l'index 1, ou 0 selon les données.
  const etudiant = (adminsData as any).etudiants?.[1] || (adminsData as any).etudiants?.[0] || { notes: [] };
  const rawNotes = etudiant.notes || [];

  // Extraire les matières uniques de cet étudiant
  const matieres: string[] = Array.from(
    new Set<string>(rawNotes.map((n: any) => String(n.matiere ?? '')).filter(Boolean))
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [previewFile, setPreviewFile] = useState<{title: string, matiere: string} | null>(null);

  const getSubjectIcon = (subject: string) => {
    const s = subject.toLowerCase();
    if (s.includes('algo') || s.includes('code') || s.includes('prog') || s.includes('sri')) return <Code className="w-6 h-6 text-[#033481] dark:text-blue-400" />;
    if (s.includes('ia') || s.includes('intel') || s.includes('machine') || s.includes('tech')) return <BrainCircuit className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
    if (s.includes('data') || s.includes('stat') || s.includes('math') || s.includes('si')) return <LineChart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
    if (s.includes('lang') || s.includes('anglais') || s.includes('français') || s.includes('droit')) return <Globe className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
    return <BookOpen className="w-6 h-6 text-[#0A2540] dark:text-slate-400" />;
  };

  const getSubjectColorBg = (subject: string) => {
    const s = subject.toLowerCase();
    if (s.includes('algo') || s.includes('code') || s.includes('prog') || s.includes('sri')) return 'bg-blue-50/80 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20';
    if (s.includes('ia') || s.includes('intel') || s.includes('machine') || s.includes('tech')) return 'bg-indigo-50/80 dark:bg-indigo-500/10 border-indigo-100 dark:border-indigo-500/20';
    if (s.includes('data') || s.includes('stat') || s.includes('math') || s.includes('si')) return 'bg-emerald-50/80 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20';
    if (s.includes('lang') || s.includes('anglais') || s.includes('français') || s.includes('droit')) return 'bg-amber-50/80 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20';
    return 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-700/50';
  };

  // Fausses données de documents (PDF) par matière pour simuler la liste
  const generateCourseMaterials = () => [
    { id: 1, title: 'Chapitre 1 : Introduction et Fondamentaux', type: 'Cours PDF', size: '2.4 MB', date: '02 Sept' },
    { id: 2, title: 'TD 1 : Exercices d\'application', type: 'Fiche TD', size: '1.1 MB', date: '09 Sept' },
    { id: 3, title: 'Chapitre 2 : Approfondissement', type: 'Cours PDF', size: '3.8 MB', date: '16 Sept' },
    { id: 4, title: 'TD 2 : Corrigés inclus', type: 'Fiche TD', size: '940 KB', date: '23 Sept' },
    { id: 5, title: 'Support de Révision Mi-Semestre', type: 'Synthèse', size: '1.5 MB', date: '10 Oct' },
  ];

  const filteredMatieres = matieres.filter(m => m.toLowerCase().includes(searchQuery.toLowerCase()));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <main className="w-full min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] p-4 md:p-8 font-sans">
      <motion.div 
        className="max-w-6xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* En-tête de la page */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-black tracking-[0.2em] text-[#55719e] dark:text-blue-400 uppercase mb-2">
              Portail Académique
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0A2540] dark:text-white flex items-center gap-3">
              <BookMarked className="w-8 h-8 text-[#033481] dark:text-blue-500" />
              Mes Cours & Supports
            </h1>
          </div>
          
          {/* Barre de recherche */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#94a6c2]" />
            </div>
            <input
              type="text"
              placeholder="Rechercher une matière..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-[#033481] outline-none transition-all shadow-sm text-sm font-bold text-[#0A2540] dark:text-slate-100 placeholder:text-[#94a6c2]"
            />
          </div>
        </motion.div>

        {/* Liste des matières et leurs fichiers */}
        <motion.div variants={containerVariants} className="space-y-8">
          {filteredMatieres.length > 0 ? filteredMatieres.map((matiere) => {
            const documents = generateCourseMaterials();
            
            return (
              <motion.div 
                variants={itemVariants}
                key={matiere} 
                className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden"
              >
                {/* En-tête de la Matière */}
                <div className={`p-6 border-b flex items-center gap-5 ${getSubjectColorBg(matiere)}`}>
                  <div className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                    {getSubjectIcon(matiere)}
                  </div>
                  <div>
                    <h2 className="text-[1.3rem] font-bold text-[#0A2540] dark:text-white mb-0.5">
                      {matiere}
                    </h2>
                    <p className="text-[9px] font-black text-[#55719e] dark:text-slate-400 uppercase tracking-widest">
                      {documents.length} Supports Disponibles
                    </p>
                  </div>
                </div>

                {/* Liste des Documents de la Matière */}
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60 p-2 md:p-6">
                  {documents.map((doc, i) => (
                    <div 
                      key={doc.id} 
                      className={`group flex flex-col md:flex-row md:items-center justify-between p-4 md:px-6 md:py-5 rounded-2xl hover:bg-[#F8FAFC] dark:hover:bg-slate-800/40 transition-colors gap-4 ${i !== documents.length -1 ? "" : "border-b-0"}`}
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center shrink-0 border border-red-100/50 dark:border-red-500/20">
                          <FileText className="w-6 h-6 text-red-500" />
                        </div>
                        <div>
                          <h3 className="text-[15px] font-bold text-[#0A2540] dark:text-slate-100 group-hover:text-[#033481] dark:group-hover:text-blue-400 transition-colors mb-1.5">
                            {doc.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[11px] font-bold text-[#94a6c2] tracking-wider uppercase">
                            <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[#55719e] dark:text-slate-400">
                              {doc.type}
                            </span>
                            <span>• {doc.size}</span>
                            <span>• Mis à jour le {doc.date}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 md:self-center self-end mt-2 md:mt-0">
                        <button 
                          onClick={() => setPreviewFile({title: doc.title, matiere})}
                          title="Aperçu"
                          className="flex items-center gap-2 px-4 py-2.5 text-[#55719e] hover:text-[#033481] hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/40 font-bold text-xs rounded-xl transition-colors uppercase tracking-widest"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="hidden md:inline">Aperçu</span>
                        </button>
                        <button 
                          onClick={() => toast.success(`Téléchargement en cours : ${doc.title}`)}
                          title="Télécharger ZIP/PDF"
                          className="p-3 text-[#55719e] hover:text-[#033481] hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/40 rounded-xl transition-colors bg-slate-50 dark:bg-slate-800/50"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => toast.success(`Préparation pour impression : ${doc.title}`)}
                          title="Imprimer"
                          className="p-3 text-[#55719e] hover:text-[#0A2540] hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-700 rounded-xl transition-colors bg-slate-50 dark:bg-slate-800/50"
                        >
                          <Printer className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          }) : (
            <div className="py-24 bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400">
              <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-full mb-6">
                <Search className="w-12 h-12 text-[#94a6c2] dark:text-slate-500" />
              </div>
              <p className="text-xl font-extrabold text-[#0A2540] dark:text-white mb-2 tracking-tight">Aucune matière trouvée</p>
              <p className="text-sm font-semibold text-[#55719e]">Essayez de modifier vos termes de recherche.</p>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Modal d'aperçu de fichier (Preview) */}
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
              {/* Toolbar Modal (Similaire au header de mes-notes) */}
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl">
                <div className="flex items-center gap-5">
                  <div className="p-3 rounded-xl bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0A2540] dark:text-white">{previewFile.title}</h3>
                    <p className="text-[10px] font-black text-[#55719e] uppercase tracking-widest mt-0.5">{previewFile.matiere} • PDF Document SÉCURISÉ</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => toast.success(`Le fichier sécurisé ${previewFile.title} est en cours de téléchargement.`)} className="flex items-center gap-2 px-5 py-2.5 bg-[#033481] hover:bg-[#022863] text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-blue-900/20">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Télécharger</span>
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

              {/* Contenu Modal (Faux Visualiseur de PDF Professionnel) */}
              <div className="flex-1 bg-[#F1F5F9] dark:bg-slate-950 p-6 md:p-12 overflow-y-auto">
                <div className="max-w-3xl mx-auto bg-white dark:bg-[#0f1525] shadow-sm border border-slate-200 dark:border-slate-800 min-h-[1000px] rounded-lg p-12 md:p-20 relative overflow-hidden">
                  
                  {/* Faux filigrane du PDF */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.02] pointer-events-none">
                    <BookMarked className="w-96 h-96" />
                  </div>

                  {/* Faux Contenu du PDF */}
                  <div className="animate-pulse opacity-70">
                    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-sm w-3/4 mb-4"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-sm w-1/4 mb-16"></div>
                    
                    <div className="space-y-4 mb-10">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-sm w-full"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-sm w-full"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-sm w-11/12"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-sm w-full"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-sm w-5/6"></div>
                    </div>

                    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-sm w-1/2 mb-6 mt-12"></div>
                    
                    <div className="space-y-4">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-sm w-full"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-sm w-4/5"></div>
                      <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-sm w-full my-8"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-sm w-full"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-sm w-11/12"></div>
                    </div>
                  </div>
                  
                  {/* Surcouche UI */}
                  <div className="mt-32 flex justify-center flex-col items-center">
                    <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-full mb-4">
                      <Eye className="w-8 h-8 text-[#033481] dark:text-blue-400"/>
                    </div>
                    <p className="text-[#0A2540] dark:text-slate-300 font-bold text-lg mb-1">Aperçu du document sécurisé</p>
                    <p className="text-sm font-semibold text-[#55719e]">Le document original est généré pour votre compte.</p>
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
