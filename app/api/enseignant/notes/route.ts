import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'admins.json');

const readData = () => {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
};

const writeData = (data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Calcule la moyenne des noteDevoir de toutes les matières
const calculerMoyenne = (notes: any[]) => {
  if (!notes || notes.length === 0) return 0;
  const total = notes.reduce((acc: number, n: any) => acc + (n.noteDevoir ?? 0), 0);
  return parseFloat((total / notes.length).toFixed(2));
};

// GET — retourne la moyenne des devoirs pour chaque étudiant
export async function GET() {
  try {
    const data = readData();
    const notes = data.etudiants.map((e: any) => ({
      studentId: String(e.id),
      studentName: `${e.prenom} ${e.nom}`,
      grade: calculerMoyenne(e.notes),       // ← moyenne de tous les noteDevoir
      gradeSession: e.moyenne ?? 0,
    }));
    return NextResponse.json({ success: true, data: notes });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// PUT — modifie toutes les noteDevoir d'un étudiant avec la nouvelle note
export async function PUT(req: Request) {
  try {
    const { studentId, grade } = await req.json();
    const data = readData();

    const etudiant = data.etudiants.find((e: any) => String(e.id) === String(studentId));
    if (!etudiant) {
      return NextResponse.json({ success: false, message: 'Étudiant non trouvé' }, { status: 404 });
    }

    // Met à jour toutes les noteDevoir proportionnellement
    // OU remplace juste la moyenne globale — choix simple : on met la même note à toutes les matières
    if (etudiant.notes && etudiant.notes.length > 0) {
      etudiant.notes = etudiant.notes.map((n: any) => ({
        ...n,
        noteDevoir: grade,
      }));
    } else {
      etudiant.notes = [{ matiere: 'Devoir', noteDevoir: grade, noteSession: 0 }];
    }

    // Recalcule la moyenne globale
    etudiant.moyenne = calculerMoyenne(etudiant.notes);

    writeData(data);
    return NextResponse.json({ success: true, data: etudiant });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}