import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileText,
  Layers3,
  LineChart,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Users,
  XCircle,
} from "lucide-react";

import "./styles.css";

import heroRecruiter from "./assets/hero-recruiter.jpg";
import candidatePhoto from "./assets/candidate.jpg";
import recruiterPhoto from "./assets/recruiter.jpg";
import teamPhoto from "./assets/team.jpg";

const translations = {
  en: {
    byBrand: "by signalIQ",
    navPlatform: "Platform",
    navWorkflow: "Workflow",
    navUseCases: "Use cases",
    navDemo: "Demo",
    navCta: "Request analysis",

    heroEyebrow: "Professional trajectory intelligence",
    heroTitle: "Better CV screening starts with better signals.",
    heroLead:
      "Career Signals evaluates CVs against real job requirements, combining ATS awareness, structured fit scoring and professional trajectory interpretation.",
    heroAnalyze: "Analyze a CV",
    heroHow: "See how it works",
    metricA: "ATS readability",
    metricB: "Faster shortlist review",
    metricC: "Candidate fit view",

    dashboardTitle: "Candidate Fit Report",
    dashboardRole: "Senior Research Analyst",
    dashboardScoreA: "Experience alignment",
    dashboardScoreB: "ATS readability",
    dashboardScoreC: "Skills match",
    dashboardGood: "Strong analytical background",
    dashboardAlert: "Missing BI keywords",

    strip: "Designed for modern recruitment teams",
    audienceRecruiters: "Recruiters",
    audienceHr: "HR Teams",
    audienceTalent: "Talent Acquisition",
    audienceConsultants: "Consultants",
    audienceProfessionals: "Professionals",

    platformEyebrow: "Platform",
    platformTitle: "Not only keyword matching. A clearer reading of professional fit.",
    platformText:
      "Career Signals helps identify what a CV says, what it fails to make visible, and how well it aligns with the role being evaluated.",

    feature1Title: "ATS compatibility",
    feature1Text: "Detect formatting, structure and keyword risks that may affect automated screening.",
    feature2Title: "Professional fit",
    feature2Text: "Evaluate alignment between experience, seniority, role requirements and market expectations.",
    feature3Title: "Trajectory analysis",
    feature3Text: "Read career coherence, specialization signals and evolution across roles.",
    feature4Title: "Skills intelligence",
    feature4Text: "Identify explicit and implicit competencies across experience, achievements and language.",
    feature5Title: "Narrative clarity",
    feature5Text: "Assess whether the CV communicates impact, scope and expertise with enough precision.",
    feature6Title: "Recruitment insights",
    feature6Text: "Produce actionable outputs for recruiters, consultants and professionals.",

    workflowEyebrow: "Workflow",
    workflowTitle: "A simple evaluation process for recruiters and professionals.",
    step1Title: "Upload CV",
    step1Text: "Add a candidate CV in PDF or Word format.",
    step2Title: "Add job description",
    step2Text: "Paste or upload the role requirements.",
    step3Title: "Generate fit report",
    step3Text: "Receive scores, strengths, alerts and recommendations.",
    step4Title: "Improve decisions",
    step4Text: "Use the output for shortlist review or CV optimization.",

    useCandidateEyebrow: "For professionals",
    useCandidateTitle: "Understand how your CV is read before you apply.",
    useCandidateText: "Detect missing evidence, weak wording and ATS risks before sending your application.",
    useRecruiterEyebrow: "For recruiters",
    useRecruiterTitle: "Review profiles faster without losing interpretive depth.",
    useRecruiterText: "Prioritize candidates with a structured view of fit, risk and evidence.",

    editorialEyebrow: "Why it matters",
    editorialTitle: "Many strong profiles are poorly represented by their CVs.",
    editorialText:
      "Career Signals is designed to surface professional evidence, identify gaps in visibility, and translate scattered career information into a clearer evaluation.",
    editorial1: "Evidence-based recommendations",
    editorial2: "Recruiter-friendly summaries",
    editorial3: "Transparent fit dimensions",

    analysisEyebrow: "Interactive demo",
    analysisTitle: "Run a sample fit analysis.",
    analysisText:
      "This demo uses a simulated analysis layer. The upload and workflow are functional; real document parsing and AI scoring can be connected in the next stage.",
    uploadCv: "Upload CV",
    uploadCvSub: "PDF or DOCX",
    uploadJd: "Upload job description",
    uploadJdSub: "Optional if you paste text",
    fileSelected: "File selected",
    pasteLabel: "Or paste the role requirements",
    pastePlaceholder:
      "Paste the job description, required skills, seniority, responsibilities and desired experience...",
    analyzing: "Analyzing signals...",
    generate: "Generate fit report",
    overallFit: "Overall fit",
    reportSummary: "High potential match with several optimization opportunities.",
    strengths: "Strengths",
    alerts: "Alerts",
    recommendations: "Recommendations",
    detectedSignals: "Detected role signals",

    dimensionExperience: "Experience alignment",
    dimensionSkills: "Skills match",
    dimensionAts: "ATS readability",
    dimensionTrajectory: "Trajectory coherence",
    dimensionNarrative: "Narrative clarity",

    strength1: "Strong professional positioning for analytical and research-oriented roles.",
    strength2: "Clear evidence of seniority and cross-functional experience.",
    strength3: "Relevant methodological background for roles requiring structured judgment.",
    alert1: "Some required tools are not explicitly visible in the CV.",
    alert2: "Achievements could be quantified more consistently.",
    alert3: "The profile may need role-specific wording for ATS screening.",
    rec1: "Add a compact skills section aligned with the job description.",
    rec2: "Rewrite 3–4 experience bullets using measurable outcomes.",
    rec3: "Mirror key role terminology without overloading the CV with keywords.",

    ctaEyebrow: "Career Signals by signalIQ",
    ctaTitle: "Transform professional signals into clearer hiring intelligence.",
    ctaText: "Start with a demo. Scale later into a real CV intelligence workflow.",
    ctaButton: "Try the demo",

    footerText: "Professional trajectory intelligence.",
    footerLegal: "© 2026 Career Signals — A signalIQ initiative.",
  },

  es: {
    byBrand: "by signalIQ",
    navPlatform: "Plataforma",
    navWorkflow: "Proceso",
    navUseCases: "Casos de uso",
    navDemo: "Demo",
    navCta: "Solicitar análisis",

    heroEyebrow: "Inteligencia de trayectorias profesionales",
    heroTitle: "Una mejor lectura de CV empieza por mejores señales.",
    heroLead:
      "Career Signals evalúa CVs contra búsquedas reales, combinando compatibilidad ATS, scoring estructurado de ajuste e interpretación de trayectorias profesionales.",
    heroAnalyze: "Analizar un CV",
    heroHow: "Ver cómo funciona",
    metricA: "Legibilidad ATS",
    metricB: "Revisión de shortlist más rápida",
    metricC: "Lectura integral del perfil",

    dashboardTitle: "Reporte de ajuste del candidato",
    dashboardRole: "Senior Research Analyst",
    dashboardScoreA: "Alineación de experiencia",
    dashboardScoreB: "Legibilidad ATS",
    dashboardScoreC: "Ajuste de skills",
    dashboardGood: "Fuerte perfil analítico",
    dashboardAlert: "Faltan keywords de BI",

    strip: "Diseñado para equipos modernos de reclutamiento",
    audienceRecruiters: "Recruiters",
    audienceHr: "Equipos de RR.HH.",
    audienceTalent: "Talent Acquisition",
    audienceConsultants: "Consultores",
    audienceProfessionals: "Profesionales",

    platformEyebrow: "Plataforma",
    platformTitle: "No es solo matching de palabras clave. Es una lectura más clara del ajuste profesional.",
    platformText:
      "Career Signals ayuda a identificar qué dice un CV, qué no logra hacer visible y qué tan bien se alinea con el rol evaluado.",

    feature1Title: "Compatibilidad ATS",
    feature1Text: "Detecta riesgos de formato, estructura y palabras clave que pueden afectar sistemas de screening automático.",
    feature2Title: "Ajuste profesional",
    feature2Text: "Evalúa la alineación entre experiencia, seniority, requisitos del rol y expectativas del mercado.",
    feature3Title: "Análisis de trayectoria",
    feature3Text: "Lee coherencia de carrera, señales de especialización y evolución profesional entre roles.",
    feature4Title: "Inteligencia de skills",
    feature4Text: "Identifica competencias explícitas e implícitas en experiencia, logros y lenguaje.",
    feature5Title: "Claridad narrativa",
    feature5Text: "Evalúa si el CV comunica impacto, alcance y expertise con suficiente precisión.",
    feature6Title: "Insights para reclutamiento",
    feature6Text: "Produce salidas accionables para recruiters, consultores y profesionales.",

    workflowEyebrow: "Proceso",
    workflowTitle: "Un proceso simple de evaluación para recruiters y profesionales.",
    step1Title: "Subir CV",
    step1Text: "Agregá un CV en PDF o Word.",
    step2Title: "Agregar búsqueda",
    step2Text: "Pegá o subí los requisitos del rol.",
    step3Title: "Generar reporte",
    step3Text: "Recibí scores, fortalezas, alertas y recomendaciones.",
    step4Title: "Mejorar decisiones",
    step4Text: "Usá el resultado para revisar shortlists u optimizar un CV.",

    useCandidateEyebrow: "Para profesionales",
    useCandidateTitle: "Entendé cómo se lee tu CV antes de aplicar.",
    useCandidateText: "Detectá evidencia faltante, redacción débil y riesgos ATS antes de enviar tu postulación.",
    useRecruiterEyebrow: "Para recruiters",
    useRecruiterTitle: "Revisá perfiles más rápido sin perder profundidad interpretativa.",
    useRecruiterText: "Priorizá candidatos con una lectura estructurada de ajuste, evidencia y riesgo.",

    editorialEyebrow: "Por qué importa",
    editorialTitle: "Muchos perfiles fuertes están mal representados por sus CVs.",
    editorialText:
      "Career Signals está diseñado para hacer visible evidencia profesional, identificar brechas de visibilidad y traducir información dispersa de carrera en una evaluación más clara.",
    editorial1: "Recomendaciones basadas en evidencia",
    editorial2: "Síntesis útiles para recruiters",
    editorial3: "Dimensiones transparentes de ajuste",

    analysisEyebrow: "Demo interactiva",
    analysisTitle: "Corré un análisis de ajuste de prueba.",
    analysisText:
      "Esta demo usa una capa de análisis simulada. El upload y el flujo son funcionales; la lectura real de documentos y el scoring con IA se pueden conectar en la próxima etapa.",
    uploadCv: "Subir CV",
    uploadCvSub: "PDF o DOCX",
    uploadJd: "Subir descripción del puesto",
    uploadJdSub: "Opcional si pegás el texto",
    fileSelected: "Archivo seleccionado",
    pasteLabel: "O pegá los requisitos del rol",
    pastePlaceholder:
      "Pegá la descripción del puesto, skills requeridas, seniority, responsabilidades y experiencia esperada...",
    analyzing: "Analizando señales...",
    generate: "Generar reporte de ajuste",
    overallFit: "Ajuste general",
    reportSummary: "Match potencial alto, con varias oportunidades de optimización.",
    strengths: "Fortalezas",
    alerts: "Alertas",
    recommendations: "Recomendaciones",
    detectedSignals: "Señales detectadas del rol",

    dimensionExperience: "Alineación de experiencia",
    dimensionSkills: "Ajuste de skills",
    dimensionAts: "Legibilidad ATS",
    dimensionTrajectory: "Coherencia de trayectoria",
    dimensionNarrative: "Claridad narrativa",

    strength1: "Posicionamiento profesional sólido para roles analíticos y de investigación.",
    strength2: "Evidencia clara de seniority y experiencia transversal.",
    strength3: "Base metodológica relevante para roles que requieren juicio estructurado.",
    alert1: "Algunas herramientas requeridas no aparecen explícitamente en el CV.",
    alert2: "Los logros podrían cuantificarse de manera más consistente.",
    alert3: "El perfil puede necesitar lenguaje más alineado con el rol para pasar filtros ATS.",
    rec1: "Agregar una sección compacta de skills alineada con la búsqueda.",
    rec2: "Reescribir 3 o 4 bullets de experiencia usando resultados medibles.",
    rec3: "Reflejar términos clave del rol sin sobrecargar el CV de keywords.",

    ctaEyebrow: "Career Signals by signalIQ",
    ctaTitle: "Transformá señales profesionales en inteligencia más clara para decidir.",
    ctaText: "Empezá con una demo. Después escalamos hacia un flujo real de inteligencia de CVs.",
    ctaButton: "Probar la demo",

    footerText: "Inteligencia de trayectorias profesionales.",
    footerLegal: "© 2026 Career Signals — Una iniciativa de signalIQ.",
  },
};

