import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;
    const filiere = formData.get('filiere') as string;
    const niveau = formData.get('niveau') as string;
    const name = formData.get('name') as string;

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    // Créer le répertoire uploads s'il n'existe pas
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'emploi-du-temps');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Générer un nom de fichier unique
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${type}_${filiere}_${niveau}_${timestamp}.${fileExtension}`;
    const filePath = join(uploadDir, fileName);

    // Sauvegarder le fichier
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // URL publique du fichier
    const publicUrl = `/uploads/emploi-du-temps/${fileName}`;

    // Simuler la sauvegarde en base de données (pour la démo)
    const edtData = {
      id: timestamp.toString(),
      name,
      type,
      filiere,
      niveau,
      url: publicUrl,
      uploadDate: new Date().toISOString(),
      fileSize: file.size,
      fileType: file.type
    };

    // Ici, vous devriez sauvegarder edtData dans votre base de données
    // Pour la démo, nous allons juste le retourner

    console.log('Emploi du temps sauvegardé:', edtData);

    return NextResponse.json({
      success: true,
      message: 'Emploi du temps publié avec succès',
      data: edtData
    });

  } catch (error) {
    console.error('Erreur lors de l\'upload:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement du fichier' },
      { status: 500 }
    );
  }
}
