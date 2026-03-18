import { useState, useEffect, useRef } from "react";
import Head from "next/head";

/* ═══════════════════════════════════════════════
   AI READINESS BENCHMARK v4
   Gaia Allies | AI Ready
   Brand-matched to gaiaallies.com/aiready
   ═══════════════════════════════════════════════ */

const C = {
  dark: "#1a2332",
  gold: "#c4993c",
  goldHover: "#d4a94c",
  green: "#4a6741",
  greenBg: "#e8ede6",
  body: "#1a1a2e",
  text: "#6b6b6b",
  muted: "#8a8a8a",
  bg: "#f4f2ed",
  border: "#e8e4de",
  card: "#fff",
  error: "#c0392b",
  /* Pillar colors */
  people: "#6B4C9A",
  peopleBg: "rgba(107,76,154,0.06)",
  process: "#4a6741",
  processBg: "rgba(74,103,65,0.06)",
  data: "#c4993c",
  dataBg: "rgba(196,153,60,0.06)",
  firmwide: "#1a2332",
  firmwideBg: "rgba(26,35,50,0.06)",
};

const SANS = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`;
const SERIF = `'Georgia', 'Times New Roman', serif`;
const isValidEmail = (e) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e);

/* ═══ PRACTICE AREAS (common small law, alphabetized) ═══ */
const PRACTICE_AREAS = [
  "Admiralty / Maritime", "Bankruptcy", "Business / Corporate", "Civil Rights",
  "Collections", "Construction Law", "Consumer Protection", "Criminal Defense",
  "DUI / DWI", "Education Law", "Elder Law", "Employment / Labor Law",
  "Environmental Law", "Estate Planning / Probate / Trusts", "Family Law / Divorce",
  "General Litigation", "Government / Municipal", "Healthcare Law",
  "Immigration", "Insurance Defense", "Intellectual Property",
  "Landlord / Tenant", "Medical Malpractice", "Nursing Home / Long-Term Care",
  "Personal Injury / Plaintiff Litigation", "Product Liability",
  "Real Estate / Transactional", "Social Security / Disability",
  "Tax", "Traffic / Tickets", "Workers Compensation", "Other",
];

/* ═══ PLATFORMS (alphabetized) ═══ */
const PLATFORMS = [
  "AbacusLaw", "Actionstep", "Amicus Attorney", "CASEpeer", "Centerbase",
  "Clio Manage", "CloudLex", "CosmoLex", "Docketwise", "Filevine",
  "Lawmatics", "LEAP", "Litify", "MyCase", "Needles / Neos",
  "PracticePanther", "ProLaw", "Rocket Matter", "SmartAdvocate",
  "Smokeball", "Tabs3", "TrialWorks",
  "None / Spreadsheets / Paper", "Other",
];

/* ═══ ADDITIONAL TOOLS (categorized, from gaiaallies.com/aiready) ═══ */
const TOOL_CATEGORIES = [
  { name: "General-Purpose AI and Productivity", tools: [
    "ChatGPT / OpenAI", "Claude / Anthropic", "Gemini / Google", "Google NotebookLM",
    "Grammarly", "Microsoft Copilot", "Microsoft Copilot Notebooks", "Perplexity", "Other (AI/Productivity)",
  ]},
  { name: "Legal Research", tools: [
    "CoCounsel (Thomson Reuters)", "Fastcase / vLex", "Harvey",
    "Lexis+ AI", "Vincent AI", "Westlaw Precision", "Other (Research)",
  ]},
  { name: "Litigation, PI, and Document AI", tools: [
    "Clearbrief", "Darrow", "EsquireTek", "EvenUp",
    "Lex Machina", "Parambil", "Spellbook", "Supio", "Other (Litigation/Doc AI)",
  ]},
  { name: "Meeting, Communication, and Transcription", tools: [
    "Fathom", "Fireflies.ai", "Jamie", "Otter.ai", "Read.ai",
    "Tactiq", "Teams + Copilot", "Zoom AI Companion", "Other (Meeting/Transcription)",
  ]},
  { name: "CRM, Intake, Marketing, and Billing", tools: [
    "Billables AI", "Captorra", "Clio Grow", "HubSpot",
    "Lawmatics", "Law Ruler", "Litify", "QuickBooks",
    "Salesforce", "Smith.ai", "TimeSolv", "Zoho CRM", "Other (CRM/Billing)",
  ]},
  { name: "Project Management and Collaboration", tools: [
    "Asana", "ClickUp", "Monday.com", "Notion",
    "Slack", "Trello", "Microsoft Teams", "Other (Project Mgmt)",
  ]},
  { name: "Document Management and E-Signature", tools: [
    "Adobe Acrobat / Sign", "Clio Manage Docs", "DocuSign",
    "Dropbox", "Google Drive / Workspace", "NetDocuments",
    "SharePoint / OneDrive", "Other (Doc Mgmt/E-Sign)",
  ]},
];

/* ═══ QUESTIONS ═══ */
const QUESTIONS = {
  people: [
    { id: "p1", text: "Does your firm have a written AI usage policy?", options: [
      { label: "Yes, formally documented and distributed", score: 5 },
      { label: "In progress or informal guidelines exist", score: 3 },
      { label: "No, nothing in place", score: 1 },
    ]},
    { id: "p2", text: "How would you describe your team's overall comfort level with AI tools?", options: [
      { label: "Most are actively using AI in their daily work", score: 5 },
      { label: "A few early adopters, most are curious but hesitant", score: 3 },
      { label: "Significant resistance or fear about AI replacing roles", score: 1 },
    ]},
    { id: "p3", text: "Has anyone at your firm received formal AI training for legal work?", options: [
      { label: "Yes, structured training has been delivered", score: 5 },
      { label: "Some self-directed learning, no formal program", score: 3 },
      { label: "No training of any kind", score: 1 },
    ]},
    { id: "p4", text: "Is there someone at your firm who champions new technology adoption?", options: [
      { label: "Yes, a clear AI champion or tech-forward leader", score: 5 },
      { label: "Informally, someone tinkers but has no mandate", score: 3 },
      { label: "No one is leading the charge", score: 1 },
    ]},
  ],
  process: [
    { id: "pr1", text: "What is the biggest time drain at your firm?", isDataOnly: true, options: [
      { label: "Document drafting and formatting", score: 0, tag: "drafting" },
      { label: "Discovery and document review", score: 0, tag: "discovery" },
      { label: "Administrative tasks (scheduling, filing, billing)", score: 0, tag: "admin" },
      { label: "Legal research", score: 0, tag: "research" },
      { label: "Client communication and intake", score: 0, tag: "intake" },
    ]},
    { id: "pr2", text: "How many hours per week does your team spend on repetitive, manual tasks?", options: [
      { label: "Less than 5 hours", score: 5 },
      { label: "5 to 15 hours", score: 3 },
      { label: "More than 15 hours", score: 1 },
    ]},
    { id: "pr3", text: "Does your firm have documented standard operating procedures (SOPs) for key workflows?", options: [
      { label: "Yes, most workflows are documented", score: 5 },
      { label: "Some are documented, many are tribal knowledge", score: 3 },
      { label: "Nothing is formally documented", score: 1 },
    ]},
    { id: "pr4", text: "When a new tool or process is introduced, how quickly does your team adopt it?", options: [
      { label: "Quickly, our team embraces change", score: 5 },
      { label: "Moderate, takes some pushing but gets there", score: 3 },
      { label: "Slowly, significant resistance to change", score: 1 },
    ]},
  ],
  tech: [
    { id: "t1", text: "Does your case management platform have built-in AI features?", options: [
      { label: "Yes, and we actively use them", score: 5, hasAI: true },
      { label: "Yes, but we rarely or never use them", score: 2, hasAI: true },
      { label: "No, or I am not sure", score: 1, hasAI: false },
    ]},
    { id: "t2", text: "What percentage of your platform's AI features does your team actually use?",
      showWhen: (ans) => ans["t1"] === 5 || ans["t1"] === 2,
      options: [
        { label: "Most of them (60% or more)", score: 5 },
        { label: "Some of them (20 to 60%)", score: 3 },
        { label: "Very few or none (under 20%)", score: 1 },
    ]},
    { id: "t3", text: "Are any team members using general AI tools (such as ChatGPT, Claude, or Copilot) for work?", options: [
      { label: "Yes, with firm awareness and guidelines", score: 5 },
      { label: "Yes, but without any formal guidance or policy", score: 2 },
      { label: "No, or I do not know", score: 1 },
    ]},
    { id: "t4", text: "Does your firm use AI-powered transcription for meetings, calls, or depositions?", options: [
      { label: "Yes, integrated into our workflow", score: 5 },
      { label: "Occasionally or experimenting with it", score: 3 },
      { label: "No", score: 1 },
    ]},
  ],
};

/* ═══ ZONES ═══ */
const ZONES = [
  { key: "foundation", name: "Foundation", tagline: "Your firm is at the starting line, and that is exactly the right place to begin.",
    desc: "Most firms are here. You have the tools and the talent, but AI has not been formally integrated into how your team works. The gap between where you are and where you could be represents significant untapped capacity.",
    steps: ["Establish a written AI usage policy before team members adopt tools without guardrails","Identify one AI champion inside the firm to lead from within","Book a discovery session to map exactly where AI fits your workflows"],
    cta: "Firms in the Foundation zone typically see the fastest transformation because there is so much low-hanging fruit. One structured engagement can shift the entire trajectory." },
  { key: "growth", name: "Growth", tagline: "You have the pieces. Now it is time to connect them.",
    desc: "Your firm has started the AI conversation and may even be using some tools. But usage is uneven, training has been informal, and there is a gap between the features you own and the features your team uses daily. This is the most common zone for firms that are paying for AI capabilities they are not fully leveraging.",
    steps: ["Audit which AI features your current platforms offer versus what your team actually uses","Formalize your AI policy and make it part of onboarding","Invest in structured, role-based training so every team member has a clear pathway"],
    cta: "Firms in the Growth zone have the infrastructure. What is missing is the activation. A focused discovery and implementation engagement closes that gap fast." },
  { key: "optimization", name: "Optimization", tagline: "You are ahead of most firms. Now it is about compounding your advantage.",
    desc: "Your team is using AI tools, you have some governance in place, and adoption is underway. The opportunity now is optimization: refining workflows, deepening feature utilization, training new hires into your AI-forward culture, and making sure your competitive edge widens rather than plateaus.",
    steps: ["Conduct a workflow audit to identify remaining manual bottlenecks","Build a custom prompt library and knowledge base tailored to your practice area","Consider a fractional Chief AI Officer to keep your firm on the leading edge as platforms evolve"],
    cta: "Firms in the Optimization zone benefit most from ongoing advisory and advanced training. You do not need to start from scratch. You need a strategic partner who keeps you ahead." },
];
function getZone(s) { if (s <= 2.3) return ZONES[0]; if (s <= 3.7) return ZONES[1]; return ZONES[2]; }

/* ═══ SNEAK PEEK (Firm-Wide instead of ALL) ═══ */
const SNEAK_PEEK = [
  { pillar: "PEOPLE", title: "Team Readiness Map", desc: "Role-by-role assessment of where each team member stands, with specific pathways for attorneys, paralegals, and staff" },
  { pillar: "PROCESS", title: "Workflow Opportunity Audit", desc: "Your actual workflows analyzed against AI-accelerated alternatives, with time recovery estimates per task" },
  { pillar: "TECHNOLOGY", title: "Technology Utilization Report", desc: "Feature-by-feature analysis of what your current platforms can do versus what your team is using today" },
  { pillar: "FIRM-WIDE", title: "90-Day AI Roadmap", desc: "A phased, prioritized plan built specifically for your firm, not generic advice, but your roadmap" },
  { pillar: "FIRM-WIDE", title: "AI Governance Kit", desc: "Usage policies, ethics disclosures, and staff guidelines drafted for your firm and your jurisdiction" },
  { pillar: "FIRM-WIDE", title: "Full AI Readiness Report", desc: "Comprehensive scored assessment with findings, recommendations, and a clear engagement path forward" },
];

/* ════════════════════════════════════════════════════
   COMPONENTS
   ════════════════════════════════════════════════════ */

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (<div style={{ margin: "0 0 2rem 0" }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
      <span style={{ fontSize: "13px", color: C.muted, fontFamily: SANS }}>{current} of {total}</span>
      <span style={{ fontSize: "13px", color: C.green, fontWeight: 600, fontFamily: SANS }}>{pct}%</span>
    </div>
    <div style={{ height: "4px", background: C.border, borderRadius: "2px", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${C.green}, ${C.gold})`, borderRadius: "2px", transition: "width 0.5s ease" }} />
    </div>
  </div>);
}

