import { useState, useEffect, useRef } from "react";

/* ─── GLOBAL STYLES ─── */
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');

  :root {
    --bg:       #000000;
    --bg2:      #050505;
    --card:     rgba(255,255,255,0.03);
    --card-b:   rgba(255,255,255,0.06);
    --ink:      #f5f0f0;
    --ink2:     #9e8e8e;
    --rose:     #f43f5e;
    --rose2:    #fda4af;
    --rose3:    #ffe4e6;
    --blush:    #fb7185;
    --mauve:    #c084fc;
    --mauve2:   #e9d5ff;
    --coral:    #fb923c;
    --mint:     #34d399;
    --sky:      #38bdf8;
    --line:     rgba(244,63,94,0.08);
    --glow-r:   rgba(244,63,94,0.15);
    --glow-m:   rgba(192,132,252,0.12);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    font-family: 'Outfit', sans-serif;
    color: var(--ink);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--rose); border-radius: 3px; }

  .serif  { font-family: 'Playfair Display', Georgia, serif; }
  .mono   { font-family: 'DM Mono', monospace; }
  .sans   { font-family: 'Outfit', sans-serif; }

  @keyframes fadeUp   { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes shimmer  { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.4} }
  @keyframes glow     { 0%,100%{text-shadow:0 0 30px rgba(244,63,94,0.3)} 50%{text-shadow:0 0 60px rgba(244,63,94,0.6),0 0 100px rgba(244,63,94,0.2)} }
  @keyframes lineIn   { from{width:0} to{width:100%} }
  @keyframes spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes marquee  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes scanY    { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
  @keyframes cardHov  { from{transform:translateY(0)} to{transform:translateY(-6px)} }
  @keyframes ringFill { from{stroke-dashoffset:314} to{stroke-dashoffset:var(--target)} }
  @keyframes barFill  { from{width:0} to{width:var(--w)} }
  @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }

  .rv { opacity:0; transform:translateY(24px); transition:opacity 0.7s ease, transform 0.7s ease; }
  .rv.on { opacity:1; transform:translateY(0); }
  .d1 { transition-delay:0.1s; } .d2 { transition-delay:0.2s; }
  .d3 { transition-delay:0.3s; } .d4 { transition-delay:0.4s; }
  .d5 { transition-delay:0.5s; }

  .rose-grad { background: linear-gradient(135deg, var(--rose) 0%, var(--rose2) 50%, var(--blush) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .mauve-grad { background: linear-gradient(135deg, var(--mauve) 0%, var(--mauve2) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

  .glass {
    background: var(--card);
    backdrop-filter: blur(12px);
    border: 1px solid var(--card-b);
  }

  .chip-r {
    display: inline-block;
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem;
    padding: 0.25rem 0.7rem;
    border-radius: 2px;
    background: rgba(244,63,94,0.08);
    color: var(--rose2);
    border: 1px solid rgba(244,63,94,0.2);
    letter-spacing: 0.02em;
    transition: all 0.2s;
  }
  .chip-r:hover { background:rgba(244,63,94,0.15); border-color:var(--rose); }

  .chip-m {
    display: inline-block;
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem;
    padding: 0.25rem 0.7rem;
    border-radius: 2px;
    background: rgba(192,132,252,0.06);
    color: var(--mauve2);
    border: 1px solid rgba(192,132,252,0.18);
    letter-spacing: 0.02em;
    transition: all 0.2s;
  }
  .chip-m:hover { background:rgba(192,132,252,0.14); border-color:var(--mauve); }

  .card {
    background: var(--card);
    border: 1px solid var(--card-b);
    backdrop-filter: blur(8px);
    transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
  }
  .card:hover {
    border-color: rgba(244,63,94,0.25);
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(244,63,94,0.06);
  }

  .nav-link {
    position: relative;
    text-decoration: none;
    font-size: 0.8rem;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.08em;
    color: var(--ink2);
    transition: color 0.2s;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -3px; left: 0;
    width: 0; height: 1px;
    background: var(--rose);
    transition: width 0.3s ease;
  }
  .nav-link:hover { color: var(--rose2); }
  .nav-link:hover::after { width: 100%; }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.8rem 2rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.78rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: linear-gradient(135deg, var(--rose), #be123c);
    color: #ffffff;
    font-weight: 600;
    border: none;
    cursor: pointer;
    text-decoration: none;
    border-radius: 2px;
    transition: filter 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(244,63,94,0.3);
  }
  .btn-primary:hover { filter:brightness(1.15); transform:translateY(-2px); box-shadow:0 8px 30px rgba(244,63,94,0.4); }

  .btn-ghost {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.78rem 1.8rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.78rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: transparent;
    color: var(--rose2);
    border: 1px solid rgba(244,63,94,0.35);
    cursor: pointer;
    text-decoration: none;
    border-radius: 2px;
    transition: all 0.2s;
  }
  .btn-ghost:hover { background:rgba(244,63,94,0.06); border-color:var(--rose); color:var(--rose); }

  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--rose);
    display: flex; align-items: center; gap: 0.8rem;
    margin-bottom: 1.2rem;
  }
  .section-label::before {
    content: '';
    display: block;
    width: 24px; height: 1px;
    background: var(--rose);
  }

  .sec-pad { padding: 7rem 4rem; }
  @media(max-width:768px) {
    .sec-pad { padding: 5rem 1.5rem !important; }
    .grid2   { grid-template-columns: 1fr !important; }
    .grid3   { grid-template-columns: 1fr !important; }
    .hero-layout { flex-direction: column !important; }
    .hide-m  { display: none !important; }
    .hero-name { font-size: clamp(2.5rem,12vw,5rem) !important; }
    .nav-links { display: none !important; }
    .show-m { display: block !important; }
    .tl-section-grid { grid-template-columns: 1fr !important; }
    .tl-center-line { left: 20px !important; }
    .tl-item { padding-left: 50px !important; padding-right: 0 !important; }
    .tl-item-right { padding-left: 50px !important; padding-right: 0 !important; text-align: left !important; }
    .tl-dot { left: 14px !important; right: auto !important; }
  }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(244,63,94,0.2), transparent);
    margin: 0;
  }

  /* Noise grain overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.25;
  }

  .scroll-bar {
    position: fixed; top: 0; left: 0; height: 2px;
    background: linear-gradient(90deg, var(--rose), var(--mauve));
    z-index: 9998;
    transition: width 0.05s linear;
    box-shadow: 0 0 8px var(--rose);
  }

  /* Timeline line */
  .tl-line {
    position: absolute;
    left: 11px; top: 0; bottom: 0;
    width: 1px;
    background: linear-gradient(180deg, var(--rose), transparent);
  }

  .stat-number {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    font-weight: 900;
    color: var(--rose2);
    line-height: 1;
    animation: glow 3s ease-in-out infinite;
  }

  @keyframes floatBg {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    50%      { transform: translateY(-30px) rotate(3deg); }
  }

  .progress-sidebar {
    position: fixed; right: 2rem; top: 50%; transform: translateY(-50%);
    display: flex; flex-direction: column; gap: 0.5rem;
    z-index: 800;
  }
  .prog-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: rgba(244,63,94,0.2);
    cursor: pointer;
    transition: all 0.2s;
  }
  .prog-dot.active { background: var(--rose); box-shadow: 0 0 8px var(--rose); }

  .mob-menu {
    display: none;
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.97);
    z-index: 700;
    flex-direction: column;
    align-items: center; justify-content: center;
    gap: 2rem;
    backdrop-filter: blur(20px);
  }
  .mob-menu.open { display: flex; }
  .mob-menu a {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    color: var(--ink);
    text-decoration: none;
    transition: color 0.2s;
  }
  .mob-menu a:hover { color: var(--rose2); }

  .tag-row { display:flex; flex-wrap:wrap; gap:0.4rem; }

  @keyframes petalFloat {
    0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0; }
    10% { opacity: 0.6; }
    90% { opacity: 0.6; }
    100% { transform: translateY(-100vh) rotate(720deg) scale(0.3); opacity: 0; }
  }
