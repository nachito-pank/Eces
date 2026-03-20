'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import { GraduationCap, Search, ArrowUpDown, User, BookOpen, Award } from 'lucide-react';
import { motion, type Variants } from "framer-motion";

interface Student {
  id: string;
  name: string;
  firstName: string;
  email: string;
  filiere: string;
  level: string;
  matricule: string;
  statut: string;
  moyenne: number;
  appreciation: string;
}

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

export default function MesEtudiants() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiliere, setSelectedFiliere] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filieres, setFilieres] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/enseignant/etudiants');
      const data = await res.json();
      if (data.success) {
        setStudents(data.data);
        const uniqueFilieres = [...new Set(data.data.map((s: Student) => s.filiere))] as string[];
        const uniqueLevels = [...new Set(data.data.map((s: Student) => s.level))] as string[];
        setFilieres(uniqueFilieres.sort());
        setLevels(uniqueLevels.sort());
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiliereChange = (filiere: string) => {
    setSelectedFiliere(filiere);
    setSelectedLevel('');
  };

  const availableLevels = React.useMemo(() => {
    if (!selectedFiliere) return levels;
    return [...new Set(
      students.filter(s => s.filiere === selectedFiliere).map(s => s.level)
    )].sort() as string[];
  }, [students, selectedFiliere, levels]);

  const toggleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const getAppreciationColor = (appreciation: string) => {
    switch (appreciation) {
      case 'Excellent': return 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400';
      case 'Très Bien': return 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400';
      case 'Bien': return 'bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-400';
      case 'Assez Bien': return 'bg-yellow-50 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400';
      case 'Passable': return 'bg-orange-50 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400';
      case 'Insuffisant': return 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300';
    }
  };

  const getMoyenneColor = (moyenne: number) => {
    if (moyenne >= 16) return 'text-emerald-600 dark:text-emerald-400';
    if (moyenne >= 14) return 'text-blue-600 dark:text-blue-400';
    if (moyenne >= 12) return 'text-sky-600 dark:text-sky-400';
    if (moyenne >= 10) return 'text-orange-500 dark:text-orange-400';
    return 'text-red-500 dark:text-red-400';
  };

  const filteredAndSortedStudents = React.useMemo(() => {
    return [...students]
      .filter(s =>
        (selectedFiliere === '' || s.filiere === selectedFiliere) &&
        (selectedLevel === '' || s.level === selectedLevel) &&
        (s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
         s.matricule.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      });
  }, [students, selectedFiliere, selectedLevel, searchTerm, sortOrder]);

  if (loading) return (
    <div className="p-20 text-center text-slate-500 dark:text-slate-400">Chargement...</div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full p-3 sm:p-0 space-y-8"
    >
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">

        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Mes Étudiants</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Consultez la liste des étudiants par filière et niveau
            </p>
          </div>
          <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/40 rounded-2xl flex items-center justify-center shrink-0">
            <GraduationCap className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
          </div>
        </motion.div>

        {/* Filtres */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/60 rounded-[2rem] p-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Filière</label>
              <select
                value={selectedFiliere}
                onChange={(e) => handleFiliereChange(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition"
              >
                <option value="">Toutes les filières ({students.length})</option>
                {filieres.map(f => {
                  const count = students.filter(s => s.filiere === f).length;
                  return <option key={f} value={f}>{f} ({count})</option>;
                })}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Niveau</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition"
              >
                <option value="">Tous les niveaux</option>
                {availableLevels.map(l => {
                  const count = students.filter(s =>
                    s.level === l && (selectedFiliere === '' || s.filiere === selectedFiliere)
                  ).length;
                  return <option key={l} value={l}>{l} ({count})</option>;
                })}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Rechercher</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 dark:text-blue-500" />
                <input
                  type="text"
                  placeholder="Nom, prénom ou matricule..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* En-tête liste */}
        <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Liste des étudiants{' '}
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              ({filteredAndSortedStudents.length} résultat{filteredAndSortedStudents.length > 1 ? 's' : ''})
            </span>
          </h3>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={toggleSort}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition border border-slate-200 dark:border-slate-700"
            >
              <ArrowUpDown className="w-4 h-4" />
              Tri {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </button>
            <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-3 py-1 rounded-full text-xs sm:text-sm border border-blue-100 dark:border-blue-800/50">
              {selectedFiliere || 'Toutes'} · {selectedLevel || 'Tous'}
            </span>
          </div>
        </motion.div>

        {/* ── MOBILE : cartes ─────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:hidden">
          {filteredAndSortedStudents.length === 0 ? (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900/50 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/60">
              Aucun étudiant trouvé pour ces critères
            </div>
          ) : (
            filteredAndSortedStudents.map((student) => (
              <div key={student.id} className="bg-white dark:bg-slate-900/50 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/60 shadow-sm p-5 space-y-3 hover:-translate-y-0.5 hover:shadow-md dark:shadow-none transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/40 rounded-full flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">
                      {student.firstName} {student.name}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{student.matricule}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${student.statut === 'Actif' ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                    {student.statut}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50">
                    {student.filiere}
                  </span>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                    {student.level}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800/60">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span className={`text-sm font-bold ${getMoyenneColor(student.moyenne)}`}>
                      {student.moyenne.toFixed(2)}/20
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${getAppreciationColor(student.appreciation)}`}>
                    {student.appreciation}
                  </span>
                </div>
              </div>
            ))
          )}
        </motion.div>

        {/* ── DESKTOP : tableau ───────────────────────────────────── */}
        <motion.div variants={itemVariants} className="hidden sm:block bg-white dark:bg-slate-900/50 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/60 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {filteredAndSortedStudents.length === 0 ? (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                Aucun étudiant trouvé pour ces critères
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700/60">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Étudiant</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Matricule</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Filière</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Niveau</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Moyenne</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Appréciation</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {filteredAndSortedStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-emerald-50 dark:bg-emerald-900/40 rounded-full flex items-center justify-center shrink-0">
                            <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">
                            {student.firstName} {student.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                          {student.matricule}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50">
                          {student.filiere}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{student.level}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                          <span className={`text-sm font-bold ${getMoyenneColor(student.moyenne)}`}>
                            {student.moyenne.toFixed(2)}/20
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full font-bold ${getAppreciationColor(student.appreciation)}`}>
                          {student.appreciation}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full font-bold ${student.statut === 'Actif' ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                          {student.statut}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}