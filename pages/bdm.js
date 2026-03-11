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

export default function BDMDiagnosticV3() {
  const [stage, setStage] = useState("ready");
  const [progress, setProgress] = useState(0);

  const msgs = ["Assessing your team's AI readiness and culture", "Mapping your workflow gaps and documentation", "Auditing your SmartAdvocate and Supio utilization", "Projecting value from real engagement benchmarks", "Building your 90-day roadmap", "Finalizing your engagement recommendation"];

  const go = () => {
    setStage("gen"); setProgress(0);
    let p = 0;
    const t = setInterval(() => { p++; setProgress(p); if (p >= 100) { clearInterval(t); setTimeout(() => setStage("report"), 400); } }, 70);
  };

  return (
    <>
      <Head>
        <title>AI Ready Diagnostic | Broussard, David & Moroux</title>
        <meta name="description" content="Bespoke AI Ready Diagnostic prepared for Broussard, David & Moroux by Gaia Allies." />
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
            <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "2.1rem", fontWeight: 400, color: C.dark, marginBottom: "0.4rem" }}>Broussard, David & Moroux</h1>
            <p style={{ fontSize: "1.0rem", color: C.muted }}>Lafayette, LA · 35+ Team Members · 3 Offices · Catastrophic PI</p>
            <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "10px", padding: "1.1rem", textAlign: "left", maxWidth: "460px", margin: "1.3rem auto 1.8rem" }}>
              {[["AI Champion", "Tim Rinaldi"], ["Platform", "SmartAdvocate (built-in AI)"], ["AI Tools", "Supio + SA AI Suite"], ["Opportunity", "Equip your team and tools to stay ahead of the curve"]].map(([l, v], i) => (
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
              <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.5rem", fontWeight: 400, color: C.dark }}>Broussard, David & Moroux</h1>
              <p style={{ fontSize: "0.95rem", color: C.muted }}>Lafayette, LA · 35+ Team Members · Catastrophic PI · March 2026</p>
            </div>

            {/* Snapshot */}
            <Section title="Your Firm at a Glance">
              <p style={{ fontSize: "0.82rem", color: C.text, lineHeight: 1.7 }}>
                Your firm is a premier catastrophic PI practice with 35+ team members across three Louisiana offices. You hold the largest PI verdict in Lafayette Parish history ($30M) and three Top 100 national verdicts. You are on SmartAdvocate with Supio for PI-specific AI. Tim Rinaldi is your internal AI champion.
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
                <Gauge score={5} label="People" color={C.people} desc="AI champion identified. Team comfort level and adoption unknown." />
                <Gauge score={4} label="Process" color={C.process} desc="Strong outcomes. Workflow documentation to be assessed in discovery." />
                <Gauge score={6} label="Data/Tech" color={C.data} desc="Good tools in place. Feature utilization likely uneven. No AI policy." />
                <Gauge score={5} label="Overall" color={C.dark} desc="Well-resourced. Significant upside with structured adoption." />
              </div>
            </Section>

            {/* ═══ FINDINGS ═══ */}
            <Section title="What We Found">

              <PillarGroup pillar="PEOPLE">
                <AccordionItem pillar="PEOPLE" title="No AI Policy in Place" defaultOpen={true}>
                  <p>With 35+ team members across three offices, some of your staff are almost certainly using consumer AI tools without safeguards. For an AV-rated, board-certified firm handling cases worth millions, this is real ethical exposure.</p>
                  <p style={{ marginTop: "0.4rem" }}>An effective AI policy would be developed alongside your attorneys to ensure compliance with Louisiana bar ethics rules, and with firm leadership to ensure it reflects your service delivery standards and brand integrity. The framework: a three-tier data classification (Public, Confidential, Sensitive) with clear guidance on which tools are approved for each.</p>
                </AccordionItem>
                <AccordionItem pillar="PEOPLE" title="Mixed Comfort Levels Are Expected">
                  <p>At a comparable 20-person litigation firm, a paralegal who initially resisted AI became the biggest advocate after seeing it reduce a half-day task to 20 minutes.</p>
                  <p style={{ marginTop: "0.4rem" }}>Your 35+ person team will have an even wider range. Training must show real time savings on real workflows with multiple pathways so each person finds their comfort level.</p>
                </AccordionItem>
              </PillarGroup>

              <PillarGroup pillar="PROCESS">
                <AccordionItem pillar="PROCESS" title="Supio Integration Underutilized">
                  <p>SmartAdvocate integrates directly with Supio, meaning medical chronologies, demand drafts, case economics, and missed injury signals can flow into your case files automatically.</p>
                  <p style={{ marginTop: "0.4rem" }}>For catastrophic PI where a single demand letter influences multi-million dollar settlements, optimizing this workflow could reduce case workup time significantly.</p>
                </AccordionItem>
                <AccordionItem pillar="PROCESS" title="Multi-Office Workflow Fragmentation">
                  <p>Lafayette, New Orleans, and Covington likely each have different ad hoc practices. Without standardized AI workflows that are consistent across offices, adoption will be uneven.</p>
                  <p style={{ marginTop: "0.4rem" }}>AI-powered meeting summaries for cross-office case conferences would reduce coordination overhead significantly.</p>
                </AccordionItem>
              </PillarGroup>

              <PillarGroup pillar="DATA/TECH">
                <AccordionItem pillar="DATA/TECH" title="SmartAdvocate AI Features Sitting Dormant">
                  <p>SmartAdvocate released built-in AI tools in 2025 including summarization, case chat, Rewrite, Translate, and voice transcription. Your team of 35+ likely has uneven adoption at best.</p>
                  <p style={{ marginTop: "0.4rem" }}>In comparable firms, medical record summarization alone saves 2-4 hours per catastrophic case. You are paying for these features and not using them.</p>
                </AccordionItem>
              </PillarGroup>

            </Section>

            {/* ═══ RECOMMENDATIONS ═══ */}
            <Section title="What We Recommend">

              <PillarGroup pillar="PEOPLE">
                <AccordionItem pillar="PEOPLE" title="AI Usage Policy" effort="Quick Win" defaultOpen={true}>
                  <p>Create a firm-wide policy with three-tier data classification, approved tools, and workflow guidelines. Developed collaboratively with your attorneys to ensure compliance with bar ethics rules and with leadership to align with your service delivery standards and firm brand.</p>
                  <div style={{ background: "#f8f7f3", borderRadius: "4px", padding: "0.5rem 0.7rem", marginTop: "0.5rem" }}>
                    <p style={{ fontSize: "0.92rem", color: C.dark, lineHeight: 1.5 }}><strong>Impact:</strong> Gives your team clear permission to use AI confidently. Enables everything that follows. Without this, every other recommendation carries risk.</p>
                  </div>
                </AccordionItem>
                <AccordionItem pillar="PEOPLE" title="Role-Based Training" effort="Medium">
                  <p>Three tracks: Attorneys get case analysis, depo prep, and three-layer research. Paralegals get medical record summarization, discovery drafting, and document QC. Support staff get intake, scheduling, and client communication workflows.</p>
                  <div style={{ background: "#f8f7f3", borderRadius: "4px", padding: "0.5rem 0.7rem", marginTop: "0.5rem" }}>
                    <p style={{ fontSize: "0.92rem", color: C.process, lineHeight: 1.5 }}><strong>Real benchmark:</strong> At a comparable firm, the managing partner said training exceeded expectations and created real energy and momentum in the office.</p>
                  </div>
                </AccordionItem>
              </PillarGroup>

              <PillarGroup pillar="PROCESS">
                <AccordionItem pillar="PROCESS" title="Supio-SmartAdvocate Workflow Optimization" effort="Medium">
                  <p>Verify the integration is fully configured. Build a standardized workflow: intake docs uploaded, Supio generates chronology and flags missed injuries, attorney reviews, demand letter drafted with case economics, QC against your firm standards.</p>
                  <div style={{ background: "#f8f7f3", borderRadius: "4px", padding: "0.5rem 0.7rem", marginTop: "0.5rem" }}>
                    <p style={{ fontSize: "0.92rem", color: C.process, lineHeight: 1.5 }}><strong>Real benchmark:</strong> Comparable firms report significant reduction in catastrophic PI case workup time after workflow standardization.</p>
                  </div>
                </AccordionItem>
              </PillarGroup>

              <PillarGroup pillar="DATA/TECH">
                <AccordionItem pillar="DATA/TECH" title="Activate SmartAdvocate AI Features" effort="Quick Win">
                  <p>Audit current usage. Train attorneys on AI case chat, paralegals on summarization for medical records, support staff on transcription and translate. Start with a 15-minute demo showing real case output.</p>
                  <div style={{ background: "#f8f7f3", borderRadius: "4px", padding: "0.5rem 0.7rem", marginTop: "0.5rem" }}>
                    <p style={{ fontSize: "0.92rem", color: C.process, lineHeight: 1.5 }}><strong>Real benchmark:</strong> At a comparable firm, summarizing 200-page medical records went from hours to under 1 minute. Interrogatories went from 3-4 hours to 5-15 minutes.</p>
                  </div>
                  <p style={{ marginTop: "0.4rem" }}><strong style={{ color: C.dark }}>Impact:</strong> <span style={{ color: C.muted }}>Even modest time savings across your support team compounds quickly into significant recovered capacity each week.</span></p>
                </AccordionItem>
                <AccordionItem pillar="DATA/TECH" title="Evaluate Specialized PI Tools" effort="Medium">
                  <p>The PI-specific AI market is evolving rapidly. Through discovery, we would evaluate which demand automation, case valuation, and settlement analysis tools integrate best with your SmartAdvocate workflow and match your case profile. For a firm winning 8-figure verdicts, even marginal improvement in demand quality has outsized settlement impact.</p>
                </AccordionItem>
              </PillarGroup>

            </Section>

            {/* Tool Stack */}
            <Section title="Your Recommended Tool Stack">
              <CaveatNote>
                This preliminary stack is based on your current known tools. A comprehensive discovery would include a full technology audit, integration assessment, and team utilization review before finalizing recommendations.
              </CaveatNote>
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "0.9rem 1.1rem" }}>
                <ToolItem type="keep" name="SmartAdvocate" desc="Your practice management hub with built-in AI" />
                <ToolItem type="keep" name="Supio" desc="Your PI AI for chronologies, demands, case economics" />
                <ToolItem type="activate" name="SA AI Summarization" desc="One-click summaries for cases, medical records, depositions" />
                <ToolItem type="activate" name="SA AI Case Chat" desc="Conversational case file queries for your attorneys" />
                <ToolItem type="activate" name="SA Rewrite + Translate" desc="Polish correspondence, translate for your clients" />
                <ToolItem type="add" name="AI Policy + Data Classification" desc="Your three-tier framework: Public, Confidential, Sensitive" />
                <ToolItem type="add" name="Custom Prompt Libraries" desc="Role-based templates for your team" />
                <ToolItem type="add" name="Meeting AI" desc="Zoom Companion or Read.ai for cross-office coordination" />
                <ToolItem type="consider" name="PI-Specific AI Tools" desc="Demand automation, case valuation, and settlement analysis platforms" />
                <ToolItem type="consider" name="Document Intelligence" desc="Automated categorization, filing, and extraction tools" />
              </div>
            </Section>

            {/* 90-Day Roadmap */}
            <Section title="Your 90-Day Roadmap">
              <PhaseBlock num="1" title="Foundation (Days 1-30)" groups={[
                { pillar: "PEOPLE", items: ["Draft and implement your AI usage policy alongside firm attorneys and leadership", "Identify AI champions in your New Orleans and Covington offices"] },
                { pillar: "PROCESS", items: ["Select 2-3 pilot cases for full AI workflow testing", "Begin building your practice-area prompt library"] },
                { pillar: "DATA/TECH", items: ["Audit SmartAdvocate AI utilization across your full team", "Verify and optimize your Supio-SmartAdvocate integration"] },
              ]} />
              <PhaseBlock num="2" title="Training & Integration (Days 31-60)" groups={[
                { pillar: "PEOPLE", items: ["Deliver role-based training: attorneys, paralegals, support staff", "Establish AI champion network with bi-weekly sync across offices"] },
                { pillar: "PROCESS", items: ["Run pilot cases through integrated AI workflow end-to-end", "Document your core workflows as standardized SOPs"] },
                { pillar: "DATA/TECH", items: ["Activate and train on SmartAdvocate AI features across all roles", "Evaluate specialized PI tools for demand automation and case analysis"] },
              ]} />
              <PhaseBlock num="3" title="Scale & Measure (Days 61-90)" groups={[
                { pillar: "PEOPLE", items: ["Survey adoption rates and address remaining resistance", "Recognize and expand your AI champion network"] },
                { pillar: "PROCESS", items: ["Scale AI workflows from pilot cases to all active matters", "Conduct 90-day review: time saved, throughput, satisfaction"] },
                { pillar: "DATA/TECH", items: ["Deploy specialized tools if evaluation positive", "Assess document intelligence solutions for categorization and filing"] },
              ]} />
            </Section>

            {/* ═══ ROI — Rethought ═══ */}
            <Section title="The Value of Getting This Right">
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "1.1rem" }}>
                <p style={{ fontSize: "0.95rem", color: C.text, lineHeight: 1.7, marginBottom: "0.5rem" }}>
                  The legal industry is shifting. Clients and insurers are beginning to recognize that their attorneys have AI at their disposal. The firms that get ahead of this will set the terms. The firms that wait will be playing defense.
                </p>
                <p style={{ fontSize: "0.95rem", color: C.text, lineHeight: 1.7, marginBottom: "1rem" }}>
                  For a catastrophic PI firm, the value of AI adoption is not just about saving hours. It is about being better prepared than opposing counsel, delivering faster and more thorough case workups, winning more cases, and building the kind of reputation that drives referrals. These are the metrics that compound over time.
                </p>

                <p style={{ fontSize: "0.82rem", fontWeight: 600, color: C.process, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Where You Recover Time</p>

                <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                  <ROICard label="Medical Record Review" value="2-4 hrs/case" color={C.process} desc="Summarization that currently takes half a day reduced to minutes per case" />
                  <ROICard label="Discovery Drafting" value="3-4 hrs/set" color={C.process} desc="Interrogatories and RFPs drafted in minutes instead of hours" />
                  <ROICard label="Case Workup Cycle" value="40-60%" color={C.data} desc="Potential reduction in time from intake to demand-ready with optimized workflows" />
                </div>

                <p style={{ fontSize: "0.82rem", fontWeight: 600, color: C.people, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Where You Gain the Edge</p>

                <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                  <ROICard label="Courtroom Preparation" value="Better armed" color={C.people} desc="More thorough case analysis means stronger arguments and fewer surprises at trial" />
                  <ROICard label="Case Throughput" value="More matters" color={C.people} desc="Handle additional cases with your existing team without adding headcount" />
                  <ROICard label="Client Experience" value="Stronger reputation" color={C.data} desc="Faster resolutions and better outcomes generate referrals and repeat business" />
                </div>

                <p style={{ fontSize: "0.82rem", fontWeight: 600, color: C.dark, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.6rem" }}>The Competitive Reality</p>

                <div style={{ background: "#faf9f5", borderRadius: "6px", padding: "0.8rem 1rem", marginBottom: "1rem" }}>
                  <p style={{ fontSize: "0.95rem", color: C.text, lineHeight: 1.7 }}>
                    Your opposing counsel is adopting these tools. The firms sending you referrals will increasingly expect AI-informed preparation as the baseline. Getting there first means you set the standard in your market. Getting there late means adjusting to someone else's.
                  </p>
                </div>

                {/* Investment summary */}
                <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: "200px", padding: "0.7rem", background: C.dataBg, borderRadius: "6px", textAlign: "center" }}>
                    <p style={{ fontSize: "0.8rem", color: C.muted }}>Your Investment</p>
                    <p style={{ fontSize: "1.4rem", fontWeight: 700, color: C.data, fontFamily: "'Instrument Serif'" }}>$10.5K – $16K</p>
                    <p style={{ fontSize: "0.75rem", color: C.muted }}>90-day engagement</p>
                  </div>
                  <div style={{ flex: 1, minWidth: "200px", padding: "0.7rem", background: C.processBg, borderRadius: "6px", textAlign: "center" }}>
                    <p style={{ fontSize: "0.8rem", color: C.muted }}>Time Recovered Weekly</p>
                    <p style={{ fontSize: "1.4rem", fontWeight: 700, color: C.process, fontFamily: "'Instrument Serif'" }}>60 – 110+ hrs</p>
                    <p style={{ fontSize: "0.75rem", color: C.muted }}>across your 35+ person team</p>
                  </div>
                  <div style={{ flex: 1, minWidth: "200px", padding: "0.7rem", background: C.peopleBg, borderRadius: "6px", textAlign: "center" }}>
                    <p style={{ fontSize: "0.8rem", color: C.muted }}>What That Means</p>
                    <p style={{ fontSize: "1.4rem", fontWeight: 700, color: C.people, fontFamily: "'Instrument Serif'" }}>More cases won</p>
                    <p style={{ fontSize: "0.75rem", color: C.muted }}>stronger prep, faster resolution, more referrals</p>
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
                  ["Week 1", "Discovery Deep-Dive (On-Site)", "Full SmartAdvocate audit, team interviews, AI policy draft, workflow mapping"],
                  ["Weeks 2-3", "Implementation Sprint (Remote)", "Configure integrations, build your prompt library, activate features, run pilot cases"],
                  ["Week 4", "Immersive Training Day (On-Site)", "Role-based sessions, hands-on with your real cases, shared prompt library build"],
                  ["Weeks 5-12", "Fractional CAIO Advisory (Remote)", "Bi-weekly check-ins, adoption monitoring, tool evaluations, ROI measurement"],
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