`;

/* ─── SCROLL PROGRESS ─── */
function ScrollBar() {
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

/* ─── REVEAL HOOK ─── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); });
    }, { threshold: 0.12 });
    document.querySelectorAll(".rv").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── SECTION PROGRESS ─── */
function SectionProgress() {
  const SECS = ["hero","about","timeline","experience","projects","skills","achievements","contact"];
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.2 });
    SECS.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <div className="progress-sidebar hide-m">
      {SECS.map(s => (
        <div key={s} className={`prog-dot${active === s ? " active" : ""}`}
          title={s.toUpperCase()}
          onClick={() => document.getElementById(s)?.scrollIntoView({ behavior: "smooth" })}
        />
      ))}
    </div>
  );
}

/* ─── NAV ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [["about","About"],["timeline","Journey"],["experience","Exp"],["projects","Projects"],["skills","Skills"],["achievements","Awards"],["contact","Contact"]];
  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 600,
        padding: "1.2rem 4rem",
        background: scrolled ? "rgba(0,0,0,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(244,63,94,0.08)" : "none",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.4s ease",
      }}>
        <a href="#hero" style={{ textDecoration: "none" }}>
          <span className="serif" style={{ fontSize: "1.1rem", fontStyle: "italic", color: "var(--rose2)", fontWeight: 700 }}>AC</span>
          <span className="mono" style={{ fontSize: "0.65rem", color: "var(--ink2)", marginLeft: "0.5rem", letterSpacing: "0.15em" }}>PORTFOLIO</span>
        </a>
        <div className="nav-links" style={{ display: "flex", gap: "2.5rem" }}>
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="nav-link">{label}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <a href="mailto:aayushichhabra1010@gmail.com" className="btn-primary" style={{ padding: "0.55rem 1.2rem", fontSize: "0.72rem" }}>Hire Me</a>
  
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "var(--ink)", padding: "0.3rem" }}
            className="show-m"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </nav>
      <div className={`mob-menu${menuOpen ? " open" : ""}`}>
        <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "2rem", right: "2rem", background: "none", border: "1px solid var(--card-b)", color: "var(--ink)", cursor: "pointer", padding: "0.5rem 0.8rem", borderRadius: "2px", fontSize: "0.9rem" }}>✕</button>
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
      </div>
    </>
  );
}

/* ─── HERO ─── */
function Hero() {
  const [typed, setTyped] = useState("");
  const words = ["Cybersecurity & AI Intern", "ML Engineer", "Android Developer", "Productivity AI Builder", "Deepfake Detection Researcher", "Full Stack Developer"];
  useEffect(() => {
    let wi = 0, idx = 0, dir = 1;
    const iv = setInterval(() => {
      const w = words[wi % words.length];
      setTyped(dir === 1 ? w.slice(0, idx + 1) : w.slice(0, idx));
      if (dir === 1) { idx++; if (idx === w.length) dir = -1; }
      else { idx--; if (idx < 0) { dir = 1; idx = 0; wi++; } }
    }, 75);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="hero" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      padding: "8rem 4rem 5rem",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-20%", left: "60%", width: 600, height: 600, background: "radial-gradient(circle, rgba(244,63,94,0.07) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(192,132,252,0.04) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(244,63,94,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(244,63,94,0.02) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", gap: "4rem", alignItems: "center", flexWrap: "wrap" }} className="hero-layout">
          {/* LEFT */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <div className="rv" style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
              <div className="mono" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "var(--rose)", textTransform: "uppercase" }}>
                3rd Year CSE · MUJ · 2023–2027
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.3rem 0.8rem", background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: "2px" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 8px #34d399", animation: "pulse 2s ease infinite" }} />
                <span className="mono" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", color: "#34d399" }}>OPEN TO WORK</span>
              </div>
            </div>

            <div className="rv d1">
              <h1 className="hero-name serif" style={{ fontSize: "clamp(3rem,8vw,6rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
                Aayushi<br />
                <span className="rose-grad">Chhabra</span>
              </h1>
            </div>

            <div className="rv d2" style={{ height: 36, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="mono" style={{ fontSize: "0.95rem", color: "var(--rose2)" }}>{typed}</span>
              <span style={{ width: 2, height: 20, background: "var(--rose)", animation: "blink 1s step-end infinite" }} />
            </div>

            <p className="rv d3" style={{ fontSize: "0.95rem", color: "var(--ink2)", lineHeight: 1.8, maxWidth: 540, marginBottom: "2.5rem" }}>
              Third-year B.Tech CSE student at Manipal University Jaipur with a <span style={{ color: "var(--rose2)" }}>9.88 CGPA</span>.
              Industry experience at <span style={{ color: "var(--rose2)" }}>Ericsson</span> in Cybersecurity & AI.
              Finalist at <span style={{ color: "var(--rose2)" }}>Deloitte Capstone Ideathon</span> (200+ teams).
              Dean's Excellence Award recipient — 5 consecutive semesters.
            </p>

            <div className="rv d4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="mailto:aayushichhabra1010@gmail.com" className="btn-primary">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                Get In Touch
              </a>
              <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" className="btn-ghost">
                GitHub ↗️
              </a>
            </div>
            <div className="rv d5" style={{ display: "flex", gap: "2.5rem", marginTop: "3.5rem", flexWrap: "wrap" }}>
              {[["9.88", "CGPA"], ["5×", "Dean's Award"], ["6+", "Projects Built"], ["200+", "Teams Beaten"]].map(([n, l]) => (
                <div key={l}>
                  <div className="stat-number" style={{ fontSize: "1.8rem" }}>{n}</div>
                  <div className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.15em", color: "var(--ink2)", marginTop: "0.2rem" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — decorative card */}
          <div className="rv d3 hide-m" style={{ width: 340 }}>
            <div className="glass" style={{ borderRadius: "4px", padding: "2rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, var(--rose), var(--mauve), var(--rose))" }} />
              <div className="serif" style={{ fontSize: "0.75rem", fontStyle: "italic", color: "var(--rose)", marginBottom: "1.2rem", letterSpacing: "0.05em" }}>// Currently Working On</div>

              {[
                { title: "ResQNet", desc: "Cross-platform crisis mgmt. w/ BLE & offline-first tech", tech: "React Native · Supabase", col: "var(--mauve)" },
                { title: "StyleVault", desc: "AI men's fashion app — wardrobe mgmt. & outfit suggestions", tech: "Kotlin · Firebase · Gemini", col: "var(--sky)" },
                { title: "CVE Agent", desc: "Agentic CVE triage + dependency scanner with LangGraph", tech: "LangGraph · NIST NVD · Gemini", col: "var(--blush)" },
              ].map(({ title, desc, tech, col }) => (
                <div key={title} style={{ marginBottom: "1.3rem", paddingBottom: "1.3rem", borderBottom: "1px solid var(--line)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: col, boxShadow: `0 0 6px ${col}` }} />
                    <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{title}</span>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "var(--ink2)", lineHeight: 1.6, marginBottom: "0.4rem" }}>{desc}</p>
                  <span className="mono" style={{ fontSize: "0.65rem", color: col, opacity: 0.8 }}>{tech}</span>
                </div>
              ))}

              <div className="mono" style={{ fontSize: "0.65rem", color: "var(--ink2)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ color: "#34d399", animation: "pulse 2s infinite" }}>●</span> Gurugram, Haryana, India
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to bottom, transparent, var(--bg))", pointerEvents: "none" }} />
    </section>
  );
}

/* ─── TICKER MARQUEE ─── */
function Ticker() {
  const items = ["Python · C · Java · JavaScript","Machine Learning","Cybersecurity","RAG Systems","React Native","LangChain","LangGraph Agents","FAISS Vector Databases","PyTorch · TensorFlow","Anomaly Detection","Deepfake Detection","Kotlin · Android","Whisper STT","Google OAuth2","Streamlit · Plotly","9.88 CGPA","Deloitte Finalist","Ericsson R&D Intern"];
  const all = [...items, ...items];
  return (
    <div style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", overflow: "hidden", padding: "0.9rem 0", background: "rgba(244,63,94,0.01)" }}>
      <div style={{ display: "flex", gap: "4rem", animation: "marquee 30s linear infinite", width: "max-content" }}>
        {all.map((t, i) => (
          <span key={i} className="mono" style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--ink2)", whiteSpace: "nowrap" }}>
            <span style={{ color: "var(--rose)", marginRight: "0.8rem" }}>✦</span>{t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── ABOUT ─── */
function About() {
  return (
    <section id="about" className="sec-pad" style={{ background: "var(--bg2)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "10%", right: "-5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(244,63,94,0.03) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div className="rv section-label">About</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="grid2">
          <div>
            <h2 className="rv d1 serif" style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "1.5rem" }}>
              Building at the intersection of<br /><span className="rose-grad">AI & Security</span>
            </h2>
            <p className="rv d2" style={{ fontSize: "0.9rem", color: "var(--ink2)", lineHeight: 1.9, marginBottom: "1.5rem" }}>
              I'm Aayushi — a Computer Science student at Manipal University Jaipur,
              maintaining a <strong style={{ color: "var(--rose2)" }}>9.88 CGPA</strong> across 5 semesters.
              My work spans AI systems, cybersecurity, and full-stack mobile development.
            </p>
            <p className="rv d3" style={{ fontSize: "0.9rem", color: "var(--ink2)", lineHeight: 1.9, marginBottom: "2rem" }}>
              At Ericsson, I worked on CVE triage, anomaly detection models, and automated
              incident response pipelines in a production SecOps environment. From agentic CVE
              triage tools built with LangGraph, to AI productivity assistants with Gmail integration
              and Whisper transcription — I build end-to-end solutions that are technically rigorous
              and practically impactful.
            </p>
            <div className="rv d4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {[
                ["aayushichhabra1010@gmail.com", "Email"],
                ["linkedin.com/in/aayushi-chhabra-54281a34a", "LinkedIn"],
                ["github.com/aayushichhabra", "GitHub"],
                ["leetcode.com/u/aayushichhabra", "LeetCode"],
              ].map(([url, label]) => (
                <a key={label} href={label === "Email" ? `mailto:${url}` : `https://${url}`}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem", textDecoration: "none", color: "var(--ink2)", fontSize: "0.78rem", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--rose2)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--ink2)"}
                >
                  <span style={{ color: "var(--rose)", fontSize: "0.7rem" }}>→</span>
                  <span className="mono" style={{ fontSize: "0.68rem" }}>{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Education + certifications */}
          <div>
            <div className="rv d1 glass" style={{ borderRadius: "4px", padding: "1.8rem", marginBottom: "1.5rem" }}>
              <div className="mono" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--rose)", marginBottom: "1.2rem" }}>// EDUCATION</div>
              {[
                { school: "Manipal University Jaipur", degree: "B.Tech — Computer Science & Engineering", detail: "CGPA: 9.88  ·  2023–2027", loc: "Jaipur, Rajasthan", highlight: true },
                { school: "Manav Rachna International School", degree: "Class X: 95%  ·  Class XII: 96%", detail: "2021–2023", loc: "Gurugram, Haryana", highlight: false },
              ].map(({ school, degree, detail, loc, highlight }) => (
                <div key={school} style={{ marginBottom: "1.2rem", paddingBottom: "1.2rem", borderBottom: "1px solid var(--line)" }}>
                  <div style={{ fontWeight: 600, fontSize: "0.88rem", marginBottom: "0.25rem", color: highlight ? "var(--rose2)" : "var(--ink)" }}>{school}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--ink2)", marginBottom: "0.2rem" }}>{degree}</div>
                  <div className="mono" style={{ fontSize: "0.66rem", color: highlight ? "var(--mauve)" : "var(--ink2)", opacity: 0.8 }}>{detail}  ·  {loc}</div>
                </div>
              ))}
            </div>

            <div className="rv d2 glass" style={{ borderRadius: "4px", padding: "1.8rem" }}>
              <div className="mono" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--rose)", marginBottom: "1.2rem" }}>// CERTIFICATIONS</div>
              {[
                { org: "NPTEL", items: ["Programming, DSA using Python", "Design & Analysis of Algorithms"] },
                { org: "Oracle Academy", items: ["DB Foundations", "DB Programming with SQL", "DB Design"] },
                { org: "Red Hat", items: ["System Administration I (RH124)"] },
                { org: "Coursera", items: ["AWS: Storage"] },
              ].map(({ org, items }) => (
                <div key={org} style={{ marginBottom: "0.9rem", display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
                  <span className="mono" style={{ fontSize: "0.65rem", color: "var(--rose)", minWidth: 80, paddingTop: "0.1rem", fontWeight: 500 }}>{org}</span>
                  <div>
                    {items.map(i => <div key={i} style={{ fontSize: "0.78rem", color: "var(--ink2)", lineHeight: 1.7 }}>{i}</div>)}
                  </div>
                </div>
              ))}
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
  { year: "2023", title: "Dean's Excellence Award — Sem 1", desc: "Achieved 9.88 CGPA in the very first semester, earning the first Dean's Excellence Award.", icon: "🏆", col: "var(--blush)", side: "right" },
  { year: "2024", title: "Oracle & NPTEL Certifications", desc: "Completed certifications in Database Foundations, SQL Programming, DSA with Python, and Design & Analysis of Algorithms.", icon: "📜", col: "var(--mauve)", side: "left" },
  { year: "2024", title: "5× Dean's Award Streak", desc: "Maintained 9.88 CGPA for 5 consecutive semesters — a testament to unwavering academic dedication.", icon: "⭐", col: "var(--rose)", side: "right" },
  { year: "2025", title: "Prodigy InfoTech — Android Intern", desc: "Built mobile app features using Android Studio and SQLite. First hands-on industry engineering experience.", icon: "📱", col: "var(--coral)", side: "left" },
  { year: "2025", title: "Cognifyz Technologies — UI/UX Intern", desc: "Contributed to dashboard design improvements in Figma, enhancing usability across product interfaces.", icon: "🎨", col: "var(--sky)", side: "right" },
  { year: "2025", title: "Ericsson R&D — Cybersecurity & AI Intern", desc: "Worked on CVE triage, anomaly detection models, and automated incident response pipelines in a production SecOps environment.", icon: "🔐", col: "var(--rose)", side: "right" },
  { year: "2025", title: "Deloitte Capstone Ideathon — Top 10", desc: "Competed against 200+ teams and secured a Top 10 finish for innovative solution design and problem-solving.", icon: "🎯", col: "var(--blush)", side: "left" },
  { year: "2025", title: "Building ResQNet & DeepFake Detection", desc: "Developing a cross-platform crisis management app and an AI-powered deepfake detection system with Grad-CAM explainability.", icon: "🚀", col: "var(--mauve)", side: "left" },
];


function Timeline() {
  return (
    <section id="timeline" className="sec-pad" style={{ background: "var(--bg)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(244,63,94,0.03) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
        <div className="rv section-label">Journey</div>
        <h2 className="rv d1 serif" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, marginBottom: "4rem" }}>
          My <span className="rose-grad">Timeline</span>
        </h2>

        <div style={{ position: "relative" }}>
          <div className="tl-center-line hide-m" style={{
            position: "absolute", left: "50%", top: 0, bottom: 0, width: 2,
            background: "linear-gradient(180deg, var(--rose), var(--mauve), transparent)",
            transform: "translateX(-50%)",
          }} />
          <div className="tl-center-line" style={{
            position: "absolute", left: 20, top: 0, bottom: 0, width: 2,
            background: "linear-gradient(180deg, var(--rose), var(--mauve), transparent)",
            display: "none",
          }} />

          {TIMELINE_DATA.map((item, i) => {
            const isLeft = item.side === "left";
            return (
              <div
                key={i}
                className={`rv d${Math.min(i % 3 + 1, 5)} tl-item${isLeft ? "" : " tl-item-right"}`}
                style={{
                  display: "flex",
                  justifyContent: isLeft ? "flex-end" : "flex-start",
                  position: "relative",
                  marginBottom: "2.5rem",
                  paddingRight: isLeft ? "calc(50% + 30px)" : "0",
                  paddingLeft: isLeft ? "0" : "calc(50% + 30px)",
                }}
              >
                <div className="tl-dot" style={{
                  position: "absolute", left: "50%", top: 18, width: 14, height: 14,
                  borderRadius: "50%", background: item.col,
                  boxShadow: `0 0 12px ${item.col}, 0 0 24px ${item.col}44`,
                  border: "3px solid var(--bg)", transform: "translateX(-50%)", zIndex: 2,
                }} />

                <div style={{
                  background: "var(--card)", border: "1px solid var(--card-b)", borderRadius: "4px",
                  padding: "1.5rem 1.8rem", backdropFilter: "blur(8px)", width: "100%",
                  transition: "all 0.3s", position: "relative", overflow: "hidden",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${item.col}40`;
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.4), 0 0 20px ${item.col}12`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--card-b)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${item.col}, transparent)` }} />
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.6rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                    <div>
                      <span className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.15em", color: item.col, textTransform: "uppercase" }}>{item.year}</span>
                      <h3 style={{ fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.3 }}>{item.title}</h3>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "var(--ink2)", lineHeight: 1.75, marginLeft: "2.8rem" }}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── EXPERIENCE ─── */
function Experience() {
  const EXP = [
    {
      role: "Research & Development Intern",
      company: "Ericsson",
      loc: "Gurugram, Haryana",
      period: "Jun 2025 – Jul 2025",
      col: "var(--rose)",
      bullets: [
        "Worked on Cybersecurity & AI projects including vulnerability analysis, CVE triage, and threat detection.",
        "Developed anomaly detection models for a production-grade SecOps environment.",
        "Contributed to automated incident response pipelines."
      ],
      tags: ["Cybersecurity", "AI/ML", "CVE Triage", "Anomaly Detection"]
    },
    {
      role: "UI/UX Design Intern",
      company: "Cognifyz Technologies",
      loc: "Remote",
      period: "Mar 2025",
      col: "var(--mauve)",
      bullets: [
        "Contributed to dashboard design improvements using Figma and front-end tooling.",
        "Enhanced usability and visual consistency across product interfaces."
      ],
      tags: ["Figma", "UI/UX", "Dashboard Design"]
    },
    {
      role: "Android App Development Intern",
      company: "Prodigy InfoTech",
      loc: "Remote",
      period: "Feb 2025",
      col: "var(--blush)",
      bullets: [
        "Developed and tested mobile app features using Android Studio and SQLite.",
        "Implemented data persistence and UI components for a production Android application."
      ],
      tags: ["Android Studio", "SQLite", "Java", "Mobile Dev"]
    }
  ];
  return (
    <section id="experience" className="sec-pad" style={{ background: "var(--bg2)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="rv section-label">Experience</div>
        <h2 className="rv d1 serif" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, marginBottom: "3.5rem" }}>
          Work <span className="rose-grad">History</span>
        </h2>

        <div style={{ position: "relative", paddingLeft: "2.5rem" }}>
          <div className="tl-line" />
          {EXP.map(({ role, company, loc, period, col, bullets, tags }, i) => (
            <div key={company} className={`rv d${i + 1}`} style={{ marginBottom: "3rem", position: "relative" }}>
              <div style={{ position: "absolute", left: -27, top: 6, width: 12, height: 12, borderRadius: "50%", background: col, boxShadow: `0 0 10px ${col}`, border: "2px solid var(--bg2)" }} />
              <div className="card" style={{ borderRadius: "4px", padding: "1.8rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.25rem" }}>{role}</div>
                    <div style={{ color: col, fontSize: "0.85rem", fontWeight: 600 }}>{company} · {loc}</div>
                  </div>
                  <span className="mono" style={{ fontSize: "0.65rem", letterSpacing: "0.08em", color: "var(--ink2)", padding: "0.3rem 0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--line)", borderRadius: "2px" }}>{period}</span>
                </div>
                <ul style={{ listStyle: "none", marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  {bullets.map((b, j) => (
                    <li key={j} style={{ fontSize: "0.83rem", color: "var(--ink2)", lineHeight: 1.7, display: "flex", gap: "0.6rem" }}>
                      <span style={{ color: col, flexShrink: 0, marginTop: 2 }}>→</span>{b}
                    </li>
                  ))}
                </ul>
                <div className="tag-row">
                  {tags.map(t => <span key={t} className="chip-r">{t}</span>)}
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
    num: "01",
    name: "Unified Cybersecurity Platform",
    tagline: "AI-driven SecOps ecosystem for real-time threat detection & automated incident response",
    category: "AI/ML · Security",
    tech: ["Python", "Streamlit", "LangChain", "Gemini", "FAISS", "AWS Boto3", "Plotly"],
    highlights: ["RAG-powered incident guidance with semantic threat search", "FAISS + Gemini embeddings for rapid containment recommendations", "Interactive network attack analytics & anomaly detection", "Comprehensive SecOps situational awareness dashboard"],
    link: "https://intelligent-secops-rag-dashboard.streamlit.app",
    col: "var(--rose)",
  },
  {
    num: "02",
    name: "ResQNet",
    tagline: "Cross-platform crisis management ecosystem for citizens, NGOs & government agencies",
    category: "Mobile · Full Stack",
    tech: ["React Native", "Expo", "BLE", "Supabase", "Firebase", "NativeWind", "Geolib"],
    highlights: ["Offline-first BLE-based mobile crisis reporting", "Automated resource allocation via incident clustering", "Multi-channel data ingestion for real-time situational awareness", "Geolocation-based alert routing"],
    link: "https://github.com/aayushichhabra/ResQNet",
    col: "var(--mauve)",
  },
  {
    num: "03",
    name: "DeepFake Detection System",
    tagline: "End-to-end deepfake detection pipeline with visual explainability",
    category: "AI/ML · Computer Vision",
    tech: ["Python", "PyTorch", "EfficientNetB0", "Grad-CAM", "OpenCV", "Scikit-learn"],
    highlights: ["Robust binary classification: real vs. AI-generated images", "Grad-CAM explainability heatmaps for security auditors", "Transfer learning with EfficientNetB0 backbone", "Transparent model decision-making pipeline"],
    link: "https://github.com/aayushichhabra/DeepFakeImageDetection",
    col: "var(--blush)",
  },
  {
    num: "04",
    name: "Promptly AI",
    tagline: "AI-powered productivity assistant that automates email triage, reply drafting, and meeting intelligence",
    category: "AI · Full Stack",
    tech: ["Python", "Streamlit", "Gemini 2.5 Flash", "Whisper", "Gmail API", "Google OAuth2", "LangChain"],
    highlights: [
      "Gmail OAuth integration: auto-scans inbox to extract reminders and deadlines",
      "Batch email processing via Gemini — generates context-aware, ready-to-send reply drafts",
      "Whisper-based audio transcription → structured Minutes of Meeting with action items",
      "Unified dashboard aggregating reminders and meeting summaries across sessions",
    ],
    link: "https://github.com/aayushichhabra",
    col: "var(--sky)",
  },
  {
    num: "05",
    name: "CVE Agent",
    tagline: "Agentic AI tool for real-time CVE triage, dependency vulnerability scanning, and automated fix generation",
    category: "AI/ML · Cybersecurity",
    tech: ["Python", "Streamlit", "Gemini API", "LangGraph", "NIST NVD API", "OSV.dev", "BeautifulSoup4"],
    highlights: [
      "LangGraph-orchestrated agentic pipeline: fetches, analyzes, and summarizes CVEs from NIST NVD",
      "Dependency scanner: upload requirements.txt and instantly surface known CVEs with CVSS scores",
      "AI-generated structured fix recommendations with downloadable patched dependency files",
      "Multi-format support: PyPI, Go, Alpine, and Debian package ecosystems",
    ],
    link: "https://github.com/aayushichhabra",
    col: "var(--coral)",
  },
  {
    num: "06",
    name: "StyleVault",
    tagline: "AI-powered men's fashion companion app for wardrobe management, outfit suggestions & body-fit analysis",
    category: "Android · AI",
    tech: ["Kotlin", "Android Studio", "Firebase", "Gemini API", "Camera API", "Figma"],
    highlights: [
      "AI-driven outfit recommendations personalized to wardrobe, weather, and occasion",
      "Digital closet management: upload, categorize, and plan outfits from your wardrobe",
      "Body measurement activity for fit-based AI styling suggestions",
      "Fills a clear market gap — built after competitive analysis of 10+ existing apps",
    ],
    link: "https://github.com/aayushichhabra",
    col: "var(--mauve)",
  },
];

function ProjectCard({ p, i }) {
  const [hov, setHov] = useState(false);
  return (
    <div className={`rv d${i + 1}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(244,63,94,0.04)" : "var(--card)",
        border: `1px solid ${hov ? p.col : "var(--card-b)"}`,
        borderRadius: "4px",
        padding: "2rem",
        transition: "all 0.3s",
        transform: hov ? "translateY(-6px)" : "none",
        boxShadow: hov ? `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${p.col}18` : "none",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.2rem" }}>
        <div>
          <div className="mono" style={{ fontSize: "0.65rem", color: p.col, letterSpacing: "0.1em", marginBottom: "0.3rem" }}>#{p.num}</div>
          <span style={{ fontSize: "0.72rem", padding: "0.2rem 0.6rem", background: `${p.col}12`, color: p.col, border: `1px solid ${p.col}30`, borderRadius: "2px", fontFamily: "DM Mono, monospace", letterSpacing: "0.05em" }}>{p.category}</span>
        </div>
        {p.link && (
          <a href={p.link} target="_blank" rel="noreferrer" style={{ color: hov ? p.col : "var(--ink2)", transition: "color 0.2s", textDecoration: "none", fontSize: "1.1rem" }}>↗️</a>
        )}
      </div>
      <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--ink)", lineHeight: 1.3 }}>{p.name}</h3>
      <p style={{ fontSize: "0.8rem", color: "var(--ink2)", lineHeight: 1.7, marginBottom: "1rem" }}>{p.tagline}</p>
      <ul style={{ listStyle: "none", marginBottom: "1.2rem", flex: 1 }}>
        {p.highlights.map((h, j) => (
          <li key={j} style={{ fontSize: "0.78rem", color: "var(--ink2)", lineHeight: 1.65, marginBottom: "0.3rem", display: "flex", gap: "0.5rem" }}>
            <span style={{ color: p.col, flexShrink: 0 }}>›</span>{h}
          </li>
        ))}
      </ul>
      <div className="tag-row">
        {p.tech.map(t => <span key={t} className="chip-r" style={{ borderColor: `${p.col}25`, color: p.col }}>{t}</span>)}
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="sec-pad" style={{ background: "var(--bg)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: 500, height: 500, background: "radial-gradient(circle, rgba(192,132,252,0.03) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div className="rv section-label">Projects</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "3.5rem" }}>
          <h2 className="rv d1 serif" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900 }}>
            Featured <span className="rose-grad">Work</span>
          </h2>
          <a href="https://github.com/aayushichhabra" target="_blank" rel="noreferrer" className="btn-ghost" style={{ fontSize: "0.7rem" }}>
            View All on GitHub ↗️
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "1.5rem" }} className="grid3">
          {PROJECTS.map((p, i) => <ProjectCard key={p.num} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ─── */
const SKILL_GROUPS = [
  { label: "Programming & Dev", items: ["Python", "C", "Java", "JavaScript", "OOP", "DSA", "Git"], col: "var(--rose)" },
  { label: "AI & Machine Learning", items: ["Supervised & Unsupervised ML", "Transfer Learning", "RAG", "Computer Vision", "LangChain", "LangGraph", "Whisper STT", "PyTorch", "TF Lite", "OpenCV", "Scikit-learn", "Pandas"], col: "var(--mauve)" },
  { label: "Cybersecurity", items: ["CVE Analysis", "Vulnerability Assessment", "Incident Response", "Threat Detection", "Anomaly Detection", "FAISS Vector DBs"], col: "var(--blush)" },
  { label: "Mobile & Web Dev", items: ["Android Studio", "Kotlin", "React Native", "Expo", "HTML", "CSS", "JavaScript", "Streamlit", "Figma"], col: "var(--sky)" },
  { label: "Databases & Cloud", items: ["SQL", "Firebase", "Supabase", "MongoDB", "FAISS / Vector DBs"], col: "var(--coral)" },
  { label: "Tools & Platforms", items: ["Gradio", "Plotly", "Google Gemini API", "Google OAuth2", "Hugging Face", "VS Code", "GitHub", "Postman"], col: "var(--mint)" },
];

const SKILL_BARS = [
  { name: "Machine Learning & AI Systems", pct: 88, col: "var(--rose)" },
  { name: "Python / Full-stack Dev", pct: 87, col: "var(--mauve)" },
  { name: "Cybersecurity & Threat Detection", pct: 84, col: "var(--blush)" },
  { name: "React Native / Mobile Dev", pct: 82, col: "var(--sky)" },
  { name: "Database Design & Cloud", pct: 80, col: "var(--coral)" },
  { name: "UI/UX & Frontend", pct: 75, col: "var(--mint)" },
];

function AnimatedBar({ name, pct, col }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ marginBottom: "1.2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.45rem" }}>
        <span style={{ fontSize: "0.83rem", fontWeight: 500 }}>{name}</span>
        <span className="mono" style={{ fontSize: "0.68rem", color: col }}>{pct}%</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.04)", borderRadius: "2px", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          background: `linear-gradient(90deg, ${col}, ${col}88)`,
          borderRadius: "2px",
          boxShadow: `0 0 8px ${col}66`,
          width: vis ? `${pct}%` : "0%",
          transition: "width 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s"
        }} />
      </div>
    </div>
  );
}

