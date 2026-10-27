import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────
   DESIGN SYSTEM — neo-brutalist maximalism
   paper base, ink borders + hard offset shadows, flat accent
   fills (no gradients, no blur, no soft glow). Boldness spent
   in one place: the terminal window is the signature piece.
   ───────────────────────────────────────────────────────── */

const ACCENTS = {
  ink:   "#121214",
  paper: "#FFFFFF",
  blue:  "#2E4DFF",
  rose:  "#FF3B5C",
  violet:"#7B5CFF",
  sun:   "#FFC53D",
  mint:  "#00C2A8",
};

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&display=swap');

  :root {
    --ink:        #121214;
    --ink-soft:   #55565f;
    --paper:      #FFFFFF;
    --paper-2:    #EEF1F7;
    --blue:       #2E4DFF;
    --blue-tint:  #E1E6FF;
    --rose:       #FF3B5C;
    --rose-tint:  #FFE0E5;
    --violet:     #7B5CFF;
    --violet-tint:#EAE3FF;
    --sun:        #FFC53D;
    --sun-tint:   #FFF2D2;
    --mint:       #00C2A8;
    --mint-tint:  #D7F5F0;

    --shadow-sm: 4px 4px 0 var(--ink);
    --shadow-md: 7px 7px 0 var(--ink);
    --shadow-lg: 11px 11px 0 var(--ink);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--paper);
    font-family: 'Inter', sans-serif;
    color: var(--ink);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  ::selection { background: var(--sun); color: var(--ink); }
  ::-webkit-scrollbar { width: 10px; }
  ::-webkit-scrollbar-track { background: var(--paper-2); }
  ::-webkit-scrollbar-thumb { background: var(--ink); border: 2px solid var(--paper-2); }

  .mono { font-family: 'JetBrains Mono', monospace; }
  .grotesk { font-family: 'Space Grotesk', sans-serif; }

  a { color: inherit; }

  @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes marquee   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes fadeUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes wiggle    { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(-1deg)} }

  .rv { opacity:0; transform:translateY(16px); transition: opacity 0.55s ease, transform 0.55s ease; }
  .rv.on { opacity:1; transform:translateY(0); }
  .d1{transition-delay:.06s} .d2{transition-delay:.12s} .d3{transition-delay:.18s}
  .d4{transition-delay:.24s} .d5{transition-delay:.3s}  .d6{transition-delay:.36s}

  /* ─── Core brutalist primitives ─── */
  .brut-card {
    background: var(--paper);
    border: 3px solid var(--ink);
    border-radius: 16px;
    box-shadow: var(--shadow-md);
    transition: transform .16s ease, box-shadow .16s ease;
    position: relative;
  }
  .brut-card.hoverable:hover {
    transform: translate(4px,4px);
    box-shadow: var(--shadow-sm);
  }

  .brut-btn {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.85rem 1.7rem; border-radius: 10px;
    font-family: 'Space Grotesk', sans-serif; font-size: 0.78rem;
    font-weight: 700; letter-spacing: 0.03em;
    border: 3px solid var(--ink); cursor: pointer;
    text-decoration: none; box-shadow: var(--shadow-md);
    transition: transform .14s ease, box-shadow .14s ease;
  }
  .brut-btn:hover { transform: translate(4px,4px); box-shadow: var(--shadow-sm); }
  .brut-btn:active { transform: translate(7px,7px); box-shadow: 0 0 0 var(--ink); }
  .brut-btn-ink   { background: var(--ink); color: var(--paper); }
  .brut-btn-paper { background: var(--paper); color: var(--ink); }
  .brut-btn-sun   { background: var(--sun); color: var(--ink); }

  .brut-icon-btn {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.55rem 1rem; border-radius: 9px;
    font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; font-weight: 600;
    text-decoration: none; border: 2.5px solid var(--ink);
    background: var(--paper); color: var(--ink);
    box-shadow: 4px 4px 0 var(--ink);
    transition: transform .14s ease, box-shadow .14s ease;
  }
  .brut-icon-btn:hover { transform: translate(3px,3px); box-shadow: 1px 1px 0 var(--ink); }

  .chip {
    display: inline-flex; align-items: center;
    font-family: 'JetBrains Mono', monospace; font-weight: 700;
    font-size: 0.68rem; padding: 0.28rem 0.7rem; border-radius: 7px;
    border: 2px solid var(--ink); letter-spacing: 0.02em;
    box-shadow: 3px 3px 0 var(--ink);
  }

  .sticker {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-family: 'JetBrains Mono', monospace; font-weight: 700;
    font-size: 0.68rem; padding: 0.35rem 0.85rem; border-radius: 999px;
    border: 2.5px solid var(--ink); letter-spacing: 0.06em; text-transform: uppercase;
    box-shadow: 3px 3px 0 var(--ink);
    transform: rotate(-2.5deg);
  }

  .eyebrow {
    display: inline-flex; align-items: center; gap: .45rem;
    font-family: 'JetBrains Mono', monospace; font-size: 0.68rem;
    font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    background: var(--ink); color: var(--paper);
    padding: 0.35rem 0.8rem; border-radius: 7px;
    transform: rotate(-1.2deg);
    margin-bottom: 1.3rem;
  }

  .mark-blue   { background: var(--blue-tint);  padding: 0.05em 0.3em; border-radius: 4px; font-weight: 700; color: var(--ink); }
  .mark-rose   { background: var(--rose-tint);  padding: 0.05em 0.3em; border-radius: 4px; font-weight: 700; color: var(--ink); }
  .mark-violet { background: var(--violet-tint);padding: 0.05em 0.3em; border-radius: 4px; font-weight: 700; color: var(--ink); }
  .mark-sun    { background: var(--sun-tint);   padding: 0.05em 0.3em; border-radius: 4px; font-weight: 700; color: var(--ink); }

  .poster-text {
    text-shadow: 6px 6px 0 var(--rose);
  }

  .scroll-bar {
    position: fixed; top: 0; left: 0; height: 5px; z-index: 9999;
    background: linear-gradient(90deg, var(--blue), var(--violet));
    border-bottom: 2px solid var(--ink);
    transition: width 0.05s linear;
  }

  .nav-link {
    font-family: 'JetBrains Mono', monospace; font-size: 0.76rem; font-weight: 600;
    color: var(--ink); text-decoration: none; padding-bottom: 3px;
    border-bottom: 2.5px solid transparent; transition: border-color 0.15s;
  }
  .nav-link:hover, .nav-link.active { border-color: var(--blue); }

  .label {
    font-family: 'Space Grotesk', sans-serif; font-size: 0.72rem;
    font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  }

  /* ─── Terminal window — the signature element ─── */
  .term-window {
    border: 3px solid var(--ink);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    background: #0D0D12;
  }
  .term-titlebar {
    background: #1B1B22;
    border-bottom: 2px solid #2C2C36;
    padding: 0.7rem 1rem;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .term-dots { display: flex; gap: 7px; flex-shrink: 0; }
  .term-dot { width: 12px; height: 12px; border-radius: 50%; }
  .term-dot.red    { background: #FF5F57; }
  .term-dot.yellow { background: #FEBC2E; }
  .term-dot.green  { background: #28C840; }
  .term-title {
    flex: 1; text-align: center;
    font-family: 'JetBrains Mono', monospace; font-size: 0.7rem;
    color: #86868f; letter-spacing: 0.02em;
  }
  .term-spacer { width: 47px; flex-shrink: 0; }
  .term-body {
    padding: 1.5rem 1.6rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.82rem;
    line-height: 1.95;
    color: #E8E6E3;
  }
  .term-row { margin-bottom: 1.05rem; }
  .term-row:last-child { margin-bottom: 0; }
  .term-user { color: #3DDC84; font-weight: 700; }
  .term-path { color: #5CC8FF; }
  .term-sym  { color: #6E6E78; margin: 0 0.4em; }
  .term-cmd  { color: #FFFFFF; }
  .term-out  { color: #ADAAB8; display: block; margin-top: 0.35rem; padding-left: 0.1rem; }
  .term-ok   { color: #3DDC84; }
  .term-warn { color: #FFC53D; }
  .term-cursor {
    display: inline-block; width: 7px; height: 15px;
    background: #3DDC84; margin-left: 4px; vertical-align: -2px;
    animation: blink 1s step-end infinite;
  }

  .marquee-bar {
    background: var(--ink); border-top: 3px solid var(--ink); border-bottom: 3px solid var(--ink);
    padding: 0.9rem 0; overflow: hidden; white-space: nowrap;
  }
  .marquee-inner { display: inline-flex; gap: 2.4rem; animation: marquee 34s linear infinite; }

  .sec-pad { padding: 6.5rem 4rem; }

  .progress-sidebar {
    position: fixed; right: 1.6rem; top: 50%; transform: translateY(-50%);
    display: flex; flex-direction: column; gap: 0.65rem; z-index: 800;
  }
  .prog-dot {
    width: 9px; height: 9px; background: var(--paper);
    border: 2px solid var(--ink); cursor: pointer; transition: all 0.2s;
  }
  .prog-dot.active { background: var(--blue); transform: scale(1.3); }

  .mob-menu {
    display: none; position: fixed; inset: 0;
    background: var(--ink); z-index: 700;
    flex-direction: column; align-items: center; justify-content: center;
    gap: 2rem;
  }
  .mob-menu.open { display: flex; }
  .mob-menu a { font-family: 'Space Grotesk', sans-serif; font-size: 1.8rem; font-weight: 700; color: var(--paper); text-decoration: none; }
  .mob-menu a:hover { color: var(--sun); }

  .skillbar-track {
    height: 15px; background: var(--paper); border: 2.5px solid var(--ink);
    border-radius: 5px; overflow: hidden;
  }
  .skillbar-fill {
    height: 100%; border-right: 2.5px solid var(--ink);
  }

  /* ─── Responsive ─── */
  @media (max-width: 768px) {
    .hide-m { display: none !important; }
    .show-m { display: inline-flex !important; }
    .sec-pad { padding: 3.5rem 1.25rem !important; }
    .hero-layout { grid-template-columns: 1fr !important; gap: 2.2rem !important; }
    .about-grid { grid-template-columns: 1fr !important; gap: 1.2rem !important; }
    .projects-grid { grid-template-columns: 1fr !important; gap: 1.2rem !important; }
    .skills-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
    .bars-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
    .achievements-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
    .progress-sidebar { display: none !important; }
    header { padding: 0.9rem 1.25rem !important; }
    .vault-stats-container { flex-direction: row !important; width: 100% !important; justify-content: space-between !important; gap: 0.5rem !important; }
    .vault-highlight-grid { grid-template-columns: 1fr !important; }
    .vaultbot-header { padding: 1.5rem 1.25rem !important; }
    .vaultbot-body { padding: 1.5rem 1.25rem !important; }
    .cgpa-banner { padding: 1.5rem 1.25rem !important; flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 1.5rem !important; }
    .cgpa-stats { justify-content: center !important; gap: 1.5rem !important; width: 100% !important; }
    #contact { padding: 3.5rem 1.25rem !important; }
    .contact-email-text { font-size: 0.75rem !important; word-break: break-all !important; text-align: center !important; }
    footer { flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 1rem !important; padding: 2rem 1.25rem !important; }
  }
`;

/* ─── Terminal window component ─── */
function TermLine({ user = "aayushi", path = "~/portfolio", cmd, children }) {
  return (
    <div className="term-row">
      <div>
        <span className="term-user">{user}</span>
        <span className="term-sym">@</span>
        <span className="term-path">{path}</span>
        <span className="term-sym">$</span>{" "}
        <span className="term-cmd">{cmd}</span>
      </div>
      {children && <span className="term-out">{children}</span>}
    </div>
  );
}

function TerminalWindow({ title, children }) {
  return (
    <div className="term-window">
      <div className="term-titlebar">
        <div className="term-dots">
          <span className="term-dot red" />
          <span className="term-dot yellow" />
          <span className="term-dot green" />
        </div>
        <span className="term-title">{title}</span>
        <span className="term-spacer" />
      </div>
      <div className="term-body">{children}</div>
    </div>
  );
}

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
  return <div className="scroll-bar" style={{ width: w }} />;
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

function Nav() {
  const [menu, setMenu] = useState(false);
  const links = [["about","About"],["experience","Exp"],["vaultbot","Projects"],["skills","Skills"],["achievements","Awards"],["contact","Contact"]];
  return (
    <>
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:600,
        padding:"1rem 2.5rem",
        background: "var(--paper)",
        borderBottom: "3px solid var(--ink)",
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        <a href="#hero" style={{ textDecoration:"none" }}>
          <span className="grotesk" style={{ fontWeight:800, fontSize:"0.95rem", letterSpacing:"0.02em", color:"var(--ink)" }}>AAYUSHI_CHHABRA</span>
        </a>
        <nav className="hide-m nav-links" style={{ display:"flex", gap:"1.7rem", alignItems:"center" }}>
          {links.map(([id,label]) => <a key={id} href={`#${id}`} className="nav-link">{label}</a>)}
          <span style={{ width:2, height:16, background:"var(--ink)", display:"inline-block" }} />
          <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" className="nav-link" style={{ display:"inline-flex", alignItems:"center", gap:"0.35rem" }}>
            <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            GitHub
          </a>
          <a href="https://linkedin.com/in/aayushi-chhabra-54281a34a" target="_blank" rel="noreferrer" className="nav-link" style={{ display:"inline-flex", alignItems:"center", gap:"0.35rem" }}>
            <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </a>
          <a href="/Aayushi_Chhabra_Resume.pdf" download="Aayushi_Chhabra_Resume.pdf" className="nav-link" style={{ display:"inline-flex", alignItems:"center", gap:"0.35rem", color:"var(--blue)" }}>
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9,15 12,18 15,15"/></svg>
            Resume ↓
          </a>
        </nav>
        <div style={{ display:"flex", gap:"0.6rem", alignItems:"center" }}>
          <a href="mailto:aayushichhabra1010@gmail.com" className="brut-btn brut-btn-ink" style={{ padding:"0.55rem 1.2rem", fontSize:"0.7rem" }}>Hire Me</a>
          <button onClick={() => setMenu(o=>!o)} style={{ display:"none", background:"var(--paper)", border:"2.5px solid var(--ink)", cursor:"pointer", color:"var(--ink)", padding:"0.4rem 0.6rem", borderRadius:"8px", boxShadow:"3px 3px 0 var(--ink)" }} className="mob-hamburger show-m">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </header>
      <div className={`mob-menu${menu?" open":""}`}>
        <button onClick={() => setMenu(false)} style={{ position:"absolute", top:"1.5rem", right:"1.5rem", background:"var(--paper)", border:"2.5px solid var(--paper)", color:"var(--ink)", cursor:"pointer", padding:"0.4rem 0.7rem", borderRadius:"8px", fontWeight:700 }}>✕</button>
        {links.map(([id,label]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}
        <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" onClick={() => setMenu(false)}>GitHub</a>
        <a href="https://linkedin.com/in/aayushi-chhabra-54281a34a" target="_blank" rel="noreferrer" onClick={() => setMenu(false)}>LinkedIn</a>
        <a href="/Aayushi_Chhabra_Resume.pdf" download="Aayushi_Chhabra_Resume.pdf" onClick={() => setMenu(false)}>Resume ↓</a>
      </div>
    </>
  );
}

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
    <section id="hero" style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"8rem 2.5rem 4rem", position:"relative", overflow:"hidden" }}>
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none", opacity:0.6,
        backgroundImage:"linear-gradient(var(--paper-2) 1.5px,transparent 1.5px),linear-gradient(90deg,var(--paper-2) 1.5px,transparent 1.5px)",
        backgroundSize:"48px 48px",
      }} />

      <div style={{ maxWidth:1200, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
        <div className="hero-layout" style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:"3.2rem", alignItems:"start" }}>
          <div>
            <div className="rv" style={{ display:"flex", alignItems:"center", gap:"0.9rem", marginBottom:"2rem", flexWrap:"wrap" }}>
              <div className="sticker" style={{ background:"var(--sun)", animation:"wiggle 3.4s ease-in-out infinite" }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"var(--ink)", display:"inline-block" }} />
                OPEN TO WORK
              </div>
              <span className="mono" style={{ fontSize:"0.68rem", color:"var(--ink-soft)", letterSpacing:"0.1em", fontWeight:600 }}>3RD YEAR CSE · MUJ · 2023–2027</span>
              <a href="#vaultbot" className="chip" style={{ background:"var(--violet-tint)", color:"var(--ink)" }}>⚡ Co-Founder & Core Contributor, VaultBot</a>
            </div>

            <div className="rv d1">
              <h1 className="grotesk" style={{ fontSize:"clamp(3rem,7vw,5.5rem)", fontWeight:800, lineHeight:1.02, letterSpacing:"-0.03em", marginBottom:"1.2rem" }}>
                <span className="poster-text">Aayushi</span><br />
                <span style={{ color:"var(--blue)" }} className="poster-text">Chhabra</span>
              </h1>
            </div>

            <p className="rv d3" style={{ fontSize:"1rem", color:"var(--ink)", lineHeight:2, maxWidth:580, marginBottom:"2.3rem" }}>
              Third-year B.Tech CSE at Manipal University Jaipur with a{" "}
              <span className="mark-rose">9.88 CGPA</span>. Industry experience at{" "}
              <span className="mark-blue">Ericsson</span> in Cybersecurity &amp; AI. Finalist at the{" "}
              <span className="mark-violet">Deloitte Capstone Ideathon</span> (200+ teams).{" "}
              <span className="mark-sun">Dean's Excellence Award</span> — 5 consecutive semesters.
            </p>

            <div className="rv d4 hero-btns" style={{ display:"flex", gap:"0.9rem", flexWrap:"wrap", marginBottom:"1.9rem" }}>
              <a href="mailto:aayushichhabra1010@gmail.com" className="brut-btn brut-btn-ink">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                Get In Touch
              </a>
              <a href="#vaultbot" className="brut-btn brut-btn-paper">View Projects →</a>
            </div>

            <div className="rv d5" style={{ display:"flex", gap:"0.7rem", flexWrap:"wrap" }}>
              <a href="/Aayushi_Chhabra_Resume.pdf" download="Aayushi_Chhabra_Resume.pdf" className="brut-icon-btn">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9,15 12,18 15,15"/></svg>
                Resume
              </a>
              <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" className="brut-icon-btn">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub ↗
              </a>
              <a href="https://leetcode.com/u/aayushichhabra" target="_blank" rel="noreferrer" className="brut-icon-btn">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>
                LeetCode ↗
              </a>
              <a href="https://linkedin.com/in/aayushi-chhabra-54281a34a" target="_blank" rel="noreferrer" className="brut-icon-btn">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn ↗
              </a>
            </div>

            <div className="rv d5 hero-stats" style={{ display: "flex", gap: "0.9rem", marginTop: "2.6rem", flexWrap: "wrap" }}>
              {[["9.88", "CGPA", "sun"], ["5×", "Dean's Award", "blue"], ["6+", "Projects Built", "rose"], ["Top 10", "Deloitte Ideathon", "violet"]].map(([n, l, c]) => (
                <div key={l} className="brut-card" style={{ padding:"0.85rem 1.1rem", background:`var(--${c}-tint)`, boxShadow:"4px 4px 0 var(--ink)", borderRadius:"10px" }}>
                  <div className="grotesk" style={{ fontSize: "1.5rem", fontWeight: 800, lineHeight:1 }}>{n}</div>
                  <div className="mono" style={{ fontSize: "0.6rem", letterSpacing: "0.08em", color: "var(--ink-soft)", marginTop: "0.25rem", fontWeight:600, textTransform:"uppercase" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rv d3 hero-right-card" style={{ width:340, flexShrink:0 }}>
            <TerminalWindow title="aayushi@portfolio — zsh">
              <TermLine cmd="whoami">Aayushi Chhabra — builder @ the intersection of AI &amp; Security</TermLine>
              <TermLine cmd="role --live">
                <span className="term-cmd">{typed}</span><span className="term-cursor" />
              </TermLine>
              <TermLine cmd="ls currently-building/">
                <span className="term-warn">ResQNet/</span> <span className="term-warn">VaultBot/</span> <span className="term-warn">CVE-Agent/</span>
              </TermLine>
              <TermLine cmd="cat status.txt">
                <span className="term-ok">✓ available for internships</span>
              </TermLine>
              <TermLine cmd="whereami">
                Gurugram, Haryana, IN <span className="term-cursor" />
              </TermLine>
            </TerminalWindow>
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
    <div className="marquee-bar">
      <div className="marquee-inner">
        {all.map((t,i) => (
          <span key={i} className="mono" style={{ fontSize:"0.76rem", fontWeight:700, letterSpacing:"0.06em", color:"var(--paper)", whiteSpace:"nowrap", textTransform:"uppercase" }}>
            <span style={{ color:"var(--sun)", marginRight:"0.8rem" }}>✦</span>{t}
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="sec-pad" style={{ background:"var(--paper)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.6rem", alignItems:"start" }}>
          <div className="rv d1 brut-card" style={{ padding:"2.1rem" }}>
            <div className="eyebrow">⬡ About_me.sh</div>
            <h2 className="grotesk" style={{ fontSize:"1.8rem", fontWeight:800, letterSpacing:"-0.02em", lineHeight:1.25, marginBottom:"1.3rem" }}>
              Building at the intersection of<br /><span style={{ color:"var(--blue)" }}>AI &amp; Security</span>
            </h2>
            <p style={{ fontSize:"0.9rem", color:"var(--ink)", lineHeight:1.95, marginBottom:"1rem" }}>
              I'm Aayushi — a Computer Science student at Manipal University Jaipur, maintaining a{" "}
              <span className="mark-rose">9.88 CGPA</span> across 5 semesters. My work spans AI systems, cybersecurity, and full-stack mobile development.
            </p>
            <p style={{ fontSize:"0.9rem", color:"var(--ink)", lineHeight:1.95, marginBottom:"1.6rem" }}>
              At Ericsson, I worked on CVE triage, anomaly detection models, and automated incident response pipelines in a production SecOps environment. From agentic CVE triage tools built with LangGraph, to AI productivity assistants with Gmail integration and Whisper transcription.
            </p>
            <div style={{ display:"flex", gap:"0.7rem", flexWrap:"wrap" }}>
              <a href="mailto:aayushichhabra1010@gmail.com" className="brut-icon-btn">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                Email
              </a>
              <a href="https://linkedin.com/in/aayushi-chhabra-54281a34a" target="_blank" rel="noreferrer" className="brut-icon-btn">
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
              <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" className="brut-icon-btn">
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub
              </a>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateRows:"auto auto", gap:"1.6rem" }}>
            <div className="rv d2 brut-card" style={{ padding:"1.9rem", background:"var(--blue-tint)" }}>
              <div className="eyebrow">📚 Education</div>
              {[
                { school:"Manipal University Jaipur", degree:"B.Tech — Computer Science & Engineering", detail:"CGPA: 9.88  ·  2023–2027", highlight:true },
                { school:"Manav Rachna International School", degree:"Class X: 95%  ·  Class XII: 96%", detail:"2021–2023 · Gurugram, Haryana", highlight:false },
              ].map(({ school, degree, detail, highlight }) => (
                <div key={school} style={{ marginBottom:"0.9rem", paddingBottom:"0.9rem", borderBottom:"2px dashed var(--ink)" }}>
                  <div style={{ fontWeight:700, fontSize:"0.9rem", marginBottom:"0.2rem", color: "var(--ink)" }}>{school}</div>
                  <div style={{ fontSize:"0.79rem", color:"var(--ink-soft)", marginBottom:"0.2rem" }}>{degree}</div>
                  <div className="mono" style={{ fontSize:"0.64rem", fontWeight:700, color: highlight ? "var(--blue)" : "var(--ink-soft)" }}>{detail}</div>
                </div>
              ))}
            </div>
            <div className="rv d3 brut-card" style={{ padding:"1.9rem", background:"var(--sun-tint)" }}>
              <div className="eyebrow">📜 Certifications</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.55rem" }}>
                {[
                  { org:"NPTEL", items:"Programming, DSA using Python · Design & Analysis of Algorithms" },
                  { org:"Oracle Academy", items:"DB Foundations · DB Programming with SQL · DB Design" },
                  { org:"Red Hat", items:"System Administration I (RH124)" },
                  { org:"Coursera", items:"AWS: Storage" },
                ].map(({ org, items }) => (
                  <div key={org} style={{ display:"flex", gap:"0.7rem" }}>
                    <span className="mono" style={{ fontSize:"0.65rem", color:"var(--ink)", minWidth:90, fontWeight:700, paddingTop:"0.1rem" }}>{org}</span>
                    <span style={{ fontSize:"0.78rem", color:"var(--ink-soft)", lineHeight:1.6 }}>{items}</span>
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
  { n:"01", year: "2023", title: "Started B.Tech at MUJ", desc: "Began Computer Science & Engineering at Manipal University Jaipur. Set the academic foundation with a strong first semester.", icon: "🎓", tint: "var(--rose-tint)" },
  { n:"02", year: "2023", title: "Dean's Excellence Award — Sem 1", desc: "Achieved 9.88 CGPA in the very first semester, earning the first Dean's Excellence Award.", icon: "🏆", tint: "var(--blue-tint)" },
  { n:"03", year: "2024", title: "Oracle & NPTEL Certifications", desc: "Completed certifications in Database Foundations, SQL Programming, DSA with Python, and Design & Analysis of Algorithms.", icon: "📜", tint: "var(--violet-tint)" },
  { n:"04", year: "2024", title: "5× Dean's Award Streak", desc: "Maintained 9.88 CGPA for 5 consecutive semesters — a testament to unwavering academic dedication.", icon: "⭐", tint: "var(--sun-tint)" },
  { n:"05", year: "2025", title: "Prodigy InfoTech — Android Intern", desc: "Built mobile app features using Android Studio and SQLite. First hands-on industry engineering experience.", icon: "📱", tint: "var(--rose-tint)" },
  { n:"06", year: "2025", title: "Cognifyz Technologies — UI/UX Intern", desc: "Contributed to dashboard design improvements in Figma, enhancing usability across product interfaces.", icon: "🎨", tint: "var(--blue-tint)" },
  { n:"07", year: "2025", title: "Ericsson R&D — Cybersecurity & AI Intern", desc: "Worked on CVE triage, anomaly detection models, and automated incident response pipelines in a production SecOps environment.", icon: "🔐", tint: "var(--violet-tint)" },
  { n:"08", year: "2025", title: "Deloitte Capstone Ideathon — Top 10", desc: "Competed against 200+ teams and secured a Top 10 finish for innovative solution design and problem-solving.", icon: "🎯", tint: "var(--sun-tint)" },
  { n:"09", year: "2025", title: "Building ResQNet & DeepFake Detection", desc: "Developing a cross-platform crisis management app and an AI-powered deepfake detection system with Grad-CAM explainability.", icon: "🚀", tint: "var(--rose-tint)" },
];

function Timeline() {
  const isMobile = useIsMobile();
  return (
    <section id="timeline" className="sec-pad" style={{ background: "var(--paper-2)", position: "relative" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="eyebrow rv d1">// Build Log</div>
        <h2 className="rv d1 grotesk" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, marginBottom: "3.5rem" }}>
          My <span style={{ color:"var(--rose)" }} className="poster-text">Timeline</span>
        </h2>

        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", left: isMobile ? 16 : "50%", top: 0, bottom: 0, width: 3,
            background: "var(--ink)", transform: isMobile ? "none" : "translateX(-50%)",
          }} />

          {TIMELINE_DATA.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                className={`rv d${Math.min(i % 3 + 1, 5)}`}
                style={{
                  display: "flex",
                  justifyContent: isMobile ? "flex-start" : (isLeft ? "flex-end" : "flex-start"),
                  position: "relative",
                  marginBottom: "2.2rem",
                  paddingRight: isMobile ? 0 : (isLeft ? "calc(50% + 26px)" : "0"),
                  paddingLeft: isMobile ? "44px" : (isLeft ? "0" : "calc(50% + 26px)"),
                }}
              >
                <div style={{
                  position: "absolute", left: isMobile ? 9 : "50%", top: 18,
                  width: 14, height: 14, background: "var(--paper)",
                  border: "3px solid var(--ink)",
                  transform: isMobile ? "none" : "translateX(-50%) rotate(45deg)",
                  zIndex: 2,
                }} />

                <div className="brut-card hoverable" style={{ padding: "1.4rem 1.6rem", width: "100%", background: item.tint }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.9rem" }}>
                    <span className="grotesk" style={{ fontSize:"1.6rem", fontWeight:800, color:"var(--ink)", opacity:0.35, lineHeight:1 }}>{item.n}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
                        <span style={{ fontSize: "1.25rem" }}>{item.icon}</span>
                        <span className="mono" style={{ fontSize: "0.62rem", fontWeight:700, letterSpacing: "0.12em", color: "var(--ink-soft)", textTransform: "uppercase" }}>{item.year}</span>
                      </div>
                      <h3 className="grotesk" style={{ fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.3, marginBottom:"0.5rem" }}>{item.title}</h3>
                      <p style={{ fontSize: "0.8rem", color: "var(--ink-soft)", lineHeight: 1.75 }}>{item.desc}</p>
                    </div>
                  </div>
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
      period:"Jun 2025 – Jul 2025", tint:"var(--rose-tint)",
      bullets:["Worked on Cybersecurity & AI projects including vulnerability analysis, CVE triage, and threat detection.","Developed anomaly detection models for a production-grade SecOps environment.","Contributed to automated incident response pipelines."],
      tags:["Cybersecurity","AI/ML","CVE Triage","Anomaly Detection"]
    },
    {
      role:"UI/UX Design Intern", company:"Cognifyz Technologies", loc:"Remote",
      period:"Mar 2025", tint:"var(--blue-tint)",
      bullets:["Contributed to dashboard design improvements using Figma and front-end tooling.","Enhanced usability and visual consistency across product interfaces."],
      tags:["Figma","UI/UX","Dashboard Design"]
    },
    {
      role:"Android App Development Intern", company:"Prodigy InfoTech", loc:"Remote",
      period:"Feb 2025", tint:"var(--violet-tint)",
      bullets:["Developed and tested mobile app features using Android Studio and SQLite.","Implemented data persistence and UI components for a production Android application."],
      tags:["Android Studio","SQLite","Java","Mobile Dev"]
    }
  ];

  return (
    <section id="experience" className="sec-pad" style={{ background:"var(--paper)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="eyebrow rv d1">// Work History</div>
        <h2 className="rv d1 grotesk" style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:800, letterSpacing:"-0.02em", marginBottom:"2.8rem" }}>
          Work <span style={{ color:"var(--violet)" }} className="poster-text">History</span>
        </h2>
        <div style={{ display:"flex", flexDirection:"column", gap:"1.4rem" }}>
          {EXP.map(({ role, company, loc, period, tint, bullets, tags }, i) => (
            <div key={company} className={`rv d${i+1} brut-card hoverable`} style={{ padding:"1.9rem", background: tint }}>
              <div className="exp-header" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"0.6rem", marginBottom:"1.1rem" }}>
                <div>
                  <div className="grotesk" style={{ fontWeight:700, fontSize:"1.05rem", marginBottom:"0.25rem" }}>{role}</div>
                  <div style={{ fontSize:"0.85rem", fontWeight:700 }}>{company} · {loc}</div>
                </div>
                <span className="chip" style={{ background:"var(--paper)" }}>{period}</span>
              </div>
              <ul style={{ listStyle:"none", marginBottom:"1.1rem", display:"flex", flexDirection:"column", gap:"0.45rem" }}>
                {bullets.map((b,j) => (
                  <li key={j} style={{ fontSize:"0.83rem", color:"var(--ink)", lineHeight:1.7, display:"flex", gap:"0.55rem" }}>
                    <span style={{ flexShrink:0, fontWeight:800 }}>→</span>{b}
                  </li>
                ))}
              </ul>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.45rem" }}>
                {tags.map(t => <span key={t} className="chip" style={{ background:"var(--paper)" }}>{t}</span>)}
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
  { label: "Python", icon: "🐍" }, { label: "FastAPI", icon: "⚡" }, { label: "Discord.py", icon: "💬" },
  { label: "LangChain", icon: "🔗" }, { label: "FAISS", icon: "🗂" }, { label: "Groq / Llama 3.3", icon: "🧠" },
  { label: "Tavily Search", icon: "🔍" }, { label: "Exa AI", icon: "🌐" }, { label: "HuggingFace", icon: "🤗" },
  { label: "Redis", icon: "🔴" }, { label: "BullMQ Worker", icon: "⚙️" }, { label: "Supabase Postgres", icon: "🐘" },
  { label: "SQLAlchemy", icon: "🗃" }, { label: "React + Vite", icon: "⚛️" }, { label: "Recharts", icon: "📈" },
  { label: "Docker Compose", icon: "🐳" }, { label: "Oracle Cloud", icon: "☁️" }, { label: "nginx", icon: "🌀" },
  { label: "PyJWT", icon: "🔑" }, { label: "Playwright", icon: "🎭" }, { label: "openai-whisper", icon: "🎙" }, { label: "Rank-BM25", icon: "🔢" },
];

const VAULT_HIGHLIGHTS = [
  { icon: "🖥", domain: "Frontend", tint:"var(--blue-tint)", title: "React Admin Dashboard", desc: "Built out the full-featured dashboard — analytics via Recharts, channel management, source upload, crawler control, and a live chat widget, all auth-gated through Discord OAuth." },
  { icon: "🎨", domain: "Frontend", tint:"var(--blue-tint)", title: "Dashboard UX & Theming", desc: "Implemented responsive layouts, state-driven UI interactions, and visual polish across the dashboard's analytics and settings views." },
  { icon: "🔌", domain: "Backend", tint:"var(--rose-tint)", title: "FastAPI Service Endpoints", desc: "Built and maintained REST endpoints powering guild configuration, source management, and dashboard data sync inside the FastAPI backend." },
  { icon: "🔐", domain: "Backend", tint:"var(--rose-tint)", title: "Auth & Session Middleware", desc: "Implemented Discord OAuth + JWT auth flow and role-based access middleware securing guild-scoped operations." },
  { icon: "🧠", domain: "AI", tint:"var(--violet-tint)", title: "RAG Pipeline Tuning", desc: "Worked on the retrieval layer — combining FAISS semantic search with BM25 lexical ranking, feeding grounded context into LangChain LCEL chains." },
  { icon: "📥", domain: "AI", tint:"var(--violet-tint)", title: "Multi-Modal Ingestion", desc: "Contributed to the ingestion pipeline supporting PDFs, DOCX, web scrapes, and Whisper audio transcription feeding into the knowledge base." },
];

function VaultBotContribution() {
  return (
    <section id="vaultbot" style={{ padding:"6rem 2.5rem", background:"var(--paper-2)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="rv d1" style={{ marginBottom:"2.2rem" }}>
          <div className="eyebrow">// A Platform I Helped Build</div>
          <h2 className="grotesk" style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:800, letterSpacing:"-0.02em", marginBottom:"0.6rem" }}>
            A Platform I Helped <span style={{ color:"var(--rose)" }} className="poster-text">Build</span>
          </h2>
          <p className="mono" style={{ fontSize:"0.78rem", color:"var(--ink-soft)", fontWeight:600 }}>
            Co-founded and helped build a production-grade AI platform, leading the implementation of several core product features across frontend, backend, and AI infrastructure.
          </p>
        </div>

        <div className="rv d2 brut-card" style={{ boxShadow:"var(--shadow-lg)", overflow:"hidden" }}>
          <div className="vaultbot-header" style={{ background:"var(--violet-tint)", borderBottom:"3px solid var(--ink)", padding:"2.2rem 2.5rem" }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:"1.2rem", marginBottom:"1.5rem" }}>
              <div>
                <div className="sticker" style={{ background:"var(--paper)", marginBottom:"1rem" }}>Co-Founder &amp; Core Contributor</div>
                <h3 className="grotesk poster-text" style={{ fontWeight:800, fontSize:"clamp(1.8rem,3.5vw,2.8rem)", letterSpacing:"-0.03em", lineHeight:1.1, marginBottom:"0.6rem" }}>
                  VaultBot
                </h3>
                <p className="mono" style={{ fontSize:"0.82rem", fontWeight:700, letterSpacing:"0.03em", marginBottom:"0.7rem" }}>
                  Production-Grade Multi-Tenant RAG AI Platform
                </p>
                <p style={{ fontSize:"0.9rem", color:"var(--ink)", lineHeight:1.9, maxWidth:600 }}>
                  A full-stack, multi-service AI platform bringing server-specific, context-aware intelligence to Discord communities. As <strong>Co-Founder &amp; Core Engineer</strong>, I played a key role in building and scaling the platform, contributing across the <span className="mark-blue">React dashboard</span>, the <span className="mark-rose">FastAPI backend</span>, and the platform's <span className="mark-violet">RAG / AI retrieval pipeline</span>.
                </p>
                <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap", marginTop:"1.2rem" }}>
                  <span className="chip" style={{ background:"var(--paper)" }}>🎨 Frontend</span>
                  <span className="chip" style={{ background:"var(--paper)" }}>🔧 Backend</span>
                  <span className="chip" style={{ background:"var(--paper)" }}>🧠 AI</span>
                </div>
              </div>

              <div className="vault-stats-container" style={{ display:"flex", flexDirection:"column", gap:"0.6rem", minWidth:160 }}>
                <div className="brut-card" style={{ padding:"0.9rem 1rem", textAlign:"center", background:"var(--paper)" }}>
                  <div className="grotesk" style={{ fontWeight:800, fontSize:"1.9rem", letterSpacing:"-0.02em", lineHeight:1 }}>12,806</div>
                  <div className="mono" style={{ fontSize:"0.58rem", color:"var(--ink-soft)", textTransform:"uppercase", letterSpacing:"0.08em", marginTop:"0.3rem", fontWeight:700 }}>Lines of Code</div>
                </div>
                <div className="brut-card" style={{ padding:"0.9rem 1rem", textAlign:"center", background:"var(--paper)" }}>
                  <div className="grotesk" style={{ fontWeight:800, fontSize:"1.3rem", lineHeight:1 }}>4</div>
                  <div className="mono" style={{ fontSize:"0.58rem", color:"var(--ink-soft)", textTransform:"uppercase", letterSpacing:"0.08em", marginTop:"0.3rem", fontWeight:700 }}>Services</div>
                </div>
                <div className="brut-card" style={{ padding:"0.9rem 1rem", textAlign:"center", background:"var(--paper)" }}>
                  <div className="grotesk" style={{ fontWeight:800, fontSize:"1.3rem", lineHeight:1 }}>3</div>
                  <div className="mono" style={{ fontSize:"0.58rem", color:"var(--ink-soft)", textTransform:"uppercase", letterSpacing:"0.08em", marginTop:"0.3rem", fontWeight:700 }}>Domains Touched</div>
                </div>
              </div>
            </div>

            <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
              {[["FastAPI Backend","🔌"],["Discord Bot","💬"],["React Dashboard","🖥"],["BullMQ Worker","⚙️"],["Redis Cache","🔴"],["Supabase Postgres","🐘"],["Docker Compose","🐳"],["Oracle Cloud","☁️"]].map(([label, icon]) => (
                <span key={label} className="chip" style={{ background:"var(--paper)", fontWeight:600 }}>
                  <span style={{ marginRight:"0.3rem" }}>{icon}</span>{label}
                </span>
              ))}
            </div>
          </div>

          <div className="vaultbot-body" style={{ padding:"2.5rem" }}>
            <div style={{ marginBottom:"2.3rem" }}>
              <div className="eyebrow">// What I Contributed</div>
              <div className="vault-highlight-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:"1rem" }}>
                {VAULT_HIGHLIGHTS.map((h) => (
                  <div key={h.title} className="brut-card hoverable" style={{ background: h.tint, padding:"1.3rem" }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"0.7rem" }}>
                      <span style={{ fontSize:"1.3rem" }}>{h.icon}</span>
                      <span className="chip" style={{ background:"var(--paper)", fontSize:"0.58rem" }}>{h.domain}</span>
                    </div>
                    <div className="grotesk" style={{ fontWeight:700, fontSize:"0.9rem", marginBottom:"0.4rem", letterSpacing:"-0.01em" }}>{h.title}</div>
                    <div style={{ fontSize:"0.81rem", color:"var(--ink-soft)", lineHeight:1.7 }}>{h.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom:"2.3rem" }}>
              <div className="eyebrow">// Full Tech Stack</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
                {VAULT_TECH.map((t) => (
                  <span key={t.label} className="chip" style={{ background:"var(--paper)", fontWeight:600 }}>
                    <span style={{ marginRight:"0.3rem" }}>{t.icon}</span>{t.label}
                  </span>
                ))}
              </div>
            </div>

            <TerminalWindow title="aayushi@vaultbot — contributors">
              <TermLine cmd="cat CONTRIBUTORS.md">
                <span style={{ display:"block" }}><span style={{ color:"#5CC8FF" }}>Arman Phaugat</span>{"   →  Founder & Lead Architect"}</span>
                <span className="term-ok" style={{ display:"block", marginTop:"0.2rem" }}>Aayushi Chhabra  →  Co-Founder & Core Contributor (Frontend · Backend · AI)</span>
              </TermLine>
              <TermLine cmd={<>git log --author="Aayushi" --stat<span className="term-cursor" /></>}>
                dashboard · auth middleware · retrieval pipeline …
              </TermLine>
            </TerminalWindow>

            <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", marginTop:"1.8rem" }}>
              <a href="https://discord.com/oauth2/authorize?client_id=1463510548808208415" target="_blank" rel="noreferrer" className="brut-btn brut-btn-ink" style={{ fontSize:"0.76rem" }}>
                Add VaultBot to Discord ↗
              </a>
              <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" className="brut-btn brut-btn-paper" style={{ fontSize:"0.76rem" }}>
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
    category:"AI/ML · Security", tint:"var(--rose-tint)", featured:true,
    tech:["Python","Streamlit","LangChain","Gemini","FAISS","AWS Boto3","Plotly"],
    highlights:["RAG-powered incident guidance with semantic threat search","FAISS + Gemini embeddings for rapid containment","Interactive network attack analytics & anomaly detection","Comprehensive SecOps situational awareness dashboard"],
    link:"https://intelligent-secops-rag-dashboard.streamlit.app",
  },
  {
    num:"02", name:"ResQNet",
    tagline:"Cross-platform crisis management for citizens, NGOs & government agencies",
    category:"Mobile · Full Stack", tint:"var(--blue-tint)",
    tech:["React Native","Expo","BLE","Supabase","Firebase","NativeWind","Geolib"],
    highlights:["Offline-first BLE-based mobile crisis reporting","Automated resource allocation via incident clustering","Multi-channel real-time situational awareness","Geolocation-based alert routing"],
    link:"https://github.com/aayushichhabra/ResQNet",
  },
  {
    num:"03", name:"DeepFake Detection System",
    tagline:"End-to-end deepfake detection pipeline with visual explainability",
    category:"AI/ML · Computer Vision", tint:"var(--violet-tint)",
    tech:["Python","PyTorch","EfficientNetB0","Grad-CAM","OpenCV","Scikit-learn"],
    highlights:["Binary classification: real vs. AI-generated images","Grad-CAM explainability heatmaps for security auditors","Transfer learning with EfficientNetB0 backbone"],
    link:"https://github.com/aayushichhabra/DeepFakeImageDetection",
  },
  {
    num:"04", name:"Promptly AI",
    tagline:"AI productivity assistant — email triage, reply drafting & meeting intelligence",
    category:"AI · Full Stack", tint:"var(--blue-tint)",
    tech:["Python","Streamlit","Gemini 2.5 Flash","Whisper","Gmail API","Google OAuth2","LangChain"],
    highlights:["Gmail OAuth: auto-scans inbox for reminders & deadlines","Gemini batch email processing with ready-to-send drafts","Whisper audio → structured Minutes of Meeting","Unified dashboard across sessions"],
    link:"https://github.com/aayushichhabra",
  },
  {
    num:"05", name:"CVE Agent",
    tagline:"Agentic AI for real-time CVE triage, dependency scanning & fix generation",
    category:"AI/ML · Cybersecurity", tint:"var(--rose-tint)",
    tech:["Python","Streamlit","Gemini API","LangGraph","NIST NVD API","OSV.dev","BeautifulSoup4"],
    highlights:["LangGraph pipeline: fetches & summarizes CVEs from NIST NVD","Dependency scanner with CVSS scores from requirements.txt","AI-generated fix recommendations with downloadable files"],
    link:"https://github.com/aayushichhabra",
  },
  {
    num:"06", name:"VaultBot AI",
    tagline:"Production-grade multi-tenant RAG platform & Discord collaboration agent",
    category:"AI · Backend · Full Stack", tint:"var(--violet-tint)",
    tech:["FastAPI","Discord.py","LangChain","Supabase","Redis","Groq / Llama 3"],
    highlights:["RAG-based context-aware server intelligence","Custom retrieval pipeline with FAISS vector database","Scale-ready multi-tenant infrastructure on Oracle Cloud"],
    link:"#vaultbot",
  },
];

function ProjectCard({ p, i }) {
  if (p.featured) {
    return (
      <div className="rv d1 brut-card hoverable" style={{ gridColumn:"1/-1", padding:"2.4rem", background: p.tint }}>
        <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2.3rem", alignItems:"start" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"1rem", flexWrap:"wrap" }}>
              <span className="sticker" style={{ background:"var(--paper)" }}>#{p.num} · Featured</span>
              <span className="mono" style={{ fontSize:"0.62rem", color:"var(--ink-soft)", fontWeight:700 }}>{p.category}</span>
            </div>
            <h3 className="grotesk" style={{ fontSize:"1.6rem", fontWeight:800, marginBottom:"0.6rem", letterSpacing:"-0.02em", lineHeight:1.2 }}>{p.name}</h3>
            <p style={{ fontSize:"0.89rem", color:"var(--ink)", lineHeight:1.8, marginBottom:"1.5rem" }}>{p.tagline}</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem", marginBottom:"1.6rem" }}>
              {p.tech.map(t => <span key={t} className="chip" style={{ background:"var(--paper)" }}>{t}</span>)}
            </div>
            <a href={p.link} target="_blank" rel="noreferrer" className="brut-btn brut-btn-ink" style={{ fontSize:"0.74rem" }}>View Live →</a>
          </div>
          <div className="brut-card" style={{ background:"var(--paper)", padding:"1.5rem" }}>
            <div className="eyebrow" style={{ marginBottom:"1rem" }}>// Key Features</div>
            <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"0.75rem" }}>
              {p.highlights.map((h,j) => (
                <li key={j} style={{ fontSize:"0.81rem", color:"var(--ink)", lineHeight:1.65, display:"flex", gap:"0.55rem" }}>
                  <span style={{ flexShrink:0, fontSize:"0.65rem", marginTop:"0.25rem" }}>◆</span>{h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`rv d${(i%3)+1} brut-card hoverable`} style={{ padding:"1.9rem", background: p.tint, display:"flex", flexDirection:"column" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1rem" }}>
        <div>
          <span className="mono" style={{ fontSize:"0.62rem", color:"var(--ink-soft)", display:"block", marginBottom:"0.3rem", fontWeight:700 }}>#{p.num}</span>
          <span className="chip" style={{ background:"var(--paper)", fontSize:"0.58rem" }}>{p.category}</span>
        </div>
        {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ textDecoration:"none", fontSize:"0.85rem", fontWeight:800 }}>↗</a>}
      </div>
      <h3 className="grotesk" style={{ fontSize:"1.08rem", fontWeight:700, marginBottom:"0.45rem", lineHeight:1.3 }}>{p.name}</h3>
      <p style={{ fontSize:"0.8rem", color:"var(--ink-soft)", lineHeight:1.7, marginBottom:"0.9rem" }}>{p.tagline}</p>
      <ul style={{ listStyle:"none", marginBottom:"1.1rem", flex:1 }}>
        {p.highlights.map((h,j) => (
          <li key={j} style={{ fontSize:"0.77rem", color:"var(--ink)", lineHeight:1.65, marginBottom:"0.3rem", display:"flex", gap:"0.45rem" }}>
            <span style={{ flexShrink:0, fontWeight:800 }}>›</span>{h}
          </li>
        ))}
      </ul>
      <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
        {p.tech.map(t => <span key={t} className="chip" style={{ background:"var(--paper)" }}>{t}</span>)}
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding:"6rem 2.5rem", background:"var(--paper)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"1rem", marginBottom:"2.6rem" }}>
          <div>
            <div className="eyebrow rv d1">// Selected Work</div>
            <h2 className="rv d1 grotesk" style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:800, letterSpacing:"-0.02em" }}>
              Featured <span style={{ color:"var(--sun)" }} className="poster-text">Work</span>
            </h2>
          </div>
          <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" className="brut-btn brut-btn-paper" style={{ fontSize:"0.7rem" }}>View All on GitHub ↗</a>
        </div>
        <div className="projects-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(310px,1fr))", gap:"1.4rem" }}>
          {PROJECTS.map((p,i) => <ProjectCard key={p.num} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ─── */
const SKILL_GROUPS = [
  { label:"Programming & Dev", items:["Python","C","Java","JavaScript","OOP","DSA","Git"], tint:"var(--rose-tint)", icon:"⌨️" },
  { label:"AI & Machine Learning", items:["Supervised & Unsupervised ML","Transfer Learning","RAG","Computer Vision","LangChain","LangGraph","Whisper STT","PyTorch","TF Lite","OpenCV","Scikit-learn","Pandas"], tint:"var(--blue-tint)", icon:"🧠" },
  { label:"Cybersecurity", items:["CVE Analysis","Vulnerability Assessment","Incident Response","Threat Detection","Anomaly Detection","FAISS Vector DBs"], tint:"var(--violet-tint)", icon:"🔐" },
  { label:"Mobile & Web Dev", items:["Android Studio","Kotlin","React Native","Expo","HTML","CSS","JavaScript","Streamlit","Figma"], tint:"var(--rose-tint)", icon:"📱" },
  { label:"Databases & Cloud", items:["SQL","Firebase","Supabase","MongoDB","FAISS / Vector DBs"], tint:"var(--blue-tint)", icon:"☁️" },
  { label:"Tools & Platforms", items:["Gradio","Plotly","Google Gemini API","Google OAuth2","Hugging Face","VS Code","GitHub","Postman"], tint:"var(--sun-tint)", icon:"🛠️" },
];

const SKILL_BARS = [
  { name:"Machine Learning & AI Systems", pct:88, col:"#FF3B5C" },
  { name:"Python / Full-stack Dev",        pct:87, col:"#2E4DFF" },
  { name:"Cybersecurity & Threat Detection",pct:84, col:"#7B5CFF" },
  { name:"React Native / Mobile Dev",       pct:82, col:"#FF3B5C" },
  { name:"Database Design & Cloud",         pct:80, col:"#2E4DFF" },
  { name:"UI/UX & Frontend",                pct:75, col:"#00C2A8" },
];

function SkillBar({ name, pct, col, delay }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVis(true); }, { threshold: 0 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ marginBottom:"1.2rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.5rem" }}>
        <span className="mono" style={{ fontSize:"0.8rem", fontWeight:700, color:"var(--ink)" }}>{name}</span>
        <span className="chip" style={{ background: col, color:"var(--paper)", fontSize:"0.68rem" }}>{pct}%</span>
      </div>
      <div className="skillbar-track">
        <div className="skillbar-fill" style={{
          background: col, width: vis ? `${pct}%` : "0%",
          transition:`width 1.2s cubic-bezier(0.25,1,0.5,1) ${delay}s`,
        }} />
      </div>
    </div>
  );
}

function Skills() {
  const [tab, setTab] = useState("tags");
  useReveal(tab);
  return (
    <section id="skills" style={{ padding:"6rem 2.5rem", background:"var(--paper-2)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="skills-tab-row" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"1rem", marginBottom:"2.4rem" }}>
          <div>
            <div className="eyebrow rv d1">// Skillset</div>
            <h2 className="rv d1 grotesk" style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:800, letterSpacing:"-0.02em" }}>
              Technical <span style={{ color:"var(--blue)" }} className="poster-text">Toolkit</span>
            </h2>
          </div>
          <div style={{ display:"flex", gap:"0.6rem" }}>
            {[["tags","By Domain"],["bars","Proficiency"]].map(([k,l]) => (
              <button key={k} onClick={() => setTab(k)} className="mono" style={{
                padding:"0.5rem 1rem", borderRadius:"8px", border:"2.5px solid var(--ink)",
                background: tab===k ? "var(--ink)" : "var(--paper)",
                color: tab===k ? "var(--paper)" : "var(--ink)",
                cursor:"pointer", fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.04em",
                boxShadow: tab===k ? "none" : "3px 3px 0 var(--ink)",
              }}>{l}</button>
            ))}
          </div>
        </div>

        {tab === "tags" && (
          <div className="skills-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.2rem" }}>
            {SKILL_GROUPS.map(({ label, items, tint, icon }, i) => (
              <div key={label} className={`rv d${i+1} brut-card hoverable`} style={{ padding:"1.6rem", background: tint }}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"1rem" }}>
                  <span>{icon}</span>
                  <span className="grotesk" style={{ fontSize:"0.85rem", fontWeight:700 }}>{label}</span>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
                  {items.map(t => (
                    <span key={t} className="chip" style={{ background:"var(--paper)", fontWeight:600 }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "bars" && (
          <div className="bars-grid brut-card" style={{ padding:"2rem 2.2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 3.5rem", background:"var(--paper)" }}>
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
    { icon:"🏆", title:"Dean's Excellence Award", desc:"Maintained 9.88 CGPA across 5 consecutive semesters at MUJ.", tint:"var(--rose-tint)" },
    { icon:"🎯", title:"Deloitte Capstone Ideathon Finalist", desc:"Ranked Top 10 out of 200+ teams for innovative solution design.", tint:"var(--blue-tint)" },
    { icon:"📡", title:"Promotional Head — Turing Sapiens", desc:"Led team executing campaigns for technical events and community engagement.", tint:"var(--violet-tint)" },
    { icon:"📝", title:"Research Paper (In Progress)", desc:"Authoring a review on power consumption & cooling optimization in data centers.", tint:"var(--sun-tint)" },
  ];
  return (
    <section id="achievements" className="sec-pad" style={{ background:"var(--paper)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="eyebrow rv d1">// Recognition</div>
        <h2 className="rv d1 grotesk" style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:800, letterSpacing:"-0.02em", marginBottom:"2.6rem" }}>
          Milestones &amp; <span style={{ color:"var(--rose)" }} className="poster-text">Awards</span>
        </h2>
        <div className="achievements-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"1.3rem", marginBottom:"2.4rem" }}>
          {items.map(({ icon, title, desc, tint }, i) => (
            <div key={title} className={`rv d${i+1} brut-card hoverable`} style={{ padding:"2rem", background: tint }}>
              <div style={{ fontSize:"2rem", marginBottom:"0.9rem" }}>{icon}</div>
              <h3 className="grotesk" style={{ fontWeight:700, fontSize:"0.9rem", marginBottom:"0.5rem" }}>{title}</h3>
              <p style={{ fontSize:"0.8rem", color:"var(--ink-soft)", lineHeight:1.75 }}>{desc}</p>
            </div>
          ))}
        </div>
        <div className="rv d5 cgpa-banner brut-card" style={{ background:"var(--sun-tint)", padding:"2.4rem 3rem", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"2rem" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom:"0.6rem" }}>Academic Standing</div>
            <div className="grotesk poster-text" style={{ fontSize:"4rem", fontWeight:800, lineHeight:1 }}>9.88</div>
            <div className="mono" style={{ fontSize:"0.68rem", color:"var(--ink-soft)", marginTop:"0.4rem", fontWeight:700 }}>CGPA · Manipal University Jaipur</div>
          </div>
          <div className="cgpa-stats" style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
            {[["5×","Dean's Award"],["3+","Internships"],["Top 10","Deloitte Ideathon"]].map(([n,l]) => (
              <div key={l} className="brut-card" style={{ textAlign:"center", padding:"1rem 1.2rem", background:"var(--paper)" }}>
                <div className="grotesk" style={{ fontSize:"1.7rem", fontWeight:800 }}>{n}</div>
                <div className="mono" style={{ fontSize:"0.6rem", color:"var(--ink-soft)", marginTop:"0.2rem", letterSpacing:"0.06em", fontWeight:700 }}>{l}</div>
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
    <section id="contact" className="sec-pad" style={{ background:"var(--ink)", color:"var(--paper)", position:"relative" }}>
      <div style={{ maxWidth:700, margin:"0 auto", textAlign:"center", position:"relative" }}>
        <h2 className="rv d1 grotesk" style={{ fontSize:"clamp(2.2rem,5vw,3.5rem)", fontWeight:800, letterSpacing:"-0.03em", marginBottom:"1.2rem", lineHeight:1.1 }}>
          Let's <span style={{ color:"var(--sun)", textShadow:"6px 6px 0 var(--violet)" }}>Connect</span>
        </h2>
        <p className="rv d2" style={{ fontSize:"0.92rem", color:"#C9C9CE", lineHeight:1.9, marginBottom:"2.4rem" }}>
          Open to internship opportunities, research collaborations, and interesting projects in AI, cybersecurity, and full-stack development.
        </p>

        <div className="rv d3 contact-email-row" style={{ display:"flex", alignItems:"center", gap:"0.8rem", justifyContent:"center", marginBottom:"2rem", flexWrap:"wrap" }}>
          <span className="mono contact-email-text" style={{ fontSize:"0.85rem", color:"var(--paper)", letterSpacing:"0.02em", fontWeight:600 }}>{email}</span>
          <button onClick={() => { navigator.clipboard.writeText(email); setCopied(true); setTimeout(()=>setCopied(false),2000); }}
            className="chip" style={{ background: copied ? "var(--mint)" : "var(--sun)", cursor:"pointer", fontSize:"0.68rem" }}>
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
        <div className="rv d4 contact-socials" style={{ display:"flex", justifyContent:"center", gap:"0.6rem", flexWrap:"wrap", marginBottom:"2.4rem" }}>
          {[
            { label:"LinkedIn", url:"https://linkedin.com/in/aayushi-chhabra-54281a34a", icon:<svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
            { label:"GitHub", url:"https://github.com/aayushichhabra", icon:<svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg> },
            { label:"LeetCode", url:"https://leetcode.com/u/aayushichhabra", icon:<svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg> },
            { label:"SecOps Live", url:"https://intelligent-secops-rag-dashboard.streamlit.app", icon:<svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
          ].map(({ label, url, icon }) => (
            <a key={label} href={url} target="_blank" rel="noreferrer" className="brut-icon-btn" style={{ background:"var(--ink)", color:"var(--paper)", borderColor:"var(--paper)", boxShadow:"4px 4px 0 var(--sun)" }}>{icon}{label}</a>
          ))}
        </div>
        <div className="rv d5 contact-btns" style={{ display:"flex", gap:"0.8rem", justifyContent:"center", flexWrap:"wrap" }}>
          <a href="mailto:aayushichhabra1010@gmail.com" className="brut-btn brut-btn-sun">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
            Send a Message
          </a>
          <a href="https://linkedin.com/in/aayushi-chhabra-54281a34a" target="_blank" rel="noreferrer" className="brut-btn" style={{ background:"var(--ink)", color:"var(--paper)", borderColor:"var(--paper)", boxShadow:"7px 7px 0 var(--violet)" }}>
            LinkedIn Profile →
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop:"3px solid var(--ink)", padding:"1.8rem 2.5rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem", background:"var(--paper)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"0.8rem" }}>
        <span className="grotesk" style={{ fontWeight:800, fontSize:"0.9rem", color:"var(--ink)" }}>AAYUSHI_CHHABRA</span>
        <span className="mono" style={{ fontSize:"0.62rem", color:"var(--ink-soft)", fontWeight:600 }}>B.Tech CSE · MUJ · 2027</span>
      </div>
      <div className="chip" style={{ background:"var(--mint-tint)" }}>
        <span style={{ width:6, height:6, borderRadius:"50%", background:"var(--mint)", display:"inline-block", marginRight:"0.4rem" }} />
        All Systems Operational
      </div>
      <div className="mono" style={{ fontSize:"0.62rem", color:"var(--ink-soft)", letterSpacing:"0.03em", fontWeight:600 }}>
        aayushichhabra1010@gmail.com · Gurugram, IN
      </div>
    </footer>
  );
}

export default function App() {
  useReveal(null);
  return (
    <>
      <style>{G}</style>
      <ScrollProg />
      <SectionProgress />
      <Nav />
      <main>
        <Hero />
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
    </>
  );
}