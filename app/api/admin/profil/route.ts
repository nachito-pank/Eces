import { NextRequest, NextResponse } from 'next/server';
import { getAdmin, saveAdmin } from '@/lib/db';

export async function GET() {
  try {
    const admin = getAdmin();
    return NextResponse.json({ admin: { nom: admin.nom, email: admin.email, role: admin.role } });
  } catch {
    return NextResponse.json({ error: 'Impossible de lire les données' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, email, motDePasse } = body;

    if (!nom || !email) {
      return NextResponse.json({ error: 'Champs obligatoires manquants : nom, email' }, { status: 400 });
    }

    const admin   = getAdmin();
    const updated = { ...admin, nom, email, ...(motDePasse ? { motDePasse } : {}) };
    saveAdmin(updated);

    return NextResponse.json({ admin: { nom: updated.nom, email: updated.email, role: updated.role } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erreur interne' }, { status: 500 });
  }
}
