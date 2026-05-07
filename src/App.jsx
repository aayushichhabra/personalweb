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

  /* ─── BENTO GLASS ─── */
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

  /* ─── ANIMATIONS ─── */
  @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:0.35} }
  @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes marquee   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes fadeUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes glow-pulse{ 0%,100%{text-shadow:0 0 20px rgba(253,121,121,0.3)} 50%{text-shadow:0 0 50px rgba(253,121,121,0.6)} }
  @keyframes scanline  { 0%{transform:translateY(-10px);opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateY(60px);opacity:0} }
  @keyframes spin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  .rv { opacity:0; transform:translateY(18px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .rv.on { opacity:1; transform:translateY(0); }
  .d1{transition-delay:.08s} .d2{transition-delay:.16s} .d3{transition-delay:.24s}
  .d4{transition-delay:.32s} .d5{transition-delay:.4s}  .d6{transition-delay:.48s}

  /* ─── CHIPS ─── */
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

  /* ─── BUTTONS ─── */
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

  /* ─── NAV LINK ─── */
  .nav-link {
    font-family: 'JetBrains Mono', monospace; font-size: 0.78rem;
    color: var(--ink2); text-decoration: none; transition: color 0.2s;
    padding-bottom: 2px;
  }
  .nav-link:hover { color: var(--rose); }
  .nav-link.active { color: var(--rose); border-bottom: 1px solid var(--rose); }

  /* ─── LABEL CAPS ─── */
  .label { font-family: 'Space Grotesk', sans-serif; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }

  /* ─── SCROLL BAR ─── */
  .scroll-prog {
    position: fixed; top: 0; left: 0; height: 2px; z-index: 9999;
    background: linear-gradient(90deg, var(--rose), var(--cyan));
    box-shadow: 0 0 8px var(--rose); transition: width 0.05s linear;
  }

  /* ─── GLOW TEXT ─── */
  .glow-text { animation: glow-pulse 3s ease-in-out infinite; }

  /* ─── TERMINAL BLOCK ─── */
  .terminal {
    background: var(--s-mid); border: 1px solid var(--outline);
    border-radius: 0.6rem; padding: 1rem 1.2rem;
    font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;
    line-height: 1.7; color: var(--ink2);
  }
  .term-prompt { color: var(--cyan); }
  .term-result { color: var(--rose); }

  /* ─── SECTION LABEL ─── */
  .sec-label {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-family: 'Space Grotesk', sans-serif; font-size: 0.68rem;
    font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--rose); margin-bottom: 1.2rem;
  }
  .sec-label::before { content:''; width: 16px; height: 1px; background: var(--rose); }

  /* ─── STAT CARD ─── */
  .stat-val {
    font-family: 'Inter', sans-serif; font-size: 2.4rem;
    font-weight: 800; line-height: 1;
  }

  /* ─── MARQUEE ─── */
  .marquee-wrap { overflow: hidden; white-space: nowrap; }
  .marquee-inner { display: inline-flex; gap: 3rem; animation: marquee 32s linear infinite; }

  /* ─── PROGRESS BAR ─── */
  .prog-track { height: 3px; background: var(--s-high); border-radius: 99px; overflow: hidden; }
  .prog-fill {
    height: 100%; border-radius: 99px;
    transition: width 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s;
  }

  /* ─── TIMELINE CONNECTOR ─── */
  .tl-dot {
    position: absolute; left: -26px; top: 6px;
    width: 12px; height: 12px; border-radius: 50%;
    border: 2px solid var(--surface);
  }

  /* ─── MOBILE ─── */
  @media(max-width: 768px) {
    .hide-m { display: none !important; }
    .full-m { grid-column: 1 / -1 !important; }
    .pad { padding: 5rem 1.2rem !important; }
  }

  /* ─── ICON LINK BTN ─── */
  .icon-btn {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.6rem 1.1rem; border-radius: 0.6rem;
    font-family: 'JetBrains Mono', monospace; font-size: 0.73rem; font-weight: 600;
    text-decoration: none; transition: all 0.22s; border: 1px solid var(--outline);
    background: var(--s-low); color: var(--ink2);
  }
  .icon-btn:hover { border-color: rgba(253,121,121,0.5); color: var(--rose); background: rgba(253,121,121,0.06); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(253,121,121,0.12); }
  .icon-btn.cyan:hover { border-color: rgba(76,215,246,0.5); color: var(--cyan); background: rgba(76,215,246,0.06); box-shadow: 0 6px 20px rgba(76,215,246,0.1); }

  /* Noise overlay */
  body::after {
    content:''; position:fixed; inset:0; pointer-events:none; z-index:9998;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.15;
  }

  .mob-menu {
    display: none; position: fixed; inset: 0;
    background: rgba(10,10,10,0.97); z-index: 700;
    flex-direction: column; align-items: center; justify-content: center;
    gap: 2rem; backdrop-filter: blur(20px);
  }
  .mob-menu.open { display: flex; }
  .mob-menu a { font-family: 'Inter', sans-serif; font-size: 1.8rem; font-weight: 700; color: var(--ink); text-decoration: none; }
  .mob-menu a:hover { color: var(--rose); }
`;

/* ─── SCROLL PROGRESS ─── */
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

/* ─── REVEAL HOOK ─── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); });
    }, { threshold: 0.1 });
    document.querySelectorAll(".rv").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── NAV ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [["about","About"],["experience","Exp"],["projects","Projects"],["skills","Skills"],["achievements","Awards"],["contact","Contact"]];
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

        {/* ── DESKTOP NAV — section links + GitHub / LinkedIn / Resume ── */}
        <nav className="hide-m" style={{ display:"flex", gap:"1.6rem", alignItems:"center" }}>
          {links.map(([id,label]) => <a key={id} href={`#${id}`} className="nav-link">{label}</a>)}

          {/* divider */}
          <span style={{ width:1, height:14, background:"var(--outline)", display:"inline-block" }} />

          {/* GitHub */}
          <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" className="nav-link" title="GitHub" style={{ display:"inline-flex", alignItems:"center", gap:"0.35rem" }}>
            <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            GitHub
          </a>

          {/* LinkedIn */}
          <a href="https://linkedin.com/in/aayushi-chhabra-54281a34a" target="_blank" rel="noreferrer" className="nav-link" title="LinkedIn" style={{ display:"inline-flex", alignItems:"center", gap:"0.35rem" }}>
            <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
            </svg>
            LinkedIn
          </a>

          {/* Resume */}
          <a
            href="/Aayushi_Chhabra_Resume.pdf"
            download="Aayushi_Chhabra_Resume.pdf"
            className="nav-link"
            title="Download Resume"
            style={{ display:"inline-flex", alignItems:"center", gap:"0.35rem", color:"var(--cyan)" }}
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="12" y1="18" x2="12" y2="12"/>
              <polyline points="9,15 12,18 15,15"/>
            </svg>
            Resume ↓
          </a>
        </nav>

        <div style={{ display:"flex", gap:"0.6rem", alignItems:"center" }}>
          <a href="mailto:aayushichhabra1010@gmail.com" className="btn-primary" style={{ padding:"0.5rem 1.1rem", fontSize:"0.7rem" }}>Hire Me</a>
          <button onClick={() => setMenu(o=>!o)} style={{ display:"none", background:"none", border:"none", cursor:"pointer", color:"var(--ink)", padding:"0.3rem" }} className="show-m">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      <div className={`mob-menu${menu?" open":""}`}>
        <button onClick={() => setMenu(false)} style={{ position:"absolute", top:"1.5rem", right:"1.5rem", background:"none", border:"1px solid var(--outline)", color:"var(--ink)", cursor:"pointer", padding:"0.4rem 0.7rem", borderRadius:"0.4rem" }}>✕</button>
        {links.map(([id,label]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}
        {/* Mobile social links */}
        <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" onClick={() => setMenu(false)}>GitHub</a>
        <a href="https://linkedin.com/in/aayushi-chhabra-54281a34a" target="_blank" rel="noreferrer" onClick={() => setMenu(false)}>LinkedIn</a>
        <a href="/Aayushi_Chhabra_Resume.pdf" download="Aayushi_Chhabra_Resume.pdf" onClick={() => setMenu(false)}>Resume ↓</a>
      </div>
    </>
  );
}

/* ─── HERO ─── */
function Hero() {
  const [typed, setTyped] = useState("");
  const words = ["Cybersecurity & AI Intern","ML Engineer","Android Developer","Deepfake Detection Researcher","Full Stack Developer","Productivity AI Builder"];
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
      {/* BG glows */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
        <div style={{ position:"absolute", top:"-15%", right:"5%", width:700, height:700, background:"radial-gradient(circle, rgba(253,121,121,0.07) 0%, transparent 65%)", borderRadius:"50%", animation:"spin 25s linear infinite" }} />
        <div style={{ position:"absolute", bottom:"5%", left:"-10%", width:550, height:550, background:"radial-gradient(circle, rgba(76,215,246,0.05) 0%, transparent 65%)", borderRadius:"50%" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(253,121,121,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(253,121,121,0.025) 1px,transparent 1px)", backgroundSize:"60px 60px", opacity:0.8 }} />
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:"3rem", alignItems:"start" }}>
          {/* LEFT */}
          <div>
            <div className="rv" style={{ display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"1.8rem", flexWrap:"wrap" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", padding:"0.3rem 0.9rem", background:"var(--rose-dim)", border:"1px solid rgba(253,121,121,0.3)", borderRadius:"9999px" }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"var(--rose)", boxShadow:"0 0 8px var(--rose)", animation:"pulse 2s infinite", display:"inline-block" }} />
                <span className="mono" style={{ fontSize:"0.68rem", color:"var(--rose)", letterSpacing:"0.1em" }}>OPEN TO WORK</span>
              </div>
              <span className="mono" style={{ fontSize:"0.68rem", color:"var(--ink3)", letterSpacing:"0.12em" }}>3RD YEAR CSE · MUJ · 2023–2027</span>
            </div>

            <div className="rv d1">
              <h1 style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(3rem,7vw,5.5rem)", fontWeight:800, lineHeight:1.05, letterSpacing:"-0.04em", marginBottom:"1rem" }}>
                Aayushi{" "}
                <span style={{ color:"var(--rose)", textShadow:"0 0 40px rgba(253,121,121,0.4)" }} className="glow-text">Chhabra</span>
              </h1>
            </div>

            <div className="rv d2" style={{ height:32, marginBottom:"1.4rem", display:"flex", alignItems:"center", gap:"0.4rem" }}>
              <span className="mono" style={{ fontSize:"0.95rem", color:"var(--cyan)" }}>{typed}</span>
              <span style={{ width:2, height:18, background:"var(--cyan)", animation:"blink 1s step-end infinite", display:"inline-block" }} />
            </div>

            <p className="rv d3" style={{ fontSize:"0.95rem", color:"var(--ink2)", lineHeight:1.85, maxWidth:560, marginBottom:"2.2rem" }}>
              Third-year B.Tech CSE at Manipal University Jaipur with a{" "}
              <span style={{ color:"var(--rose)", fontWeight:700 }}>9.88 CGPA</span>.
              Industry experience at <span style={{ color:"var(--rose)", fontWeight:700 }}>Ericsson</span> in Cybersecurity & AI.
              Finalist at <span style={{ color:"var(--rose)", fontWeight:700 }}>Deloitte Capstone Ideathon</span> (200+ teams).
              Dean's Excellence Award — 5 consecutive semesters.
            </p>

            <div className="rv d4" style={{ display:"flex", gap:"0.8rem", flexWrap:"wrap", marginBottom:"1.8rem" }}>
              <a href="mailto:aayushichhabra1010@gmail.com" className="btn-primary">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                Get In Touch
              </a>
              <a href="#projects" className="btn-outline-rose">View Projects →</a>
            </div>

            <div className="rv d5" style={{ display:"flex", gap:"0.6rem", flexWrap:"wrap" }}>
              <a href="/Aayushi_Chhabra_Resume.pdf" download="Aayushi_Chhabra_Resume.pdf" className="icon-btn" title="Download Resume">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="12" y1="18" x2="12" y2="12"/>
                  <polyline points="9,15 12,18 15,15"/>
                </svg>
                Resume
              </a>
              <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" className="icon-btn" title="GitHub Profile">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                GitHub ↗
              </a>
              <a href="https://leetcode.com/u/aayushichhabra" target="_blank" rel="noreferrer" className="icon-btn cyan" title="LeetCode Profile">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                </svg>
                LeetCode ↗
              </a>
              <a href="https://linkedin.com/in/aayushi-chhabra-54281a34a" target="_blank" rel="noreferrer" className="icon-btn" title="LinkedIn">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* RIGHT — terminal card */}
          <div className="rv d3 hide-m" style={{ width:320, flexShrink:0 }}>
            <div className="glass glass-active" style={{ padding:"1.6rem", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg, var(--rose), var(--cyan))" }} />
              <div className="label" style={{ color:"var(--rose)", marginBottom:"1.2rem", display:"flex", alignItems:"center", gap:"0.5rem" }}>
                <span>⬡</span> CURRENTLY BUILDING
              </div>
              {[
                { name:"ResQNet", desc:"Cross-platform crisis mgmt. w/ BLE & offline-first tech", tech:"React Native · Supabase", col:"var(--cyan)" },
                { name:"StyleVault", desc:"AI men's fashion — wardrobe mgmt & outfit suggestions", tech:"Kotlin · Firebase · Gemini", col:"var(--rose)" },
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

        {/* STATS BENTO ROW */}
        <div className="rv d6" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem", marginTop:"3.5rem" }}>
          {[
            { val:"9.88", sub:"CGPA", label:"Academic Excellence", col:"var(--rose)" },
            { val:"5×", sub:"Dean's Award", label:"Consecutive Semesters", col:"var(--cyan)" },
            { val:"6+", sub:"Projects Built", label:"End-to-End Systems", col:"var(--rose)" },
            { val:"Top 10", sub:"Deloitte Ideathon", label:"Out of 200+ Teams", col:"var(--cyan)" },
          ].map(({ val, sub, label, col }) => (
            <div key={sub} className="glass" style={{ padding:"1.4rem", textAlign:"center", borderRadius:"0.9rem" }}>
              <div className="label" style={{ color:col, marginBottom:"0.5rem", fontSize:"0.62rem" }}>{label}</div>
              <div className="stat-val" style={{ color:col, textShadow:`0 0 20px ${col}50`, marginBottom:"0.2rem" }}>{val}</div>
              <div className="mono" style={{ fontSize:"0.65rem", color:"var(--ink2)", letterSpacing:"0.08em" }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MARQUEE ─── */
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

/* ─── ABOUT ─── */
function About() {
  return (
    <section id="about" style={{ padding:"6rem 2.5rem", background:"var(--surface)", position:"relative", overflow:"hidden" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="rv sec-label">About Me</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem", alignItems:"start" }}>
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

/* ─── EXPERIENCE ─── */
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
    <section id="experience" style={{ padding:"6rem 2.5rem", background:"var(--bg)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="rv sec-label">Experience</div>
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
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"0.5rem", marginBottom:"1rem" }}>
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
                  {tags.map(t => <span key={t} className="chip-rose">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ─── */
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
    num:"06", name:"StyleVault",
    tagline:"AI-powered men's fashion app for wardrobe management & body-fit analysis",
    category:"Android · AI", col:"#a78bfa",
    tech:["Kotlin","Android Studio","Firebase","Gemini API","Camera API","Figma"],
    highlights:["AI outfit recommendations by wardrobe, weather & occasion","Digital closet: upload, categorize & plan outfits","Body measurement for fit-based AI styling suggestions"],
    link:"https://github.com/aayushichhabra",
  },
];

function ProjectCard({ p, i }) {
  const [hov, setHov] = useState(false);
  if (p.featured) {
    return (
      <div className="rv d1" style={{ gridColumn:"1/-1" }}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      >
        <div style={{
          background:"rgba(19,19,19,0.82)", backdropFilter:"blur(14px)",
          border:`1px solid ${hov ? p.col : "var(--outline)"}`,
          boxShadow: hov ? `0 0 40px ${p.col}18` : "none",
          borderRadius:"1.2rem", padding:"2.5rem",
          display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2.5rem", alignItems:"start",
          transition:"all 0.3s", position:"relative", overflow:"hidden"
        }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, ${p.col}, var(--cyan), transparent)` }} />
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"1rem", flexWrap:"wrap" }}>
              <span className="label" style={{ color:p.col, padding:"0.2rem 0.7rem", background:`${p.col}15`, border:`1px solid ${p.col}30`, borderRadius:"9999px" }}>#{p.num} · FEATURED</span>
              <span className="label" style={{ color:"var(--ink3)", fontSize:"0.6rem" }}>{p.category}</span>
            </div>
            <h3 style={{ fontFamily:"'Inter',sans-serif", fontSize:"1.6rem", fontWeight:800, marginBottom:"0.6rem", letterSpacing:"-0.02em", lineHeight:1.2 }}>{p.name}</h3>
            <p style={{ fontSize:"0.88rem", color:"var(--ink2)", lineHeight:1.75, marginBottom:"1.5rem" }}>{p.tagline}</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem", marginBottom:"1.5rem" }}>
              {p.tech.map(t => <span key={t} className="chip-rose">{t}</span>)}
            </div>
            <a href={p.link} target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize:"0.72rem", padding:"0.6rem 1.4rem" }}>View Live →</a>
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
    <div className={`rv d${(i%3)+1}`}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
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
      <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem" }}>
        {p.tech.map(t => <span key={t} className={p.col === "var(--cyan)" ? "chip-cyan" : "chip-rose"} style={{ borderColor:`${p.col}25`, color:p.col }}>{t}</span>)}
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding:"6rem 2.5rem", background:"var(--surface)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="rv sec-label">Projects</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"1rem", marginBottom:"3rem" }}>
          <h2 className="rv d1" style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:800, letterSpacing:"-0.02em" }}>
            Featured <span style={{ color:"var(--rose)" }}>Work</span>
          </h2>
          <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" className="btn-outline-rose" style={{ fontSize:"0.7rem" }}>View All on GitHub ↗</a>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(310px,1fr))", gap:"1.3rem" }}>
          {PROJECTS.map((p,i) => <ProjectCard key={p.num} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ─── */
const SKILL_GROUPS = [
  { label:"Programming & Dev", items:["Python","C","Java","JavaScript","OOP","DSA","Git"], col:"var(--rose)", icon:"⌨️" },
  { label:"AI & Machine Learning", items:["Supervised & Unsupervised ML","Transfer Learning","RAG","Computer Vision","LangChain","LangGraph","Whisper STT","PyTorch","TF Lite","OpenCV","Scikit-learn","Pandas"], col:"var(--cyan)", icon:"🧠" },
  { label:"Cybersecurity", items:["CVE Analysis","Vulnerability Assessment","Incident Response","Threat Detection","Anomaly Detection","FAISS Vector DBs"], col:"#a78bfa", icon:"🔐" },
  { label:"Mobile & Web Dev", items:["Android Studio","Kotlin","React Native","Expo","HTML","CSS","JavaScript","Streamlit","Figma"], col:"var(--rose)", icon:"📱" },
  { label:"Databases & Cloud", items:["SQL","Firebase","Supabase","MongoDB","FAISS / Vector DBs"], col:"var(--cyan)", icon:"☁️" },
  { label:"Tools & Platforms", items:["Gradio","Plotly","Google Gemini API","Google OAuth2","Hugging Face","VS Code","GitHub","Postman"], col:"#34d399", icon:"🛠️" },
];

const SKILL_BARS = [
  { name:"Machine Learning & AI Systems", pct:88, col:"var(--rose)" },
  { name:"Python / Full-stack Dev", pct:87, col:"var(--cyan)" },
  { name:"Cybersecurity & Threat Detection", pct:84, col:"#a78bfa" },
  { name:"React Native / Mobile Dev", pct:82, col:"var(--rose)" },
  { name:"Database Design & Cloud", pct:80, col:"var(--cyan)" },
  { name:"UI/UX & Frontend", pct:75, col:"#34d399" },
];

/* ─── FIX: key includes tab so bars remount (fresh IntersectionObserver) on each tab switch ─── */
function AnimBar({ name, pct, col }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
  ([e]) => {
    if (e.isIntersecting) setTimeout(() => setVis(true), 80);
  },
  { threshold: 0.3 }
);
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ marginBottom:"1.3rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.45rem" }}>
        <span className="mono" style={{ fontSize:"0.8rem" }}>{name}</span>
        <span className="mono" style={{ fontSize:"0.66rem", color:col }}>{pct}%</span>
      </div>
      <div className="prog-track">
        <div className="prog-fill" style={{ background:`linear-gradient(90deg, ${col}, ${col}88)`, width: vis ? `${pct}%` : "0%", boxShadow:`0 0 8px ${col}55` }} />
      </div>
    </div>
  );
}

function Skills() {
  const [tab, setTab] = useState("tags");
  useEffect(() => {
  const els = document.querySelectorAll(".rv");
  els.forEach(el => el.classList.add("on"));
}, [tab]);
  return (
    <section id="skills" style={{ padding:"6rem 2.5rem", background:"var(--bg)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="rv sec-label">Skills</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"1rem", marginBottom:"2.5rem" }}>
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

        {/* ── FIX: key="tags-grid" forces React to remount the grid when switching back ── */}
        {tab === "tags" && (
          <div key="tags-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.1rem" }}>
            {SKILL_GROUPS.map(({ label, items, col, icon }, i) => (
              <div key={label} className={`rv d${i+1} glass`} style={{ padding:"1.5rem", borderRadius:"1rem", position:"relative", overflow:"hidden" }}
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

        {/* ── FIX: key includes tab so each tab switch remounts AnimBars with fresh observers ── */}
        {tab === "bars" && (
          <div key="bars-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 4rem" }}>
            {SKILL_BARS.map(s => <AnimBar key={`${tab}-${s.name}`} {...s} />)}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── ACHIEVEMENTS ─── */
function Achievements() {
  const items = [
    { icon:"🏆", title:"Dean's Excellence Award", desc:"Maintained 9.88 CGPA across 5 consecutive semesters at MUJ.", col:"var(--rose)" },
    { icon:"🎯", title:"Deloitte Capstone Ideathon Finalist", desc:"Ranked Top 10 out of 200+ teams for innovative solution design.", col:"var(--cyan)" },
    { icon:"📡", title:"Promotional Head — Turing Sapiens", desc:"Led team executing campaigns for technical events and community engagement.", col:"#a78bfa" },
    { icon:"📝", title:"Research Paper (In Progress)", desc:"Authoring a review on power consumption & cooling optimization in data centers.", col:"var(--rose)" },
  ];
  return (
    <section id="achievements" style={{ padding:"6rem 2.5rem", background:"var(--surface)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="rv sec-label">Recognition</div>
        <h2 className="rv d1" style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:800, letterSpacing:"-0.02em", marginBottom:"3rem" }}>
          Milestones & <span style={{ color:"var(--rose)" }}>Awards</span>
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"1.2rem", marginBottom:"2.5rem" }}>
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

        <div className="rv d5" style={{ background:"rgba(253,121,121,0.04)", border:"1px solid rgba(253,121,121,0.12)", borderRadius:"1rem", padding:"2.2rem 3rem", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"2rem" }}>
          <div>
            <div className="label" style={{ color:"var(--ink3)", marginBottom:"0.4rem", fontSize:"0.62rem" }}>ACADEMIC STANDING</div>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"4rem", fontWeight:800, color:"var(--rose)", lineHeight:1, textShadow:"0 0 40px rgba(253,121,121,0.35)" }}>9.88</div>
            <div className="mono" style={{ fontSize:"0.68rem", color:"var(--ink3)", marginTop:"0.3rem" }}>CGPA · Manipal University Jaipur</div>
          </div>
          <div style={{ display:"flex", gap:"3rem", flexWrap:"wrap" }}>
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

/* ─── CONTACT ─── */
function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "aayushichhabra1010@gmail.com";
  return (
    <section id="contact" style={{ padding:"6rem 2.5rem", background:"var(--bg)", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:700, background:"radial-gradient(circle, rgba(253,121,121,0.05) 0%, transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />
      <div style={{ maxWidth:700, margin:"0 auto", textAlign:"center", position:"relative" }}>
        <div className="rv sec-label" style={{ justifyContent:"center" }}>Contact</div>
        <h2 className="rv d1" style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(2.2rem,5vw,3.5rem)", fontWeight:800, letterSpacing:"-0.03em", marginBottom:"1.2rem", lineHeight:1.1 }}>
          Let's <span style={{ color:"var(--rose)", textShadow:"0 0 30px rgba(253,121,121,0.3)" }}>Connect</span>
        </h2>
        <p className="rv d2" style={{ fontSize:"0.9rem", color:"var(--ink2)", lineHeight:1.85, marginBottom:"2.5rem" }}>
          Open to internship opportunities, research collaborations, and interesting projects in AI, cybersecurity, and full-stack development.
        </p>

        <div className="rv d3" style={{ display:"flex", alignItems:"center", gap:"0.8rem", justifyContent:"center", marginBottom:"2rem", flexWrap:"wrap" }}>
          <span className="mono" style={{ fontSize:"0.85rem", color:"var(--rose)", letterSpacing:"0.03em" }}>{email}</span>
          <button onClick={() => { navigator.clipboard.writeText(email); setCopied(true); setTimeout(()=>setCopied(false),2000); }}
            style={{ background: copied ? "rgba(52,211,153,0.1)" : "var(--rose-dim)", border:`1px solid ${copied ? "rgba(52,211,153,0.3)" : "rgba(253,121,121,0.3)"}`, borderRadius:"9999px", padding:"0.35rem 0.9rem", cursor:"pointer", color: copied ? "#34d399" : "var(--rose)", fontSize:"0.66rem", fontFamily:"'JetBrains Mono',monospace", transition:"all 0.2s" }}>
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>

        <div className="rv d4" style={{ display:"flex", justifyContent:"center", gap:"0.6rem", flexWrap:"wrap", marginBottom:"2.5rem" }}>
          {[
            { label:"LinkedIn", url:"https://linkedin.com/in/aayushi-chhabra-54281a34a", icon:<svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
            { label:"GitHub", url:"https://github.com/aayushichhabra", icon:<svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg> },
            { label:"LeetCode", url:"https://leetcode.com/u/aayushichhabra", icon:<svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg> },
            { label:"SecOps Live", url:"https://intelligent-secops-rag-dashboard.streamlit.app", icon:<svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
          ].map(({ label, url, icon }) => (
            <a key={label} href={url} target="_blank" rel="noreferrer" className="icon-btn">{icon}{label}</a>
          ))}
        </div>

        <div className="rv d5" style={{ display:"flex", gap:"0.8rem", justifyContent:"center", flexWrap:"wrap" }}>
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

/* ─── FOOTER ─── */
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

/* ─── APP ─── */
export default function App() {
  useReveal();
  return (
    <>
      <style>{G}</style>
      <ScrollProg />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}