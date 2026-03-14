"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, BookOpen, Users, GraduationCap, Calendar, ChevronLeft, ChevronRight, FileText, Award,
  MessageSquare, Pencil, School, LetterText,
  ShieldCheck, UserCog, UserRound,
  CreditCard,
  Bell,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type Role = 'admin' | 'sous-admin' | 'enseignant' | 'etudiant';

interface SidebarProps {
  role: Role;
  collapsed?: boolean;
  onToggle?: () => void;
}

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
}

const ROLE_CONFIG: Record<Role, { label: string; icon: React.ReactNode }> = {
  admin:       { label: 'Admin',      icon: <ShieldCheck className="h-6 w-6 text-white" /> },
  'sous-admin': { label: 'Sous-Admin', icon: <UserCog    className="h-6 w-6 text-white" /> },
  enseignant:  { label: 'Enseignant', icon: <Pencil      className="h-6 w-6 text-white" /> },
  etudiant:    { label: 'Étudiant',   icon: <UserRound   className="h-6 w-6 text-white" /> },
};

const MENU_ITEMS: Record<Role, MenuItem[]> = {
  admin: [
    { name: 'Enseignants', icon: <Pencil       className="h-5 w-5" />, path: '/admin/enseignants', badge: 12 },
    { name: 'Sous-admin',  icon: <Users        className="h-5 w-5" />, path: '/admin/sous-admins' },
    { name: 'Filières',    icon: <School       className="h-5 w-5" />, path: '/admin/filieres' },
    { name: 'Etudiants',    icon: <GraduationCap       className="h-5 w-5" />, path: '/admin/etudiants' },
  ],
  'sous-admin': [
{ name: 'Emploi du temps', icon: <GraduationCap className="h-5 w-5" />, path: '/sous-admin/emploi-du-temps' },
{ name: 'Actualités',  icon: <LetterText    className="h-5 w-5" />, path: '/sous-admin/actualites' },
    { name: 'Messages',   icon: <MessageSquare className="h-5 w-5" />, path: '/sous-admin/messages', badge: 7 },
  ],
  enseignant: [
    { name: 'Mes Cours',  icon: <BookOpen      className="h-5 w-5" />, path: '/enseignant/cours' },
    { name: 'Mes étudiants',  icon: <Users         className="h-5 w-5" />, path: '/enseignant/etudiants' },
    { name: 'Notes devoirs',      icon: <Award         className="h-5 w-5" />, path: '/enseignant/notes' },
    { name: 'Emploi du temps',   icon: <Calendar className="h-5 w-5" />, path: '/enseignant/emploi-du-temps', badge: 3 },
  ],
  etudiant: [
    { name: 'Mes Cours',       icon: <BookOpen      className="h-5 w-5" />, path: '/etudiant/mes-cours' },
    { name: 'Notes',           icon: <Award         className="h-5 w-5" />, path: '/etudiant/mes-notes' },
    { name: 'Emploi du temps', icon: <Calendar      className="h-5 w-5" />, path: '/etudiant/emploi-temps' },
    { name: 'Messages',        icon: <MessageSquare className="h-5 w-5" />, path: '/etudiant/messages' },
    { name: 'Paiement',        icon: <CreditCard className="h-5 w-5" />, path: '/etudiant/paiements' },
    { name: 'Notifications',        icon: <Bell className="h-5 w-5" />, path: '/etudiant/notifications' },
  ],
};

// const BOTTOM_ITEMS: MenuItem[] = [
//   { name: 'Aide', icon: <HelpCircle className="h-5 w-5" />, path: '/aide' },
// ];

function NavItem({ item, isActive, collapsed }: { item: MenuItem; isActive: boolean; collapsed: boolean }) {
  const content = (
    <Link
      href={item.path}
      className={cn(
        'flex items-center p-3 rounded-xl transition-all duration-200 relative group w-full',
        collapsed ? 'justify-center' : 'justify-between',
        isActive
          ? 'bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-blue-900/30'
          : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
      )}
    >
      <div className="flex items-center space-x-3">
        <span className={isActive ? 'text-white' : 'text-blue-500 dark:text-blue-400'}>
          {item.icon}
        </span>
        {!collapsed && (
          <span className={cn('text-sm font-medium', isActive && 'text-white')}>
            {item.name}
          </span>
        )}
      </div>
      {!collapsed && item.badge && (
        <Badge
          variant={isActive ? 'outline' : 'default'}
          className={cn(
            'h-5 min-w-5 px-1.5 text-xs font-bold',
            isActive ? 'border-white text-white' : 'bg-blue-500 text-white'
          )}
        >
          {item.badge}
        </Badge>
      )}
    </Link>
  );

  if (!collapsed) return content;

  return (
    <Tooltip>
      <TooltipTrigger>{content}</TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-2">
        {item.name}
        {item.badge && (
          <Badge className="h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-blue-500">
            {item.badge}
          </Badge>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

export default function Sidebar({ role, collapsed: initialCollapsed = false, onToggle }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const pathname = usePathname();

  const { label, icon: roleIcon } = ROLE_CONFIG[role];

  const menuItems: MenuItem[] = [
    { name: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: `/${role}/dashboard` },
    ...MENU_ITEMS[role],
  ];

  const handleToggle = () => {
    setCollapsed(!collapsed);
    onToggle?.();
  };

  return (
    <TooltipProvider>
      <aside
        className={cn(
          'bg-linear-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800',
          'border-r border-blue-100 dark:border-gray-700',
          'h-screen fixed left-0 top-16 transition-all duration-300 z-20 shadow-lg',
          collapsed ? 'max-sm:w-0 w-20' : 'w-64'
        )}
      >
        {/* Toggle */}
        <Button
          size="icon"
          onClick={handleToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className={`absolute -right-3 ${collapsed && "max-sm:-right-7"} top-5 h-7 w-7 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 border-2 border-white dark:border-gray-900 shadow-md text-white`}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>

        {/* Header */}
        <div className="p-4 border-b border-blue-100 dark:border-gray-700">
          <div className={cn('flex items-center', collapsed ? 'justify-center max-sm:hidden' : 'space-x-3')}>
            <div className="h-12 w-12 shrink-0 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
              {roleIcon}
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{label}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  Espace {label.toLowerCase()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className={`p-4 h-[calc(100vh-1 80px)] ${collapsed && "max-sm:hidden"} overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 dark:scrollbar-thumb-gray-600`}>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavItem item={item} isActive={pathname === item.path} collapsed={collapsed} />
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom */}
        {/* <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-100 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <ul className="space-y-1">
            {BOTTOM_ITEMS.map((item) => (
              <li key={item.path}>
                <NavItem item={item} isActive={pathname === item.path} collapsed={collapsed} />
              </li>
            ))}

            <Separator className="my-2 bg-blue-100 dark:bg-gray-700" />

            <li>
              <Button
                variant="ghost"
                onClick={() => console.log('Déconnexion...')}
                className={cn(
                  'w-full rounded-xl text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400',
                  collapsed ? 'justify-center px-0' : 'justify-start space-x-3'
                )}
              >
                <LogOut className="h-5 w-5 text-red-500 dark:text-red-400" />
                {!collapsed && <span className="text-sm font-medium">Déconnexion</span>}
              </Button>
            </li>
          </ul>

          {!collapsed && (
            <p className="mt-4 pt-4 text-center text-xs text-gray-400 dark:text-gray-500">
              Version 2.0.0
            </p>
          )}
        </div> */}
      </aside>
    </TooltipProvider>
  );
}