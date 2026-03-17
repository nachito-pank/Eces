import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const notesPath = path.join(process.cwd(), 'data', 'notes.json');

// Initialize notes file if it doesn't exist
function initializeNotesFile() {
  if (!fs.existsSync(notesPath)) {
    const initialData = {
      notes: [
        {
          id: 1,
          etudiantId: 1,
          cours: { id: 1, title: 'Introduction aux Langues des Affaires' },
          matiere: 'Anglais',
          noteDevoir: 15,
          noteSession: 16,
          moyenne: 15.5,
          date: '2026-01-15',
        },
      ],
    };
    fs.writeFileSync(notesPath, JSON.stringify(initialData, null, 2));
  }
}

// GET /api/enseignant/notes/[id] - Get note details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    initializeNotesFile();
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const data = JSON.parse(fs.readFileSync(notesPath, 'utf-8'));

    const note = data.notes.find((n: any) => n.id === id);

    if (!note) {
      return NextResponse.json(
        { error: 'Note non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la note' },
      { status: 500 }
    );
  }
}

// PUT /api/enseignant/notes/[id] - Modify noteDevoir or noteSession
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    initializeNotesFile();
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const body = await request.json();
    const { noteDevoir, noteSession } = body;

    const data = JSON.parse(fs.readFileSync(notesPath, 'utf-8'));
    const note = data.notes.find((n: any) => n.id === id);

    if (!note) {
      return NextResponse.json(
        { error: 'Note non trouvée' },
        { status: 404 }
      );
    }

    // Update notes if provided
    if (noteDevoir !== undefined) note.noteDevoir = noteDevoir;
    if (noteSession !== undefined) note.noteSession = noteSession;

    // Recalculate average
    note.moyenne = (note.noteDevoir + note.noteSession) / 2;

    fs.writeFileSync(notesPath, JSON.stringify(data, null, 2));

    return NextResponse.json({
      message: 'Note mise à jour avec succès',
      note,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la note' },
      { status: 500 }
    );
  }
}

// DELETE /api/enseignant/notes/[id] - Delete a note
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    initializeNotesFile();
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const data = JSON.parse(fs.readFileSync(notesPath, 'utf-8'));

    const indexToDelete = data.notes.findIndex((n: any) => n.id === id);

    if (indexToDelete === -1) {
      return NextResponse.json(
        { error: 'Note non trouvée' },
        { status: 404 }
      );
    }

    const deletedNote = data.notes.splice(indexToDelete, 1)[0];
    fs.writeFileSync(notesPath, JSON.stringify(data, null, 2));

    return NextResponse.json({
      message: 'Note supprimée avec succès',
      note: deletedNote,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la note' },
      { status: 500 }
    );
  }
}