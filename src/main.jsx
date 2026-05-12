import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  UploadCloud,
  FileText,
  BrainCircuit,
  BarChart3,
  ShieldCheck,
  Clock3,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ArrowRight,
  Menu,
  Mail,
  Sparkles
} from 'lucide-react';
import './styles.css';

const companyLogos = ['Mercado Libre', 'Globant', 'Accenture', 'PedidosYa', 'Quilmes', 'Banco Galicia'];

const features = [
  {
    icon: BrainCircuit,
    title: 'Análisis inteligente',
    text: 'Evaluamos CVs con criterios estructurados, señales profesionales y consistencia de trayectoria.'
  },
  {
    icon: Target,
    title: 'Ajuste preciso',
    text: 'Comparamos experiencia, habilidades y seniority contra una búsqueda concreta.'
  },
  {
    icon: BarChart3,
    title: 'Insights accionables',
    text: 'Entregamos recomendaciones claras para mejorar el perfil o priorizar candidatos.'
  },
  {
    icon: Clock3,
    title: 'Ahorro de tiempo',
    text: 'Reduce la lectura manual inicial y acelera la construcción de shortlists.'
  },
  {
    icon: ShieldCheck,
    title: 'Seguridad total',
    text: 'Tus datos se procesan de forma local en este demo y no se comparten.'
  }
];

const steps = [
  ['Subí el CV', 'Cargá el CV en PDF, DOCX o TXT.'],
  ['Agregá la búsqueda', 'Pegá la descripción del puesto o subí el archivo.'],
  ['Análisis inteligente', 'Career Signals compara señales y requisitos.'],
  ['Recibí tu reporte', 'Obtené score, alertas e insights accionables.']
];

function fileLabel(file) {
  if (!file) return 'Arrastrá un archivo o hacé clic para seleccionar';
  return `${file.name} · ${(file.size / 1024 / 1024).toFixed(2)} MB`;
}

function scoreFromInputs(cvFile, jobText, jobFile) {
  const base = 62;
  const cvBonus = cvFile ? Math.min(13, Math.round(cvFile.name.length / 3)) : 0;
  const textBonus = jobText ? Math.min(15, Math.round(jobText.length / 70)) : 0;
  const fileBonus = jobFile ? 6 : 0;
  return Math.min(94, base + cvBonus + textBonus + fileBonus);
}

function UploadBox({ title, accent, file, onFile, accept, helper }) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) onFile(dropped);
  };

  return (
    <label
      className={`upload-box ${dragging ? 'is-dragging' : ''} ${accent}`}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <input type="file" accept={accept} onChange={(event) => onFile(event.target.files?.[0] || null)} />
      <UploadCloud size={38} />
      <strong>{title}</strong>
      <span>{fileLabel(file)}</span>
      <small>{helper}</small>
      <div className="upload-button">Seleccionar archivo</div>
    </label>
  );
}

