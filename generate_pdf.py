import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib import colors

pdf_paths = [
    "/Users/aayushichhabra/Downloads/personalweb/public/Aayushi_Chhabra_Resume.pdf",
    "/Users/aayushichhabra/Downloads/personalweb/assets/Aayushi_Chhabra_Resume.pdf"
]

for pdf_path in pdf_paths:
    os.makedirs(os.path.dirname(pdf_path), exist_ok=True)
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        alignment=1, # Center
        textColor=colors.HexColor('#0F172A')
    )

    contact_style = ParagraphStyle(
        'ContactInfo',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        alignment=1,
        textColor=colors.HexColor('#475569')
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=2
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#1E293B')
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor('#334155'),
        leftIndent=10
    )

    story = []

    # Title & Contact
    story.append(Paragraph("Aayushi Chhabra", title_style))
    story.append(Spacer(1, 4))
    contact_text = "+91-9873740076 &nbsp;|&nbsp; aayushichhabra.me &nbsp;|&nbsp; aayushichhabra1010@gmail.com &nbsp;|&nbsp; LinkedIn &nbsp;|&nbsp; GitHub &nbsp;|&nbsp; LeetCode"
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 6))

    def add_section_header(title):
        story.append(Paragraph(title.upper(), section_heading))
        story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#64748B'), spaceAfter=5, spaceBefore=1))

    # SUMMARY
    add_section_header("Summary")
    summary_text = "Final-year B.Tech Computer Science student at Manipal University Jaipur (9.85 CGPA) with industry experience in AI and Cybersecurity. Co-founder of Nori, a production-grade multi-tenant RAG AI platform. Specialized in machine learning, deep learning, computer vision, and RAG-based AI systems. Published patent holder and Dean’s Excellence Award recipient for 6 consecutive semesters."
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 6))

    # EDUCATION
    add_section_header("Education")
    edu1 = "<b>Manipal University Jaipur</b> &nbsp;|&nbsp; <i>B.Tech in Computer Science and Engineering</i> &nbsp;|&nbsp; (<b>CGPA: 9.85</b>)<br/><font color='#64748B'>Jaipur, Rajasthan &nbsp;|&nbsp; Aug 2023 – Jul 2027</font>"
    story.append(Paragraph(edu1, body_style))
    story.append(Spacer(1, 3))
    edu2 = "<b>Manav Rachna International School</b> &nbsp;|&nbsp; <i>Class X: 95% &nbsp;|&nbsp; Class XII: 96%</i><br/><font color='#64748B'>Gurugram, Haryana &nbsp;|&nbsp; 2021 – 2023</font>"
    story.append(Paragraph(edu2, body_style))
    story.append(Spacer(1, 6))

    # WORK EXPERIENCE
    add_section_header("Work Experience")
    exp_title = "<b>Research & Development Intern</b> &nbsp;|&nbsp; <b>Ericsson</b> &nbsp;<font color='#64748B' size=8>(Gurugram, Haryana &nbsp;|&nbsp; Jun 2025 – Jul 2025)</font>"
    story.append(Paragraph(exp_title, body_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("• Conducted CVE triage and vulnerability analysis for AI-assisted threat detection, reducing manual review time by ~40% through automated severity scoring pipelines.", bullet_style))
    story.append(Paragraph("• Developed unsupervised anomaly detection models (Isolation Forest, Autoencoders) achieving 91% precision on network intrusion datasets in a production-grade SecOps environment.", bullet_style))
    story.append(Paragraph("• Contributed to automated incident response pipelines integrating ML-based alert classification, cutting mean time-to-triage by 35% in simulation benchmarks.", bullet_style))
    story.append(Spacer(1, 6))

    # PROJECTS
    add_section_header("Projects")
    # Nori
    p1 = "<b>Nori</b> &nbsp;|&nbsp; <i>Co-Founder</i> &nbsp;|&nbsp; <font size=7.5 color='#475569'>FastAPI, Discord.py, React, Graphlit, Supabase, Redis, Docker (2026)</font>"
    story.append(Paragraph(p1, body_style))
    story.append(Paragraph("• Co-founded and engineered a multi-tenant RAG AI platform for Discord, architecting 15,600+ lines of code across 4 microservices.", bullet_style))
    story.append(Paragraph("• Engineered a sub-10ms CPU intent classifier via a local ONNX Runtime model with Groq (Llama 3.1) fallback, reducing LLM/RAG API costs by 75%.", bullet_style))
    story.append(Paragraph("• Built a partition-isolated RAG pipeline through Graphlit API with multi-modal ingestion, Discord OAuth2, JWT authentication, and Oracle Cloud deployment.", bullet_style))
    story.append(Spacer(1, 4))

    # Unified Cybersecurity Platform
    p2 = "<b>Unified Cybersecurity Platform</b> &nbsp;|&nbsp; <font size=7.5 color='#475569'>Python, Streamlit, LangChain, Gemini, FAISS, Plotly (2025)</font>"
    story.append(Paragraph(p2, body_style))
    story.append(Paragraph("• Built an AI-driven SecOps ecosystem integrating RAG-powered incident guidance, network attack analytics, and ML-based anomaly detection, achieving 93% accuracy.", bullet_style))
    story.append(Paragraph("• Leveraged FAISS vector databases with Google Gemini embeddings for semantic search over threat intelligence corpora, reducing containment recommendation latency by 60%.", bullet_style))
    story.append(Paragraph("• Deployed on Streamlit Cloud with interactive Plotly dashboards serving live threat telemetry across 5+ attack categories.", bullet_style))
    story.append(Spacer(1, 4))

    # DeepFake Detection System
    p3 = "<b>DeepFake Detection System</b> &nbsp;|&nbsp; <font size=7.5 color='#475569'>Python, PyTorch, EfficientNetB0, Grad-CAM, OpenCV, Scikit-learn (2026)</font>"
    story.append(Paragraph(p3, body_style))
    story.append(Paragraph("• Built an end-to-end deepfake detection pipeline using EfficientNetB0 with transfer learning, achieving 96.4% binary classification accuracy.", bullet_style))
    story.append(Paragraph("• Integrated Grad-CAM explainability heatmaps to visually highlight manipulated facial regions, reducing review time by 50%.", bullet_style))
    story.append(Paragraph("• Applied data augmentation and fine-tuning strategies that improved generalization across four deepfake generation methods.", bullet_style))
    story.append(Spacer(1, 6))

    # TECHNICAL SKILLS
    add_section_header("Technical Skills")
    skills_data = [
        "<b>Deep Learning & Computer Vision:</b> PyTorch, TensorFlow Lite, OpenCV, EfficientNetB0, Grad-CAM, Transfer Learning, CNNs, Autoencoders",
        "<b>Generative AI & RAG:</b> LangChain, Google Gemini API, FAISS, Hugging Face, Vector Databases, Prompt Engineering, Semantic Search",
        "<b>Machine Learning:</b> Supervised & Unsupervised Learning, Anomaly Detection, Model Evaluation, Scikit-learn, Pandas, NumPy",
        "<b>Backend & Deployment:</b> FastAPI, Redis, Docker Compose, nginx, BullMQ, REST APIs, Streamlit, Gradio",
        "<b>Programming & CS Fundamentals:</b> Python, Java, JavaScript, Git, Data Structures & Algorithms",
        "<b>Databases:</b> SQL, Supabase Postgres, Firebase, Redis, FAISS (Vector DB), SQLAlchemy"
    ]
    for s in skills_data:
        story.append(Paragraph(f"• {s}", ParagraphStyle('SkillLine', parent=body_style, fontSize=8, leading=11)))

    story.append(Spacer(1, 6))

    # ACHIEVEMENTS
    add_section_header("Achievements")
    story.append(Paragraph("<b>Patent Published – AI Workflow Management System</b> (2026)", bullet_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("<b>Dean’s Excellence Award</b> | Manipal University Jaipur (2023 – Present)", bullet_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("<b>Finalist – Deloitte Capstone Ideathon</b> (2025)", bullet_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("<b>Promotional Head – Turing Sapiens (Technical Society)</b> (2024)", bullet_style))

    doc.build(story)
    print("PDF successfully generated at:", pdf_path)
