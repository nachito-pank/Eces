import { NextRequest, NextResponse } from 'next/server';
import { getFilieres, saveFilieres } from '@/lib/db';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const filiere = getFilieres().find((f) => f.id === Number(id));
    if (!filiere) return NextResponse.json({ error: 'Filière non trouvée' }, { status: 404 });
    return NextResponse.json({ filiere });
  } catch {
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id }  = await params;
    const body    = await request.json();
    const filieres = getFilieres();
    const index   = filieres.findIndex((f) => f.id === Number(id));

    if (index === -1) return NextResponse.json({ error: 'Filière non trouvée' }, { status: 404 });

    const updated = { ...filieres[index], ...body, id: filieres[index].id };
    filieres[index] = updated;
    saveFilieres(filieres);

    return NextResponse.json({ filiere: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erreur interne' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id }   = await params;
    const filieres = getFilieres();
    const index    = filieres.findIndex((f) => f.id === Number(id));

    if (index === -1) return NextResponse.json({ error: 'Filière non trouvée' }, { status: 404 });

    filieres.splice(index, 1);
    saveFilieres(filieres);

    return NextResponse.json({ message: 'Filière supprimée avec succès' });
  } catch {
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
