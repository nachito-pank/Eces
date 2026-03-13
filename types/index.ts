// components/common/types/index.ts
export type UserRole = 'admin' | 'sous-admin' | 'enseignant' | 'etudiant' | 'visitor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status?: 'actif' | 'inactif' | 'en-attente';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  image?: string;
  rating: number;
  students: number;
  progress?: number;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface NavbarProps {
  userRole?: UserRole;
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

export interface SidebarProps {
  role: UserRole;
  collapsed?: boolean;
  onToggle?: () => void;
}

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: string;
  image?: string;
  footer?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export interface LayoutProps {
  children: React.ReactNode;
  userRole?: UserRole;
  userName?: string;
}