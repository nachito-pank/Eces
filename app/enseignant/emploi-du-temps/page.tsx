'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Download, Calendar, Clock, MapPin, BookOpen, Search } from 'lucide-react';

interface Cours {
  jour: string;
  heureDebut: string;
  heureFin: string;
  matiere: string;
  salle: string;
  professeur: string;
}

interface EmploiDuTemps {
  id: string;
  niveau: string;
  filiere: string;
  code: string;
  cours: Cours[];
}

const JOURS_ORDRE = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const JOUR_COLORS: Record<string, string> = {
  Lundi: 'bg-blue-50 border-blue-200',
  Mardi: 'bg-purple-50 border-purple-200',
  Mercredi: 'bg-emerald-50 border-emerald-200',
  Jeudi: 'bg-orange-50 border-orange-200',
  Vendredi: 'bg-rose-50 border-rose-200',
  Samedi: 'bg-yellow-50 border-yellow-200',
  Dimanche: 'bg-slate-50 border-slate-200',
};

const JOUR_TEXT_COLORS: Record<string, string> = {
  Lundi: 'text-blue-700 bg-blue-100',
  Mardi: 'text-purple-700 bg-purple-100',
  Mercredi: 'text-emerald-700 bg-emerald-100',
  Jeudi: 'text-orange-700 bg-orange-100',
  Vendredi: 'text-rose-700 bg-rose-100',
  Samedi: 'text-yellow-700 bg-yellow-100',
  Dimanche: 'text-slate-700 bg-slate-100',
};

