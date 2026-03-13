'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, Search, User, Calculator } from 'lucide-react';

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

  // Quand on change de filière → reset le niveau
  const handleFiliereChange = (filiere: string) => {
    setSelectedFiliere(filiere);
    setSelectedLevel('');
  };

  // Niveaux disponibles selon la filière sélectionnée
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
    if (grade >= 16) return { label: 'Excellent', color: 'bg-emerald-100 text-emerald-700' };
    if (grade >= 14) return { label: 'Très bien', color: 'bg-blue-100 text-blue-700' };
    if (grade >= 12) return { label: 'Bien', color: 'bg-sky-100 text-sky-700' };
    if (grade >= 10) return { label: 'Assez bien', color: 'bg-yellow-100 text-yellow-700' };
    return { label: 'Insuffisant', color: 'bg-red-100 text-red-600' };
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return 'text-emerald-600';
    if (grade >= 14) return 'text-blue-600';
    if (grade >= 12) return 'text-sky-600';
    if (grade >= 10) return 'text-orange-500';
    return 'text-red-500';
  };

  const average = filteredStudents.length > 0
    ? filteredStudents.reduce((acc, s) => acc + getStudentGrade(s.id), 0) / filteredStudents.length
    : 0;

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center text-slate-500">Chargement...</div>
    </div>
  );

  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mr-6 mx-auto space-y-6 sm:space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Notes Devoirs</h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">
              Saisissez et modifiez les notes des devoirs par étudiant
            </p>
          </div>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Save className="w-4 h-4" />
            Enregistrer tout
          </Button>
        </div>

        {/* Filtres */}
        <Card className="p-4 sm:p-6 bg-white border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Filière */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Filière</label>
              <select
                value={selectedFiliere}
                onChange={(e) => handleFiliereChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Toutes les filières ({students.length})</option>
                {filieres.map(f => {
                  const count = students.filter(s => s.filiere === f).length;
                  return <option key={f} value={f}>{f} ({count})</option>;
                })}
              </select>
            </div>

            {/* Niveau */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Niveau</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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

            {/* Recherche */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Rechercher</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Nom, prénom ou matricule..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Badge résumé */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-800">
            Liste des étudiants
            <span className="ml-2 text-sm font-normal text-slate-500">
              ({filteredStudents.length} résultat{filteredStudents.length > 1 ? 's' : ''})
            </span>
          </h3>
          <span className="text-xs font-medium bg-slate-200 text-slate-700 px-3 py-1 rounded-full">
            {selectedFiliere || 'Toutes'} · {selectedLevel || 'Tous'}
          </span>
        </div>

        {/* ── MOBILE : cartes ─────────────────────────────────────── */}
        <div className="flex flex-col gap-3 sm:hidden">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-200">
              Aucun étudiant trouvé
            </div>
          ) : (
            filteredStudents.map(student => {
              const grade = getStudentGrade(student.id);
              const appreciation = getAppreciation(grade);
              return (
                <div key={student.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900 text-sm">
                        {student.firstName} {student.name}
                      </p>
                      {student.matricule && (
                        <p className="text-xs text-slate-400 font-mono">{student.matricule}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                      {student.filiere}
                    </span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                      {student.level}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-slate-500 font-medium">Note :</label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.5"
                        value={grade || ''}
                        onChange={(e) => handleGradeChange(student.id, e.target.value)}
                        placeholder="0"
                        className="w-16 px-2 py-1 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-center"
                      />
                      <span className="text-xs text-slate-400">/20</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${appreciation.color}`}>
                      {appreciation.label}
                    </span>
                  </div>
                </div>
              );
            })
          )}

          {/* Moyenne mobile */}
          {filteredStudents.length > 0 && (
            <div className="bg-white rounded-2xl border border-blue-200 p-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-600">Moyenne de la classe</span>
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-blue-600" />
                <span className={`text-lg font-bold ${getGradeColor(average)}`}>
                  {average.toFixed(2)}/20
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ── DESKTOP : tableau ───────────────────────────────────── */}
        <Card className="hidden sm:block bg-white border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Étudiant</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Filière</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Niveau</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Note / 20</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Appréciation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-600">
                      Aucun étudiant trouvé
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map(student => {
                    const grade = getStudentGrade(student.id);
                    const appreciation = getAppreciation(grade);
                    return (
                      <tr key={student.id} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">
                                {student.firstName} {student.name}
                              </p>
                              {student.matricule && (
                                <p className="text-xs text-slate-400 font-mono">{student.matricule}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                            {student.filiere}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-slate-900">{student.level}</span>
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
                            className={`w-20 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-center ${getGradeColor(grade)}`}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${appreciation.color}`}>
                            {appreciation.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              <tfoot className="bg-slate-50 border-t border-slate-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Moyenne de la classe
                  </td>
                  <td colSpan={2} />
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-blue-600" />
                      <span className={`font-bold ${getGradeColor(average)}`}>
                        {average.toFixed(2)}/20
                      </span>
                    </div>
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>

      </div>
    </div>
  );
}