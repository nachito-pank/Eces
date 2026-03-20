"use client"

import { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { 
  BookOpen, 
  CalendarDays, 
  Upload, 
  Eye, 
  Send, 
  X, 
  FileText, 
  ImageIcon,
  Loader2,
  GraduationCap,
  School
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import EDTFileUpload from "@/components/dashboard/sous-admin/EDTFileUpload"
import adminsData from '@/data/admins.json'

interface EDTFile {
  id: string
  type: 'cours' | 'sessions'
  name: string
  file: File
  preview: string
  filiere: string
  niveau: string
}

interface Filiere {
  id: number
  nom: string
  code: string
  cycle: string
  niveau: string
}

export default function EmploiDuTempsPage() {
  const [activeTab, setActiveTab] = useState('cours')
  const [selectedFiliere, setSelectedFiliere] = useState<string>('')
  const [selectedNiveau, setSelectedNiveau] = useState<string>('')
  const [coursFiles, setCoursFiles] = useState<EDTFile[]>([])
  const [sessionsFiles, setSessionsFiles] = useState<EDTFile[]>([])
  const [previewFile, setPreviewFile] = useState<EDTFile | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Extraire les filières et niveaux depuis les données
  const filieres = useMemo(() => {
    return adminsData.filieres || []
  }, [])

  // Niveaux disponibles
  const niveauxDisponibles = useMemo(() => {
    const niveaux = new Set<string>()
    filieres.forEach(filiere => {
      if (filiere.niveau) niveaux.add(filiere.niveau)
    })
    // Ajouter les niveaux standards
    const standards = ['L1', 'L2', 'L3', 'M1', 'M2']
    const uniques = new Set([...standards, ...Array.from(niveaux)])
    return Array.from(uniques)
  }, [filieres])

  // Filtrer les emplois du temps existants selon la sélection
  const existingEDTs = useMemo(() => {
    const allEDTs = [
      ...(adminsData.emploiDuTemps || []).map(edt => ({ ...edt, type: 'cours' as const })),
      ...(adminsData.emploiDuTempsSessions || []).map(edt => ({ ...edt, type: 'sessions' as const }))
    ]
    
    if (!selectedFiliere && !selectedNiveau) return allEDTs
    
    return allEDTs.filter(edt => {
      const filiereMatch = !selectedFiliere || edt.filiere === selectedFiliere
      const niveauMatch = !selectedNiveau || edt.niveau === selectedNiveau
      return filiereMatch && niveauMatch
    })
  }, [selectedFiliere, selectedNiveau])

  const handleFileSelect = useCallback((file: File, preview: string) => {
    if (!selectedFiliere || !selectedNiveau) {
      toast.error('Veuillez sélectionner une filière et un niveau')
      return
    }

    const newFile: EDTFile = {
      id: Date.now().toString(),
      type: activeTab as 'cours' | 'sessions',
      name: file.name,
      file,
      preview,
      filiere: selectedFiliere,
      niveau: selectedNiveau
    }

    if (activeTab === 'cours') {
      setCoursFiles(prev => [...prev, newFile])
    } else {
      setSessionsFiles(prev => [...prev, newFile])
    }

    toast.success(`Fichier ajouté pour ${selectedFiliere} - ${selectedNiveau}`)
  }, [activeTab, selectedFiliere, selectedNiveau])

  const handleDeleteFile = useCallback((fileId: string) => {
    if (activeTab === 'cours') {
      setCoursFiles(prev => prev.filter(f => f.id !== fileId))
    } else {
      setSessionsFiles(prev => prev.filter(f => f.id !== fileId))
    }
    toast.success('Fichier supprimé')
  }, [activeTab])

  const handlePublishFile = useCallback(async (file: EDTFile) => {
    setIsSubmitting(true)
    
    try {
      // Simuler l'envoi vers le bon destinataire selon la filière et niveau
      const targetAudience = `étudiants en ${file.filiere} - ${file.niveau}`
      
      // Simulation d'API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success(`Emploi du temps publié pour ${targetAudience}`)
      
      // En pratique, vous feriez un appel API réel ici
      console.log('Publication:', {
        file: file.name,
        type: file.type,
        filiere: file.filiere,
        niveau: file.niveau,
        targetAudience
      })
      
    } catch (error) {
      toast.error('Erreur lors de la publication')
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const formatFileSize = (bytes: number) => {
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const FileCard = ({ file }: { file: EDTFile }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group"
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-0">
          <div className="relative">
            {/* Preview Container */}
            <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
              {file.file.type === 'application/pdf' ? (
                <div className="text-center">
                  <FileText className="h-16 w-16 text-red-500 mb-2" />
                  <p className="text-sm text-gray-600">PDF</p>
                </div>
              ) : (
                <div 
                  className="relative h-full w-full cursor-pointer"
                  onClick={() => setPreviewFile(file)}
                >
                  <img 
                    src={file.preview} 
                    alt="Preview" 
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                </div>
              )}
            </div>

            {/* File Info */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {file.type === 'cours' ? (
                  <BookOpen className="h-4 w-4 text-blue-600" />
                ) : (
                  <CalendarDays className="h-4 w-4 text-orange-600" />
                )}
                <span className="text-sm font-medium text-gray-900">
                  {file.type === 'cours' ? 'Cours' : 'Sessions'}
                </span>
                <Badge variant="outline" className="text-xs">
                  {file.filiere}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {file.niveau}
                </Badge>
              </div>
              
              <p className="text-sm font-medium text-gray-900 mb-1 truncate">
                {file.name}
              </p>
              <p className="text-xs text-gray-500 mb-3">
                {formatFileSize(file.file.size)}
              </p>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                {file.file.type === 'application/pdf' ? (
                  <>
                    <div className="flex gap-2">
                      <Button 
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setPreviewFile(file)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Voir PDF
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleDeleteFile(file.id)}
                      >
                        <X className="h-3 w-3 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                    <Button 
                      size="sm"
                      className="w-full"
                      onClick={() => handlePublishFile(file)}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                      ) : (
                        <Send className="h-3 w-3 mr-1" />
                      )}
                      Envoyer aux {file.filiere} - {file.niveau}
                    </Button>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleDeleteFile(file.id)}
                    >
                      <X className="h-3 w-3 mr-1" />
                      Supprimer
                    </Button>
                    <Button 
                      size="sm"
                      className="flex-1"
                      onClick={() => handlePublishFile(file)}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                      ) : (
                        <Send className="h-3 w-3 mr-1" />
                      )}
                      Envoyer
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="container mx-auto p-3 sm:p-6 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-300 mb-2">
          Gestion des Emplois du Temps
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Ajoutez et gérez les emplois du temps par filière et niveau
        </p>
      </motion.div>

      {/* Sélecteurs de filière et niveau */}
      <Card className="mb-6">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <School className="h-4 w-4" />
                Filière
              </label>
              <Select value={selectedFiliere} onValueChange={setSelectedFiliere}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez une filière" />
                </SelectTrigger>
                <SelectContent>
                  {filieres.map((filiere) => (
                    <SelectItem key={filiere.id} value={filiere.nom}>
                      {filiere.nom} ({filiere.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Niveau
              </label>
              <Select value={selectedNiveau} onValueChange={setSelectedNiveau}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez un niveau" />
                </SelectTrigger>
                <SelectContent>
                  {niveauxDisponibles.map((niveau) => (
                    <SelectItem key={niveau} value={niveau}>
                      {niveau}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedFiliere && selectedNiveau && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Cible:</strong> {selectedFiliere} - {selectedNiveau}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emplois du temps existants pour cette sélection */}
      {selectedFiliere && selectedNiveau && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Emplois du temps existants</CardTitle>
          </CardHeader>
          <CardContent>
            {existingEDTs.length > 0 ? (
              <div className="space-y-3">
                {existingEDTs.map((edt) => (
                  <div key={edt.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {edt.type === 'cours' ? (
                        <BookOpen className="h-4 w-4 text-blue-600" />
                      ) : (
                        <CalendarDays className="h-4 w-4 text-orange-600" />
                      )}
                      <div>
                        <p className="font-medium">{edt.matiere || edt.filiere}</p>
                        <p className="text-sm text-gray-500">
                          {edt.jour} {edt.heureDebut} - {edt.heureFin} {edt.salle && `• ${edt.salle}`}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {edt.type === 'cours' ? 'Cours' : 'Session'}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Aucun emploi du temps existant pour cette sélection
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="cours" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Cours
          </TabsTrigger>
          <TabsTrigger value="sessions" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Sessions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cours" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload Section */}
            <div className="lg:col-span-1">
              <EDTFileUpload
                onFileSelect={handleFileSelect}
                currentFile={null}
                acceptedTypes="application/pdf,image/*"
                title={`Ajouter un fichier de cours`}
                description="Glissez-déposez un fichier ou cliquez pour sélectionner"
                disabled={!selectedFiliere || !selectedNiveau}
              />
            </div>

            {/* Files Grid */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-300 mb-1">
                  Emplois du temps des cours
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {coursFiles.length} fichier{coursFiles.length > 1 ? 's' : ''} ajouté{coursFiles.length > 1 ? 's' : ''}
                </p>
              </div>

              {coursFiles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnimatePresence>
                    {coursFiles.map((file) => (
                      <FileCard key={file.id} file={file} />
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <Card className="border-dashed border-2 border-gray-300 bg-gray-50">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Upload className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 text-center">
                      {selectedFiliere && selectedNiveau 
                        ? 'Aucun fichier ajouté pour cette sélection'
                        : 'Sélectionnez une filière et un niveau pour commencer'
                      }
                    </p>
                    <p className="text-sm text-gray-500 text-center mt-1">
                      Commencez par ajouter un fichier PDF ou une image
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload Section */}
            <div className="lg:col-span-1">
              <EDTFileUpload
                onFileSelect={handleFileSelect}
                currentFile={null}
                acceptedTypes="application/pdf,image/*"
                title={`Ajouter un fichier de sessions`}
                description="Glissez-déposez un fichier ou cliquez pour sélectionner"
                disabled={!selectedFiliere || !selectedNiveau}
              />
            </div>

            {/* Files Grid */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-300 mb-1">
                  Planning des sessions d&apos;examens
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {sessionsFiles.length} fichier{sessionsFiles.length > 1 ? 's' : ''} ajouté{sessionsFiles.length > 1 ? 's' : ''}
                </p>
              </div>

              {sessionsFiles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnimatePresence>
                    {sessionsFiles.map((file) => (
                      <FileCard key={file.id} file={file} />
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <Card className="border-dashed border-2 border-gray-300 bg-gray-50">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Upload className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 text-center">
                      {selectedFiliere && selectedNiveau 
                        ? 'Aucun fichier ajouté pour cette sélection'
                        : 'Sélectionnez une filière et un niveau pour commencer'
                      }
                    </p>
                    <p className="text-sm text-gray-500 text-center mt-1">
                      Commencez par ajouter un fichier PDF ou une image
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Preview Modal */}
      <Dialog open={!!previewFile} onOpenChange={() => setPreviewFile(null)}>
        <DialogContent className="max-w-7xl w-[95vw] h-[95vh] max-h-[95vh] p-0 overflow-auto">
          <DialogHeader className="p-6 pb-0 sticky top-0 bg-white z-10">
            <DialogTitle className="text-xl font-semibold">
              {previewFile?.name}
            </DialogTitle>
          </DialogHeader>

          {previewFile && (
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center min-h-[400px]">
                {previewFile.file.type === 'application/pdf' ? (
                  <div className="text-center space-y-4 p-8">
                    <FileText className="h-24 w-24 text-red-500" />
                    <div>
                      <p className="text-lg font-medium text-gray-900">Document PDF</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Taille: {formatFileSize(previewFile.file.size)}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Destination: {previewFile.filiere} - {previewFile.niveau}
                      </p>
                    </div>
                    <Button 
                      size="lg"
                      onClick={() => {
                        const url = URL.createObjectURL(previewFile.file)
                        window.open(url, '_blank')
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ouvrir dans un nouvel onglet
                    </Button>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <img 
                      src={previewFile.preview} 
                      alt="Preview" 
                      className="max-w-full max-h-none object-contain cursor-pointer"
                      style={{ maxHeight: 'none' }}
                      onClick={() => {
                        window.open(previewFile.preview, '_blank')
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
