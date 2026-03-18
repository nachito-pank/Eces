"use client"; 
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useRouter } from 'next/navigation';

import { UserRole } from '@/types/index';
import { toast } from 'sonner';

interface LayoutProps {
  children: React.ReactNode;
  userRole?: UserRole;
  userName?: string;
  userAvatar?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  userRole = 'visitor', 
  userName = 'Utilisateur',
  userAvatar 
}) => {
  const router = useRouter();
  // Par défaut, la sidebar est masquée (collapsed) sur mobile, mais développée sur Desktop via le composant Sidebar
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const handleLogout = () => {
    toast.success("Déconnexion effectuée avec succès.");
    router.push('/login');
  };

  const showSidebar = userRole !== 'visitor';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c]">
      <Navbar  
        userRole={userRole}
        userName={userName}
        userAvatar={userAvatar}
        onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        onLogout={handleLogout}
      />
      
      {/* Sidebar Unifiée (Desktop + Mobile) */}
      {showSidebar && (
        <Sidebar 
          role={userRole} 
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      )}

      {/* Contenu principal */}
      <main
        className={`
          transition-all duration-300 pt-16
          ${showSidebar && !sidebarCollapsed ? 'lg:ml-64' : ''}
          ${showSidebar && sidebarCollapsed ? 'lg:ml-20' : ''}
        `}
      >
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;