import Link from 'next/link';


export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Cormorant Garamond', 'Plus Jakarta Sans', serif", overflow: 'hidden', position: 'relative', background: '#0A1628' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── FOND — DÉGRADÉ GLACÉ PROFOND ── */
        .hp-root {
          min-height: 100vh;
          background:
            radial-gradient(ellipse 120% 80% at 10% 20%, rgba(96,168,232,0.18) 0%, transparent 55%),
            radial-gradient(ellipse 80% 60% at 90% 80%, rgba(31,78,121,0.25) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 50% 50%, rgba(148,197,253,0.08) 0%, transparent 60%),
            linear-gradient(160deg, #071220 0%, #0D1F38 35%, #0A1628 65%, #050D1A 100%);
          position: relative; overflow: hidden;
        }

        /* ── GRAIN / TEXTURE GIVRE ── */
        .hp-root::before {
          content: '';
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
          opacity: 0.5;
        }

        /* ── ÉCLATS DE VERRE BRISÉ ── */
        .shards-layer {
          position: fixed; inset: 0; z-index: 1; pointer-events: none;
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

        /* Éclats spécifiques */
        .s1  { --p:0% 20%,40% 0%,55% 30%,20% 50%;  --rot:-8deg;  --dur:9s;  --delay:0s;   --op:0.7; width:320px; height:280px; top:5%;  left:-5%;  }
        .s2  { --p:0% 0%,100% 10%,80% 100%,15% 85%; --rot:5deg;   --dur:11s; --delay:1.5s; --op:0.5; width:260px; height:340px; top:8%;  right:-3%; }
        .s3  { --p:20% 0%,100% 25%,70% 100%,0% 60%; --rot:-3deg;  --dur:13s; --delay:3s;   --op:0.4; width:200px; height:250px; top:45%; left:2%;  }
        .s4  { --p:0% 30%,60% 0%,100% 50%,40% 100%; --rot:12deg;  --dur:10s; --delay:0.8s; --op:0.55;width:240px; height:200px; top:60%; right:1%; }
        .s5  { --p:15% 0%,85% 5%,100% 70%,50% 100%,0% 80%; --rot:-6deg; --dur:14s; --delay:2s; --op:0.35; width:300px; height:280px; bottom:-5%; left:20%; }
        .s6  { --p:0% 15%,50% 0%,80% 40%,60% 100%,10% 90%; --rot:4deg; --dur:12s; --delay:4s; --op:0.45; width:220px; height:260px; top:30%; right:-2%; }
        .s7  { --p:10% 0%,90% 20%,100% 80%,20% 100%; --rot:-10deg; --dur:16s; --delay:1s; --op:0.3; width:180px; height:200px; bottom:10%; right:8%; }
        .s8  { --p:0% 40%,40% 0%,100% 30%,80% 100%; --rot:7deg; --dur:10s; --delay:5s; --op:0.5; width:150px; height:180px; top:70%; left:35%; }

        /* Éclats petits brillants */
        .shard-small {
          position: absolute; border-radius: 2px;
          background: linear-gradient(135deg, rgba(148,197,253,0.2), rgba(255,255,255,0.1));
          border: 1px solid rgba(148,197,253,0.25);
          animation: shard-float var(--dur, 6s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
          transform: rotate(var(--rot, 0deg));
          clip-path: polygon(var(--p));
        }
        .ss1 { --p:0% 0%,100% 20%,80% 100%,5% 90%; --rot:25deg; --dur:7s;  --delay:0.5s; width:60px;  height:70px;  top:15%; left:40%; --op:0.8; }
        .ss2 { --p:10% 0%,100% 0%,90% 100%,0% 80%; --rot:-15deg;--dur:9s;  --delay:2.5s; width:45px;  height:55px;  top:55%; left:55%; --op:0.7; }
        .ss3 { --p:0% 20%,80% 0%,100% 70%,30% 100%;--rot:40deg; --dur:8s;  --delay:1s;   width:80px;  height:65px;  top:35%; right:15%;--op:0.6; }
        .ss4 { --p:20% 0%,100% 10%,80% 100%,0% 85%;--rot:-30deg;--dur:11s; --delay:3.5s; width:50px;  height:60px;  bottom:20%;left:45%;--op:0.9; }
        .ss5 { --p:0% 0%,100% 30%,70% 100%,10% 80%;--rot:18deg; --dur:6s;  --delay:0s;   width:35px;  height:42px;  top:80%; right:30%;--op:0.7; }

        /* ── REFLETS DE LUMIÈRE ── */
        .light-beam {
          position: fixed; z-index: 1; pointer-events: none;
          border-radius: 50%; filter: blur(60px);
          animation: beam-pulse var(--dur, 6s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }
        @keyframes beam-pulse {
          0%, 100% { opacity: var(--op, 0.15); transform: scale(1); }
          50%       { opacity: calc(var(--op, 0.15) * 1.6); transform: scale(1.08); }
        }
        .lb1 { width:500px; height:400px; background:radial-gradient(ellipse, rgba(96,168,232,0.2), transparent 70%); top:-100px; left:-100px; --dur:7s; --op:0.8; }
        .lb2 { width:400px; height:500px; background:radial-gradient(ellipse, rgba(31,78,121,0.25), transparent 70%); bottom:-80px; right:-80px; --dur:9s; --delay:3s; --op:0.8; }
        .lb3 { width:300px; height:300px; background:radial-gradient(ellipse, rgba(148,197,253,0.12), transparent 70%); top:40%; left:30%; --dur:11s; --delay:1.5s; --op:0.6; }

        /* ── CONTENU ── */
        .hp-content {
          position: relative; z-index: 10;
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 40px 24px;
          text-align: center;
        }

        /* ── LOGO ── */
        .hp-logo-wrap {
          margin-bottom: 40px;
          animation: entrance 0.9s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .hp-logo-ring {
          width: 120px; height: 120px; border-radius: 50%;
          padding: 4px;
          background: linear-gradient(135deg, rgba(148,197,253,0.4), rgba(31,78,121,0.2), rgba(148,197,253,0.3));
          box-shadow:
            0 0 0 1px rgba(148,197,253,0.15),
            0 8px 40px rgba(96,168,232,0.3),
            0 0 80px rgba(96,168,232,0.15),
            inset 0 1px 0 rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          position: relative; margin: 0 auto;
        }
        .hp-logo-ring::before {
          content: '';
          position: absolute; inset: -2px;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            rgba(148,197,253,0.6) 0deg,
            rgba(31,78,121,0.1) 120deg,
            rgba(148,197,253,0.4) 240deg,
            rgba(148,197,253,0.6) 360deg
          );
          animation: ring-spin 8s linear infinite;
          mask: radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px));
          -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px));
        }
        @keyframes ring-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

        .hp-logo-img {
          width: 108px; height: 108px; border-radius: 50%; object-fit: cover;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.3);
        }

        /* ── HERO TEXT ── */
        .hp-overline {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(148,197,253,0.7);
          margin-bottom: 20px;
          animation: entrance 0.8s ease both 0.15s;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .hp-overline::before, .hp-overline::after {
          content: ''; display: block;
          width: 32px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(148,197,253,0.5));
        }
        .hp-overline::after { transform: rotate(180deg); }

        .hp-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 8vw, 96px);
          font-weight: 300;
          line-height: 1.0;
          letter-spacing: -1px;
          color: white;
          margin-bottom: 8px;
          animation: entrance 1s ease both 0.25s;
        }
        .hp-title em {
          font-style: italic; font-weight: 300;
          background: linear-gradient(135deg, #93C5FD 0%, #BFDBFE 40%, #60A8E8 70%, #93C5FD 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: shimmer-text 4s ease infinite;
        }
        @keyframes shimmer-text {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }

        .hp-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(20px, 3vw, 30px);
          font-weight: 300; font-style: italic;
          color: rgba(148,197,253,0.6);
          margin-bottom: 24px;
          animation: entrance 0.9s ease both 0.35s;
        }

        .hp-desc {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px; font-weight: 400; line-height: 1.8;
          color: rgb(255, 255, 255);
          max-width: 480px; margin: 0 auto 52px;
          animation: entrance 0.9s ease both 0.45s;
        }

        /* ── BOUTON PRINCIPAL — VERRE BRISÉ ── */
        .hp-cta-wrap {
          animation: entrance 1s cubic-bezier(0.34,1.56,0.64,1) both 0.55s;
          position: relative; display: inline-block;
        }

        .hp-cta {
          display: inline-flex; align-items: center; gap: 14px;
          padding: 18px 44px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px; font-weight: 700; letter-spacing: 0.5px;
          color: white; text-decoration: none;
          position: relative; overflow: hidden;
          border-radius: 4px;
          background: linear-gradient(135deg,
            rgba(96,168,232,0.15) 0%,
            rgba(31,78,121,0.25) 50%,
            rgba(96,168,232,0.10) 100%
          );
          border: 1px solid rgba(148,197,253,0.3);
          box-shadow:
            0 0 0 1px rgba(148,197,253,0.1),
            0 8px 32px rgba(96,168,232,0.2),
            0 2px 8px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.2);
          backdrop-filter: blur(16px);
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          /* Clip en polygone pour effet brisé sur les coins */
          clip-path: polygon(0% 0%, 96% 0%, 100% 8%, 100% 100%, 4% 100%, 0% 92%);
        }

        /* Reflet qui traverse */
        .hp-cta::before {
          content: '';
          position: absolute; top: -50%; left: -75%;
          width: 50%; height: 200%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,0.12), transparent);
          transform: skewX(-20deg);
          animation: btn-shine 3.5s ease-in-out infinite 1s;
        }
        @keyframes btn-shine {
          0%   { left: -75%; opacity: 0; }
          10%  { opacity: 1; }
          40%  { left: 130%; opacity: 1; }
          45%  { opacity: 0; }
          100% { left: 130%; opacity: 0; }
        }

        /* Éclat brisé sur les coins du bouton */
        .hp-cta::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg,
            rgba(148,197,253,0.08) 0%,
            transparent 40%,
            rgba(96,168,232,0.05) 100%
          );
          pointer-events: none;
        }

        .hp-cta:hover {
          transform: translateY(-3px) scale(1.02);
          border-color: rgba(148,197,253,0.55);
          box-shadow:
            0 0 0 1px rgba(148,197,253,0.2),
            0 16px 48px rgba(96,168,232,0.35),
            0 4px 16px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.15),
            inset 0 -1px 0 rgba(0,0,0,0.2);
          background: linear-gradient(135deg,
            rgba(96,168,232,0.22) 0%,
            rgba(31,78,121,0.35) 50%,
            rgba(96,168,232,0.15) 100%
          );
        }

        .hp-cta:active { transform: translateY(-1px) scale(1.005); }

        .hp-cta-icon {
          width: 20px; height: 20px;
          transition: transform 0.3s;
        }
        .hp-cta:hover .hp-cta-icon { transform: translateX(4px); }

        /* Éclats décoratifs autour du bouton */
        .cta-shard {
          position: absolute; pointer-events: none;
          background: linear-gradient(135deg, rgba(148,197,253,0.2), rgba(255,255,255,0.05));
          border: 1px solid rgba(148,197,253,0.2);
          clip-path: polygon(var(--p));
          animation: cta-shard-pulse 4s ease-in-out infinite;
          animation-delay: var(--d, 0s);
        }
        @keyframes cta-shard-pulse {
          0%,100% { opacity: 0.4; transform: scale(1) rotate(var(--r,0deg)); }
          50%      { opacity: 0.9; transform: scale(1.05) rotate(calc(var(--r,0deg) + 2deg)); }
        }
        .cs1 { --p:0% 0%,100% 20%,80% 100%,0% 70%; --r:-12deg; --d:0s;    width:24px; height:28px; top:-16px; right:-8px; }
        .cs2 { --p:20% 0%,100% 0%,100% 80%,0% 100%;--r:8deg;  --d:1.2s;  width:18px; height:22px; bottom:-12px; left:-4px; }
        .cs3 { --p:0% 30%,70% 0%,100% 60%,40% 100%;--r:-5deg; --d:2.1s;  width:14px; height:16px; top:-8px; left:20%; }
        .cs4 { --p:10% 0%,100% 10%,90% 100%,0% 90%;--r:15deg; --d:0.6s;  width:12px; height:14px; bottom:-6px; right:25%; }

        /* ── STATS ── */
        .hp-stats {
          display: flex; align-items: center; gap: 0;
          margin-top: 60px;
          animation: entrance 0.9s ease both 0.7s;
        }
        .hp-stat {
          padding: 0 32px; text-align: center;
          position: relative;
        }
        .hp-stat + .hp-stat::before {
          content: '';
          position: absolute; left: 0; top: 20%; height: 60%;
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(148,197,253,0.25), transparent);
        }
        .hp-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px; font-weight: 600;
          color: white; line-height: 1;
          background: linear-gradient(135deg, #fff 0%, #BFDBFE 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hp-stat-label {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px; font-weight: 500; letter-spacing: 1px;
          text-transform: uppercase; color: rgba(148,197,253,0.45);
          margin-top: 6px;
        }

        /* ── LIENS NAV ── */
        .hp-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          padding: 20px 40px;
          display: flex; align-items: center; justify-content: space-between;
          background: linear-gradient(180deg, rgba(7,18,32,0.8) 0%, transparent 100%);
          backdrop-filter: blur(0px);
        }
        .hp-nav-logo {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: rgba(148,197,253,0.7);
          text-decoration: none; display: flex; align-items: center; gap: 10px;
        }
        .hp-nav-logo-mark {
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid rgba(148,197,253,0.3);
          overflow: hidden; display: flex; align-items: center; justify-content: center;
          background: rgba(31,78,121,0.3);
        }
        .hp-nav-links { display: flex; align-items: center; gap: 4px; }
        .hp-nav-link {
          padding: 8px 16px; border-radius: 4px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.45); text-decoration: none;
          transition: all 0.2s;
          clip-path: polygon(0% 0%, 95% 0%, 100% 15%, 100% 100%, 5% 100%, 0% 85%);
        }
        .hp-nav-link:hover {
          color: rgba(148,197,253,0.9);
          background: rgba(148,197,253,0.06);
        }

        /* ── LIGNE DÉCORATIVE BAS ── */
        .hp-bottom-line {
          position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
          z-index: 10;
          display: flex; align-items: center; gap: 12px;
          animation: entrance 1s ease both 0.9s;
        }
        .hp-scroll-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(148,197,253,0.4);
          animation: dot-pulse 2s ease-in-out infinite;
        }
        .hp-scroll-dot:nth-child(2) { animation-delay: 0.3s; }
        .hp-scroll-dot:nth-child(3) { animation-delay: 0.6s; }
        @keyframes dot-pulse {
          0%,100%{opacity:0.3;transform:scale(0.8)}
          50%{opacity:1;transform:scale(1.2)}
        }
        .hp-scroll-text {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 10px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: rgba(148,197,253,0.3);
        }

        /* ── ANIMATIONS D'ENTRÉE ── */
        @keyframes entrance {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 640px) {
          .hp-nav { padding: 16px 20px; }
          .hp-nav-links .hp-nav-link:not(:last-child) { display: none; }
          .hp-stat { padding: 0 18px; }
          .hp-stat-num { font-size: 28px; }
          .hp-stats { flex-wrap: wrap; justify-content: center; gap: 16px 0; }
          .hp-cta { padding: 16px 32px; font-size: 14px; }
          .hp-logo-ring { width: 100px; height: 100px; }
          .hp-logo-img  { width: 92px; height: 92px; }
        }

        @media (max-width: 480px) {
          .hp-stat + .hp-stat::before { display: none; }
          .hp-stats { gap: 12px; flex-direction: column; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; }
        }
      `}</style>

      <div className="hp-root">
        {/* Faisceaux de lumière */}
        <div className="light-beam lb1" />
        <div className="light-beam lb2" />
        <div className="light-beam lb3" />

        {/* Éclats de verre brisé — grands */}
        <div className="shards-layer">
          <div className="shard s1" />
          <div className="shard s2" />
          <div className="shard s3" />
          <div className="shard s4" />
          <div className="shard s5" />
          <div className="shard s6" />
          <div className="shard s7" />
          <div className="shard s8" />
          {/* Petits éclats brillants */}
          <div className="shard-small ss1" />
          <div className="shard-small ss2" />
          <div className="shard-small ss3" />
          <div className="shard-small ss4" />
          <div className="shard-small ss5" />
        </div>

        {/* Navigation */}
        <nav className="hp-nav">
          <Link href="/" className="hp-nav-logo">
            <div className="hp-nav-logo-mark">
              <img src="/logo.jpeg" alt="ECES" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            ECES
          </Link>
          <div className="hp-nav-links">
            <Link href="/login" className="hp-nav-link">Se connecter</Link>
            
          </div>
        </nav>

        {/* Contenu principal */}
        <main className="hp-content">
          {/* Logo */}
          <div className="hp-logo-wrap">
            <div className="hp-logo-ring">
              <img src="/logo.jpeg" alt="ECES" className="hp-logo-img" />
            </div>
          </div>

          {/* Texte */}
          <div className="hp-overline">École Communautaire de l&apos;Enseignement Supérieur</div>

          <h1 className="hp-title">
            Bienvenue à<br /><em>l&apos;ECES</em>
          </h1>

          <p className="hp-subtitle">Depuis 2001 · Excellence · Avenir</p>

          <p className="hp-desc">
            Une plateforme moderne au service de vos études. Gérez vos cours,
            vos notes et vos emplois du temps en toute simplicité.
          </p>

          {/* CTA */}
          <div className="hp-cta-wrap">
            <div className="cta-shard cs1" />
            <div className="cta-shard cs2" />
            <div className="cta-shard cs3" />
            <div className="cta-shard cs4" />
            <Link href="/login" className="hp-cta">
              Se connecter
              <svg className="hp-cta-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div className="hp-stats">
            {[
              { num: '2001', label: 'Fondée en' },
              { num: '500+', label: 'Étudiants' },
              { num: '30+',  label: 'Enseignants' },
              { num: '12+',  label: 'Filières' },
            ].map(({ num, label }) => (
              <div key={label} className="hp-stat">
                <div className="hp-stat-num">{num}</div>
                <div className="hp-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </main>

        {/* Indicateur bas */}
        <div className="hp-bottom-line">
          <div className="hp-scroll-dot" />
          <div className="hp-scroll-dot" />
          <div className="hp-scroll-dot" />
          <span className="hp-scroll-text">ECES · Plateforme Scolaire</span>
        </div>
      </div>
    </div>
  );
}