function Skills() {
  const [tab, setTab] = useState("tags");
  return (
    <section id="skills" className="sec-pad" style={{ background: "var(--bg2)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="rv section-label">Skills</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem" }}>
          <h2 className="rv d1 serif" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900 }}>
            Technical <span className="rose-grad">Toolkit</span>
          </h2>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {[["tags", "By Domain"], ["bars", "Proficiency"]].map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} className="mono" style={{ padding: "0.45rem 1rem", border: `1px solid ${tab === k ? "var(--rose)" : "var(--card-b)"}`, background: tab === k ? "rgba(244,63,94,0.08)" : "transparent", color: tab === k ? "var(--rose2)" : "var(--ink2)", cursor: "pointer", fontSize: "0.68rem", letterSpacing: "0.08em", borderRadius: "2px", transition: "all 0.2s" }}>{l}</button>
            ))}
          </div>
        </div>

        {tab === "tags" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.2rem" }} className="grid3">
            {SKILL_GROUPS.map(({ label, items, col }, i) => (
              <div key={label} className={`rv d${i + 1} card`} style={{ borderRadius: "4px", padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: col, boxShadow: `0 0 8px ${col}` }} />
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, color: col }}>{label}</span>
                </div>
                <div className="tag-row">
                  {items.map(t => <span key={t} className="chip-m" style={{ borderColor: `${col}25`, color: col }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "bars" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 4rem" }} className="grid2">
            {SKILL_BARS.map(s => <AnimatedBar key={s.name} {...s} />)}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── ACHIEVEMENTS ─── */
const ACHIEVEMENTS = [
  { icon: "🏆", title: "Dean's Excellence Award", desc: "Maintained 9.88 CGPA across 5 consecutive semesters at Manipal University Jaipur.", col: "var(--rose)" },
  { icon: "🎯", title: "Deloitte Capstone Ideathon Finalist", desc: "Ranked Top 10 out of 200+ teams for innovative problem-solving and solution design.", col: "var(--mauve)" },
  { icon: "📡", title: "Promotional Head — Turing Sapiens", desc: "Led team executing promotion campaigns for technical events and community engagement.", col: "var(--sky)" },
  { icon: "📝", title: "Research Paper (In Progress)", desc: "Authoring a review paper on power consumption and cooling optimization in data centers.", col: "var(--blush)" },
];

function Achievements() {
  return (
    <section id="achievements" className="sec-pad" style={{ background: "var(--bg)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="rv section-label">Recognition</div>
        <h2 className="rv d1 serif" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, marginBottom: "3.5rem" }}>
          Milestones & <span className="rose-grad">Awards</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.5rem" }} className="grid2">
          {ACHIEVEMENTS.map(({ icon, title, desc, col }, i) => (
            <div key={title} className={`rv d${i + 1} card`} style={{ borderRadius: "4px", padding: "2rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${col}, transparent)` }} />
              <div style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>{icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.6rem", color: col }}>{title}</h3>
              <p style={{ fontSize: "0.82rem", color: "var(--ink2)", lineHeight: 1.75 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* CGPA Banner */}
        <div className="rv d5" style={{ marginTop: "3rem", background: "rgba(244,63,94,0.03)", border: "1px solid rgba(244,63,94,0.1)", borderRadius: "4px", padding: "2.5rem 3rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <div className="mono" style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--ink2)", marginBottom: "0.5rem" }}>ACADEMIC STANDING</div>
            <div className="serif" style={{ fontSize: "3.5rem", fontWeight: 900, lineHeight: 1 }}>
              <span className="rose-grad">9.88</span>
            </div>
            <div className="mono" style={{ fontSize: "0.7rem", color: "var(--ink2)", marginTop: "0.3rem" }}>CGPA · Manipal University Jaipur</div>
          </div>
          <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
            {[["5×", "Dean's Award"], ["3+", "Internships"], ["Top 10", "Deloitte Ideathon"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div className="serif" style={{ fontSize: "2rem", fontWeight: 900, color: "var(--rose2)" }}>{n}</div>
                <div className="mono" style={{ fontSize: "0.62rem", color: "var(--ink2)", marginTop: "0.2rem", letterSpacing: "0.1em" }}>{l}</div>
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
  const copy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <section id="contact" className="sec-pad" style={{ background: "var(--bg2)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(244,63,94,0.04) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <div className="rv section-label" style={{ justifyContent: "center" }}>Contact</div>
        <h2 className="rv d1 serif" style={{ fontSize: "clamp(2rem,6vw,4rem)", fontWeight: 900, marginBottom: "1.5rem", lineHeight: 1.1 }}>
          Let's <span className="rose-grad">Connect</span>
        </h2>
        <p className="rv d2" style={{ fontSize: "0.9rem", color: "var(--ink2)", lineHeight: 1.85, marginBottom: "3rem" }}>
          Open to internship opportunities, research collaborations, and interesting projects
          in AI, cybersecurity, and full-stack development. Currently based in Gurugram, Haryana.
        </p>

        <div className="rv d3" style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          <span className="mono" style={{ fontSize: "0.9rem", color: "var(--rose2)", letterSpacing: "0.04em" }}>{email}</span>
          <button onClick={copy} style={{ background: copied ? "rgba(52,211,153,0.08)" : "rgba(244,63,94,0.08)", border: `1px solid ${copied ? "rgba(52,211,153,0.25)" : "rgba(244,63,94,0.25)"}`, borderRadius: "2px", padding: "0.4rem 0.9rem", cursor: "pointer", color: copied ? "var(--mint)" : "var(--rose2)", fontSize: "0.7rem", fontFamily: "DM Mono, monospace", transition: "all 0.2s" }}>
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>

        <div className="rv d4" style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          {[
            { label: "LinkedIn", url: "https://www.linkedin.com/in/aayushi-chhabra-54281a34a/" },
            { label: "GitHub", url: "https://github.com/aayushichhabra" },
            { label: "LeetCode", url: "https://leetcode.com/u/aayushichhabra/" },
            { label: "SecOps Platform ↗️", url: "https://intelligent-secops-rag-dashboard.streamlit.app" },
          ].map(({ label, url }) => (
            <a key={label} href={url} target="_blank" rel="noreferrer" className="nav-link" style={{ fontSize: "0.82rem", color: "var(--ink2)" }}>{label}</a>
          ))}
        </div>

        <div className="rv d5" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="mailto:aayushichhabra1010@gmail.com" className="btn-primary">Send a Message</a>
          <a href="https://www.linkedin.com/in/aayushi-chhabra-54281a34a/" target="_blank" rel="noreferrer" className="btn-ghost">LinkedIn Profile</a>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    
    <footer style={{ borderTop: "1px solid var(--line)", padding: "2rem 4rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
      <div>
        <span className="serif" style={{ fontStyle: "italic", color: "var(--rose)", fontSize: "0.9rem" }}>Aayushi Chhabra</span>
        <span className="mono" style={{ fontSize: "0.65rem", color: "var(--ink2)", marginLeft: "0.8rem" }}>B.Tech CSE · MUJ · 2027</span>
      </div>
      <div className="mono" style={{ fontSize: "0.65rem", color: "var(--ink2)", letterSpacing: "0.08em" }}>
        Gurugram, Haryana · aayushichhabra1010@gmail.com
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
      <ScrollBar />
      <SectionProgress />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <About />
        <div className="divider" />
        <Timeline />
        <div className="divider" />
        <Experience />
        <div className="divider" />
        <Projects />
        <div className="divider" />
        <Skills />
        <div className="divider" />
        <Achievements />
        <div className="divider" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}