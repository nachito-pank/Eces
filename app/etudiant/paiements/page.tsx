"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import adminsData from '@/data/admins.json';
import { CreditCard, Download, ExternalLink, Filter, Plus, Printer, Search, Wallet, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaiementsPage() {
  const etudiant = (adminsData as any).etudiants?.[1] || (adminsData as any).etudiants?.[0] || { paiements: [] };
  const paiements = etudiant.paiements || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const stats = useMemo(() => {
    let totalPaye = 0;
    let totalEnAttente = 0;
    
    paiements.forEach((p: any) => {
      const montant = Number(p.montant) || 0;
      if (p.statut.toLowerCase() === 'payé' || p.statut.toLowerCase() === 'validé') {
        totalPaye += montant;
      } else {
        totalEnAttente += montant;
      }
    });

    return { totalPaye, totalEnAttente, totalTransactions: paiements.length };
  }, [paiements]);

  const getStatusStyle = (statut: string) => {
    const s = statut.toLowerCase();
    if (s === 'payé' || s === 'validé') return { icon: <CheckCircle2 className="w-4 h-4" />, color: 'text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/20 border-emerald-200' };
    if (s === 'en attente') return { icon: <Clock className="w-4 h-4" />, color: 'text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-500/20 border-amber-200' };
    if (s === 'rejeté' || s === 'échoué') return { icon: <AlertCircle className="w-4 h-4" />, color: 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-500/20 border-red-200' };
    return { icon: <Wallet className="w-4 h-4" />, color: 'text-[#033481] bg-blue-100 dark:text-blue-400 dark:bg-blue-500/20 border-blue-200' };
  };

  return (
    <main className="w-full min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] p-4 md:p-8 font-sans">
      <motion.div 
        className="max-w-6xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* En-tête */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-black tracking-[0.2em] text-[#55719e] dark:text-blue-400 uppercase mb-2">
              Gestion Financière
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0A2540] dark:text-white flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-[#033481] dark:text-blue-500" />
              Paiements & Factures
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-[#55719e] hover:text-[#0A2540] dark:text-slate-400 dark:hover:text-white rounded-xl font-bold text-sm transition-all shadow-sm border border-slate-200 dark:border-slate-800">
              <Printer className="w-4 h-4" />
              Relevé
            </button>
          </div>
        </motion.div>

        {/* KPIs Financiers */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm backdrop-blur-xl flex flex-col justify-between hover:shadow-md transition-shadow min-h-[11rem]">
            <p className="font-bold text-[10px] uppercase tracking-widest text-[#0A2540] dark:text-blue-400 mb-2">
              Total Payé (FCFA)
            </p>
            <div className="mb-2 text-[#0A2540] dark:text-white">
              <span className="text-4xl lg:text-5xl font-black tracking-tighter">{stats.totalPaye.toLocaleString('fr-FR')}</span>
            </div>
            <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-auto">
              <CheckCircle2 className="w-4 h-4" />
              Vos règlements validés
            </p>
          </div>

          <div className="bg-[#0344A6] p-6 rounded-3xl shadow-xl flex flex-col justify-between text-white min-h-[11rem]">
            <p className="font-bold text-[10px] uppercase tracking-widest text-blue-200 mb-2">
              Reste à Payer (FCFA)
            </p>
            <div className="mb-2">
              <span className="text-4xl lg:text-5xl font-black tracking-tighter text-white">{stats.totalEnAttente.toLocaleString('fr-FR')}</span>
            </div>
            <p className="text-[11px] font-bold text-blue-100 flex items-center gap-1.5 mt-auto">
              <Clock className="w-4 h-4" />
              Avant la prochaine échéance
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm backdrop-blur-xl flex flex-col justify-between hover:shadow-md transition-shadow min-h-[11rem]">
            <p className="font-bold text-[10px] uppercase tracking-widest text-[#55719e] dark:text-slate-400 mb-2">
              Transactions
            </p>
            <div className="mb-2 text-[#0A2540] dark:text-white">
              <span className="text-4xl lg:text-5xl font-black tracking-tighter">{stats.totalTransactions}</span>
            </div>
            <p className="text-[11px] font-bold text-[#55719e] dark:text-slate-500 uppercase tracking-widest mt-auto">
              Historique complet
            </p>
          </div>
        </motion.div>

        {/* Tableau / Liste des Transactions */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900/50 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800/60 overflow-hidden backdrop-blur-xl">
          <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0A2540] dark:text-white flex items-center gap-3">
              <div className="w-1.5 h-6 bg-[#033481] dark:bg-blue-500 rounded-full"></div>
              Historique des versements
            </h2>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-[#0A2540] dark:hover:text-white rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-wider font-black">
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Mode</th>
                  <th className="px-6 py-4 text-center">Statut</th>
                  <th className="px-6 py-4 text-right">Montant</th>
                  <th className="px-6 py-4 text-center">Reçu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                {paiements.length > 0 ? paiements.map((p: any) => {
                  const statusStyle = getStatusStyle(p.statut);
                  
                  return (
                    <tr 
                      key={p.id} 
                      className="hover:bg-[#F8FAFC] dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="px-6 py-5 font-bold text-[#0A2540] dark:text-slate-100">
                        {p.description}
                        <p className="text-[10px] font-black text-[#55719e] dark:text-slate-500 uppercase tracking-widest mt-1">Ref. #{String(p.id).split('-')[0]}</p>
                      </td>
                      <td className="px-6 py-5 font-semibold text-[#55719e] dark:text-slate-300">
                        {p.date}
                      </td>
                      <td className="px-6 py-5 font-semibold text-[#55719e] dark:text-slate-300">
                        {p.mode ? (
                          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs">{p.mode}</span>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider ${statusStyle.color}`}>
                          {statusStyle.icon}
                          {p.statut}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <span className="text-[17px] font-black text-[#0A2540] dark:text-white tracking-tight">
                          {Number(p.montant).toLocaleString('fr-FR')} <span className="text-[10px] font-bold text-slate-400">FCFA</span>
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <button className="p-2.5 text-[#55719e] hover:text-[#033481] hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/40 rounded-xl transition-colors">
                          <Download className="w-5 h-5 mx-auto" />
                        </button>
                      </td>
                    </tr>
                  )
                }) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="p-4 rounded-full bg-slate-50 dark:bg-slate-800">
                          <Wallet className="w-8 h-8 text-[#94a6c2]" />
                        </div>
                        <div>
                          <p className="text-xl font-extrabold text-[#0A2540] dark:text-white tracking-tight">Aucun paiement enregistré</p>
                          <p className="text-sm font-semibold text-[#55719e] mt-1">Vos reçus s'afficheront ici après votre premier versement.</p>
                        </div>
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
