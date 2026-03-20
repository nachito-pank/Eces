'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Search, Eye, Download, File, BookOpenText, ArrowLeft, X } from 'lucide-react';
import { motion, type Variants } from "framer-motion";

interface Course {
  id: number;
  title: string;
  filiere: string;
  level: string;
  volume: string;
  url?: string;
  fileName?: string;
}

interface FormData {
  title: string;
  filiere: string;
  level: string;
  volume: string;
  url: string;
  fileName: string;
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

export default function MesCours() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFiliere, setSelectedFiliere] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filieres, setFilieres] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [viewingCourse, setViewingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    filiere: '',
    level: '',
    volume: '',
    url: '',
    fileName: '',
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/enseignant/cours');
      const data = await res.json();
      if (data.success) {
        setCourses(data.data);
        const uniqueFilieres = [...new Set(data.data.map((c: Course) => c.filiere))];
        const uniqueLevels = [...new Set(data.data.map((c: Course) => c.level))];
        setFilieres(uniqueFilieres as string[]);
        setLevels(uniqueLevels as string[]);
        if (uniqueFilieres.length > 0) setSelectedFiliere(uniqueFilieres[0] as string);
        if (uniqueLevels.length > 0) setSelectedLevel(uniqueLevels[0] as string);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({
          ...prev,
          url: reader.result as string,
          fileName: selectedFile.name,
        }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.filiere || !formData.level || !formData.volume) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    try {
      if (editingId) {
        const res = await fetch(`/api/enseignant/cours/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setCourses(courses.map(c => c.id === editingId ? { ...c, ...formData } : c));
          alert('Cours modifié avec succès!');
        }
      } else {
        const res = await fetch('/api/enseignant/cours', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const data = await res.json();
          setCourses([...courses, { ...data.data, url: formData.url, fileName: formData.fileName }]);
          alert('Cours ajouté avec succès!');
        }
      }
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Erreur:', error);
      alert("Erreur lors de l'opération");
    }
  };

  const handleEdit = (course: Course) => {
    setFormData({
      title: course.title,
      filiere: course.filiere,
      level: course.level,
      volume: course.volume,
      url: course.url || '',
      fileName: course.fileName || '',
    });
    setEditingId(course.id);
    setFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce cours?')) return;
    try {
      const res = await fetch(`/api/enseignant/cours/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCourses(courses.filter(c => c.id !== id));
        alert('Cours supprimé avec succès!');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const handleDownload = (course: Course) => {
    if (course.url) {
      const a = document.createElement('a');
      a.href = course.url;
      a.download = course.fileName || 'fichier';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', filiere: '', level: '', volume: '', url: '', fileName: '' });
    setEditingId(null);
    setFile(null);
  };

  const filteredCourses = React.useMemo(() => {
    return courses.filter(c =>
      (!selectedFiliere || c.filiere === selectedFiliere) &&
      (!selectedLevel || c.level === selectedLevel) &&
      c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [courses, selectedFiliere, selectedLevel, searchTerm]);

  if (loading) return (
    <div className="p-20 text-center text-slate-500 dark:text-slate-400">Chargement...</div>
  );

  // ─── VUE COURS ───────────────────────────────────────────────────────────────
  if (viewingCourse) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">

        {/* Barre navigation viewer */}
        <div className="bg-white dark:bg-slate-900/50 border-b border-slate-200/50 dark:border-slate-800/60 px-4 py-3 flex items-center justify-between gap-4 flex-wrap shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setViewingCourse(null)}
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 font-medium transition shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Retour</span>
            </button>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 hidden sm:block" />
            <div className="min-w-0">
              <p className="font-bold text-slate-900 dark:text-white truncate text-sm sm:text-base">{viewingCourse.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{viewingCourse.filiere} · {viewingCourse.level} · {viewingCourse.volume}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleDownload(viewingCourse)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-400 text-sm font-medium transition"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Télécharger</span>
            </button>
            <button
              onClick={() => setViewingCourse(null)}
              className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenu */}
        <div className="flex-1 p-2 sm:p-4">
          {viewingCourse.url ? (
            viewingCourse.url.startsWith('data:application/pdf') || viewingCourse.fileName?.endsWith('.pdf') ? (
              <div className="relative w-full">
                <iframe
                  src={viewingCourse.url}
                  className="w-full rounded-[1.5rem] border border-slate-200/50 dark:border-slate-800/60 shadow"
                  style={{ height: 'calc(100vh - 200px)' }}
                  title={viewingCourse.title}
                />
                <button
                  onClick={() => setViewingCourse(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white dark:bg-slate-800 shadow-md hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-500 dark:text-slate-400 hover:text-red-500 transition"
                  title="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : viewingCourse.url.startsWith('data:image') ? (
              <div className="relative flex items-center justify-center">
                <img
                  src={viewingCourse.url}
                  alt={viewingCourse.title}
                  className="max-w-full max-h-screen rounded-[1.5rem] shadow-lg"
                />
                <button
                  onClick={() => setViewingCourse(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white dark:bg-slate-800 shadow-md hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-500 dark:text-slate-400 hover:text-red-500 transition"
                  title="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-6 py-20">
                <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center">
                  <File className="w-12 h-12 text-blue-400 dark:text-blue-500" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-slate-800 dark:text-white mb-1">{viewingCourse.fileName || viewingCourse.title}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                    Ce type de fichier ne peut pas être prévisualisé directement.<br />
                    Téléchargez-le pour l'ouvrir.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleDownload(viewingCourse)}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white font-medium transition shadow-md hover:shadow-lg"
                    >
                      <Download className="w-5 h-5" />
                      Télécharger le fichier
                    </button>
                    <button
                      onClick={() => setViewingCourse(null)}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium transition"
                    >
                      <X className="w-5 h-5" />
                      Fermer
                    </button>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-20 text-slate-400 dark:text-slate-500">
              <File className="w-16 h-16 mb-4" />
              <p className="text-lg font-medium">Aucun fichier disponible</p>
              <button
                onClick={() => setViewingCourse(null)}
                className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Retour à la liste
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── VUE LISTE ───────────────────────────────────────────────────────────────
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full p-3 sm:p-0 space-y-8"
    >
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">

        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Mes Cours</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Gérez les cours que vous dispensez cette année</p>
          </div>
          <button
            onClick={() => { resetForm(); setShowModal(true); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white font-bold text-sm transition shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
          >
            <Plus className="w-4 h-4" />
            Ajouter un cours
          </button>
        </motion.div>

        {/* Filtres */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/60 rounded-[2rem] p-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Filière</label>
              <select
                value={selectedFiliere}
                onChange={(e) => setSelectedFiliere(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition"
              >
                <option value="">Toutes</option>
                {filieres.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Niveau</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition"
              >
                <option value="">Tous</option>
                {levels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Rechercher</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 dark:text-blue-500" />
                <input
                  type="text"
                  placeholder="Rechercher un cours..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Badge résumé */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Liste des cours <span className="text-slate-500 dark:text-slate-400 font-medium">({filteredCourses.length})</span>
          </h3>
          <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-3 py-1 rounded-full text-xs sm:text-sm border border-blue-100 dark:border-blue-800/50">
            {selectedFiliere || 'Toutes'} · {selectedLevel || 'Tous'}
          </span>
        </motion.div>

        {/* ── MOBILE : cartes ─────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:hidden">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">Aucun cours trouvé</div>
          ) : (
            filteredCourses.map((course) => (
              <div key={course.id} className="bg-white dark:bg-slate-900/50 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/60 shadow-sm p-5 space-y-3 hover:-translate-y-0.5 hover:shadow-md dark:shadow-none transition-all duration-300">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-slate-800 dark:text-white text-base leading-tight">{course.title}</p>
                  <span className="inline-block px-2 py-0.5 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold shrink-0 border border-blue-100 dark:border-blue-800/50">
                    {course.filiere}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <span>Niveau : <strong className="text-slate-700 dark:text-slate-300">{course.level}</strong></span>
                  <span>Volume : <strong className="text-slate-700 dark:text-slate-300">{course.volume}</strong></span>
                </div>
                {course.fileName && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <File className="w-3 h-3" /> {course.fileName}
                  </p>
                )}
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <button
                    onClick={() => setViewingCourse(course)}
                    disabled={!course.url}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition ${course.url ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'}`}
                  >
                    <Eye className="w-3.5 h-3.5" /> Voir
                  </button>
                  <button
                    onClick={() => handleDownload(course)}
                    disabled={!course.url}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition ${course.url ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'}`}
                  >
                    <Download className="w-3.5 h-3.5" /> Télécharger
                  </button>
                  <button
                    onClick={() => handleEdit(course)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Supprimer
                  </button>
                </div>
              </div>
            ))
          )}
        </motion.div>

        {/* ── DESKTOP : tableau ───────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="hidden sm:block bg-white dark:bg-slate-900/50 rounded-[2rem] shadow-sm border border-slate-200/50 dark:border-slate-800/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700/60">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Intitulé du cours</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Filière</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Niveau</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Volume</th>
                  <th className="px-6 py-4 text-right font-semibold text-slate-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredCourses.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                      Aucun cours trouvé
                    </td>
                  </tr>
                ) : (
                  filteredCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800 dark:text-white">{course.title}</p>
                        {course.fileName && (
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1">
                            <File className="w-3 h-3" /> {course.fileName}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full text-sm font-bold border border-blue-100 dark:border-blue-800/50">
                          {course.filiere}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{course.level}</td>
                      <td className="px-6 py-4 font-bold text-slate-600 dark:text-slate-300">{course.volume}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setViewingCourse(course)}
                            disabled={!course.url}
                            className={`p-2 rounded-xl transition ${course.url ? 'hover:bg-blue-50 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'}`}
                            title={course.url ? 'Voir le cours' : 'Aucun fichier'}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDownload(course)}
                            disabled={!course.url}
                            className={`p-2 rounded-xl transition ${course.url ? 'hover:bg-emerald-50 dark:hover:bg-emerald-900/40 text-emerald-500 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'}`}
                            title={course.url ? 'Télécharger' : 'Aucun fichier'}
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(course)}
                            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition"
                            title="Modifier"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(course.id)}
                            className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 text-red-400 dark:text-red-500 hover:text-red-600 dark:hover:text-red-400 transition"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>

      {/* ── MODAL ─────────────────────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 rounded-t-[2rem] sm:rounded-[2rem] shadow-xl w-full sm:max-w-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {editingId ? 'Modifier le cours' : 'Ajouter un cours'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Intitulé du cours *</label>
                <input
                  type="text"
                  placeholder="ex: Algorithmique et structures de données"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm transition"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Filière *</label>
                  <select
                    value={formData.filiere}
                    onChange={(e) => setFormData({ ...formData, filiere: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm transition"
                    required
                  >
                    <option value="">Choisir</option>
                    {filieres.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Niveau *</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm transition"
                    required
                  >
                    <option value="">Choisir</option>
                    {levels.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Fichier du cours</label>
                {formData.fileName && !file && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-1">
                    <File className="w-3 h-3" /> Fichier actuel : <span className="font-medium">{formData.fileName}</span>
                  </p>
                )}
                <div className="relative">
                  <File className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 dark:text-blue-500" />
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    onChange={handleFileChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm transition file:mr-3 file:text-sm file:font-medium file:border-0 file:bg-transparent file:text-slate-600 dark:file:text-slate-300"
                  />
                </div>
                {file && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1.5 flex items-center gap-1">
                    ✓ Sélectionné : <span className="font-medium">{file.name}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Volume de pages *</label>
                <div className="relative">
                  <BookOpenText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 dark:text-blue-500" />
                  <input
                    type="text"
                    placeholder="ex: 19 pages"
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm transition"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium transition text-sm"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white font-bold text-sm transition shadow-md hover:shadow-lg"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}