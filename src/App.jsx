import { useState, useEffect, useRef } from "react";

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@600;700&display=swap');

  :root {
    --bg:        #0a0a0a;
    --surface:   #131313;
    --s-low:     #1c1b1b;
    --s-mid:     #201f1f;
    --s-high:    #2a2a2a;
    --s-highest: #353534;
    --outline:   rgba(77,67,84,0.35);
    --ink:       #e5e2e1;
    --ink2:      #cfc2d6;
    --ink3:      #988d9f;
    --rose:      #FD7979;
    --rose-dim:  rgba(253,121,121,0.12);
    --rose-glow: rgba(253,121,121,0.25);
    --cyan:      #4cd7f6;
    --cyan-dim:  rgba(76,215,246,0.1);
    --cyan-glow: rgba(76,215,246,0.2);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    font-family: 'Inter', sans-serif;
    color: var(--ink);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--surface); }
  ::-webkit-scrollbar-thumb { background: linear-gradient(var(--rose), var(--cyan)); border-radius: 4px; }

  .mono { font-family: 'JetBrains Mono', monospace; }
  .grotesk { font-family: 'Space Grotesk', sans-serif; }

  .glass {
    background: rgba(19,19,19,0.82);
    backdrop-filter: blur(14px);
    border: 1px solid var(--outline);
    transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
    border-radius: 1rem;
  }
  .glass:hover {
    border-color: rgba(253,121,121,0.4);
    box-shadow: 0 0 28px rgba(253,121,121,0.1);
  }
  .glass-cyan:hover {
    border-color: rgba(76,215,246,0.4) !important;
    box-shadow: 0 0 28px rgba(76,215,246,0.12) !important;
  }
  .glass-active {
    border-color: rgba(253,121,121,0.45);
    box-shadow: 0 0 30px rgba(253,121,121,0.12);
  }
  .glass-active-cyan {
    border-color: rgba(76,215,246,0.45);
    box-shadow: 0 0 30px rgba(76,215,246,0.12);
  }

  @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:0.35} }
  @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes marquee   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes fadeUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes glow-pulse{ 0%,100%{text-shadow:0 0 20px rgba(253,121,121,0.3)} 50%{text-shadow:0 0 50px rgba(253,121,121,0.6)} }
  @keyframes spin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  .rv { opacity:0; transform:translateY(18px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .rv.on { opacity:1; transform:translateY(0); }
  .d1{transition-delay:.08s} .d2{transition-delay:.16s} .d3{transition-delay:.24s}
  .d4{transition-delay:.32s} .d5{transition-delay:.4s}  .d6{transition-delay:.48s}

  .chip-rose {
    display: inline-block; font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem; padding: 0.2rem 0.6rem; border-radius: 9999px;
    background: rgba(253,121,121,0.1); color: var(--rose);
    border: 1px solid rgba(253,121,121,0.25); letter-spacing: 0.02em;
    transition: all 0.2s;
  }
  .chip-rose:hover { background: rgba(253,121,121,0.2); border-color: var(--rose); }
  .chip-cyan {
    display: inline-block; font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem; padding: 0.2rem 0.6rem; border-radius: 9999px;
    background: rgba(76,215,246,0.08); color: var(--cyan);
    border: 1px solid rgba(76,215,246,0.2); letter-spacing: 0.02em;
    transition: all 0.2s;
  }
  .chip-cyan:hover { background: rgba(76,215,246,0.15); border-color: var(--cyan); }
  .chip-neutral {
    display: inline-block; font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem; padding: 0.2rem 0.6rem; border-radius: 9999px;
    background: var(--s-high); color: var(--ink2);
    border: 1px solid var(--outline); letter-spacing: 0.02em;
  }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 0.45rem;
    padding: 0.72rem 1.6rem; border-radius: 0.6rem;
    font-family: 'Space Grotesk', sans-serif; font-size: 0.74rem;
    font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    background: var(--rose); color: #fff; border: none; cursor: pointer;
    text-decoration: none; transition: all 0.2s;
    box-shadow: 0 4px 18px rgba(253,121,121,0.35);
  }
  .btn-primary:hover { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 8px 28px rgba(253,121,121,0.45); }

  .btn-outline-rose {
    display: inline-flex; align-items: center; gap: 0.45rem;
    padding: 0.7rem 1.5rem; border-radius: 0.6rem;
    font-family: 'Space Grotesk', sans-serif; font-size: 0.74rem;
    font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    background: transparent; color: var(--rose);
    border: 1px solid rgba(253,121,121,0.45); cursor: pointer;
    text-decoration: none; transition: all 0.2s;
  }
  .btn-outline-rose:hover { background: rgba(253,121,121,0.08); border-color: var(--rose); transform: translateY(-1px); box-shadow: 0 0 18px rgba(253,121,121,0.18); }

  .btn-outline-cyan {
    display: inline-flex; align-items: center; gap: 0.45rem;
    padding: 0.7rem 1.5rem; border-radius: 0.6rem;
    font-family: 'Space Grotesk', sans-serif; font-size: 0.74rem;
    font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    background: transparent; color: var(--cyan);
    border: 1px solid rgba(76,215,246,0.4); cursor: pointer;
    text-decoration: none; transition: all 0.2s;
  }
  .btn-outline-cyan:hover { background: rgba(76,215,246,0.08); border-color: var(--cyan); transform: translateY(-1px); box-shadow: 0 0 18px rgba(76,215,246,0.18); }

  .nav-link {
    font-family: 'JetBrains Mono', monospace; font-size: 0.78rem;
    color: var(--ink2); text-decoration: none; transition: color 0.2s;
    padding-bottom: 2px;
  }
  .nav-link:hover { color: var(--rose); }
  .nav-link.active { color: var(--rose); border-bottom: 1px solid var(--rose); }

  .label { font-family: 'Space Grotesk', sans-serif; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }

  .scroll-prog {
    position: fixed; top: 0; left: 0; height: 2px; z-index: 9999;
    background: linear-gradient(90deg, var(--rose), var(--cyan));
    box-shadow: 0 0 8px var(--rose); transition: width 0.05s linear;
  }

  .glow-text { animation: glow-pulse 3s ease-in-out infinite; }

  .terminal {
    background: var(--s-mid); border: 1px solid var(--outline);
    border-radius: 0.6rem; padding: 1rem 1.2rem;
    font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;
    line-height: 1.7; color: var(--ink2);
  }
  .term-prompt { color: var(--cyan); }
  .term-result { color: var(--rose); }

  .sec-label {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-family: 'Space Grotesk', sans-serif; font-size: 0.68rem;
    font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--rose); margin-bottom: 1.2rem;
  }
  .sec-label::before { content:''; width: 16px; height: 1px; background: var(--rose); }

  .stat-val {
    font-family: 'Inter', sans-serif; font-size: 2.4rem;
    font-weight: 800; line-height: 1;
  }

  .marquee-wrap { overflow: hidden; white-space: nowrap; }
  .marquee-inner { display: inline-flex; gap: 3rem; animation: marquee 32s linear infinite; }

  .icon-btn {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.6rem 1.1rem; border-radius: 0.6rem;
    font-family: 'JetBrains Mono', monospace; font-size: 0.73rem; font-weight: 600;
    text-decoration: none; transition: all 0.22s; border: 1px solid var(--outline);
    background: var(--s-low); color: var(--ink2);
  }
  .icon-btn:hover { border-color: rgba(253,121,121,0.5); color: var(--rose); background: rgba(253,121,121,0.06); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(253,121,121,0.12); }
  .icon-btn.cyan:hover { border-color: rgba(76,215,246,0.5); color: var(--cyan); background: rgba(76,215,246,0.06); box-shadow: 0 6px 20px rgba(76,215,246,0.1); }

  body::after {
    content:''; position:fixed; inset:0; pointer-events:none; z-index:9998;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.15;
  }

  .section-label::before {
    content: ''; display: block; width: 24px; height: 1px; background: var(--rose);
  }

  .sec-pad { padding: 7rem 4rem; }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(244,63,94,0.15), transparent);
    margin: 0;
  }

  .scroll-bar {
    position: fixed; top: 0; left: 0; height: 2px;
    background: linear-gradient(90deg, var(--rose), var(--cyan));
    z-index: 9998; transition: width 0.05s linear; box-shadow: 0 0 10px var(--rose);
  }

  .tl-line {
    position: absolute; left: 11px; top: 0; bottom: 0; width: 1px;
    background: linear-gradient(180deg, var(--rose), transparent);
  }

  .stat-number {
    font-family: 'Inter', sans-serif; font-size: 3rem; font-weight: 900;
    color: var(--rose); line-height: 1; animation: glow-pulse 3s ease-in-out infinite;
  }

  @keyframes floatBg {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    50%      { transform: translateY(-30px) rotate(3deg); }
  }

  .progress-sidebar {
    position: fixed; right: 1.5rem; top: 50%; transform: translateY(-50%);
    display: flex; flex-direction: column; gap: 0.6rem; z-index: 800;
  }
  .prog-dot {
    width: 5px; height: 5px; border-radius: 50%; background: rgba(244,63,94,0.2);
    cursor: pointer; transition: all 0.3s; position: relative;
  }
  .prog-dot::after {
    content: ''; position: absolute; inset: -3px; border-radius: 50%;
    border: 1px solid transparent; transition: all 0.3s;
  }
  .prog-dot.active { background: var(--rose); box-shadow: 0 0 10px var(--rose); width: 6px; height: 6px; }
  .prog-dot.active::after { border-color: rgba(244,63,94,0.3); }

  .mob-menu {
    display: none; position: fixed; inset: 0;
    background: rgba(10,10,10,0.97); z-index: 700;
    flex-direction: column; align-items: center; justify-content: center;
    gap: 2rem; backdrop-filter: blur(20px);
  }
  .mob-menu.open { display: flex; }
  .mob-menu a { font-family: 'Inter', sans-serif; font-size: 1.8rem; font-weight: 700; color: var(--ink); text-decoration: none; }
  .mob-menu a:hover { color: var(--rose); }

  /* ─── VaultBot collaboration card — rose/cyan themed to match site ─── */
  .vaultbot-card {
    position: relative;
    border-radius: 1.2rem;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(19,19,19,0.97) 0%, rgba(26,14,14,0.95) 45%, rgba(13,20,23,0.96) 100%);
    border: 1px solid rgba(253,121,121,0.3);
    animation: vault-border-pulse 4s ease-in-out infinite;
    transition: transform 0.25s ease;
  }
  .vaultbot-card:hover { transform: translateY(-6px); }

  @keyframes vault-border-pulse {
    0%,100%{box-shadow:0 0 18px rgba(253,121,121,0.14),inset 0 0 28px rgba(253,121,121,0.03)}
    50%{box-shadow:0 0 36px rgba(253,121,121,0.28),inset 0 0 46px rgba(76,215,246,0.06)}
  }

  .vaultbot-header {
    background: linear-gradient(135deg, rgba(253,121,121,0.1) 0%, rgba(253,121,121,0.03) 50%, rgba(76,215,246,0.06) 100%);
    border-bottom: 1px solid rgba(253,121,121,0.18);
    padding: 2rem 2.5rem 1.8rem;
  }

  .vaultbot-shimmer-text {
    background: linear-gradient(90deg, #FD7979 0%, #ffd9d9 30%, #4cd7f6 60%, #FD7979 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: vault-shimmer 3s linear infinite;
  }
  @keyframes vault-shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }

  .founder-credit-badge {
    display: inline-flex; align-items: center; gap: 0.45rem;
    background: rgba(76,215,246,0.08); border: 1px solid rgba(76,215,246,0.35);
    border-radius: 9999px; padding: 0.3rem 0.9rem;
    font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--cyan);
    letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600;
  }

  .contributor-badge {
    display: inline-flex; align-items: center; gap: 0.45rem;
    background: linear-gradient(135deg, rgba(253,121,121,0.16), rgba(253,121,121,0.06));
    border: 1px solid rgba(253,121,121,0.4);
    border-radius: 9999px; padding: 0.3rem 0.9rem;
    font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--rose);
    letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600;
  }

  .domain-badge {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 0.4rem; padding: 0.35rem 0.8rem;
    font-family: 'JetBrains Mono', monospace; font-size: 0.66rem; color: var(--ink2);
    letter-spacing: 0.08em; text-transform: uppercase;
  }

  .vault-stat-box {
    background: rgba(253,121,121,0.05); border: 1px solid rgba(253,121,121,0.16);
    border-radius: 0.7rem; padding: 1.1rem 1rem; text-align: center;
    transition: background 0.2s, border-color 0.2s;
  }
  .vault-stat-box:hover { background: rgba(253,121,121,0.09); border-color: rgba(253,121,121,0.32); }

  .vault-tech-pill {
    display: inline-flex; align-items: center; gap: 0.35rem;
    background: rgba(253,121,121,0.05); border: 1px solid rgba(253,121,121,0.18);
    border-radius: 0.5rem; padding: 0.45rem 0.85rem;
    font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: rgba(253,121,121,0.85);
    letter-spacing: 0.04em; transition: all 0.2s;
  }
  .vault-tech-pill:hover { background: rgba(253,121,121,0.1); border-color: rgba(253,121,121,0.4); color: var(--rose); }

  .vault-hero-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: linear-gradient(135deg, rgba(253,121,121,0.1), rgba(76,215,246,0.04));
    border: 1px solid rgba(253,121,121,0.3); border-radius: 9999px;
    padding: 0.3rem 0.85rem; font-family: 'JetBrains Mono', monospace;
    font-size: 0.66rem; color: var(--rose); letter-spacing: 0.08em;
    text-transform: uppercase; text-decoration: none; cursor: pointer; transition: all 0.2s;
  }
  .vault-hero-badge:hover { background: linear-gradient(135deg, rgba(253,121,121,0.16), rgba(76,215,246,0.08)); border-color: rgba(253,121,121,0.5); box-shadow: 0 0 16px rgba(253,121,121,0.15); }

  /* ─── Responsive Adjustments ─── */
  @media (max-width: 768px) {
    .hide-m { display: none !important; }
    .show-m { display: inline-flex !important; }
    
    .sec-pad { padding: 4rem 1.25rem !important; }
    
    .hero-layout {
      grid-template-columns: 1fr !important;
      gap: 2rem !important;
    }
    
    .about-grid {
      grid-template-columns: 1fr !important;
      gap: 1.2rem !important;
    }
    
    .projects-grid {
      grid-template-columns: 1fr !important;
      gap: 1.2rem !important;
    }
    
    .skills-grid {
      grid-template-columns: 1fr !important;
      gap: 1rem !important;
    }
    
    .bars-grid {
      grid-template-columns: 1fr !important;
      gap: 0 !important;
    }
    
    .achievements-grid {
      grid-template-columns: 1fr !important;
      gap: 1rem !important;
    }
    
    .progress-sidebar {
      display: none !important;
    }
    
    header {
      padding: 0.9rem 1.25rem !important;
    }
    
    /* VaultBot specific mobile tweaks */
    .vault-stats-container {
      flex-direction: row !important;
      width: 100% !important;
      justify-content: space-between !important;
      gap: 0.5rem !important;
    }
    
    .vault-stat-box {
      flex: 1 !important;
      padding: 0.8rem 0.4rem !important;
    }
    
    .vaultbot-header {
      padding: 1.5rem 1.25rem 1.5rem !important;
    }
    
    .vaultbot-card > div:nth-child(2) {
      padding: 1.5rem 1.25rem !important;
    }
    
    /* CGPA banner mobile tweaks */
    .cgpa-banner {
      padding: 1.5rem 1.25rem !important;
      flex-direction: column !important;
      align-items: center !important;
      text-align: center !important;
      gap: 1.5rem !important;
    }
    
    .cgpa-stats {
      justify-content: center !important;
      gap: 1.5rem !important;
      width: 100% !important;
    }
    
    /* Contact page mobile tweaks */
    #contact {
      padding: 4rem 1.25rem !important;
    }
    
    .contact-email-text {
      font-size: 0.75rem !important;
      word-break: break-all !important;
      text-align: center !important;
    }
    
    /* Footer layout on mobile */
    footer {
      flex-direction: column !important;
      align-items: center !important;
      text-align: center !important;
      gap: 1rem !important;
      padding: 2rem 1.25rem !important;
    }
  }
