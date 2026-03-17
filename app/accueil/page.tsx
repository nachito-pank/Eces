"use client"

import Link from "next/link"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { TrendingUp, Calendar, Award, Clipboard, MessageCircle, BookOpen, Clock, FileText, Download } from "lucide-react"

function GlassEffects() {
    return (
        <>
            <style jsx global>{`
                .shards-layer {
                    position: fixed;
                    inset: 0;
                    z-index: 10;
                    pointer-events: none;
                    overflow: hidden;
                }

                .shard {
                    position: absolute;
                    background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(148,197,253,0.04) 50%, rgba(255,255,255,0.02) 100%);
                    border: 1px solid rgba(148,197,253,0.12);
                    backdrop-filter: blur(2px);
                    clip-path: polygon(var(--p));
                    transform-origin: center;
                    animation: shard-float var(--dur, 8s) ease-in-out infinite;
                    animation-delay: var(--delay, 0s);
                }

                @keyframes shard-float {
                    0%, 100% { transform: translateY(0) rotate(var(--rot, 0deg)) scale(1); opacity: var(--op, 0.6); }
                    33%       { transform: translateY(-12px) rotate(calc(var(--rot, 0deg) + 1deg)) scale(1.01); opacity: calc(var(--op, 0.6) * 1.3); }
                    66%       { transform: translateY(6px) rotate(calc(var(--rot, 0deg) - 0.5deg)) scale(0.99); opacity: calc(var(--op, 0.6) * 0.8); }
                }

                .light-beam {
                    position: fixed;
                    z-index: 8;
                    pointer-events: none;
                    border-radius: 50%;
                    filter: blur(60px);
                    animation: beam-pulse var(--dur, 6s) ease-in-out infinite;
                    animation-delay: var(--delay, 0s);
                }

                @keyframes beam-pulse {
                    0%, 100% { opacity: var(--op, 0.15); transform: scale(1); }
                    50%       { opacity: calc(var(--op, 0.15) * 1.6); transform: scale(1.08); }
                }

                .s1  { --p:0% 20%,40% 0%,55% 30%,20% 50%;  --rot:-8deg;  --dur:9s;  --delay:0s;   --op:0.7; width:320px; height:280px; top:5%;  left:-5%;  }
                .s2  { --p:0% 0%,100% 10%,80% 100%,15% 85%; --rot:5deg;   --dur:11s; --delay:1.5s; --op:0.5; width:260px; height:340px; top:8%;  right:-3%; }
                .s3  { --p:20% 0%,100% 25%,70% 100%,0% 60%; --rot:-3deg;  --dur:13s; --delay:3s;   --op:0.4; width:200px; height:250px; top:45%; left:2%;  }
                .s4  { --p:0% 30%,60% 0%,100% 50%,40% 100%; --rot:12deg;  --dur:10s; --delay:0.8s; --op:0.55;width:240px; height:200px; top:60%; right:1%; }
                .s5  { --p:15% 0%,85% 5%,100% 70%,50% 100%,0% 80%; --rot:-6deg; --dur:14s; --delay:2s; --op:0.35; width:300px; height:280px; bottom:-5%; left:20%; }
                .s6  { --p:0% 15%,50% 0%,80% 40%,60% 100%,10% 90%; --rot:4deg; --dur:12s; --delay:4s; --op:0.45; width:220px; height:260px; top:30%; right:-2%; }
                .s7  { --p:10% 0%,90% 20%,100% 80%,20% 100%; --rot:-10deg; --dur:16s; --delay:1s; --op:0.3; width:180px; height:200px; bottom:10%; right:8%; }
                .s8  { --p:0% 40%,40% 0%,100% 30%,80% 100%; --rot:7deg; --dur:10s; --delay:5s; --op:0.5; width:150px; height:180px; top:70%; left:35%; }

                .ss1 { --p:0% 0%,100% 20%,80% 100%,5% 90%; --rot:25deg; --dur:7s;  --delay:0.5s; width:60px;  height:70px;  top:15%; left:40%; --op:0.8; }
                .ss2 { --p:10% 0%,100% 0%,90% 100%,0% 80%; --rot:-15deg;--dur:9s;  --delay:2.5s; width:45px;  height:55px;  top:55%; left:55%; --op:0.7; }
                .ss3 { --p:0% 20%,80% 0%,100% 70%,30% 100%;--rot:40deg; --dur:8s;  --delay:1s;   width:80px;  height:65px;  top:35%; right:15%;--op:0.6; }
                .ss4 { --p:20% 0%,100% 10%,80% 100%,0% 85%;--rot:-30deg;--dur:11s; --delay:3.5s; width:50px;  height:60px;  bottom:20%;left:45%;--op:0.9; }
                .ss5 { --p:0% 0%,100% 30%,70% 100%,10% 80%;--rot:18deg; --dur:6s;  --delay:0s;   width:35px;  height:42px;  top:80%; right:30%;--op:0.7; }

                .lb1 { width:500px; height:400px; background:radial-gradient(ellipse, rgba(96,168,232,0.2), transparent 70%); top:-100px; left:-100px; --dur:7s; --op:0.8; }
                .lb2 { width:400px; height:500px; background:radial-gradient(ellipse, rgba(31,78,121,0.25), transparent 70%); bottom:-80px; right:-80px; --dur:9s; --delay:3s; --op:0.8; }
                .lb3 { width:300px; height:300px; background:radial-gradient(ellipse, rgba(148,197,253,0.12), transparent 70%); top:40%; left:30%; --dur:11s; --delay:1.5s; --op:0.6; }
            `}</style>

            <div className="light-beam lb1" />
            <div className="light-beam lb2" />
            <div className="light-beam lb3" />

            <div className="shards-layer">
                <div className="shard s1" />
                <div className="shard s2" />
                <div className="shard s3" />
                <div className="shard s4" />
                <div className="shard s5" />
                <div className="shard s6" />
                <div className="shard s7" />
                <div className="shard s8" />
                <div className="shard-small ss1" />
                <div className="shard-small ss2" />
                <div className="shard-small ss3" />
                <div className="shard-small ss4" />
                <div className="shard-small ss5" />
            </div>
        </>
    )
}

