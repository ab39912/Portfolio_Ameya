import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ───
const EXPERIENCES = [
  { role:"Graduate Research Assistant", org:"Syracuse University", period:"Jul 2025 – Present", loc:"Syracuse, NY", current:true,
    desc:["Scaled emotion detection on 2.3M tweets via fine-tuned RoBERTa, DistilBERT & ALBERT","Optimized PyTorch/HF GPU pipelines — batching + mixed precision — 625K+ tweets","Building CNN & ViT pipeline for AI art style classification"]},
  { role:"AI Graduate Student Researcher", org:"NEXIS Technology Lab", period:"Sep 2024 – Present", loc:"Syracuse, NY", current:true,
    desc:["Analyzed 50K+ tweets with BERT-based NLP — 85% sentiment accuracy","Improved data reliability 30% via temporal & demographic feature engineering","Boosted trend detection 25% with cohort-level analysis"]},
  { role:"Summer IT Intern", org:"Mahindra USA, Inc.", period:"May – Aug 2025", loc:"Houston, TX",
    desc:["Deployed full-stack inventory system (PostgreSQL, React, AWS) — 90% error reduction","Built Power BI dashboards for 12K+ materials — 60% spend visibility","Automated demand forecasting — 30% accuracy gain, 20% cost savings"]},
  { role:"Python Developer", org:"Sahu Technologies", period:"Dec 2022 – Jan 2023", loc:"Mumbai, India",
    desc:["45-day intensive internship building Python apps: QR generator, keylogger, typing speed web app"]},
  { role:"POS Analytics Intern", org:"Unilever", period:"Apr – May 2022", loc:"Navi Mumbai, India",
    desc:["Managed item attribute population & verification for POS data pipelines using advanced Excel"]},
  { role:"Data Science Intern", org:"LetsGrowMore", period:"Feb – Mar 2022", loc:"India",
    desc:["Applied ML techniques to real-world datasets in structured program"]},
  { role:"DS & Business Analytics Intern", org:"The Sparks Foundation", period:"Oct – Nov 2021", loc:"India",
    desc:["Completed data science & business analytics projects with practical datasets"]},
];

const PROJECTS = [
  { name:"Betting Edge", tag:"Multi-Agent Decision Support", tech:["Python","Streamlit","LangChain","XGBoost","SQLite","Hugging Face"],
    desc:"Multi-agent system combining ML models, rule-based logic, risk profiling & safety checks for responsible, personalized betting recommendations across football & basketball.",
    color:"#06b6d4", icon:"⚽", github:"https://github.com/BettingApp-hcai/betting_edge", date:"Aug 2025 – Jan 2026" },
  { name:"GroceryVision", tag:"Computer Vision + YOLOv5", tech:["YOLOv5","Python","Streamlit"],
    desc:"Led 4-person team building end-to-end grocery detection — 96% accuracy on 10K images, 500ms response, recommendation engine boosting engagement 25%, 90% user satisfaction.",
    color:"#8b5cf6", icon:"🛒", github:"https://github.com/ab39912/GroceryVision", date:"Jan – May 2025" },
  { name:"EmailBox Assistant", tag:"LLM Email Automation", tech:["FastAPI","LangChain","LlamaIndex","Gmail API"],
    desc:"Automated 80%+ email triage using LLM-based pipelines, reducing manual handling by 60%. Scalable FastAPI backend with Gmail API integration.",
    color:"#f59e0b", icon:"✉", date:"2025" },
  { name:"Travel Multi-Agent", tag:"AI Agent System", tech:["Python","LangGraph","LangChain"],
    desc:"Multi-agent travel planning system using LangGraph for orchestration. Agents handle flights, hotels, itineraries & budget optimization collaboratively.",
    color:"#10b981", icon:"✈", github:"https://github.com/ab39912/travel-multi-agent", date:"2025" },
  { name:"Banking API Platform", tag:"Full-Stack Backend", tech:["Spring Boot","PostgreSQL","Docker","CI/CD","JWT"],
    desc:"REST APIs for users, accounts & transactions with role-based access control and JWT auth. Deployed via Docker + GitHub Actions CI/CD pipeline.",
    color:"#ef4444", icon:"🏦", date:"2025" },
  { name:"SC Energy & Weather", tag:"Data Analytics in R", tech:["R","Streamlit","Random Forest","Linear Regression"],
    desc:"Forecasted hourly energy demand across 5,000+ South Carolina properties using Random Forest & Linear Regression, improving prediction accuracy by 25%.",
    color:"#3b82f6", icon:"⚡", date:"2025" },
  { name:"Emotion Detection Pipeline", tag:"NLP Research", tech:["PyTorch","RoBERTa","DistilBERT","ALBERT","Hugging Face"],
    desc:"Fine-tuned RoBERTa, DistilBERT & ALBERT on 2.3M tweets for emotion detection. Custom attention mechanisms + TF-IDF gating for robustness.",
    color:"#ec4899", icon:"🧠", date:"2025" },
  { name:"Heart Attack Prediction", tag:"ML Classification", tech:["Python","scikit-learn","XGBoost","SVM"],
    desc:"Compared 7 ML classifiers (Logistic Regression, Random Forest, SVM, XGBoost, etc.) for heart attack risk. SVM achieved best accuracy at 98%. Key features: chest pain, exercise-induced angina.",
    color:"#f97316", icon:"❤", github:"https://github.com/ab39912/Heart-Attack-Prediction", date:"Sep – Nov 2023" },
  { name:"Stock Prediction (LSTM)", tag:"Deep Learning + Finance", tech:["Python","Keras","TensorFlow","LSTM","Streamlit"],
    desc:"Streamlit web app fetching Yahoo Finance data, plotting 100/200 moving averages, and predicting stock prices using LSTM neural networks. Train-test split with sklearn scaling.",
    color:"#a855f7", icon:"📈", github:"https://github.com/ab39912/Stock-Prediction-using-LSTM", date:"Jul – Aug 2023" },
  { name:"Airbnb Dataset Analysis", tag:"Data Visualization", tech:["Python","Tableau","Pandas","Seaborn","Matplotlib"],
    desc:"Exploratory analysis of Airbnb dataset using Python ML libraries and Tableau. Created interactive dashboards combining multiple worksheets for actionable insights.",
    color:"#14b8a6", icon:"🏠", github:"https://github.com/ab39912/AirBNB-Dataset", date:"Jun – Jul 2023" },
  { name:"Portable ECG Kit", tag:"IoT + Healthcare", tech:["Arduino","IoT","Wi-Fi","Ubidots Cloud"],
    desc:"Wearable IoT node gathering ECG data transmitted via Wi-Fi to Ubidots cloud, enabling remote doctor monitoring. Drastically reduced cost of portable cardiac monitoring.",
    color:"#0ea5e9", icon:"💊", date:"Oct 2022 – May 2023" },
  { name:"Covid-19 Health Monitor", tag:"IoT + Published Research", tech:["Arduino","MySQL","Sensors"],
    desc:"IoT circuit for quarantined patients to self-monitor temperature & heart rate with MySQL database alerts. Published as academic research paper.",
    color:"#22c55e", icon:"🦠", date:"2022" },
];