function CandidateReport({ score = 78 }) {
  const status = score >= 82 ? 'Muy buen ajuste' : score >= 72 ? 'Buen ajuste' : 'Ajuste medio';
  const risk = score >= 82 ? 'Bajo' : score >= 72 ? 'Medio' : 'Alto';

  return (
    <div className="report-card">
      <div className="report-topbar">
        <div>
          <span className="mini-logo">cs</span>
          <strong>Resumen del candidato</strong>
        </div>
        <span className="status-dot">Análisis completado</span>
      </div>

      <div className="report-grid">
        <div className="score-card">
          <div className="score-ring" style={{ '--score': `${score}%` }}>
            <span>{score}</span>
            <small>/100</small>
          </div>
          <b>Ajuste general</b>
          <em>{status}</em>
        </div>

        <div className="bars-card">
          {[
            ['Experiencia', Math.min(95, score + 7)],
            ['Habilidades técnicas', Math.max(60, score - 5)],
            ['Ajuste al rol', Math.min(90, score + 2)],
            ['Trayectoria', Math.max(58, score - 8)],
            ['Compatibilidad ATS', Math.min(92, score + 4)]
          ].map(([label, value]) => (
            <div className="bar-row" key={label}>
              <span>{label}</span>
              <div className="bar"><i style={{ width: `${value}%` }} /></div>
              <b>{value}</b>
            </div>
          ))}
          <div className="risk-row"><span>Riesgo ATS</span><b>{risk}</b></div>
        </div>
      </div>

      <div className="insight-grid">
        <div className="insight-box">
          <h4><CheckCircle2 size={16} /> Fortalezas</h4>
          <p>Sólida experiencia analítica.</p>
          <p>Trayectoria profesional consistente.</p>
          <p>Logros y responsabilidades identificables.</p>
        </div>
        <div className="insight-box warning">
          <h4><AlertTriangle size={16} /> Áreas de mejora</h4>
          <p>Incluir métricas de impacto.</p>
          <p>Destacar herramientas relevantes.</p>
          <p>Optimizar keywords ATS.</p>
        </div>
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
  const score = useMemo(() => scoreFromInputs(cvFile, jobText, jobFile), [cvFile, jobText, jobFile]);

  function runAnalysis() {
    setAnalysis({ score, date: new Date().toLocaleString('es-AR') });
    setTimeout(() => {
      document.querySelector('#demo-report')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  }

  return (
    <main>
      <header className="nav">
        <a className="brand" href="#top" aria-label="Career Signals home">
          <span className="brand-mark"><i /><i /><i /><i /></span>
          Career Signals
        </a>
        <nav>
          <a href="#producto">Producto</a>
          <a href="#candidatos">Para candidatos</a>
          <a href="#recruiters">Para recruiters</a>
          <a href="#demo">Demo</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <div className="nav-actions">
          <button className="ghost">Iniciar sesión</button>
          <button className="primary small">Solicitar demo</button>
          <button className="menu"><Menu size={22} /></button>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-copy">
            <div className="eyebrow">Inteligencia que conecta talento con oportunidades</div>
            <h1>Entendemos trayectorias. <span>Revelamos potencial.</span></h1>
            <p>Career Signals analiza CVs y los compara con búsquedas reales para identificar ajuste, detectar brechas y potenciar decisiones de contratación más inteligentes.</p>
            <div className="cta-row">
              <a className="primary" href="#demo"><UploadCloud size={18} /> Quiero analizar mi CV</a>
              <a className="secondary" href="#contacto">Solicitar demo para mi equipo</a>
            </div>
            <div className="proof-row">
              <span><CheckCircle2 size={16} /> Análisis en minutos</span>
              <span><Sparkles size={16} /> IA + inteligencia humana</span>
              <span><Lock size={16} /> Confidencial y seguro</span>
            </div>
          </div>
          <CandidateReport score={78} />
        </div>
      </section>

      <section className="trust-bar">
        <p>Confían en soluciones de talento y análisis</p>
        <div>{companyLogos.map((logo) => <span key={logo}>{logo}</span>)}</div>
      </section>

      <section id="producto" className="features">
        {features.map(({ icon: Icon, title, text }) => (
          <article key={title}>
            <Icon size={28} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="how">
        <div className="section-title">
          <span>Cómo funciona</span>
          <h2>Simple, rápido y preciso</h2>
        </div>
        <div className="steps">
          {steps.map(([title, text], index) => (
            <article key={title}>
              <b>{index + 1}</b>
              {index === 0 && <UploadCloud size={34} />}
              {index === 1 && <FileText size={34} />}
              {index === 2 && <BrainCircuit size={34} />}
              {index === 3 && <BarChart3 size={34} />}
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="demo" className="demo-panel">
        <div className="demo-copy">
          <span>Probá el análisis de tu CV</span>
          <h2>Descubrí qué tan bien se alinea tu perfil</h2>
          <p>Subí tu CV y agregá una descripción de puesto. Este MVP genera un análisis dummy para mostrar la experiencia de producto.</p>
          <div className="demo-points">
            <span><CheckCircle2 size={16} /> Rápido</span>
            <span><CheckCircle2 size={16} /> Confidencial</span>
            <span><CheckCircle2 size={16} /> Sin compromiso</span>
          </div>
        </div>

        <div className="demo-form">
          <UploadBox
            title="1. Subí tu CV"
            accent="purple"
            file={cvFile}
            onFile={setCvFile}
            accept=".pdf,.doc,.docx,.txt"
            helper="Formatos soportados: PDF, DOCX, TXT · Máx. 10MB"
          />
          <UploadBox
            title="2. Agregá la descripción del puesto"
            accent="green"
            file={jobFile}
            onFile={setJobFile}
            accept=".pdf,.doc,.docx,.txt"
            helper="También podés pegar el texto debajo."
          />
          <textarea
            value={jobText}
            onChange={(event) => setJobText(event.target.value)}
            placeholder="Pegá aquí la descripción del puesto, requisitos, seniority esperado o habilidades clave…"
          />
          <button className="primary analyze" onClick={runAnalysis} disabled={!cvFile || (!jobText && !jobFile)}>
            Analizar CV
          </button>
          <p className="privacy"><Lock size={15} /> En este demo los archivos no se suben a un servidor. El análisis es simulado.</p>
        </div>
      </section>

      {analysis && (
        <section id="demo-report" className="generated-report">
          <div>
            <span>Resultado demo</span>
            <h2>Análisis generado</h2>
            <p>Fecha: {analysis.date}</p>
          </div>
          <CandidateReport score={analysis.score} />
        </section>
      )}

      <section className="audiences">
        <article id="candidatos" className="audience-card candidate">
          <div>
            <span>Para candidatos</span>
            <h2>Potenciá tu perfil profesional</h2>
            <ul>
              <li>Conocé tu nivel de ajuste antes de aplicar.</li>
              <li>Detectá tus fortalezas y brechas.</li>
              <li>Recibí recomendaciones para mejorar tu CV.</li>
              <li>Aumentá tus chances de ser seleccionado.</li>
            </ul>
            <a className="primary" href="#demo">Analizar mi CV</a>
          </div>
          <div className="portrait">👩‍💻</div>
        </article>

        <article id="recruiters" className="audience-card recruiter">
          <div>
            <span>Para recruiters</span>
            <h2>Mejorá tus procesos de selección</h2>
            <ul>
              <li>Filtrá y priorizá candidatos con mejor ajuste.</li>
              <li>Tomá decisiones basadas en datos.</li>
              <li>Ahorrá tiempo en screening y entrevistas.</li>
              <li>Construí shortlists más sólidas.</li>
            </ul>
            <a className="primary green" href="#contacto">Solicitar demo</a>
          </div>
          <div className="portrait">👨‍💼</div>
        </article>
      </section>

      <section id="contacto" className="final-cta">
        <div>
          <h2>¿Listo para tomar mejores decisiones de talento?</h2>
          <p>Unite a los equipos que quieren transformar señales profesionales en inteligencia útil.</p>
        </div>
        <a className="secondary light" href="mailto:primosich@signaliq.com.ar?subject=Demo%20Career%20Signals">Solicitar demo</a>
      </section>

      <footer>
        <div>
          <a className="brand" href="#top"><span className="brand-mark"><i /><i /><i /><i /></span> Career Signals</a>
          <p>Inteligencia que conecta talento con oportunidades.</p>
          <div className="social"><span className="social-dot">in</span><Mail size={18} /></div>
        </div>
        <div>
          <h4>Producto</h4><a>Características</a><a>Demo</a><a>Seguridad</a>
        </div>
        <div>
          <h4>Recursos</h4><a>Blog</a><a>Guías</a><a>Preguntas frecuentes</a>
        </div>
        <div>
          <h4>Legal</h4><a>Política de privacidad</a><a>Términos y condiciones</a>
        </div>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
