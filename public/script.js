function initAll() {
    if (window.__portfolio_inited) return;
    window.__portfolio_inited = true;
    initNeuralCanvas();
    initTypingEffect();
    initNavbarScroll();
    initNoriExplorer();
    initGradCamWidget();
    initTerminalCLI();
    initCopyEmail();
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initAll();
} else {
    document.addEventListener('DOMContentLoaded', initAll);
    window.addEventListener('load', initAll);
}

/* -------------------------------------------------------------
   1. Neural Canvas Particle Animation
------------------------------------------------------------- */
function initNeuralCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 20), 65);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            radius: Math.random() * 2 + 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 242, 254, 0.5)';
            ctx.fill();

            // Connect nearby nodes
            for (let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.25 * (1 - dist / 130)})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

/* -------------------------------------------------------------
   2. Typing Effect for Hero Section
------------------------------------------------------------- */
function initTypingEffect() {
    const typedTextSpan = document.querySelector('.typed-text');
    if (!typedTextSpan) return;

    const phrases = [
        "AI & Cybersecurity Engineer",
        "Co-Founder @ Nori",
        "Published Patent Holder",
        "Ericsson R&D Intern",
        "9.85 CGPA Top Scholar"
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIdx];
        if (isDeleting) {
            typedTextSpan.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typedTextSpan.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIdx === currentPhrase.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    type();
}

/* -------------------------------------------------------------
   3. Navbar Scroll & Mobile Menu Toggle
------------------------------------------------------------- */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#080c14';
                navLinks.style.padding = '20px';
                navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
            }
        });
    }
}

/* -------------------------------------------------------------
   4. Nori Architecture Microservice Explorer
------------------------------------------------------------- */
function initNoriExplorer() {
    const tabs = document.querySelectorAll('.arch-tab');
    const detailName = document.getElementById('arch-name');
    const detailDesc = document.getElementById('arch-desc');
    const metricBox = document.getElementById('arch-metrics-box');

    const specs = {
        intent: {
            name: "Sub-10ms ONNX Intent Classifier",
            desc: "Local CPU model running ONNX Runtime that filters normal chatter before reaching LLMs. Evaluates query intent in <10ms and routes to Groq (Llama 3.1) only when complex reasoning is required.",
            metrics: ["Sub-10ms CPU Latency", "~75% API Cost Savings", "Local ONNX Runtime"]
        },
        rag: {
            name: "Partition-Isolated RAG Engine",
            desc: "Multi-modal RAG pipeline powered by Graphlit API & Supabase. Features tenant isolation, Tavily/Exa web search fallback, and embedding cache for rapid response generation.",
            metrics: ["Graphlit API Multi-modal", "Tavily/Exa Fallback", "Multi-tenant Isolated"]
        },
        bot: {
            name: "Discord Bot Microservice",
            desc: "Asynchronous Discord.py integration serving thousands of guild queries. Utilizes Discord OAuth2 & JWT for strict role-based authorization across servers.",
            metrics: ["Discord.py Async", "OAuth2 + JWT Auth", "BullMQ Task Queue"]
        },
        admin: {
            name: "React Admin Dashboard & FastAPI",
            desc: "Full-stack administrative interface for managing bot instances, viewing token usage analytics, uploading tenant knowledge base documents, and managing subscription tiers.",
            metrics: ["React + Tailwind UI", "FastAPI Backend", "Oracle Cloud Docker Compose"]
        }
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const key = tab.getAttribute('data-target');
            if (specs[key]) {
                detailName.textContent = specs[key].name;
                detailDesc.textContent = specs[key].desc;
                
                metricBox.innerHTML = specs[key].metrics.map(m => 
                    `<span class="metric-tag"><i class="fa-solid fa-check-circle"></i> ${m}</span>`
                ).join('');
            }
        });
    });
}

/* -------------------------------------------------------------
   5. DeepFake Grad-CAM Visualizer Simulator
------------------------------------------------------------- */
function initGradCamWidget() {
    const camBtn = document.getElementById('cam-toggle-btn');
    const svgOverlay = document.getElementById('cam-svg-heatmap');
    const confFill = document.getElementById('cam-conf-fill');
    const confText = document.getElementById('cam-conf-text');
    const modeLabel = document.getElementById('cam-mode-label');

    let isHeatmapActive = false;

    if (camBtn) {
        camBtn.addEventListener('click', () => {
            isHeatmapActive = !isHeatmapActive;
            if (isHeatmapActive) {
                camBtn.innerHTML = `<i class="fa-solid fa-eye-slash"></i> Hide Heatmap`;
                svgOverlay.style.opacity = '0.85';
                confFill.style.width = '96.4%';
                confText.textContent = '96.4% Fake (Synthetic AI)';
                modeLabel.textContent = 'Mode: Grad-CAM Explainability Layer Active';
            } else {
                camBtn.innerHTML = `<i class="fa-solid fa-layer-group"></i> Toggle Grad-CAM Heatmap`;
                svgOverlay.style.opacity = '0';
                confFill.style.width = '96.4%';
                confText.textContent = 'Raw Face Visual Input';
                modeLabel.textContent = 'Mode: Raw Image View';
            }
        });
    }
}

