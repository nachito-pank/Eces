import { NextRequest, NextResponse } from 'next/server';
import { getSousAdmins, saveSousAdmins } from '@/lib/db';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id }   = await params;
    const sousAdmin = getSousAdmins().find((a) => a.id === Number(id));
    if (!sousAdmin) return NextResponse.json({ error: 'Sous-admin non trouvé' }, { status: 404 });
    return NextResponse.json({ sousAdmin });
  } catch {
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id }    = await params;
    const body      = await request.json();
    const sousAdmins = getSousAdmins();
    const index     = sousAdmins.findIndex((a) => a.id === Number(id));

    if (index === -1) return NextResponse.json({ error: 'Sous-admin non trouvé' }, { status: 404 });

    const updated = { ...sousAdmins[index], ...body, id: sousAdmins[index].id };
    sousAdmins[index] = updated;
    saveSousAdmins(sousAdmins);

    return NextResponse.json({ sousAdmin: updated });
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
    const sousAdmins = getSousAdmins();
    const index     = sousAdmins.findIndex((a) => a.id === Number(id));

    if (index === -1) return NextResponse.json({ error: 'Sous-admin non trouvé' }, { status: 404 });

    sousAdmins.splice(index, 1);
    saveSousAdmins(sousAdmins);

    return NextResponse.json({ message: 'Sous-admin supprimé avec succès' });
  } catch {
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
