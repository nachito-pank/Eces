"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LayoutDashboard, MessageSquare, Newspaper, CalendarDays, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import sousAdminsData from '@/data/sous-admins.json';

export default function SousAdminDashboard() {
  const messagesCount = sousAdminsData.messages?.length || 0;
  const actualitesCount = sousAdminsData.actualites?.length || 0;
  const edtCoursCount = sousAdminsData.emploiDuTemps?.length || 0;
  const edtSessionsCount = sousAdminsData.emploiDuTempsSessions?.length || 0;

  const stats = [
    {
      title: 'Messages Envoyés',
      value: messagesCount,
      change: '+12%',
      icon: MessageSquare,
      color: 'blue',
      href: '/sous-admin/messages'
    },
    {
      title: 'Actualités Publiées',
      value: actualitesCount,
      change: '+5',
      icon: Newspaper,
      color: 'green',
      href: '/sous-admin/actualites'
    },
    {
      title: 'Emplois du Temps Cours',
      value: edtCoursCount,
      change: 'Mis à jour',
      icon: CalendarDays,
      color: 'purple',
      href: '/sous-admin/emploi-du-temps'
    },
    {
      title: 'Sessions d\'Examens',
      value: edtSessionsCount,
      change: 'Planifiées',
      icon: Users,
      color: 'orange',
      href: '/sous-admin/emploi-du-temps'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Dashboard Sous-Admin
          </h1>
          <p className="text-gray-600 mt-2">Bienvenue dans votre espace de gestion</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Vue rapide
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="group hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50/50 hover:to-blue-50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{stat.value}</CardTitle>
                  <CardDescription>{stat.title}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge className={`bg-${stat.color}-100 text-${stat.color}-800 border-${stat.color}-200`}>
                  {stat.change}
                </Badge>
                <Button variant="ghost" size="sm" className="h-8 px-3 text-xs hover:bg-transparent hover:text-blue-600">
                  Voir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Actions Rapides
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 p-0">
          <Button className="justify-start h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md group">
            <MessageSquare className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
            Envoyer Message
          </Button>
          <Button className="justify-start h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-md group">
            <Newspaper className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
            Nouvelle Actualité
          </Button>
          <Button className="justify-start h-16 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md group">
            <CalendarDays className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
            Gérer EDT
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-between">
            <span>Activité Récente</span>
            <Badge variant="outline">En temps réel</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { action: 'Message envoyé à tous les étudiants', time: 'il y a 2 min', icon: MessageSquare, color: 'blue' },
            { action: 'Actualité publiée : Rentrée 2025', time: 'il y a 1h', icon: Newspaper, color: 'green' },
            { action: 'EDT mis à jour L1 GI', time: 'hier', icon: CalendarDays, color: 'purple' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`p-2 rounded-lg bg-${activity.color}-100`}>
                <activity.icon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

