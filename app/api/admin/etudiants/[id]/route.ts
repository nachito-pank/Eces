import { NextRequest, NextResponse } from 'next/server';
import { getEtudiants, saveEtudiants } from '@/lib/db';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const etudiant = getEtudiants().find((e) => e.id === Number(id));
    if (!etudiant) return NextResponse.json({ error: 'Étudiant non trouvé' }, { status: 404 });
    return NextResponse.json({ etudiant });
  } catch {
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body     = await request.json();
    const etudiants = getEtudiants();
    const index    = etudiants.findIndex((e) => e.id === Number(id));

    if (index === -1) return NextResponse.json({ error: 'Étudiant non trouvé' }, { status: 404 });

    // matricule immuable
    const updated = { ...etudiants[index], ...body, id: etudiants[index].id, matricule: etudiants[index].matricule };
    etudiants[index] = updated;
    saveEtudiants(etudiants);

    return NextResponse.json({ etudiant: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erreur interne' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id }    = await params;
    const etudiants = getEtudiants();
    const index     = etudiants.findIndex((e) => e.id === Number(id));

    if (index === -1) return NextResponse.json({ error: 'Étudiant non trouvé' }, { status: 404 });

    etudiants.splice(index, 1);
    saveEtudiants(etudiants);

    return NextResponse.json({ message: 'Étudiant supprimé avec succès' });
  } catch {
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
