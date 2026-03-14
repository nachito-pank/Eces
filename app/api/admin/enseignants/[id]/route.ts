import { NextRequest, NextResponse } from 'next/server';
import { getEnseignants, saveEnseignants } from '@/lib/db';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const enseignant = getEnseignants().find((e) => e.id === Number(id));
    if (!enseignant) return NextResponse.json({ error: 'Enseignant non trouvé' }, { status: 404 });
    return NextResponse.json({ enseignant });
  } catch {
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id }       = await params;
    const body         = await request.json();
    const enseignants  = getEnseignants();
    const index        = enseignants.findIndex((e) => e.id === Number(id));

    if (index === -1) return NextResponse.json({ error: 'Enseignant non trouvé' }, { status: 404 });

    const updated = { ...enseignants[index], ...body, id: enseignants[index].id };
    enseignants[index] = updated;
    saveEnseignants(enseignants);

    return NextResponse.json({ enseignant: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erreur interne' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id }      = await params;
    const enseignants = getEnseignants();
    const index       = enseignants.findIndex((e) => e.id === Number(id));

    if (index === -1) return NextResponse.json({ error: 'Enseignant non trouvé' }, { status: 404 });

    enseignants.splice(index, 1);
    saveEnseignants(enseignants);

    return NextResponse.json({ message: 'Enseignant supprimé avec succès' });
  } catch {
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
