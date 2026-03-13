'use client';

import Link from 'next/link';
import { BookOpen, Users, Award, TrendingUp, ArrowRight, Newspaper, Sparkles, Zap, Target, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Actualite } from '@/lib/types';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LOGO_B64 } from '@/lib/supabase';
import { color } from 'framer-motion';

async function getLatestActus(): Promise<Actualite[]> {
  const { data } = await supabase.from('actualites').select('*').order('created_at', { ascending: false }).limit(3);
  return data || [];
}

export default function HomePage() {
  const [actus, setActus] = useState<Actualite[]>([]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });

    // Load actualites
    getLatestActus().then(setActus);
  }, []);

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'var(--font-body)' }}>

      {/* Floating Elements */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              background: `rgba(255,255,255,${Math.random() * 0.3 + 0.1})`,
              borderRadius: '50%',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + 's',
            }}
          />
        ))}

        {/* Floating icons */}
        <Sparkles size={24} style={{
          position: 'absolute', top: '20%', left: '10%',
          color: 'rgba(255,255,255,0.3)', animation: 'float 8s ease-in-out infinite'
        }} />
        <Zap size={20} style={{
          position: 'absolute', top: '60%', right: '15%',
          color: 'rgb(240, 166, 166)', animation: 'float 12s ease-in-out infinite', animationDelay: '2s'
        }} />
        <Target size={18} style={{
          position: 'absolute', top: '40%', left: '80%',
          color: 'rgb(243, 239, 239)', animation: 'float 10s ease-in-out infinite', animationDelay: '4s'
        }} />
        <Star size={16} style={{
          position: 'absolute', top: '80%', left: '20%',
          color: 'rgba(214, 206, 206, 0.93)', animation: 'float 14s ease-in-out infinite', animationDelay: '1s'
        }} />
      </div>

      {/* Navbar */}
      <nav style={{ background: 'var(--blue-900)', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10, boxShadow: 'var(--shadow-xs)'}} data-aos="fade-down">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={LOGO_B64} alt="ECES" style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover' }} />
          <span className='header-logo-name' style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--gray-100)' }}>ECES</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/courses" style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-100)', textDecoration: 'none' }}>Cours</Link>
          <Link href="/actualites" style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-100)', textDecoration: 'none' }}>Actualités</Link>
          <Link href="/login" className="btn btn-primary btn-sm">Se connecter</Link>
        </div>
      </nav>

      <section style={{ background: 'linear-gradient(160deg, var(--blue-950) 0%, var(--blue-800) 50%, var(--blue-600) 100%)', padding: '100px 32px', position: 'relative', overflow: 'hidden' }} data-aos="fade-in">
      {/* Hero */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* Animated background shapes */}
        <div style={{
          position: 'absolute', width: '300px', height: '300px',
          borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)',
          top: '10%', left: '10%', animation: 'pulse 4s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute', width: '200px', height: '200px',
          borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)',
          bottom: '20%', right: '15%', animation: 'pulse 6s ease-in-out infinite', animationDelay: '2s'
        }} />
        <div style={{
          position: 'absolute', width: '150px', height: '150px',
          borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)',
          top: '60%', left: '70%', animation: 'pulse 5s ease-in-out infinite', animationDelay: '1s'
        }} />

        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block', padding: '6px 16px',
            background: 'rgba(255,255,255,0.1)', borderRadius: 99,
            fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 600,
            marginBottom: 24, border: '1px solid rgba(255,255,255,0.15)',
            animation: 'fadeInUp 1s ease-out'
          }} data-aos="fade-down" data-aos-delay="200">
            École Communautaire de l'Enseignement Supérieur
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(36px,5vw,64px)', color: 'white',
            lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 24,
            animation: 'fadeInUp 1s ease-out'
          }} data-aos="fade-up" data-aos-delay="400">
            Bienvenue sur la plateforme <span style={{ color: 'var(--blue-500)' }}>ECES</span>
          </h1>
          <p style={{
            fontSize: 18, color: 'rgba(255,255,255,0.65)',
            maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.7,
            animation: 'fadeInUp 1s ease-out'
          }} data-aos="fade-up" data-aos-delay="600">
            Accédez à vos cours, notes et emplois du temps depuis n'importe quel appareil. Simple, rapide, numérique.
          </p>
          <div style={{
            display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap',
            animation: 'fadeInUp 1s ease-out'
          }} data-aos="fade-up" data-aos-delay="800">
            <Link href="/login" className="btn btn-xl" style={{ background: 'white', color: 'var(--blue-800)', fontWeight: 700 }}>
              Accéder à mon espace <ArrowRight size={18} />
            </Link>
            <Link href="/courses" className="btn btn-xl btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}>
              <BookOpen size={18} /> Voir les cours
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'white', padding: '60px 32px', borderBottom: '1px solid var(--border)' }} data-aos="fade-up">
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 32 }}>
          {[
            { icon: BookOpen, value: '500+', label: 'Cours disponibles', delay: 200 },
            { icon: Users, value: '50+', label: 'Enseignants', delay: 400 },
            { icon: Award, value: '15', label: 'Filières', delay: 600 },
            { icon: TrendingUp, value: '95%', label: 'Taux de réussite', delay: 800 },
          ].map(({ icon: Icon, value, label, delay }) => (
            <div key={label} style={{ textAlign: 'center' }} data-aos="zoom-in" data-aos-delay={delay}>
              <div style={{
                width: 48, height: 48, background: 'var(--blue-100)',
                borderRadius: 'var(--radius-md)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
                transition: 'transform 0.3s ease'
              }} className="stat-icon">
                <Icon size={22} color="var(--blue-800)" />
              </div>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: 32, color: 'var(--gray-900)', letterSpacing: '-1px',
                transition: 'color 0.3s ease'
              }} className="stat-value">{value}</div>
              <div style={{ fontSize: 14, color: 'var(--gray-500)', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Actualités */}
      {actus.length > 0 && (
        <section style={{ padding: '60px 32px', background: 'var(--gray-400)' }} data-aos="fade-up">
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }} data-aos="fade-right">
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: 'var(--gray-900)' }}>Dernières actualités</h2>
              <Link href="/actualites" style={{ fontSize: 18, backgroundColor: 'var(--blue-600)', color: 'white', fontWeight: 600, textDecoration: 'none', padding: '8px 16px', borderRadius: 'var(--radius-md)' }}>Voir tout →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
              {actus.map((a, index) => (
                <div key={a.id} style={{
                  background: 'white', borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden', border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)', transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }} data-aos="fade-up" data-aos-delay={index * 200} className="news-card">
                  {a.image_url && <img src={a.image_url} alt={a.title ?? a.titre ?? 'Actualité'} style={{ width: '100%', height: 160, objectFit: 'cover' }} />}
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 8, fontWeight: 600 }}>
                      {new Date(a.created_at ?? a.datePublication ?? new Date().toISOString()).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--gray-900)', marginBottom: 8, lineHeight: 1.3 }}>
                      {a.title ?? a.titre}
                    </h3>
                    <p style={{ fontSize: 13, color: 'var(--gray-500)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {a.content ?? a.contenu}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section style={{
        background: 'linear-gradient(135deg, var(--blue-600) 0%, var(--blue-800) 100%)',
        padding: '80px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden'
      }} data-aos="fade-up">
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)'
        }} />

        {/* Floating elements in CTA */}
        <div style={{
          position: 'absolute', width: '100px', height: '100px',
          borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)',
          top: '20%', left: '10%', animation: 'float 6s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute', width: '60px', height: '60px',
          borderRadius: '50%', border: '2px solid rgba(255,255,255,0.08)',
          bottom: '30%', right: '15%', animation: 'float 8s ease-in-out infinite', animationDelay: '2s'
        }} />

        <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(28px,4vw,48px)', color: 'white',
            marginBottom: 16, lineHeight: 1.2
          }} data-aos="zoom-in">
            Prêt à commencer votre parcours ?
          </h2>
          <p style={{
            fontSize: 18, color: 'rgba(255,255,255,0.8)',
            marginBottom: 32, lineHeight: 1.6
          }} data-aos="fade-up" data-aos-delay="200">
            Rejoignez des milliers d'étudiants qui utilisent déjà notre plateforme pour réussir leurs études.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }} data-aos="fade-up" data-aos-delay="400">
            <Link href="/login" className="btn btn-xl" style={{
              background: 'white', color: 'var(--blue-800)', fontWeight: 700,
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
            }}>
              Commencer maintenant <ArrowRight size={18}/>
            </Link>
            <Link href="/courses" className="btn btn-xl btn-outline" style={{
              color: 'white', borderColor: 'rgba(255,255,255,0.4)',
              background: 'rgba(255,255,255,0.1)'
            }}>
              Explorer les cours
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--blue-950)', padding: '40px 32px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 14 }} data-aos="fade-in">
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'white', marginBottom: 8 }}>ECES</div>
        École Communautaire de l'Enseignement Supérieur · {new Date().getFullYear()}
      </footer>
      <style>{`@media (max-width: 768px) {
          .header-logo-name { display: none; }
      `}</style>
    </div>
    
  );
}
