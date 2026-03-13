"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Lock, 
  UserRound,
  GraduationCap,
  Users,
  School,
  BookOpen
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type FormData = {
  matricule: string;
  password: string;
};

type UserRole = "Admin" | "Sous Admin" | "Enseignants" | "Etudiant";

interface RoleOption {
  id: UserRole;
  label: string;
  icon: React.ReactNode;
  color: string;
}

export default function LoginEtudiant() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const matriculeRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const roleOptions: RoleOption[] = [
    { 
      id: "Admin", 
      label: "Administrateur", 
      icon: <School className="w-5 h-5" />,
      color: "from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
    },
    { 
      id: "Sous Admin", 
      label: "Sous-Admin", 
      icon: <Users className="w-5 h-5" />,
      color: "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
    },
    { 
      id: "Enseignants", 
      label: "Enseignant", 
      icon: <BookOpen className="w-5 h-5" />,
      color: "from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
    },
    { 
      id: "Etudiant", 
      label: "Étudiant", 
      icon: <GraduationCap className="w-5 h-5" />,
      color: "from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
    },
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setActiveStep(1);
  };

  const handleBack = () => {
    setActiveStep(0);
    setSelectedRole("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const data: FormData = {
      matricule: matriculeRef.current?.value || "",
      password: passwordRef.current?.value || "",
    };

    console.log("Login data:", data);

    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Redirection selon le rôle
    const routes = {
      Admin: "/admin",
      "Sous Admin": "/sous-admin",
      Enseignants: "/enseignant",
      Etudiant: "/etudiant",
    };

    if (selectedRole) {
      router.push(routes[selectedRole as keyof typeof routes]);
    }

    setIsLoading(false);
    e.currentTarget.reset();
  };

  // Image de fond (à remplacer par votre image)
  const backgroundImage = "url('/bg.jpeg')";

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden"
      style={{ backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Overlay noir transparent */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Contenu principal */}
      <div className="relative z-10 w-full max-w-md">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          {/* Barre de progression */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200/20">
            <div 
              className="h-full bg-white transition-all duration-500"
              style={{ width: activeStep === 0 ? '50%' : '100%' }}
            />
          </div>

          {/* Conteneur des étapes */}
          <div className={`flex transition-transform duration-500 ease-in-out ${activeStep === 0 ? '' : '-translate-x-full'}`}>
            {/* Étape 1: Sélection du rôle */}
            <div className="min-w-full p-8 backdrop-blur-xl bg-white/10 border border-white/20">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur mb-4 border border-white/30">
                  <Image 
                    src="/logo.jpeg"
                    alt="ECES Logo"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Bienvenue à ECES</h1>
                <p className="text-white/80">Choisissez votre profil pour continuer</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {roleOptions.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className={`group relative overflow-hidden rounded-xl bg-gradient-to-r ${role.color} p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-white/20`}
                  >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <div className="relative flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-white/20 backdrop-blur">
                        {role.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-white font-semibold">{role.label}</h3>
                        <p className="text-white/70 text-sm">Cliquez pour continuer</p>
                      </div>
                      <div className="text-white/50 group-hover:text-white/90 transition-colors">
                        →
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Étape 2: Formulaire de connexion */}
            <div className="min-w-full p-8 backdrop-blur-xl bg-white/10 border border-white/20">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Retour</span>
              </button>

              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur mb-4 border border-white/30">
                  <Image 
                    src="/logo.jpeg"
                    alt="ECES Logo"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  Connexion {selectedRole && `- ${selectedRole}`}
                </h2>
                <p className="text-white/70">Entrez vos identifiants</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Champ Matricule (caché pour Admin) */}
                {selectedRole !== "Admin" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/90 flex items-center gap-2">
                      <UserRound className="w-4 h-4" />
                      Matricule
                    </label>
                    <div className="relative">
                      <Input
                        ref={matriculeRef}
                        type="text"
                        placeholder="Entrez votre matricule"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-transparent"
                        required
                      />
                      <UserRound className="absolute left-3 top-3.5 h-4 w-4 text-white/50" />
                    </div>
                  </div>
                )}

                {/* Champ Mot de passe */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/90 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    {selectedRole === "Admin" ? "Code Administrateur" : "Mot de passe"}
                  </label>
                  <div className="relative">
                    <Input
                      ref={passwordRef}
                      type={showPassword ? "text" : "password"}
                      placeholder="Entrez votre mot de passe"
                      className="w-full pl-10 pr-12 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-transparent"
                      required
                    />
                    <Lock className="absolute left-3 top-3.5 h-4 w-4 text-white/50" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-white/50 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Options supplémentaires */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-white/30 bg-white/10 text-white focus:ring-white/30"
                    />
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                      Se souvenir de moi
                    </span>
                  </label>
                  <Link 
                    href="#" 
                    className="text-sm font-medium text-white/80 hover:text-white hover:underline transition-colors"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>

                {/* Bouton de connexion */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-white hover:bg-white/90 text-blue-900 font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
                      <span>Connexion...</span>
                    </div>
                  ) : (
                    "Se Connecter"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/60 text-sm mt-6">
          © 2026 ECES - Tous droits réservés
        </p>
      </div>
    </div>
  );
}