function getInitialLanguage() {
  if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("es")) {
    return "es";
  }
  return "en";
}

function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const t = (key) => translations[language][key] || translations.en[key] || key;

  const [cvFile, setCvFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [jobText, setJobText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState(null);

  const canAnalyze = cvFile && (jdFile || jobText.trim().length > 20);

  const analysis = useMemo(() => {
    if (!report) return null;

    return {
      overall: report.overall,
      dimensions: [
        { label: t("dimensionExperience"), value: report.experience },
        { label: t("dimensionSkills"), value: report.skills },
        { label: t("dimensionAts"), value: report.ats },
        { label: t("dimensionTrajectory"), value: report.trajectory },
        { label: t("dimensionNarrative"), value: report.narrative },
      ],
      strengths: [t("strength1"), t("strength2"), t("strength3")],
      alerts: [t("alert1"), t("alert2"), t("alert3")],
      recommendations: [t("rec1"), t("rec2"), t("rec3")],
      keywords: ["research", "analytics", "stakeholders", "dashboard", "insights", "strategy"],
    };
  }, [report, language]);

  function handleAnalyze() {
    if (!canAnalyze) return;

    setIsAnalyzing(true);
    setReport(null);

    const seed = (cvFile?.name?.length || 12) + (jobText.length || jdFile?.name?.length || 8);
    const variation = seed % 9;

    setTimeout(() => {
      setReport({
        overall: 82 + variation,
        experience: 84 + (variation % 5),
        skills: 76 + (variation % 8),
        ats: 79 + (variation % 7),
        trajectory: 87 + (variation % 6),
        narrative: 74 + (variation % 9),
      });
      setIsAnalyzing(false);
    }, 1100);
  }

  const features = [
    { icon: <ShieldCheck />, title: t("feature1Title"), text: t("feature1Text") },
    { icon: <Users />, title: t("feature2Title"), text: t("feature2Text") },
    { icon: <Layers3 />, title: t("feature3Title"), text: t("feature3Text") },
    { icon: <BarChart3 />, title: t("feature4Title"), text: t("feature4Text") },
    { icon: <FileText />, title: t("feature5Title"), text: t("feature5Text") },
    { icon: <LineChart />, title: t("feature6Title"), text: t("feature6Text") },
  ];

  const steps = [
    { number: "01", title: t("step1Title"), text: t("step1Text") },
    { number: "02", title: t("step2Title"), text: t("step2Text") },
    { number: "03", title: t("step3Title"), text: t("step3Text") },
    { number: "04", title: t("step4Title"), text: t("step4Text") },
  ];

  return (
    <div className="site">
      <header className="navbar">
        <a href="#" className="brand">
          <span className="brand-mark">CS</span>
          <span>
            <strong>Career Signals</strong>
            <small>{t("byBrand")}</small>
          </span>
        </a>

        <nav>
          <a href="#platform">{t("navPlatform")}</a>
          <a href="#workflow">{t("navWorkflow")}</a>
          <a href="#usecases">{t("navUseCases")}</a>
          <a href="#analysis">{t("navDemo")}</a>
        </nav>

        <div className="nav-actions">
          <div className="language-toggle" aria-label="Language selector">
            <button
              type="button"
              className={language === "es" ? "active" : ""}
              onClick={() => setLanguage("es")}
            >
              ES
            </button>
            <button
              type="button"
              className={language === "en" ? "active" : ""}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
          </div>
          <a className="nav-cta" href="#analysis">{t("navCta")}</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">{t("heroEyebrow")}</p>
            <h1>{t("heroTitle")}</h1>
            <p className="hero-lead">{t("heroLead")}</p>

            <div className="hero-actions">
              <a className="btn primary" href="#analysis">{t("heroAnalyze")}</a>
              <a className="btn secondary" href="#platform">{t("heroHow")}</a>
            </div>

            <div className="hero-metrics">
              <div><strong>90%</strong><span>{t("metricA")}</span></div>
              <div><strong>4x</strong><span>{t("metricB")}</span></div>
              <div><strong>360°</strong><span>{t("metricC")}</span></div>
            </div>
          </div>

          <div className="hero-panel">
            <div className="photo-card">
              <img src={heroRecruiter} alt="Recruiter reviewing professional profiles" />
            </div>

            <div className="dashboard-card">
              <div className="dashboard-head">
                <div>
                  <span>{t("dashboardTitle")}</span>
                  <strong>{t("dashboardRole")}</strong>
                </div>
                <b>86%</b>
              </div>

              <Score label={t("dashboardScoreA")} value={88} />
              <Score label={t("dashboardScoreB")} value={84} />
              <Score label={t("dashboardScoreC")} value={79} />

              <div className="mini-grid">
                <div><CheckCircle2 size={18} /><span>{t("dashboardGood")}</span></div>
                <div><XCircle size={18} /><span>{t("dashboardAlert")}</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="logo-strip">
          <span>{t("strip")}</span>
          <div>
            <b>{t("audienceRecruiters")}</b>
            <b>{t("audienceHr")}</b>
            <b>{t("audienceTalent")}</b>
            <b>{t("audienceConsultants")}</b>
            <b>{t("audienceProfessionals")}</b>
          </div>
        </section>

        <section id="platform" className="section">
          <div className="section-head">
            <p className="eyebrow">{t("platformEyebrow")}</p>
            <h2>{t("platformTitle")}</h2>
            <p>{t("platformText")}</p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <Feature key={feature.title} icon={feature.icon} title={feature.title} text={feature.text} />
            ))}
          </div>
        </section>

        <section id="workflow" className="workflow">
          <div className="section-head narrow">
            <p className="eyebrow">{t("workflowEyebrow")}</p>
            <h2>{t("workflowTitle")}</h2>
          </div>

          <div className="steps">
            {steps.map((step) => (
              <Step key={step.number} number={step.number} title={step.title} text={step.text} />
            ))}
          </div>
        </section>

        <section id="usecases" className="usecases">
          <div className="use-card">
            <div>
              <p className="eyebrow">{t("useCandidateEyebrow")}</p>
              <h3>{t("useCandidateTitle")}</h3>
              <p>{t("useCandidateText")}</p>
            </div>
            <img src={candidatePhoto} alt="Professional candidate working on laptop" />
          </div>

          <div className="use-card">
            <div>
              <p className="eyebrow">{t("useRecruiterEyebrow")}</p>
              <h3>{t("useRecruiterTitle")}</h3>
              <p>{t("useRecruiterText")}</p>
            </div>
            <img src={recruiterPhoto} alt="Recruiter interviewing candidate" />
          </div>
        </section>

        <section className="editorial">
          <img src={teamPhoto} alt="Recruitment team discussing profiles" />
          <div>
            <p className="eyebrow">{t("editorialEyebrow")}</p>
            <h2>{t("editorialTitle")}</h2>
            <p>{t("editorialText")}</p>
            <ul>
              <li><CheckCircle2 size={18} /> {t("editorial1")}</li>
              <li><CheckCircle2 size={18} /> {t("editorial2")}</li>
              <li><CheckCircle2 size={18} /> {t("editorial3")}</li>
            </ul>
          </div>
        </section>

        <section id="analysis" className="analysis-section">
          <div className="analysis-copy">
            <p className="eyebrow">{t("analysisEyebrow")}</p>
            <h2>{t("analysisTitle")}</h2>
            <p>{t("analysisText")}</p>
          </div>

          <div className="analysis-card">
            <div className="upload-grid">
              <UploadBox title={t("uploadCv")} subtitle={t("uploadCvSub")} selectedText={t("fileSelected")} file={cvFile} onChange={setCvFile} />
              <UploadBox title={t("uploadJd")} subtitle={t("uploadJdSub")} selectedText={t("fileSelected")} file={jdFile} onChange={setJdFile} />
            </div>

            <label className="textarea-label">
              {t("pasteLabel")}
              <textarea
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                placeholder={t("pastePlaceholder")}
              />
            </label>

            <button
              className="btn primary analyze-btn"
              disabled={!canAnalyze || isAnalyzing}
              onClick={handleAnalyze}
            >
              {isAnalyzing ? t("analyzing") : t("generate")}
              {!isAnalyzing && <ArrowRight size={18} />}
            </button>

            {analysis && (
              <div className="report">
                <div className="report-main">
                  <span>{t("overallFit")}</span>
                  <strong>{analysis.overall}%</strong>
                  <p>{t("reportSummary")}</p>
                </div>

                <div className="dimension-list">
                  {analysis.dimensions.map((d) => (
                    <Score key={d.label} label={d.label} value={d.value} />
                  ))}
                </div>

                <div className="report-columns">
                  <ReportList title={t("strengths")} items={analysis.strengths} positive />
                  <ReportList title={t("alerts")} items={analysis.alerts} />
                  <ReportList title={t("recommendations")} items={analysis.recommendations} positive />
                </div>

                <div className="keywords">
                  <span>{t("detectedSignals")}</span>
                  <div>
                    {analysis.keywords.map((k) => <b key={k}>{k}</b>)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="cta">
          <p className="eyebrow">{t("ctaEyebrow")}</p>
          <h2>{t("ctaTitle")}</h2>
          <p>{t("ctaText")}</p>
          <a className="btn light" href="#analysis">{t("ctaButton")}</a>
        </section>
      </main>

      <footer>
        <div>
          <strong>Career Signals</strong>
          <span>{t("footerText")}</span>
        </div>
        <small>{t("footerLegal")}</small>
      </footer>
    </div>
  );
}

function Score({ label, value }) {
  return (
    <div className="score">
      <div><span>{label}</span><b>{value}%</b></div>
      <i><em style={{ width: `${value}%` }} /></i>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <article className="feature">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function Step({ number, title, text }) {
  return (
    <article className="step">
      <span>{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function UploadBox({ title, subtitle, selectedText, file, onChange }) {
  return (
    <label className="upload-box">
      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
      <UploadCloud size={26} />
      <strong>{file ? file.name : title}</strong>
      <span>{file ? selectedText : subtitle}</span>
    </label>
  );
}

function ReportList({ title, items, positive }) {
  return (
    <div className="report-list">
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>
            {positive ? <CheckCircle2 size={16} /> : <Sparkles size={16} />}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
