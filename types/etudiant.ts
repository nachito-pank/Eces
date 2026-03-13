

export interface Etudiant {
  id: number
  nom: string
  prenom: string
  filiere: string
  niveau: string
  email: string
  photo?: string
}

export interface Note {
  id: number
  matiere: string
  devoir: number
  session: number
  coefficient?: number
}

export interface Paiement {
  id: number
  date: string
  montant: number
  statut: "Payé" | "En attente"
  description?: string
  mode?: "Espèces" | "Carte" | "Virement"
}

export interface Notification {
  id: number
  message: string
  date: string
  lu: boolean
}

export interface Cours {
  id: number
  jour: string
  heureDebut: string
  heureFin: string
  matiere: string
  salle: string
}