import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  UploadCloud, FileText, BrainCircuit, BarChart3, ShieldCheck, Clock3, Target,
  CheckCircle2, AlertTriangle, Lock, ArrowRight, Menu, Mail, Sparkles, Search,
  BriefcaseBusiness, Users, LineChart, BadgeCheck, ClipboardCheck, Gauge, XCircle,
  Download, WandSparkles, DatabaseZap
} from 'lucide-react';
import './styles.css';

const companyLogos = ['Mercado Libre', 'Globant', 'Accenture', 'PedidosYa', 'Quilmes', 'Banco Galicia'];

const features = [
  { icon: BrainCircuit, title: 'Análisis inteligente', text: 'Evaluamos CVs con criterios estructurados, señales profesionales y consistencia de trayectoria.' },
  { icon: Target, title: 'Ajuste preciso', text: 'Comparamos experiencia, habilidades y seniority contra una búsqueda concreta.' },
  { icon: BarChart3, title: 'Insights accionables', text: 'Entregamos recomendaciones claras para mejorar el perfil o priorizar candidatos.' },
  { icon: Clock3, title: 'Ahorro de tiempo', text: 'Reduce la lectura manual inicial y acelera la construcción de shortlists.' },
  { icon: ShieldCheck, title: 'Seguridad total', text: 'Tus datos se procesan de forma local en este demo y no se comparten.' }
];

const steps = [
  ['Subí el CV', 'Cargá el CV en PDF, DOCX o TXT.'],
  ['Agregá la búsqueda', 'Pegá la descripción del puesto o subí el archivo.'],
  ['Análisis inteligente', 'Career Signals compara señales y requisitos.'],
  ['Recibí tu reporte', 'Obtené score, alertas e insights accionables.']
];

const methodCards = [
  ['Señales de experiencia', 'Seniority, roles previos, industrias, responsabilidades y evidencia de impacto.'],
  ['Señales de legibilidad', 'Estructura, claridad narrativa, consistencia temporal y compatibilidad con lectura ATS.'],
  ['Señales de ajuste', 'Cruce entre requisitos, competencias explícitas, competencias inferidas y brechas.']
];

const defaultKeywords = ['analytics', 'dashboard', 'BI', 'research', 'SQL', 'stakeholders', 'insights', 'reporting'];

function fileLabel(file) {
  if (!file) return 'Arrastrá un archivo o hacé clic para seleccionar';
  return `${file.name} · ${(file.size / 1024 / 1024).toFixed(2)} MB`;
}

function clamp(n, min = 0, max = 100) { return Math.max(min, Math.min(max, n)); }

function keywordScan(text) {
  const normalized = (text || '').toLowerCase();
  const detected = defaultKeywords.filter(k => normalized.includes(k.toLowerCase()));
  const missing = defaultKeywords.filter(k => !normalized.includes(k.toLowerCase())).slice(0, 4);
  return { detected, missing };
}

function analyzeDummy(cvFile, jobText, jobFile) {
  const textLen = jobText.trim().length;
  const nameSignal = cvFile ? Math.min(10, cvFile.name.length % 11) : 0;
  const hasJobFile = jobFile ? 6 : 0;
  const textSignal = Math.min(18, Math.round(textLen / 85));
  const { detected, missing } = keywordScan(jobText);
  const keywordBonus = detected.length * 2;

  const overall = clamp(63 + nameSignal + hasJobFile + textSignal + keywordBonus, 58, 94);
  const dimensions = {
    experiencia: clamp(overall + 7 + (cvFile ? 2 : 0), 0, 96),
    habilidades: clamp(overall - 4 + keywordBonus, 0, 94),
    rol: clamp(overall + 2, 0, 92),
    trayectoria: clamp(overall - 7 + nameSignal, 0, 90),
    ats: clamp(overall + 4, 0, 95),
    narrativa: clamp(overall - 2, 0, 91)
  };

  const risk = overall >= 84 ? 'Bajo' : overall >= 73 ? 'Medio' : 'Alto';
  const status = overall >= 84 ? 'Muy buen ajuste' : overall >= 73 ? 'Buen ajuste' : 'Ajuste medio';
  const verdict = overall >= 84
    ? 'Perfil fuerte para avanzar a entrevista o shortlist.'
    : overall >= 73
      ? 'Perfil competitivo, con mejoras claras para reforzar la postulación.'
      : 'Perfil con señales útiles, pero requiere mayor alineación con la búsqueda.';

  return {
    score: overall,
    status,
    risk,
    verdict,
    date: new Date().toLocaleString('es-AR'),
    dimensions,
    detected,
    missing: missing.length ? missing : ['métricas de impacto', 'herramientas específicas', 'seniority', 'logros cuantificados'],
    strengths: [
      'Trayectoria profesional con señales consistentes.',
      detected.length ? `Aparecen keywords relevantes: ${detected.slice(0, 3).join(', ')}.` : 'Se identifican responsabilidades transferibles.',
      'El CV presenta elementos compatibles con lectura estructurada.'
    ],
    alerts: [
      'Conviene explicitar métricas de impacto y resultados obtenidos.',
      `Reforzar términos asociados a: ${missing.slice(0, 3).join(', ')}.`,
      'Ordenar bullets por evidencia, herramientas y alcance de responsabilidad.'
    ],
    recommendations: [
      'Reescribir 3 a 5 bullets con verbo de acción + métrica + resultado.',
      'Agregar una sección breve de herramientas relevantes para la búsqueda.',
      'Alinear el resumen profesional con el lenguaje del aviso.',
      'Eliminar elementos visuales que puedan dificultar la lectura ATS.'
    ]
  };
}