function PillarBadge({ pillar }) {
  const m = { PEOPLE: [C.people, C.peopleBg], PROCESS: [C.process, C.processBg], TECHNOLOGY: [C.data, C.dataBg], "FIRM-WIDE": [C.firmwide, C.firmwideBg] };
  const [c, bg] = m[pillar] || [C.body, "#f0f0f0"];
  return <span style={{ padding: "3px 10px", borderRadius: "4px", fontSize: "10px", fontWeight: 600, letterSpacing: "1.5px", color: c, background: bg, fontFamily: SANS, textTransform: "uppercase" }}>{pillar}</span>;
}

function ZoneScale({ activeZone }) {
  const zc = { foundation: C.gold, growth: C.green, optimization: C.people };
  return (<div style={{ margin: "1.5rem 0 0.5rem" }}>
    <div style={{ display: "flex", gap: "4px", marginBottom: "10px" }}>
      {ZONES.map(z => { const on = z.key === activeZone.key; return (
        <div key={z.key} style={{ flex: 1, position: "relative" }}>
          <div style={{ height: on ? "12px" : "5px", background: on ? zc[z.key] : `${zc[z.key]}35`, borderRadius: "3px", transition: "all 0.6s ease", marginTop: on ? "0" : "3.5px" }} />
          {on && <div style={{ position: "absolute", top: "-9px", left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `7px solid ${zc[z.key]}` }} />}
        </div>); })}
    </div>
    <div style={{ display: "flex", gap: "4px" }}>
      {ZONES.map(z => { const on = z.key === activeZone.key; return (
        <div key={z.key} style={{ flex: 1, textAlign: "center" }}>
          <p style={{ fontSize: on ? "13px" : "12px", fontWeight: on ? 600 : 400, color: on ? zc[z.key] : C.muted, fontFamily: SANS, transition: "all 0.3s", letterSpacing: on ? "0.5px" : "0" }}>{z.name}</p>
        </div>); })}
    </div>
  </div>);
}

