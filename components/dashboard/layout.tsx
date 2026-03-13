"use client"; 
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

import { UserRole } from '@/types/index';

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    console.log('Déconnexion...');
    // Implémentez votre logique de déconnexion ici
  };

  const showSidebar = userRole !== 'visitor';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar  
        userRole ={userRole}
        userName={userName}
        userAvatar={userAvatar}
        onMenuClick={handleMenuClick}
        onLogout={handleLogout}
      />
      
      {/* Sidebar pour desktop */}
      {showSidebar && (
        <Sidebar 
          role={userRole} 
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      )}

      {/* Overlay pour mobile */}
      {mobileMenuOpen && showSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar pour mobile */}
      {mobileMenuOpen && showSidebar && (
        <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 z-40 lg:hidden">
          <Sidebar role={userRole} />
        </div>
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