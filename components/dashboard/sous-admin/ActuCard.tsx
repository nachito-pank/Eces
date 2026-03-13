"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User } from 'lucide-react';
import type { Actualite } from '@/types/sousadmin';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ActuCardProps {
  actualite: Actualite;
  className?: string;
}

export default function ActuCard({ actualite, className = '' }: ActuCardProps) {
  const dateFormatted = format(parseISO(actualite.datePublication), 'dd MMM yyyy à HH:mm', { locale: fr });

  return (
    <Card className={className + ' hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 overflow-hidden group cursor-pointer border-blue-100 hover:border-blue-300 bg-linear-to-br from-white to-blue-50/50'}>
      {actualite.image && (
        <img 
          src={actualite.image} 
          alt={actualite.titre}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      )}
      <CardHeader className="pb-3 pt-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge variant={actualite.statut === 'publie' ? 'default' : 'secondary'} className="text-xs bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200">
            {actualite.statut}
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {dateFormatted}
          </Badge>
        </div>
        <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {actualite.titre}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed mb-4">
          {actualite.contenu}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <User className="h-4 w-4" />
          <span>{actualite.auteur}</span>
        </div>
      </CardContent>
    </Card>
  );
}