function Gauge({ score, maxScore, label, color, desc }) {
  const [a, setA] = useState(0);
  useEffect(() => { const t = setTimeout(() => setA(score), 400); return () => clearTimeout(t); }, [score]);
  const circ = 2 * Math.PI * 38; const off = circ - (a / maxScore) * circ;
  return (<div style={{ textAlign: "center", flex: "1 1 0", minWidth: "130px" }}>
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="38" fill="none" stroke={C.border} strokeWidth="5" />
      <circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="5" strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round" transform="rotate(-90 50 50)" style={{ transition: "stroke-dashoffset 1.4s ease-out" }} />
      <text x="50" y="47" textAnchor="middle" style={{ fontSize: "22px", fontWeight: 700, fill: color, fontFamily: SANS }}>{score.toFixed(1)}</text>
      <text x="50" y="62" textAnchor="middle" style={{ fontSize: "10px", fill: C.muted, fontFamily: SANS }}>/ {maxScore}</text>
    </svg>
    <p style={{ fontSize: "14px", fontWeight: 600, color, marginTop: "4px", fontFamily: SANS }}>{label}</p>
    <p style={{ fontSize: "12px", color: C.text, lineHeight: 1.5, marginTop: "4px", maxWidth: "170px", margin: "4px auto 0", fontFamily: SANS }}>{desc}</p>
  </div>);
}

