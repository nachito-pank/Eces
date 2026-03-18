"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import adminsData from '@/data/admins.json';
import { BookOpen, GraduationCap, TrendingUp, Award, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

type NoteRow = {
  id: number;
  matiere: string;
  devoir: number;
  session: number;
  coefficient: number;
};

export default function StudentNotesPage() {
  const etudiant = (adminsData as any).etudiants?.[1] || { notes: [] };
  const rawNotes = etudiant.notes || [];

  const notes: NoteRow[] = (rawNotes as any[]).map((n: any, idx: number) => ({
    id: idx,
    matiere: String(n.matiere ?? ''),
    devoir: Number(n.noteDevoir ?? n.devoir ?? 0),
    session: Number(n.noteSession ?? n.session ?? 0),
    coefficient: Number(n.coefficient ?? 1),
  }));

  const calculerMoyenne = (devoir: number, session: number) => {
    return (devoir * 0.3) + (session * 0.7);
  };

  const stats = useMemo(() => {
    if (notes.length === 0) return { moyenneGenerale: 0, totalCoefs: 0, matieresValidees: 0 };
    
    let totalPoints = 0;
    let totalCoefs = 0;
    let matieresValidees = 0;

    notes.forEach((note: NoteRow) => {
      const moy = calculerMoyenne(note.devoir, note.session);
      totalPoints += moy * note.coefficient;
      totalCoefs += note.coefficient;
      if (moy >= 10) matieresValidees++;
    });

    return {
      moyenneGenerale: totalCoefs > 0 ? (totalPoints / totalCoefs) : 0,
      totalCoefs,
      matieresValidees
    };
  }, [notes]);

  const getMoyenneColor = (moyenne: number) => {
    if (moyenne >= 16) return 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-900/30 dark:border-emerald-800';
    if (moyenne >= 14) return 'text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/30 dark:border-blue-800';
    if (moyenne >= 12) return 'text-indigo-700 bg-indigo-50 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-900/30 dark:border-indigo-800';
    if (moyenne >= 10) return 'text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-900/30 dark:border-amber-800';
    return 'text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/30 dark:border-red-800';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 300, damping: 24 } 
    }
  };

  return (
    <main className="w-full p-4 md:p-8 min-h-[calc(100vh-4rem)] bg-slate-50/50 dark:bg-[#0a0f1c] font-sans">
      <motion.div 
        className="max-w-6xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* En-tête de la page */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-600/20 text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Mes Résultats
              </h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base ml-1">
              Consultez vos notes et votre progression académique.
            </p>
          </div>
        </motion.div>

        {/* Section des statistiques */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm backdrop-blur-xl flex items-center gap-5 hover:shadow-md hover:shadow-emerald-600 hover:-translate-y-2 transition-all">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Moyenne Générale</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {stats.moyenneGenerale.toFixed(2)}<span className="text-base font-medium text-slate-400 ml-1">/20</span>
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 hover:-translate-y-2 shadow-sm backdrop-blur-xl flex items-center gap-5 hover:shadow-md hover:shadow-blue-600 transition-all">
            <div className="p-4 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Matières Évaluées</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {notes.length}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm backdrop-blur-xl flex items-center gap-5 hover:shadow-md hover:-translate-y-2 hover:shadow-indigo-600 transition-all">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Matières Validées</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {stats.matieresValidees}
                <span className="text-base font-medium text-slate-400 ml-1">/{notes.length}</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section de la table */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm overflow-hidden backdrop-blur-xl">
          <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              Détail des notes
            </h2>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <Award className="w-3.5 h-3.5 text-blue-500" />
              Calcul pondéré : Devoir (30%) • Session (70%)
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Matière</th>
                  <th className="px-6 py-4 font-medium text-right" title="Note de Devoir : Coefficient 30%">Devoir <span className="text-[10px] font-bold text-slate-400 ml-1">(30%)</span></th>
                  <th className="px-6 py-4 font-medium text-right" title="Note de Session : Coefficient 70%">Session <span className="text-[10px] font-bold text-slate-400 ml-1">(70%)</span></th>
                  <th className="px-6 py-4 font-medium text-center">Coef</th>
                  <th className="px-6 py-4 font-medium text-right">Moyenne</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                {notes.length > 0 ? notes.map((note) => {
                  const moy = calculerMoyenne(note.devoir, note.session);
                  const moyColor = getMoyenneColor(moy);
                  
                  return (
                    <tr 
                      key={note.id} 
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="px-6 py-5 font-medium text-slate-900 dark:text-slate-100">
                        {note.matiere}
                      </td>
                      <td className="px-6 py-5 text-right font-medium text-slate-600 dark:text-slate-300">
                        {note.devoir.toFixed(2)}
                      </td>
                      <td className="px-6 py-5 text-right font-medium text-slate-600 dark:text-slate-300">
                        {note.session.toFixed(2)}
                      </td>
                      <td className="px-6 py-5 text-center text-slate-400 dark:text-slate-500">
                        × {note.coefficient}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold border ${moyColor}`}>
                          {moy.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  )
                }) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800">
                          <AlertCircle className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-base font-medium">Aucune note n'est disponible pour le moment.</p>
                        <p className="text-sm text-slate-400">Vos notes s'afficheront ici une fois saisies par l'administration.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}