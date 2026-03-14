"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LayoutDashboard, MessageSquare, Newspaper, CalendarDays, BookOpen, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import adminsData from '@/data/admins.json';

export default function SousAdminDashboard() {
  const messagesCount = adminsData.messages?.length || 0;
  const actualitesCount = adminsData.actualites?.length || 0;
  const edtCoursCount = adminsData.emploiDuTemps?.length || 0;
  const edtSessionsCount = adminsData.emploiDuTempsSessions?.length || 0;

  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-500 to-blue-600';
      case 'green': return 'from-green-500 to-green-600';
      case 'purple': return 'from-purple-500 to-purple-600';
      case 'orange': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getBadgeColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'green': return 'bg-green-100 text-green-800 border-green-200';
      case 'purple': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'orange': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActivityColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100';
      case 'green': return 'bg-green-100';
      case 'purple': return 'bg-purple-100';
      default: return 'bg-gray-100';
    }
  };

  const getActivityIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600';
      case 'green': return 'text-green-600';
      case 'purple': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

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
      icon: BookOpen,
      color: 'orange',
      href: '/sous-admin/emploi-du-temps'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
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
          <Link key={index} href={stat.href}>
            <Card className="group hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 border-0 bg-linear-to-br from-white to-blue-50/50 hover:to-blue-50 cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-linear-to-br ${getIconColor(stat.color)} shadow-lg`}>
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
                  <Badge className={getBadgeColor(stat.color)}>
                    {stat.change}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-8 px-3 text-xs hover:bg-transparent hover:text-blue-600">
                    Voir
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-linear-to-r from-blue-50 to-indigo-50 border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Actions Rapides
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4 p-0">
          <Link href="/sous-admin/profil">
            <Button className="justify-start h-16 bg-linear-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-md group">
              <User className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
              Mon Profil
            </Button>
          </Link>
          <Button className="justify-start h-16 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md group">
            <MessageSquare className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
            Envoyer Message
          </Button>
          <Link href="/sous-admin/actualites">
            <Button className="justify-start h-16 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-md group">
              <Newspaper className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
              Nouvelle Actualité
            </Button>
          </Link>
          <Link href="/sous-admin/emploi-du-temps">
            <Button className="justify-start h-16 bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md group">
              <CalendarDays className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
              Gérer EDT
            </Button>
          </Link>
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
              <div className={`p-2 rounded-lg ${getActivityColor(activity.color)}`}>
                <activity.icon className={`h-5 w-5 ${getActivityIconColor(activity.color)}`} />
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

