import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "admins.json");

// GET /api/enseignant/profil
export async function GET(request: NextRequest) {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    // Simulation d'un enseignant connecté
    const enseignant = data.enseignants?.[0];

    if (!enseignant) {
      return NextResponse.json(
        { error: "Enseignant non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        firstName: enseignant.prenom,
        name: enseignant.nom,
        email: enseignant.email,
        phone: enseignant.telephone,
        subjects: enseignant.matieres || [],
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la récupération du profil" },
      { status: 500 }
    );
  }
}

// PUT /api/enseignant/profil
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, telephone, motDePasse } = body;

    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    const enseignant = data.enseignants?.[0];

    if (!enseignant) {
      return NextResponse.json(
        { error: "Enseignant non trouvé" },
        { status: 404 }
      );
    }

    if (email) enseignant.email = email;
    if (telephone) enseignant.telephone = telephone;
    if (motDePasse) enseignant.motDePasse = motDePasse;

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    return NextResponse.json({
      success: true,
      message: "Profil mis à jour avec succès",
      data: {
        firstName: enseignant.prenom,
        name: enseignant.nom,
        email: enseignant.email,
        phone: enseignant.telephone,
        subjects: enseignant.matieres || [],
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du profil" },
      { status: 500 }
    );
  }
}