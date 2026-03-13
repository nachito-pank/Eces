"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { 
  Menu, 
  Search, 
  Bell, 
  Settings, 
  User,
  LogOut,
  ChevronDown,
  X
} from 'lucide-react';
import type { UserRole } from '@/types';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';

interface NavbarProps {
  userRole?: UserRole;
  userName?: string;
  userAvatar?: string;
  onMenuClick?: () => void;
  onLogout?: () => void;
  showLogo?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  userRole = 'visitor', 
  userName = 'Utilisateur',
  userAvatar,
  onMenuClick,
  onLogout,
  showLogo = true 
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const roleToBasePath: Record<UserRole, string> = {
    admin: '/admin',
    'sous-admin': '/sous-admin',
    enseignant: '/enseignant',
    etudiant: '/etudiant',
    visitor: '',
  };

  const profileHref =
    userRole === 'visitor' ? '/login' : `${roleToBasePath[userRole]}/profil`;

  const notifications = [
    { id: 1, title: 'Nouveau cours disponible', time: 'Il y a 5 min', read: false },
    { id: 2, title: 'Devoir à rendre', time: 'Il y a 1h', read: false },
    { id: 3, title: 'Message de l\'admin', time: 'Il y a 2h', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recherche:', searchQuery);
    // Implémentez votre logique de recherche ici
    setIsSearchOpen(false);
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 fixed w-full z-30 top-0">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Partie gauche : Logo et menu burger */}
            <div className="flex items-center">
              {showLogo && (
                <Link href="/" className="flex items-center ml-2 lg:ml-0">
                  <img 
                    src="/images/logo-eces.jpeg" 
                    alt="ECES Logo" 
                    className="h-8 w-auto"
                  />
                  <span className="ml-2 text-xl font-semibold text-gray-800 dark:text-white">
                    ECES
                  </span>
                </Link>
              )}
            </div>

            {/* Barre de recherche (desktop) */}
            {userRole !== 'etudiant' && userRole !== 'admin' && (
              <div className="hidden md:flex flex-1 max-w-md mx-8">
                <form onSubmit={handleSearch} className="w-full">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Rechercher des cours, étudiants..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </form>
              </div>
            )}

            {/* Icônes de droite */}
            <div className="flex items-center space-x-2">
              {/* Bouton recherche mobile */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Toggle thème */}
              <AnimatedThemeToggler
                className="hidden md:inline-flex p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                aria-label="Changer de thème"
              />

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 relative"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Dropdown notifications */}
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                            !notif.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                        >
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{notif.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                      <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
                        Voir toutes
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Paramètres */}
              <Link
                href="/parametres"
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <Settings className="h-5 w-5" />
              </Link>

              {/* Profil utilisateur */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
                    {userAvatar ? (
                      <img src={userAvatar} alt={userName} className="h-8 w-8 rounded-full object-cover" />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400 hidden sm:block" />
                </button>

                {/* Dropdown utilisateur */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{userName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">{userRole}</p>
                    </div>
                    <Link
                      href={profileHref}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-3" />
                      Mon Profil
                    </Link>
                    <Link
                      href="/parametres"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Paramètres
                    </Link>
                    <button
                      onClick={onLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Modal de recherche mobile */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="bg-white dark:bg-gray-900 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rechercher</h3>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher des cours, étudiants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;