/* -------------------------------------------------------------
   6. Interactive Terminal CLI
------------------------------------------------------------- */
function initTerminalCLI() {
    const termHeader = document.querySelector('.terminal-header');
    const termModal = document.querySelector('.terminal-modal');
    const termInput = document.getElementById('term-input');
    const termOutput = document.getElementById('term-output');
    const maxBtn = document.querySelector('.term-btn.max');

    if (termHeader && termModal) {
        if (minBtn) {
            minBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                termModal.classList.toggle('minimized');
                termModal.classList.remove('maximized');
            });
        }

        if (maxBtn) {
            maxBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                termModal.classList.toggle('maximized');
                termModal.classList.remove('minimized');
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                termModal.style.display = 'none';
            });
        }
    }

    const openCliBtns = document.querySelectorAll('#open-cli-btn, .open-cli-btn');
    openCliBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (termModal) {
                termModal.style.display = 'flex';
                termModal.classList.remove('minimized');
                if (termInput) termInput.focus();
            }
        });
    });

    if (termInput) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = termInput.value.trim().toLowerCase();
                termInput.value = '';
                processCommand(cmd);
            }
        });
    }

    function processCommand(cmd) {
        appendOutput(`<p class="cmd-line"><span class="terminal-prompt">aayushi@cyber-ai:~$</span> ${cmd}</p>`);

        switch (cmd) {
            case 'help':
                appendOutput(`
                    <p class="cmd-warning">Available Commands:</p>
                    <p>• <b>about</b> - Summary of background & education (9.85 CGPA)</p>
                    <p>• <b>nori</b> - Architecture & metrics for Nori RAG platform</p>
                    <p>• <b>ericsson</b> - R&D internship details & SecOps achievements</p>
                    <p>• <b>patent</b> - View published Indian Patent Journal info</p>
                    <p>• <b>skills</b> - Technical stack overview</p>
                    <p>• <b>resume</b> - Download updated resume PDF</p>
                    <p>• <b>clear</b> - Clear terminal screen</p>
                `);
                break;

            case 'about':
                appendOutput(`<p class="cmd-success">Aayushi Chhabra | 3rd Year B.Tech CSE @ Manipal University Jaipur (CGPA: 9.85)</p><p>Specialized in AI, SecOps, Machine Learning, DeepFake Detection, and RAG systems. Dean's Excellence Award recipient for 6 consecutive semesters.</p>`);
                break;

            case 'nori':
                appendOutput(`<p class="cmd-success">Nori RAG AI Platform for Discord:</p><p>• Co-founded & built 15,600+ LOC across 4 microservices.</p><p>• Sub-10ms ONNX Intent Classifier cutting API costs by ~75%.</p><p>• Graphlit RAG pipeline with Supabase & Oracle Cloud deployment.</p>`);
                break;

            case 'ericsson':
                appendOutput(`<p class="cmd-success">Ericsson R&D Intern (Jun-Jul 2025):</p><p>• Automated CVE triage reducing manual review by ~40%.</p><p>• Isolation Forest / Autoencoders with 91% precision.</p><p>• Reduced mean time-to-triage by 35%.</p>`);
                break;

            case 'patent':
                appendOutput(`<p class="cmd-success">Published Patent (2026):</p><p>“An AI-based Unified Email and Meeting Workflow Management System” - Published in Indian Patent Journal.</p>`);
                break;

            case 'skills':
                appendOutput(`
                    <p class="cmd-success">Technical Skills (Strictly matching resume):</p>
                    <p>• <b>Deep Learning & CV:</b> PyTorch, TensorFlow Lite, OpenCV, EfficientNetB0, Grad-CAM, Transfer Learning, CNNs, Autoencoders</p>
                    <p>• <b>Generative AI & RAG:</b> LangChain, Google Gemini API, FAISS, Hugging Face, Vector Databases, Prompt Engineering, Semantic Search</p>
                    <p>• <b>Machine Learning:</b> Supervised & Unsupervised Learning, Anomaly Detection, Model Evaluation, Scikit-learn, Pandas, NumPy</p>
                    <p>• <b>Backend & Deployment:</b> FastAPI, Redis, Docker Compose, nginx, BullMQ, REST APIs, Streamlit, Gradio</p>
                    <p>• <b>Programming & CS:</b> Python, Java, JavaScript, Git, Data Structures & Algorithms</p>
                    <p>• <b>Databases:</b> SQL, Supabase Postgres, Firebase, Redis, FAISS (Vector DB), SQLAlchemy</p>
                `);
                break;

            case 'resume':
                appendOutput(`<p class="cmd-success">Downloading updated resume PDF...</p>`);
                window.open('assets/Aayushi_Chhabra_Resume.pdf', '_blank');
                break;

            case 'clear':
                termOutput.innerHTML = '';
                return;

            default:
                if (cmd !== '') {
                    appendOutput(`<p style="color:#ef4444;">Command not recognized: '${cmd}'. Type <b>help</b> for command list.</p>`);
                }
                break;
        }

        termOutput.scrollTop = termOutput.scrollHeight;
    }

    function appendOutput(html) {
        termOutput.innerHTML += html;
    }
}

/* -------------------------------------------------------------
   7. Copy Email to Clipboard
------------------------------------------------------------- */
function initCopyEmail() {
    const copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const email = "aayushichhabra1010@gmail.com";
            navigator.clipboard.writeText(email).then(() => {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2000);
            });
        });
    }
}
