import { NextResponse } from 'next/server';
import data from '@/data/admins.json';

export async function GET() {
  const etudiants = data.etudiants.map((e) => ({
    id: String(e.id),
    name: e.nom,
    firstName: e.prenom,
    email: e.matricule, // pas d'email dans le JSON, on met le matricule
    filiere: e.filiere,
    level: e.niveau,
    matricule: e.matricule,
    statut: e.statut,
    moyenne: e.moyenne,
    appreciation: e.appreciation,
  }));

  return NextResponse.json({ success: true, data: etudiants });
}