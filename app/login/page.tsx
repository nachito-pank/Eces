"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  BookOpen,
  ChevronRight
} from "lucide-react";

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
  bgDark: string;
  bgLight: string;
  textColor: string;
}

const roleOptions: RoleOption[] = [
  { 
    id: "Etudiant", 
    label: "Espace Étudiant", 
    icon: <GraduationCap className="w-6 h-6" />,
    color: "from-blue-600 to-indigo-600",
    bgLight: "bg-blue-50 text-blue-600 border-blue-200",
    bgDark: "dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-800",
    textColor: "text-blue-600 dark:text-blue-400"
  },
  { 
    id: "Enseignants", 
    label: "Espace Enseignant", 
    icon: <BookOpen className="w-6 h-6" />,
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50 text-emerald-600 border-emerald-200",
    bgDark: "dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800",
    textColor: "text-emerald-600 dark:text-emerald-400"
  },
  { 
    id: "Sous Admin", 
    label: "Administration", 
    icon: <Users className="w-6 h-6" />,
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50 text-amber-600 border-amber-200",
    bgDark: "dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-800",
    textColor: "text-amber-600 dark:text-amber-400"
  },
  { 
    id: "Admin", 
    label: "Direction", 
    icon: <School className="w-6 h-6" />,
    color: "from-purple-600 to-fuchsia-600",
    bgLight: "bg-purple-50 text-purple-600 border-purple-200",
    bgDark: "dark:bg-purple-900/40 dark:text-purple-400 dark:border-purple-800",
    textColor: "text-purple-600 dark:text-purple-400"
  },
];

export default function LoginEtudiant() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeStep, setActiveStep] = useState<0 | 1>(0);
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const matriculeRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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

    const routes = {
      Admin: "/admin",
      "Sous Admin": "/sous-admin",
      Enseignants: "/enseignant",
      Etudiant: "/etudiant",
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    if (selectedRole) {
      router.push(routes[selectedRole as keyof typeof routes] + "/dashboard");
    }

    setIsLoading(false);
  };

  const currentRoleData = roleOptions.find(r => r.id === selectedRole);

  const variants = {
    initial: { opacity: 0, x: 15 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, x: -15, transition: { duration: 0.2, ease: "easeIn" } }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0a0f1c]">
      {/* Left Panel - Brand / Image / Pattern */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-blue-900 overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0">
          <Image 
            src="/bg.jpeg" 
            alt="Campus ECES" 
            fill 
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-blue-900/80 to-transparent" />
        </div>
        
        <div className="relative z-10 flex items-center gap-4">
          
          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-xl p-2 border-2 border-white/20">
             <Image src="/logo.jpeg" alt="Logo" width={50} height={50} className="object-contain rounded-xl" />
          </div>
          <span className="text-4xl font-extrabold text-white tracking-widest drop-shadow-md">ECES</span>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6 drop-shadow-sm">
            Votre portail académique d'excellence.
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed font-medium">
            Connectez-vous pour accéder à vos cours, suivre vos performances, interagir avec la faculté et bien plus encore. L'aventure commence ici.
          </p>
        </div>
        
        <div className="relative z-10 text-blue-300/60 text-sm font-semibold">
          © {new Date().getFullYear()} ECES. Tous droits réservés.
        </div>
      </div>

      {/* Right Panel - Auth Flow */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Subtle decorative glows for dark mode */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 dark:bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          
          {/* Mobile Header (Hidden on Desktop) */}
          <div className="lg:hidden flex flex-col items-center justify-center mb-10 text-center">
            <Link href="/">
              <div className="flex absolute -top-15 left-0 items-center gap-4 mb-8 cursor-pointer group w-fit">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                  <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:-translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-lg p-2 mb-4 border border-slate-100 dark:border-slate-800">
               <Image src="/logo.jpeg" alt="Logo" width={64} height={64} className="object-contain rounded-2xl" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Portail ECES</h1>
            <p className="text-slate-500 tracking-wide font-medium mt-1">Espace Académique</p>
            
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 0 : ROLE SELECTION */}
            {activeStep === 0 && (
              <motion.div
                key="step-0"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Bienvenue</h2>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Sélectionnez votre profil pour vous connecter au portail.</p>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-8">
                  {roleOptions.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => handleRoleSelect(role.id)}
                      className="group flex items-center w-full p-4 rounded-[1.5rem] border-2 transition-all duration-300 hover:shadow-xl dark:hover:shadow-black/40 bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800/80 hover:border-transparent dark:hover:border-transparent cursor-pointer"
                    >
                      <div className={`p-4 rounded-2xl border transition-colors duration-300 ${role.bgLight} ${role.bgDark}`}>
                        {role.icon}
                      </div>
                      <div className="ml-5 flex-1 text-left">
                        <span className="block text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {role.label}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 1 : LOGIN FORM */}
            {activeStep === 1 && currentRoleData && (
              <motion.div
                key="step-1"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="flex items-center gap-4 mb-8 cursor-pointer group w-fit" onClick={handleBack}>
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:-translate-x-0.5 transition-transform" />
                  </div>
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    Changer de profil
                  </span>
                </div>

                <div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border mb-5 text-sm font-bold shadow-sm ${currentRoleData.bgLight} ${currentRoleData.bgDark}`}>
                    {currentRoleData.icon}
                    {currentRoleData.label}
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Authentification</h2>
                  <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Saisissez vos identifiants pour accéder à votre espace sécurisé.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                  {selectedRole !== "Admin" && (
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                        Numéro de Matricule
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <UserRound className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <Input
                          ref={matriculeRef}
                          type="text"
                          placeholder="Ex: 23E0012"
                          className="w-full pl-12 pr-4 py-7 bg-white dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800/80 focus-visible:ring-blue-500 focus-visible:border-blue-500 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 font-semibold shadow-sm transition-all"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                      {selectedRole === "Admin" ? "Code Administrateur" : "Mot de passe"}
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <Input
                        ref={passwordRef}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full pl-12 pr-14 py-7 bg-white dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800/80 focus-visible:ring-blue-500 focus-visible:border-blue-500 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 font-semibold shadow-sm transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          className="peer w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 bg-transparent text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-900 appearance-none checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                        />
                        <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        Rester connecté
                      </span>
                    </label>
                    <Link 
                      href="#" 
                      className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-all"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-7 mt-8 rounded-2xl font-bold text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 bg-gradient-to-r ${currentRoleData.color} border-none disabled:opacity-70 disabled:hover:translate-y-0 text-lg`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Connexion sécurisée...</span>
                      </div>
                    ) : (
                      "Se connecter à mon espace"
                    )}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}