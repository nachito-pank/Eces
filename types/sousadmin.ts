export interface Actualite {
  id: string;
  titre: string;
  contenu: string;
  datePublication: string;
  auteur: string;
  statut: 'publie' | 'brouillon' | 'archive';
  image?: string; // Pour upload
}

export interface Message {
  id: string;
  expediteur: string;
  nomExpediteur: string;
  destinataire: string; // 'tous', 'etudiants_GI', etc.
  contenu: string;
  dateEnvoi: string;
  type: 'envoye' | 'recu';
}

export interface EmploiDuTempsCours {
  id: string;
  niveau: string;
  filiere: string;
  code: string;
  cours: Array<{
    jour: string;
    heureDebut: string;
    heureFin: string;
    matiere: string;
    salle: string;
    professeur: string;
    classe?: string;
  }>;
}

export interface EmploiDuTempsSession {
  id: number;
  filiere: string;
  code: string;
  niveau: string;
  session: string;
  data: string;
  matiere: string;
  date: string;
  heure: string;
  duree: string;
  salle: string;
  site: string;
}

// Pour formulaires
export interface FormActu {
  titre: string;
  contenu: string;
  image: File | null;
  statut: 'publie' | 'brouillon' | 'archive';
}

export interface FormMessage {
  destinataire: string;
  contenu: string;
}

export interface FormEdtCours {
  niveau: string;
  filiere: string;
  code: string;
  cours: Array<{
    jour: string;
    heureDebut: string;
    heureFin: string;
    matiere: string;
    salle: string;
    professeur: string;
    classe: string;
  }>;
}

export interface FormEdtSession {
  filiere: string;
  code: string;
  niveau: string;
  session: string;
  matiere: string;
  date: string;
  heure: string;
  duree: string;
  salle: string;
  site: string;
}

