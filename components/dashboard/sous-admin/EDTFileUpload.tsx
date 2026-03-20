"use client";

import { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  X, 
  Eye, 
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';

interface EDTFileUploadProps {
  onFileSelect: (file: File, preview: string) => void;
  title: string;
  description: string;
  acceptedTypes?: string;
  maxSize?: number;
  currentFile?: { url: string; type: string; name: string } | null;
  disabled?: boolean;
}

export default function EDTFileUpload({
  onFileSelect,
  title,
  description,
  acceptedTypes = "application/pdf,image/*",
  maxSize = 10 * 1024 * 1024, // 10MB
  currentFile,
  disabled = false
}: EDTFileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const validateFile = useCallback((file: File): boolean => {
    // Accept all PDFs and images
    if (!file.type.startsWith('application/pdf') && !file.type.startsWith('image/')) {
      setError('Type de fichier non supporté. Veuillez choisir un PDF ou une image.');
      return false;
    }

    if (file.size > maxSize) {
      setError(`Le fichier est trop volumineux. Taille maximale: ${maxSize / 1024 / 1024}MB`);
      return false;
    }

    setError('');
    return true;
  }, [acceptedTypes, maxSize]);

  const createPreview = useCallback(async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (file.type === 'application/pdf') {
        // Pour les PDF, on utilise une icône de preview
        resolve('');
      } else {
        // Pour les images, on crée un preview
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      }
    });
  }, []);

  const handleFile = useCallback(async (file: File) => {
    if (!validateFile(file)) return;

    setIsLoading(true);
    try {
      const previewUrl = await createPreview(file);
      setSelectedFile(file);
      setPreview(previewUrl);
      onFileSelect(file, previewUrl);
    } catch (err) {
      setError('Erreur lors de la lecture du fichier');
    } finally {
      setIsLoading(false);
    }
  }, [validateFile, createPreview, onFileSelect]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  const clearFile = useCallback(() => {
    setSelectedFile(null);
    setPreview('');
    setError('');
  }, []);

  const getFileIcon = (type: string) => {
    if (type === 'application/pdf') return <FileText className="h-8 w-8 text-red-500" />;
    return <ImageIcon className="h-8 w-8 text-blue-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {/* Upload Area */}
      {!selectedFile && !currentFile ? (
        <Card 
          className={`relative transition-all duration-300 ${
            disabled 
              ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed' 
              : dragActive 
                ? 'border-blue-500 bg-blue-50 scale-[1.02]' 
                : 'border-gray-300 hover:border-gray-400 bg-white'
          }`}
        >
          <CardContent className="p-8">
            <div
              className={`relative ${disabled ? 'pointer-events-none' : ''}`}
              onDragEnter={!disabled ? handleDrag : undefined}
              onDragLeave={!disabled ? handleDrag : undefined}
              onDragOver={!disabled ? handleDrag : undefined}
              onDrop={!disabled ? handleDrop : undefined}
            >
              <input
                type="file"
                id="file-upload"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                onChange={handleChange}
                accept={acceptedTypes}
                disabled={disabled}
              />
              
              <div className="text-center space-y-4">
                <div 
                  className={`bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    disabled 
                      ? 'border-gray-300 bg-gray-100' 
                      : 'border-blue-300 hover:border-blue-400 hover:bg-blue-50/50'
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                  ) : (
                    <Upload className={`h-8 w-8 ${disabled ? 'text-gray-400' : 'text-blue-600'}`} />
                  )}
                </div>
                
                <div className="space-y-2">
                  <p className={`text-lg font-medium ${disabled ? 'text-gray-400' : 'text-gray-900'}`}>
                    {disabled 
                      ? 'Veuillez sélectionner une filière et un niveau' 
                      : isLoading 
                        ? 'Traitement en cours...' 
                        : 'Glissez-déposez votre fichier ici'
                    }
                  </p>
                  <p className={`text-sm ${disabled ? 'text-gray-400' : 'text-gray-500'}`}>
                    {disabled 
                      ? 'La sélection de filière et niveau est requise' 
                      : 'ou cliquez pour parcourir vos fichiers'
                    }
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    PDF
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Images
                  </Badge>
                </div>

                <p className="text-xs text-gray-400">
                  Taille maximale: {maxSize / 1024 / 1024}MB
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* File Preview */
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              {/* Preview Image or PDF Icon */}
              <div className="relative h-64 bg-gray-50 flex items-center justify-center overflow-hidden">
                {selectedFile?.type === 'application/pdf' || currentFile?.type === 'application/pdf' ? (
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                      <FileText className="h-12 w-12 text-red-600" />
                    </div>
                    <p className="text-sm text-gray-600">Document PDF</p>
                  </div>
                ) : (
                  <img 
                    src={preview || currentFile?.url} 
                    alt="Preview" 
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              {/* Actions Overlay */}
              <div className="absolute top-2 right-2 z-20">
                <Button
                  size="sm"
                  variant="destructive"
                  className="bg-white/95 hover:bg-red-50 text-red-600 shadow-lg border border-gray-200"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    clearFile();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* File Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4">
                <div className="text-white">
                  <p className="text-sm font-medium truncate">
                    {selectedFile?.name || currentFile?.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="h-3 w-3 text-green-400" />
                    <span>Prêt pour l'envoi</span>
                    {selectedFile && (
                      <span>• {formatFileSize(selectedFile.size)}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Message */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 text-red-800">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
