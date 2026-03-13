export type Actualite = {
  id: string;
  // Champs utilisés dans plusieurs pages (Supabase / JSON local)
  titre?: string;
  contenu?: string;
  title?: string;
  content?: string;
  datePublication?: string;
  created_at?: string;
  auteur?: string;
  statut?: string;
  image?: string;
  image_url?: string;
};