`;

function ScrollProg() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      setW((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100 + "%");
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div className="scroll-prog" style={{ width: w }} />;
}

function useReveal(dep) {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); });
    }, { threshold: 0.1 });
    document.querySelectorAll(".rv").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [dep]);
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth <= 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
}

function SectionProgress() {
  const SECS = ["hero","about","timeline","experience","vaultbot","skills","achievements","contact"];
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.2 });
    SECS.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <div className="progress-sidebar">
      {SECS.map(s => (
        <div key={s} className={`prog-dot${active === s ? " active" : ""}`}
          title={s.toUpperCase()}
          onClick={() => document.getElementById(s)?.scrollIntoView({ behavior: "smooth" })}
        />
      ))}
    </div>
  );
}

function Nav({ onOpenCli }) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [["about","About"],["experience","Exp"],["vaultbot","Projects"],["skills","Skills"],["achievements","Awards"],["contact","Contact"]];
  return (
    <>
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:600,
        padding:"0.9rem 2.5rem",
        background: scrolled ? "rgba(13,13,13,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(77,67,84,0.3)" : "none",
        boxShadow: scrolled ? "0 0 20px rgba(253,121,121,0.06)" : "none",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        transition:"all 0.4s",
      }}>
        <a href="#hero" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:"0.6rem" }}>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:"0.85rem", letterSpacing:"0.12em", color:"var(--rose)" }}>AAYUSHI_CHHABRA</span>
        </a>
        <nav className="hide-m nav-links" style={{ display:"flex", gap:"1.6rem", alignItems:"center" }}>
          {links.map(([id,label]) => <a key={id} href={`#${id}`} className="nav-link">{label}</a>)}
          <span style={{ width:1, height:14, background:"var(--outline)", display:"inline-block" }} />
          <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" className="nav-link" style={{ display:"inline-flex", alignItems:"center", gap:"0.35rem" }}>
            <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            GitHub
          </a>
          <a href="https://linkedin.com/in/aayushi-chhabra-54281a34a" target="_blank" rel="noreferrer" className="nav-link" style={{ display:"inline-flex", alignItems:"center", gap:"0.35rem" }}>
            <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </a>
        </nav>
        <div style={{ display:"flex", gap:"0.6rem", alignItems:"center" }}>
          <button onClick={onOpenCli} className="btn-outline-cyan" style={{ padding:"0.45rem 0.9rem", fontSize:"0.7rem", cursor:"pointer" }}>
            💻 CLI
          </button>
          <a href="/Aayushi_Chhabra_Resume.pdf" download="Aayushi_Chhabra_Resume.pdf" className="btn-primary" style={{ padding:"0.5rem 1.1rem", fontSize:"0.7rem" }}>Resume ↓</a>
          <button onClick={() => setMenu(o=>!o)} style={{ display:"none", background:"none", border:"1px solid rgba(244,63,94,0.2)", cursor:"pointer", color:"var(--ink)", padding:"0.35rem 0.5rem", borderRadius: "4px" }} className="mob-hamburger show-m">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </header>
      <div className={`mob-menu${menu?" open":""}`}>
        <button onClick={() => setMenu(false)} style={{ position:"absolute", top:"1.5rem", right:"1.5rem", background:"none", border:"1px solid var(--outline)", color:"var(--ink)", cursor:"pointer", padding:"0.4rem 0.7rem", borderRadius:"0.4rem" }}>✕</button>
        {links.map(([id,label]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}
        <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" onClick={() => setMenu(false)}>GitHub</a>
        <a href="https://linkedin.com/in/aayushi-chhabra-54281a34a" target="_blank" rel="noreferrer" onClick={() => setMenu(false)}>LinkedIn</a>
        <a href="/Aayushi_Chhabra_Resume.pdf" download="Aayushi_Chhabra_Resume.pdf" onClick={() => setMenu(false)}>Resume ↓</a>
      </div>
    </>
  );
}