function PracticeAreaInput({ value, onChange }) {
  const [areas, setAreas] = useState(value || []);
  const [showAdd, setShowAdd] = useState(false);
  const update = (a) => { setAreas(a); onChange(a); };
  const totalPct = areas.reduce((s, a) => s + a.pct, 0);
  return (<div>
    {areas.length > 0 && <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "10px" }}>
      {areas.map((a, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "10px 14px" }}>
        <span style={{ flex: 1, fontSize: "15px", color: C.body, fontFamily: SANS }}>{a.name}</span>
        <input type="number" min="0" max="100" value={a.pct || ""} onChange={e => { const n = Math.max(0, Math.min(100, parseInt(e.target.value) || 0)); update(areas.map((x, idx) => idx === i ? { ...x, pct: n } : x)); }} placeholder="%" style={{ width: "58px", padding: "6px 8px", borderRadius: "4px", border: `1px solid ${C.border}`, fontSize: "14px", fontFamily: SANS, textAlign: "center", color: C.body }} />
        <span style={{ fontSize: "13px", color: C.muted }}>%</span>
        <button onClick={() => update(areas.filter((_, idx) => idx !== i))} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: "18px", padding: "0 4px", lineHeight: 1 }}>x</button>
      </div>))}
      <div style={{ textAlign: "right" }}>
        <span style={{ fontSize: "12px", fontWeight: 600, fontFamily: SANS, color: totalPct === 100 ? C.green : totalPct > 100 ? C.error : C.muted }}>Total: {totalPct}%</span>
        {totalPct !== 100 && areas.length > 0 && <span style={{ fontSize: "11px", color: C.muted, fontFamily: SANS, marginLeft: "6px" }}>(should equal 100%)</span>}
      </div>
    </div>}
    {!showAdd ? <button onClick={() => setShowAdd(true)} style={{ background: C.greenBg, border: `1px dashed ${C.green}50`, borderRadius: "8px", padding: "12px 16px", width: "100%", cursor: "pointer", fontSize: "14px", color: C.green, fontFamily: SANS, fontWeight: 500 }}>+ Add practice area</button>
    : <div style={{ maxHeight: "220px", overflowY: "auto", border: `1px solid ${C.border}`, borderRadius: "8px", background: C.card }}>
      {PRACTICE_AREAS.filter(pa => !areas.find(a => a.name === pa)).map(pa => (<button key={pa} onClick={() => { update([...areas, { name: pa, pct: 0 }]); setShowAdd(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 16px", border: "none", borderBottom: `1px solid ${C.border}`, background: "none", fontSize: "14px", color: C.body, fontFamily: SANS, cursor: "pointer" }} onMouseEnter={e => e.target.style.background = C.bg} onMouseLeave={e => e.target.style.background = "none"}>{pa}</button>))}
    </div>}
  </div>);
}

function CategorizedToolSelect({ value, onChange }) {
  const sel = value || [];
  const [noneSelected, setNoneSelected] = useState(false);
  const toggle = (t) => {
    if (noneSelected) { setNoneSelected(false); onChange([t]); return; }
    onChange(sel.includes(t) ? sel.filter(x => x !== t) : [...sel, t]);
  };
  const toggleNone = () => { setNoneSelected(!noneSelected); onChange([]); };
  return (<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    {TOOL_CATEGORIES.map(cat => (<div key={cat.name}>
      <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: C.gold, marginBottom: "8px", fontFamily: SANS }}>{cat.name}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {cat.tools.map(t => { const on = sel.includes(t) && !noneSelected; return (
          <button key={t} onClick={() => toggle(t)} style={{ padding: "8px 14px", borderRadius: "20px", border: `1.5px solid ${on ? C.green : C.border}`, background: on ? C.greenBg : "transparent", color: on ? C.green : C.body, fontSize: "13px", fontFamily: SANS, fontWeight: on ? 600 : 400, cursor: "pointer", transition: "all 0.2s" }}>{t}</button>); })}
      </div>
    </div>))}
    <button onClick={toggleNone} style={{ padding: "8px 14px", borderRadius: "20px", border: `1.5px solid ${noneSelected ? C.dark : C.border}`, background: noneSelected ? `${C.dark}10` : "transparent", color: noneSelected ? C.dark : C.text, fontSize: "13px", fontFamily: SANS, fontWeight: noneSelected ? 600 : 400, cursor: "pointer", alignSelf: "flex-start" }}>None of the above</button>
  </div>);
}

/* ════════ MAIN ════════ */
export default function AIReadinessScore() {
  const [step, setStep] = useState("intro");
  const [answers, setAnswers] = useState({});
  const [info, setInfo] = useState({});
  const [emailTouched, setEmailTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPeek, setShowPeek] = useState(false);
  const topRef = useRef(null);
  const scrollTop = () => { if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const goTo = (s) => { setStep(s); setTimeout(scrollTop, 100); };

  const calcPillar = (qs) => { const a = qs.filter(q => !q.isDataOnly && (!q.showWhen || q.showWhen(answers)) && answers[q.id] !== undefined); if (!a.length) return 0; return a.reduce((s, q) => s + (answers[q.id] || 0), 0) / a.length; };
  const pS = calcPillar(QUESTIONS.people), prS = calcPillar(QUESTIONS.process), tS = calcPillar(QUESTIONS.tech);
  const overall = (pS + prS + tS) / 3; const zone = getZone(overall);

  const emailOk = isValidEmail(info.email || "");
  const practiceAreaTotal = (info.practiceAreas || []).reduce((s, a) => s + a.pct, 0);
  const practiceAreasOk = info.practiceAreas?.length > 0 && practiceAreaTotal === 100;
  const infoOk = () => info.name?.trim() && emailOk && info.firm?.trim() && info.role && info.firmSize && practiceAreasOk && info.platform;
  const pillarOk = (p) => QUESTIONS[p].every(q => (q.showWhen && !q.showWhen(answers)) ? true : answers[q.id] !== undefined);

  /* Build formatted summary of all responses */
  const buildSummary = () => {
    const allQs = [...QUESTIONS.people, ...QUESTIONS.process, ...QUESTIONS.tech];
    const lines = [];
    lines.push("=== AI READINESS BENCHMARK SUBMISSION ===");
    lines.push(`Date: ${new Date().toLocaleString()}`);
    lines.push("");
    lines.push("--- CONTACT INFO ---");
    lines.push(`Name: ${info.name}`);
    lines.push(`Email: ${info.email}`);
    lines.push(`Firm: ${info.firm}`);
    lines.push(`Role: ${info.role}`);
    lines.push(`Firm Size: ${info.firmSize}`);
    lines.push(`Practice Areas: ${(info.practiceAreas || []).map(a => `${a.name} (${a.pct}%)`).join(", ")}`);
    lines.push(`Case Management Platform: ${info.platform}`);
    lines.push(`Additional Tools: ${(info.tools || []).length > 0 ? (info.tools || []).join(", ") : "None selected"}`);
    lines.push("");
    lines.push("--- SCORES ---");
    lines.push(`Overall: ${overall.toFixed(1)} / 5.0 — ${zone.name} Zone`);
    lines.push(`People: ${pS.toFixed(1)} / 5.0`);
    lines.push(`Process: ${prS.toFixed(1)} / 5.0`);
    lines.push(`Technology: ${tS.toFixed(1)} / 5.0`);
    lines.push("");
    lines.push("--- QUESTION RESPONSES ---");
    lines.push("");
    lines.push("PEOPLE");
    QUESTIONS.people.forEach(q => {
      const val = answers[q.id];
      const selected = q.options.find(o => o.score === val || o.tag === val);
      lines.push(`Q: ${q.text}`);
      lines.push(`A: ${selected ? selected.label : "Not answered"}`);
      lines.push("");
    });
    lines.push("PROCESS");
    QUESTIONS.process.forEach(q => {
      const val = answers[q.id];
      const selected = q.isDataOnly ? q.options.find(o => o.tag === val) : q.options.find(o => o.score === val);
      lines.push(`Q: ${q.text}`);
      lines.push(`A: ${selected ? selected.label : "Not answered"}`);
      lines.push("");
    });
    lines.push("TECHNOLOGY");
    QUESTIONS.tech.forEach(q => {
      if (q.showWhen && !q.showWhen(answers)) return;
      const val = answers[q.id];
      const selected = q.options.find(o => o.score === val);
      lines.push(`Q: ${q.text}`);
      lines.push(`A: ${selected ? selected.label : "Not answered"}`);
      lines.push("");
    });
    return lines.join("\n");
  };

  const submit = async () => {
    setSubmitting(true);
    const summary = buildSummary();

    /* Send everything to our API route which handles HubSpot contact + note + email to Amy */
    try {
      await fetch("/api/benchmark-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          info,
          scores: { people: pS.toFixed(1), process: prS.toFixed(1), tech: tS.toFixed(1), overall: overall.toFixed(1) },
          zone: zone.name,
          summary,
          practiceAreas: (info.practiceAreas || []).map(a => `${a.name} (${a.pct}%)`).join(", "),
          tools: (info.tools || []).join(", "),
        }),
      });
    } catch (e) { console.log("Submit error:", e); }

    /* Beehiiv subscriber */
    try { await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: info.email, name: info.name }) }); } catch (e) { console.log("BH:", e); }
    setSubmitting(false); setStep("results"); setTimeout(scrollTop, 100);
  };

  const wrap = (ch, isHero) => (<div ref={topRef} style={{ minHeight: "100vh", background: isHero ? "none" : C.bg, fontFamily: SANS, color: C.body, WebkitFontSmoothing: "antialiased" }}>
    <Head>
      <title>AI Readiness Benchmark | Gaia Allies</title>
      <meta name="description" content="Find out where your law firm stands on AI adoption across People, Process, and Technology. Free 5-minute assessment from Gaia Allies." />
      <meta property="og:title" content="AI Readiness Benchmark | Gaia Allies" />
      <meta property="og:description" content="Find out where your law firm stands on AI adoption. Free 5-minute assessment." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://diagnostic.gaiaallies.com/score" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
    </Head>
    {isHero ? ch : <div style={{ maxWidth: "680px", margin: "0 auto", padding: "2.5rem 1.5rem 4rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: C.gold, border: `1px solid ${C.gold}30`, padding: "5px 16px", borderRadius: "16px" }}>GAIA ALLIES | AI READY</span>
      </div>
      {ch}
    </div>}
  </div>);

  const inputStyle = { width: "100%", padding: "12px 14px", borderRadius: "8px", border: `1px solid ${C.border}`, fontSize: "15px", fontFamily: SANS, color: C.body, background: C.card, outline: "none", boxSizing: "border-box" };
  const selectStyle = { ...inputStyle, appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%238a8a8a' fill='none' stroke-width='1.5'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" };
  const btnStyle = (ok) => ({ background: ok ? C.gold : C.border, color: ok ? C.dark : C.muted, border: "none", borderRadius: "6px", padding: "14px 36px", fontSize: "15px", fontWeight: 600, fontFamily: SANS, cursor: ok ? "pointer" : "default", letterSpacing: "0.3px", transition: "all 0.25s" });
  const labelStyle = { display: "block", fontSize: "14px", fontWeight: 600, color: C.body, marginBottom: "6px", fontFamily: SANS };

  /* ── INTRO (hero gradient matching gaiaallies.com/aiready) ── */
  if (step === "intro") return wrap(<>
    <section style={{
      background: "linear-gradient(165deg, #1a2332 0%, #2d3b4a 40%, #3a4f3a 100%)",
      padding: "100px 32px 110px", textAlign: "center", position: "relative", overflow: "hidden",
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ position: "absolute", top: "-50%", left: "-50%", width: "200%", height: "200%", background: "radial-gradient(circle at 30% 50%, rgba(74,103,65,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(196,153,60,0.08) 0%, transparent 40%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: "680px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: C.gold, border: `1px solid rgba(196,153,60,0.3)`, padding: "6px 20px", borderRadius: "20px", display: "inline-block", marginBottom: "28px" }}>GAIA ALLIES | AI READY</span>
        <h1 style={{ fontFamily: SERIF, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "normal", color: "#fff", lineHeight: 1.2, marginBottom: "24px" }}>AI Readiness <em style={{ color: C.gold, fontStyle: "italic" }}>Benchmark</em></h1>
        <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto 20px" }}>Find out where your firm stands on AI adoption across three critical pillars: your people, your processes, and your technology.</p>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: "500px", margin: "0 auto 44px" }}>Takes about 5 minutes. Your responses are shared only with Gaia Allies.</p>

        <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap", marginBottom: "44px" }}>
          {[{ color: "#a88bcc", label: "People", desc: "Team readiness and culture" }, { color: "#8bb89e", label: "Process", desc: "Workflows and efficiency" }, { color: "#d4b86a", label: "Technology", desc: "Tools and utilization" }].map(p => (
            <div key={p.label} style={{ flex: "1 1 0", minWidth: "150px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderTop: `3px solid ${p.color}`, borderRadius: "10px", padding: "18px 14px", textAlign: "center" }}>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "#fff" }}>{p.label}</p>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", marginTop: "4px" }}>{p.desc}</p>
            </div>))}
        </div>

        <button onClick={() => goTo("info")} style={{ background: C.gold, color: C.dark, border: "none", borderRadius: "6px", padding: "16px 44px", fontSize: "15px", fontWeight: 600, fontFamily: SANS, cursor: "pointer", letterSpacing: "0.5px", transition: "all 0.25s" }}>Start Your Benchmark</button>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: "28px" }}>No payment required.</p>
      </div>
    </section>
  </>, true);

  /* ── INFO ── */
  if (step === "info") return wrap(<>
    <ProgressBar current={0} total={15} />
    <h2 style={{ fontFamily: SERIF, fontSize: "26px", fontWeight: "normal", color: C.body, marginBottom: "8px" }}>About You and Your Firm</h2>
    <p style={{ fontSize: "15px", color: C.text, marginBottom: "24px", lineHeight: 1.7 }}>This information helps us tailor your benchmark results. Your responses are shared only with Gaia Allies.</p>
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <div><label style={labelStyle}>Your name <span style={{ color: C.gold }}>*</span></label><input type="text" value={info.name || ""} onChange={e => setInfo(p => ({...p, name: e.target.value}))} placeholder="First and last name" style={inputStyle} /></div>
      <div><label style={labelStyle}>Email address <span style={{ color: C.gold }}>*</span></label><input type="email" value={info.email || ""} onChange={e => setInfo(p => ({...p, email: e.target.value}))} onBlur={() => setEmailTouched(true)} placeholder="you@firm.com" style={{ ...inputStyle, borderColor: emailTouched && !emailOk && info.email ? C.error : C.border }} />{emailTouched && info.email && !emailOk && <p style={{ fontSize: "13px", color: C.error, marginTop: "4px" }}>Please enter a valid email address</p>}</div>
      <div><label style={labelStyle}>Firm name <span style={{ color: C.gold }}>*</span></label><input type="text" value={info.firm || ""} onChange={e => setInfo(p => ({...p, firm: e.target.value}))} placeholder="Your firm name" style={inputStyle} /></div>
      <div><label style={labelStyle}>Your role <span style={{ color: C.gold }}>*</span></label><select value={info.role || ""} onChange={e => setInfo(p => ({...p, role: e.target.value}))} style={{ ...selectStyle, color: info.role ? C.body : C.muted }}><option value="" disabled>Select...</option>{["Managing Partner","Partner","Associate Attorney","Of Counsel","Paralegal / Legal Assistant","Office Manager / Administrator","IT / Operations","Other"].map(o => <option key={o} value={o}>{o}</option>)}</select></div>
      <div><label style={labelStyle}>How many people are at your firm? <span style={{ color: C.gold }}>*</span></label><select value={info.firmSize || ""} onChange={e => setInfo(p => ({...p, firmSize: e.target.value}))} style={{ ...selectStyle, color: info.firmSize ? C.body : C.muted }}><option value="" disabled>Select...</option>{["Solo","2 to 5","6 to 10","11 to 25","26 to 50","50+"].map(o => <option key={o} value={o}>{o}</option>)}</select></div>
      <div><label style={labelStyle}>Practice areas <span style={{ color: C.gold }}>*</span></label><p style={{ fontSize: "13px", color: C.text, marginBottom: "8px" }}>Add each practice area your firm handles and estimate the percentage of your caseload it represents.</p><PracticeAreaInput value={info.practiceAreas} onChange={v => setInfo(p => ({...p, practiceAreas: v}))} /></div>
      <div><label style={labelStyle}>Primary case management platform <span style={{ color: C.gold }}>*</span></label><select value={info.platform || ""} onChange={e => setInfo(p => ({...p, platform: e.target.value}))} style={{ ...selectStyle, color: info.platform ? C.body : C.muted }}><option value="" disabled>Select...</option>{PLATFORMS.map(o => <option key={o} value={o}>{o}</option>)}</select></div>
      <div><label style={labelStyle}>Are you using any of these additional tools? <span style={{ fontSize: "13px", fontWeight: 400, color: C.muted }}>(optional)</span></label><p style={{ fontSize: "13px", color: C.text, marginBottom: "10px" }}>Select all that apply.</p><CategorizedToolSelect value={info.tools} onChange={v => setInfo(p => ({...p, tools: v}))} /></div>
    </div>
    <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
      <button onClick={() => { setEmailTouched(true); if (infoOk()) goTo("people"); }} style={btnStyle(infoOk())}>Continue</button>
    </div>
  </>);

  /* ── PILLAR STEPS ── */
  const renderPillar = (pk, label, color, next, prev) => {
    const qs = QUESTIONS[pk]; const vis = qs.filter(q => !q.showWhen || q.showWhen(answers));
    const pc = { people: 0, process: 4, tech: 8 }; const base = 7 + pc[pk]; const total = 19;
    return wrap(<>
      <ProgressBar current={base + vis.filter(q => answers[q.id] !== undefined).length} total={total} />
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
        <div style={{ width: "4px", height: "28px", borderRadius: "2px", background: color }} />
        <h2 style={{ fontFamily: SERIF, fontSize: "26px", fontWeight: "normal", color: C.body, margin: 0 }}>{label}</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {vis.map(q => (<div key={q.id} style={{ background: C.card, border: `1px solid ${answers[q.id] !== undefined ? `${color}40` : C.border}`, borderRadius: "10px", padding: "24px", transition: "border-color 0.3s" }}>
          <p style={{ fontSize: "15px", fontWeight: 600, color: C.body, marginBottom: "12px", lineHeight: 1.5 }}>{q.text}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {q.options.map((o, i) => { const on = answers[q.id] === (q.isDataOnly ? o.tag : o.score); return (
              <button key={i} onClick={() => setAnswers(p => ({...p, [q.id]: q.isDataOnly ? o.tag : o.score}))} style={{ background: on ? `${color}10` : "transparent", border: `1.5px solid ${on ? color : C.border}`, borderRadius: "8px", padding: "12px 16px", textAlign: "left", fontSize: "14px", color: on ? color : C.body, fontWeight: on ? 600 : 400, fontFamily: SANS, cursor: "pointer", transition: "all 0.2s", lineHeight: 1.5 }}>{o.label}</button>); })}
          </div>
        </div>))}
      </div>
      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => goTo(prev)} style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: "6px", padding: "14px 28px", fontSize: "14px", color: C.muted, fontFamily: SANS, cursor: "pointer" }}>Back</button>
        {next === "submit" ? <button onClick={submit} disabled={!pillarOk(pk) || submitting} style={btnStyle(pillarOk(pk))}>{submitting ? "Calculating..." : "See My Results"}</button>
        : <button onClick={() => goTo(next)} disabled={!pillarOk(pk)} style={btnStyle(pillarOk(pk))}>Continue</button>}
      </div>
    </>);
  };

  if (step === "people") return renderPillar("people", "People", C.people, "process", "info");
  if (step === "process") return renderPillar("process", "Process", C.process, "tech", "people");
  if (step === "tech") return renderPillar("tech", "Technology", C.data, "submit", "process");

  /* ── RESULTS ── */
  if (step === "results") return wrap(<>
    <div style={{ textAlign: "center", marginBottom: "8px" }}>
      <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: C.muted, marginBottom: "12px" }}>YOUR AI READINESS BENCHMARK</p>
      <h2 style={{ fontFamily: SERIF, fontSize: "clamp(26px, 4vw, 34px)", fontWeight: "normal", color: C.body, lineHeight: 1.25, marginBottom: "6px" }}>{zone.name} <em style={{ color: C.gold }}>Zone</em></h2>
      <p style={{ fontSize: "16px", color: C.text, fontStyle: "italic", lineHeight: 1.6 }}>{zone.tagline}</p>
    </div>
    <ZoneScale activeZone={zone} />
    <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", padding: "20px 0", background: C.card, border: `1px solid ${C.border}`, borderRadius: "12px", marginBottom: "20px", marginTop: "20px" }}>
      <Gauge score={pS} maxScore={5} label="People" color={C.people} desc="Team readiness, policy, and culture" />
      <Gauge score={prS} maxScore={5} label="Process" color={C.process} desc="Workflow efficiency and documentation" />
      <Gauge score={tS} maxScore={5} label="Technology" color={C.data} desc="Tool adoption and utilization" />
    </div>
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "28px", marginBottom: "20px" }}>
      <p style={{ fontSize: "16px", color: C.text, lineHeight: 1.75, marginBottom: "20px" }}>{zone.desc}</p>
      <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: C.gold, marginBottom: "10px" }}>Recommended Next Steps</p>
      {zone.steps.map((s, i) => (<div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "8px" }}>
        <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: C.greenBg, color: C.green, fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>{i + 1}</span>
        <p style={{ fontSize: "15px", color: C.text, lineHeight: 1.6, margin: 0 }}>{s}</p>
      </div>))}
      <div style={{ marginTop: "16px", padding: "16px", background: C.greenBg, borderRadius: "8px", borderLeft: `3px solid ${C.green}` }}>
        <p style={{ fontSize: "15px", color: C.body, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>{zone.cta}</p>
      </div>
    </div>
    <div style={{ background: `${C.gold}10`, border: `1px solid ${C.gold}30`, borderRadius: "8px", padding: "16px 20px", marginBottom: "28px" }}>
      <p style={{ fontSize: "13px", color: C.text, lineHeight: 1.7, margin: 0 }}><strong style={{ color: C.gold }}>About this benchmark:</strong> This reflects what you shared today and provides a directional view of where your firm stands. A comprehensive AI Readiness Assessment evaluates your full workflows, team dynamics, and technology utilization across a 90-minute guided session. That is where the complete picture emerges.</p>
    </div>

    {/* Sneak Peek */}
    <div style={{ marginBottom: "28px" }}>
      <button onClick={() => setShowPeek(!showPeek)} style={{ width: "100%", background: C.card, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "20px 24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = C.gold} onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
        <div style={{ textAlign: "left" }}><p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: C.gold, marginBottom: "4px" }}>WHAT YOU UNLOCK</p><p style={{ fontSize: "17px", fontWeight: 600, color: C.body }}>Inside the full AI Readiness Assessment</p></div>
        <span style={{ fontSize: "18px", color: C.gold, transition: "transform 0.3s", transform: showPeek ? "rotate(180deg)" : "rotate(0)" }}>&#9662;</span>
      </button>
      {showPeek && <div style={{ marginTop: "8px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
        {SNEAK_PEEK.map((item, i) => { const pc = { PEOPLE: C.people, PROCESS: C.process, TECHNOLOGY: C.data, "FIRM-WIDE": C.dark }; return (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${pc[item.pillar] || C.dark}`, borderRadius: "10px", padding: "16px 16px 16px 18px", opacity: 0, animation: `fadeSlide 0.4s ease ${i * 0.07}s forwards` }}>
            <PillarBadge pillar={item.pillar} />
            <p style={{ fontSize: "14px", fontWeight: 600, color: C.body, marginTop: "8px", marginBottom: "4px", lineHeight: 1.4 }}>{item.title}</p>
            <p style={{ fontSize: "13px", color: C.text, lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
          </div>); })}
      </div>}
    </div>

    {/* CTA */}
    <div style={{ background: `linear-gradient(165deg, ${C.dark} 0%, #2d3b4a 40%, #3a4f3a 100%)`, borderRadius: "12px", padding: "40px 28px", textAlign: "center", marginBottom: "20px" }}>
      <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: C.gold, marginBottom: "8px" }}>READY FOR THE FULL PICTURE?</p>
      <h3 style={{ fontFamily: SERIF, fontSize: "clamp(24px, 4vw, 30px)", fontWeight: "normal", color: "#fff", lineHeight: 1.3, marginBottom: "12px" }}>The AI Readiness Assessment</h3>
      <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "28px", maxWidth: "480px", margin: "0 auto 28px" }}>See everything this benchmark cannot show you. Your full workflows, your team dynamics, your technology utilization, all mapped across a 90-minute guided session.</p>
      <a href="https://diagnostic.gaiaallies.com/discover" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: C.gold, color: C.dark, border: "none", borderRadius: "6px", padding: "15px 36px", fontSize: "15px", fontWeight: 600, fontFamily: SANS, textDecoration: "none", letterSpacing: "0.5px" }}>See What Is Included</a>
    </div>

    <div style={{ textAlign: "center", paddingTop: "16px" }}>
      <p style={{ fontSize: "12px", color: C.muted }}>&copy; {new Date().getFullYear()} Gaia Allies LLC | AI Ready</p>
      <a href="https://gaiaallies.com/aiready" style={{ fontSize: "12px", color: C.green, textDecoration: "none" }}>gaiaallies.com/aiready</a>
    </div>
    <style>{`@keyframes fadeSlide { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
  </>);

  return null;
}