function UploadBox({ title, accent, file, onFile, accept, helper }) {
  const [dragging, setDragging] = useState(false);
  const handleDrop = (event) => {
    event.preventDefault(); setDragging(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) onFile(dropped);
  };
  return (
    <label className={`upload-box ${dragging ? 'is-dragging' : ''} ${accent}`} onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={handleDrop}>
      <input type="file" accept={accept} onChange={(e) => onFile(e.target.files?.[0] || null)} />
      <UploadCloud size={38} />
      <strong>{title}</strong>
      <span>{fileLabel(file)}</span>
      <small>{helper}</small>
      <div className="upload-button">Seleccionar archivo</div>
    </label>
  );
}

function MiniMetric({ label, value, tone = '' }) {
  return <div className={`mini-metric ${tone}`}><b>{value}</b><span>{label}</span></div>;
}

function CandidateReport({ result }) {
  const r = result || analyzeDummy({ name: 'Juan_Pablo_Gomez_CV.pdf', size: 324000 }, 'analytics dashboard BI research SQL stakeholders insights reporting', null);
  const bars = [
    ['Experiencia', r.dimensions.experiencia], ['Habilidades técnicas', r.dimensions.habilidades], ['Ajuste al rol', r.dimensions.rol],
    ['Trayectoria', r.dimensions.trayectoria], ['Compatibilidad ATS', r.dimensions.ats], ['Claridad narrativa', r.dimensions.narrativa]
  ];
  return (
    <div className="report-card">
      <div className="report-topbar">
        <div><span className="mini-logo">cs</span><strong>Resumen del candidato</strong></div>
        <span className="status-dot">Análisis completado</span>
      </div>
      <div className="report-grid">
        <div className="score-card">
          <div className="score-ring" style={{ '--score': `${r.score}%` }}><span>{r.score}</span><small>/100</small></div>
          <b>Ajuste general</b><em>{r.status}</em>
        </div>
        <div className="bars-card">
          {bars.map(([label, value]) => <div className="bar-row" key={label}><span>{label}</span><div className="bar"><i style={{ width: `${value}%` }} /></div><b>{value}</b></div>)}
          <div className="risk-row"><span>Riesgo ATS</span><b>{r.risk}</b></div>
        </div>
      </div>
      <div className="verdict-box"><BadgeCheck size={18} /><p>{r.verdict}</p></div>
      <div className="keyword-row">
        {(r.detected.length ? r.detected : ['research', 'analytics', 'insights']).slice(0, 5).map(k => <span key={k}>{k}</span>)}
      </div>
      <div className="insight-grid">
        <div className="insight-box"><h4><CheckCircle2 size={16} /> Fortalezas</h4>{r.strengths.map(x => <p key={x}>{x}</p>)}</div>
        <div className="insight-box warning"><h4><AlertTriangle size={16} /> Áreas de mejora</h4>{r.alerts.map(x => <p key={x}>{x}</p>)}</div>
      </div>
      <button className="link-button">Ver detalle completo <ArrowRight size={16} /></button>
    </div>
  );
}

