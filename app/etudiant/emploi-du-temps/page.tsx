"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BookOpen, Calendar, FileText, Clock, Download, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface EmploiDuTemps {
  id: string
  name: string
  type: 'cours' | 'sessions'
  filiere: string
  niveau: string
  url: string
  uploadDate: string
  fileSize: number
  fileType: string
}

export default function EmploiDuTempsEtudiantPage() {
  const [emploisDuTemps, setEmploisDuTemps] = useState<EmploiDuTemps[]>([])
  const [filteredEdts, setFilteredEdts] = useState<EmploiDuTemps[]>([])
  const [selectedFiliere, setSelectedFiliere] = useState<string>('tous')
  const [selectedNiveau, setSelectedNiveau] = useState<string>('tous')
  const [selectedType, setSelectedType] = useState<string>('tous')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEmploisDuTemps()
  }, [])

  useEffect(() => {
    filterEmploisDuTemps()
  }, [emploisDuTemps, selectedFiliere, selectedNiveau, selectedType])

  const fetchEmploisDuTemps = async () => {
    try {
      const response = await fetch('/api/emploi-du-temps')
      const data = await response.json()
      if (data.success) {
        setEmploisDuTemps(data.data)
      }
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterEmploisDuTemps = () => {
    let filtered = emploisDuTemps

    if (selectedFiliere !== 'tous') {
      filtered = filtered.filter(edt => edt.filiere === selectedFiliere)
    }

    if (selectedNiveau !== 'tous') {
      filtered = filtered.filter(edt => edt.niveau === selectedNiveau)
    }

    if (selectedType !== 'tous') {
      filtered = filtered.filter(edt => edt.type === selectedType)
    }

    setFilteredEdts(filtered)
  }

  const filieres = Array.from(new Set(emploisDuTemps.map(edt => edt.filiere)))
  const niveaux = Array.from(new Set(emploisDuTemps.map(edt => edt.niveau)))

  const formatFileSize = (bytes: number) => {
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (loading) {
    return (
      <main className="w-full p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des emplois du temps...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="w-full p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Emploi du temps</h1>
              <p className="text-gray-600 mt-1">
                Consultez les emplois du temps disponibles pour votre filière et niveau
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-500">
                {filteredEdts.length} résultat{filteredEdts.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filtres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filière</label>
                  <select
                    value={selectedFiliere}
                    onChange={(e) => setSelectedFiliere(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="tous">Toutes les filières</option>
                    {filieres.map(filiere => (
                      <option key={filiere} value={filiere}>{filiere}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Niveau</label>
                  <select
                    value={selectedNiveau}
                    onChange={(e) => setSelectedNiveau(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="tous">Tous les niveaux</option>
                    {niveaux.map(niveau => (
                      <option key={niveau} value={niveau}>{niveau}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="tous">Tous les types</option>
                    <option value="cours">Cours</option>
                    <option value="sessions">Sessions</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {filteredEdts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEdts.map((edt, index) => (
                <motion.div
                  key={edt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-0">
                      <div className="relative">
                        {/* Preview */}
                        <div className="h-48 bg-gray-50 flex items-center justify-center">
                          {edt.fileType === 'application/pdf' ? (
                            <div className="text-center">
                              <FileText className="h-16 w-16 text-red-500 mb-2" />
                              <p className="text-sm text-gray-600">PDF</p>
                            </div>
                          ) : (
                            <img 
                              src={edt.url} 
                              alt="Preview" 
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            {edt.type === 'cours' ? (
                              <BookOpen className="h-4 w-4 text-blue-600" />
                            ) : (
                              <Calendar className="h-4 w-4 text-orange-600" />
                            )}
                            <span className="text-sm font-medium text-gray-900">
                              {edt.type === 'cours' ? 'Cours' : 'Sessions'}
                            </span>
                          </div>
                          
                          <div className="mb-3">
                            <div className="flex gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {edt.filiere}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {edt.niveau}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium text-gray-900 mb-1 truncate">
                              {edt.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(edt.fileSize)}
                            </p>
                          </div>

                          <Button
                            className="w-full"
                            onClick={() => window.open(edt.url, '_blank')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucun emploi du temps trouvé
                </h3>
                <p className="text-gray-600">
                  {emploisDuTemps.length === 0 
                    ? "Aucun emploi du temps n'a été publié pour le moment."
                    : "Essayez de modifier les filres pour voir plus de résultats."
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </main>
  )
}
