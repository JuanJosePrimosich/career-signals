
import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowRight, BarChart3, CheckCircle2, FileText, Layers3, LineChart, ShieldCheck, Sparkles, UploadCloud, Users, XCircle } from "lucide-react";
import "./styles.css";
import heroRecruiter from "./assets/hero-recruiter.jpg";
import candidatePhoto from "./assets/candidate.jpg";
import recruiterPhoto from "./assets/recruiter.jpg";
import teamPhoto from "./assets/team.jpg";

function App() {
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
        { label: "Experience alignment", value: report.experience },
        { label: "Skills match", value: report.skills },
        { label: "ATS readability", value: report.ats },
        { label: "Trajectory coherence", value: report.trajectory },
        { label: "Narrative clarity", value: report.narrative },
      ],
      strengths: [
        "Strong professional positioning for analytical and research-oriented roles.",
        "Clear evidence of seniority and cross-functional experience.",
        "Relevant methodological background for roles requiring structured judgment.",
      ],
      alerts: [
        "Some required tools are not explicitly visible in the CV.",
        "Achievements could be quantified more consistently.",
        "The profile may need role-specific wording for ATS screening.",
      ],
      recommendations: [
        "Add a compact skills section aligned with the job description.",
        "Rewrite 3–4 experience bullets using measurable outcomes.",
        "Mirror key role terminology without overloading the CV with keywords.",
      ],
      keywords: ["research", "analytics", "stakeholders", "dashboard", "insights", "strategy"],
    };
  }, [report]);

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

  return (
    <div className="site">
      <header className="navbar">
        <a href="#" className="brand">
          <span className="brand-mark">CS</span>
          <span><strong>Career Signals</strong><small>by SignalIQ</small></span>
        </a>
        <nav>
          <a href="#platform">Platform</a><a href="#workflow">Workflow</a><a href="#usecases">Use cases</a><a href="#analysis">Demo</a>
        </nav>
        <a className="nav-cta" href="#analysis">Request analysis</a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Professional trajectory intelligence</p>
            <h1>Better CV screening starts with better signals.</h1>
            <p className="hero-lead">Career Signals evaluates CVs against real job requirements, combining ATS awareness, structured fit scoring and professional trajectory interpretation.</p>
            <div className="hero-actions">
              <a className="btn primary" href="#analysis">Analyze a CV</a>
              <a className="btn secondary" href="#platform">See how it works</a>
            </div>
            <div className="hero-metrics">
              <div><strong>90%</strong><span>ATS readability</span></div>
              <div><strong>4x</strong><span>Faster shortlist review</span></div>
              <div><strong>360°</strong><span>Candidate fit view</span></div>
            </div>
          </div>

          <div className="hero-panel">
            <div className="photo-card"><img src={heroRecruiter} alt="Recruiter reviewing professional profiles" /></div>
            <div className="dashboard-card">
              <div className="dashboard-head"><div><span>Candidate Fit Report</span><strong>Senior Research Analyst</strong></div><b>86%</b></div>
              <Score label="Experience alignment" value={88} />
              <Score label="ATS readability" value={84} />
              <Score label="Skills match" value={79} />
              <div className="mini-grid">
                <div><CheckCircle2 size={18} /><span>Strong analytical background</span></div>
                <div><XCircle size={18} /><span>Missing BI keywords</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="logo-strip">
          <span>Designed for modern recruitment teams</span>
          <div><b>Recruiters</b><b>HR Teams</b><b>Talent Acquisition</b><b>Consultants</b><b>Professionals</b></div>
        </section>

        <section id="platform" className="section">
          <div className="section-head">
            <p className="eyebrow">Platform</p>
            <h2>Not only keyword matching. A clearer reading of professional fit.</h2>
            <p>Career Signals helps identify what a CV says, what it fails to make visible, and how well it aligns with the role being evaluated.</p>
          </div>
          <div className="feature-grid">
            <Feature icon={<ShieldCheck />} title="ATS compatibility" text="Detect formatting, structure and keyword risks that may affect automated screening." />
            <Feature icon={<Users />} title="Professional fit" text="Evaluate alignment between experience, seniority, role requirements and market expectations." />
            <Feature icon={<Layers3 />} title="Trajectory analysis" text="Read career coherence, specialization signals and evolution across roles." />
            <Feature icon={<BarChart3 />} title="Skills intelligence" text="Identify explicit and implicit competencies across experience, achievements and language." />
            <Feature icon={<FileText />} title="Narrative clarity" text="Assess whether the CV communicates impact, scope and expertise with enough precision." />
            <Feature icon={<LineChart />} title="Recruitment insights" text="Produce actionable outputs for recruiters, consultants and professionals." />
          </div>
        </section>

        <section id="workflow" className="workflow">
          <div className="section-head narrow"><p className="eyebrow">Workflow</p><h2>A simple evaluation process for recruiters and professionals.</h2></div>
          <div className="steps">
            <Step number="01" title="Upload CV" text="Add a candidate CV in PDF or Word format." />
            <Step number="02" title="Add job description" text="Paste or upload the role requirements." />
            <Step number="03" title="Generate fit report" text="Receive scores, strengths, alerts and recommendations." />
            <Step number="04" title="Improve decisions" text="Use the output for shortlist review or CV optimization." />
          </div>
        </section>

        <section id="usecases" className="usecases">
          <div className="use-card"><div><p className="eyebrow">For professionals</p><h3>Understand how your CV is read before you apply.</h3><p>Detect missing evidence, weak wording and ATS risks before sending your application.</p></div><img src={candidatePhoto} alt="Professional candidate working on laptop" /></div>
          <div className="use-card"><div><p className="eyebrow">For recruiters</p><h3>Review profiles faster without losing interpretive depth.</h3><p>Prioritize candidates with a structured view of fit, risk and evidence.</p></div><img src={recruiterPhoto} alt="Recruiter interviewing candidate" /></div>
        </section>

        <section className="editorial">
          <img src={teamPhoto} alt="Recruitment team discussing profiles" />
          <div><p className="eyebrow">Why it matters</p><h2>Many strong profiles are poorly represented by their CVs.</h2><p>Career Signals is designed to surface professional evidence, identify gaps in visibility, and translate scattered career information into a clearer evaluation.</p><ul><li><CheckCircle2 size={18} /> Evidence-based recommendations</li><li><CheckCircle2 size={18} /> Recruiter-friendly summaries</li><li><CheckCircle2 size={18} /> Transparent fit dimensions</li></ul></div>
        </section>

        <section id="analysis" className="analysis-section">
          <div className="analysis-copy"><p className="eyebrow">Interactive demo</p><h2>Run a sample fit analysis.</h2><p>This demo uses a simulated analysis layer. The upload and workflow are functional; real document parsing and AI scoring can be connected in the next stage.</p></div>
          <div className="analysis-card">
            <div className="upload-grid">
              <UploadBox title="Upload CV" subtitle="PDF or DOCX" file={cvFile} onChange={setCvFile} />
              <UploadBox title="Upload job description" subtitle="Optional if you paste text" file={jdFile} onChange={setJdFile} />
            </div>
            <label className="textarea-label">Or paste the role requirements<textarea value={jobText} onChange={(e) => setJobText(e.target.value)} placeholder="Paste the job description, required skills, seniority, responsibilities and desired experience..." /></label>
            <button className="btn primary analyze-btn" disabled={!canAnalyze || isAnalyzing} onClick={handleAnalyze}>{isAnalyzing ? "Analyzing signals..." : "Generate fit report"}{!isAnalyzing && <ArrowRight size={18} />}</button>
            {analysis && (
              <div className="report">
                <div className="report-main"><span>Overall fit</span><strong>{analysis.overall}%</strong><p>High potential match with several optimization opportunities.</p></div>
                <div className="dimension-list">{analysis.dimensions.map((d) => <Score key={d.label} label={d.label} value={d.value} />)}</div>
                <div className="report-columns"><ReportList title="Strengths" items={analysis.strengths} positive /><ReportList title="Alerts" items={analysis.alerts} /><ReportList title="Recommendations" items={analysis.recommendations} positive /></div>
                <div className="keywords"><span>Detected role signals</span><div>{analysis.keywords.map((k) => <b key={k}>{k}</b>)}</div></div>
              </div>
            )}
          </div>
        </section>

        <section className="cta"><p className="eyebrow">Career Signals by SignalIQ</p><h2>Transform professional signals into clearer hiring intelligence.</h2><p>Start with a demo. Scale later into a real CV intelligence workflow.</p><a className="btn light" href="#analysis">Try the demo</a></section>
      </main>

      <footer><div><strong>Career Signals</strong><span>Professional trajectory intelligence.</span></div><small>© 2026 Career Signals — A SignalIQ initiative.</small></footer>
    </div>
  );
}

function Score({ label, value }) {
  return <div className="score"><div><span>{label}</span><b>{value}%</b></div><i><em style={{ width: `${value}%` }} /></i></div>;
}
function Feature({ icon, title, text }) {
  return <article className="feature"><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{text}</p></article>;
}
function Step({ number, title, text }) {
  return <article className="step"><span>{number}</span><h3>{title}</h3><p>{text}</p></article>;
}
function UploadBox({ title, subtitle, file, onChange }) {
  return <label className="upload-box"><input type="file" accept=".pdf,.doc,.docx,.txt" onChange={(e) => onChange(e.target.files?.[0] || null)} /><UploadCloud size={26} /><strong>{file ? file.name : title}</strong><span>{file ? "File selected" : subtitle}</span></label>;
}
function ReportList({ title, items, positive }) {
  return <div className="report-list"><h4>{title}</h4><ul>{items.map((item) => <li key={item}>{positive ? <CheckCircle2 size={16} /> : <Sparkles size={16} />}{item}</li>)}</ul></div>;
}

createRoot(document.getElementById("root")).render(<App />);