function App() {
  const [cvFile, setCvFile] = useState(null);
  const [jobFile, setJobFile] = useState(null);
  const [jobText, setJobText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const preview = useMemo(() => analyzeDummy(cvFile || { name: 'Candidate_CV.pdf', size: 310000 }, jobText || 'analytics dashboard BI research SQL stakeholders insights reporting', jobFile), [cvFile, jobText, jobFile]);

  function runAnalysis() {
    const result = analyzeDummy(cvFile, jobText, jobFile);
    setAnalysis(result);
    setTimeout(() => document.querySelector('#demo-report')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
  }

  return (
    <main>
      <header className="nav">
        <a className="brand" href="#top" aria-label="Career Signals home"><span className="brand-mark"><i /><i /><i /><i /></span>Career Signals</a>
        <nav><a href="#producto">Producto</a><a href="#ats">ATS</a><a href="#candidatos">Candidatos</a><a href="#recruiters">Recruiters</a><a href="#demo">Demo</a></nav>
        <div className="nav-actions"><button className="ghost">Iniciar sesión</button><a className="primary small" href="#contacto">Solicitar demo</a><button className="menu"><Menu size={22} /></button></div>
      </header>

      <section id="top" className="hero">
        <div className="hero-bg" /><div className="orb orb-one" /><div className="orb orb-two" />
        <div className="hero-content">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={14} /> Inteligencia que conecta talento con oportunidades</div>
            <h1>Entendemos trayectorias. <span>Revelamos potencial.</span></h1>
            <p>Career Signals analiza CVs y los compara con búsquedas reales para identificar ajuste, detectar brechas y potenciar decisiones de contratación más inteligentes.</p>
            <div className="cta-row"><a className="primary" href="#demo"><UploadCloud size={18} /> Quiero analizar mi CV</a><a className="secondary" href="#contacto">Solicitar demo para mi equipo</a></div>
            <div className="proof-row"><span><CheckCircle2 size={16} /> Análisis en minutos</span><span><Sparkles size={16} /> IA + inteligencia humana</span><span><Lock size={16} /> Confidencial y seguro</span></div>
          </div>
          <div className="hero-product"><CandidateReport result={preview} /></div>
        </div>
      </section>

      <section className="trust-bar"><p>Diseñado para procesos modernos de selección y desarrollo profesional</p><div>{companyLogos.map((logo) => <span key={logo}>{logo}</span>)}</div></section>

      <section id="producto" className="features">{features.map(({ icon: Icon, title, text }) => <article key={title}><Icon size={28} /><h3>{title}</h3><p>{text}</p></article>)}</section>

      <section id="ats" className="premium-section split">
        <div>
          <span className="kicker">Por qué no alcanza con un ATS</span>
          <h2>Los sistemas leen formatos. Nosotros interpretamos señales profesionales.</h2>
          <p>Career Signals no reemplaza el criterio humano: lo ordena. El sistema combina compatibilidad ATS, evidencia de experiencia y lectura de trayectoria para producir una evaluación explicable.</p>
          <div className="comparison-grid">
            <div className="bad-card"><XCircle size={20} /><b>Matching superficial</b><small>Keywords sueltas, filtros rígidos y poca explicación.</small></div>
            <div className="good-card"><CheckCircle2 size={20} /><b>Lectura de trayectoria</b><small>Señales, contexto, brechas y recomendaciones accionables.</small></div>
          </div>
        </div>
        <div className="glass-panel">
          <MiniMetric label="Fit profesional" value="84%" />
          <MiniMetric label="Riesgo ATS" value="Bajo" tone="green" />
          <MiniMetric label="Brechas críticas" value="3" tone="amber" />
          <MiniMetric label="Recomendaciones" value="12" />
        </div>
      </section>

      <section className="premium-section methodology">
        <div className="section-title"><span>Modelo de lectura</span><h2>De CVs a señales de decisión</h2><p>Una matriz simple, explicable y lista para evolucionar hacia análisis real.</p></div>
        <div className="method-grid">{methodCards.map(([title, text], i) => <article key={title}><div>{i + 1}</div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="how"><div className="section-title"><span>Cómo funciona</span><h2>Simple, rápido y preciso</h2></div><div className="steps">{steps.map(([title, text], index) => <article key={title}><b>{index + 1}</b>{index === 0 && <UploadCloud size={34} />}{index === 1 && <FileText size={34} />}{index === 2 && <BrainCircuit size={34} />}{index === 3 && <BarChart3 size={34} />}<h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section id="demo" className="demo-panel">
        <div className="demo-copy"><span>Probá el análisis de tu CV</span><h2>Descubrí qué tan bien se alinea tu perfil</h2><p>Subí tu CV y agregá una descripción de puesto. Este MVP genera un análisis dummy más completo para mostrar la experiencia de producto.</p><div className="demo-points"><span><CheckCircle2 size={16} /> Rápido</span><span><CheckCircle2 size={16} /> Confidencial</span><span><CheckCircle2 size={16} /> Sin compromiso</span></div></div>
        <div className="demo-form">
          <UploadBox title="1. Subí tu CV" accent="purple" file={cvFile} onFile={setCvFile} accept=".pdf,.doc,.docx,.txt" helper="Formatos: PDF, DOCX, TXT · Máx. 10MB" />
          <UploadBox title="2. Agregá la búsqueda" accent="green" file={jobFile} onFile={setJobFile} accept=".pdf,.doc,.docx,.txt" helper="También podés pegar el texto debajo." />
          <textarea value={jobText} onChange={(e) => setJobText(e.target.value)} placeholder="Pegá aquí la descripción del puesto, requisitos, seniority esperado, herramientas clave o responsabilidades principales…" />
          <button className="primary analyze" onClick={runAnalysis} disabled={!cvFile || (!jobText && !jobFile)}><WandSparkles size={18} /> Analizar CV</button>
          <p className="privacy"><Lock size={15} /> En este demo los archivos no se suben a un servidor. El análisis es simulado.</p>
        </div>
      </section>

      {analysis && <section id="demo-report" className="generated-report"><div className="report-explain"><span>Resultado demo</span><h2>Análisis generado</h2><p>Fecha: {analysis.date}</p><div className="recommendation-card"><h3><ClipboardCheck size={18} /> Recomendaciones</h3>{analysis.recommendations.map(x => <p key={x}>• {x}</p>)}<button className="secondary dark"><Download size={16} /> Descargar reporte dummy</button></div></div><CandidateReport result={analysis} /></section>}

      <section className="use-cases">
        <article><BriefcaseBusiness size={26} /><h3>Shortlists más sólidas</h3><p>Priorizá perfiles con mejor ajuste y explicá por qué avanzan.</p></article>
        <article><Users size={26} /><h3>Mejor experiencia candidato</h3><p>Devoluciones claras sobre brechas, fortalezas y ajustes posibles.</p></article>
        <article><DatabaseZap size={26} /><h3>Base comparable</h3><p>Evaluaciones consistentes entre búsquedas, perfiles y equipos.</p></article>
        <article><Gauge size={26} /><h3>Decisión más rápida</h3><p>Menos lectura manual inicial y mayor foco en entrevistas de valor.</p></article>
      </section>

      <section className="audiences">
        <article id="candidatos" className="audience-card candidate"><div><span>Para candidatos</span><h2>Potenciá tu perfil profesional</h2><ul><li>Conocé tu nivel de ajuste antes de aplicar.</li><li>Detectá fortalezas y brechas.</li><li>Recibí recomendaciones para mejorar tu CV.</li><li>Aumentá tus chances de ser seleccionado.</li></ul><a className="primary" href="#demo">Analizar mi CV</a></div><div className="portrait">👩‍💻</div></article>
        <article id="recruiters" className="audience-card recruiter"><div><span>Para recruiters</span><h2>Mejorá tus procesos de selección</h2><ul><li>Filtrá y priorizá candidatos con mejor ajuste.</li><li>Tomá decisiones basadas en señales comparables.</li><li>Ahorrá tiempo en screening y entrevistas.</li><li>Construí shortlists más sólidas.</li></ul><a className="primary green" href="#contacto">Solicitar demo</a></div><div className="portrait">👨‍💼</div></article>
      </section>

      <section id="contacto" className="final-cta"><div><h2>¿Listo para tomar mejores decisiones de talento?</h2><p>Transformá señales profesionales en inteligencia útil.</p></div><a className="secondary light" href="mailto:primosich@signaliq.com.ar?subject=Demo%20Career%20Signals">Solicitar demo</a></section>

      <footer><div><a className="brand" href="#top"><span className="brand-mark"><i /><i /><i /><i /></span> Career Signals</a><p>Inteligencia que conecta talento con oportunidades.</p><div className="social"><span className="social-dot">in</span><Mail size={18} /></div></div><div><h4>Producto</h4><a>Características</a><a>Demo</a><a>Seguridad</a></div><div><h4>Recursos</h4><a>Guías</a><a>Preguntas frecuentes</a><a>Metodología</a></div><div><h4>Legal</h4><a>Política de privacidad</a><a>Términos y condiciones</a></div></footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
