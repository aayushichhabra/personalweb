import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────
   DESIGN SYSTEM — DEPO-INSPIRED COLOR-BLOCK MAXIMALISM
   Vibrant full-bleed color sections (Lime, Blue, Coral, Teal, Yellow, Violet),
   chunky 3.5px ink borders, 6px/8px hard offset shadows, high-contrast badges & buttons.
   ───────────────────────────────────────────────────────── */

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700;800&family=Space+Grotesk:wght@600;700;800;900&display=swap');

  :root {
    --ink:        #111111;
    --paper:      #FFFFFF;
    --cream:      #F7F3E9;

    --lime:       #C8E832;
    --lime-tint:  #EEF8BE;
    --yellow:     #FFDC00;
    --yellow-tint:#FFF3A3;
    --coral:      #FF4D4D;
    --coral-tint: #FFCCD0;
    --violet:     #7C3AED;
    --violet-tint:#E2D4FF;
    --blue:       #1769E8;
    --blue-tint:  #C7DEFF;
    --teal:       #2DD4BF;
    --teal-tint:  #C4F8F1;
    --orange:     #FF8800;

    --shadow-sm: 4px 4px 0 #111111;
    --shadow-md: 7px 7px 0 #111111;
    --shadow-lg: 10px 10px 0 #111111;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--cream);
    font-family: 'Inter', sans-serif;
    color: var(--ink);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  ::selection { background: var(--yellow); color: var(--ink); }
  ::-webkit-scrollbar { width: 12px; }
  ::-webkit-scrollbar-track { background: var(--cream); }
  ::-webkit-scrollbar-thumb { background: var(--ink); border: 3px solid var(--cream); border-radius: 6px; }

  .mono { font-family: 'JetBrains Mono', monospace; }
  .grotesk { font-family: 'Space Grotesk', sans-serif; }

  a { color: inherit; }

  @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes marquee    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes wiggle     { 0%,100%{transform:rotate(-2.5deg)} 50%{transform:rotate(1.5deg)} }
  @keyframes floatPulse { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }

  .rv { opacity:0; transform:translateY(20px); transition: opacity 0.55s ease, transform 0.55s ease; }
  .rv.on { opacity:1; transform:translateY(0); }
  .d1{transition-delay:.06s} .d2{transition-delay:.12s} .d3{transition-delay:.18s}
  .d4{transition-delay:.24s} .d5{transition-delay:.3s}  .d6{transition-delay:.36s}

  /* ─── Depo-style Core Primitives ─── */
  .brut-card {
    background: var(--paper);
    border: 3.5px solid var(--ink);
    border-radius: 14px;
    box-shadow: var(--shadow-md);
    transition: transform .16s cubic-bezier(0.16, 1, 0.3, 1), box-shadow .16s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
  }
  .brut-card.hoverable:hover {
    transform: translate(-3px, -3px);
    box-shadow: var(--shadow-lg);
  }

  .brut-btn {
    display: inline-flex; align-items: center; gap: 0.55rem;
    padding: 0.85rem 1.7rem; border-radius: 10px;
    font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem;
    font-weight: 800; letter-spacing: 0.02em;
    border: 3.5px solid var(--ink); cursor: pointer;
    text-decoration: none; box-shadow: var(--shadow-md);
    transition: transform .14s ease, box-shadow .14s ease;
  }
  .brut-btn:hover { transform: translate(-3px,-3px); box-shadow: var(--shadow-lg); }
  .brut-btn:active { transform: translate(3px,3px); box-shadow: 2px 2px 0 var(--ink); }

  .brut-btn-lime   { background: var(--lime); color: var(--ink); }
  .brut-btn-yellow { background: var(--yellow); color: var(--ink); }
  .brut-btn-coral  { background: var(--coral); color: var(--paper); }
  .brut-btn-violet { background: var(--violet); color: var(--paper); }
  .brut-btn-blue   { background: var(--blue); color: var(--paper); }
  .brut-btn-ink    { background: var(--ink); color: var(--paper); }
  .brut-btn-paper  { background: var(--paper); color: var(--ink); }

  .brut-icon-btn {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.55rem 1.05rem; border-radius: 9px;
    font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; font-weight: 700;
    text-decoration: none; border: 3px solid var(--ink);
    background: var(--paper); color: var(--ink);
    box-shadow: 4px 4px 0 var(--ink);
    transition: transform .14s ease, box-shadow .14s ease;
  }
  .brut-icon-btn:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 var(--ink); }

  .chip {
    display: inline-flex; align-items: center;
    font-family: 'JetBrains Mono', monospace; font-weight: 800;
    font-size: 0.7rem; padding: 0.3rem 0.75rem; border-radius: 8px;
    border: 2.5px solid var(--ink); letter-spacing: 0.02em;
    box-shadow: 3px 3px 0 var(--ink);
    transition: transform 0.12s ease;
  }

  .sticker {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-family: 'JetBrains Mono', monospace; font-weight: 800;
    font-size: 0.7rem; padding: 0.4rem 0.95rem; border-radius: 999px;
    border: 3px solid var(--ink); letter-spacing: 0.06em; text-transform: uppercase;
    box-shadow: 4px 4px 0 var(--ink);
    transform: rotate(-2.5deg);
  }

  .eyebrow {
    display: inline-flex; align-items: center; gap: .45rem;
    font-family: 'JetBrains Mono', monospace; font-size: 0.7rem;
    font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
    background: var(--ink); color: var(--paper);
    padding: 0.4rem 0.9rem; border-radius: 8px;
    border: 2.5px solid var(--ink);
    box-shadow: 3px 3px 0 var(--yellow);
    margin-bottom: 1.3rem;
  }

  .mark-blue   { background: var(--blue-tint);  padding: 0.08em 0.35em; border-radius: 5px; font-weight: 800; color: var(--ink); border: 2px solid var(--ink); }
  .mark-coral  { background: var(--coral-tint); padding: 0.08em 0.35em; border-radius: 5px; font-weight: 800; color: var(--ink); border: 2px solid var(--ink); }
  .mark-violet { background: var(--violet-tint);padding: 0.08em 0.35em; border-radius: 5px; font-weight: 800; color: var(--ink); border: 2px solid var(--ink); }
  .mark-yellow { background: var(--yellow-tint);padding: 0.08em 0.35em; border-radius: 5px; font-weight: 800; color: var(--ink); border: 2px solid var(--ink); }
  .mark-lime   { background: var(--lime-tint);  padding: 0.08em 0.35em; border-radius: 5px; font-weight: 800; color: var(--ink); border: 2px solid var(--ink); }

  /* Crisp neo-brutalist headline text styling */
  .poster-text {
    text-shadow: 3.5px 3.5px 0 var(--ink);
  }

  .scroll-bar {
    position: fixed; top: 0; left: 0; height: 6px; z-index: 9999;
    background: linear-gradient(90deg, var(--lime), var(--yellow), var(--coral), var(--violet), var(--blue));
    border-bottom: 2.5px solid var(--ink);
    transition: width 0.05s linear;
  }

  .nav-link {
    font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; font-weight: 700;
    color: var(--paper); text-decoration: none; padding-bottom: 3px;
    border-bottom: 2.5px solid transparent; transition: border-color 0.15s, color 0.15s;
  }
  .nav-link:hover, .nav-link.active { border-color: var(--lime); color: var(--lime); }

  /* ─── Terminal window ─── */
  .term-window {
    border: 3.5px solid var(--ink);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    background: #0D0D12;
  }
  .term-titlebar {
    background: #1B1B22;
    border-bottom: 2.5px solid #2C2C36;
    padding: 0.75rem 1.1rem;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .term-dots { display: flex; gap: 7px; flex-shrink: 0; }
  .term-dot { width: 12px; height: 12px; border-radius: 50%; border: 1.5px solid rgba(0,0,0,0.3); }
  .term-dot.red    { background: #FF5F57; }
  .term-dot.yellow { background: #FEBC2E; }
  .term-dot.green  { background: #28C840; }
  .term-title {
    flex: 1; text-align: center;
    font-family: 'JetBrains Mono', monospace; font-size: 0.72rem;
    color: #86868f; letter-spacing: 0.02em; font-weight: 700;
  }
  .term-spacer { width: 47px; flex-shrink: 0; }
  .term-body {
    padding: 1.6rem 1.7rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.84rem;
    line-height: 1.95;
    color: #E8E6E3;
  }
  .term-row { margin-bottom: 1.05rem; }
  .term-row:last-child { margin-bottom: 0; }
  .term-user { color: #3DDC84; font-weight: 800; }
  .term-path { color: #5CC8FF; }
  .term-sym  { color: #6E6E78; margin: 0 0.4em; }
  .term-cmd  { color: #FFFFFF; font-weight: 700; }
  .term-out  { color: #ADAAB8; display: block; margin-top: 0.35rem; padding-left: 0.1rem; }
  .term-ok   { color: #3DDC84; font-weight: 700; }
  .term-warn { color: #FFC53D; font-weight: 700; }
  .term-cursor {
    display: inline-block; width: 7px; height: 15px;
    background: #3DDC84; margin-left: 4px; vertical-align: -2px;
    animation: blink 1s step-end infinite;
  }

  /* Full-bleed color section backgrounds (Depo Budget Style) */
  .sec-pad { padding: 6.5rem 4rem; border-bottom: 3.5px solid var(--ink); }

  .bg-sec-cream  { background: var(--cream); }
  .bg-sec-yellow { background: var(--yellow); }
  .bg-sec-violet { background: var(--violet); color: var(--paper); }
  .bg-sec-teal   { background: var(--teal); }
  .bg-sec-coral  { background: var(--coral); color: var(--paper); }
  .bg-sec-blue   { background: var(--blue); color: var(--paper); }
  .bg-sec-lime   { background: var(--lime); }
  .bg-sec-ink    { background: var(--ink); color: var(--paper); }

  .marquee-bar {
    background: var(--ink); border-top: 3.5px solid var(--ink); border-bottom: 3.5px solid var(--ink);
    padding: 0.95rem 0; overflow: hidden; white-space: nowrap;
  }
  .marquee-inner { display: inline-flex; gap: 2.5rem; animation: marquee 34s linear infinite; }

  .progress-sidebar {
    position: fixed; right: 1.5rem; top: 50%; transform: translateY(-50%);
    display: flex; flex-direction: column; gap: 0.75rem; z-index: 800;
    background: var(--yellow); padding: 0.8rem 0.55rem; border: 3.5px solid var(--ink);
    border-radius: 999px; box-shadow: 4px 4px 0 var(--ink);
  }
  .prog-dot {
    width: 11px; height: 11px; background: var(--paper);
    border: 2.5px solid var(--ink); cursor: pointer; transition: all 0.2s;
    border-radius: 50%;
  }
  .prog-dot.active { background: var(--coral); transform: scale(1.4); }

  .mob-menu {
    display: none; position: fixed; inset: 0;
    background: var(--ink); z-index: 700;
    flex-direction: column; align-items: center; justify-content: center;
    gap: 2rem;
  }
  .mob-menu.open { display: flex; }
  .mob-menu a { font-family: 'Space Grotesk', sans-serif; font-size: 1.8rem; font-weight: 800; color: var(--paper); text-decoration: none; }
  .mob-menu a:hover { color: var(--lime); }

  .skillbar-track {
    height: 16px; background: var(--paper); border: 3px solid var(--ink);
    border-radius: 6px; overflow: hidden;
  }
  .skillbar-fill {
    height: 100%; border-right: 3px solid var(--ink);
  }

  /* Decorative Badge Tags */
  .badge-tag {
    display: inline-flex; align-items: center; gap: 0.35rem;
    font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; font-weight: 800;
    padding: 0.25rem 0.6rem; border-radius: 6px; border: 2px solid var(--ink);
    box-shadow: 2.5px 2.5px 0 var(--ink);
  }

  /* Responsive */
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
  const SECS = ["hero","about","timeline","experience","nori","projects","skills","achievements","contact"];
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
  const links = [["about","About"],["timeline","Log"],["experience","Exp"],["nori","Projects"],["skills","Skills"],["achievements","Awards"],["contact","Contact"]];
  return (
    <>
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:600,
        padding:"0.9rem 2.5rem",
        background: "var(--blue)",
        color: "var(--paper)",
        borderBottom: "3.5px solid var(--ink)",
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        <a href="#hero" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:"0.6rem" }}>
          <span className="badge-tag" style={{ background:"var(--lime)", color:"var(--ink)", transform:"rotate(-2deg)" }}>✦ LIVE</span>
          <span className="grotesk" style={{ fontWeight:800, fontSize:"1rem", letterSpacing:"0.02em", color:"var(--paper)" }}>AAYUSHI_CHHABRA</span>
        </a>
        <nav className="hide-m nav-links" style={{ display:"flex", gap:"1.6rem", alignItems:"center" }}>
          {links.map(([id,label]) => <a key={id} href={`#${id}`} className="nav-link">{label}</a>)}
          <span style={{ width:2, height:18, background:"rgba(255,255,255,0.4)", display:"inline-block" }} />
          <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" className="nav-link" style={{ display:"inline-flex", alignItems:"center", gap:"0.35rem" }}>
            <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            GitHub
          </a>
          <a href="https://linkedin.com/in/aayushi-chhabra-54281a34a" target="_blank" rel="noreferrer" className="nav-link" style={{ display:"inline-flex", alignItems:"center", gap:"0.35rem" }}>
            <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </a>
          <a href="/Aayushi_Chhabra_Resume.pdf" download="Aayushi_Chhabra_Resume.pdf" className="nav-link" style={{ display:"inline-flex", alignItems:"center", gap:"0.35rem", color:"var(--yellow)", fontWeight:800 }}>
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9,15 12,18 15,15"/></svg>
            Resume ↓
          </a>
        </nav>
        <div style={{ display:"flex", gap:"0.6rem", alignItems:"center" }}>
          <a href="mailto:aayushichhabra1010@gmail.com" className="brut-btn brut-btn-lime" style={{ padding:"0.5rem 1.15rem", fontSize:"0.72rem" }}>Hire Me</a>
          <button onClick={() => setMenu(o=>!o)} style={{ display:"none", background:"var(--paper)", border:"3px solid var(--ink)", cursor:"pointer", color:"var(--ink)", padding:"0.4rem 0.6rem", borderRadius:"8px", boxShadow:"3px 3px 0 var(--ink)" }} className="mob-hamburger show-m">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </header>
      <div className={`mob-menu${menu?" open":""}`}>
        <button onClick={() => setMenu(false)} style={{ position:"absolute", top:"1.5rem", right:"1.5rem", background:"var(--paper)", border:"3px solid var(--paper)", color:"var(--ink)", cursor:"pointer", padding:"0.4rem 0.7rem", borderRadius:"8px", fontWeight:700 }}>✕</button>
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
  const words = ["AI & Cybersecurity Intern","ML Engineer","Computer Vision Researcher","Full Stack Developer","RAG Systems Builder"];
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
    <section id="hero" className="sec-pad bg-sec-cream" style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"8.5rem 2.5rem 4.5rem", position:"relative", overflow:"hidden" }}>
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none", opacity:0.45,
        backgroundImage:"linear-gradient(#D3CDBC 1.5px,transparent 1.5px),linear-gradient(90deg,#D3CDBC 1.5px,transparent 1.5px)",
        backgroundSize:"44px 44px",
      }} />

      <div style={{ maxWidth:1200, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
        <div className="hero-layout" style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:"3.2rem", alignItems:"start" }}>
          <div>
            <div className="rv" style={{ display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"2rem", flexWrap:"wrap" }}>
              <div className="sticker" style={{ background:"var(--lime)", animation:"wiggle 3.4s ease-in-out infinite" }}>
                <span style={{ width:8, height:8, borderRadius:"50%", background:"var(--ink)", display:"inline-block" }} />
                OPEN TO WORK
              </div>
              <span className="mono" style={{ fontSize:"0.7rem", color:"var(--ink)", letterSpacing:"0.08em", fontWeight:700 }}>FINAL YEAR CSE · MUJ · 2023–2027</span>
              <a href="#nori" className="chip" style={{ background:"var(--yellow)", color:"var(--ink)" }}>⚡ Co-Founder, Nori</a>
            </div>

            <div className="rv d1">
              <h1 className="grotesk" style={{ fontSize:"clamp(3.3rem,7.5vw,5.8rem)", fontWeight:900, lineHeight:1.02, letterSpacing:"-0.03em", marginBottom:"1.3rem" }}>
                <span style={{ color:"var(--ink)", textShadow:"3.5px 3.5px 0 var(--coral)" }}>Aayushi</span><br />
                <span style={{ color:"var(--blue)", textShadow:"3.5px 3.5px 0 var(--ink)" }}>Chhabra</span>
              </h1>
            </div>

            <p className="rv d3" style={{ fontSize:"1.05rem", color:"var(--ink)", lineHeight:1.95, maxWidth:580, marginBottom:"2.3rem", fontWeight:500 }}>
              Final-year B.Tech CSE at Manipal University Jaipur with a{" "}
              <span className="mark-coral">9.85 CGPA</span>. Industry experience at{" "}
              <span className="mark-blue">Ericsson</span> in Cybersecurity &amp; AI. Finalist at the{" "}
              <span className="mark-violet">Deloitte Capstone Ideathon</span>.{" "}
              <span className="mark-yellow">Dean's Excellence Award</span> — 6 consecutive semesters.
            </p>

            <div className="rv d4 hero-btns" style={{ display:"flex", gap:"1rem", flexWrap:"wrap", marginBottom:"2.1rem" }}>
              <a href="mailto:aayushichhabra1010@gmail.com" className="brut-btn brut-btn-coral">
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                Get In Touch
              </a>
              <a href="#nori" className="brut-btn brut-btn-lime">View Projects →</a>
            </div>

            <div className="rv d5" style={{ display:"flex", gap:"0.7rem", flexWrap:"wrap" }}>
              <a href="/Aayushi_Chhabra_Resume.pdf" download="Aayushi_Chhabra_Resume.pdf" className="brut-icon-btn">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9,15 12,18 15,15"/></svg>
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
              {[["9.85", "CGPA", "var(--yellow)"], ["6×", "Dean's Award", "var(--lime)"], ["1", "Patent Published", "var(--coral-tint)"], ["Top 10", "Deloitte Ideathon", "var(--violet-tint)"]].map(([n, l, c]) => (
                <div key={l} className="brut-card hoverable" style={{ padding:"0.9rem 1.2rem", background: c, boxShadow:"5px 5px 0 var(--ink)", borderRadius:"12px" }}>
                  <div className="grotesk" style={{ fontSize: "1.6rem", fontWeight: 900, lineHeight:1, color:"var(--ink)" }}>{n}</div>
                  <div className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.08em", color: "var(--ink)", marginTop: "0.25rem", fontWeight:800, textTransform:"uppercase" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rv d3 hero-right-card" style={{ width:350, flexShrink:0 }}>
            <TerminalWindow title="aayushi@portfolio — zsh">
              <TermLine cmd="whoami">Aayushi Chhabra — builder @ intersection of AI &amp; Security</TermLine>
              <TermLine cmd="role --live">
                <span className="term-cmd">{typed}</span><span className="term-cursor" />
              </TermLine>
              <TermLine cmd="ls currently-building/">
                <span className="term-warn">Nori/</span> <span className="term-warn">Unified-SecOps/</span> <span className="term-warn">DeepFake-Detector/</span>
              </TermLine>
              <TermLine cmd="cat status.txt">
                <span className="term-ok">✓ open for opportunities</span>
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
  const items = ["Python","Machine Learning","Cybersecurity","RAG Systems","Graphlit","LangChain","FastAPI","FAISS Vector DBs","PyTorch · TensorFlow","Anomaly Detection","Deepfake Detection","Docker · Postgres","Google OAuth2","Streamlit · Plotly","9.85 CGPA","Deloitte Finalist","Ericsson R&D Intern"];
  const all = [...items, ...items];
  return (
    <div className="marquee-bar">
      <div className="marquee-inner">
        {all.map((t,i) => (
          <span key={i} className="mono" style={{ fontSize:"0.8rem", fontWeight:800, letterSpacing:"0.06em", color:"var(--paper)", whiteSpace:"nowrap", textTransform:"uppercase" }}>
            <span style={{ color:"var(--lime)", marginRight:"0.8rem" }}>✦</span>{t}
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="sec-pad bg-sec-yellow">
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.8rem", alignItems:"start" }}>
          <div className="rv d1 brut-card" style={{ padding:"2.3rem", background:"var(--paper)" }}>
            <div className="eyebrow">⬡ About_me.sh</div>
            <h2 className="grotesk" style={{ fontSize:"2rem", fontWeight:900, letterSpacing:"-0.02em", lineHeight:1.2, marginBottom:"1.3rem" }}>
              Building at the intersection of<br />
              <span style={{ color:"var(--coral)", textShadow:"3.5px 3.5px 0 var(--ink)" }}>AI &amp; Security</span>
            </h2>
            <p style={{ fontSize:"0.95rem", color:"var(--ink)", lineHeight:1.9, marginBottom:"1.1rem" }}>
              I'm Aayushi — a Computer Science student at Manipal University Jaipur, maintaining a{" "}
              <span className="mark-coral">9.85 CGPA</span> across 6 semesters. My work spans deep learning, computer vision, and RAG-based AI systems.
            </p>
            <p style={{ fontSize:"0.95rem", color:"var(--ink)", lineHeight:1.9, marginBottom:"1.6rem" }}>
              At Ericsson, I worked on CVE triage, anomaly detection models, and automated incident response pipelines in a production SecOps environment. I am also the Co-Founder of Nori, a production-grade multi-tenant RAG AI platform, and a published patent holder.
            </p>
            <div style={{ display:"flex", gap:"0.7rem", flexWrap:"wrap" }}>
              <a href="mailto:aayushichhabra1010@gmail.com" className="brut-icon-btn" style={{ background:"var(--lime)" }}>
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                Email
              </a>
              <a href="https://linkedin.com/in/aayushi-chhabra-54281a34a" target="_blank" rel="noreferrer" className="brut-icon-btn" style={{ background:"var(--blue-tint)" }}>
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
              <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" className="brut-icon-btn" style={{ background:"var(--violet-tint)" }}>
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub
              </a>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateRows:"auto auto", gap:"1.8rem" }}>
            <div className="rv d2 brut-card hoverable" style={{ padding:"2rem", background:"var(--lime)" }}>
              <div className="eyebrow" style={{ background:"var(--ink)", color:"var(--paper)" }}>📚 Education</div>
              {[
                { school:"Manipal University Jaipur", degree:"B.Tech — Computer Science & Engineering", detail:"CGPA: 9.85  ·  Aug 2023 – Jul 2027", highlight:true },
                { school:"Manav Rachna International School", degree:"Class X: 95%  ·  Class XII: 96%", detail:"2021–2023 · Gurugram, Haryana", highlight:false },
              ].map(({ school, degree, detail, highlight }) => (
                <div key={school} style={{ marginBottom:"0.9rem", paddingBottom:"0.9rem", borderBottom:"2.5px dashed var(--ink)" }}>
                  <div style={{ fontWeight:800, fontSize:"0.95rem", marginBottom:"0.2rem", color: "var(--ink)" }}>{school}</div>
                  <div style={{ fontSize:"0.82rem", color:"var(--ink)", fontWeight:600, marginBottom:"0.2rem" }}>{degree}</div>
                  <div className="mono" style={{ fontSize:"0.68rem", fontWeight:800, color: "var(--ink)" }}>{detail}</div>
                </div>
              ))}
            </div>
            <div className="rv d3 brut-card hoverable" style={{ padding:"2rem", background:"var(--teal)" }}>
              <div className="eyebrow" style={{ background:"var(--ink)", color:"var(--paper)" }}>📜 Patents</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.55rem" }}>
                <div style={{ display:"flex", gap:"0.7rem", alignItems:"center" }}>
                  <span className="chip" style={{ background:"var(--paper)" }}>2026</span>
                  <span style={{ fontSize:"0.84rem", color:"var(--ink)", lineHeight:1.6, fontWeight:700 }}><strong>AI Workflow Management System</strong> — Patent Published</span>
                </div>
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
  { n:"01", year: "2023", title: "Started B.Tech at MUJ", desc: "Began Computer Science & Engineering at Manipal University Jaipur. Maintained a 9.85 CGPA.", icon: "🎓", tint: "var(--coral-tint)" },
  { n:"02", year: "2023", title: "Dean's Excellence Award", desc: "Consistently maintained high academic standing, earning awards for 6 consecutive semesters.", icon: "🏆", tint: "var(--lime)" },
  { n:"03", year: "2024", title: "Promotional Head — Turing Sapiens", desc: "Led promotional activities and technical engagement for the society.", icon: "📢", tint: "var(--yellow)" },
  { n:"04", year: "2025", title: "Deloitte Capstone Ideathon Finalist", desc: "Competed against 200+ teams and secured a Top 10 finish for innovative solution design.", icon: "🎯", tint: "var(--teal)" },
  { n:"05", year: "2025", title: "Ericsson R&D — Cybersecurity & AI Intern", desc: "Conducted CVE triage, anomaly detection, and automated incident response pipelines in a production SecOps environment.", icon: "🔐", tint: "var(--blue-tint)" },
  { n:"06", year: "2026", title: "Patent Published", desc: "Published a patent for an AI Workflow Management System.", icon: "📜", tint: "var(--violet-tint)" },
  { n:"07", year: "2026", title: "Co-Founded Nori", desc: "Engineered a production-grade multi-tenant RAG AI platform with 15,600+ lines of code.", icon: "🚀", tint: "var(--lime)" },
];

function Timeline() {
  const isMobile = useIsMobile();
  return (
    <section id="timeline" className="sec-pad bg-sec-violet" style={{ position: "relative" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="eyebrow rv d1" style={{ background:"var(--yellow)", color:"var(--ink)" }}>// Build Log</div>
        <h2 className="rv d1 grotesk" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, marginBottom: "3.5rem" }}>
          My <span style={{ color:"var(--lime)", textShadow:"3.5px 3.5px 0 var(--ink)" }}>Timeline</span>
        </h2>

        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", left: isMobile ? 16 : "50%", top: 0, bottom: 0, width: 3.5,
            background: "var(--paper)", transform: isMobile ? "none" : "translateX(-50%)",
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
                  width: 16, height: 16, background: "var(--yellow)",
                  border: "3px solid var(--ink)",
                  transform: isMobile ? "none" : "translateX(-50%) rotate(45deg)",
                  zIndex: 2,
                }} />

                <div className="brut-card hoverable" style={{ padding: "1.5rem 1.7rem", width: "100%", background: item.tint, color:"var(--ink)" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.9rem" }}>
                    <span className="grotesk" style={{ fontSize:"1.7rem", fontWeight:900, color:"var(--ink)", opacity:0.4, lineHeight:1 }}>{item.n}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
                        <span style={{ fontSize: "1.3rem" }}>{item.icon}</span>
                        <span className="mono" style={{ fontSize: "0.68rem", fontWeight:800, letterSpacing: "0.12em", color: "var(--ink)", textTransform: "uppercase" }}>{item.year}</span>
                      </div>
                      <h3 className="grotesk" style={{ fontWeight: 800, fontSize: "1.02rem", lineHeight: 1.3, marginBottom:"0.5rem" }}>{item.title}</h3>
                      <p style={{ fontSize: "0.83rem", color: "var(--ink)", lineHeight: 1.7, fontWeight:500 }}>{item.desc}</p>
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
      period:"Jun 2025 – Jul 2025", tint:"var(--paper)",
      bullets:[
        "Conducted CVE triage and vulnerability analysis for AI-assisted threat detection, reducing manual review time by ~40% through automated severity scoring pipelines.",
        "Developed unsupervised anomaly detection models (Isolation Forest, Autoencoders) achieving 91% precision on network intrusion datasets in a production-grade SecOps environment.",
        "Contributed to automated incident response pipelines integrating ML-based alert classification, cutting mean time-to-triage by 35% in simulation benchmarks."
      ],
      tags:["Cybersecurity","AI/ML","CVE Triage","Anomaly Detection","Isolation Forest"]
    }
  ];

  return (
    <section id="experience" className="sec-pad bg-sec-teal">
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="eyebrow rv d1" style={{ background:"var(--ink)", color:"var(--paper)" }}>// Work History</div>
        <h2 className="rv d1 grotesk" style={{ fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:900, letterSpacing:"-0.02em", marginBottom:"2.8rem" }}>
          Work <span style={{ color:"var(--coral)", textShadow:"3.5px 3.5px 0 var(--ink)" }}>History</span>
        </h2>
        <div style={{ display:"flex", flexDirection:"column", gap:"1.6rem" }}>
          {EXP.map(({ role, company, loc, period, tint, bullets, tags }, i) => (
            <div key={company} className={`rv d${i+1} brut-card hoverable`} style={{ padding:"2.2rem", background: tint }}>
              <div className="exp-header" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"0.6rem", marginBottom:"1.2rem" }}>
                <div>
                  <div className="grotesk" style={{ fontWeight:900, fontSize:"1.15rem", marginBottom:"0.25rem" }}>{role}</div>
                  <div style={{ fontSize:"0.9rem", fontWeight:800 }}>{company} · {loc}</div>
                </div>
                <span className="chip" style={{ background:"var(--yellow)", color:"var(--ink)" }}>{period}</span>
              </div>
              <ul style={{ listStyle:"none", marginBottom:"1.2rem", display:"flex", flexDirection:"column", gap:"0.55rem" }}>
                {bullets.map((b,j) => (
                  <li key={j} style={{ fontSize:"0.88rem", color:"var(--ink)", lineHeight:1.75, display:"flex", gap:"0.6rem", fontWeight:500 }}>
                    <span style={{ flexShrink:0, fontWeight:900 }}>→</span>{b}
                  </li>
                ))}
              </ul>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
                {tags.map(t => <span key={t} className="chip" style={{ background:"var(--lime)" }}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── NORI — COLLABORATIVE CONTRIBUTION ─── */
const NORI_TECH = [
  { label: "FastAPI", icon: "⚡" }, { label: "Discord.py", icon: "💬" }, { label: "React", icon: "⚛️" },
  { label: "Graphlit", icon: "🔗" }, { label: "Supabase", icon: "🐘" }, { label: "Redis", icon: "🔴" },
  { label: "Docker", icon: "🐳" }, { label: "ONNX Runtime", icon: "🧠" }, { label: "Groq / Llama 3.1", icon: "🦙" },
  { label: "Oracle Cloud", icon: "☁️" }, { label: "JWT", icon: "🔑" }
];

const NORI_HIGHLIGHTS = [
  { icon: "🏗️", domain: "Architecture", tint:"var(--yellow)", title: "Microservices Ecosystem", desc: "Architected 15,600+ lines of code across 4 microservices for a production-grade Discord RAG platform." },
  { icon: "⚡", domain: "Optimization", tint:"var(--lime)", title: "Sub-10ms Intent Classifier", desc: "Engineered a local ONNX Runtime model with Groq (Llama 3.1) fallback, reducing LLM/RAG API costs by 75%." },
  { icon: "🔐", domain: "Security & Auth", tint:"var(--coral-tint)", title: "Partition-Isolated RAG", desc: "Built secure multi-tenant pipelines via Graphlit API with multi-modal ingestion, Discord OAuth2, and JWT auth." },
];

function NoriContribution() {
  return (
    <section id="nori" className="sec-pad bg-sec-blue">
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="rv d1" style={{ marginBottom:"2.4rem" }}>
          <div className="eyebrow" style={{ background:"var(--lime)", color:"var(--ink)" }}>// A Platform I Helped Build</div>
          <h2 className="grotesk" style={{ fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:900, letterSpacing:"-0.02em", marginBottom:"0.6rem" }}>
            A Platform I Helped <span style={{ color:"var(--yellow)", textShadow:"3.5px 3.5px 0 var(--ink)" }}>Build</span>
          </h2>
          <p className="mono" style={{ fontSize:"0.82rem", color:"var(--paper)", fontWeight:700 }}>
            Co-founded and engineered a production-grade multi-tenant RAG AI platform, leading the implementation of its core AI infrastructure and architecture.
          </p>
        </div>

        <div className="rv d2 brut-card" style={{ boxShadow:"var(--shadow-lg)", overflow:"hidden", background:"var(--paper)" }}>
          <div className="vaultbot-header" style={{ background:"var(--violet)", color:"var(--paper)", borderBottom:"3.5px solid var(--ink)", padding:"2.4rem 2.6rem" }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:"1.2rem", marginBottom:"1.5rem" }}>
              <div>
                <div className="sticker" style={{ background:"var(--yellow)", color:"var(--ink)", marginBottom:"1rem" }}>Co-Founder &amp; Core Engineer</div>
                <h3 className="grotesk" style={{ fontWeight:900, fontSize:"clamp(2.4rem,4.5vw,3.5rem)", letterSpacing:"-0.03em", lineHeight:1.1, marginBottom:"0.6rem", color:"var(--lime)", textShadow:"3.5px 3.5px 0 var(--ink)" }}>
                  Nori
                </h3>
                <p className="mono" style={{ fontSize:"0.85rem", fontWeight:800, letterSpacing:"0.03em", marginBottom:"0.7rem", color:"var(--paper)" }}>
                  Production-Grade Multi-Tenant RAG AI Platform
                </p>
                <p style={{ fontSize:"0.92rem", color:"var(--paper)", lineHeight:1.9, maxWidth:620 }}>
                  A full-stack, multi-service AI platform bringing server-specific, context-aware intelligence to Discord communities. As <strong>Co-Founder &amp; Core Engineer</strong>, I played a key role in building and scaling the platform, orchestrating the microservices architecture, optimizing CPU intent classification, and engineering the isolated RAG pipelines.
                </p>
                <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap", marginTop:"1.3rem" }}>
                  <span className="chip" style={{ background:"var(--lime)", color:"var(--ink)" }}>🧠 AI</span>
                  <span className="chip" style={{ background:"var(--yellow)", color:"var(--ink)" }}>🔧 Backend</span>
                  <span className="chip" style={{ background:"var(--coral)", color:"var(--paper)" }}>🚀 Cloud</span>
                </div>
              </div>

              <div className="vault-stats-container" style={{ display:"flex", flexDirection:"column", gap:"0.7rem", minWidth:165 }}>
                <div className="brut-card hoverable" style={{ padding:"1rem 1.1rem", textAlign:"center", background:"var(--lime)", color:"var(--ink)" }}>
                  <div className="grotesk" style={{ fontWeight:900, fontSize:"2rem", letterSpacing:"-0.02em", lineHeight:1 }}>15.6k+</div>
                  <div className="mono" style={{ fontSize:"0.6rem", color:"var(--ink)", textTransform:"uppercase", letterSpacing:"0.08em", marginTop:"0.3rem", fontWeight:800 }}>Lines of Code</div>
                </div>
                <div className="brut-card hoverable" style={{ padding:"1rem 1.1rem", textAlign:"center", background:"var(--yellow)", color:"var(--ink)" }}>
                  <div className="grotesk" style={{ fontWeight:900, fontSize:"1.4rem", lineHeight:1 }}>4</div>
                  <div className="mono" style={{ fontSize:"0.6rem", color:"var(--ink)", textTransform:"uppercase", letterSpacing:"0.08em", marginTop:"0.3rem", fontWeight:800 }}>Microservices</div>
                </div>
                <div className="brut-card hoverable" style={{ padding:"1rem 1.1rem", textAlign:"center", background:"var(--coral-tint)", color:"var(--ink)" }}>
                  <div className="grotesk" style={{ fontWeight:900, fontSize:"1.4rem", lineHeight:1 }}>75%</div>
                  <div className="mono" style={{ fontSize:"0.6rem", color:"var(--ink)", textTransform:"uppercase", letterSpacing:"0.08em", marginTop:"0.3rem", fontWeight:800 }}>API Cost Reduction</div>
                </div>
              </div>
            </div>

            <div style={{ display:"flex", gap:"0.55rem", flexWrap:"wrap" }}>
              {NORI_TECH.map(({label, icon}) => (
                <span key={label} className="chip" style={{ background:"var(--paper)", color:"var(--ink)", fontWeight:700 }}>
                  <span style={{ marginRight:"0.35rem" }}>{icon}</span>{label}
                </span>
              ))}
            </div>
          </div>

          <div className="vaultbot-body" style={{ padding:"2.6rem" }}>
            <div style={{ marginBottom:"2.4rem" }}>
              <div className="eyebrow" style={{ background:"var(--ink)", color:"var(--paper)" }}>// What I Contributed</div>
              <div className="vault-highlight-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:"1.2rem" }}>
                {NORI_HIGHLIGHTS.map((h) => (
                  <div key={h.title} className="brut-card hoverable" style={{ background: h.tint, padding:"1.4rem", color:"var(--ink)" }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"0.75rem" }}>
                      <span style={{ fontSize:"1.4rem" }}>{h.icon}</span>
                      <span className="chip" style={{ background:"var(--paper)", fontSize:"0.62rem" }}>{h.domain}</span>
                    </div>
                    <div className="grotesk" style={{ fontWeight:800, fontSize:"0.95rem", marginBottom:"0.4rem" }}>{h.title}</div>
                    <div style={{ fontSize:"0.83rem", color:"var(--ink)", lineHeight:1.7, fontWeight:500 }}>{h.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <TerminalWindow title="aayushi@nori — contributors">
              <TermLine cmd="cat TEAM.md">
                <span style={{ display:"block" }}><span className="term-ok">Aayushi Chhabra  →  Co-Founder & Architect</span></span>
              </TermLine>
              <TermLine cmd={<>git log --author="Aayushi" --stat<span className="term-cursor" /></>}>
                onnx intent classifier · graphlit ingestion · oauth2 …
              </TermLine>
            </TerminalWindow>

            <div style={{ display:"flex", gap:"0.8rem", flexWrap:"wrap", marginTop:"2rem" }}>
              <a href="#" target="_blank" rel="noreferrer" className="brut-btn brut-btn-coral" style={{ fontSize:"0.78rem" }}>
                View Live Platform ↗
              </a>
              <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" className="brut-btn brut-btn-yellow" style={{ fontSize:"0.78rem" }}>
                View on GitHub ↗
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
    num:"01", name:"Nori",
    tagline:"Production-grade multi-tenant RAG AI platform for Discord",
    category:"AI · Backend · Full Stack", tint:"var(--violet)", textColor:"var(--paper)",
    tech:["FastAPI","Discord.py","React","Graphlit","Supabase","Redis","Docker"],
    highlights:[
      "Engineered a sub-10ms CPU intent classifier via a local ONNX Runtime model with Groq fallback, reducing LLM/RAG API costs by 75%.",
      "Built a partition-isolated RAG pipeline through Graphlit API with multi-modal ingestion.",
      "Architected 15,600+ lines of code across 4 microservices with Discord OAuth2 & JWT auth."
    ],
    link:"#nori",
  },
  {
    num:"02", name:"Unified Cybersecurity Platform",
    tagline:"AI-driven SecOps ecosystem integrating RAG-powered incident guidance & anomaly detection",
    category:"AI/ML · Security", tint:"var(--coral)", textColor:"var(--paper)",
    tech:["Python","Streamlit","LangChain","Gemini","FAISS","Plotly"],
    highlights:[
      "Built an AI-driven SecOps ecosystem integrating RAG-powered incident guidance, network attack analytics, and ML-based anomaly detection, achieving 93% accuracy.",
      "Leveraged FAISS vector databases with Google Gemini embeddings for semantic search over threat intelligence corpora, reducing containment recommendation latency by 60%.",
      "Deployed on Streamlit Cloud with interactive Plotly dashboards serving live threat telemetry across 5+ attack categories."
    ],
    link:"https://github.com/aayushichhabra",
  },
  {
    num:"03", name:"DeepFake Detection System",
    tagline:"End-to-end deepfake detection pipeline using EfficientNetB0 with transfer learning",
    category:"AI/ML · Computer Vision", tint:"var(--teal)", textColor:"var(--ink)",
    tech:["Python","PyTorch","EfficientNetB0","Grad-CAM","OpenCV","Scikit-learn"],
    highlights:[
      "Built an end-to-end deepfake detection pipeline using EfficientNetB0 with transfer learning, achieving 96.4% binary classification accuracy.",
      "Integrated Grad-CAM explainability heatmaps to visually highlight manipulated facial regions, reducing review time by 50%.",
      "Applied data augmentation and fine-tuning strategies that improved generalization across four deepfake generation methods."
    ],
    link:"https://github.com/aayushichhabra/DeepFakeImageDetection",
  }
];

function ProjectCard({ p, i }) {
  return (
    <div className="rv d1 brut-card hoverable" style={{ gridColumn:"1/-1", padding:"2.5rem", background: p.tint, color: p.textColor }}>
      <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2.5rem", alignItems:"start" }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1.1rem", flexWrap:"wrap" }}>
            <span className="sticker" style={{ background:"var(--yellow)", color:"var(--ink)" }}>#{p.num} · Featured</span>
            <span className="mono" style={{ fontSize:"0.68rem", fontWeight:800 }}>{p.category}</span>
          </div>
          <h3 className="grotesk" style={{ fontSize:"1.75rem", fontWeight:900, marginBottom:"0.7rem", letterSpacing:"-0.02em", lineHeight:1.25 }}>{p.name}</h3>
          <p style={{ fontSize:"0.92rem", lineHeight:1.85, marginBottom:"1.6rem", fontWeight:500 }}>{p.tagline}</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.45rem", marginBottom:"1.8rem" }}>
            {p.tech.map(t => <span key={t} className="chip" style={{ background:"var(--paper)", color:"var(--ink)" }}>{t}</span>)}
          </div>
          <a href={p.link} target="_blank" rel="noreferrer" className="brut-btn brut-btn-yellow" style={{ fontSize:"0.78rem" }}>View Project →</a>
        </div>
        <div className="brut-card" style={{ background:"var(--paper)", color:"var(--ink)", padding:"1.6rem" }}>
          <div className="eyebrow" style={{ marginBottom:"1.1rem" }}>// Key Features</div>
          <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"0.8rem" }}>
            {p.highlights.map((h,j) => (
              <li key={j} style={{ fontSize:"0.84rem", color:"var(--ink)", lineHeight:1.7, display:"flex", gap:"0.6rem", fontWeight:500 }}>
                <span style={{ flexShrink:0, fontSize:"0.7rem", marginTop:"0.2rem", fontWeight:900 }}>◆</span>{h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="sec-pad bg-sec-cream">
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"1rem", marginBottom:"2.8rem" }}>
          <div>
            <div className="eyebrow rv d1">// Selected Work</div>
            <h2 className="rv d1 grotesk" style={{ fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:900, letterSpacing:"-0.02em" }}>
              Featured <span style={{ color:"var(--coral)", textShadow:"3.5px 3.5px 0 var(--ink)" }}>Work</span>
            </h2>
          </div>
          <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" className="brut-btn brut-btn-lime" style={{ fontSize:"0.75rem" }}>View All on GitHub ↗</a>
        </div>
        <div className="projects-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(310px,1fr))", gap:"1.6rem" }}>
          {PROJECTS.map((p,i) => <ProjectCard key={p.num} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ─── */
const SKILL_GROUPS = [
  { label:"Deep Learning & CV", items:["PyTorch","TensorFlow Lite","OpenCV","EfficientNetB0","Grad-CAM","Transfer Learning","CNNs","Autoencoders"], tint:"var(--coral)", icon:"👁️" },
  { label:"Generative AI & RAG", items:["LangChain","Google Gemini API","FAISS","Hugging Face","Vector Databases","Prompt Engineering","Semantic Search"], tint:"var(--yellow)", icon:"🧠" },
  { label:"Machine Learning", items:["Supervised & Unsupervised Learning","Anomaly Detection","Model Evaluation","Scikit-learn","Pandas","NumPy"], tint:"var(--violet)", icon:"📊" },
  { label:"Backend & Deployment", items:["FastAPI","Redis","Docker Compose","nginx","BullMQ","REST APIs","Streamlit","Gradio"], tint:"var(--teal)", icon:"☁️" },
  { label:"Programming & CS", items:["Python","Java","JavaScript","Git","Data Structures & Algorithms"], tint:"var(--blue-tint)", icon:"⌨️" },
  { label:"Databases", items:["SQL","Supabase Postgres","Firebase","Redis","FAISS (Vector DB)","SQLAlchemy"], tint:"var(--lime-tint)", icon:"🗃️" },
];

const SKILL_BARS = [
  { name:"Deep Learning & Computer Vision", pct:88, col:"#FF4D4D" },
  { name:"Generative AI & RAG",            pct:87, col:"#1769E8" },
  { name:"Machine Learning & Data Science",pct:84, col:"#7C3AED" },
  { name:"Backend & APIs (FastAPI/REST)",  pct:82, col:"#FF8800" },
  { name:"Programming (Python/Java)",      pct:85, col:"#2DD4BF" },
  { name:"Databases & Cloud Deployment",   pct:80, col:"#FF4D4D" },
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
    <div ref={ref} style={{ marginBottom:"1.3rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.55rem" }}>
        <span className="mono" style={{ fontSize:"0.84rem", fontWeight:800, color:"var(--ink)" }}>{name}</span>
        <span className="chip" style={{ background: col, color:"var(--paper)", fontSize:"0.7rem" }}>{pct}%</span>
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
    <section id="skills" className="sec-pad bg-sec-lime">
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="skills-tab-row" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"1rem", marginBottom:"2.6rem" }}>
          <div>
            <div className="eyebrow rv d1" style={{ background:"var(--ink)", color:"var(--paper)" }}>// Skillset</div>
            <h2 className="rv d1 grotesk" style={{ fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:900, letterSpacing:"-0.02em" }}>
              Technical <span style={{ color:"var(--violet)", textShadow:"3.5px 3.5px 0 var(--ink)" }}>Toolkit</span>
            </h2>
          </div>
          <div style={{ display:"flex", gap:"0.6rem" }}>
            {[["tags","By Domain"],["bars","Proficiency"]].map(([k,l]) => (
              <button key={k} onClick={() => setTab(k)} className="mono" style={{
                padding:"0.55rem 1.1rem", borderRadius:"9px", border:"3px solid var(--ink)",
                background: tab===k ? "var(--ink)" : "var(--paper)",
                color: tab===k ? "var(--paper)" : "var(--ink)",
                cursor:"pointer", fontSize:"0.74rem", fontWeight:800, letterSpacing:"0.04em",
                boxShadow: tab===k ? "none" : "4px 4px 0 var(--ink)",
              }}>{l}</button>
            ))}
          </div>
        </div>

        {tab === "tags" && (
          <div className="skills-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.4rem" }}>
            {SKILL_GROUPS.map(({ label, items, tint, icon }, i) => (
              <div key={label} className={`rv d${i+1} brut-card hoverable`} style={{ padding:"1.8rem", background: tint, color: tint.includes("violet") || tint.includes("coral") ? "var(--paper)" : "var(--ink)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"1.1rem" }}>
                  <span style={{ fontSize:"1.3rem" }}>{icon}</span>
                  <span className="grotesk" style={{ fontSize:"0.95rem", fontWeight:900 }}>{label}</span>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.45rem" }}>
                  {items.map(t => (
                    <span key={t} className="chip" style={{ background:"var(--paper)", color:"var(--ink)", fontWeight:700 }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "bars" && (
          <div className="bars-grid brut-card" style={{ padding:"2.2rem 2.4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 3.8rem", background:"var(--paper)" }}>
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
    { icon:"📜", title:"Patent Published", desc:"AI Workflow Management System (2026).", tint:"var(--paper)" },
    { icon:"🏆", title:"Dean's Excellence Award", desc:"Manipal University Jaipur (2023 - Present) - 6 consecutive semesters.", tint:"var(--yellow)" },
    { icon:"🎯", title:"Deloitte Capstone Ideathon Finalist", desc:"Ranked Top 10 out of 200+ teams (2025).", tint:"var(--lime)" },
    { icon:"📡", title:"Promotional Head — Turing Sapiens", desc:"Technical Society (2024).", tint:"var(--teal)" },
  ];
  return (
    <section id="achievements" className="sec-pad bg-sec-coral">
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="eyebrow rv d1" style={{ background:"var(--yellow)", color:"var(--ink)" }}>// Recognition</div>
        <h2 className="rv d1 grotesk" style={{ fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:900, letterSpacing:"-0.02em", marginBottom:"2.8rem" }}>
          Milestones &amp; <span style={{ color:"var(--yellow)", textShadow:"3.5px 3.5px 0 var(--ink)" }}>Awards</span>
        </h2>
        <div className="achievements-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"1.4rem", marginBottom:"2.6rem" }}>
          {items.map(({ icon, title, desc, tint }, i) => (
            <div key={title} className={`rv d${i+1} brut-card hoverable`} style={{ padding:"2.1rem", background: tint, color:"var(--ink)" }}>
              <div style={{ fontSize:"2.2rem", marginBottom:"1rem" }}>{icon}</div>
              <h3 className="grotesk" style={{ fontWeight:900, fontSize:"0.98rem", marginBottom:"0.55rem" }}>{title}</h3>
              <p style={{ fontSize:"0.84rem", color:"var(--ink)", lineHeight:1.75, fontWeight:500 }}>{desc}</p>
            </div>
          ))}
        </div>
        <div className="rv d5 cgpa-banner brut-card hoverable" style={{ background:"var(--yellow)", color:"var(--ink)", padding:"2.5rem 3.2rem", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"2rem" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom:"0.6rem", background:"var(--ink)", color:"var(--paper)" }}>Academic Standing</div>
            <div className="grotesk" style={{ fontSize:"4.2rem", fontWeight:900, lineHeight:1, color:"var(--coral)", textShadow:"4px 4px 0 var(--ink)" }}>9.85</div>
            <div className="mono" style={{ fontSize:"0.72rem", color:"var(--ink)", marginTop:"0.5rem", fontWeight:800 }}>CGPA · Manipal University Jaipur</div>
          </div>
          <div className="cgpa-stats" style={{ display:"flex", gap:"1.1rem", flexWrap:"wrap" }}>
            {[["6×","Dean's Award"],["1","Patent Published"],["Top 10","Deloitte Ideathon"]].map(([n,l]) => (
              <div key={l} className="brut-card hoverable" style={{ textAlign:"center", padding:"1.1rem 1.4rem", background:"var(--paper)", color:"var(--ink)" }}>
                <div className="grotesk" style={{ fontSize:"1.8rem", fontWeight:900 }}>{n}</div>
                <div className="mono" style={{ fontSize:"0.62rem", color:"var(--ink)", marginTop:"0.25rem", letterSpacing:"0.06em", fontWeight:800 }}>{l}</div>
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
    <section id="contact" className="sec-pad bg-sec-ink" style={{ position:"relative" }}>
      <div style={{ maxWidth:750, margin:"0 auto", textAlign:"center", position:"relative" }}>
        <h2 className="rv d1 grotesk" style={{ fontSize:"clamp(2.5rem,5.5vw,4rem)", fontWeight:900, letterSpacing:"-0.03em", marginBottom:"1.3rem", lineHeight:1.1 }}>
          Let's <span style={{ color:"var(--lime)", textShadow:"3.5px 3.5px 0 var(--violet)" }}>Connect</span>
        </h2>
        <p className="rv d2" style={{ fontSize:"0.98rem", color:"#D5D5DC", lineHeight:1.95, marginBottom:"2.6rem" }}>
          Open to internship opportunities, research collaborations, and interesting projects in AI, cybersecurity, and full-stack development.
        </p>

        <div className="rv d3 contact-email-row" style={{ display:"flex", alignItems:"center", gap:"0.9rem", justifyContent:"center", marginBottom:"2.2rem", flexWrap:"wrap" }}>
          <span className="mono contact-email-text" style={{ fontSize:"0.92rem", color:"var(--paper)", letterSpacing:"0.02em", fontWeight:700 }}>{email}</span>
          <button onClick={() => { navigator.clipboard.writeText(email); setCopied(true); setTimeout(()=>setCopied(false),2000); }}
            className="chip" style={{ background: copied ? "var(--teal)" : "var(--lime)", color:"var(--ink)", cursor:"pointer", fontSize:"0.72rem" }}>
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
        <div className="rv d4 contact-socials" style={{ display:"flex", justifyContent:"center", gap:"0.7rem", flexWrap:"wrap", marginBottom:"2.6rem" }}>
          {[
            { label:"LinkedIn", url:"https://linkedin.com/in/aayushi-chhabra-54281a34a", icon:<svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
            { label:"GitHub", url:"https://github.com/aayushichhabra", icon:<svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg> },
            { label:"LeetCode", url:"https://leetcode.com/u/aayushichhabra", icon:<svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg> },
          ].map(({ label, url, icon }) => (
            <a key={label} href={url} target="_blank" rel="noreferrer" className="brut-icon-btn" style={{ background:"var(--ink)", color:"var(--paper)", borderColor:"var(--paper)", boxShadow:"4px 4px 0 var(--yellow)" }}>{icon}{label}</a>
          ))}
        </div>
        <div className="rv d5 contact-btns" style={{ display:"flex", gap:"0.9rem", justifyContent:"center", flexWrap:"wrap" }}>
          <a href="mailto:aayushichhabra1010@gmail.com" className="brut-btn brut-btn-lime">
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
            Send a Message
          </a>
          <a href="https://linkedin.com/in/aayushi-chhabra-54281a34a" target="_blank" rel="noreferrer" className="brut-btn" style={{ background:"var(--yellow)", color:"var(--ink)", borderColor:"var(--ink)", boxShadow:"6px 6px 0 var(--coral)" }}>
            LinkedIn Profile →
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop:"3.5px solid var(--ink)", padding:"2rem 2.5rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem", background:"var(--teal)", color:"var(--ink)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"0.9rem" }}>
        <span className="grotesk" style={{ fontWeight:900, fontSize:"0.95rem", color:"var(--ink)" }}>AAYUSHI_CHHABRA</span>
        <span className="mono" style={{ fontSize:"0.65rem", color:"var(--ink)", fontWeight:700 }}>B.Tech CSE · MUJ · 2027</span>
      </div>
      <div className="chip" style={{ background:"var(--yellow)", color:"var(--ink)" }}>
        <span style={{ width:7, height:7, borderRadius:"50%", background:"var(--coral)", display:"inline-block", marginRight:"0.45rem" }} />
        All Systems Operational
      </div>
      <div className="mono" style={{ fontSize:"0.65rem", color:"var(--ink)", letterSpacing:"0.03em", fontWeight:700 }}>
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
        <NoriContribution />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}