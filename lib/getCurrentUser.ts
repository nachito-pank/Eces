import userData from '@/data/admins.json';
import {  User } from '@/types/index';

// Retourne l'utilisateur courant. Par défaut 'visitor' si non configuré.
export const getCurrentUser = (): User => {
  try {
    const userRole = process.env.NEXT_PUBLIC_USER_ROLE || 'visitor';

    switch (userRole) {
      case 'admin':
        return {
          role: 'admin',
          name: userData.admin?.nom || 'Admin',
          avatar: ''
        } as User;

      case 'sous-admin': {
        const sousAdmin = userData.sousAdmins?.[0];
        return {
          role: 'sous-admin',
          name: `${sousAdmin?.prenom || ''} ${sousAdmin?.nom || ''}`.trim() || 'Sous-Admin',
          avatar: sousAdmin?.avatar || ''
        } as User;
      }

      case 'enseignant': {
        const enseignant = userData.enseignants?.[0];
        return {
          role: 'enseignant',
          name: `${enseignant?.prenom || ''} ${enseignant?.nom || ''}`.trim() || 'Enseignant',
          avatar: enseignant?.avatar || ''
        } as User;
      }

      case 'etudiant': {
        const etudiant = userData.etudiants?.[0];
        return {
          role: 'etudiant',
          name: `${etudiant?.prenom || ''} ${etudiant?.nom || ''}`.trim() || 'Étudiant',
          avatar: etudiant?.avatar || ''
        } as User;
      }

      default:
        return {
          role: 'visitor',
          name: 'Visiteur',
          avatar: ''
        } as User;
    }
  } catch (error) {
    console.error('Erreur lors du chargement de l\'utilisateur:', error);
    return {
      role: 'visitor',
      name: 'Visiteur',
      avatar: ''
    } as User;
  }
};

export default getCurrentUser;
