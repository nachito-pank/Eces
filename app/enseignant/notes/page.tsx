'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import { Save, Search, User, Calculator } from 'lucide-react';
import { motion, type Variants } from "framer-motion";

interface Grade {
  studentId: string;
  studentName: string;
  grade: number;
  gradeSession: number;
}

interface Student {
  id: string;
  firstName: string;
  name: string;
  filiere: string;
  level: string;
  matricule: string;
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

export default function NotesDevoirs() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFiliere, setSelectedFiliere] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filieres, setFilieres] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [gradesRes, studentsRes] = await Promise.all([
        fetch('/api/enseignant/notes'),
        fetch('/api/enseignant/etudiants'),
      ]);

      const gradesData = await gradesRes.json();
      const studentsData = await studentsRes.json();

      if (gradesData.success) setGrades(gradesData.data);
      if (studentsData.success) {
        setStudents(studentsData.data);
        const uniqueFilieres = [...new Set(studentsData.data.map((s: Student) => s.filiere))].sort() as string[];
        const uniqueLevels = [...new Set(studentsData.data.map((s: Student) => s.level))].sort() as string[];
        setFilieres(uniqueFilieres);
        setLevels(uniqueLevels);
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

  const getStudentGrade = (studentId: string) => {
    const found = grades.find(g => g.studentId === studentId);
    return found ? found.grade : 0;
  };

  const handleGradeChange = (studentId: string, value: string) => {
    const numValue = parseFloat(value.replace(',', '.')) || 0;
    if (numValue < 0 || numValue > 20) return;

    setGrades(prev => {
      const existing = prev.find(g => g.studentId === studentId);
      if (existing) {
        return prev.map(g => g.studentId === studentId ? { ...g, grade: numValue } : g);
      }
      const student = students.find(s => s.id === studentId);
      if (student) {
        return [...prev, {
          studentId,
          studentName: `${student.firstName} ${student.name}`,
          grade: numValue,
          gradeSession: 0,
        }];
      }
      return prev;
    });
  };

  const handleSave = async () => {
    try {
      for (const grade of grades) {
        await fetch('/api/enseignant/notes', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentId: grade.studentId, grade: grade.grade }),
        });
      }
      alert('Notes enregistrées avec succès!');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const filteredStudents = React.useMemo(() => {
    return students.filter(s =>
      (selectedFiliere === '' || s.filiere === selectedFiliere) &&
      (selectedLevel === '' || s.level === selectedLevel) &&
      (s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       (s.matricule && s.matricule.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  }, [students, selectedFiliere, selectedLevel, searchTerm]);

  const getAppreciation = (grade: number) => {
    if (grade >= 16) return { label: 'Excellent', color: 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400' };
    if (grade >= 14) return { label: 'Très bien', color: 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400' };
    if (grade >= 12) return { label: 'Bien', color: 'bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-400' };
    if (grade >= 10) return { label: 'Assez bien', color: 'bg-yellow-50 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400' };
    return { label: 'Insuffisant', color: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400' };
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return 'text-emerald-600 dark:text-emerald-400';
    if (grade >= 14) return 'text-blue-600 dark:text-blue-400';
    if (grade >= 12) return 'text-sky-600 dark:text-sky-400';
    if (grade >= 10) return 'text-orange-500 dark:text-orange-400';
    return 'text-red-500 dark:text-red-400';
  };

  const average = filteredStudents.length > 0
    ? filteredStudents.reduce((acc, s) => acc + getStudentGrade(s.id), 0) / filteredStudents.length
    : 0;

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
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Notes Devoirs</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Saisissez et modifiez les notes des devoirs par étudiant
            </p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 fixed bottom-6 right-6 z-10 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white font-bold text-sm transition shadow-md hover:shadow-lg justify-center"
          >
            <Save className="w-4 h-4" />
            Enregistrer tout
          </button>
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
                {filieres.map(f => (
                  <option key={f} value={f}>
                    {f} ({students.filter(s => s.filiere === f).length})
                  </option>
                ))}
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
                {availableLevels.map(l => (
                  <option key={l} value={l}>
                    {l} ({students.filter(s => s.level === l && (selectedFiliere === '' || s.filiere === selectedFiliere)).length})
                  </option>
                ))}
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

        {/* Badge résumé */}
        <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Liste des étudiants{' '}
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              ({filteredStudents.length} résultat{filteredStudents.length > 1 ? 's' : ''})
            </span>
          </h3>
          <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-3 py-1 rounded-full text-xs sm:text-sm border border-blue-100 dark:border-blue-800/50">
            {selectedFiliere || 'Toutes'} · {selectedLevel || 'Tous'}
          </span>
        </motion.div>

        {/* ── MOBILE : cartes ─────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:hidden">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900/50 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/60">
              Aucun étudiant trouvé
            </div>
          ) : (
            filteredStudents.map(student => {
              const grade = getStudentGrade(student.id);
              const appreciation = getAppreciation(grade);
              return (
                <div key={student.id} className="bg-white dark:bg-slate-900/50 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/60 shadow-sm p-5 space-y-3 hover:-translate-y-0.5 hover:shadow-md dark:shadow-none transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/40 rounded-full flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900 dark:text-white text-sm">
                        {student.firstName} {student.name}
                      </p>
                      {student.matricule && (
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">{student.matricule}</p>
                      )}
                    </div>
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
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Note :</label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.5"
                        value={grade || ''}
                        onChange={(e) => handleGradeChange(student.id, e.target.value)}
                        placeholder="0"
                        className={`w-16 px-2 py-1 text-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-slate-800 font-bold text-center transition ${getGradeColor(grade)}`}
                      />
                      <span className="text-xs text-slate-400 dark:text-slate-500">/20</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${appreciation.color}`}>
                      {appreciation.label}
                    </span>
                  </div>
                </div>
              );
            })
          )}

          {/* Moyenne mobile */}
          {filteredStudents.length > 0 && (
            <div className="bg-white dark:bg-slate-900/50 rounded-[2rem] border border-blue-100 dark:border-blue-800/50 p-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Moyenne de la classe</span>
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className={`text-lg font-extrabold ${getGradeColor(average)}`}>
                  {average.toFixed(2)}/20
                </span>
              </div>
            </div>
          )}
        </motion.div>

        {/* ── DESKTOP : tableau ───────────────────────────────────── */}
        <motion.div variants={itemVariants} className="hidden sm:block bg-white dark:bg-slate-900/50 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/60 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700/60">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Étudiant</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Filière</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Niveau</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Note / 20</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Appréciation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                      Aucun étudiant trouvé
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map(student => {
                    const grade = getStudentGrade(student.id);
                    const appreciation = getAppreciation(grade);
                    return (
                      <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/40 rounded-full flex items-center justify-center shrink-0">
                              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900 dark:text-white">
                                {student.firstName} {student.name}
                              </p>
                              {student.matricule && (
                                <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">{student.matricule}</p>
                              )}
                            </div>
                          </div>
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
                          <input
                            type="number"
                            min="0"
                            max="20"
                            step="0.5"
                            value={grade || ''}
                            onChange={(e) => handleGradeChange(student.id, e.target.value)}
                            placeholder="0"
                            className={`w-20 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-slate-800 font-bold text-center transition ${getGradeColor(grade)}`}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${appreciation.color}`}>
                            {appreciation.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              <tfoot className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700/60">
                <tr>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    Moyenne de la classe
                  </td>
                  <td colSpan={2} />
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className={`font-extrabold ${getGradeColor(average)}`}>
                        {average.toFixed(2)}/20
                      </span>
                    </div>
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}