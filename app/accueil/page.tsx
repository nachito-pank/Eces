"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { 
  TrendingUp, Calendar, Award, BookOpen, Users, ShieldCheck, 
  ArrowRight, GraduationCap, ChevronRight, CheckCircle2,
  Phone, Mail, MapPin, Newspaper, CalendarDays, ArrowUpRight
} from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const actualites = [
  {
    id: 1,
    titre: "Cérémonie de Remise des Diplômes",
    date: "15 Juin 2026",
    type: "Événement",
    image: "/bg.jpeg",
    description: "Rejoignez-nous au grand amphithéâtre pour célébrer la réussite académique impressionnante de notre majestueuse promotion sortante.",
    link: "#"
  },
  {
    id: 2,
    titre: "Nouveauté : Pôle Intelligence Artificielle",
    date: "02 Mai 2026",
    type: "Innovation Académique",
    image: "/logo.jpeg",
    description: "L'ECES annonce officiellement l'accréditation et l'ouverture de sa toute nouvelle filière d'ingénierie spécialisée en Informatique, Data Science et IA.",
    link: "#"
  },
  {
    id: 3,
    titre: "Tournoi Sportif Universitaire",
    date: "28 Avril 2026",
    type: "Vie Étudiante",
    image: "/bg.jpeg",
    description: "L'équipe du campus s'affrontera pour la finale de basketball inter-filières ce grand weekend. Venez nombreux les acclamer et les soutenir !",
    link: "#"
  }
];

