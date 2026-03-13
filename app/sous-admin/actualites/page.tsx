"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Newspaper } from 'lucide-react';
import adminsData from '@/data/admins.json';
import ActuCard from '@/components/dashboard/sous-admin/ActuCard';
import ActuForm from '@/components/dashboard/sous-admin/ActuForm';
import type { Actualite } from '@/types/sousadmin';

export default function ActualitesPage() {
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [filterStatus, setFilterStatus] = useState<'tous' | 'publie' | 'brouillon'>('tous');

  useEffect(() => {
    setActualites((((adminsData as any).actualites || []) as Actualite[]));
  }, []);

  const addActualite = (newActuData: any) => {
    const newActualite: Actualite = {
      id: `act_${Date.now()}`,
      titre: newActuData.titre,
      contenu: newActuData.contenu,
      datePublication: new Date().toISOString(),
      auteur: 'Sous-Admin',
      statut: newActuData.statut,
      ...(newActuData.image && { image: URL.createObjectURL(newActuData.image) })
    };
    setActualites(prev => [newActualite, ...prev]);
  };

  const filteredActualites = useMemo(() => {
    return actualites.filter((actu) => {
      const matchesSearch = actu.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           actu.contenu.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = !dateFilter || actu.datePublication.startsWith(dateFilter);
      const matchesStatus = filterStatus === 'tous' || actu.statut === filterStatus;
      return matchesSearch && matchesDate && matchesStatus;
    });
  }, [actualites, searchTerm, dateFilter, filterStatus]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-green-900 bg-clip-text text-transparent">
            Actualités
          </h1>
          <p className="text-gray-600 mt-1">Publiez et gérez les nouvelles de l'école</p>
        </div>
        <ActuForm onSubmit={addActualite} />
      </div>

      {/* Filtres */}
      <Card className="border-green-100">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Rechercher par titre ou contenu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Input
              type="month"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              placeholder="Filtrer par date"
              className="max-w-sm"
            />
            <div className="flex gap-2">
              {(['tous', 'publie', 'brouillon'] as const).map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? 'default' : 'outline'}
                  onClick={() => setFilterStatus(status)}
                  className="whitespace-nowrap"
                >
                  {status === 'tous' ? 'Tous' : status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grille actualités */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActualites.map((actualite) => (
          <ActuCard key={actualite.id} actualite={actualite} />
        ))}
      </div>

      {filteredActualites.length === 0 && (
        <Card className="text-center py-20 border-dashed border-gray-200">
          <CardContent>
            <Newspaper className="h-20 w-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucune actualité</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Publiez la première actualité pour informer les étudiants des dernières nouvelles de l'école.
            </p>
            <ActuForm onSubmit={addActualite} triggerText="Publier la première actualité" />
          </CardContent>
        </Card>
      )}

      {/* Stats en bas */}
      <Card>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
            <div className="text-3xl font-bold text-green-600 mb-2">{actualites.length}</div>
            <div className="text-sm text-green-700 font-medium">Total Actualités</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">{actualites.filter(a => a.statut === 'publie').length}</div>
            <div className="text-sm text-blue-700 font-medium">Publiées</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-yellow-100 rounded-2xl">
            <div className="text-3xl font-bold text-orange-600 mb-2">{filteredActualites.length}</div>
            <div className="text-sm text-orange-700 font-medium">Résultats actuels</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

