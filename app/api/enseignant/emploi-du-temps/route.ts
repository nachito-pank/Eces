import { NextResponse } from 'next/server';
import data from '@/data/admins.json';

export async function GET() {
  const emploiDuTemps = data.emploiDuTemps.map((edt) => ({
    id: edt.id,
    filiere: edt.filiere,
    code: edt.code,
    niveau: edt.niveau,
    cours: edt.cours,
  }));

  return NextResponse.json({ success: true, data: emploiDuTemps });
}