const SERVICES = [
  { icon:"🧠", title:"Machine Learning", desc:"Building and fine-tuning models from transformers to XGBoost for NLP, CV, and predictive analytics." },
  { icon:"📊", title:"Data Engineering", desc:"Designing scalable pipelines, ETL workflows, and optimized database architectures." },
  { icon:"⚡", title:"Full-Stack Development", desc:"End-to-end apps with React, FastAPI, PostgreSQL, and cloud deployment on AWS/GCP." },
  { icon:"🔬", title:"AI Research", desc:"Emotion detection, sentiment analysis, and computer vision research with published results." },
  { icon:"📈", title:"Analytics & Dashboards", desc:"Power BI, Streamlit, and custom visualization dashboards for data-driven decisions." },
  { icon:"🚀", title:"MLOps & Deployment", desc:"Docker, Kubernetes, CI/CD pipelines, and production ML model serving." },
];

const SKILLS_GROUPED = {
  "Languages": ["Python","SQL","JavaScript","TypeScript","Java","C++","R"],
  "ML & AI": ["PyTorch","scikit-learn","Hugging Face","XGBoost","LangChain","Pandas","NumPy"],
  "Data & Cloud": ["PostgreSQL","MongoDB","SQLite","Redis","AWS","GCP"],
  "Frameworks": ["React","FastAPI","Flask","Django","Node.js","Streamlit"],
  "MLOps & Tools": ["Docker","Kubernetes","Git","GitHub","Jenkins","JIRA","Power BI"],
};

const SKILLS_LIST = ["Python","PyTorch","scikit-learn","Hugging Face","XGBoost","LangChain","SQL","JavaScript","TypeScript","React","FastAPI","Streamlit","PostgreSQL","MongoDB","AWS","GCP","Docker","Kubernetes","Git","Power BI","R","Java"];

const CERTS = ["Programming for Everybody (Python)","Generative AI Fundamentals","SQL (Basic) Certificate","Arduino Platform & C Programming","Master the Coding Interview: DS + Algorithms"];

const LANGS = [{n:"English",l:"Full Professional"},{n:"Hindi",l:"Professional Working"},{n:"Marathi",l:"Native / Bilingual"},{n:"Chinese",l:"Elementary"}];

// ─── HOOKS ───
function useInView(th=0.15) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting){setV(true);obs.disconnect();} },{threshold:th});
    obs.observe(el); return () => obs.disconnect();
  }, [th]);
  return [ref, v];
}

function useMouseGlow() {
  const [pos, setPos] = useState({x:0,y:0});
  useEffect(() => {
    const fn = e => setPos({x:e.clientX,y:e.clientY});
    window.addEventListener("mousemove",fn);
    return () => window.removeEventListener("mousemove",fn);
  },[]);
  return pos;
}

// ─── COMPONENTS ───
function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    const resize = () => {c.width=window.innerWidth;c.height=window.innerHeight;};
    resize(); window.addEventListener("resize",resize);
    const pts = Array.from({length:60},()=>({
      x:Math.random()*c.width, y:Math.random()*c.height,
      vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3,
      r:Math.random()*1.5+0.5
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,c.width,c.height);
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>c.width)p.vx*=-1;
        if(p.y<0||p.y>c.height)p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle="rgba(148,163,184,0.15)"; ctx.fill();
      });
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<100){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);
          ctx.strokeStyle=`rgba(148,163,184,${0.06*(1-d/100)})`;ctx.stroke();}
      }
      raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={ref} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}} />;
}