export default function Accueil() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c] font-sans overflow-x-hidden selection:bg-blue-500/30">
      
      {/* ---------------- NAVBAR ---------------- */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 dark:bg-[#0a0f1c]/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center p-1 shadow-md border border-slate-100/50 dark:border-white/10 overflow-hidden transition-transform group-hover:scale-105">
               <Image src="/logo.jpeg" alt="ECES Logo" width={48} height={48} className="object-contain rounded-full" />
            </div>
            <span className={`text-xl md:text-2xl font-extrabold tracking-tight transition-colors ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white drop-shadow-md'}`}>
               ECES
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className={scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}>
              <AnimatedThemeToggler />
            </div>
            <Link 
              href="/login"
              className={`hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all hover:scale-105 hover:shadow-lg ${
                scrolled 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20' 
                  : 'bg-white text-blue-900 hover:bg-white/90 shadow-black/10'
              }`}
            >
              Se connecter <ArrowRight className="w-4 h-4" />
            </Link>
            {/* Mobile login button */}
            <Link 
              href="/login"
              className={`sm:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                scrolled ? 'bg-blue-600 text-white' : 'bg-white text-blue-900'
              }`}
            >
              <UserRoundIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative min-h-[100svh] flex items-center justify-center pt-28 pb-10 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bg.jpeg" 
            alt="Campus Background" 
            fill 
            className="object-cover scale-105 animate-slow-pan"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/90 via-slate-900/80 to-slate-50 dark:to-[#0a0f1c] mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-[#0a0f1c] via-transparent to-transparent h-56 bottom-0 top-auto z-10" />
        </div>

        {/* Note la classe pb-32 ou mb-10 ajoutée ici sur le container pour élever le contenu afin qu'il ne chevauche pas les cartes statistiques ! */}
        <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col items-center text-center pb-24 md:pb-36 mt-16 md:mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 text-sm font-semibold shadow-2xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Plateforme académique 2025-2026
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-xl max-w-5xl"
          >
            L'excellence éducative <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              au cœur de l'innovation.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-200 max-w-2xl mb-12 font-medium leading-relaxed drop-shadow-md"
          >
            L'École Communautaire de l'Enseignement Supérieur (ECES) vous offre un espace numérique performant liant campus, cursus et administration en temps réel.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
          >
            <Link 
              href="/login"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              Accéder à l'Espace <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="#decouvrir"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Découvrir ECES
            </a>
          </motion.div>
        </div>
      </section>

      {/* ---------------- STATS SECTION ---------------- */}
      <section className="relative z-20 -mt-24 md:-mt-32 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div variants={fadeIn} className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-transform hover:-translate-y-2 group">
            <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-7 h-7" />
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">95%</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Taux de réussite record aux examens nationaux et concours internationaux.</p>
          </motion.div>

          <motion.div variants={fadeIn} className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-transform hover:-translate-y-2 group">
            <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">2001</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Année de création et d'agrément officiel par le ministère public.</p>
          </motion.div>

          <motion.div variants={fadeIn} className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-transform hover:-translate-y-2 group">
            <div className="w-14 h-14 bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">+25 ans</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">D'expertise inébranlable et d'expérience dans l'enseignement universitaire.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ---------------- ACTUALITÉS / NEWS SECTION ---------------- */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-blue-600 dark:text-blue-500 font-bold tracking-widest uppercase mb-3 text-sm flex items-center gap-2">
                <Newspaper className="w-4 h-4" /> Vie au Campus
              </h2>
              <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">Dernières Actualités</h3>
              <p className="text-lg text-slate-500 dark:text-slate-400 mt-4 font-medium">Restez informé de tout ce qui se passe publiquement autour de notre belle institution.</p>
            </div>
            <Link href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shrink-0">
              Toute l'actualité <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {actualites.map((news) => (
              <motion.article 
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image 
                    src={news.image} 
                    alt={news.titre} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 border border-white/20 dark:border-slate-700/50 shadow-sm uppercase tracking-wider">
                      {news.type}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-semibold mb-3">
                    <CalendarDays className="w-4 h-4" />
                    <span>{news.date}</span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {news.titre}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-6 flex-1">
                    {news.description}
                  </p>
                  <Link href={news.link} className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline mt-auto">
                    Lire la suite <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FEATURES SECTION ---------------- */}
      <section id="decouvrir" className="py-24 px-6 md:px-12 bg-slate-100/50 dark:bg-[#0a0f1c] border-t border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-blue-600 dark:text-blue-500 font-bold tracking-widest uppercase mb-3 text-sm">Notre Écosystème</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">Un portail pensé pour l'excellence.</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Découvrez des espaces dédiés et sécurisés pour chaque acteur de l'établissement, avec des outils métiers hautement structurés pour vous assister.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<GraduationCap className="w-8 h-8"/>}
              title="Espace Étudiant"
              desc="Accédez à vos cours, consultez vos emplois du temps hebdomadaires, suivez l'évolution de vos notes et interagissez avec votre promotion."
              colorClass="from-blue-600 to-indigo-600"
              bgClass="bg-blue-50 dark:bg-blue-900/20"
              iconColor="text-blue-600 dark:text-blue-400"
              bullets={["Support de cours (PDF)", "Relevés de notes dynamiques", "Messagerie interactive", "Suivi des paiements officiels"]}
            />
            
            <FeatureCard 
              icon={<BookOpen className="w-8 h-8"/>}
              title="Espace Enseignant"
              desc="Gérez vos classes d'une main de maître. Uploadez des ressources pédagogiques, saisissez les évaluations et suivez l'assiduité."
              colorClass="from-emerald-500 to-teal-600"
              bgClass="bg-emerald-50 dark:bg-emerald-900/20"
              iconColor="text-emerald-600 dark:text-emerald-400"
              bullets={["Saisie des pondérations", "Partage de documents (Word, XL)", "Listes des étudiants et majeurs", "Consultation d'emploi du temps"]}
            />

            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8"/>}
              title="Administration"
              desc="Pilotez l'établissement en temps réel. Gérez les filières, les enseignants, les inscriptions massives et la facturation globale."
              colorClass="from-purple-600 to-fuchsia-600"
              bgClass="bg-purple-50 dark:bg-purple-900/20"
              iconColor="text-purple-600 dark:text-purple-400"
              bullets={["Gestion des cohortes et filières", "Tableau de bord financier", "Génération unifiée des bulletins", "Déploiement central des Annonces"]}
            />
          </div>
        </div>
      </section>

      {/* ---------------- CALL TO ACTION ---------------- */}
      <section className="py-24 px-6 md:px-12 bg-white dark:bg-[#0a0f1c] border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-indigo-900 to-[#0A2540] rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          {/* Decals */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Prêt à commencer ?</h2>
            <p className="text-lg md:text-xl text-indigo-200 mb-10 leading-relaxed font-medium">Rejoignez votre espace dès maintenant pour profiter sans attente de tous les services numériques intelligents que propose ECES.</p>
            <Link 
              href="/login"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-indigo-950 hover:bg-slate-50 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-xl"
            >
              Se Connecter au Portail <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-slate-50 dark:bg-[#0a0f1c] pt-20 pb-10 px-6 md:px-12 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.jpeg" alt="ECES Logo" width={44} height={44} className="rounded-xl shadow-md border border-slate-200 dark:border-slate-700" />
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">ECES</span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-md leading-relaxed">
              École Communautaire de l'Enseignement Supérieur, la référence avérée en excellence académique et en accompagnement personnalisé et technologique vers votre accomplissement au Congo.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Agrément N°0012 MES-CAB.DGSUP
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Secrétariat Administratif</h4>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400 font-medium">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="leading-snug">1399 rue Moukoukoulou<br/>Plateau des 15 ans,<br/>Brazzaville, Rép. du Congo</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="leading-snug">+242 06-951-24-69<br/>+242 06-688-65-79</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <span>info@ecesonline.org</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Liens Rapides & Outils</h4>
            <ul className="space-y-3 font-medium">
              <li><Link href="/login" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Se Connecter (Portail Web)</Link></li>
              <li><Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Notre équipe et histoire</Link></li>
              <li><Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Mentions légales</Link></li>
              <li><Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Politique de confidentialité relative</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200/60 dark:border-slate-800/60 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            © {new Date().getFullYear()} ECES. Tous droits réservés.
          </p>
          <p className="text-slate-400 dark:text-slate-500 text-sm font-semibold">
            Développé avec excellence.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Composant interne pour les cartes "Features"
const FeatureCard = ({ icon, title, desc, colorClass, bgClass, iconColor, bullets }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300 group flex flex-col"
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${bgClass}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 font-medium mb-8 leading-relaxed">
        {desc}
      </p>
      
      <div className="space-y-3 mt-auto">
        {bullets.map((b: string, i: number) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle2 className={`w-5 h-5 shrink-0 py-0.5 ${iconColor}`} />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-tight">{b}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function UserRoundIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>
    </svg>
  );
}