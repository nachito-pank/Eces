import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  hint?: string;
}

export default function StatCard({ title, value, hint }: StatCardProps) {
  return (
    <Card className="p-0">
      <CardHeader>
        <CardTitle className="px-4 py-3">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="text-3xl font-bold text-slate-900">{value}</div>
        {hint && <div className="text-sm text-slate-500 mt-2">{hint}</div>}
      </CardContent>
    </Card>
  );
}