export default function EmploiDuTemps() {
  const [emplois, setEmplois] = useState<EmploiDuTemps[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFiliere, setSelectedFiliere] = useState('');
  const [selectedNiveau, setSelectedNiveau] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filieres, setFilieres] = useState<string[]>([]);
  const [niveaux, setNiveaux] = useState<string[]>([]);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchEmplois();
  }, []);

  const fetchEmplois = async () => {
    try {
      const res = await fetch('/api/enseignant/emploi-du-temps');
      const data = await res.json();
      if (data.success) {
        setEmplois(data.data);
        const uniqueFilieres = [...new Set(data.data.map((e: EmploiDuTemps) => e.filiere))].sort() as string[];
        const uniqueNiveaux = [...new Set(data.data.map((e: EmploiDuTemps) => e.niveau))].sort() as string[];
        setFilieres(uniqueFilieres);
        setNiveaux(uniqueNiveaux);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiliereChange = (filiere: string) => {
    setSelectedFiliere(filiere);
    setSelectedNiveau('');
  };

  const availableNiveaux = React.useMemo(() => {
    if (!selectedFiliere) return niveaux;
    return [...new Set(
      emplois.filter(e => e.filiere === selectedFiliere).map(e => e.niveau)
    )].sort() as string[];
  }, [emplois, selectedFiliere, niveaux]);

  const filteredEmplois = React.useMemo(() => {
    return emplois.filter(e =>
      (selectedFiliere === '' || e.filiere === selectedFiliere) &&
      (selectedNiveau === '' || e.niveau === selectedNiveau) &&
      (e.filiere.toLowerCase().includes(searchTerm.toLowerCase()) ||
       e.niveau.toLowerCase().includes(searchTerm.toLowerCase()) ||
       e.cours.some(c => c.matiere.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  }, [emplois, selectedFiliere, selectedNiveau, searchTerm]);

  // Grouper les cours par jour pour un emploi du temps
  const getCoursByJour = (cours: Cours[]) => {
    const grouped: Record<string, Cours[]> = {};
    cours.forEach(c => {
      if (!grouped[c.jour]) grouped[c.jour] = [];
      grouped[c.jour].push(c);
    });
    // Trier par heure
    Object.keys(grouped).forEach(jour => {
      grouped[jour].sort((a, b) => a.heureDebut.localeCompare(b.heureDebut));
    });
    return grouped;
  };

  const handleDownloadPDF = async (emploi: EmploiDuTemps) => {
    setDownloading(true);
    try {
      // Générer le HTML de l'emploi du temps
      const coursByJour = getCoursByJour(emploi.cours);
      const joursDisponibles = JOURS_ORDRE.filter(j => coursByJour[j]);

      const htmlContent = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <title>Emploi du Temps - ${emploi.filiere} ${emploi.niveau}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; padding: 30px; color: #1e293b; background: #f8fafc; }
            .header { text-align: center; margin-bottom: 30px; padding: 20px; background: #1e40af; color: white; border-radius: 12px; }
            .header h1 { font-size: 22px; font-weight: bold; margin-bottom: 6px; }
            .header p { font-size: 14px; opacity: 0.85; }
            .header .badges { display: flex; justify-content: center; gap: 10px; margin-top: 10px; }
            .badge { background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
            .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
            .jour-card { background: white; border-radius: 10px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
            .jour-header { padding: 10px 16px; font-weight: bold; font-size: 14px; }
            .cours-item { padding: 12px 16px; border-top: 1px solid #f1f5f9; }
            .cours-matiere { font-weight: bold; font-size: 13px; color: #1e293b; margin-bottom: 6px; }
            .cours-info { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #64748b; margin-bottom: 3px; }
            .icon { width: 12px; height: 12px; }
            .footer { text-align: center; margin-top: 24px; font-size: 11px; color: #94a3b8; }
            .total { background: white; border-radius: 10px; padding: 12px 20px; margin-bottom: 20px; border: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
            .total span { font-size: 13px; color: #64748b; }
            .total strong { font-size: 16px; color: #1e40af; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📅 Emploi du Temps</h1>
            <p>Année Académique 2025-2026</p>
            <div class="badges">
              <span class="badge">${emploi.filiere}</span>
              <span class="badge">${emploi.niveau}</span>
              <span class="badge">Code: ${emploi.code}</span>
            </div>
          </div>

          <div class="total">
            <span>Total des cours par semaine</span>
            <strong>${emploi.cours.length} séances</strong>
          </div>

          <div class="grid">
            ${joursDisponibles.map(jour => `
              <div class="jour-card">
                <div class="jour-header" style="background: ${
                  jour === 'Lundi' ? '#dbeafe; color: #1d4ed8' :
                  jour === 'Mardi' ? '#ede9fe; color: #7c3aed' :
                  jour === 'Mercredi' ? '#d1fae5; color: #065f46' :
                  jour === 'Jeudi' ? '#ffedd5; color: #c2410c' :
                  jour === 'Vendredi' ? '#ffe4e6; color: #be123c' :
                  jour === 'Samedi' ? '#fef9c3; color: #854d0e' :
                  '#f1f5f9; color: #475569'
                }">
                  ${jour}
                </div>
                ${coursByJour[jour].map(cours => `
                  <div class="cours-item">
                    <div class="cours-matiere">${cours.matiere}</div>
                    <div class="cours-info">🕐 ${cours.heureDebut} – ${cours.heureFin}</div>
                    <div class="cours-info">📍 ${cours.salle}</div>
                    <div class="cours-info">👤 ${cours.professeur}</div>
                  </div>
                `).join('')}
              </div>
            `).join('')}
          </div>

          <div class="footer">
            Généré le ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} — ECES
          </div>
        </body>
        </html>
      `;

      // Ouvrir dans une nouvelle fenêtre et imprimer en PDF
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      }
    } catch (error) {
      console.error('Erreur téléchargement:', error);
      alert('Erreur lors du téléchargement');
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadAll = () => {
    if (filteredEmplois.length === 0) return;
    filteredEmplois.forEach((emploi, index) => {
      setTimeout(() => handleDownloadPDF(emploi), index * 800);
    });
  };

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
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Emploi du Temps</h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">
              Consultez et téléchargez les emplois du temps par filière et niveau
            </p>
          </div>
          <button
            onClick={handleDownloadAll}
            disabled={filteredEmplois.length === 0 || downloading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-800 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl font-medium text-sm transition w-full sm:w-auto justify-center"
          >
            <Download className="w-4 h-4" />
            {downloading ? 'Génération...' : `Tout télécharger (${filteredEmplois.length})`}
          </button>
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
                <option value="">Toutes les filières</option>
                {filieres.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Niveau</label>
              <select
                value={selectedNiveau}
                onChange={(e) => setSelectedNiveau(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Tous les niveaux</option>
                {availableNiveaux.map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Rechercher</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filière, niveau ou matière..."
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
            Emplois du temps
            <span className="ml-2 text-sm font-normal text-slate-500">
              ({filteredEmplois.length} résultat{filteredEmplois.length > 1 ? 's' : ''})
            </span>
          </h3>
          <span className="text-xs font-medium bg-slate-200 text-slate-700 px-3 py-1 rounded-full">
            {selectedFiliere || 'Toutes'} · {selectedNiveau || 'Tous'}
          </span>
        </div>

        {/* Liste des emplois du temps */}
        {filteredEmplois.length === 0 ? (
          <div className="text-center py-16 text-slate-500 bg-white rounded-2xl border border-slate-200">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p>Aucun emploi du temps trouvé</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredEmplois.map((emploi) => {
              const coursByJour = getCoursByJour(emploi.cours);
              const joursDisponibles = JOURS_ORDRE.filter(j => coursByJour[j]);

              return (
                <div key={emploi.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                  {/* En-tête de la carte */}
                  <div className="bg-blue-800 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-white text-sm sm:text-base truncate">{emploi.filiere}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">{emploi.niveau}</span>
                          <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">Code: {emploi.code}</span>
                          <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">{emploi.cours.length} séances/semaine</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownloadPDF(emploi)}
                      disabled={downloading}
                      className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-blue-50 text-blue-800 rounded-xl font-medium text-sm transition shrink-0 w-full sm:w-auto justify-center"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger PDF
                    </button>
                  </div>

                  {/* Grille des jours */}
                  <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {joursDisponibles.map(jour => (
                        <div
                          key={jour}
                          className={`rounded-xl border p-3 ${JOUR_COLORS[jour] || 'bg-slate-50 border-slate-200'}`}
                        >
                          {/* Header du jour */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${JOUR_TEXT_COLORS[jour] || 'text-slate-700 bg-slate-100'}`}>
                              {jour}
                            </span>
                            <span className="text-xs text-slate-400">
                              {coursByJour[jour].length} cours
                            </span>
                          </div>

                          {/* Cours du jour */}
                          <div className="space-y-2">
                            {coursByJour[jour].map((cours, idx) => (
                              <div key={idx} className="bg-white rounded-lg p-3 shadow-sm border border-white/80">
                                <p className="font-semibold text-slate-800 text-xs leading-tight mb-2">
                                  {cours.matiere}
                                </p>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1 text-xs text-slate-500">
                                    <Clock className="w-3 h-3 shrink-0" />
                                    <span>{cours.heureDebut} – {cours.heureFin}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-slate-500">
                                    <MapPin className="w-3 h-3 shrink-0" />
                                    <span>{cours.salle}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-slate-500">
                                    <BookOpen className="w-3 h-3 shrink-0" />
                                    <span className="truncate">{cours.professeur}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}