function Hero({ onOpenCli }) {
  const [typed, setTyped] = useState("");
  const words = ["B.Tech CS Student @ MUJ (9.85 CGPA)", "Co-Founder @ Nori", "Ericsson R&D Intern", "Published Patent Holder", "AI & Cybersecurity Engineer"];
  useEffect(() => {
    let wi=0, idx=0, dir=1;
    const iv = setInterval(() => {
      const w = words[wi % words.length];
      setTyped(dir===1 ? w.slice(0,idx+1) : w.slice(0,idx));
      if (dir===1) { idx++; if (idx===w.length) dir=-1; }
      else { idx--; if (idx<0) { dir=1; idx=0; wi++; } }
    }, 72);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="hero" style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"7rem 2.5rem 4rem", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
        <div style={{ position:"absolute", top:"-15%", right:"5%", width:700, height:700, background:"radial-gradient(circle, rgba(253,121,121,0.07) 0%, transparent 65%)", borderRadius:"50%", animation:"spin 25s linear infinite" }} />
        <div style={{ position:"absolute", bottom:"5%", left:"-10%", width:550, height:550, background:"radial-gradient(circle, rgba(76,215,246,0.05) 0%, transparent 65%)", borderRadius:"50%" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(253,121,121,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(253,121,121,0.025) 1px,transparent 1px)", backgroundSize:"60px 60px", opacity:0.8 }} />
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
        <div className="hero-layout" style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:"3rem", alignItems:"start" }}>
          <div>
            <div className="rv" style={{ display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"1.8rem", flexWrap:"wrap" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", padding:"0.3rem 0.9rem", background:"var(--rose-dim)", border:"1px solid rgba(253,121,121,0.3)", borderRadius:"9999px" }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"var(--rose)", boxShadow:"0 0 8px var(--rose)", animation:"pulse 2s infinite", display:"inline-block" }} />
                <span className="mono" style={{ fontSize:"0.68rem", color:"var(--rose)", letterSpacing:"0.1em" }}>OPEN TO WORK</span>
              </div>
              <span className="mono" style={{ fontSize:"0.68rem", color:"var(--ink3)", letterSpacing:"0.12em" }}>3RD YEAR CSE · MUJ · 2023–2027</span>
              <a href="#vaultbot" className="vault-hero-badge">⚡ Co-Founder & Core Contributor (Frontend · Backend · AI)</a>
            </div>
            <div className="rv d1">
              <h1 className="hero-name" style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(3rem,7vw,5.5rem)", fontWeight:800, lineHeight:1.05, letterSpacing:"-0.04em", marginBottom:"1rem" }}>
                Aayushi{" "}<span style={{ color:"var(--rose)", textShadow:"0 0 40px rgba(253,121,121,0.4)" }} className="glow-text">Chhabra</span>
              </h1>
            </div>
            <div className="rv d2" style={{ height:32, marginBottom:"1.4rem", display:"flex", alignItems:"center", gap:"0.4rem" }}>
              <span className="mono" style={{ fontSize:"0.95rem", color:"var(--cyan)" }}>{typed}</span>
              <span style={{ width:2, height:18, background:"var(--cyan)", animation:"blink 1s step-end infinite", display:"inline-block" }} />
            </div>
            <p className="rv d3" style={{ fontSize:"0.95rem", color:"var(--ink2)", lineHeight:1.85, maxWidth:560, marginBottom:"2.2rem" }}>
              Third-year B.Tech CSE at Manipal University Jaipur with a{" "}
              <span style={{ color:"var(--rose)", fontWeight:700 }}>9.85 CGPA</span>.
              Industry experience at <span style={{ color:"var(--rose)", fontWeight:700 }}>Ericsson</span> in Cybersecurity & AI.
              Finalist at <span style={{ color:"var(--rose)", fontWeight:700 }}>Deloitte Capstone Ideathon</span> (200+ teams).
              Dean's Excellence Award — 6 consecutive semesters.
            </p>

            <div className="rv d4 hero-btns" style={{ display:"flex", gap:"0.8rem", flexWrap:"wrap", marginBottom:"1.8rem" }}>
              <a href="mailto:aayushichhabra1010@gmail.com" className="btn-primary">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                Get In Touch
              </a>
              <button onClick={onOpenCli} className="btn-outline-cyan" style={{ fontSize:"0.72rem", padding:"0.6rem 1.4rem", cursor:"pointer" }}>💻 CLI Terminal</button>
              <a href="#projects" className="btn-outline-rose">View Projects →</a>
            </div>
            <div className="rv d5" style={{ display:"flex", gap:"0.6rem", flexWrap:"wrap" }}>
              <a href="/Aayushi_Chhabra_Resume.pdf" download="Aayushi_Chhabra_Resume.pdf" className="icon-btn">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9,15 12,18 15,15"/></svg>
                Resume
              </a>
              <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" className="icon-btn">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub ↗
              </a>
              <a href="https://leetcode.com/u/aayushichhabra" target="_blank" rel="noreferrer" className="icon-btn cyan">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>
                LeetCode ↗
              </a>
              <a href="https://linkedin.com/in/aayushi-chhabra-54281a34a" target="_blank" rel="noreferrer" className="icon-btn">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn ↗
              </a>
            </div>

            <div className="rv d5 hero-stats" style={{ display: "flex", gap: "2.5rem", marginTop: "3.5rem", flexWrap: "wrap" }}>
              {[["9.88", "CGPA", "var(--rose)"], ["5×", "Dean's Award", "var(--cyan)"], ["6+", "Projects Built", "var(--rose)"], ["Top 10", "Deloitte Ideathon", "var(--cyan)"]].map(([n, l, col]) => (
                <div key={l} style={{ position: "relative" }}>
                  <div className="stat-number" style={{ fontSize: "1.8rem", color: col }}>{n}</div>
                  <div className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.15em", color: "var(--ink2)", marginTop: "0.2rem" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rv d3 hide-m hero-right-card" style={{ width:320, flexShrink:0 }}>
            <div className="glass glass-active" style={{ padding:"1.6rem", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg, var(--rose), var(--cyan))" }} />
              <div className="label" style={{ color:"var(--rose)", marginBottom:"1.2rem", display:"flex", alignItems:"center", gap:"0.5rem" }}>
                <span>⬡</span> CURRENTLY BUILDING
              </div>
              {[
                { name:"ResQNet", desc:"Cross-platform crisis mgmt. w/ BLE & offline-first tech", tech:"React Native · Supabase", col:"var(--cyan)" },
                { name:"VaultBot", desc:"Multi-tenant collaborative AI platform with custom RAG networks", tech:"FastAPI · Discord.py · Supabase · LangChain", col:"var(--rose)" },
                { name:"CVE Agent", desc:"Agentic CVE triage + dependency scanner w/ LangGraph", tech:"LangGraph · NIST NVD · Gemini", col:"#a78bfa" },
              ].map(({ name, desc, tech, col }) => (
                <div key={name} style={{ marginBottom:"1.1rem", paddingBottom:"1.1rem", borderBottom:"1px solid var(--outline)" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.45rem", marginBottom:"0.25rem" }}>
                    <div style={{ width:6, height:6, borderRadius:"50%", background:col, boxShadow:`0 0 8px ${col}` }} />
                    <span style={{ fontWeight:700, fontSize:"0.88rem" }}>{name}</span>
                  </div>
                  <p style={{ fontSize:"0.75rem", color:"var(--ink2)", lineHeight:1.6, marginBottom:"0.3rem" }}>{desc}</p>
                  <span className="mono" style={{ fontSize:"0.62rem", color:col, opacity:0.85 }}>{tech}</span>
                </div>
              ))}
              <div className="terminal" style={{ marginTop:"0.8rem", padding:"0.75rem 1rem" }}>
                <div><span className="term-prompt">&gt; </span>status --check</div>
                <div><span className="term-result">Available for internships</span></div>
                <div><span className="term-prompt">&gt; </span>location</div>
                <div><span className="term-result">Gurugram, Haryana, IN</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Python","Machine Learning","Cybersecurity","RAG Systems","React Native","LangChain","LangGraph","FAISS Vector DBs","PyTorch · TensorFlow","Anomaly Detection","Deepfake Detection","Kotlin · Android","Whisper STT","Google OAuth2","Streamlit · Plotly","9.88 CGPA","Deloitte Finalist","Ericsson R&D Intern"];
  const all = [...items, ...items];
  return (
    <div style={{ borderTop:"1px solid var(--outline)", borderBottom:"1px solid var(--outline)", padding:"0.85rem 0", background:"rgba(253,121,121,0.01)", overflow:"hidden" }}>
      <div className="marquee-inner">
        {all.map((t,i) => (
          <span key={i} className="mono" style={{ fontSize:"0.72rem", letterSpacing:"0.1em", color:"var(--ink2)", whiteSpace:"nowrap" }}>
            <span style={{ color:"var(--rose)", marginRight:"0.7rem" }}>✦</span>{t}
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="sec-pad" style={{ background:"var(--surface)", position:"relative", overflow:"hidden" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem", alignItems:"start" }}>
          <div className="rv d1 glass" style={{ padding:"2rem", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg, var(--rose), transparent)" }} />
            <div className="label" style={{ color:"var(--rose)", marginBottom:"1rem", display:"flex", alignItems:"center", gap:"0.5rem" }}>
              <span>⬡</span> ABOUT_ME.SH
            </div>
            <h2 style={{ fontFamily:"'Inter',sans-serif", fontSize:"1.7rem", fontWeight:800, letterSpacing:"-0.02em", lineHeight:1.2, marginBottom:"1.2rem" }}>
              Building at the intersection of<br /><span style={{ color:"var(--rose)" }}>AI & Security</span>
            </h2>
            <p style={{ fontSize:"0.88rem", color:"var(--ink2)", lineHeight:1.9, marginBottom:"1rem" }}>
              I'm Aayushi — a Computer Science student at Manipal University Jaipur, maintaining a <strong style={{ color:"var(--rose)" }}>9.88 CGPA</strong> across 5 semesters. My work spans AI systems, cybersecurity, and full-stack mobile development.
            </p>
            <p style={{ fontSize:"0.88rem", color:"var(--ink2)", lineHeight:1.9, marginBottom:"1.5rem" }}>
              At Ericsson, I worked on CVE triage, anomaly detection models, and automated incident response pipelines in a production SecOps environment. From agentic CVE triage tools built with LangGraph, to AI productivity assistants with Gmail integration and Whisper transcription.
            </p>

            <div style={{ display:"flex", gap:"0.6rem", flexWrap:"wrap" }}>
              <a href="mailto:aayushichhabra1010@gmail.com" className="icon-btn">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                Email
              </a>
              <a href="https://linkedin.com/in/aayushi-chhabra-54281a34a" target="_blank" rel="noreferrer" className="icon-btn">
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
              <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" className="icon-btn">
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub
              </a>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateRows:"auto auto", gap:"1.5rem" }}>
            <div className="rv d2 glass glass-cyan" style={{ padding:"1.8rem", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg, var(--cyan), transparent)" }} />
              <div className="label" style={{ color:"var(--cyan)", marginBottom:"1rem", display:"flex", alignItems:"center", gap:"0.5rem" }}>
                <span>📚</span> EDUCATION
              </div>
              {[
                { school:"Manipal University Jaipur", degree:"B.Tech — Computer Science & Engineering", detail:"CGPA: 9.88  ·  2023–2027", highlight:true },
                { school:"Manav Rachna International School", degree:"Class X: 95%  ·  Class XII: 96%", detail:"2021–2023 · Gurugram, Haryana", highlight:false },
              ].map(({ school, degree, detail, highlight }) => (
                <div key={school} style={{ marginBottom:"0.9rem", paddingBottom:"0.9rem", borderBottom:"1px solid var(--outline)" }}>
                  <div style={{ fontWeight:700, fontSize:"0.88rem", marginBottom:"0.2rem", color: highlight ? "var(--rose)" : "var(--ink)" }}>{school}</div>
                  <div style={{ fontSize:"0.78rem", color:"var(--ink2)", marginBottom:"0.15rem" }}>{degree}</div>
                  <div className="mono" style={{ fontSize:"0.63rem", color: highlight ? "var(--cyan)" : "var(--ink3)" }}>{detail}</div>
                </div>
              ))}
            </div>
            <div className="rv d3 glass" style={{ padding:"1.8rem", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg, var(--rose), transparent)" }} />
              <div className="label" style={{ color:"var(--rose)", marginBottom:"1rem" }}>📜 CERTIFICATIONS</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                {[
                  { org:"NPTEL", items:"Programming, DSA using Python · Design & Analysis of Algorithms" },
                  { org:"Oracle Academy", items:"DB Foundations · DB Programming with SQL · DB Design" },
                  { org:"Red Hat", items:"System Administration I (RH124)" },
                  { org:"Coursera", items:"AWS: Storage" },
                ].map(({ org, items }) => (
                  <div key={org} style={{ display:"flex", gap:"0.7rem" }}>
                    <span className="mono" style={{ fontSize:"0.65rem", color:"var(--rose)", minWidth:90, fontWeight:600, paddingTop:"0.1rem" }}>{org}</span>
                    <span style={{ fontSize:"0.77rem", color:"var(--ink2)", lineHeight:1.6 }}>{items}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TIMELINE ─── */
const TIMELINE_DATA = [
  { year: "2023", title: "Started B.Tech at MUJ", desc: "Began Computer Science & Engineering at Manipal University Jaipur. Set the academic foundation with a strong first semester.", icon: "🎓", col: "var(--rose)", side: "left" },
  { year: "2023", title: "Dean's Excellence Award — Sem 1", desc: "Achieved 9.88 CGPA in the very first semester, earning the first Dean's Excellence Award.", icon: "🏆", col: "var(--cyan)", side: "right" },
  { year: "2024", title: "Oracle & NPTEL Certifications", desc: "Completed certifications in Database Foundations, SQL Programming, DSA with Python, and Design & Analysis of Algorithms.", icon: "📜", col: "#a78bfa", side: "left" },
  { year: "2024", title: "5× Dean's Award Streak", desc: "Maintained 9.88 CGPA for 5 consecutive semesters — a testament to unwavering academic dedication.", icon: "⭐", col: "var(--rose)", side: "right" },
  { year: "2025", title: "Prodigy InfoTech — Android Intern", desc: "Built mobile app features using Android Studio and SQLite. First hands-on industry engineering experience.", icon: "📱", col: "var(--cyan)", side: "left" },
  { year: "2025", title: "Cognifyz Technologies — UI/UX Intern", desc: "Contributed to dashboard design improvements in Figma, enhancing usability across product interfaces.", icon: "🎨", col: "#a78bfa", side: "right" },
  { year: "2025", title: "Ericsson R&D — Cybersecurity & AI Intern", desc: "Worked on CVE triage, anomaly detection models, and automated incident response pipelines in a production SecOps environment.", icon: "🔐", col: "var(--rose)", side: "left" },
  { year: "2025", title: "Deloitte Capstone Ideathon — Top 10", desc: "Competed against 200+ teams and secured a Top 10 finish for innovative solution design and problem-solving.", icon: "🎯", col: "var(--cyan)", side: "right" },
  { year: "2025", title: "Building ResQNet & DeepFake Detection", desc: "Developing a cross-platform crisis management app and an AI-powered deepfake detection system with Grad-CAM explainability.", icon: "🚀", col: "#a78bfa", side: "left" },
];

function Timeline() {
  const isMobile = useIsMobile();

  return (
    <section id="timeline" className="sec-pad" style={{ background: "var(--bg)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(244,63,94,0.03) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
        <h2 className="rv d1" style={{ fontFamily:"'Inter',sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, marginBottom: "4rem" }}>
          My <span style={{ color:"var(--rose)" }}>Timeline</span>
        </h2>

        <div style={{ position: "relative" }}>
          {/* Desktop center line */}
          {!isMobile && (
            <div className="tl-desktop-line" style={{
              position: "absolute", left: "50%", top: 0, bottom: 0, width: 2,
              background: "linear-gradient(180deg, var(--rose), var(--cyan), transparent)",
              transform: "translateX(-50%)",
            }} />
          )}
          {/* Mobile left line */}
          {isMobile && (
            <div className="tl-mobile-line" style={{
              position: "absolute", left: 16, top: 0, bottom: 0, width: 2,
              background: "linear-gradient(180deg, var(--rose), var(--cyan), transparent)",
            }} />
          )}

          {TIMELINE_DATA.map((item, i) => {
            const isLeft = item.side === "left";
            return (
              <div
                key={i}
                className={`rv d${Math.min(i % 3 + 1, 5)}`}
                style={{
                  display: "flex",
                  justifyContent: isMobile ? "flex-start" : (isLeft ? "flex-end" : "flex-start"),
                  position: "relative",
                  marginBottom: "2.5rem",
                  paddingRight: isMobile ? 0 : (isLeft ? "calc(50% + 30px)" : "0"),
                  paddingLeft: isMobile ? "44px" : (isLeft ? "0" : "calc(50% + 30px)"),
                  textAlign: isMobile ? "left" : (isLeft ? "right" : "left"),
                }}
              >
                {/* Connector dot */}
                <div style={{
                  position: "absolute",
                  left: isMobile ? 10 : "50%",
                  top: 20,
                  width: 14, height: 14,
                  borderRadius: "50%", background: item.col,
                  boxShadow: `0 0 12px ${item.col}, 0 0 28px ${item.col}44`,
                  border: "3px solid var(--bg)",
                  transform: isMobile ? "none" : "translateX(-50%)",
                  zIndex: 2,
                }} />

                <div className="glass" style={{
                  padding: "1.4rem 1.6rem", width: "100%",
                  position: "relative", overflow: "hidden",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${item.col}50`;
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.4), 0 0 20px ${item.col}15`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--outline)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${item.col}, transparent)` }} />
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.5rem", flexDirection: "row" }}>
                    <span style={{ fontSize: "1.4rem" }}>{item.icon}</span>
                    <div>
                      <span className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.15em", color: item.col, textTransform: "uppercase", display: "block", marginBottom: "0.1rem" }}>{item.year}</span>
                      <h3 style={{ fontWeight: 700, fontSize: "0.9rem", lineHeight: 1.3 }}>{item.title}</h3>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "var(--ink2)", lineHeight: 1.75, marginLeft: "2.7rem", textAlign: "left" }}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const EXP = [
    {
      role:"Research & Development Intern", company:"Ericsson", loc:"Gurugram, Haryana",
      period:"Jun 2025 – Jul 2025", col:"var(--rose)",
      bullets:["Worked on Cybersecurity & AI projects including vulnerability analysis, CVE triage, and threat detection.","Developed anomaly detection models for a production-grade SecOps environment.","Contributed to automated incident response pipelines."],
      tags:["Cybersecurity","AI/ML","CVE Triage","Anomaly Detection"]
    },
    {
      role:"UI/UX Design Intern", company:"Cognifyz Technologies", loc:"Remote",
      period:"Mar 2025", col:"var(--cyan)",
      bullets:["Contributed to dashboard design improvements using Figma and front-end tooling.","Enhanced usability and visual consistency across product interfaces."],
      tags:["Figma","UI/UX","Dashboard Design"]
    },
    {
      role:"Android App Development Intern", company:"Prodigy InfoTech", loc:"Remote",
      period:"Feb 2025", col:"#a78bfa",
      bullets:["Developed and tested mobile app features using Android Studio and SQLite.","Implemented data persistence and UI components for a production Android application."],
      tags:["Android Studio","SQLite","Java","Mobile Dev"]
    }
  ];

  return (
    <section id="experience" className="sec-pad" style={{ background:"var(--bg)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <h2 className="rv d1" style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:800, letterSpacing:"-0.02em", marginBottom:"3rem" }}>
          Work <span style={{ color:"var(--rose)" }}>History</span>
        </h2>
        <div style={{ position:"relative", paddingLeft:"2rem" }}>
          <div style={{ position:"absolute", left:0, top:0, bottom:0, width:1, background:"linear-gradient(180deg, var(--rose), var(--cyan), transparent)" }} />
          {EXP.map(({ role, company, loc, period, col, bullets, tags }, i) => (
            <div key={company} className={`rv d${i+1}`} style={{ marginBottom:"2rem", position:"relative" }}>
              <div style={{ position:"absolute", left:-26, top:6, width:11, height:11, borderRadius:"50%", background:col, boxShadow:`0 0 10px ${col}`, border:"2px solid var(--bg)" }} />
              <div className="glass" style={{ padding:"1.8rem", borderRadius:"1rem" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=`${col}50`; e.currentTarget.style.boxShadow=`0 0 25px ${col}15`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="var(--outline)"; e.currentTarget.style.boxShadow="none"; }}
              >
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, borderRadius:"1rem 1rem 0 0", background:`linear-gradient(90deg, ${col}, transparent)` }} />
                <div className="exp-header" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"0.5rem", marginBottom:"1rem" }}>
                  <div>
                    <div style={{ fontWeight:700, fontSize:"1rem", marginBottom:"0.2rem" }}>{role}</div>
                    <div style={{ color:col, fontSize:"0.84rem", fontWeight:600 }}>{company} · {loc}</div>
                  </div>
                  <span className="mono" style={{ fontSize:"0.63rem", color:"var(--ink3)", padding:"0.25rem 0.75rem", background:"var(--s-mid)", border:"1px solid var(--outline)", borderRadius:"9999px" }}>{period}</span>
                </div>
                <ul style={{ listStyle:"none", marginBottom:"1rem", display:"flex", flexDirection:"column", gap:"0.4rem" }}>
                  {bullets.map((b,j) => (
                    <li key={j} style={{ fontSize:"0.82rem", color:"var(--ink2)", lineHeight:1.7, display:"flex", gap:"0.55rem" }}>
                      <span style={{ color:col, flexShrink:0 }}>→</span>{b}
                    </li>
                  ))}
                </ul>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
                  {tags.map(t => <span key={t} className="chip-rose" style={{ borderColor:`${col}30`, color:col }}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── VAULTBOT — COLLABORATIVE CONTRIBUTION ─── */
const VAULT_TECH = [
  { label: "Python", icon: "🐍" },
  { label: "FastAPI", icon: "⚡" },
  { label: "Discord.py", icon: "💬" },
  { label: "LangChain", icon: "🔗" },
  { label: "FAISS", icon: "🗂" },
  { label: "Groq / Llama 3.3", icon: "🧠" },
  { label: "Tavily Search", icon: "🔍" },
  { label: "Exa AI", icon: "🌐" },
  { label: "HuggingFace", icon: "🤗" },
  { label: "Redis", icon: "🔴" },
  { label: "BullMQ Worker", icon: "⚙️" },
  { label: "Supabase Postgres", icon: "🐘" },
  { label: "SQLAlchemy", icon: "🗃" },
  { label: "React + Vite", icon: "⚛️" },
  { label: "Recharts", icon: "📈" },
  { label: "Docker Compose", icon: "🐳" },
  { label: "Oracle Cloud", icon: "☁️" },
  { label: "nginx", icon: "🌀" },
  { label: "PyJWT", icon: "🔑" },
  { label: "Playwright", icon: "🎭" },
  { label: "openai-whisper", icon: "🎙" },
  { label: "Rank-BM25", icon: "🔢" },
];

const VAULT_HIGHLIGHTS = [
  { icon: "🖥", domain: "Frontend", col: "var(--cyan)", title: "React Admin Dashboard", desc: "Built out the full-featured dashboard — analytics via Recharts, channel management, source upload, crawler control, and a live chat widget, all auth-gated through Discord OAuth." },
  { icon: "🎨", domain: "Frontend", col: "var(--cyan)", title: "Dashboard UX & Theming", desc: "Implemented responsive layouts, state-driven UI interactions, and visual polish across the dashboard's analytics and settings views." },
  { icon: "🔌", domain: "Backend", col: "var(--rose)", title: "FastAPI Service Endpoints", desc: "Built and maintained REST endpoints powering guild configuration, source management, and dashboard data sync inside the FastAPI backend." },
  { icon: "🔐", domain: "Backend", col: "var(--rose)", title: "Auth & Session Middleware", desc: "Implemented Discord OAuth + JWT auth flow and role-based access middleware securing guild-scoped operations." },
  { icon: "🧠", domain: "AI", col: "#a78bfa", title: "RAG Pipeline Tuning", desc: "Worked on the retrieval layer — combining FAISS semantic search with BM25 lexical ranking, feeding grounded context into LangChain LCEL chains." },
  { icon: "📥", domain: "AI", col: "#a78bfa", title: "Multi-Modal Ingestion", desc: "Contributed to the ingestion pipeline supporting PDFs, DOCX, web scrapes, and Whisper audio transcription feeding into the knowledge base." },
];

function VaultBotContribution() {
  return (
    <section id="vaultbot" style={{ padding:"6rem 2.5rem", background:"var(--surface)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="rv d1" style={{ marginBottom:"2.5rem" }}>
          <h2 style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:800, letterSpacing:"-0.02em", marginBottom:"0.6rem" }}>
            A Platform I Helped <span style={{ color:"var(--rose)" }}>Build</span>
          </h2>
          <p className="mono" style={{ fontSize:"0.78rem", color:"var(--ink3)" }}>
            Co-founded and helped build a production-grade AI platform, leading the implementation of several core product features across frontend, backend, and AI infrastructure.
          </p>
        </div>

        <div className="rv d2 vaultbot-card">
          <div className="vaultbot-header">
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:"1.2rem", marginBottom:"1.6rem" }}>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"1rem", flexWrap:"wrap" }}>
                  <span className="contributor-badge">Co-Founder & Core Contributor</span>
                </div>
                <h3 className="vaultbot-shimmer-text" style={{ fontFamily:"'Inter',sans-serif", fontWeight:800, fontSize:"clamp(1.8rem,3.5vw,2.8rem)", letterSpacing:"-0.03em", lineHeight:1.1, marginBottom:"0.6rem" }}>
                  VaultBot
                </h3>
                <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.86rem", color:"rgba(253,121,121,0.7)", letterSpacing:"0.05em", marginBottom:"0.6rem" }}>
                  Production-Grade Multi-Tenant RAG AI Platform
                </p>
                <p style={{ fontSize:"0.92rem", color:"var(--ink2)", lineHeight:1.8, maxWidth:600 }}>
                  A full-stack, multi-service AI platform bringing server-specific, context-aware intelligence to Discord communities. As <strong style={{ color:"var(--ink)" }}>Co-Founder & Core Engineer</strong>, I played a key role in building and scaling the platform, contributing across the <strong style={{ color:"var(--cyan)" }}>React dashboard</strong>, the <strong style={{ color:"var(--rose)" }}>FastAPI backend</strong>, and the platform's <strong style={{ color:"#a78bfa" }}>RAG / AI retrieval pipeline</strong>.
                </p>
                <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap", marginTop:"1.1rem" }}>
                  <span className="domain-badge">🎨 Frontend</span>
                  <span className="domain-badge">🔧 Backend</span>
                  <span className="domain-badge">🧠 AI</span>
                </div>
              </div>

              <div className="vault-stats-container" style={{ display:"flex", flexDirection:"column", gap:"0.6rem", minWidth:160 }}>
                <div className="vault-stat-box">
                  <div style={{ fontFamily:"'Inter', sans-serif", fontWeight:800, fontSize:"2.1rem", color:"var(--rose)", letterSpacing:"-0.04em", lineHeight:1 }}>12,806</div>
                  <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:"rgba(253,121,121,0.6)", textTransform:"uppercase", letterSpacing:"0.1em", marginTop:"0.3rem" }}>Lines of Code</div>
                </div>
                <div className="vault-stat-box">
                  <div style={{ fontFamily:"'Inter', sans-serif", fontWeight:800, fontSize:"1.4rem", color:"var(--rose)", letterSpacing:"-0.02em", lineHeight:1 }}>4</div>
                  <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:"rgba(253,121,121,0.6)", textTransform:"uppercase", letterSpacing:"0.1em", marginTop:"0.3rem" }}>Services</div>
                </div>
                <div className="vault-stat-box">
                  <div style={{ fontFamily:"'Inter', sans-serif", fontWeight:800, fontSize:"1.4rem", color:"var(--rose)", letterSpacing:"-0.02em", lineHeight:1 }}>3</div>
                  <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:"rgba(253,121,121,0.6)", textTransform:"uppercase", letterSpacing:"0.1em", marginTop:"0.3rem" }}>Domains Touched</div>
                </div>
              </div>
            </div>

            <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
              {[["FastAPI Backend","🔌"],["Discord Bot","💬"],["React Dashboard","🖥"],["BullMQ Worker","⚙️"],["Redis Cache","🔴"],["Supabase Postgres","🐘"],["Docker Compose","🐳"],["Oracle Cloud","☁️"]].map(([label, icon]) => (
                <div key={label} style={{ display:"inline-flex", alignItems:"center", gap:"0.3rem", background:"rgba(253,121,121,0.05)", border:"1px solid rgba(253,121,121,0.12)", borderRadius:"0.4rem", padding:"0.3rem 0.7rem", fontFamily:"'JetBrains Mono', monospace", fontSize:"0.68rem", color:"rgba(253,121,121,0.65)", letterSpacing:"0.04em" }}>
                  <span style={{ fontSize:"0.85rem" }}>{icon}</span> {label}
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding:"2.5rem" }}>
            <div style={{ marginBottom:"2.5rem" }}>
              <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.7rem", color:"rgba(253,121,121,0.5)", letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"1.4rem" }}>// WHAT_I_CONTRIBUTED</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:"1rem" }}>
                {VAULT_HIGHLIGHTS.map((h) => (
                  <div key={h.title} style={{ background:"rgba(255,255,255,0.02)", border:`1px solid ${h.col}25`, borderRadius:"0.7rem", padding:"1.3rem", transition:"all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${h.col}10`; e.currentTarget.style.borderColor = `${h.col}45`; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = `${h.col}25`; }}
                  >
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"0.7rem" }}>
                      <span style={{ fontSize:"1.3rem" }}>{h.icon}</span>
                      <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.6rem", color:h.col, border:`1px solid ${h.col}40`, borderRadius:"9999px", padding:"0.15rem 0.6rem", letterSpacing:"0.08em", textTransform:"uppercase" }}>{h.domain}</span>
                    </div>
                    <div style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.88rem", color:h.col, marginBottom:"0.4rem", letterSpacing:"-0.01em" }}>{h.title}</div>
                    <div style={{ fontSize:"0.81rem", color:"var(--ink2)", lineHeight:1.7 }}>{h.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom:"2.5rem" }}>
              <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:"0.7rem", color:"rgba(253,121,121,0.5)", letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"1.2rem" }}>// FULL_TECH_STACK</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
                {VAULT_TECH.map((t) => (
                  <span key={t.label} className="vault-tech-pill">
                    <span style={{ fontSize:"0.85rem" }}>{t.icon}</span>
                    {t.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="terminal" style={{ marginBottom:"2rem" }}>
              <div><span className="term-prompt">$ </span>cat CONTRIBUTORS.md</div>
              <div style={{ paddingLeft:"1rem" }}>
                <div><span style={{ color:"var(--cyan)" }}>Arman Phaugat</span>{"   "}→ Founder &amp; Lead Architect</div>
                <div><span className="term-result">Aayushi Chhabra</span> → Co-Founder & Core Contributor (Frontend · Backend · AI)</div>
              </div>
              <div style={{ marginTop:"0.3rem" }}>
                <span className="term-prompt">$ </span>git log --author=&quot;Aayushi&quot; --stat
                <span style={{ width:2, height:14, background:"var(--cyan)", display:"inline-block", verticalAlign:"middle", marginLeft:2, animation:"blink 1s step-end infinite" }} />
              </div>
              <div style={{ paddingLeft:"1rem", color:"var(--ink2)" }}>dashboard · auth middleware · retrieval pipeline …</div>
            </div>

            <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
              <a href="https://discord.com/oauth2/authorize?client_id=1463510548808208415" target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize:"0.78rem" }}>
                Add VaultBot to Discord ↗
              </a>
              <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" className="btn-outline-cyan" style={{ fontSize:"0.78rem" }}>
                View My Contributions ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    num:"01", name:"Unified Cybersecurity Platform",
    tagline:"AI-driven SecOps ecosystem for real-time threat detection & automated incident response",
    category:"AI/ML · Security", col:"var(--rose)", featured:true,
    tech:["Python","Streamlit","LangChain","Gemini","FAISS","AWS Boto3","Plotly"],
    highlights:["RAG-powered incident guidance with semantic threat search","FAISS + Gemini embeddings for rapid containment","Interactive network attack analytics & anomaly detection","Comprehensive SecOps situational awareness dashboard"],
    link:"https://intelligent-secops-rag-dashboard.streamlit.app",
  },
  {
    num:"02", name:"ResQNet",
    tagline:"Cross-platform crisis management for citizens, NGOs & government agencies",
    category:"Mobile · Full Stack", col:"var(--cyan)",
    tech:["React Native","Expo","BLE","Supabase","Firebase","NativeWind","Geolib"],
    highlights:["Offline-first BLE-based mobile crisis reporting","Automated resource allocation via incident clustering","Multi-channel real-time situational awareness","Geolocation-based alert routing"],
    link:"https://github.com/aayushichhabra/ResQNet",
  },
  {
    num:"03", name:"DeepFake Detection System",
    tagline:"End-to-end deepfake detection pipeline with visual explainability",
    category:"AI/ML · Computer Vision", col:"#a78bfa",
    tech:["Python","PyTorch","EfficientNetB0","Grad-CAM","OpenCV","Scikit-learn"],
    highlights:["Binary classification: real vs. AI-generated images","Grad-CAM explainability heatmaps for security auditors","Transfer learning with EfficientNetB0 backbone"],
    link:"https://github.com/aayushichhabra/DeepFakeImageDetection",
  },
  {
    num:"04", name:"Promptly AI",
    tagline:"AI productivity assistant — email triage, reply drafting & meeting intelligence",
    category:"AI · Full Stack", col:"var(--cyan)",
    tech:["Python","Streamlit","Gemini 2.5 Flash","Whisper","Gmail API","Google OAuth2","LangChain"],
    highlights:["Gmail OAuth: auto-scans inbox for reminders & deadlines","Gemini batch email processing with ready-to-send drafts","Whisper audio → structured Minutes of Meeting","Unified dashboard across sessions"],
    link:"https://github.com/aayushichhabra",
  },
  {
    num:"05", name:"CVE Agent",
    tagline:"Agentic AI for real-time CVE triage, dependency scanning & fix generation",
    category:"AI/ML · Cybersecurity", col:"var(--rose)",
    tech:["Python","Streamlit","Gemini API","LangGraph","NIST NVD API","OSV.dev","BeautifulSoup4"],
    highlights:["LangGraph pipeline: fetches & summarizes CVEs from NIST NVD","Dependency scanner with CVSS scores from requirements.txt","AI-generated fix recommendations with downloadable files"],
    link:"https://github.com/aayushichhabra",
  },
  {
    num:"06", name:"VaultBot AI",
    tagline:"Production-grade multi-tenant RAG platform & Discord collaboration agent",
    category:"AI · Backend · Full Stack", col:"#a78bfa",
    tech:["FastAPI","Discord.py","LangChain","Supabase","Redis","Groq / Llama 3"],
    highlights:["RAG-based context-aware server intelligence","Custom retrieval pipeline with FAISS vector database","Scale-ready multi-tenant infrastructure on Oracle Cloud"],
    link:"#vaultbot",
  },
];

function ProjectCard({ p, i }) {
  const [hov, setHov] = useState(false);
  if (p.featured) {
    return (
      <div className="rv d1 project-featured" style={{ gridColumn:"1/-1" }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
        <div style={{
          background:"rgba(19,19,19,0.82)", backdropFilter:"blur(14px)",
          border:`1px solid ${hov ? p.col : "var(--outline)"}`,
          boxShadow: hov ? `0 0 40px ${p.col}18` : "none",
          borderRadius:"1.2rem", padding:"2.5rem",
          display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2.5rem", alignItems:"start",
          transition:"all 0.3s", position:"relative", overflow:"hidden"
        }} className="about-grid">
          <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, ${p.col}, var(--cyan), transparent)` }} />
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"1rem", flexWrap:"wrap" }}>
              <span className="label" style={{ color:p.col, padding:"0.2rem 0.7rem", background:`${p.col}15`, border:`1px solid ${p.col}30`, borderRadius:"9999px" }}>#{p.num} · FEATURED</span>
              <span className="label" style={{ color:"var(--ink3)", fontSize:"0.6rem" }}>{p.category}</span>
            </div>
            <h3 style={{ fontFamily:"'Inter',sans-serif", fontSize:"1.6rem", fontWeight:800, marginBottom:"0.6rem", letterSpacing:"-0.02em", lineHeight:1.2 }}>{p.name}</h3>
            <p style={{ fontSize:"0.88rem", color:"var(--ink2)", lineHeight:1.75, marginBottom:"1.5rem" }}>{p.tagline}</p>
            <div className="tag-row" style={{ marginBottom:"1.5rem" }}>
              {p.tech.map(t => <span key={t} className="chip-rose" style={{ borderColor:`${p.col}30`, color:p.col }}>{t}</span>)}
            </div>
            <a href={p.link} target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize:"0.72rem", padding:"0.6rem 1.4rem", background: p.col, boxShadow: `0 4px 18px ${p.col}55` }}>View Live →</a>
          </div>
          <div style={{ background:"var(--s-low)", border:"1px solid var(--outline)", borderRadius:"0.8rem", padding:"1.5rem" }}>
            <div className="label" style={{ color:"var(--ink3)", marginBottom:"1rem", fontSize:"0.62rem" }}>// KEY FEATURES</div>
            <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"0.75rem" }}>
              {p.highlights.map((h,j) => (
                <li key={j} style={{ fontSize:"0.81rem", color:"var(--ink2)", lineHeight:1.65, display:"flex", gap:"0.55rem" }}>
                  <span style={{ color:p.col, flexShrink:0, fontSize:"0.65rem", marginTop:"0.22rem" }}>◆</span>{h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`rv d${(i%3)+1}`} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background:"rgba(19,19,19,0.82)", backdropFilter:"blur(14px)",
        border:`1px solid ${hov ? p.col : "var(--outline)"}`,
        boxShadow: hov ? `0 0 28px ${p.col}18` : "none",
        borderRadius:"1rem", padding:"2rem",
        transform: hov ? "translateY(-4px)" : "none",
        transition:"all 0.3s", display:"flex", flexDirection:"column",
        position:"relative", overflow:"hidden", cursor:"default"
      }}
    >
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, ${p.col}, transparent)` }} />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1rem" }}>
        <div>
          <span className="mono" style={{ fontSize:"0.62rem", color:p.col, display:"block", marginBottom:"0.3rem" }}>#{p.num}</span>
          <span className="label" style={{ fontSize:"0.6rem", color:p.col, padding:"0.2rem 0.6rem", background:`${p.col}12`, border:`1px solid ${p.col}25`, borderRadius:"9999px" }}>{p.category}</span>
        </div>
        {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ color: hov ? p.col : "var(--ink3)", textDecoration:"none", fontSize:"0.8rem", fontFamily:"'JetBrains Mono',monospace", transition:"color 0.2s" }}>↗</a>}
      </div>
      <h3 style={{ fontFamily:"'Inter',sans-serif", fontSize:"1.05rem", fontWeight:700, marginBottom:"0.45rem", lineHeight:1.3 }}>{p.name}</h3>
      <p style={{ fontSize:"0.79rem", color:"var(--ink2)", lineHeight:1.7, marginBottom:"0.9rem" }}>{p.tagline}</p>
      <ul style={{ listStyle:"none", marginBottom:"1.1rem", flex:1 }}>
        {p.highlights.map((h,j) => (
          <li key={j} style={{ fontSize:"0.77rem", color:"var(--ink2)", lineHeight:1.65, marginBottom:"0.28rem", display:"flex", gap:"0.45rem" }}>
            <span style={{ color:p.col, flexShrink:0 }}>›</span>{h}
          </li>
        ))}
      </ul>
      <div className="tag-row">
        {p.tech.map(t => <span key={t} className={p.col === "var(--cyan)" ? "chip-cyan" : "chip-rose"} style={{ borderColor:`${p.col}25`, color:p.col }}>{t}</span>)}
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding:"6rem 2.5rem", background:"var(--surface)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"1rem", marginBottom:"3rem" }}>
          <h2 className="rv d1" style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:800, letterSpacing:"-0.02em" }}>
            Featured <span style={{ color:"var(--rose)" }}>Work</span>
          </h2>
          <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" className="btn-outline-rose" style={{ fontSize:"0.7rem" }}>View All on GitHub ↗</a>
        </div>
        <div className="projects-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(310px,1fr))", gap:"1.3rem" }}>
          {PROJECTS.map((p,i) => <ProjectCard key={p.num} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ─── */
const SKILL_GROUPS = [
  { label:"Deep Learning & Computer Vision", items:["PyTorch","TensorFlow Lite","OpenCV","EfficientNetB0","Grad-CAM","Transfer Learning","CNNs","Autoencoders"], col:"#4cd7f6", icon:"👁️" },
  { label:"Generative AI & RAG", items:["LangChain","Google Gemini API","FAISS","Hugging Face","Vector Databases","Prompt Engineering","Semantic Search"], col:"#a78bfa", icon:"🤖" },
  { label:"Machine Learning", items:["Supervised & Unsupervised Learning","Anomaly Detection","Model Evaluation","Scikit-learn","Pandas","NumPy"], col:"#34d399", icon:"📊" },
  { label:"Backend & Deployment", items:["FastAPI","Redis","Docker Compose","nginx","BullMQ","REST APIs","Streamlit","Gradio"], col:"#FD7979", icon:"⚙️" },
  { label:"Programming & CS Fundamentals", items:["Python","Java","JavaScript","Git","Data Structures & Algorithms"], col:"#4cd7f6", icon:"💻" },
  { label:"Databases", items:["SQL","Supabase Postgres","Firebase","Redis","FAISS (Vector DB)","SQLAlchemy"], col:"#a78bfa", icon:"🛢️" },
];

const SKILL_BARS = [
  { name:"Machine Learning & AI Systems", pct:88, col:"#FD7979" },
  { name:"Python / Full-stack Dev",        pct:87, col:"#4cd7f6" },
  { name:"Cybersecurity & Threat Detection",pct:84, col:"#a78bfa" },
  { name:"React Native / Mobile Dev",       pct:82, col:"#FD7979" },
  { name:"Database Design & Cloud",         pct:80, col:"#4cd7f6" },
  { name:"UI/UX & Frontend",                pct:75, col:"#34d399" },
];

function SkillBar({ name, pct, col, delay }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVis(true); },
      { threshold: 0 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ marginBottom:"1.1rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.5rem" }}>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.8rem", color:"var(--ink)" }}>{name}</span>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.78rem", color:col }}>{pct}%</span>
      </div>
      <div style={{ height:3, background:"rgba(255,255,255,0.06)", borderRadius:10, overflow:"hidden" }}>
        <div style={{
          height:"100%",
          background:`linear-gradient(90deg, ${col}, ${col}88)`,
          borderRadius:10,
          boxShadow:`0 0 8px ${col}55`,
          width: vis ? `${pct}%` : "0%",
          transition:`width 1.4s cubic-bezier(0.25,1,0.5,1) ${delay}s`,
        }} />
      </div>
    </div>
  );
}

function Skills() {
  const [tab, setTab] = useState("tags");
  useReveal(tab);
  return (
    <section id="skills" style={{ padding:"6rem 2.5rem", background:"var(--bg)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="skills-tab-row" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"1rem", marginBottom:"2.5rem" }}>
          <h2 className="rv d1" style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:800, letterSpacing:"-0.02em" }}>
            Technical <span style={{ color:"var(--rose)" }}>Toolkit</span>
          </h2>
          <div style={{ display:"flex", gap:"0.5rem" }}>
            {[["tags","By Domain"],["bars","Proficiency"]].map(([k,l]) => (
              <button key={k} onClick={() => setTab(k)} className="mono" style={{
                padding:"0.4rem 0.9rem", borderRadius:"9999px",
                border:`1px solid ${tab===k ? "var(--rose)" : "var(--outline)"}`,
                background: tab===k ? "var(--rose-dim)" : "transparent",
                color: tab===k ? "var(--rose)" : "var(--ink2)",
                cursor:"pointer", fontSize:"0.68rem", letterSpacing:"0.06em", transition:"all 0.2s"
              }}>{l}</button>
            ))}
          </div>
        </div>

        {tab === "tags" && (
          <div className="skills-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.1rem" }}>
            {SKILL_GROUPS.map(({ label, items, col, icon }, i) => (
              <div key={label} className={`rv d${i+1} glass`}
                style={{ padding:"1.5rem", borderRadius:"1rem", position:"relative", overflow:"hidden" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=`${col}40`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="var(--outline)"; }}
              >
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, ${col}, transparent)` }} />
                <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"0.9rem" }}>
                  <span>{icon}</span>
                  <span style={{ fontSize:"0.82rem", fontWeight:700, color:col }}>{label}</span>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem" }}>
                  {items.map(t => (
                    <span key={t} className="chip-neutral" style={{ borderColor:`${col}20`, color:col }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "bars" && (
          <div className="bars-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 4rem" }}>
            {SKILL_BARS.map((s, i) => (
              <SkillBar key={s.name} {...s} delay={i * 0.07} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Achievements() {
  const items = [
    { icon:"🏆", title:"Dean's Excellence Award", desc:"Maintained 9.88 CGPA across 5 consecutive semesters at MUJ.", col:"var(--rose)" },
    { icon:"🎯", title:"Deloitte Capstone Ideathon Finalist", desc:"Ranked Top 10 out of 200+ teams for innovative solution design.", col:"var(--cyan)" },
    { icon:"📡", title:"Promotional Head — Turing Sapiens", desc:"Led team executing campaigns for technical events and community engagement.", col:"#a78bfa" },
    { icon:"📝", title:"Research Paper (In Progress)", desc:"Authoring a review on power consumption & cooling optimization in data centers.", col:"var(--rose)" },
  ];
  return (
    <section id="achievements" className="sec-pad" style={{ background:"var(--surface)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <h2 className="rv d1" style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:800, letterSpacing:"-0.02em", marginBottom:"3rem" }}>
          Milestones & <span style={{ color:"var(--rose)" }}>Awards</span>
        </h2>
        <div className="achievements-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"1.2rem", marginBottom:"2.5rem" }}>
          {items.map(({ icon, title, desc, col }, i) => (
            <div key={title} className={`rv d${i+1} glass`} style={{ padding:"2rem", borderRadius:"1rem", position:"relative", overflow:"hidden" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=`${col}45`; e.currentTarget.style.boxShadow=`0 0 24px ${col}12`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="var(--outline)"; e.currentTarget.style.boxShadow="none"; }}
            >
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, ${col}, transparent)` }} />
              <div style={{ fontSize:"2rem", marginBottom:"0.9rem" }}>{icon}</div>
              <h3 style={{ fontWeight:700, fontSize:"0.88rem", marginBottom:"0.5rem", color:col }}>{title}</h3>
              <p style={{ fontSize:"0.8rem", color:"var(--ink2)", lineHeight:1.75 }}>{desc}</p>
            </div>
          ))}
        </div>
        <div className="rv d5 cgpa-banner" style={{ background:"rgba(253,121,121,0.04)", border:"1px solid rgba(253,121,121,0.12)", borderRadius:"1rem", padding:"2.2rem 3rem", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"2rem" }}>
          <div>
            <div className="label" style={{ color:"var(--ink3)", marginBottom:"0.4rem", fontSize:"0.62rem" }}>ACADEMIC STANDING</div>
            <div className="stat-val" style={{ fontFamily:"'Inter',sans-serif", fontSize:"4rem", fontWeight:800, color:"var(--rose)", lineHeight:1, textShadow:"0 0 40px rgba(253,121,121,0.35)" }}>9.88</div>
            <div className="mono" style={{ fontSize:"0.68rem", color:"var(--ink3)", marginTop:"0.3rem" }}>CGPA · Manipal University Jaipur</div>
          </div>
          <div className="cgpa-stats" style={{ display:"flex", gap:"3rem", flexWrap:"wrap" }}>
            {[["5×","Dean's Award"],["3+","Internships"],["Top 10","Deloitte Ideathon"]].map(([n,l]) => (
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"1.8rem", fontWeight:800, color:"var(--rose)" }}>{n}</div>
                <div className="mono" style={{ fontSize:"0.6rem", color:"var(--ink3)", marginTop:"0.2rem", letterSpacing:"0.1em" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "aayushichhabra1010@gmail.com";
  return (
    <section id="contact" className="sec-pad" style={{ background:"var(--bg)", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:700, background:"radial-gradient(circle, rgba(253,121,121,0.05) 0%, transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />
      <div style={{ maxWidth:700, margin:"0 auto", textAlign:"center", position:"relative" }}>
        <h2 className="rv d1" style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(2.2rem,5vw,3.5rem)", fontWeight:800, letterSpacing:"-0.03em", marginBottom:"1.2rem", lineHeight:1.1 }}>
          Let's <span style={{ color:"var(--rose)", textShadow:"0 0 30px rgba(253,121,121,0.3)" }}>Connect</span>
        </h2>
        <p className="rv d2" style={{ fontSize:"0.9rem", color:"var(--ink2)", lineHeight:1.85, marginBottom:"2.5rem" }}>
          Open to internship opportunities, research collaborations, and interesting projects in AI, cybersecurity, and full-stack development.
        </p>

        <div className="rv d3 contact-email-row" style={{ display:"flex", alignItems:"center", gap:"0.8rem", justifyContent:"center", marginBottom:"2rem", flexWrap:"wrap" }}>
          <span className="mono contact-email-text" style={{ fontSize:"0.85rem", color:"var(--rose)", letterSpacing:"0.03em" }}>{email}</span>
          <button onClick={() => { navigator.clipboard.writeText(email); setCopied(true); setTimeout(()=>setCopied(false),2000); }}
            style={{ background: copied ? "rgba(52,211,153,0.1)" : "var(--rose-dim)", border:`1px solid ${copied ? "rgba(52,211,153,0.3)" : "rgba(253,121,121,0.3)"}`, borderRadius:"9999px", padding:"0.35rem 0.9rem", cursor:"pointer", color: copied ? "#34d399" : "var(--rose)", fontSize:"0.66rem", fontFamily:"'JetBrains Mono',monospace", transition:"all 0.2s" }}>
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
        <div className="rv d4 contact-socials" style={{ display:"flex", justifyContent:"center", gap:"0.6rem", flexWrap:"wrap", marginBottom:"2.5rem" }}>
          {[
            { label:"LinkedIn", url:"https://linkedin.com/in/aayushi-chhabra-54281a34a", icon:<svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
            { label:"GitHub", url:"https://github.com/aayushichhabra", icon:<svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg> },
            { label:"LeetCode", url:"https://leetcode.com/u/aayushichhabra", icon:<svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg> },
            { label:"SecOps Live", url:"https://intelligent-secops-rag-dashboard.streamlit.app", icon:<svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
          ].map(({ label, url, icon }) => (
            <a key={label} href={url} target="_blank" rel="noreferrer" className="icon-btn">{icon}{label}</a>
          ))}
        </div>
        <div className="rv d5 contact-btns" style={{ display:"flex", gap:"0.8rem", justifyContent:"center", flexWrap:"wrap" }}>
          <a href="mailto:aayushichhabra1010@gmail.com" className="btn-primary">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
            Send a Message
          </a>
          <a href="https://linkedin.com/in/aayushi-chhabra-54281a34a" target="_blank" rel="noreferrer" className="btn-outline-cyan">
            LinkedIn Profile →
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop:"1px solid var(--outline)", padding:"1.8rem 2.5rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem", background:"var(--surface)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"0.8rem" }}>
        <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:"0.85rem", letterSpacing:"0.1em", color:"var(--rose)" }}>AAYUSHI_CHHABRA</span>
        <span className="mono" style={{ fontSize:"0.62rem", color:"var(--ink3)" }}>B.Tech CSE · MUJ · 2027</span>
      </div>
      <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
        <span style={{ width:6, height:6, borderRadius:"50%", background:"#34d399", boxShadow:"0 0 8px #34d399", animation:"pulse 2s infinite", display:"inline-block" }} />
        <span className="mono" style={{ fontSize:"0.62rem", color:"var(--ink3)" }}>All Systems Operational</span>
      </div>
      <div className="mono" style={{ fontSize:"0.62rem", color:"var(--ink3)", letterSpacing:"0.06em" }}>
        aayushichhabra1010@gmail.com · Gurugram, IN
      </div>
    </footer>
  );
}

function TerminalModal({ open, setOpen }) {
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [output, setOutput] = useState([
    { type: "success", text: "System Initialization Complete. Type help to list commands." }
  ]);
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  if (!open) return null;

  const handleCommand = (cmdStr) => {
    const cmd = cmdStr.trim().toLowerCase();
    if (!cmd) return;
    const newOutput = [...output, { type: "line", text: `aayushi@cyber-ai:~$ ${cmd}` }];

    switch (cmd) {
      case "help":
        newOutput.push({
          type: "warning",
          html: `Available Commands:<br/>• <b>about</b> - Background & education (9.85 CGPA)<br/>• <b>nori</b> - Architecture & metrics for Nori RAG<br/>• <b>ericsson</b> - R&D internship details<br/>• <b>patent</b> - View published Indian Patent Journal info<br/>• <b>skills</b> - Technical stack overview<br/>• <b>resume</b> - Download updated resume PDF<br/>• <b>clear</b> - Clear terminal screen`
        });
        break;
      case "about":
        newOutput.push({
          type: "success",
          text: "Aayushi Chhabra | 3rd Year B.Tech CSE @ Manipal University Jaipur (CGPA: 9.85). Specialized in AI, SecOps, Machine Learning, DeepFake Detection, and RAG systems. Dean's Excellence Award recipient for 6 consecutive semesters."
        });
        break;
      case "nori":
        newOutput.push({
          type: "success",
          text: "Nori RAG AI Platform for Discord: Co-founded & built 15,600+ LOC across 4 microservices. Sub-10ms ONNX Intent Classifier cutting API costs by ~75%. Graphlit RAG pipeline with Supabase & Oracle Cloud deployment."
        });
        break;
      case "ericsson":
        newOutput.push({
          type: "success",
          text: "Ericsson R&D Intern (Jun-Jul 2025): Automated CVE triage reducing manual review by ~40%. Isolation Forest / Autoencoders with 91% precision. Reduced mean time-to-triage by 35%."
        });
        break;
      case "patent":
        newOutput.push({
          type: "success",
          text: "Published Patent (2026): 'An AI-based Unified Email and Meeting Workflow Management System' - Published in Indian Patent Journal."
        });
        break;
      case "skills":
        newOutput.push({
          type: "success",
          html: `Technical Skills (Matching Resume):<br/>• <b>Deep Learning & CV:</b> PyTorch, TensorFlow Lite, OpenCV, EfficientNetB0, Grad-CAM, Transfer Learning, CNNs, Autoencoders<br/>• <b>Generative AI & RAG:</b> LangChain, Google Gemini API, FAISS, Hugging Face, Vector Databases, Prompt Engineering, Semantic Search<br/>• <b>Machine Learning:</b> Supervised & Unsupervised Learning, Anomaly Detection, Model Evaluation, Scikit-learn, Pandas, NumPy<br/>• <b>Backend & Deployment:</b> FastAPI, Redis, Docker Compose, nginx, BullMQ, REST APIs, Streamlit, Gradio<br/>• <b>Programming & CS:</b> Python, Java, JavaScript, Git, Data Structures & Algorithms<br/>• <b>Databases:</b> SQL, Supabase Postgres, Firebase, Redis, FAISS (Vector DB), SQLAlchemy`
        });
        break;
      case "resume":
        newOutput.push({ type: "success", text: "Downloading updated resume PDF..." });
        window.open("/Aayushi_Chhabra_Resume.pdf", "_blank");
        break;
      case "clear":
        setOutput([]);
        return;
      default:
        newOutput.push({ type: "error", text: `Command not recognized: '${cmd}'. Type help for command list.` });
        break;
    }
    setOutput(newOutput);
  };

  return (
    <div style={{
      position: "fixed",
      bottom: maximized ? "20px" : "30px",
      right: maximized ? "20px" : "30px",
      width: maximized ? "calc(100vw - 40px)" : "500px",
      maxWidth: "calc(100vw - 40px)",
      height: minimized ? "44px" : (maximized ? "calc(100vh - 100px)" : "380px"),
      background: "#090e17",
      border: "1px solid rgba(0, 242, 254, 0.3)",
      borderRadius: "16px",
      boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(0, 242, 254, 0.15)",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      transition: "all 0.3s ease"
    }}>
      <div style={{
        background: "#0f172a",
        padding: "10px 16px",
        display: "flex",
        justify-content: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        cursor: "pointer"
      }}>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
          💻 Aayushi OS Shell v2.6 [aayushi@cyber-ai]
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => setMinimized(m => !m)} style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b", border: "none", cursor: "pointer" }} title="Minimize" />
          <button onClick={() => { setMaximized(m => !m); setMinimized(false); }} style={{ width: 12, height: 12, borderRadius: "50%", background: "#10b981", border: "none", cursor: "pointer" }} title="Maximize" />
          <button onClick={() => setOpen(false)} style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444", border: "none", cursor: "pointer" }} title="Close" />
        </div>
      </div>
      {!minimized && (
        <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", background: "#050811", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px" }}>
          <div ref={outputRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px", paddingBottom: "12px" }}>
            {output.map((item, idx) => (
              <div key={idx} style={{
                color: item.type === "error" ? "#ef4444" : (item.type === "warning" ? "#f59e0b" : (item.type === "line" ? "var(--ink)" : "#00f2fe")),
                lineHeight: 1.5
              }}>
                {item.html ? <span dangerouslySetInnerHTML={{ __html: item.html }} /> : item.text}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.05)", padding: "8px 12px", borderRadius: "8px" }}>
            <span style={{ color: "#00f2fe", fontWeight: 700 }}>aayushi@cyber-ai:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  handleCommand(inputVal);
                  setInputVal("");
                }
              }}
              placeholder="type 'help'..."
              autoFocus
              style={{ background: "transparent", border: "none", outline: "none", color: "#ffffff", width: "100%", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  useReveal(null);
  const [cliOpen, setCliOpen] = useState(false);
  return (
    <>
      <style>{G}</style>
      <ScrollProg />
      <SectionProgress />
      <Nav onOpenCli={() => setCliOpen(true)} />
      <main>
        <Hero onOpenCli={() => setCliOpen(true)} />
        <Marquee />
        <About />
        <Timeline />
        <Experience />
        <VaultBotContribution />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <TerminalModal open={cliOpen} setOpen={setCliOpen} />
    </>
  );
}