import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Layout from "../components/dashboard/layout";
import userData from '../data/admins.json';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ECES",
  description: "École communautaire de l'enseignement supérieur",
};

// Type definitions
type UserRole = 'admin' | 'sous-admin' | 'enseignant' | 'etudiant' | 'visitor';

interface User {
  role: UserRole;
  name: string;
  avatar: string;
}

// Fonction pour obtenir l'utilisateur courant (admin par défaut)
const getCurrentUser = (): User => {
  try {
    // Vous pouvez changer cette logique selon vos besoins
    // Par exemple, basé sur une variable d'environnement ou un paramètre
    const userRole = process.env.NEXT_PUBLIC_USER_ROLE || 'admin';
    
    switch(userRole) {
      case 'admin':
        // Admin principal
        return {
          role: 'admin',
          name: userData.admin.nom || 'Admin',
          avatar: ''
        };
      
      case 'sous-admin':
        // Premier sous-admin
        const sousAdmin = userData.sousAdmins[0];
        return {
          role: 'sous-admin',
          name: `${sousAdmin.prenom} ${sousAdmin.nom}`,
          avatar: sousAdmin.avatar || ''
        };
      
      case 'enseignant':
        // Premier enseignant
        const enseignant = userData.enseignants[0];
        return {
          role: 'enseignant',
          name: `${enseignant.prenom} ${enseignant.nom}`,
          avatar: enseignant.avatar || ''
        };
      
      case 'etudiant':
        // Premier étudiant
        const etudiant = userData.etudiants[0];
        return {
          role: 'etudiant',
          name: `${etudiant.prenom} ${etudiant.nom}`,
          avatar: etudiant.avatar || ''
        };
      
      default:
        return {
          role: 'visitor',
          name: 'Visiteur',
          avatar: ''
        };
    }
  } catch (error) {
    console.error('Erreur lors du chargement de l\'utilisateur:', error);
    return {
      role: 'visitor',
      name: 'Visiteur',
      avatar: ''
    };
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = getCurrentUser();

  return (
    <html lang="fr" className={cn("font-sans", inter.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout
          userRole={user.role}
          userName={user.name}
          userAvatar={user.avatar}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}