"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Phone, Calendar, Edit, Save, Shield, Settings, LogOut, Camera, Palette } from 'lucide-react';
import adminsData from '@/data/admins.json';

export default function ProfilPage() {
  const [sousAdmin, setSousAdmin] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('informations');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    dateEmbauche: '',
    statut: 'Actif',
    avatar: '#3B82F6'
  });
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const sousAdminData = adminsData.sousAdmins?.[0];
    if (sousAdminData) {
      setSousAdmin(sousAdminData);
      setFormData({
        nom: sousAdminData.nom || '',
        prenom: sousAdminData.prenom || '',
        email: sousAdminData.email || '',
        telephone: sousAdminData.telephone || '',
        dateEmbauche: sousAdminData.dateCreation || new Date().toISOString().split('T')[0],
        statut: sousAdminData.statut || 'Actif',
        avatar: sousAdminData.avatar || '#3B82F6'
      });
    }
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profil sauvegarde:', formData);
    if (passwordData.newPassword) {
      console.log('Mot de passe mis à jour:', passwordData);
    }
    alert('Profil mis à jour avec succès !');
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (sousAdmin) {
      setFormData({
        nom: sousAdmin.nom || '',
        prenom: sousAdmin.prenom || '',
        email: sousAdmin.email || '',
        telephone: sousAdmin.telephone || '',
        dateEmbauche: sousAdmin.dateEmbauche || new Date().toISOString().split('T')[0],
        statut: sousAdmin.statut || 'Actif',
        avatar: sousAdmin.avatar || '#3B82F6'
      });
    }
    setPasswordData({
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerAvatarInput = () => {
    const input = document.getElementById('avatar-input') as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  const handleLogout = () => {
    if (confirm('Etes-vous sur de vouloir vous deconnecter ?')) {
      localStorage.removeItem('sousAdminToken');
      sessionStorage.removeItem('sousAdminData');
      window.location.href = '/';
    }
  };

  if (!sousAdmin) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Chargement...</h2>
            <p className="text-gray-600 dark:text-gray-400">Chargement de votre profil</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <input
        id="avatar-input"
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        className="hidden"
      />
      
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 sm:py-4 gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shrink-0">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate">Mon Profil</h1>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:block">Gérez vos informations personnelles</p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/sous-admin/dashboard'}
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 flex-1 sm:flex-none justify-center"
              >
                <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Retour</span>
                <span className="sm:hidden">←</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-1 sm:gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 text-xs sm:text-sm px-2 sm:px-3 flex-1 sm:flex-none justify-center"
              >
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Déconnexion</span>
                <span className="sm:hidden">⎋</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-linear-to-r from-blue-500 to-indigo-600 p-4 sm:p-6 text-white">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative shrink-0">
                    <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-white/30 overflow-hidden">
                      {formData.avatar && formData.avatar.startsWith('data:') ? (
                        <div className="w-full h-full relative overflow-hidden">
                          <img 
                            src={formData.avatar} 
                            alt="Avatar" 
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ objectPosition: 'center' }}
                          />
                        </div>
                      ) : (
                        <AvatarFallback className="text-xl sm:text-2xl font-bold bg-white/20 text-blue-600 w-full h-full">
                          {sousAdmin.prenom?.charAt(0)}{sousAdmin.nom?.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <button 
                      className="absolute bottom-0 right-0 rounded-full p-1.5 sm:p-2 transition-all bg-white/20 hover:bg-white/30 cursor-pointer"
                      onClick={triggerAvatarInput}
                    >
                      <Camera className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </button>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-xl font-bold truncate">{sousAdmin.prenom} {sousAdmin.nom}</h2>
                    <p className="text-blue-100 text-xs sm:text-sm">Sous-Administrateur</p>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="h-4 w-4" />
                    <span>{sousAdmin.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="h-4 w-4" />
                    <span>{sousAdmin.telephone || 'Non renseigné'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>Depuis le {new Date(sousAdmin.dateEmbauche).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant={sousAdmin.statut === 'Actif' ? 'default' : 'secondary'} className="text-xs">
                    {sousAdmin.statut}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: sousAdmin.avatar }}></div>
                    <Palette className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-900 dark:text-white">Informations Personnelles</span>
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {isEditing ? 'Modifiez vos informations' : 'Consultez vos informations personnelles'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-700">
                    <TabsTrigger value="informations" className="data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/50 text-gray-700 dark:text-gray-300">
                      <User className="h-4 w-4 mr-2" />
                      Informations
                    </TabsTrigger>
                    <TabsTrigger value="securite" className="data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/50 text-gray-700 dark:text-gray-300">
                      <Shield className="h-4 w-4 mr-2" />
                      Sécurité
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="informations" className="space-y-4 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nom</label>
                        <Input
                          value={formData.nom}
                          onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
                          className="text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Prénom</label>
                        <Input
                          value={formData.prenom}
                          onChange={(e) => setFormData(prev => ({ ...prev, prenom: e.target.value }))}
                          className="text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Téléphone</label>
                        <Input
                          value={formData.telephone}
                          onChange={(e) => setFormData(prev => ({ ...prev, telephone: e.target.value }))}
                          className="text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date d'embauche</label>
                      <Input
                        type="date"
                        value={formData.dateEmbauche}
                        onChange={(e) => setFormData(prev => ({ ...prev, dateEmbauche: e.target.value }))}
                        className="text-gray-900 dark:text-white"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="securite" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Changer le mot de passe</label>
                        <Input
                          type="password"
                          placeholder="Nouveau mot de passe"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirmer le mot de passe</label>
                        <Input
                          type="password"
                          placeholder="Confirmer le mot de passe"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Avatar</label>
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          {formData.avatar && formData.avatar.startsWith('data:') ? (
                            <div className="w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-600 overflow-hidden">
                              <img 
                                src={formData.avatar} 
                                alt="Avatar preview" 
                                className="w-full h-full object-cover"
                                style={{ objectPosition: 'center' }}
                              />
                            </div>
                          ) : (
                            <div 
                              className="w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-600"
                              style={{ backgroundColor: formData.avatar }}
                            ></div>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={triggerAvatarInput}
                          className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-800"
                        >
                          <Camera className="h-4 w-4" />
                          <span>{formData.avatar && formData.avatar.startsWith('data:') ? 'Changer' : 'Ajouter'}</span>
                        </Button>
                      </div>
                      {formData.avatar && formData.avatar.startsWith('data:') && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Photo de profil uploadée avec succès
                        </p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>

              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  {!isEditing ? (
                    <Button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                    >
                      <Edit className="h-4 w-4" />
                      Modifier
                    </Button>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <Button 
                        variant="outline"
                        onClick={handleCancel}
                        className="flex items-center gap-2 w-full sm:w-auto"
                      >
                        Annuler
                      </Button>
                      <Button 
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                      >
                        <Save className="h-4 w-4" />
                        Sauvegarder
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
