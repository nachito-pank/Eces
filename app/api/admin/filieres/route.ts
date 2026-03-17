import { NextRequest, NextResponse } from 'next/server';
import { getFilieres, saveFilieres } from '@/lib/db';

export async function GET() {
  try {
    return NextResponse.json({ filieres: getFilieres() });
  } catch {
    return NextResponse.json({ error: 'Impossible de lire les données' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, code, cycle, niveau, nbEtudiants, nbEnseignants } = body;

    if (!nom || !code) {
      return NextResponse.json({ error: 'Champs obligatoires manquants : nom, code' }, { status: 400 });
    }

    const filieres = getFilieres();
    const nextId   = filieres.length > 0 ? Math.max(...filieres.map((f) => f.id)) + 1 : 1;

    const newFiliere = {
      id: nextId, nom, code,
      cycle: cycle || '', niveau: niveau || '',
      nbEtudiants: Number(nbEtudiants) || 0,
      nbEnseignants: Number(nbEnseignants) || 0,
    };

    filieres.push(newFiliere);
    saveFilieres(filieres);

    return NextResponse.json({ filiere: newFiliere }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erreur interne' }, { status: 500 });
  }
}
