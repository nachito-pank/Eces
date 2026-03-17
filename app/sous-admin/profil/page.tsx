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

  useEffect(() => {
    const sousAdminData = adminsData.sousAdmins?.[0];
    if (sousAdminData) {
      setSousAdmin(sousAdminData);
      setFormData({
        nom: sousAdminData.nom || '',
        prenom: sousAdminData.prenom || '',
        email: sousAdminData.email || '',
        telephone: sousAdminData.telephone || '',
        dateEmbauche: /*sousAdminData.dateEmbauche || */new Date().toISOString().split('T')[0],
        statut: sousAdminData.statut || 'Actif',
        avatar: sousAdminData.avatar || '#3B82F6'
      });
    }
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profil sauvegarde:', formData);
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

  const handleLogout = () => {
    if (confirm('Etes-vous sur de vouloir vous deconnecter ?')) {
      window.location.href = '/sous-admin/login';
    }
  };

  if (!sousAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Chargement...</h2>
            <p className="text-gray-600">Chargement de votre profil</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
                <p className="text-sm text-gray-500">Gerez vos informations personnelles</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/sous-admin/dashboard'}
                className="flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                Retour
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Deconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-white/30">
                      <AvatarFallback className="text-2xl font-bold bg-white/20 text-blue-600">
                        {sousAdmin.prenom?.charAt(0)}{sousAdmin.nom?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <button 
                      className="absolute bottom-0 right-0 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                      onClick={() => document.getElementById('avatar-input')?.click()}
                    >
                      <Camera className="h-4 w-4 text-white" />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{sousAdmin.prenom} {sousAdmin.nom}</h2>
                    <p className="text-blue-100 text-sm">Sous-Administrateur</p>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{sousAdmin.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{sousAdmin.telephone || 'Non renseigne'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
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
            <Card className="bg-white shadow-lg border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-600" />
                  Informations Personnelles
                </CardTitle>
                <CardDescription>
                  {isEditing ? 'Modifiez vos informations' : 'Consultez vos informations personnelles'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="informations" className="data-[state=active]:bg-blue-50">
                      <User className="h-4 w-4 mr-2" />
                      Informations
                    </TabsTrigger>
                    <TabsTrigger value="securite" className="data-[state=active]:bg-blue-50">
                      <Shield className="h-4 w-4 mr-2" />
                      Securite
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="informations" className="space-y-4 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Nom</label>
                        <Input
                          value={formData.nom}
                          onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-gray-50" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Prenom</label>
                        <Input
                          value={formData.prenom}
                          onChange={(e) => setFormData(prev => ({ ...prev, prenom: e.target.value }))}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-gray-50" : ""}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-gray-50" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Telephone</label>
                        <Input
                          value={formData.telephone}
                          onChange={(e) => setFormData(prev => ({ ...prev, telephone: e.target.value }))}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-gray-50" : ""}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Date d'embauche</label>
                      <Input
                        type="date"
                        value={formData.dateEmbauche}
                        onChange={(e) => setFormData(prev => ({ ...prev, dateEmbauche: e.target.value }))}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="securite" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Changer le mot de passe</label>
                        <Input
                          type="password"
                          placeholder="Nouveau mot de passe"
                          disabled={!isEditing}
                          className={!isEditing ? "bg-gray-50" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
                        <Input
                          type="password"
                          placeholder="Confirmer le mot de passe"
                          disabled={!isEditing}
                          className={!isEditing ? "bg-gray-50" : ""}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Avatar</label>
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-full border-2 border-gray-300"
                          style={{ backgroundColor: formData.avatar }}
                        ></div>
                        <input
                          id="avatar-input"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          disabled={!isEditing}
                          className="hidden"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById('avatar-input')?.click()}
                          disabled={!isEditing}
                          className={!isEditing ? "opacity-50" : ""}
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>

              <div className="p-6 border-t border-gray-200">
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
