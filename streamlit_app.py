import streamlit as st
import requests
from datetime import datetime

st.set_page_config(page_title="Ameya Bhalerao", page_icon="🚀", layout="wide", initial_sidebar_state="collapsed")

# ===================== CONFIGURATION =====================
# Update these URLs with your actual links

# Profile Photo - Use GitHub raw URL for deployment
# Replace 'YOUR_GITHUB_USERNAME' and 'YOUR_REPO_NAME' with your actual values
PROFILE_PHOTO_URL = "https://raw.githubusercontent.com/ab39912/PORTFOLIO_AMEYA/main/profile.jpg"

# GitHub Repository Links - Update with your actual repo URLs
GITHUB_REPOS = {
    "betting_edge": "https://github.com/ab39912/betting_edge",
    "smart_grocery": "https://github.com/ab39912/GroceryVision"
}
# =========================================================

# Dark theme CSS
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    * { font-family: 'Space Grotesk', sans-serif; }
    
    .stApp { background: #0a0a0f; }
    section[data-testid="stSidebar"] { display: none; }
    header[data-testid="stHeader"] { background: transparent; }
    .block-container { padding-top: 2rem; max-width: 1200px; }
    
    .hero-section {
        text-align: center; padding: 4rem 0; 
        background: radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 70%);
        border-radius: 30px; margin-bottom: 3rem;
    }
    .profile-photo-container {
        width: 180px; height: 180px; margin: 0 auto 1.5rem; position: relative;
    }
    .profile-photo-container::before {
        content: ''; position: absolute; inset: -4px; border-radius: 50%;
        background: linear-gradient(135deg, #64ffda, #7c3aed, #f472b6, #64ffda);
        background-size: 300% 300%; animation: gradient 4s ease infinite; z-index: 0;
    }
    .profile-photo {
        width: 100%; height: 100%; border-radius: 50%; 
        object-fit: cover; object-position: center 20%;
        position: relative; z-index: 1;
        border: 3px solid #1a1a2e; background: #1a1a2e;
        transition: transform 0.3s ease; filter: brightness(1.05);
    }
    .profile-photo:hover { transform: scale(1.05); }
    .main-header {
        font-size: 4.5rem; font-weight: 700;
        background: linear-gradient(120deg, #00d4ff, #7c3aed, #f472b6, #00d4ff);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        animation: gradient 4s ease infinite; background-size: 300% 300%;
        margin-bottom: 0.5rem;
    }
    @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    .subtitle { color: #8892b0; font-size: 1.3rem; margin-bottom: 1rem; }
    .tagline { color: #64ffda; font-size: 1rem; letter-spacing: 2px; text-transform: uppercase; }
    
    .status-badge {
        display: inline-flex; align-items: center; gap: 8px;
        background: rgba(100, 255, 218, 0.1); border: 1px solid #64ffda;
        padding: 8px 20px; border-radius: 30px; margin: 1.5rem 0;
    }
    .pulse-dot {
        width: 10px; height: 10px; background: #64ffda; border-radius: 50%;
        animation: pulse 2s infinite;
    }
    @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
    
    .nav-links { display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin-top: 2rem; }
    .nav-btn {
        background: transparent; border: 1px solid #7c3aed; color: #ccd6f6;
        padding: 12px 28px; border-radius: 8px; text-decoration: none;
        font-weight: 500; transition: all 0.3s ease; display: inline-block;
    }
    .nav-btn:hover { background: #7c3aed; color: white; transform: translateY(-3px); box-shadow: 0 10px 30px rgba(124,58,237,0.3); }
    .nav-btn.primary { background: #7c3aed; color: white; }
    
    .section { padding: 4rem 0; }
    .section-header {
        display: flex; align-items: center; gap: 15px; margin-bottom: 2.5rem;
    }
    .section-number { color: #64ffda; font-size: 1.2rem; font-weight: 500; }
    .section-title { color: #ccd6f6; font-size: 2rem; font-weight: 600; margin: 0; }
    .section-line { flex: 1; height: 1px; background: linear-gradient(90deg, #1e3a5f, transparent); }
    
    .card {
        background: #111119; border: 1px solid #1e1e2e; border-radius: 15px;
        padding: 2rem; margin-bottom: 1.5rem; transition: all 0.3s ease;
        position: relative; overflow: hidden;
    }
    .card::before {
        content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 2px;
        background: linear-gradient(90deg, #7c3aed, #00d4ff); opacity: 0; transition: opacity 0.3s;
    }
    .card:hover { border-color: #7c3aed; transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
    .card:hover::before { opacity: 1; }
    
    .exp-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; }
    .exp-title { color: #ccd6f6; font-size: 1.3rem; margin: 0; }
    .exp-company { color: #64ffda; font-size: 1.1rem; margin: 5px 0; }
    .exp-meta { color: #8892b0; font-size: 0.9rem; }
    .exp-date { background: #1e1e2e; color: #64ffda; padding: 5px 15px; border-radius: 20px; font-size: 0.85rem; }
    .exp-list { color: #8892b0; margin-top: 1rem; padding-left: 20px; }
    .exp-list li { margin: 10px 0; line-height: 1.6; }
    .exp-list li::marker { color: #64ffda; }
    
    .project-card { background: #111119; border: 1px solid #1e1e2e; border-radius: 15px; overflow: hidden; transition: all 0.3s ease; }
    .project-card:hover { border-color: #7c3aed; transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
    .project-content { padding: 1.5rem; }
    .project-title { color: #ccd6f6; font-size: 1.3rem; margin-bottom: 0.5rem; }
    .project-desc { color: #8892b0; line-height: 1.7; margin: 1rem 0; }
    .project-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 1rem; }
    .tag { background: rgba(100,255,218,0.1); color: #64ffda; padding: 5px 12px; border-radius: 15px; font-size: 0.8rem; }
    .project-stats { display: flex; gap: 20px; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #1e1e2e; }
    .stat { text-align: center; }
    .stat-value { color: #64ffda; font-size: 1.5rem; font-weight: 600; }
    .stat-label { color: #8892b0; font-size: 0.75rem; }
    
    .github-link {
        display: inline-flex; align-items: center; gap: 8px;
        background: #1e1e2e; color: #ccd6f6; padding: 10px 20px;
        border-radius: 8px; text-decoration: none; font-size: 0.9rem;
        transition: all 0.3s ease; margin-top: 1rem; border: 1px solid transparent;
    }
    .github-link:hover { border-color: #64ffda; color: #64ffda; transform: translateY(-2px); }
    .github-link svg { width: 18px; height: 18px; fill: currentColor; }
    
    .skill-category { margin-bottom: 2rem; }
    .skill-label { color: #ccd6f6; font-size: 1rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px; }
    .skill-pills { display: flex; flex-wrap: wrap; gap: 10px; }
    .skill-pill {
        background: #1e1e2e; color: #ccd6f6; padding: 10px 20px; border-radius: 8px;
        font-size: 0.9rem; transition: all 0.3s ease; border: 1px solid transparent;
    }
    .skill-pill:hover { border-color: #64ffda; color: #64ffda; transform: translateY(-2px); }
    
    .proficiency-bar { margin: 1.5rem 0; }
    .proficiency-header { display: flex; justify-content: space-between; color: #8892b0; margin-bottom: 8px; }
    .proficiency-track { background: #1e1e2e; border-radius: 10px; height: 8px; overflow: hidden; }
    .proficiency-fill { height: 100%; border-radius: 10px; background: linear-gradient(90deg, #7c3aed, #64ffda); }
    
    .edu-card { display: flex; gap: 20px; align-items: flex-start; }
    .edu-icon { background: #1e1e2e; padding: 15px; border-radius: 12px; font-size: 1.5rem; }
    .edu-content { flex: 1; }
    .edu-school { color: #ccd6f6; font-size: 1.2rem; margin: 0; }
    .edu-degree { color: #64ffda; margin: 5px 0; }
    .edu-date { color: #8892b0; font-size: 0.9rem; }
    .edu-courses { color: #8892b0; font-size: 0.9rem; margin-top: 10px; }
    
    .contact-grid { display: grid; gap: 20px; }
    .contact-item {
        display: flex; align-items: center; gap: 15px;
        background: #111119; padding: 1.2rem 1.5rem; border-radius: 12px;
        border: 1px solid #1e1e2e; transition: all 0.3s ease;
    }
    .contact-item:hover { border-color: #64ffda; }
    .contact-icon { font-size: 1.5rem; }
    .contact-label { color: #8892b0; font-size: 0.85rem; }
    .contact-value { color: #ccd6f6; font-size: 1rem; }
    
    .social-links { display: flex; gap: 15px; justify-content: center; margin-top: 2rem; }
    .social-btn {
        background: #1e1e2e; color: #ccd6f6; width: 50px; height: 50px;
        border-radius: 12px; display: flex; align-items: center; justify-content: center;
        font-size: 1.3rem; text-decoration: none; transition: all 0.3s ease;
    }
    .social-btn:hover { background: #7c3aed; transform: translateY(-5px); }
    
    .footer {
        text-align: center; padding: 3rem 0; margin-top: 4rem;
        border-top: 1px solid #1e1e2e;
    }
    .footer p { color: #8892b0; margin: 5px 0; }
    .footer a { color: #64ffda; text-decoration: none; }
    
    .stTextInput input, .stTextArea textarea, .stSelectbox > div > div {
        background: #111119 !important; border: 1px solid #1e1e2e !important;
        color: #ccd6f6 !important; border-radius: 8px !important;
    }
    .stTextInput input:focus, .stTextArea textarea:focus { border-color: #7c3aed !important; }
    .stButton button {
        background: linear-gradient(135deg, #7c3aed, #6d28d9) !important;
        color: white !important; border: none !important; border-radius: 8px !important;
        padding: 0.7rem 2rem !important; font-weight: 500 !important; transition: all 0.3s ease !important;
    }
    .stButton button:hover { transform: translateY(-2px) !important; box-shadow: 0 10px 30px rgba(124,58,237,0.4) !important; }
    .stExpander { background: #111119; border: 1px solid #1e1e2e; border-radius: 12px; }
    .stExpander header { color: #ccd6f6 !important; }

    @media (max-width: 768px) {
        .main-header { font-size: 2.5rem; }
        .profile-photo-container { width: 140px; height: 140px; }
    }
</style>
""", unsafe_allow_html=True)

# ===================== HERO SECTION =====================
st.markdown(f"""
<div class="hero-section">
    <div class="profile-photo-container">
        <img src="{PROFILE_PHOTO_URL}" alt="Ameya Bhalerao" class="profile-photo"/>
    </div>
    <p class="tagline">Data Scientist & ML Engineer</p>
    <h1 class="main-header">Ameya Bhalerao</h1>
    <p class="subtitle">Building intelligent systems that solve real-world problems</p>
    <div class="status-badge">
        <span class="pulse-dot"></span>
        <span style="color: #64ffda;">Available for opportunities</span>
    </div>
    <div class="nav-links">
        <a href="mailto:ab39912@gmail.com" class="nav-btn primary">📧 Get In Touch</a>
        <a href="https://linkedin.com/in/bhaleraoameya" class="nav-btn">💼 LinkedIn</a>
        <a href="https://github.com/ab39912" class="nav-btn">🐱 GitHub</a>
        <a href="tel:+13153740147" class="nav-btn">📱 Call Me</a>
    </div>
</div>
""", unsafe_allow_html=True)


# ===================== ABOUT =====================
st.markdown("""
<div class="section">
    <div class="section-header">
        <span class="section-number">01.</span>
        <h2 class="section-title">About Me</h2>
        <div class="section-line"></div>
    </div>
</div>
""", unsafe_allow_html=True)

col1, col2 = st.columns([3, 2])
with col1:
    st.markdown("""
    <div class="card">
        <p style="color: #8892b0; line-height: 1.9; font-size: 1.05rem;">
            I'm a passionate <span style="color: #64ffda;">Data Scientist</span> pursuing my Master's at 
            <span style="color: #64ffda;">Syracuse University</span>, specializing in building intelligent 
            ML systems that solve real-world problems.
        </p>
        <p style="color: #8892b0; line-height: 1.9; font-size: 1.05rem; margin-top: 1rem;">
            From analyzing <span style="color: #64ffda;">millions of tweets</span> with transformer models 
            to building <span style="color: #64ffda;">full-stack inventory systems</span>, I love turning 
            complex data into actionable insights.
        </p>
        <p style="color: #8892b0; line-height: 1.9; font-size: 1.05rem; margin-top: 1rem;">
            <strong style="color: #ccd6f6;">Current Focus:</strong> NLP, Computer Vision, and building 
            ethical AI applications that make a difference.
        </p>
    </div>
    """, unsafe_allow_html=True)

with col2:
    st.markdown("""
    <div class="card">
        <h4 style="color: #ccd6f6; margin-bottom: 1rem;">⚡ Quick Facts</h4>
        <p style="color: #8892b0; margin: 12px 0;">🌍 Mumbai → Syracuse, NY</p>
        <p style="color: #8892b0; margin: 12px 0;">🔬 Active Graduate Researcher</p>
        <p style="color: #8892b0; margin: 12px 0;">🎯 Full-Stack ML Engineer</p>
        <p style="color: #8892b0; margin: 12px 0;">🎓 Graduating May 2026</p>
    </div>
    """, unsafe_allow_html=True)

# ===================== EDUCATION =====================
st.markdown("""
<div class="section">
    <div class="section-header">
        <span class="section-number">02.</span>
        <h2 class="section-title">Education</h2>
        <div class="section-line"></div>
    </div>
</div>
""", unsafe_allow_html=True)

col1, col2 = st.columns(2)
with col1:
    st.markdown("""
    <div class="card">
        <div class="edu-card">
            <div class="edu-icon">🎓</div>
            <div class="edu-content">
                <h3 class="edu-school">Syracuse University</h3>
                <p class="edu-degree">M.S. in Applied Data Science</p>
                <p class="edu-date">Aug 2024 – May 2026 | Syracuse, NY</p>
                <p class="edu-courses"><strong style="color:#64ffda;">Coursework:</strong> Applied ML, Deep Learning, Human-Centered AI, Business Analytics, Advanced Database Management</p>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)

with col2:
    st.markdown("""
    <div class="card">
        <div class="edu-card">
            <div class="edu-icon">🏛️</div>
            <div class="edu-content">
                <h3 class="edu-school">University of Mumbai</h3>
                <p class="edu-degree">B.E. in Electronics & Telecommunications</p>
                <p class="edu-date">Graduated May 2023 | Mumbai, India</p>
                <p class="edu-courses"><strong style="color:#64ffda;">Coursework:</strong> Data Structures & Algorithms, Big Data Analysis, Machine Learning, Cloud Computing</p>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)

# ===================== EXPERIENCE =====================
st.markdown("""
<div class="section">
    <div class="section-header">
        <span class="section-number">03.</span>
        <h2 class="section-title">Experience</h2>
        <div class="section-line"></div>
    </div>
</div>
""", unsafe_allow_html=True)

experiences = [
    {"title": "Research Assistant", "company": "Syracuse University", "location": "Syracuse, NY", "date": "Jul 2025 – Present",
     "points": ["Implemented emotion-detection pipeline on <span style='color:#64ffda;'>2.3M tweets</span> using RoBERTa/DistilBERT/ALBERT", "Optimized HF+PyTorch GPU inference to process <span style='color:#64ffda;'>625K+ tweets</span> with lower latency", "Developing CV pipeline to classify AI art styles using CNN/ViT transfer learning with augmentation"]},
    {"title": "AI Graduate Student Researcher", "company": "NEXIS Technology Lab", "location": "Syracuse, NY", "date": "Sep 2024 – Present",
     "points": ["Analyzed <span style='color:#64ffda;'>50K+ tweets</span> with BERT, achieving <span style='color:#64ffda;'>85% sentiment accuracy</span>", "Improved data reliability by <span style='color:#64ffda;'>30%</span> via feature engineering", "Boosted trend detection by <span style='color:#64ffda;'>25%</span> using demographic/time analysis"]},
    {"title": "Summer IT Intern", "company": "Mahindra USA, Inc.", "location": "Houston, TX", "date": "May – Aug 2025",
     "points": ["Engineered full-stack inventory system (PostgreSQL, React, AWS) reducing errors by <span style='color:#64ffda;'>90%</span>", "Transformed 12K+ materials into Power BI dashboards with <span style='color:#64ffda;'>95% usability</span>", "Automated demand forecasting improving accuracy by <span style='color:#64ffda;'>30%</span>", "Reduced manual review by <span style='color:#64ffda;'>8+ hrs/week</span> via automated Python scripts"]}
]

for exp in experiences:
    st.markdown(f"""
    <div class="card">
        <div class="exp-header">
            <div>
                <h3 class="exp-title">{exp['title']}</h3>
                <p class="exp-company">{exp['company']}</p>
                <p class="exp-meta">📍 {exp['location']}</p>
            </div>
            <span class="exp-date">{exp['date']}</span>
        </div>
        <ul class="exp-list">
            {"".join(f"<li>{p}</li>" for p in exp['points'])}
        </ul>
    </div>
    """, unsafe_allow_html=True)

# ===================== PROJECTS =====================
st.markdown("""
<div class="section">
    <div class="section-header">
        <span class="section-number">04.</span>
        <h2 class="section-title">Featured Projects</h2>
        <div class="section-line"></div>
    </div>
</div>
""", unsafe_allow_html=True)

# Project 1: Betting Edge
st.markdown(f"""
<div class="project-card" style="margin-bottom: 2rem;">
    <div class="project-content">
        <h3 class="project-title">🎰 Betting Edge — Sports Analytics Copilot</h3>
        <p style="color: #8892b0; font-size: 0.9rem;">Sep 2025 – Dec 2025</p>
        <p class="project-desc">Ethics-first sports analytics copilot that converts natural-language match queries into structured inputs for end-to-end betting decisions with value-check vs. bookmaker odds.</p>
        <div class="project-tags">
            <span class="tag">Streamlit</span><span class="tag">LangChain</span><span class="tag">XGBoost</span>
            <span class="tag">SQLite</span><span class="tag">Hugging Face</span>
        </div>
        <div class="project-stats">
            <div class="stat"><div class="stat-value">35%</div><div class="stat-label">Latency Reduction</div></div>
            <div class="stat"><div class="stat-value">89%</div><div class="stat-label">Validation Accuracy</div></div>
            <div class="stat"><div class="stat-value">5</div><div class="stat-label">APIs Integrated</div></div>
        </div>
        <a href="{GITHUB_REPOS['betting_edge']}" class="github-link" target="_blank">
            <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
            View on GitHub
        </a>
    </div>
</div>
""", unsafe_allow_html=True)


# Project 2: SmartGrocery
st.markdown(f"""
<div class="project-card" style="margin-bottom: 2rem;">
    <div class="project-content">
        <h3 class="project-title">🛒 SmartGrocery System — Computer Vision</h3>
        <p style="color: #8892b0; font-size: 0.9rem;">Feb 2025 – May 2025</p>
        <p class="project-desc">Led a 4-member team to build and deploy a YOLOv5 grocery detector via Streamlit with an intelligent recommender system that increased engagement by 25%.</p>
        <div class="project-tags">
            <span class="tag">YOLOv5</span><span class="tag">Streamlit</span><span class="tag">Python</span><span class="tag">Computer Vision</span>
        </div>
        <div class="project-stats">
            <div class="stat"><div class="stat-value">96%</div><div class="stat-label">Accuracy</div></div>
            <div class="stat"><div class="stat-value">10K</div><div class="stat-label">Images Trained</div></div>
            <div class="stat"><div class="stat-value">90%</div><div class="stat-label">User Satisfaction</div></div>
        </div>
        <a href="{GITHUB_REPOS['smart_grocery']}" class="github-link" target="_blank">
            <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
            View on GitHub
        </a>
    </div>
</div>
""", unsafe_allow_html=True)


# ===================== SKILLS =====================
st.markdown("""
<div class="section">
    <div class="section-header">
        <span class="section-number">05.</span>
        <h2 class="section-title">Technical Skills</h2>
        <div class="section-line"></div>
    </div>
</div>
""", unsafe_allow_html=True)

skills = {
    "💻 Languages": ["Python", "Java", "C++", "SQL", "JavaScript", "TypeScript", "R", "HTML/CSS", "MATLAB"],
    "🔧 Frameworks": ["FastAPI", "Flask", "Django", "Node.js", "Angular", "React", "Streamlit"],
    "☁️ Cloud & Databases": ["PostgreSQL", "SQLite", "MongoDB", "Redis", "AWS", "GCP"],
    "🛠️ DevOps": ["Git", "GitHub", "Docker", "Kubernetes", "Jenkins", "JIRA"],
    "🤖 ML/AI": ["PyTorch", "scikit-learn", "Pandas", "NumPy", "XGBoost", "Hugging Face", "LangChain"]
}

for cat, items in skills.items():
    st.markdown(f"""
    <div class="skill-category">
        <p class="skill-label">{cat}</p>
        <div class="skill-pills">{"".join(f'<span class="skill-pill">{s}</span>' for s in items)}</div>
    </div>
    """, unsafe_allow_html=True)

# Proficiency bars
st.markdown('<div class="card">', unsafe_allow_html=True)
st.markdown('<h4 style="color:#ccd6f6; margin-bottom:1.5rem;">📊 Proficiency Levels</h4>', unsafe_allow_html=True)
for skill, level in [("Python & Machine Learning", 95), ("Data Engineering & ETL", 90), ("Deep Learning & NLP", 88), ("Full-Stack Development", 85), ("Cloud & DevOps", 82)]:
    st.markdown(f'<div class="proficiency-bar"><div class="proficiency-header"><span>{skill}</span><span>{level}%</span></div><div class="proficiency-track"><div class="proficiency-fill" style="width:{level}%;"></div></div></div>', unsafe_allow_html=True)
st.markdown('</div>', unsafe_allow_html=True)

# ===================== CONTACT =====================
st.markdown("""
<div class="section">
    <div class="section-header">
        <span class="section-number">06.</span>
        <h2 class="section-title">Get In Touch</h2>
        <div class="section-line"></div>
    </div>
</div>
""", unsafe_allow_html=True)

col1, col2 = st.columns([1, 1])

with col1:
    st.markdown("""
    <div class="card">
        <h3 style="color:#ccd6f6; margin-bottom:1rem;">Let's Connect!</h3>
        <p style="color:#8892b0; line-height:1.8;">
            I'm always open to discussing new opportunities, collaborations, or chatting about AI/ML. 
            Feel free to reach out!
        </p>
        <div class="contact-grid" style="margin-top:1.5rem;">
            <div class="contact-item">
                <span class="contact-icon">📧</span>
                <div><p class="contact-label">Email</p><p class="contact-value">ab39912@gmail.com</p></div>
            </div>
            <div class="contact-item">
                <span class="contact-icon">📱</span>
                <div><p class="contact-label">Phone</p><p class="contact-value">+1 (315) 374-0147</p></div>
            </div>
            <div class="contact-item">
                <span class="contact-icon">📍</span>
                <div><p class="contact-label">Location</p><p class="contact-value">Syracuse, NY</p></div>
            </div>
        </div>
        <div class="social-links">
            <a href="https://linkedin.com/in/bhaleraoameya" class="social-btn">💼</a>
            <a href="https://github.com/ab39912" class="social-btn">🐱</a>
            <a href="mailto:ab39912@gmail.com" class="social-btn">📧</a>
        </div>
    </div>
    """, unsafe_allow_html=True)

with col2:
    st.markdown('<div class="card">', unsafe_allow_html=True)
    st.markdown('<h3 style="color:#ccd6f6; margin-bottom:1rem;">💌 Send a Message</h3>', unsafe_allow_html=True)
    name = st.text_input("Your Name", placeholder="John Doe", key="cname")
    email = st.text_input("Your Email", placeholder="john@example.com", key="cemail")
    subject = st.selectbox("Subject", ["General Inquiry", "Job Opportunity", "Collaboration", "Other"], key="csub")
    message = st.text_area("Message", placeholder="Hi Ameya, I'd like to discuss...", height=120, key="cmsg")
    if st.button("🚀 Send Message", use_container_width=True, key="csend"):
        if name and email and message:
            st.success("✅ Message sent! I'll respond within 24-48 hours.")
            st.balloons()
        else:
            st.error("Please fill in all fields.")
    st.markdown('</div>', unsafe_allow_html=True)

# ===================== RESUME DOWNLOAD =====================
st.markdown("""
<div class="section">
    <div class="section-header">
        <span class="section-number">07.</span>
        <h2 class="section-title">Resume</h2>
        <div class="section-line"></div>
    </div>
</div>
""", unsafe_allow_html=True)

st.markdown("""
<div class="card" style="text-align:center;">
    <h3 style="color:#ccd6f6;">Download My Resume</h3>
    <p style="color:#8892b0; margin:1rem 0;">Get a copy of my complete resume in your preferred format.</p>
    <div style="margin:2rem 0;">
        <a href="#" class="nav-btn primary" style="margin:10px;">📥 Download PDF</a>
        <a href="#" class="nav-btn" style="margin:10px;">📄 Download DOCX</a>
    </div>
    <p style="color:#64ffda; font-size:0.85rem;">Last updated: January 2026</p>
</div>
""", unsafe_allow_html=True)

# ===================== FOOTER =====================
st.markdown(f"""
<div class="footer">
    <p>Designed & Built by <a href="https://github.com/ab39912">Ameya Bhalerao</a></p>
    <p style="font-size:0.85rem;">Built with Streamlit • {datetime.now().year}</p>
</div>
""", unsafe_allow_html=True)