export default function Accuel() {
    const [scrolled, setScrolled] = useState(false)
    const [emploisDuTemps, setEmploisDuTemps] = useState([])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        fetch('/api/emploi-du-temps')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setEmploisDuTemps(data.data)
                }
            })
            .catch(err => console.error('Erreur:', err))
    }, [])

    return (
        <>
            <GlassEffects />

            <nav
                className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
                    scrolled
                        ? "bg-white/20 dark:bg-black/50 backdrop-blur-md border border-white/10 dark:border-white/20 shadow-lg"
                        : "bg-white/10 dark:bg-black/40 backdrop-blur-md"
                }`}
            >
                <Link href="/" className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue-400">
                    <span className="w-8 h-8 rounded-full border border-blue-200/30 bg-[rgba(31,78,121,0.35)] overflow-hidden flex items-center justify-center">
                        <img src="/logo.jpeg" alt="ECES" className="w-full h-full object-cover" />
                    </span>
                    ECES
                </Link>

                <div className="flex items-center gap-3">
                    <AnimatedThemeToggler />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded shadow-sm hover:bg-blue-600 transition"
                        onClick={() => window.location.href = "/login"}
                    >
                        Se connecter
                    </button>
                </div>
            </nav>

            <motion.div
                className="relative h-screen overflow-hidden"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <img src="/bg.jpeg" alt="Hero" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/40 to-black/70" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 pt-24 z-20">
                    <motion.div
                        className="text-7xl md:text-8xl font-bold mb-4 tracking-tight"
                        initial={{ x: 120, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        BIENVENUE
                    </motion.div>
                    <motion.div
                        className="text-4xl md:text-5xl font-semibold text-center max-w-3xl leading-snug"
                        initial={{ x: 120, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.9 }}
                    >
                        Dans la platform de gestion scolaire d&apos;<span className="text-blue-400">ECES</span>
                    </motion.div>
                    <motion.div
                        className="mt-6 text-sm md:text-base text-gray-200 max-w-xl text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.4 }}
                    >
                        Suivez les notes, gérez les emplois du temps, communiquez avec les familles et restez informé en temps réel.
                    </motion.div>
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0">
                    <svg
                        viewBox="0 0 1440 120"
                        className="w-full h-24 md:h-32"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="rgba(255,255,255,0.15)"
                            d="M0,32L80,42.7C160,53,320,75,480,90.7C640,107,800,117,960,117.3C1120,117,1280,107,1360,101.3L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
                        />
                    </svg>
                </div>
            </motion.div>

            <section className="container mx-auto mt-8 px-4">
                <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6">Quelques chiffres clés</h2>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6">
                    <motion.div
                        className="bg-gray-400/20 backdrop-blur-md border border-white/30 rounded-xl p-6 text-center shadow-lg transition-transform hover:scale-105 hover:z-20 relative group"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <div className="absolute inset-0 bg-blue-400/20 h-0 transition-all duration-300 group-hover:h-full rounded-xl"></div>
                        <div className="relative z-10">
                            <TrendingUp className="mx-auto mb-3 w-14 h-14 text-blue-400" />
                            <h3 className="text-xl font-semibold text-black dark:text-gray-200">Taux de Réussite</h3>
                            <p className="text-3xl font-bold text-black dark:text-gray-200 mt-2">95%</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="bg-gray-400/20 backdrop-blur-md border border-white/30 rounded-xl p-6 text-center shadow-lg transition-transform hover:scale-105 hover:z-20 relative group"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="absolute inset-0 bg-green-400/20 h-0 transition-all duration-300 group-hover:h-full rounded-xl"></div>
                        <div className="relative z-10">
                            <Calendar className="mx-auto mb-3 w-14 h-14 text-green-400" />
                            <h3 className="text-xl font-semibold text-black dark:text-gray-200">Année d'Agrément</h3>
                            <p className="text-3xl font-bold text-black dark:text-gray-200 mt-2">2001</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="bg-gray-400/20 backdrop-blur-md border border-white/30 rounded-xl p-6 text-center shadow-lg transition-transform hover:scale-105 hover:z-20 relative group"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="absolute inset-0 bg-yellow-400/20 h-0 transition-all duration-300 group-hover:h-full rounded-xl"></div>
                        <div className="relative z-10">
                            <Award className="mx-auto mb-3 w-14 h-14 text-yellow-400" />
                            <h3 className="text-xl font-semibold text-black dark:text-gray-200">Expérience Annuelle</h3>
                            <p className="text-3xl font-bold text-black dark:text-gray-200 mt-2">Plus de 25 ans</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="container mx-auto mt-10 px-4">
                <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6">Ce que vous pouvez faire</h2>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6">
                    <motion.div
                        className="bg-gray-400/15 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow relative group"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <div className="absolute inset-0 bg-blue-400/15 h-0 transition-all duration-300 group-hover:h-full rounded-xl"></div>
                        <div className="relative z-10">
                            <BookOpen className="mx-auto mb-3 w-12 h-12 text-blue-400" />
                            <h3 className="text-xl font-semibold mb-2 text-black dark:text-gray-200">Gestion des cours</h3>
                            <p className="text-sm text-black dark:text-gray-200">
                                Créez et planifiez les cours, gérez les emplois du temps et suivez la présence des élèves en quelques clics.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="bg-gray-400/15 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow relative group"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="absolute inset-0 bg-green-400/15 h-0 transition-all duration-300 group-hover:h-full rounded-xl"></div>
                        <div className="relative z-10">
                            <Clipboard className="mx-auto mb-3 w-12 h-12 text-green-400" />
                            <h3 className="text-xl font-semibold mb-2 text-black dark:text-gray-200">Suivi des notes</h3>
                            <p className="text-sm text-black dark:text-gray-200">
                                Enregistrez les évaluations, générez des bulletins et visualisez les performances de chaque élève.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="bg-gray-400/15 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow relative group"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="absolute inset-0 bg-yellow-400/15 h-0 transition-all duration-300 group-hover:h-full rounded-xl"></div>
                        <div className="relative z-10">
                            <MessageCircle className="mx-auto mb-3 w-12 h-12 text-yellow-400" />
                            <h3 className="text-xl font-semibold mb-2 text-black dark:text-gray-200">Communication</h3>
                            <p className="text-sm text-black dark:text-gray-200">
                                Envoyez des annonces, gérez les messages et partagez les informations importantes avec les familles.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {emploisDuTemps.length > 0 && (
                <section className="container mx-auto mt-10 px-4">
                    <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6">Emplois du Temps Disponibles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {emploisDuTemps.map((edt: any) => (
                            <motion.div
                                key={edt.id}
                                className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative group"
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <div className="absolute inset-0 bg-linear-to-r from-blue-400/10 to-purple-400/10 h-0 transition-all duration-300 group-hover:h-full rounded-xl"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        {edt.type === 'cours' ? (
                                            <BookOpen className="w-8 h-8 text-blue-600" />
                                        ) : (
                                            <Calendar className="w-8 h-8 text-orange-600" />
                                        )}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {edt.type === 'cours' ? 'Cours' : 'Sessions'}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {edt.filiere} - {edt.niveau}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-4">
                                        {edt.fileType === 'application/pdf' ? (
                                            <div className="flex items-center gap-2 text-red-600">
                                                <FileText className="w-5 h-5" />
                                                <span className="text-sm font-medium">Document PDF</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-blue-600">
                                                <Clock className="w-5 h-5" />
                                                <span className="text-sm font-medium">Image</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="text-sm text-gray-500 mb-4">
                                        <p>Nom: {edt.name}</p>
                                        <p>Taille: {(edt.fileSize / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                    
                                    <button
                                        className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
                                        onClick={() => window.open(edt.url, '_blank')}
                                    >
                                        <Download className="w-4 h-4" />
                                        Télécharger
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            <footer className="bg-[rgb(249,250,251)] z-50 dark:bg-gray-800 text-center p-10 mt-12">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">À propos</h3>
                        <p className="text-sm text-black dark:text-gray-300">
                             Ecole Communautaire de L`Enseignement Superieur référence en gestion scolaire, propose un espace centralisé pour tous les acteurs de l`école.
                            B,P:2852- BRAZZAVILLE/CONGO <br />
                            AGREMENT N°0012 MES-CAB.DGSUP
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Contact</h3>
                        <p className="text-sm text-black dark:text-gray-300">1399 rue Moukoukoulou Plateau de 15 ans, Brazzaville-Republique du Congo</p>
                        <p className="text-sm text-black dark:text-gray-300">+242 06-951-24-69 / 06-688-65-79</p>
                        <p className="text-sm text-black dark:text-gray-300">info@ecesonline.org</p>
                        <p className="text-sm text-black dark:text-gray-300">www.eces-ecole.org</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Liens utiles</h3>
                        <ul className="text-sm text-black dark:text-gray-300 space-y-1">
                            <li>Connexion</li>
                            <li>Documentation</li>
                            <li>Support</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 text-xs text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} ECES. Tous droits réservés.
                </div>
            </footer>
        </>
    )
}
