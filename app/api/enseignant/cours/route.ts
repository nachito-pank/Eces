import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'admins.json');

// GET /api/enseignant/cours - Get teacher's courses (filtered by filiere)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filiere = searchParams.get('filiere');

    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    let cours = data.cours;

    // Filter by filiere if provided
    if (filiere) {
      cours = cours.filter((c: any) => c.filiere === filiere);
    }

    return NextResponse.json({
      success: true,
      data: cours,
      total: cours.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des cours' },
      { status: 500 }
    );
  }
}

// POST /api/enseignant/cours - Create a course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, filiere, level, volume, url } = body;

    // Validate required fields
    if (!title || !filiere || !level || !volume) {
      return NextResponse.json(
        { error: 'Champs requis manquants: title, filiere, level, volume' },
        { status: 400 }
      );
    }

    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
    // Find max ID
    const maxId = Math.max(...data.cours.map((c: any) => c.id));
    const newCourse = {
      id: maxId + 1,
      title,
      filiere,
      level,
      volume,
      url: url || '',
    };

    data.cours.push(newCourse);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    return NextResponse.json(
      {
        success: true,
        message: 'Cours créé avec succès',
        data: newCourse,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la création du cours' },
      { status: 500 }
    );
  }
}
