'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Search, ArrowUpDown, User, BookOpen, Award } from 'lucide-react';

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
      case 'Excellent': return 'bg-emerald-100 text-emerald-700';
      case 'Très Bien': return 'bg-blue-100 text-blue-700';
      case 'Bien': return 'bg-sky-100 text-sky-700';
      case 'Assez Bien': return 'bg-yellow-100 text-yellow-700';
      case 'Passable': return 'bg-orange-100 text-orange-700';
      case 'Insuffisant': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getMoyenneColor = (moyenne: number) => {
    if (moyenne >= 16) return 'text-emerald-600';
    if (moyenne >= 14) return 'text-blue-600';
    if (moyenne >= 12) return 'text-sky-600';
    if (moyenne >= 10) return 'text-orange-500';
    return 'text-red-500';
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center text-slate-500">Chargement...</div>
    </div>
  );

  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mr-6 mx-auto space-y-6 sm:space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Mes Étudiants</h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">
              Consultez la liste des étudiants par filière et niveau
            </p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
          </div>
        </div>

        {/* Filtres */}
        <Card className="p-4 sm:p-6 bg-white border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* En-tête liste */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-800">
            Liste des étudiants
            <span className="ml-2 text-sm font-normal text-slate-500">
              ({filteredAndSortedStudents.length} résultat{filteredAndSortedStudents.length > 1 ? 's' : ''})
            </span>
          </h3>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={toggleSort}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            >
              <ArrowUpDown className="w-4 h-4" />
              Tri {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </button>
            <span className="text-xs font-medium bg-slate-200 text-slate-700 px-3 py-1 rounded-full">
              {selectedFiliere || 'Toutes'} · {selectedLevel || 'Tous'}
            </span>
          </div>
        </div>

        {/* ── MOBILE : cartes ─────────────────────────────────────── */}
        <div className="flex flex-col gap-3 sm:hidden">
          {filteredAndSortedStudents.length === 0 ? (
            <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-200">
              Aucun étudiant trouvé pour ces critères
            </div>
          ) : (
            filteredAndSortedStudents.map((student) => (
              <div key={student.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900 text-sm">
                      {student.firstName} {student.name}
                    </p>
                    <p className="text-xs text-slate-400">{student.matricule}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${student.statut === 'Actif' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                    {student.statut}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-blue-100 text-blue-700 text-xs">{student.filiere}</Badge>
                  <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                    {student.level}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span className={`text-sm font-bold ${getMoyenneColor(student.moyenne)}`}>
                      {student.moyenne.toFixed(2)}/20
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getAppreciationColor(student.appreciation)}`}>
                    {student.appreciation}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── DESKTOP : tableau ───────────────────────────────────── */}
        <Card className="hidden sm:block bg-white border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            {filteredAndSortedStudents.length === 0 ? (
              <div className="p-8 text-center text-slate-600">
                Aucun étudiant trouvé pour ces critères
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Étudiant</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Matricule</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Filière</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Niveau</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Moyenne</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Appréciation</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredAndSortedStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                            <User className="w-4 h-4 text-emerald-600" />
                          </div>
                          <span className="text-sm font-medium text-slate-900">
                            {student.firstName} {student.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
                          {student.matricule}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-blue-100 text-blue-700 text-xs">{student.filiere}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-900">{student.level}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-slate-400" />
                          <span className={`text-sm font-bold ${getMoyenneColor(student.moyenne)}`}>
                            {student.moyenne.toFixed(2)}/20
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getAppreciationColor(student.appreciation)}`}>
                          {student.appreciation}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${student.statut === 'Actif' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                          {student.statut}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>

      </div>
    </div>
  );
}