function Typed({texts}) {
  const [idx,setIdx]=useState(0),[ch,setCh]=useState(0),[del,setDel]=useState(false);
  useEffect(()=>{
    const t=texts[idx];
    if(!del&&ch<t.length){const id=setTimeout(()=>setCh(c=>c+1),80);return()=>clearTimeout(id);}
    if(!del&&ch===t.length){const id=setTimeout(()=>setDel(true),2000);return()=>clearTimeout(id);}
    if(del&&ch>0){const id=setTimeout(()=>setCh(c=>c-1),40);return()=>clearTimeout(id);}
    if(del&&ch===0){setDel(false);setIdx(i=>(i+1)%texts.length);}
  },[ch,del,idx,texts]);
  return <span>{texts[idx].slice(0,ch)}<span style={{borderRight:"2px solid #e2e8f0",marginLeft:1,animation:"blink 1s step-end infinite"}}>&nbsp;</span></span>;
}

function Counter({end,suffix="",visible}) {
  const [v,setV]=useState(0);
  useEffect(()=>{
    if(!visible)return; let s=0;const step=1200/end;
    const id=setInterval(()=>{s++;setV(s);if(s>=end)clearInterval(id);},step);
    return()=>clearInterval(id);
  },[visible,end]);
  return <>{v}{suffix}</>;
}

function AnimatedSection({children,delay=0,className=""}) {
  const [ref,vis]=useInView(0.1);
  return (
    <div ref={ref} className={className} style={{
      opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(40px)",
      transition:`all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

function ExperienceItem({exp,index}) {
  const [ref,vis]=useInView(0.15);
  const [hover,setHover]=useState(false);
  return (
    <div ref={ref} style={{
      opacity:vis?1:0, transform:vis?"translateX(0)":"translateX(-30px)",
      transition:`all 0.6s cubic-bezier(0.16,1,0.3,1) ${index*100}ms`,
      marginBottom:24,
    }}>
      <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{
        padding:"24px 28px", borderRadius:16,
        background:hover?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.02)",
        border:`1px solid ${hover?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.05)"}`,
        transition:"all 0.3s ease", cursor:"default",
        transform:hover?"translateX(8px)":"translateX(0)",
      }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <h3 style={{fontSize:17,fontWeight:600,color:"#f1f5f9",margin:0}}>{exp.role}</h3>
              {exp.current && <span style={{fontSize:10,padding:"2px 8px",borderRadius:20,background:"rgba(34,197,94,0.15)",color:"#4ade80",fontWeight:600,letterSpacing:0.5}}>CURRENT</span>}
            </div>
            <p style={{fontSize:14,color:"#94a3b8",margin:"4px 0 0"}}>{exp.org} · {exp.loc}</p>
          </div>
          <span style={{fontSize:12,color:"#64748b",fontFamily:"monospace"}}>{exp.period}</span>
        </div>
        <ul style={{marginTop:12,paddingLeft:16,color:"#94a3b8",fontSize:14,lineHeight:1.7,listStyle:"none"}}>
          {exp.desc.map((d,i)=><li key={i} style={{position:"relative",paddingLeft:16,marginBottom:4}}>
            <span style={{position:"absolute",left:0,color:"#475569"}}>›</span>{d}
          </li>)}
        </ul>
      </div>
    </div>
  );
}

function ProjectCard({project,index}) {
  const [ref,vis]=useInView(0.1);
  const [hover,setHover]=useState(false);
  const p = project;
  return (
    <div ref={ref} style={{
      opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(30px)",
      transition:`all 0.6s cubic-bezier(0.16,1,0.3,1) ${index*80}ms`,
    }}>
      <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{
        borderRadius:16, overflow:"hidden", height:"100%",
        background:hover?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.02)",
        border:`1px solid ${hover?p.color+"44":"rgba(255,255,255,0.05)"}`,
        transition:"all 0.35s ease", cursor:"default",
        transform:hover?"translateY(-6px)":"translateY(0)",
        boxShadow:hover?`0 16px 48px ${p.color}15`:"none",
        display:"flex",flexDirection:"column",
      }}>
        <div style={{
          height:120, background:`linear-gradient(135deg,${p.color}22,${p.color}08)`,
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:48, position:"relative",
        }}>
          <span style={{filter:hover?"scale(1.15)":"scale(1)",transition:"filter 0.3s,transform 0.3s",
            transform:hover?"scale(1.15)":"scale(1)"}}>{p.icon}</span>
          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer"
            style={{position:"absolute",top:12,right:12,fontSize:11,padding:"4px 10px",borderRadius:8,
              background:"rgba(0,0,0,0.3)",color:"#94a3b8",textDecoration:"none",
              border:"1px solid rgba(255,255,255,0.1)",transition:"all 0.2s"}}
            onMouseEnter={e=>{e.target.style.color="#f1f5f9";e.target.style.background="rgba(0,0,0,0.5)";}}
            onMouseLeave={e=>{e.target.style.color="#94a3b8";e.target.style.background="rgba(0,0,0,0.3)";}}
          >GitHub →</a>}
        </div>
        <div style={{padding:"20px 24px",flex:1,display:"flex",flexDirection:"column"}}>
          <p style={{fontSize:11,color:p.color,textTransform:"uppercase",letterSpacing:1.5,fontWeight:600,margin:0}}>{p.tag}</p>
          <h3 style={{fontSize:18,fontWeight:700,color:"#f1f5f9",margin:"6px 0 4px"}}>{p.name}</h3>
          <p style={{fontSize:11,color:"#475569",margin:"0 0 10px",fontFamily:"monospace"}}>{p.date}</p>
          <p style={{fontSize:13,color:"#94a3b8",lineHeight:1.65,margin:"0 0 14px",flex:1}}>{p.desc}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
            {p.tech.map(t=>(
              <span key={t} style={{padding:"3px 10px",borderRadius:20,fontSize:10,fontWeight:500,
                background:`${p.color}12`,color:`${p.color}cc`,border:`1px solid ${p.color}22`}}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({svc,index}) {
  const [hover,setHover]=useState(false);
  const [ref,vis]=useInView(0.1);
  return (
    <div ref={ref} style={{
      opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(30px)",
      transition:`all 0.6s cubic-bezier(0.16,1,0.3,1) ${index*100}ms`,
    }}>
      <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{
        padding:28, borderRadius:16, height:"100%",
        background:hover?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.02)",
        border:`1px solid ${hover?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.05)"}`,
        transition:"all 0.3s ease", cursor:"default",
        transform:hover?"translateY(-4px)":"translateY(0)",
      }}>
        <div style={{fontSize:32,marginBottom:16}}>{svc.icon}</div>
        <h3 style={{fontSize:16,fontWeight:600,color:"#f1f5f9",margin:"0 0 8px"}}>{svc.title}</h3>
        <p style={{fontSize:14,color:"#94a3b8",lineHeight:1.6,margin:0}}>{svc.desc}</p>
      </div>
    </div>
  );
}

function SkillPill({name,delay,visible}) {
  const [hover,setHover]=useState(false);
  return (
    <span onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{
      padding:"8px 18px",borderRadius:10,fontSize:13,fontWeight:500,
      background:hover?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.04)",
      color:hover?"#f1f5f9":"#94a3b8",
      border:`1px solid ${hover?"rgba(255,255,255,0.15)":"rgba(255,255,255,0.06)"}`,
      transition:`all 0.3s ease ${delay}ms`,
      opacity:visible?1:0,transform:visible?"translateY(0) scale(1)":"translateY(12px) scale(0.95)",
      cursor:"default",display:"inline-block",
    }}>{name}</span>
  );
}

