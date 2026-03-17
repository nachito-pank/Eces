import { NextRequest, NextResponse } from 'next/server';
import { getEnseignants, saveEnseignants } from '@/lib/db';

export async function GET() {
  try {
    return NextResponse.json({ enseignants: getEnseignants() });
  } catch {
    return NextResponse.json({ error: 'Impossible de lire les données' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, prenom, email, motDePasse, telephone, matieres, filieres, statut, dateEmbauche } = body;

    if (!nom || !prenom || !email || !motDePasse) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants : nom, prenom, email, motDePasse' },
        { status: 400 }
      );
    }

    const enseignants = getEnseignants();
    const nextId  = enseignants.length > 0 ? Math.max(...enseignants.map((e) => e.id)) + 1 : 1;
    const colors  = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
    const couleur = colors[nextId % colors.length];

    const newEnseignant = {
      id: nextId,
      role: 'enseignant',
      nom, prenom, email, motDePasse,
      telephone: telephone || '',
      matieres: Array.isArray(matieres)
        ? matieres
        : (matieres || '').split(',').map((m: string) => m.trim()).filter(Boolean),
      filieres: Array.isArray(filieres) ? filieres : [filieres].filter(Boolean),
      statut: statut || 'Actif',
      dateEmbauche: dateEmbauche || new Date().toISOString().split('T')[0],
      avatar: `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase(),
      couleur,
    };

    enseignants.push(newEnseignant);
    saveEnseignants(enseignants);

    return NextResponse.json({ enseignant: newEnseignant }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erreur interne' }, { status: 500 });
  }
}
