"use client";
import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Lock,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

export default function ParametresPage() {
  const [activeSection, setActiveSection] = useState('general');

  const menuItems = [
    {
      id: 'general',
      title: 'Général',
      icon: Settings,
      description: 'Paramètres généraux du compte'
    },
    {
      id: 'profil',
      title: 'Profil',
      icon: User,
      description: 'Informations personnelles'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Préférences de notification'
    },
    {
      id: 'securite',
      title: 'Sécurité',
      icon: Shield,
      description: 'Mot de passe et authentification'
    },
    {
      id: 'apparence',
      title: 'Apparence',
      icon: Palette,
      description: 'Thème et personnalisation'
    },
    {
      id: 'langue',
      title: 'Langue',
      icon: Globe,
      description: 'Préférences linguistiques'
    },
    {
      id: 'confidentialite',
      title: 'Confidentialité',
      icon: Lock,
      description: 'Contrôle des données'
    },
    {
      id: 'aide',
      title: 'Aide',
      icon: HelpCircle,
      description: 'Support et documentation'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Paramètres généraux</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Mode hors ligne</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Autoriser l'accès hors ligne</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Sauvegarde automatique</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Sauvegarder automatiquement les modifications</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                </button>
              </div>
            </div>
          </div>
        );
      case 'profil':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Informations du profil</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom complet</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="votre.email@exemple.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Téléphone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {menuItems.find(item => item.id === activeSection)?.title}
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <p className="text-gray-500 dark:text-gray-400">
                Cette section est en cours de développement. Les paramètres détaillés seront bientôt disponibles.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Paramètres</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Gérez vos préférences et paramètres de compte
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Menu latéral */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5" />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Contenu */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