function SkillCategory({category,skills,index}) {
  const [ref,vis]=useInView(0.15);
  return (
    <div ref={ref} style={{
      opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(25px)",
      transition:`all 0.6s cubic-bezier(0.16,1,0.3,1) ${index*120}ms`,
    }}>
      <h3 style={{fontSize:13,color:"#64748b",textTransform:"uppercase",letterSpacing:1.5,fontWeight:600,marginBottom:14}}>{category}</h3>
      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
        {skills.map((s,i)=><SkillPill key={s} name={s} delay={i*50} visible={vis} />)}
      </div>
    </div>
  );
}

// ─── CONTACT MODAL ───
function ContactModal({open,onClose}) {
  const [form,setForm]=useState({name:"",email:"",message:""});
  const [sent,setSent]=useState(false);
  const [anim,setAnim]=useState(false);

  useEffect(()=>{
    if(open){setAnim(true);setSent(false);setForm({name:"",email:"",message:""});}
  },[open]);

  useEffect(()=>{
    if(!open) return;
    const fn=e=>{if(e.key==="Escape")onClose();};
    window.addEventListener("keydown",fn);
    return()=>window.removeEventListener("keydown",fn);
  },[open,onClose]);

  if(!open) return null;

  const handleSend=()=>{
    if(form.name&&form.email&&form.message){
      window.open(`mailto:ab39912@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${encodeURIComponent(form.name)} (${encodeURIComponent(form.email)})`);
      setSent(true); setTimeout(()=>{setSent(false);onClose();},2500);
    }
  };

  const inputStyle={
    width:"100%",padding:"14px 18px",borderRadius:12,fontSize:14,
    background:"rgba(255,255,255,0.04)",color:"#e2e8f0",
    border:"1px solid rgba(255,255,255,0.08)",outline:"none",
    fontFamily:"inherit",transition:"border-color 0.2s",
  };

  return (
    <div onClick={onClose} style={{
      position:"fixed",inset:0,zIndex:200,
      background:"rgba(0,0,0,0.7)",backdropFilter:"blur(8px)",
      display:"flex",alignItems:"center",justifyContent:"center",
      opacity:anim?1:0,transition:"opacity 0.3s ease",
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        width:"min(480px,90vw)",
        background:"#0a0a0f",border:"1px solid rgba(255,255,255,0.08)",
        borderRadius:20,padding:36,position:"relative",
        transform:anim?"translateY(0) scale(1)":"translateY(20px) scale(0.97)",
        transition:"transform 0.3s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {/* Close button */}
        <button onClick={onClose} style={{
          position:"absolute",top:16,right:16,width:32,height:32,borderRadius:8,
          background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",
          color:"#64748b",fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
          transition:"all 0.2s",
        }}
          onMouseEnter={e=>{e.target.style.color="#f1f5f9";e.target.style.background="rgba(255,255,255,0.1)";}}
          onMouseLeave={e=>{e.target.style.color="#64748b";e.target.style.background="rgba(255,255,255,0.05)";}}
        >✕</button>

        <h3 style={{fontSize:22,fontWeight:700,color:"#f1f5f9",marginBottom:4}}>Get in touch</h3>
        <p style={{fontSize:14,color:"#64748b",marginBottom:28}}>Fill in the details and I'll get back to you shortly.</p>

        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <input placeholder="Your name" value={form.name}
            onChange={e=>setForm(p=>({...p,name:e.target.value}))}
            style={inputStyle}
            onFocus={e=>e.target.style.borderColor="rgba(255,255,255,0.2)"}
            onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"}
          />
          <input placeholder="Your email" type="email" value={form.email}
            onChange={e=>setForm(p=>({...p,email:e.target.value}))}
            style={inputStyle}
            onFocus={e=>e.target.style.borderColor="rgba(255,255,255,0.2)"}
            onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"}
          />
          <textarea placeholder="Your message" rows={5} value={form.message}
            onChange={e=>setForm(p=>({...p,message:e.target.value}))}
            style={{...inputStyle,resize:"vertical"}}
            onFocus={e=>e.target.style.borderColor="rgba(255,255,255,0.2)"}
            onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"}
          />
          <button onClick={handleSend} disabled={!form.name||!form.email||!form.message} style={{
            width:"100%",padding:"14px",borderRadius:12,border:"none",fontSize:14,fontWeight:600,
            cursor:(!form.name||!form.email||!form.message)?"not-allowed":"pointer",
            background:sent?"#10b981":(!form.name||!form.email||!form.message)?"rgba(255,255,255,0.06)":"#f1f5f9",
            color:sent?"#fff":(!form.name||!form.email||!form.message)?"#475569":"#0f172a",
            transition:"all 0.3s",
          }}>{sent?"✓ Message sent!":"Send message"}</button>
        </div>

        <div style={{display:"flex",justifyContent:"center",gap:20,marginTop:24,paddingTop:20,borderTop:"1px solid rgba(255,255,255,0.05)"}}>
          {[
            {label:"LinkedIn",href:"https://linkedin.com/in/bhaleraoameya"},
            {label:"GitHub",href:"https://github.com/ab39912"},
            {label:"Email",href:"mailto:ab39912@gmail.com"},
          ].map(l=>(
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              style={{fontSize:12,color:"#475569",transition:"color 0.2s"}}
              onMouseEnter={e=>e.target.style.color="#f1f5f9"}
              onMouseLeave={e=>e.target.style.color="#475569"}
            >{l.label}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ───
export default function Portfolio() {
  const [active,setActive]=useState("home");
  const [scrollY,setScrollY]=useState(0);
  const [mobileNav,setMobileNav]=useState(false);
  const [contactOpen,setContactOpen]=useState(false);
  const mouse = useMouseGlow();
  const sectionRefs = useRef({});
  const [statsRef,statsVis]=useInView(0.3);
  const [expFilter,setExpFilter]=useState("all");
  const projectsScrollRef = useRef(null);

  useEffect(()=>{
    const fn=()=>setScrollY(window.scrollY);
    window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);
  },[]);

  const scrollTo = useCallback(s=>{
    setActive(s); setMobileNav(false);
    sectionRefs.current[s]?.scrollIntoView({behavior:"smooth"});
  },[]);

  const filteredExp = expFilter==="all"?EXPERIENCES:expFilter==="current"?EXPERIENCES.filter(e=>e.current):EXPERIENCES.filter(e=>!e.current);

  const scrollProjects = dir => {
    const el = projectsScrollRef.current;
    if(el) el.scrollBy({left:dir*400,behavior:"smooth"});
  };

  return (
    <div style={{background:"#000",color:"#e2e8f0",fontFamily:"'Inter','SF Pro Display','Segoe UI',system-ui,sans-serif",minHeight:"100vh",overflowX:"hidden",position:"relative"}}>
      <style>{`
        @keyframes blink{50%{opacity:0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes slideIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        *{box-sizing:border-box;margin:0;padding:0;scroll-behavior:smooth}
        ::selection{background:rgba(148,163,184,0.2)}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#1e293b;border-radius:2px}
        a{color:inherit;text-decoration:none}
        body{overflow-x:hidden}
      `}</style>

      {/* Cursor spotlight */}
      <div style={{
        position:"fixed", width:600, height:600, borderRadius:"50%",
        background:"radial-gradient(circle,rgba(148,163,184,0.03) 0%,transparent 70%)",
        transform:`translate(${mouse.x-300}px,${mouse.y-300}px)`,
        pointerEvents:"none", zIndex:1, transition:"transform 0.15s ease-out",
      }} />

      <Particles />

      {/* ─── NAV ─── */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        padding:"16px 40px",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        background:scrollY>50?"rgba(0,0,0,0.8)":"transparent",
        backdropFilter:scrollY>50?"blur(20px)":"none",
        borderBottom:scrollY>50?"1px solid rgba(255,255,255,0.05)":"none",
        transition:"all 0.3s ease",
      }}>
        <span onClick={()=>scrollTo("home")} style={{fontSize:18,fontWeight:700,color:"#f1f5f9",cursor:"pointer",letterSpacing:-0.5}}>
          ameya<span style={{color:"#64748b"}}>.dev</span>
        </span>
        <div style={{display:"flex",gap:32,alignItems:"center"}}>
          {["home","about","experience","skills","projects","services"].map(s=>(
            <span key={s} onClick={()=>scrollTo(s)} style={{
              fontSize:13,fontWeight:500,cursor:"pointer",textTransform:"capitalize",
              color:active===s?"#f1f5f9":"#64748b",
              transition:"color 0.2s",letterSpacing:0.3,
            }}>{s}</span>
          ))}
          <button onClick={()=>setContactOpen(true)} style={{
            padding:"8px 20px",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",
            background:"#f1f5f9",color:"#0f172a",border:"none",transition:"all 0.2s",
          }}
            onMouseEnter={e=>e.target.style.background="#cbd5e1"}
            onMouseLeave={e=>e.target.style.background="#f1f5f9"}
          >Get in touch</button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section ref={el=>sectionRefs.current["home"]=el} style={{
        minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",
        padding:"0 max(40px,8vw)",position:"relative",
      }}>
        <h1 style={{fontSize:"clamp(40px,6vw,72px)",fontWeight:800,lineHeight:1.05,letterSpacing:-2,
          color:"#f1f5f9",maxWidth:800,animation:"slideIn 0.6s ease 0.3s both"}}>
          Hello, I'm<br/>Ameya Bhalerao.
        </h1>

        <p style={{fontSize:18,color:"#94a3b8",maxWidth:560,lineHeight:1.6,margin:"20px 0 0",animation:"slideIn 0.6s ease 0.5s both"}}>
          <Typed texts={["Data Scientist building intelligent systems.","ML Engineer fine-tuning transformers at scale.","AI Researcher exploring NLP & computer vision.","Full-Stack Developer deploying on AWS."]} />
        </p>

        <div style={{display:"flex",gap:16,marginTop:32,animation:"slideIn 0.6s ease 0.7s both"}}>
          <button onClick={()=>setContactOpen(true)} style={{
            padding:"14px 32px",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer",
            background:"#f1f5f9",color:"#0f172a",border:"none",transition:"all 0.2s",
          }}
            onMouseEnter={e=>{e.target.style.background="#cbd5e1";e.target.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.target.style.background="#f1f5f9";e.target.style.transform="translateY(0)";}}
          >Get in touch</button>
          <button onClick={()=>scrollTo("about")} style={{
            padding:"14px 32px",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer",
            background:"transparent",color:"#94a3b8",border:"1px solid rgba(255,255,255,0.1)",transition:"all 0.2s",
          }}
            onMouseEnter={e=>{e.target.style.borderColor="rgba(255,255,255,0.25)";e.target.style.color="#f1f5f9";}}
            onMouseLeave={e=>{e.target.style.borderColor="rgba(255,255,255,0.1)";e.target.style.color="#94a3b8";}}
          >Learn more</button>
        </div>

        <div style={{position:"absolute",bottom:40,left:"max(40px,8vw)",display:"flex",alignItems:"center",gap:8,color:"#475569",fontSize:13,animation:"slideIn 0.6s ease 1s both"}}>
          <div style={{width:1,height:40,background:"#334155"}} />
          <span>Scroll to discover</span>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section ref={el=>sectionRefs.current["about"]=el} style={{padding:"120px max(40px,8vw)",position:"relative"}}>
        <AnimatedSection>
          <p style={{fontSize:"clamp(20px,2.5vw,28px)",color:"#cbd5e1",lineHeight:1.65,maxWidth:900,fontWeight:400}}>
            I'm a data science graduate student at <span style={{color:"#f1f5f9",fontWeight:600}}>Syracuse University</span> with hands-on experience across research and industry. From fine-tuning transformers on{" "}
            <span style={{color:"#f1f5f9",fontWeight:600}}>2.3M tweets</span> to building full-stack inventory systems at{" "}
            <span style={{color:"#f1f5f9",fontWeight:600}}>Mahindra USA</span>, I move comfortably from data engineering and modeling to dashboards and stakeholder communication.
          </p>
        </AnimatedSection>

        {/* Stats */}
        <div ref={statsRef} style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,marginTop:64,maxWidth:500,
          background:"rgba(255,255,255,0.05)",borderRadius:16,overflow:"hidden"}}>
          {[{val:3,suf:"+",label:"Years of experience"},{val:10,suf:"+",label:"Technologies mastered"},{val:7,suf:"+",label:"Roles & internships"}].map((s,i)=>(
            <div key={i} style={{background:"#000",padding:"32px 24px",textAlign:"center"}}>
              <div style={{fontSize:32,fontWeight:800,color:"#f1f5f9"}}>
                <Counter end={s.val} suffix={s.suf} visible={statsVis} />
              </div>
              <div style={{fontSize:12,color:"#64748b",marginTop:4}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Education + Languages + Publication */}
        <AnimatedSection delay={200}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginTop:48}}>
            <div style={{padding:28,borderRadius:16,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
              <h3 style={{fontSize:13,color:"#64748b",textTransform:"uppercase",letterSpacing:1.5,fontWeight:600,marginBottom:16}}>Education</h3>
              <div style={{marginBottom:16}}>
                <p style={{fontSize:15,fontWeight:600,color:"#f1f5f9"}}>Syracuse University</p>
                <p style={{fontSize:13,color:"#94a3b8"}}>M.S. Applied Data Science · 2024 – 2026</p>
                <p style={{fontSize:12,color:"#64748b",marginTop:4}}>ML, Deep Learning, Human-Centered AI, Business Analytics</p>
              </div>
              <div>
                <p style={{fontSize:15,fontWeight:600,color:"#f1f5f9"}}>University of Mumbai</p>
                <p style={{fontSize:13,color:"#94a3b8"}}>B.E. Electronics & Telecom · 2019 – 2023</p>
                <p style={{fontSize:12,color:"#64748b",marginTop:4}}>Data Structures, ML, Big Data, Cloud Computing</p>
              </div>
              <div style={{marginTop:20,padding:"12px 16px",borderRadius:10,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.05)"}}>
                <p style={{fontSize:11,color:"#64748b",textTransform:"uppercase",letterSpacing:1,fontWeight:600}}>Publication</p>
                <p style={{fontSize:13,color:"#cbd5e1",marginTop:4}}>Health Monitoring for Covid-19 Asymptotic Patients</p>
              </div>
            </div>
            <div style={{padding:28,borderRadius:16,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
              <h3 style={{fontSize:13,color:"#64748b",textTransform:"uppercase",letterSpacing:1.5,fontWeight:600,marginBottom:16}}>Languages</h3>
              {LANGS.map(l=>(
                <div key={l.n} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                  <span style={{fontSize:14,color:"#f1f5f9"}}>{l.n}</span>
                  <span style={{fontSize:12,color:"#64748b"}}>{l.l}</span>
                </div>
              ))}
              <h3 style={{fontSize:13,color:"#64748b",textTransform:"uppercase",letterSpacing:1.5,fontWeight:600,margin:"24px 0 12px"}}>Certifications</h3>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {CERTS.map(c=>(
                  <span key={c} style={{padding:"4px 12px",borderRadius:20,fontSize:11,
                    background:"rgba(255,255,255,0.04)",color:"#94a3b8",border:"1px solid rgba(255,255,255,0.06)"}}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ─── EXPERIENCE (two-column layout) ─── */}
      <section ref={el=>sectionRefs.current["experience"]=el} style={{padding:"80px max(40px,8vw) 100px"}}>
        <AnimatedSection>
          <p style={{fontSize:13,color:"#64748b",textTransform:"uppercase",letterSpacing:2,fontWeight:600,marginBottom:8}}>Career Path</p>
          <h2 style={{fontSize:"clamp(28px,3.5vw,42px)",fontWeight:700,color:"#f1f5f9",letterSpacing:-1}}>
            Experience
          </h2>
        </AnimatedSection>

        <div style={{display:"flex",gap:8,margin:"32px 0 40px"}}>
          {[{k:"all",l:"All"},{k:"current",l:"Current"},{k:"past",l:"Past"}].map(f=>(
            <button key={f.k} onClick={()=>setExpFilter(f.k)} style={{
              padding:"8px 20px",borderRadius:20,fontSize:12,fontWeight:600,cursor:"pointer",
              border:"1px solid",
              borderColor:expFilter===f.k?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.06)",
              background:expFilter===f.k?"rgba(255,255,255,0.08)":"transparent",
              color:expFilter===f.k?"#f1f5f9":"#64748b",transition:"all 0.2s",
            }}>{f.l}</button>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          {filteredExp.map((e,i)=><ExperienceItem key={e.role+e.org} exp={e} index={i} />)}
        </div>
      </section>

      {/* ─── SKILLS MARQUEE ─── */}
      <div style={{padding:"40px 0",overflow:"hidden",borderTop:"1px solid rgba(255,255,255,0.04)",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
        <div style={{display:"flex",animation:"marquee 30s linear infinite",width:"max-content"}}>
          {[...SKILLS_LIST,...SKILLS_LIST].map((s,i)=>(
            <span key={i} style={{padding:"8px 24px",fontSize:14,color:"#475569",fontWeight:500,whiteSpace:"nowrap"}}>
              {s} <span style={{color:"#1e293b",margin:"0 8px"}}>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── SKILLS ─── */}
      <section ref={el=>sectionRefs.current["skills"]=el} style={{padding:"100px max(40px,8vw)"}}>
        <AnimatedSection>
          <p style={{fontSize:13,color:"#64748b",textTransform:"uppercase",letterSpacing:2,fontWeight:600,marginBottom:8}}>Tech Stack</p>
          <h2 style={{fontSize:"clamp(28px,3.5vw,42px)",fontWeight:700,color:"#f1f5f9",letterSpacing:-1,marginBottom:48}}>
            Skills & Technologies
          </h2>
        </AnimatedSection>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:32}}>
          {Object.entries(SKILLS_GROUPED).map(([cat,skills],i)=>(
            <SkillCategory key={cat} category={cat} skills={skills} index={i} />
          ))}
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section ref={el=>sectionRefs.current["projects"]=el} style={{padding:"100px max(40px,8vw)"}}>
        <AnimatedSection>
          <div style={{marginBottom:48}}>
            <p style={{fontSize:13,color:"#64748b",textTransform:"uppercase",letterSpacing:2,fontWeight:600,marginBottom:8}}>Featured Work</p>
            <h2 style={{fontSize:"clamp(28px,3.5vw,42px)",fontWeight:700,color:"#f1f5f9",letterSpacing:-1}}>
              Projects
            </h2>
            <p style={{fontSize:15,color:"#64748b",marginTop:8,maxWidth:500}}>A selection of projects spanning ML, NLP, computer vision, full-stack, and data analytics.</p>
          </div>
        </AnimatedSection>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:20}}>
          {PROJECTS.map((p,i)=><ProjectCard key={p.name} project={p} index={i} />)}
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section ref={el=>sectionRefs.current["services"]=el} style={{padding:"80px max(40px,8vw) 120px"}}>
        <AnimatedSection>
          <h2 style={{fontSize:"clamp(28px,3.5vw,42px)",fontWeight:700,color:"#f1f5f9",letterSpacing:-1,marginBottom:8}}>
            Need more info?
          </h2>
          <p style={{fontSize:16,color:"#64748b",marginBottom:48}}>Here are some of the services I offer.</p>
        </AnimatedSection>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
          {SERVICES.map((s,i)=><ServiceCard key={s.title} svc={s} index={i} />)}
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section ref={el=>sectionRefs.current["contact"]=el} style={{
        padding:"100px max(40px,8vw) 80px",
        borderTop:"1px solid rgba(255,255,255,0.05)",
      }}>
        <AnimatedSection>
          <h2 style={{fontSize:"clamp(32px,4vw,52px)",fontWeight:700,color:"#f1f5f9",letterSpacing:-1,marginBottom:8}}>
            Let's work together.
          </h2>
          <p style={{fontSize:16,color:"#64748b",marginBottom:36,maxWidth:500}}>
            I'm open to data science, ML engineering, and research opportunities. Let's connect.
          </p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <a onClick={e=>{e.preventDefault();setContactOpen(true);}} href="#" style={{
              padding:"14px 32px",borderRadius:10,fontSize:14,fontWeight:600,
              background:"#f1f5f9",color:"#0f172a",transition:"all 0.2s",display:"inline-block",cursor:"pointer",
            }}
              onMouseEnter={e=>{e.target.style.background="#cbd5e1";e.target.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.target.style.background="#f1f5f9";e.target.style.transform="translateY(0)";}}
            >Get in touch</a>
            <a href="https://linkedin.com/in/bhaleraoameya" target="_blank" rel="noopener noreferrer" style={{
              padding:"14px 32px",borderRadius:10,fontSize:14,fontWeight:600,
              background:"transparent",color:"#94a3b8",border:"1px solid rgba(255,255,255,0.1)",
              transition:"all 0.2s",display:"inline-block",
            }}
              onMouseEnter={e=>{e.target.style.borderColor="rgba(255,255,255,0.25)";e.target.style.color="#f1f5f9";}}
              onMouseLeave={e=>{e.target.style.borderColor="rgba(255,255,255,0.1)";e.target.style.color="#94a3b8";}}
            >LinkedIn</a>
            <a href="https://github.com/ab39912" target="_blank" rel="noopener noreferrer" style={{
              padding:"14px 32px",borderRadius:10,fontSize:14,fontWeight:600,
              background:"transparent",color:"#94a3b8",border:"1px solid rgba(255,255,255,0.1)",
              transition:"all 0.2s",display:"inline-block",
            }}
              onMouseEnter={e=>{e.target.style.borderColor="rgba(255,255,255,0.25)";e.target.style.color="#f1f5f9";}}
              onMouseLeave={e=>{e.target.style.borderColor="rgba(255,255,255,0.1)";e.target.style.color="#94a3b8";}}
            >GitHub</a>
          </div>
        </AnimatedSection>
      </section>

      <ContactModal open={contactOpen} onClose={()=>setContactOpen(false)} />

      {/* ─── FOOTER ─── */}
      <footer style={{
        padding:"32px max(40px,8vw)",
        borderTop:"1px solid rgba(255,255,255,0.05)",
        display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16,
      }}>
        <span style={{fontSize:13,color:"#475569"}}>Made with care by Ameya Bhalerao</span>
        <div style={{display:"flex",gap:24,alignItems:"center"}}>
          <span style={{fontSize:12,color:"#334155",fontFamily:"monospace"}}>Syracuse, NY</span>
          <a href="mailto:ab39912@gmail.com" style={{fontSize:12,color:"#64748b",transition:"color 0.2s"}}
            onMouseEnter={e=>e.target.style.color="#f1f5f9"} onMouseLeave={e=>e.target.style.color="#64748b"}>ab39912@gmail.com</a>
        </div>
      </footer>
    </div>
  );
}