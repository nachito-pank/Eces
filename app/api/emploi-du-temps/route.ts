import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simuler la récupération des emplois du temps depuis la base de données
    // Pour la démo, on retourne des fichiers statiques
    const emploisDuTemps = [
      {
        id: '1',
        name: 'Emploi du temps L1 Info.pdf',
        type: 'cours',
        filiere: 'Informatique',
        niveau: 'L1',
        url: '/uploads/emploi-du-temps/cours_Informatique_L1_1234567890.pdf',
        uploadDate: new Date().toISOString(),
        fileSize: 2048576,
        fileType: 'application/pdf'
      },
      {
        id: '2',
        name: 'Sessions Examens M2 Marketing.jpg',
        type: 'sessions',
        filiere: 'Marketing',
        niveau: 'M2',
        url: '/uploads/emploi-du-temps/sessions_Marketing_M2_1234567891.jpg',
        uploadDate: new Date().toISOString(),
        fileSize: 1048576,
        fileType: 'image/jpeg'
      }
    ];

    return NextResponse.json({
      success: true,
      data: emploisDuTemps
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des emplois du temps:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
}
