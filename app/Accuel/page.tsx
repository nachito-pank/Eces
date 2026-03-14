'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';

export default function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const updateTheme = () => setIsDark(document.documentElement.classList.contains("dark"));
        updateTheme();
        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    const faqItems = [
        {
            q: "Comment me connecter à la plateforme ?",
            r: "Rendez-vous sur la page de connexion et utilisez votre matricule (étudiant) ou votre email (enseignant/administration) avec votre mot de passe."
        },
        {
            q: "Qui peut accéder à la plateforme ?",
            r: "La plateforme est accessible aux étudiants, enseignants, sous-administrateurs et à l'administration. Chaque rôle dispose d'un espace dédié."
        },
        {
            q: "Comment consulter mon emploi du temps ?",
            r: "Connectez-vous à votre espace étudiant, rendez-vous dans la section 'Emploi du temps' et sélectionnez Cours ou Sessions."
        },
        {
            q: "Que faire si j'ai oublié mon mot de passe ?",
            r: "Contactez l'administration de l'école directement pour réinitialiser votre mot de passe. Un sous-administrateur peut effectuer cette opération."
        },
        {
            q: "Les informations sont-elles sécurisées ?",
            r: "Oui. La plateforme utilise Supabase avec des politiques de sécurité strictes. Seules les personnes autorisées accèdent aux données les concernant."
        }
    ];

    return (
        <div className="lp-wrapper bg-white dark:bg-gray-900 text-slate-900 dark:text-slate-100" style={{ minHeight: '100vh', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        :root {
          --lp-blue-deep: #0D1F38;
          --lp-blue-eces: #1F4E77;
          --lp-blue-medium: #2E75B6;
          --lp-blue-light: #60A8E8;
          --lp-gold: #D4A017;
          --lp-text-main: #1E293B;
          --lp-text-sec: #64748B;
          --lp-bg-sec: #F5F7FA;
        }

        .dark {
          --lp-blue-deep: #F5F7FA;
          --lp-blue-eces: #60A8E8;
          --lp-blue-medium: #2E75B6;
          --lp-blue-light: #60A8E8;
          --lp-gold: #D4A017;
          --lp-text-main: #F5F7FA;
          --lp-text-sec: #94A3B8;
          --lp-bg-sec: #1E293B;
        }

        .lp-title-font { font-family: 'Playfair Display', serif; }
        
        @keyframes lp-in {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes lp-bar {
          from { width: 0; }
          to { width: 60px; }
        }

        @keyframes lp-shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .lp-animate {
          opacity: 0;
          animation: lp-in 0.8s ease forwards;
          animation-delay: var(--delay, 0s);
        }

        .lp-bar-anim {
          height: 3px;
          background: var(--lp-gold);
          width: 0;
          animation: lp-bar 1s ease forwards;
          animation-delay: 0.5s;
          margin: 16px auto 0;
        }

        .lp-btn-shine {
          position: relative;
          overflow: hidden;
        }

        .lp-btn-shine::before {
          content: '';
          position: absolute; 
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
          transform: skewX(-25deg);
          transition: 0s;
        }

        .lp-btn-shine:hover::before {
          animation: lp-shine 0.6s ease forwards;
        }

        .lp-feature-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .lp-feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.06);
        }

        .lp-faq-answer {
          transition: max-height 0.35s ease, padding 0.35s ease;
          max-height: 0;
          overflow: hidden;
        }

        .lp-faq-answer.lp-open {
          max-height: 200px;
          padding-bottom: 20px;
        }

        .lp-nav-link {
          position: relative;
          color: var(--lp-blue-deep);
          font-weight: 500;
          transition: color 0.2s;
        }

        .lp-nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--lp-blue-eces);
          transition: width 0.3s;
        }

        .lp-nav-link:hover::after {
          width: 100%;
        }

        .logo {
        border-radius: 50%;
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

            {/* 1. NAVBAR */}
            <nav className="lp-navbar sticky top-0 w-full bg-white dark:bg-gray-900 border-b border-[#E2E8F0] dark:border-gray-700 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/logo.jpeg" alt="ECES" className="h-12 w-auto object-contain logo" />
                        <span className="lp-title-font text-2xl font-bold text-[#0D1F38] dark:text-gray-100">ECES</span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        <Link href="/etudiant/notifications" className="lp-nav-link">Actualités</Link>
                        <Link href="/etudiant/mes-cours" className="lp-nav-link">Cours</Link>
                        <AnimatedThemeToggler className="p-2 text-blue-600 hover:text-[#1F4E79] transition-colors" />
                    </div>

                    <div className="hidden lg:block">
                        <Link href="/login" className="lp-btn-shine bg-[#1F4E79] text-white px-6 py-2.5 rounded-lg font-semibold transition-colors hover:bg-[#0D1F38] inline-block">
                            Se connecter
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden p-2 text-[#0D1F38] dark:text-gray-100"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-b border-[#E2E8F0] dark:border-gray-700 p-6 flex flex-col gap-4 shadow-lg">
                        <Link href="/etudiant/notifications" className="text-[#0D1F38] dark:text-gray-100 font-medium" onClick={() => setIsMenuOpen(false)}>Actualités</Link>
                        <Link href="/etudiant/mes-cours" className="text-[#0D1F38] dark:text-gray-100 font-medium" onClick={() => setIsMenuOpen(false)}>Cours</Link>
                        <AnimatedThemeToggler className="p-2 text-[#0D1F38] hover:text-[#1F4E79] transition-colors self-center" onClick={() => setIsMenuOpen(false)} />
                        <Link href="/login" className="bg-[#1F4E79] text-white px-6 py-3 rounded-lg font-semibold text-center" onClick={() => setIsMenuOpen(false)}>
                            Se connecter
                        </Link>
                    </div>
                )}
            </nav>

            {/* 2. HERO */}
            <section className="lp-hero relative min-h-screen flex items-center justify-center overflow-hidden">
                <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                    <source src="https://video-previews.elements.envatousercontent.com/97f4a2be-a586-4ed2-8452-464b5c22ba89/watermarked_preview/watermarked_preview.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[#0D1F38]/62 z-0"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <div className="lp-animate inline-block px-4 py-1.5 rounded-full bg-[#D4A017]/15 border border-[#D4A017]/30 text-[#D4A017] text-sm font-bold mb-8" style={{ '--delay': '0.1s' } as any}>
                        Depuis 2001 · Brazzaville
                    </div>

                    <h1 className="lp-animate lp-title-font text-white text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6" style={{ '--delay': '0.2s' } as any}>
                        L&apos;excellence scolaire,<br />enfin accessible.
                    </h1>

                    <p className="lp-animate text-white/60 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed" style={{ '--delay': '0.3s' } as any}>
                        Gérez notes, emplois du temps, paiements et communications depuis une seule plateforme sécurisée, conçue pour toute la communauté ECES.
                    </p>

                    <div className="lp-animate flex flex-col sm:flex-row items-center justify-center gap-4 mb-16" style={{ '--delay': '0.4s' } as any}>
                        <Link href="/login" className="lp-btn-shine w-full sm:w-auto bg-[#1F4E79] text-white px-8 py-4 rounded-lg font-bold transition-colors hover:bg-[#0D1F38]">
                            Accéder à la plateforme
                        </Link>
                        <Link href="/etudiant/mes-cours" className="w-full sm:w-auto border-[1.5px] border-white text-white px-8 py-4 rounded-lg font-bold transition-all hover:bg-white/10">
                            Voir les cours
                        </Link>
                    </div>

                    {/* Stats Bar */}
                    <div className="lp-animate grid grid-cols-3 gap-4 pt-8 border-t border-white/15" style={{ '--delay': '0.5s' } as any}>
                        <div>
                            <div className="lp-title-font text-white text-2xl md:text-3xl font-bold">500+</div>
                            <div className="text-white/60 text-xs md:text-sm uppercase tracking-wider mt-1">Étudiants</div>
                        </div>
                        <div>
                            <div className="lp-title-font text-white text-2xl md:text-3xl font-bold">30+</div>
                            <div className="text-white/60 text-xs md:text-sm uppercase tracking-wider mt-1">Enseignants</div>
                        </div>
                        <div>
                            <div className="lp-title-font text-white text-2xl md:text-3xl font-bold">12+</div>
                            <div className="text-white/60 text-xs md:text-sm uppercase tracking-wider mt-1">Filières</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. PRÉSENTATION */}
            <section className="lp-presentation py-24 px-6 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 lp-animate" style={{ '--delay': '0.1s' } as any}>
                        <h2 className="lp-title-font text-[#0D1F38] dark:text-gray-100 text-3xl md:text-4xl font-bold mb-2">Une école, une communauté</h2>
                        <p className="text-[#64748B] dark:text-gray-400 text-lg">Découvrez l&apos;ECES en quelques mots</p>
                        <div className="lp-bar-anim"></div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Col: Quote Card */}
                        <div className="lp-animate" style={{ '--delay': '0.2s' } as any}>
                            <div className="bg-[#F5F7FA] dark:bg-gray-800 p-10 rounded-2xl border border-[#E2E8F0] dark:border-gray-700">
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#D4A017"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                    ))}
                                </div>
                                <blockquote className="lp-title-font italic text-2xl text-[#0D1F38] dark:text-gray-100 mb-8 leading-relaxed">
                                    &quot;L&apos;ECES m&apos;a offert un cadre d&apos;apprentissage exceptionnel. La nouvelle plateforme facilite énormément notre quotidien, surtout pour le suivi des notes.&quot;
                                </blockquote>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#1F4E79] flex items-center justify-center text-white font-bold">JD</div>
                                    <div>
                                        <div className="font-bold text-[#0D1F38] dark:text-gray-100">Okemba Gercy C.</div>
                                        <div className="text-sm text-[#64748B] dark:text-gray-400">Étudiant en Master Informatique</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Col: Content */}
                        <div className="lp-animate" style={{ '--delay': '0.3s' } as any}>
                            <h3 className="lp-title-font text-[#0D1F38] dark:text-gray-100 text-3xl font-bold mb-6">L&apos;excellence au cœur de Brazzaville</h3>
                            <p className="text-[#64748B] dark:text-gray-400 leading-loose mb-8 text-lg">
                                L&apos;École Communautaire de l&apos;Enseignement Supérieur s&apos;engage à former les leaders de demain. Notre approche pédagogique allie rigueur académique et innovation technologique pour offrir à nos étudiants les meilleures chances de réussite.
                            </p>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "Suivi pédagogique personnalisé",
                                    "Communication directe avec l'administration",
                                    "Accès 24h/24 à vos ressources"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-[#1E293B] dark:text-gray-100 font-medium">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1F4E79]/10 flex items-center justify-center">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1F4E79" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/login" className="text-[#2E75B6] dark:text-blue-400 font-bold flex items-center gap-2 hover:gap-4 transition-all">
                                se connecter <span>→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. FONCTIONNALITÉS */}
            <section className="lp-features py-24 px-6 bg-[#F5F7FA] dark:bg-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 lp-animate" style={{ '--delay': '0.1s' } as any}>
                        <h2 className="lp-title-font text-[#0D1F38] dark:text-gray-100 text-3xl md:text-4xl font-bold mb-4">Tout ce dont vous avez besoin</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Notes & Résultats",
                                desc: "Consultez vos notes, moyennes et résultats de devoirs et de sessions.",
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>
                            },
                            {
                                title: "Emplois du temps",
                                desc: "Votre EDT par filière, mis à jour en temps réel.",
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                            },
                            {
                                title: "Actualités",
                                desc: "Annonces, événements et nouvelles de l'école.",
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 20l-7-7-7 7V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
                            },
                            {
                                title: "Paiements",
                                desc: "Suivez et gérez vos frais de scolarité facilement.",
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="lp-feature-card lp-animate bg-white dark:bg-gray-900 p-8 rounded-2xl border border-[#E2E8F0] dark:border-gray-700" style={{ '--delay': `${0.2 + idx * 0.1}s` } as any}>
                                <div className="w-12 h-12 bg-[#EEF4FB] dark:bg-gray-700 rounded-xl flex items-center justify-center text-[#1F4E79] dark:text-blue-400 mb-6">
                                    {feature.icon}
                                </div>
                                <h4 className="text-[#0D1F38] dark:text-gray-100 text-lg font-bold mb-3">{feature.title}</h4>
                                <p className="text-[#64748B] dark:text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. FAQ */}
            <section className="lp-faq py-24 px-6 bg-white dark:bg-gray-900">
                <div className="max-w-[760px] mx-auto">
                    <div className="text-center mb-12 lp-animate" style={{ '--delay': '0.1s' } as any}>
                        <h2 className="lp-title-font text-[#0D1F38] dark:text-gray-100 text-3xl md:text-4xl font-bold mb-2">Questions fréquentes</h2>
                        <div className="lp-bar-anim"></div>
                    </div>

                    <div className="space-y-2 lp-animate" style={{ '--delay': '0.2s' } as any}>
                        {faqItems.map((item, idx) => (
                            <div key={idx} className="border-b border-gray-200 dark:border-gray-700">
                                <button
                                    className="w-full py-6 flex items-center justify-between text-left group"
                                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                                >
                                    <span className="text-[#0D1F38] dark:text-gray-100 font-semibold text-base md:text-lg group-hover:text-[#1F4E79] dark:group-hover:text-blue-400 transition-colors">{item.q}</span>
                                    <svg
                                        className={`transition-transform duration-300 text-[#64748B] dark:text-gray-400 ${openFaqIndex === idx ? 'rotate-180' : ''}`}
                                        width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    >
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </button>
                                <div className={`lp-faq-answer ${openFaqIndex === idx ? 'lp-open' : ''}`}>
                                    <p className="text-[#64748B] dark:text-gray-400 text-sm md:text-base leading-relaxed">
                                        {item.r}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. FOOTER */}
            <footer className="lp-footer bg-[#0D1F38] dark:bg-gray-950 py-10 px-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-3">
                        <img src="/logo.jpeg" alt="ECES" className="h-12 w-12 object-contain logo" />
                        <span className="lp-title-font text-xl font-bold text-white"><span className='text-blue-600'>E</span>CES</span>
                    </div>

                    <div className="text-white/40 text-xs md:text-sm font-medium text-center">
                        © 2025 École Communautaire de l&apos;Enseignement Supérieur
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="/etudiant/notifications" className="text-white/60 hover:text-white text-sm transition-colors">Actualités</Link>
                        <Link href="/etudiant/mes-cours" className="text-white/60 hover:text-white text-sm transition-colors">Cours</Link>
                        <Link href="/login" className="text-white/60 hover:text-white text-sm transition-colors">Connexion</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
