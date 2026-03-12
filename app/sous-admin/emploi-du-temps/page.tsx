"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Download, Plus, Edit, Trash2 } from 'lucide-react';
import sousAdminsData from '@/data/sous-admins.json';
import type { EmploiDuTempsCours, EmploiDuTempsSession } from '@/components/dashboard/types/sousadmin';

export default function EmploiDuTempsPage() {
  const [activeTab, setActiveTab] = useState('cours');

  const edtCours: EmploiDuTempsCours[] = sousAdminsData.emploiDuTemps || [];
  const edtSessions: EmploiDuTempsSession[] = sousAdminsData.emploiDuTempsSessions || [];

  const downloadEdt = (type: 'cours' | 'sessions', filiere: string, niveau: string) => {
    // Mock download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `EDT_${type}_${filiere}_${niveau}.pdf`;
    link.click();
    alert(`Téléchargement EDT ${type} ${filiere} ${niveau}... (Mock)`);
  };

  const CoursList = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-purple-600" />
              Emplois du Temps - Cours
            </CardTitle>
            <CardDescription>Créez et modifiez les emplois du temps des cours</CardDescription>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter EDT
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-900">Niveau</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Filière</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Code</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Cours</th>
                  <th className="text-right p-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {edtCours.map((edt) => (
                  <tr key={edt.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-medium">{edt.niveau}</td>
                    <td className="p-4">
                      <Badge variant="outline">{edt.filiere}</Badge>
                    </td>
                    <td className="p-4 font-mono bg-gray-100 px-3 py-1 rounded-full text-xs">{edt.code}</td>
                    <td className="p-4">{edt.cours.length} cours</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => downloadEdt('cours', edt.filiere, edt.niveau)}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const SessionsList = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-orange-600" />
              Sessions d'Examens
            </CardTitle>
            <CardDescription>Planifiez les dates des examens</CardDescription>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle Session
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-900">Filière</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Niveau</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Session</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Date</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Salle</th>
                  <th className="text-right p-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {edtSessions.slice(0, 10).map((session) => (
                  <tr key={session.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <Badge>{session.filiere}</Badge>
                    </td>
                    <td className="p-4 font-medium">{session.niveau}</td>
                    <td className="p-4">
                      <Badge variant="secondary">{session.session}</Badge>
                    </td>
                    <td className="p-4">{new Date(session.date).toLocaleDateString('fr-FR')}</td>
                    <td className="p-4 font-mono bg-orange-50 px-2 py-1 rounded text-sm">{session.salle}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => downloadEdt('sessions', session.filiere, session.niveau)}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent">
            Emplois du Temps
          </h1>
          <p className="text-gray-600 mt-1">Gérez les emplois du temps des cours et sessions</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-1">
          <TabsTrigger value="cours" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">
            Cours Hebdomadaires
          </TabsTrigger>
          <TabsTrigger value="sessions" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">
            Sessions d'Examens
          </TabsTrigger>
        </TabsList>
        <TabsContent value="cours" className="mt-6">
          <CoursList />
        </TabsContent>
        <TabsContent value="sessions" className="mt-6">
          <SessionsList />
        </TabsContent>
      </Tabs>
    </div>
  );
}

