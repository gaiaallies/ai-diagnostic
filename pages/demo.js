import { useState, useEffect } from "react";
import Head from 'next/head';

const C = {
  people: "#6B4C9A", peopleBg: "rgba(107,76,154,0.06)",
  process: "#2D5041", processBg: "rgba(45,80,65,0.06)",
  data: "#B8860B", dataBg: "rgba(184,134,11,0.06)",
  dark: "#1a2420", text: "#3d4a44", muted: "#7a7770", light: "#a09d94",
  border: "#e4e2dc", bg: "#f5f3ee", card: "#fff",
};

function Badge({ pillar }) {
  const m = { PEOPLE: [C.people, C.peopleBg], PROCESS: [C.process, C.processBg], "DATA/TECH": [C.data, C.dataBg] };
  const [c, bg] = m[pillar] || [C.text, "#f0f0f0"];
  return <span style={{ padding: "2px 8px", borderRadius: "10px", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.04em", color: c, background: bg }}>{pillar}</span>;
}

function Gauge({ score, label, color, desc }) {
  const [a, setA] = useState(0);
  useEffect(() => { setTimeout(() => setA(score), 300); }, [score]);
  const circ = 2 * Math.PI * 36;
  const off = circ - (a / 10) * circ;
  return (
    <div style={{ textAlign: "center", flex: "1 1 0", minWidth: "140px" }}>
      <svg width="96" height="96" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r="36" fill="none" stroke="#eae8e3" strokeWidth="6" />
        <circle cx="45" cy="45" r="36" fill="none" stroke={color} strokeWidth="6" strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round" transform="rotate(-90 45 45)" style={{ transition: "stroke-dashoffset 1.2s ease-out" }} />
        <text x="45" y="42" textAnchor="middle" style={{ fontSize: "24px", fontWeight: 700, fill: color, fontFamily: "'DM Sans'" }}>{score}</text>
        <text x="45" y="56" textAnchor="middle" style={{ fontSize: "11px", fill: C.light, fontFamily: "'DM Sans'" }}>/10</text>
      </svg>
      <p style={{ fontSize: "0.92rem", fontWeight: 600, color, marginTop: "2px" }}>{label}</p>
      <p style={{ fontSize: "0.8rem", color: C.muted, lineHeight: 1.4, marginTop: "2px", maxWidth: "170px", margin: "2px auto 0" }}>{desc}</p>
    </div>
  );
}

function Section({ title, children }) {
  return <div style={{ marginTop: "1.8rem" }}><h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.4rem", fontWeight: 400, color: C.dark, paddingBottom: "0.4rem", borderBottom: `2px solid ${C.process}`, marginBottom: "0.8rem" }}>{title}</h2>{children}</div>;
}

function AccordionItem({ title, pillar, effort, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const cm = { PEOPLE: C.people, PROCESS: C.process, "DATA/TECH": C.data };
  const ec = { "Quick Win": C.process, Medium: C.data, Major: "#A04030" };
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${cm[pillar]}`, borderRadius: "6px", marginBottom: "0.5rem", overflow: "hidden" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", background: "none", border: "none", cursor: "pointer",
          padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "8px",
          textAlign: "left",
        }}
      >
        <span style={{
          fontSize: "0.85rem", color: cm[pillar], fontWeight: 600,
          transition: "transform 0.2s",
          transform: open ? "rotate(90deg)" : "rotate(0deg)",
          display: "inline-block", lineHeight: 1,
        }}>{"\u25B6"}</span>
        <h3 style={{ fontSize: "1.0rem", fontWeight: 600, color: C.dark, margin: 0, flex: 1 }}>{title}</h3>
        {effort && (
          <span style={{
            padding: "2px 10px", borderRadius: "10px", fontSize: "0.72rem",
            fontWeight: 600, background: `${ec[effort]}15`, color: ec[effort], flexShrink: 0,
          }}>{effort}</span>
        )}
      </button>
      <div style={{
        maxHeight: open ? "600px" : "0",
        overflow: "hidden",
        transition: "max-height 0.35s ease",
      }}>
        <div style={{ padding: "0 1rem 0.85rem 1.8rem", fontSize: "0.95rem", color: C.text, lineHeight: 1.65 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function PillarGroup({ pillar, children }) {
  const cm = { PEOPLE: C.people, PROCESS: C.process, "DATA/TECH": C.data };
  const labels = { PEOPLE: "People", PROCESS: "Process", "DATA/TECH": "Data / Technology" };
  const descs = {
    PEOPLE: "Team readiness, culture, and adoption",
    PROCESS: "Workflows, documentation, and standards",
    "DATA/TECH": "Tools, integrations, and data governance",
  };
  return (
    <div style={{ marginBottom: "1.2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.6rem" }}>
        <div style={{
          width: "6px", height: "6px", borderRadius: "50%", background: cm[pillar], flexShrink: 0,
        }} />
        <div>
          <p style={{ fontSize: "0.95rem", fontWeight: 600, color: cm[pillar], margin: 0 }}>{labels[pillar]}</p>
          <p style={{ fontSize: "0.8rem", color: C.muted, margin: 0 }}>{descs[pillar]}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function ToolItem({ name, desc, type }) {
  const tc = { keep: C.process, activate: "#4A7A63", add: C.data, consider: C.muted };
  const tl = { keep: "KEEP", activate: "ACTIVATE", add: "ADD", consider: "PHASE 2" };
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "0.45rem 0", borderBottom: `1px solid ${C.border}` }}>
      <span style={{ flexShrink: 0, padding: "2px 6px", borderRadius: "3px", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em", background: `${tc[type]}12`, color: tc[type], marginTop: "2px" }}>{tl[type]}</span>
      <div><span style={{ fontSize: "0.95rem", fontWeight: 600, color: C.dark }}>{name}</span><span style={{ fontSize: "0.92rem", color: C.muted }}> — {desc}</span></div>
    </div>
  );
}

function ROICard({ label, value, color, desc }) {
  return (
    <div style={{
      flex: "1 1 200px", minWidth: "180px",
      background: C.card, border: `1px solid ${C.border}`, borderTop: `3px solid ${color}`,
      borderRadius: "8px", padding: "1rem 1rem 0.8rem", textAlign: "center",
    }}>
      <p style={{ fontSize: "0.82rem", color: C.muted, textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 500, marginBottom: "0.3rem" }}>{label}</p>
      <p style={{ fontSize: "1.45rem", fontWeight: 700, color, fontFamily: "'Instrument Serif', serif", marginBottom: "0.2rem" }}>{value}</p>
      <p style={{ fontSize: "0.8rem", color: C.muted, lineHeight: 1.4 }}>{desc}</p>
    </div>
  );
}

function PhaseBlock({ num, title, groups }) {
  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.5rem" }}>
        <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: C.process, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.8rem", fontWeight: 700 }}>{num}</div>
        <h3 style={{ fontSize: "1.0rem", fontWeight: 600, color: C.dark, margin: 0 }}>{title}</h3>
      </div>
      <div style={{ borderLeft: `2px solid ${C.border}`, marginLeft: "10px", paddingLeft: "18px" }}>
        {groups.map((g, gi) => (
          <div key={gi} style={{ marginBottom: "0.5rem" }}>
            <Badge pillar={g.pillar} />
            <div style={{ marginTop: "4px" }}>
              {g.items.map((item, ii) => (
                <p key={ii} style={{ fontSize: "0.92rem", color: C.text, lineHeight: 1.5, paddingLeft: "0.5rem", marginBottom: "2px" }}>{"\u2022"} {item}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Discovery caveat note ── */
function CaveatNote({ children }) {
  return (
    <div style={{
      background: "#faf9f5", border: `1px dashed ${C.border}`, borderRadius: "6px",
      padding: "0.6rem 0.9rem", marginBottom: "0.8rem",
      display: "flex", alignItems: "flex-start", gap: "8px",
    }}>
      <span style={{ fontSize: "0.9rem", flexShrink: 0, marginTop: "1px" }}>*</span>
      <p style={{ fontSize: "0.88rem", color: C.muted, lineHeight: 1.55, margin: 0, fontStyle: "italic" }}>{children}</p>
    </div>
  );
}

export default function DemoDiagnostic() {
  const [stage, setStage] = useState("ready");
  const [progress, setProgress] = useState(0);

  const msgs = ["Assessing your team's AI readiness and culture", "Mapping your workflow gaps and documentation", "Auditing your Clio Manage AI utilization", "Projecting value from real engagement benchmarks", "Building your 90-day roadmap", "Finalizing your engagement recommendation"];

  const go = () => {
    setStage("gen"); setProgress(0);
    let p = 0;
    const t = setInterval(() => { p++; setProgress(p); if (p >= 100) { clearInterval(t); setTimeout(() => setStage("report"), 400); } }, 70);
  };

  return (
    <>
      <Head>
        <title>AI Ready Diagnostic | Harper Reid Employment Law</title>
        <meta name="description" content="Bespoke AI Ready Diagnostic prepared for Harper Reid Employment Law by Gaia Allies." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />

      {/* Sticky Header */}
      <div style={{ background: "#fff", borderBottom: `1px solid ${C.border}`, padding: "0.65rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "26px", height: "26px", borderRadius: "6px", background: C.process, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.85rem", fontWeight: 700 }}>GA</div>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.15rem", color: C.dark }}>AI Ready</span>
          <span style={{ fontSize: "0.68rem", color: C.process, background: C.processBg, padding: "2px 6px", borderRadius: "8px", fontWeight: 500 }}>Diagnostic Engine</span>
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          {["People", "Process", "Data"].map((p, i) => <span key={i} style={{ padding: "2px 7px", borderRadius: "10px", fontSize: "0.68rem", fontWeight: 500, color: [C.people, C.process, C.data][i], background: [C.peopleBg, C.processBg, C.dataBg][i] }}>{p}</span>)}
        </div>
      </div>

      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "1.5rem 1.2rem 4rem" }}>

        {/* ════════ READY ════════ */}
        {stage === "ready" && (
          <div style={{ textAlign: "center", padding: "2.5rem 0.5rem" }}>
            <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "2.1rem", fontWeight: 400, color: C.dark, marginBottom: "0.4rem" }}>Harper Reid Employment Law</h1>
            <p style={{ fontSize: "1.0rem", color: C.muted }}>Austin, TX · 10 Team Members · 1 Office · Employment Law</p>
            <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "10px", padding: "1.1rem", textAlign: "left", maxWidth: "460px", margin: "1.3rem auto 1.8rem" }}>
              {[["AI Champion", "To Be Identified"], ["Platform", "Clio Manage (with Manage AI)"], ["AI Tools", "Manage AI + Clio Draft"], ["Opportunity", "Unlock the AI features your firm is already paying for"]].map(([l, v], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: "1rem", padding: "0.4rem 0", borderBottom: i < 3 ? `1px solid #f0eee9` : "none" }}>
                  <span style={{ fontSize: "0.92rem", color: C.muted, flexShrink: 0 }}>{l}</span>
                  <span style={{ fontSize: "0.92rem", color: i === 3 ? C.process : C.dark, fontWeight: 500, textAlign: "right" }}>{v}</span>
                </div>
              ))}
            </div>
            <button onClick={go} style={{ padding: "0.75rem 2rem", background: C.process, border: "none", borderRadius: "8px", color: "#fff", fontSize: "1.0rem", fontWeight: 500, cursor: "pointer" }}>Generate Your Diagnostic →</button>
          </div>
        )}

        {/* ════════ GENERATING ════════ */}
        {stage === "gen" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "5rem 1rem" }}>
            <div style={{ width: "260px", height: "4px", background: "#eae8e3", borderRadius: "2px", overflow: "hidden", marginBottom: "1rem" }}>
              <div style={{ width: `${progress}%`, height: "100%", background: C.process, transition: "width 0.2s" }} />
            </div>
            <p style={{ fontSize: "1.0rem", color: C.text }}>{msgs[Math.min(Math.floor(progress / 17), msgs.length - 1)]}...</p>
          </div>
        )}

        {/* ════════ REPORT ════════ */}
        {stage === "report" && (
          <div style={{ animation: "fi 0.6s ease" }}>
            <style>{`@keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>

            {/* Header */}
            <div style={{ marginBottom: "1.3rem" }}>
              <div style={{ display: "inline-block", padding: "3px 10px", background: C.process, borderRadius: "3px", marginBottom: "0.4rem" }}>
                <span style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff", fontWeight: 600 }}>AI Readiness Diagnostic</span>
              </div>
              <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.5rem", fontWeight: 400, color: C.dark }}>Harper Reid Employment Law</h1>
              <p style={{ fontSize: "0.95rem", color: C.muted }}>Austin, TX · 10 Team Members · Employment Law · March 2026</p>
            </div>

            {/* Snapshot */}
            <Section title="Your Firm at a Glance">
              <p style={{ fontSize: "0.82rem", color: C.text, lineHeight: 1.7 }}>
                Your firm is a 10-person employment law practice in Austin, TX handling workplace discrimination, wrongful termination, wage and hour disputes, and EEOC compliance. You are on Clio Manage with Manage AI available. An AI champion has not yet been identified.
              </p>
              <p style={{ fontSize: "0.82rem", color: C.text, lineHeight: 1.7, marginTop: "0.4rem" }}>
                <strong>The key insight:</strong> You already own platforms with significant AI capability. The gap is between what you have and what your team uses daily. This is about unlocking what you own, not buying more tools.
              </p>
            </Section>

            {/* AI Readiness Scores */}
            <Section title="Your AI Readiness Scores">
              <CaveatNote>
                These preliminary scores are based on an initial conversation and publicly available information about your firm. A comprehensive discovery process would refine these scores based on team interviews, workflow audits, and a full technology assessment.
              </CaveatNote>
              <div style={{ display: "flex", justifyContent: "center", gap: "0.8rem", flexWrap: "wrap", padding: "0.8rem 0" }}>
                <Gauge score={4} label="People" color={C.people} desc="No AI champion identified. Team comfort and adoption unknown." />
                <Gauge score={3} label="Process" color={C.process} desc="Documentation-heavy workflows with no AI integration or SOPs in place." />
                <Gauge score={5} label="Data/Tech" color={C.data} desc="Clio Manage AI available but likely underutilized. No AI policy." />
                <Gauge score={4} label="Overall" color={C.dark} desc="Strong platform foundation. Significant upside with structured adoption." />
              </div>
            </Section>

            {/* ═══ FINDINGS ═══ */}
            <Section title="What We Found">

              <PillarGroup pillar="PEOPLE">
                <AccordionItem pillar="PEOPLE" title="No AI Policy in Place" defaultOpen={true}>
                  <p>Employment law firms handle highly sensitive employee data, EEOC filings, and confidential settlement negotiations. Without a formal AI policy, team members may be using consumer AI tools with client data, creating real ethical exposure.</p>
                  <p style={{ marginTop: "0.4rem" }}>An effective AI policy would be developed alongside your attorneys to ensure compliance with Texas bar ethics rules and employment law confidentiality requirements. The framework: a three-tier data classification (Public, Confidential, Sensitive) with clear guidance on which tools are approved for each.</p>
                </AccordionItem>
                <AccordionItem pillar="PEOPLE" title="Mixed Comfort Levels Are Expected">
                  <p>At a comparable 20-person litigation firm, a paralegal who initially resisted AI became the biggest advocate after seeing it reduce a half-day task to 20 minutes.</p>
                  <p style={{ marginTop: "0.4rem" }}>A 10-person employment law team will have a range of comfort levels. Attorneys need to see AI handle EEOC response drafting. Paralegals need to see it summarize personnel files in minutes. Everyone needs multiple pathways.</p>
                </AccordionItem>
              </PillarGroup>

              <PillarGroup pillar="PROCESS">
                <AccordionItem pillar="PROCESS" title="Document-Heavy Workflows Without AI Assistance">
                  <p>Employment law generates massive documentation: EEOC charges, position statements, demand letters, separation agreements, and discovery responses. Each case type has predictable patterns ideal for AI-assisted drafting.</p>
                  <p style={{ marginTop: "0.4rem" }}>Clio Draft combined with Manage AI can transform your document production with templates for standard employment agreements, EEOC responses, and demand letters enhanced with matter-specific details.</p>
                </AccordionItem>
                <AccordionItem pillar="PROCESS" title="Intake-to-Resolution Workflow Gaps">
                  <p>Employment cases follow predictable lifecycles: intake, document collection, demand or EEOC filing, negotiation, litigation or settlement. Each stage has repetitive tasks consuming paralegal and attorney time.</p>
                  <p style={{ marginTop: "0.4rem" }}>Mapping these workflows and inserting AI at the highest-impact points can significantly reduce time from client onboarding to case resolution.</p>
                </AccordionItem>
              </PillarGroup>

              <PillarGroup pillar="DATA/TECH">
                <AccordionItem pillar="DATA/TECH" title="Clio Manage AI Features Sitting Dormant">
                  <p>Clio Manage AI includes matter summarization, deadline extraction, automated billing, document analysis, writing assistance, and an AI Launchpad. Most firms activate it but never train their team to actually use it.</p>
                  <p style={{ marginTop: "0.4rem" }}>In comparable firms, matter summarization alone saves 30-60 minutes per case. Automated billing reduces invoice generation from hours to minutes. You are paying for these features.</p>
                </AccordionItem>
              </PillarGroup>

            </Section>

            {/* ═══ RECOMMENDATIONS ═══ */}
            <Section title="What We Recommend">

              <PillarGroup pillar="PEOPLE">
                <AccordionItem pillar="PEOPLE" title="AI Usage Policy" effort="Quick Win" defaultOpen={true}>
                  <p>Create a firm-wide policy with three-tier data classification, approved tools, and workflow guidelines. Developed collaboratively with your attorneys to ensure compliance with employment law data sensitivity: employee records, settlement terms, and EEOC filings require strict handling protocols.</p>
                  <div style={{ background: "#f8f7f3", borderRadius: "4px", padding: "0.5rem 0.7rem", marginTop: "0.5rem" }}>
                    <p style={{ fontSize: "0.92rem", color: C.dark, lineHeight: 1.5 }}><strong>Impact:</strong> Gives your team clear permission to use AI confidently. Enables everything that follows. Without this, every other recommendation carries risk.</p>
                  </div>
                </AccordionItem>
                <AccordionItem pillar="PEOPLE" title="Role-Based Training" effort="Medium">
                  <p>Two tracks: Attorneys get EEOC response drafting, demand letter generation, case analysis, and research workflows. Paralegals and support staff get intake summarization, document review, deadline management, and client communication.</p>
                  <div style={{ background: "#f8f7f3", borderRadius: "4px", padding: "0.5rem 0.7rem", marginTop: "0.5rem" }}>
                    <p style={{ fontSize: "0.92rem", color: C.process, lineHeight: 1.5 }}><strong>Real benchmark:</strong> At a comparable firm, the managing partner said training exceeded expectations and created real energy and momentum in the office.</p>
                  </div>
                </AccordionItem>
              </PillarGroup>

              <PillarGroup pillar="PROCESS">
                <AccordionItem pillar="PROCESS" title="Employment Law Prompt Library" effort="Medium">
                  <p>Build a practice-area-specific prompt library: EEOC position statement drafts, demand letter templates, separation agreement reviews, employee handbook audits, and discovery response frameworks.</p>
                  <div style={{ background: "#f8f7f3", borderRadius: "4px", padding: "0.5rem 0.7rem", marginTop: "0.5rem" }}>
                    <p style={{ fontSize: "0.92rem", color: C.process, lineHeight: 1.5 }}><strong>Real benchmark:</strong> At a comparable firm, building a prompt library reduced first-draft time for standard documents from hours to minutes.</p>
                  </div>
                </AccordionItem>
              </PillarGroup>

              <PillarGroup pillar="DATA/TECH">
                <AccordionItem pillar="DATA/TECH" title="Activate Clio Manage AI Features" effort="Quick Win">
                  <p>Audit current Manage AI usage across the team. Train attorneys on matter summarization and the AI Launchpad. Train paralegals on deadline extraction, document analysis, and automated billing.</p>
                  <div style={{ background: "#f8f7f3", borderRadius: "4px", padding: "0.5rem 0.7rem", marginTop: "0.5rem" }}>
                    <p style={{ fontSize: "0.92rem", color: C.process, lineHeight: 1.5 }}><strong>Real benchmark:</strong> At a comparable firm, matter summarization cut catch-up time from 30 minutes to 2 minutes. Automated billing saved 4-6 hours per billing cycle.</p>
                  </div>
                  <p style={{ marginTop: "0.4rem" }}><strong style={{ color: C.dark }}>Impact:</strong> <span style={{ color: C.muted }}>Even modest time savings across a 10-person team compounds quickly into significant recovered capacity each week.</span></p>
                </AccordionItem>
                <AccordionItem pillar="DATA/TECH" title="Evaluate Clio Draft + Research Integration" effort="Medium">
                  <p>Clio Draft offers AI-powered document automation integrated with your matter data. Combined with vLex-powered legal research, your attorneys can research, draft, and refine employment law documents without leaving the platform.</p>
                </AccordionItem>
              </PillarGroup>

            </Section>

            {/* Tool Stack */}
            <Section title="Your Recommended Tool Stack">
              <CaveatNote>
                This is a demonstration of the AI Ready Diagnostic methodology. A real engagement begins with a comprehensive discovery covering your full technology stack, team workflows, and practice-area-specific needs.
              </CaveatNote>
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "0.9rem 1.1rem" }}>
                <ToolItem type="keep" name="Clio Manage" desc="Your practice management hub with 200+ integrations" />
                <ToolItem type="keep" name="Clio Manage AI" desc="Built-in AI for summarization, billing, scheduling, and matter chat" />
                <ToolItem type="activate" name="AI Launchpad" desc="Central hub for all Manage AI features: tasks, events, time entries" />
                <ToolItem type="activate" name="AI Scheduling" desc="Auto-extract deadlines from court documents into your calendar" />
                <ToolItem type="activate" name="Automated Billing" desc="AI-generated invoices with refined descriptions and approval routing" />
                <ToolItem type="add" name="AI Policy + Data Classification" desc="Three-tier framework tailored for employment law data sensitivity" />
                <ToolItem type="add" name="Employment Law Prompt Library" desc="EEOC responses, demand letters, separation agreements, handbook audits" />
                <ToolItem type="add" name="Meeting AI" desc="Zoom Companion or Read.ai for client calls and team meetings" />
                <ToolItem type="consider" name="Clio Draft" desc="AI-powered document automation integrated with your matter data" />
                <ToolItem type="consider" name="Clio Work (vLex)" desc="Integrated legal research with matter-aware context" />
              </div>
            </Section>

            {/* 90-Day Roadmap */}
            <Section title="Your 90-Day Roadmap">
              <PhaseBlock num="1" title="Foundation (Days 1-30)" groups={[
                { pillar: "PEOPLE", items: ["Draft and implement your AI usage policy with employment-law-specific data handling", "Identify your AI champion to drive adoption across the team"] },
                { pillar: "PROCESS", items: ["Select 2-3 active employment cases for AI workflow pilot testing", "Begin building your employment law prompt library"] },
                { pillar: "DATA/TECH", items: ["Audit Clio Manage AI utilization across all 10 team members", "Activate and configure AI Launchpad, scheduling, and automated billing"] },
              ]} />
              <PhaseBlock num="2" title="Training & Integration (Days 31-60)" groups={[
                { pillar: "PEOPLE", items: ["Deliver role-based training: attorneys on drafting and research, staff on billing and docs", "Establish bi-weekly AI champion check-in to track adoption"] },
                { pillar: "PROCESS", items: ["Run pilot cases through full AI workflow: intake to resolution", "Document core employment law workflows as standardized SOPs"] },
                { pillar: "DATA/TECH", items: ["Full team trained on all Manage AI features with real case exercises", "Evaluate Clio Draft and Clio Work for document automation and research"] },
              ]} />
              <PhaseBlock num="3" title="Scale & Measure (Days 61-90)" groups={[
                { pillar: "PEOPLE", items: ["Survey adoption rates and address remaining resistance", "Recognize and expand your AI champion network"] },
                { pillar: "PROCESS", items: ["Scale AI workflows from pilot cases to all active employment matters", "Conduct 90-day review: time saved, throughput, satisfaction"] },
                { pillar: "DATA/TECH", items: ["Deploy Clio Draft and Clio Work if evaluation positive", "Assess integration opportunities across Clio ecosystem"] },
              ]} />
            </Section>

            {/* ═══ ROI — Rethought ═══ */}
            <Section title="The Value of Getting This Right">
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "1.1rem" }}>
                <p style={{ fontSize: "0.95rem", color: C.text, lineHeight: 1.7, marginBottom: "0.5rem" }}>
                  The legal industry is shifting. Clients and opposing counsel are increasingly using AI tools. Employment law firms that adopt structured AI workflows will handle more matters and respond faster.
                </p>
                <p style={{ fontSize: "0.95rem", color: C.text, lineHeight: 1.7, marginBottom: "1rem" }}>
                  For an employment law firm, the value is not just saving hours. It is faster EEOC responses, more thorough case preparation, better client communication, and the ability to handle more matters without adding headcount. These metrics compound over time.
                </p>

                <p style={{ fontSize: "0.82rem", fontWeight: 600, color: C.process, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Where You Recover Time</p>

                <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                  <ROICard label="Matter Summarization" value="30-60 min/case" color={C.process} desc="Catching up on a case file reduced from 30 minutes to under 2 minutes" />
                  <ROICard label="Document Drafting" value="2-3 hrs/doc" color={C.process} desc="EEOC responses, demand letters, and agreements drafted in minutes" />
                  <ROICard label="Billing Cycle" value="4-6 hrs/month" color={C.data} desc="Automated invoice generation eliminates manual billing work" />
                </div>

                <p style={{ fontSize: "0.82rem", fontWeight: 600, color: C.people, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Where You Gain the Edge</p>

                <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                  <ROICard label="Case Preparation" value="Better armed" color={C.people} desc="More thorough case analysis means stronger positions in negotiation and litigation" />
                  <ROICard label="Case Throughput" value="More matters" color={C.people} desc="Handle additional employment cases with your existing 10-person team" />
                  <ROICard label="Client Experience" value="Stronger reputation" color={C.data} desc="Faster EEOC filings, quicker demand letters, and better client communication" />
                </div>

                <p style={{ fontSize: "0.82rem", fontWeight: 600, color: C.dark, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.6rem" }}>The Competitive Reality</p>

                <div style={{ background: "#faf9f5", borderRadius: "6px", padding: "0.8rem 1rem", marginBottom: "1rem" }}>
                  <p style={{ fontSize: "0.95rem", color: C.text, lineHeight: 1.7 }}>
                    Opposing counsel is adopting these tools. HR departments and in-house counsel increasingly expect outside firms to work at AI speed. Getting there first means you set the standard. Getting there late means adjusting to someone else's.
                  </p>
                </div>

                {/* Investment summary */}
            <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: "200px", padding: "0.7rem", background: C.processBg, borderRadius: "6px", textAlign: "center" }}>
                    <p style={{ fontSize: "0.8rem", color: C.muted }}>Start Here</p>
                    <p style={{ fontSize: "1.4rem", fontWeight: 700, color: C.process, fontFamily: "'Instrument Serif'" }}>$1,500</p>
                    <p style={{ fontSize: "0.82rem", color: C.text, fontWeight: 500 }}>Full AI Readiness Diagnostic</p>
                    <p style={{ fontSize: "0.72rem", color: C.muted, lineHeight: 1.4, marginTop: "4px" }}>Discovery call, team assessment, technology audit, and detailed interactive report with scored findings and recommendations</p>
                  </div>
                  <div style={{ flex: 1, minWidth: "200px", padding: "0.7rem", background: C.dataBg, borderRadius: "6px", textAlign: "center" }}>
                    <p style={{ fontSize: "0.8rem", color: C.muted }}>Full Engagement</p>
                    <p style={{ fontSize: "1.4rem", fontWeight: 700, color: C.data, fontFamily: "'Instrument Serif'" }}>$7K – $12K</p>
                    <p style={{ fontSize: "0.82rem", color: C.text, fontWeight: 500 }}>Implement + Train (60 days)</p>
                    <p style={{ fontSize: "0.72rem", color: C.muted, lineHeight: 1.4, marginTop: "4px" }}>Configuration, SOP development, prompt library build, hands-on training, and post-training support</p>
                  </div>
                  <div style={{ flex: 1, minWidth: "200px", padding: "0.7rem", background: C.peopleBg, borderRadius: "6px", textAlign: "center" }}>
                    <p style={{ fontSize: "0.8rem", color: C.muted }}>What You Get Back</p>
                    <p style={{ fontSize: "1.4rem", fontWeight: 700, color: C.people, fontFamily: "'Instrument Serif'" }}>15+ hrs/week</p>
                    <p style={{ fontSize: "0.82rem", color: C.text, fontWeight: 500 }}>Time recovered across your team</p>
                    <p style={{ fontSize: "0.72rem", color: C.muted, lineHeight: 1.4, marginTop: "4px" }}>Reinvest in more clients, better work-life balance, or both</p>
                  </div>
                </div>
              </div>
            </Section>

            {/* How We Work Together */}
            <Section title="How We Work Together">
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "1.1rem" }}>
                <p style={{ fontSize: "0.82rem", fontWeight: 600, color: C.process, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Recommended</p>
                <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.3rem", color: C.dark, marginBottom: "0.7rem" }}>Implement + Train (Hybrid)</h3>
                {[
                  ["Week 1", "Discovery Deep-Dive", "Full Clio audit, team interviews, AI policy draft, employment workflow mapping"],
                  ["Weeks 2-3", "Implementation Sprint", "Activate Manage AI features, build employment law prompt library, run pilot cases"],
                  ["Week 4", "Immersive Training Day", "Role-based sessions with your real employment cases, shared prompt library build"],
                  ["Weeks 5-8", "Advisory Support", "Bi-weekly check-ins, adoption monitoring, tool evaluations, ROI measurement"],
                ].map(([time, title, desc], i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", padding: "0.45rem 0", borderBottom: i < 3 ? `1px solid #f0eee9` : "none" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 600, color: C.process, minWidth: "65px", flexShrink: 0 }}>{time}</span>
                    <div><p style={{ fontSize: "0.95rem", fontWeight: 600, color: C.dark }}>{title}</p><p style={{ fontSize: "0.88rem", color: C.muted }}>{desc}</p></div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Footer */}
            <div style={{ marginTop: "2rem", paddingTop: "0.8rem", borderTop: `2px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.6rem" }}>
              <div>
                <p style={{ fontSize: "0.9rem", color: C.process, fontWeight: 500 }}>Gaia Allies · AI Strategy & Training for Law Firms</p>
                <p style={{ fontSize: "0.8rem", color: C.light }}>amy@gaiaallies.com · gaiaallies.com/aiready</p>
              </div>
              <button onClick={() => { setStage("ready"); setProgress(0); }} style={{ padding: "0.4rem 1rem", background: C.process, border: "none", borderRadius: "6px", color: "#fff", fontSize: "0.88rem", cursor: "pointer" }}>New Diagnostic</button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
