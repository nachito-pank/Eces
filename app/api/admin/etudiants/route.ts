import { NextRequest, NextResponse } from 'next/server';
import { getEtudiants, saveEtudiants } from '@/lib/db';

export async function GET() {
  try {
    const etudiants = getEtudiants();
    return NextResponse.json({ etudiants });
  } catch {
    return NextResponse.json({ error: 'Impossible de lire les données' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, prenom, email, motDePasse, telephone, filiere, niveau, statut } = body;

    if (!nom || !prenom || !email || !motDePasse) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants : nom, prenom, email, motDePasse' },
        { status: 400 }
      );
    }

    const etudiants = getEtudiants();
    const annee     = new Date().getFullYear();
    const nextId    = etudiants.length > 0 ? Math.max(...etudiants.map((e) => e.id)) + 1 : 1;
    const code      = (filiere || 'ETU').substring(0, 3).toUpperCase().replace(/\s/g, '');
    const matricule = `${code}-${annee}-${String(nextId).padStart(3, '0')}`;
    const colors    = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
    const couleur   = colors[nextId % colors.length];
    const initials  = `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();

    const newEtudiant = {
      id: nextId, nom, prenom, email, motDePasse,
      telephone: telephone || '', matricule,
      filiere: filiere || '', niveau: niveau || '',
      statut: statut || 'Actif', avatar: initials, couleur,
      notes: [], paiements: [],
    };

    etudiants.push(newEtudiant);
    saveEtudiants(etudiants);

    return NextResponse.json({ etudiant: newEtudiant }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erreur interne' }, { status: 500 });
  }
}
