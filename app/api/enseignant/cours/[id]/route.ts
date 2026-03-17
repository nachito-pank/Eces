/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "admins.json");

// GET /api/enseignant/cours/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    const cours = data.cours.find((c: any) => c.id === id);

    if (!cours) {
      return NextResponse.json({ error: "Cours non trouvé" }, { status: 404 });
    }

    return NextResponse.json(cours);
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la récupération du cours" },
      { status: 500 }
    );
  }
}

// PUT /api/enseignant/cours/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const courseId = parseInt(id);

    const body = await request.json();
    const { title, filiere, level, volume, url } = body;

    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    const cours = data.cours.find((c: any) => c.id === courseId);

    if (!cours) {
      return NextResponse.json({ error: "Cours non trouvé" }, { status: 404 });
    }

    if (title) cours.title = title;
    if (filiere) cours.filiere = filiere;
    if (level) cours.level = level;
    if (volume) cours.volume = volume;
    if (url !== undefined) cours.url = url;

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    return NextResponse.json({
      success: true,
      message: "Cours mis à jour avec succès",
      data: cours,
    });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du cours" },
      { status: 500 }
    );
  }
}

// DELETE /api/enseignant/cours/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const courseId = parseInt(id);

    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    const indexToDelete = data.cours.findIndex((c: any) => c.id === courseId);

    if (indexToDelete === -1) {
      return NextResponse.json({ error: "Cours non trouvé" }, { status: 404 });
    }

    const deletedCourse = data.cours.splice(indexToDelete, 1)[0];
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    return NextResponse.json({
      success: true,
      message: "Cours supprimé avec succès",
      data: deletedCourse,
    });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la suppression du cours" },
      { status: 500 }
    );
  }
}