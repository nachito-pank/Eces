import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import  Layout  from "../components/dashboard/layout";


const inter = Inter({subsets:['latin'],variable:'--font-sans'});

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
  description: "Ecole communautaire de l'enseignement supérieur",
};

const getUser = () => {
  return {
    role: 'visitor' as const,  // 'admin' | 'sous-admin' | 'enseignant' | 'etudiant' | 'visitor'
    name: 'Marty Ngouono',
    avatar: ''  
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = getUser(); // À remplacer par votre vraie session

  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
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
