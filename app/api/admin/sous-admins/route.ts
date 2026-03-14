import { NextRequest, NextResponse } from 'next/server';
import { getSousAdmins, saveSousAdmins } from '@/lib/db';

export async function GET() {
  try {
    return NextResponse.json({ sousAdmins: getSousAdmins() });
  } catch {
    return NextResponse.json({ error: 'Impossible de lire les données' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, prenom, email, motDePasse, telephone, role, statut, droits } = body;

    if (!nom || !prenom || !email || !motDePasse) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants : nom, prenom, email, motDePasse' },
        { status: 400 }
      );
    }

    const sousAdmins = getSousAdmins();
    const nextId  = sousAdmins.length > 0 ? Math.max(...sousAdmins.map((a) => a.id)) + 1 : 1;
    const colors  = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
    const couleur = colors[nextId % colors.length];

    const newAdmin = {
      id: nextId, nom, prenom, email, motDePasse,
      telephone: telephone || '',
      role: role || 'Sous-Admin',
      statut: statut || 'Actif',
      droits: Array.isArray(droits) ? droits : [],
      dateCreation: new Date().toISOString().split('T')[0],
      avatar: `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase(),
      couleur,
    };

    sousAdmins.push(newAdmin);
    saveSousAdmins(sousAdmins);

    return NextResponse.json({ sousAdmin: newAdmin }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erreur interne' }, { status: 500 });
  }
}
