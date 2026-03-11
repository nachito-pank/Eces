"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Search, Bell, Settings, User, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type Role = 'admin' | 'sous-admin' | 'enseignant' | 'etudiant';

interface Notification {
  id: number;
  title: string;
  time: string;
  read: boolean;
}

interface NavbarProps {
  userRole?: Role;
  userName?: string;
  userAvatar?: string;
  onMenuClick?: () => void;
  onLogout?: () => void;
}

const NOTIFICATIONS: Notification[] = [
  { id: 1, title: 'Nouveau cours disponible', time: 'Il y a 5 min', read: false },
  { id: 2, title: 'Devoir à rendre',          time: 'Il y a 1h',    read: false },
  { id: 3, title: "Message de l'admin",        time: 'Il y a 2h',    read: true  },
];

export default function Navbar({
  userRole = 'admin',
  userName = 'Utilisateur',
  userAvatar,
  onMenuClick,
  onLogout,
}: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recherche:', searchQuery);
    setIsSearchOpen(false);
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 fixed w-full z-30 top-0">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Left: logo + burger */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onMenuClick}
                className="lg:hidden text-gray-600 dark:text-gray-300"
              >
                <Menu className="h-5 w-5" />
              </Button>

              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="eceslogo" width={32} height={32} className="h-8 w-auto" />
                <span className="text-xl font-semibold text-gray-800 dark:text-white">ECES</span>
              </Link>
            </div>

            {/* Center: search (desktop) */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher des cours, étudiants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                />
              </div>
            </form>

            {/* Right: actions */}
            <div className="flex items-center gap-1">

              {/* Search mobile */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden text-gray-600 dark:text-gray-300"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Notifications */}
              <Popover>
                <PopoverTrigger>
                  <Button variant="ghost" size="icon" className="relative text-gray-600 dark:text-gray-300">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500 border-0">
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80 p-0">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {NOTIFICATIONS.map((notif) => (
                      <div
                        key={notif.id}
                        className={cn(
                          'px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer',
                          !notif.read && 'bg-blue-50 dark:bg-blue-900/20'
                        )}
                      >
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{notif.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="px-4 py-2">
                    <Button variant="link" className="text-sm text-blue-600 dark:text-blue-400 p-0 h-auto">
                      Voir toutes
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Settings */}
              <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
                <Link href="/parametres">
                  <Settings className="h-5 w-5" />
                </Link>
              </Button>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" className="flex items-center gap-2 px-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white shrink-0">
                      {userAvatar ? (
                        <Image src={userAvatar} alt={userName} width={32} height={32} className="rounded-full object-cover" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400 hidden sm:block" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <p className="font-medium text-gray-900 dark:text-white">{userName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize font-normal mt-0.5">{userRole}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/profil" className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" /> Mon Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/parametres" className="flex items-center gap-2 cursor-pointer">
                      <Settings className="h-4 w-4" /> Paramètres
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={onLogout}
                    className="flex items-center gap-2 text-red-600 dark:text-red-400 focus:text-red-600 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" /> Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Search modal (mobile) */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-md top-4 translate-y-0 md:hidden">
          <DialogHeader>
            <DialogTitle>Rechercher</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher des cours, étudiants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                autoFocus
              />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}