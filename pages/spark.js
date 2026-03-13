import { useState, useEffect } from "react";

const C = {
  people: "#6B4C9A", peopleBg: "rgba(107,76,154,0.06)",
  process: "#2D5041", processBg: "rgba(45,80,65,0.06)",
  data: "#B8860B", dataBg: "rgba(184,134,11,0.06)",
  dark: "#1a2420", text: "#3d4a44", muted: "#7a7770", light: "#a09d94",
  border: "#e4e2dc", bg: "#f5f3ee", card: "#fff",
};

function Gauge({ score, label, color, desc }) {
  const [a, setA] = useState(0);
  useEffect(() => { setTimeout(() => setA(score), 300); }, [score]);
  const circ = 2 * Math.PI * 36;
  const off = circ - (a / 10) * circ;
  return (
    <div style={{ textAlign: "center", flex: "1 1 0", minWidth: "120px" }}>
      <svg width="84" height="84" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r="36" fill="none" stroke="#eae8e3" strokeWidth="6" />
        <circle cx="45" cy="45" r="36" fill="none" stroke={color} strokeWidth="6" strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round" transform="rotate(-90 45 45)" style={{ transition: "stroke-dashoffset 1.2s ease-out" }} />
        <text x="45" y="42" textAnchor="middle" style={{ fontSize: "20px", fontWeight: 700, fill: color, fontFamily: "'DM Sans'" }}>{score}</text>
        <text x="45" y="56" textAnchor="middle" style={{ fontSize: "9px", fill: C.light, fontFamily: "'DM Sans'" }}>/10</text>
      </svg>
      <p style={{ fontSize: "0.76rem", fontWeight: 600, color, marginTop: "2px" }}>{label}</p>
      <p style={{ fontSize: "0.65rem", color: C.muted, lineHeight: 1.4, marginTop: "2px", maxWidth: "150px", margin: "2px auto 0" }}>{desc}</p>
    </div>
  );
}

function Section({ title, children }) {
  return <div style={{ marginTop: "1.8rem" }}><h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.2rem", fontWeight: 400, color: C.dark, paddingBottom: "0.4rem", borderBottom: `2px solid ${C.process}`, marginBottom: "0.8rem" }}>{title}</h2>{children}</div>;
}

function AccordionItem({ title, pillar, effort, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const cm = { PEOPLE: C.people, PROCESS: C.process, "DATA/TECH": C.data };
  const ec = { "Quick Win": C.process, Medium: C.data, Major: "#A04030" };
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${cm[pillar]}`, borderRadius: "6px", marginBottom: "0.5rem", overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "8px", textAlign: "left" }}>
        <span style={{ fontSize: "0.7rem", color: cm[pillar], fontWeight: 600, transition: "transform 0.2s", transform: open ? "rotate(90deg)" : "rotate(0deg)", display: "inline-block", lineHeight: 1 }}>{"\u25B6"}</span>
        <h3 style={{ fontSize: "0.83rem", fontWeight: 600, color: C.dark, margin: 0, flex: 1 }}>{title}</h3>
        {effort && <span style={{ padding: "2px 10px", borderRadius: "10px", fontSize: "0.58rem", fontWeight: 600, background: `${ec[effort]}15`, color: ec[effort], flexShrink: 0 }}>{effort}</span>}
      </button>
      <div style={{ maxHeight: open ? "600px" : "0", overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <div style={{ padding: "0 1rem 0.85rem 1.8rem", fontSize: "0.8rem", color: C.text, lineHeight: 1.65 }}>{children}</div>
      </div>
    </div>
  );
}

function PillarGroup({ pillar, children }) {
  const cm = { PEOPLE: C.people, PROCESS: C.process, "DATA/TECH": C.data };
  const labels = { PEOPLE: "People", PROCESS: "Process", "DATA/TECH": "Data / Technology" };
  const descs = { PEOPLE: "Team readiness, culture, and adoption", PROCESS: "Workflows, documentation, and standards", "DATA/TECH": "Tools, integrations, and data governance" };
  return (
    <div style={{ marginBottom: "1.2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.6rem" }}>
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: cm[pillar], flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: "0.78rem", fontWeight: 600, color: cm[pillar], margin: 0 }}>{labels[pillar]}</p>
          <p style={{ fontSize: "0.65rem", color: C.muted, margin: 0 }}>{descs[pillar]}</p>
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
      <span style={{ flexShrink: 0, padding: "2px 6px", borderRadius: "3px", fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.06em", background: `${tc[type]}12`, color: tc[type], marginTop: "2px" }}>{tl[type]}</span>
      <div><span style={{ fontSize: "0.8rem", fontWeight: 600, color: C.dark }}>{name}</span><span style={{ fontSize: "0.76rem", color: C.muted }}> {"\u2014"} {desc}</span></div>
    </div>
  );
}

function ROICard({ label, value, color, desc }) {
  return (
    <div style={{ flex: "1 1 140px", background: "#faf9f5", borderRadius: "6px", padding: "0.65rem 0.8rem", borderLeft: `3px solid ${color}` }}>
      <p style={{ fontSize: "0.62rem", color: C.muted, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</p>
      <p style={{ fontSize: "1rem", fontWeight: 700, color, fontFamily: "'Instrument Serif'" }}>{value}</p>
      <p style={{ fontSize: "0.65rem", color: C.muted, lineHeight: 1.4 }}>{desc}</p>
    </div>
  );
}

function CaveatNote({ children }) {
  return (
    <div style={{ background: "#faf9f5", borderLeft: `3px solid ${C.light}`, borderRadius: "4px", padding: "0.6rem 0.8rem", marginBottom: "0.8rem" }}>
      <p style={{ fontSize: "0.7rem", color: C.muted, lineHeight: 1.5, fontStyle: "italic", margin: 0 }}>{children}</p>
    </div>
  );
}

function PhaseBlock({ num, title, groups }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "1rem", marginBottom: "0.6rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.6rem" }}>
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", borderRadius: "50%", background: C.process, color: "#fff", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0 }}>{num}</span>
        <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: C.dark, margin: 0 }}>{title}</h3>
      </div>
      {groups.map((g, i) => {
        const cm = { PEOPLE: C.people, PROCESS: C.process, "DATA/TECH": C.data };
        return (
          <div key={i} style={{ marginBottom: "0.5rem" }}>
            <p style={{ fontSize: "0.65rem", fontWeight: 600, color: cm[g.pillar], letterSpacing: "0.04em", marginBottom: "0.2rem" }}>{g.pillar}</p>
            {g.items.map((item, j) => (
              <p key={j} style={{ fontSize: "0.76rem", color: C.text, lineHeight: 1.5, paddingLeft: "0.8rem", position: "relative", marginBottom: "0.15rem" }}>
                <span style={{ position: "absolute", left: 0, color: cm[g.pillar] }}>{"\u2022"}</span>{item}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function CaseStudyCard({ stat, label, color }) {
  return (
    <div style={{ flex: "1 1 120px", textAlign: "center", padding: "0.6rem 0.4rem" }}>
      <p style={{ fontSize: "1.3rem", fontWeight: 700, color, fontFamily: "'Instrument Serif'" }}>{stat}</p>
      <p style={{ fontSize: "0.68rem", color: C.muted, lineHeight: 1.4, marginTop: "2px" }}>{label}</p>
    </div>
  );
}

export default function SmokballFamilyLawDiagnostic() {
  const [stage, setStage] = useState("ready");
  const [progress, setProgress] = useState(0);

  const msgs = [
    "Analyzing your firm profile",
    "Evaluating your Smokeball configuration",
    "Assessing Archie AI utilization",
    "Mapping family law workflows",
    "Scoring AI readiness across all pillars",
    "Generating your diagnostic report",
  ];

  const go = () => {
    setStage("gen");
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 6 + 2;
      if (p >= 100) { p = 100; clearInterval(iv); setTimeout(() => setStage("report"), 400); }
      setProgress(p);
    }, 180);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', -apple-system, sans-serif", padding: "1.5rem", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        {stage === "ready" && (
          <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
            <div style={{ display: "inline-block", padding: "3px 12px", background: C.process, borderRadius: "3px", marginBottom: "0.6rem" }}>
              <span style={{ fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff", fontWeight: 600 }}>AI Readiness Diagnostic</span>
            </div>
            <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.8rem", fontWeight: 400, color: C.dark, marginBottom: "0.4rem" }}>Carrington Cole Law Firm</h1>
            <p style={{ fontSize: "0.83rem", color: C.muted }}>15 Team Members {"\u00B7"} Smokeball + Archie AI {"\u00B7"} Family Law</p>
            <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "10px", padding: "1.1rem", textAlign: "left", maxWidth: "460px", margin: "1.3rem auto 1.8rem" }}>
              {[["Firm Size", "4 Attorneys, 11 Support Staff"], ["Platform", "Smokeball (Archie AI built-in)"], ["Practice Areas", "Divorce, Custody, Estate Planning"], ["Opportunity", "Powerful AI tools sitting untapped"]].map(([l, v], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "0.3rem 0", borderBottom: i < 3 ? `1px solid #f0eee9` : "none" }}>
                  <span style={{ fontSize: "0.76rem", color: C.muted }}>{l}</span>
                  <span style={{ fontSize: "0.76rem", color: i === 3 ? C.process : C.dark, fontWeight: 500, textAlign: "right", maxWidth: "260px" }}>{v}</span>
                </div>
              ))}
            </div>
            <button onClick={go} style={{ padding: "0.75rem 2rem", background: C.process, border: "none", borderRadius: "8px", color: "#fff", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer" }}>Generate Your Diagnostic {"\u2192"}</button>
          </div>
        )}

        {stage === "gen" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "5rem 1rem" }}>
            <div style={{ width: "260px", height: "4px", background: "#eae8e3", borderRadius: "2px", overflow: "hidden", marginBottom: "1rem" }}>
              <div style={{ width: `${progress}%`, height: "100%", background: C.process, transition: "width 0.2s" }} />
            </div>
            <p style={{ fontSize: "0.83rem", color: C.text }}>{msgs[Math.min(Math.floor(progress / 17), msgs.length - 1)]}...</p>
          </div>
        )}

        {stage === "report" && (
          <div style={{ animation: "fi 0.6s ease" }}>
            <style>{`@keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>

            <div style={{ marginBottom: "1.3rem" }}>
              <div style={{ display: "inline-block", padding: "3px 10px", background: C.process, borderRadius: "3px", marginBottom: "0.4rem" }}>
                <span style={{ fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff", fontWeight: 600 }}>AI Readiness Diagnostic</span>
              </div>
              <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.5rem", fontWeight: 400, color: C.dark }}>Carrington Cole Law Firm</h1>
              <p style={{ fontSize: "0.78rem", color: C.muted }}>15 Team Members {"\u00B7"} Smokeball + Archie AI {"\u00B7"} Family Law {"\u00B7"} March 2026</p>
            </div>

            <Section title="Your Firm at a Glance">
              <p style={{ fontSize: "0.82rem", color: C.text, lineHeight: 1.7 }}>
                Your firm is a 15-person family law practice with 4 attorneys and 11 support staff. You handle divorce, custody, child support, property division, and estate planning matters. You are on Smokeball with Archie AI built directly into your practice management platform.
              </p>
              <p style={{ fontSize: "0.82rem", color: C.text, lineHeight: 1.7, marginTop: "0.4rem" }}>
                <strong>The key insight:</strong> You are already paying for one of the most capable AI assistants in legal tech. Archie can draft documents, summarize files, build case timelines, and automate correspondence. The gap is not the tool. It is between what you have and what your team actually uses day to day.
              </p>
            </Section>

            <Section title="Your AI Readiness Scores">
              <CaveatNote>
                These preliminary scores are based on an initial conversation and publicly available information. A full diagnostic engagement would refine these scores based on team interviews, workflow audits, and a complete technology assessment.
              </CaveatNote>
              <div style={{ display: "flex", justifyContent: "center", gap: "0.8rem", flexWrap: "wrap", padding: "0.8rem 0" }}>
                <Gauge score={4} label="People" color={C.people} desc="No AI champion identified. Team comfort and adoption patterns unknown." />
                <Gauge score={3} label="Process" color={C.process} desc="Strong outcomes. SOPs and workflow documentation likely informal or missing." />
                <Gauge score={5} label="Data/Tech" color={C.data} desc="Smokeball + Archie in place. Feature utilization likely minimal. No AI policy." />
                <Gauge score={4} label="Overall" color={C.dark} desc="Strong foundation. Significant upside with structured adoption." />
              </div>
            </Section>

            <Section title="What We Found">
              <PillarGroup pillar="PEOPLE">
                <AccordionItem pillar="PEOPLE" title="No AI Usage Policy in Place" effort="Quick Win" defaultOpen={true}>
                  <p>Your team uses Smokeball daily, and Archie AI is one click away inside every matter. Without a clear usage policy, some staff may be avoiding it entirely out of caution while others may be using consumer AI tools like ChatGPT on sensitive client data without guardrails.</p>
                  <p style={{ marginTop: "0.4rem" }}>For a family law firm handling financial disclosures, custody evaluations, and sensitive personal information, this is real ethical exposure. An effective AI policy includes a three-tier data classification (Public, Confidential, Sensitive) with clear guidance on which tools are approved for each level.</p>
                </AccordionItem>
                <AccordionItem pillar="PEOPLE" title="Mixed Comfort Levels Are Expected" effort="Medium">
                  <p>In a 15-person firm, you will have people across the entire spectrum: attorneys skeptical about AI accuracy, paralegals curious but unsure where to start, and support staff who may fear being replaced.</p>
                  <p style={{ marginTop: "0.4rem" }}>At a comparable 20-person litigation firm we recently trained, a paralegal who initially resisted AI became the team's biggest advocate after seeing it reduce a half-day scheduling task to 20 minutes. Training must address the human side first and show real time savings on real workflows.</p>
                </AccordionItem>
                <AccordionItem pillar="PEOPLE" title="No Internal AI Champion Identified" effort="Quick Win">
                  <p>Every successful AI adoption we have seen has at least one internal champion: someone who maintains momentum after the consultant leaves. This person keeps the prompt library updated, answers quick questions, and models daily usage for the rest of the team.</p>
                  <p style={{ marginTop: "0.4rem" }}>Identifying and empowering this person early is one of the highest-leverage moves you can make. Often it is a tech-forward paralegal or office manager, not necessarily an attorney.</p>
                </AccordionItem>
              </PillarGroup>

              <PillarGroup pillar="PROCESS">
                <AccordionItem pillar="PROCESS" title="Archie's Prompt Library Is Likely Empty" effort="Quick Win" defaultOpen={true}>
                  <p>Smokeball ships with a small set of built-in prompts, but the real power is in your firm's custom Prompt Library. Most firms never build one. That means every time someone uses Archie, they start from scratch instead of pulling from a shared library of proven prompts tailored to your practice.</p>
                  <p style={{ marginTop: "0.4rem" }}>For family law, a well-built prompt library would include templates for drafting custody agreements, financial disclosure summaries, property division memos, client status updates, and discovery responses. This is the infrastructure that turns AI from a novelty into a daily workflow tool.</p>
                </AccordionItem>
                <AccordionItem pillar="PROCESS" title="SOPs Are Likely Informal or Undocumented" effort="Medium">
                  <p>Family law firms typically have consistent workflows for intake, divorce proceedings, custody modifications, and estate planning. But in most 15-person firms, these processes live in people's heads rather than in written SOPs.</p>
                  <p style={{ marginTop: "0.4rem" }}>This matters because Archie's Knowledge Sources feature lets you upload SOPs, checklists, and reference documents that the AI uses to generate more accurate, firm-specific outputs. Without documented SOPs, you cannot feed Archie the context it needs. Developing AI-ready SOPs is one of the stickiest and highest-value parts of an engagement.</p>
                </AccordionItem>
                <AccordionItem pillar="PROCESS" title="Document Drafting Is Likely Manual and Repetitive" effort="Quick Win">
                  <p>Custody agreements, financial affidavits, parenting plans, settlement proposals, and client correspondence are drafted repeatedly with similar structures. If your team writes these from scratch or copies from old matters and edits, there are hours of recoverable time every week.</p>
                  <p style={{ marginTop: "0.4rem" }}>Archie's document drafting and correspondence features, combined with a firm-specific prompt library, can generate accurate first drafts in minutes. The attorney still reviews and finalizes, but the starting point is dramatically better than a blank page.</p>
                </AccordionItem>
              </PillarGroup>

              <PillarGroup pillar="DATA/TECH">
                <AccordionItem pillar="DATA/TECH" title="Archie AI Features Sitting Dormant" effort="Quick Win" defaultOpen={true}>
                  <p>Smokeball's Archie includes document summarization, case chat, correspondence drafting, a prompt library, Knowledge Sources, document review, audio transcription, and a Word plugin for in-document AI assistance. Most firms we work with are using one or two of these features at best.</p>
                  <p style={{ marginTop: "0.4rem" }}>The gap is not a technology gap. It is a training and configuration gap. Activating these features properly and training your team on when and how to use each one is where the return on your existing Smokeball investment lives.</p>
                </AccordionItem>
                <AccordionItem pillar="DATA/TECH" title="Knowledge Sources Are Likely Not Configured" effort="Medium">
                  <p>Knowledge Sources is one of Archie's most powerful features. It allows you to upload firm-specific documents that Archie references when generating responses. Without it configured, Archie works with general legal knowledge instead of your firm's specific standards and procedures.</p>
                  <p style={{ marginTop: "0.4rem" }}>Configuring Knowledge Sources requires identifying which documents matter most, formatting them for AI readability, uploading them, and testing the outputs. This is implementation work that pays dividends on every single Archie interaction going forward.</p>
                </AccordionItem>
                <AccordionItem pillar="DATA/TECH" title="Matter Data Quality Drives AI Output Quality" effort="Medium">
                  <p>Archie's effectiveness depends entirely on what is in your Smokeball matters. If documents are not properly filed, matters are incomplete, or key files are missing, the AI outputs will reflect that.</p>
                  <p style={{ marginTop: "0.4rem" }}>Before any training engagement, we assess how consistently your team files documents and maintains matter records. This often reveals quick wins in data hygiene that immediately improve AI performance across the board.</p>
                </AccordionItem>
              </PillarGroup>
            </Section>

            <Section title="Your Technology Roadmap">
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "1rem" }}>
                <ToolItem type="keep" name="Smokeball" desc="Your practice management foundation. Already in place and well-adopted for case management." />
                <ToolItem type="activate" name="Archie AI (Full Suite)" desc="Document drafting, summarization, case chat, prompt library, Knowledge Sources, Word plugin, audio transcription" />
                <ToolItem type="activate" name="Knowledge Sources" desc="Upload your SOPs, checklists, and templates so Archie works with your firm's standards" />
                <ToolItem type="activate" name="Custom Prompt Library" desc="Build and share firm-specific prompt templates organized by matter type and role" />
                <ToolItem type="add" name="Zoom AI Companion" desc="Meeting summaries and action items that flow into Smokeball matter files" />
                <ToolItem type="consider" name="AI Legal Research" desc="Lexis+ AI or Fastcase/vLex for research validation alongside Archie's drafting" />
                <ToolItem type="consider" name="Intake Automation" desc="Lawmatics or Clio Grow for AI-powered lead scoring and client intake workflows" />
              </div>
            </Section>

            <Section title="Your 60-Day Roadmap">
              <PhaseBlock num="1" title="Foundation (Days 1-20)" groups={[
                { pillar: "PEOPLE", items: ["Draft and implement your AI usage policy with attorney input", "Identify your internal AI champion"] },
                { pillar: "PROCESS", items: ["Audit existing SOPs and identify the top 5 workflows to document for AI readiness", "Select 2 active matters as sandbox environments for AI workflow testing"] },
                { pillar: "DATA/TECH", items: ["Full Archie feature audit: what is active, what is dormant, what is misconfigured", "Upload first round of Knowledge Sources"] },
              ]} />
              <PhaseBlock num="2" title="Training and Integration (Days 21-40)" groups={[
                { pillar: "PEOPLE", items: ["Deliver role-based training: attorneys, paralegals, and support staff each get workflows relevant to their daily work", "Address resistance directly with hands-on exercises using real firm matters"] },
                { pillar: "PROCESS", items: ["Build your firm-specific prompt library: custody agreements, financial disclosures, discovery, correspondence", "Run pilot matters through the full AI-assisted workflow end to end"] },
                { pillar: "DATA/TECH", items: ["Activate and train on all Archie features including the Word plugin and audio transcription", "Configure Zoom AI Companion integration if applicable"] },
              ]} />
              <PhaseBlock num="3" title="Scale and Measure (Days 41-60)" groups={[
                { pillar: "PEOPLE", items: ["Survey adoption rates and address any remaining holdouts", "Empower your AI champion with ongoing responsibilities"] },
                { pillar: "PROCESS", items: ["Scale AI workflows from pilot matters to all active cases", "Conduct 60-day review: time saved per task, throughput changes, team satisfaction"] },
                { pillar: "DATA/TECH", items: ["Expand Knowledge Sources with additional SOPs and reference documents", "Evaluate Phase 2 tools based on firm needs"] },
              ]} />
            </Section>

            {/* ═══ CASE STUDY ═══ */}
            <Section title="What This Looks Like in Practice">
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "1.1rem" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 600, color: C.process, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Recent Engagement</p>
                <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.05rem", color: C.dark, marginBottom: "0.5rem" }}>20-Person Litigation Firm Using Smokeball</h3>
                <p style={{ fontSize: "0.8rem", color: C.text, lineHeight: 1.7, marginBottom: "0.6rem" }}>
                  A 20-person litigation firm came to us with powerful AI tools already built into their practice management system. Like most firms, they had barely scratched the surface. Their team had access to Archie but was not using the prompt library, had no Knowledge Sources configured, and had no AI usage policy in place.
                </p>
                <p style={{ fontSize: "0.8rem", color: C.text, lineHeight: 1.7, marginBottom: "0.8rem" }}>
                  We delivered a full-day, hands-on training built around their actual matters, their real documents, and their configured tools. Every exercise used their cases, not generic examples. The results speak for themselves:
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", background: C.processBg, borderRadius: "8px", padding: "0.8rem 0.4rem", marginBottom: "0.8rem" }}>
                  <CaseStudyCard stat="15/15" label="Positive evaluations from participants" color={C.process} />
                  <CaseStudyCard stat="20 min" label="What used to take half a day" color={C.data} />
                  <CaseStudyCard stat="Day 1" label="Team using AI daily from the start" color={C.people} />
                </div>
                <div style={{ background: "#faf9f5", borderRadius: "6px", padding: "0.8rem 1rem", borderLeft: `3px solid ${C.process}` }}>
                  <p style={{ fontSize: "0.82rem", color: C.text, lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>
                    "This training exceeded our expectations and has already created a real sense of energy and momentum in the office."
                  </p>
                  <p style={{ fontSize: "0.72rem", color: C.muted, marginTop: "0.3rem", margin: "0.3rem 0 0 0" }}>Managing Partner</p>
                </div>
                <p style={{ fontSize: "0.8rem", color: C.text, lineHeight: 1.7, marginTop: "0.8rem" }}>
                  The difference was not the technology. It was the approach: understanding their team dynamics, building exercises around their actual work, configuring their tools properly, and giving every person multiple pathways to the same outcome so they could find their comfort level. That is the same approach we bring to every engagement.
                </p>
              </div>
            </Section>

            {/* ═══ VALUE + INVESTMENT ═══ */}
            <Section title="The Value of Getting This Right">
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "1.1rem" }}>
                <p style={{ fontSize: "0.8rem", color: C.text, lineHeight: 1.7, marginBottom: "0.5rem" }}>
                  The legal industry is shifting. Clients are beginning to recognize that their attorneys have AI at their disposal. The firms that get ahead of this will set the terms. The firms that wait will be playing catch-up.
                </p>
                <p style={{ fontSize: "0.8rem", color: C.text, lineHeight: 1.7, marginBottom: "1rem" }}>
                  For a family law firm, the value is not just about saving hours. It is about serving more clients without burning out your team, delivering faster resolutions, reducing the emotional toll of repetitive administrative work, and building the kind of practice that attracts both talent and referrals.
                </p>

                <p style={{ fontSize: "0.68rem", fontWeight: 600, color: C.process, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Where You Recover Time</p>
                <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                  <ROICard label="Custody Agreements" value="2-3 hrs each" color={C.process} desc="First drafts generated in minutes instead of hours of manual drafting" />
                  <ROICard label="Financial Disclosures" value="1-2 hrs each" color={C.process} desc="Summarization and review of financial documents accelerated significantly" />
                  <ROICard label="Client Correspondence" value="30-60 min/day" color={C.data} desc="Status updates, letters, and emails drafted from templates in your prompt library" />
                </div>

                <p style={{ fontSize: "0.68rem", fontWeight: 600, color: C.people, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Where You Gain the Edge</p>
                <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                  <ROICard label="Case Throughput" value="More families served" color={C.people} desc="Handle additional matters with your existing team without adding headcount" />
                  <ROICard label="Team Retention" value="Less burnout" color={C.people} desc="Reduce the repetitive administrative burden that drives good people out of law firms" />
                  <ROICard label="Client Experience" value="Faster resolutions" color={C.data} desc="Quicker turnaround on drafts, filings, and communications builds trust and referrals" />
                </div>

                <p style={{ fontSize: "0.68rem", fontWeight: 600, color: C.dark, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Your Next Step</p>
                <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: "200px", padding: "0.7rem", background: C.processBg, borderRadius: "6px", textAlign: "center" }}>
                    <p style={{ fontSize: "0.65rem", color: C.muted }}>Start Here</p>
                    <p style={{ fontSize: "1.2rem", fontWeight: 700, color: C.process, fontFamily: "'Instrument Serif'" }}>$1,500</p>
                    <p style={{ fontSize: "0.68rem", color: C.text, fontWeight: 500 }}>Full AI Readiness Diagnostic</p>
                    <p style={{ fontSize: "0.6rem", color: C.muted, lineHeight: 1.4, marginTop: "4px" }}>Discovery call, team assessment, technology audit, and detailed interactive report with scored findings and recommendations</p>
                  </div>
                  <div style={{ flex: 1, minWidth: "200px", padding: "0.7rem", background: C.dataBg, borderRadius: "6px", textAlign: "center" }}>
                    <p style={{ fontSize: "0.65rem", color: C.muted }}>Full Engagement</p>
                    <p style={{ fontSize: "1.2rem", fontWeight: 700, color: C.data, fontFamily: "'Instrument Serif'" }}>$7K {"\u2013"} $12K</p>
                    <p style={{ fontSize: "0.68rem", color: C.text, fontWeight: 500 }}>Implement + Train (60 days)</p>
                    <p style={{ fontSize: "0.6rem", color: C.muted, lineHeight: 1.4, marginTop: "4px" }}>Configuration, SOP development, prompt library build, hands-on training, and post-training support</p>
                  </div>
                  <div style={{ flex: 1, minWidth: "200px", padding: "0.7rem", background: C.peopleBg, borderRadius: "6px", textAlign: "center" }}>
                    <p style={{ fontSize: "0.65rem", color: C.muted }}>What You Get Back</p>
                    <p style={{ fontSize: "1.2rem", fontWeight: 700, color: C.people, fontFamily: "'Instrument Serif'" }}>20+ hrs/week</p>
                    <p style={{ fontSize: "0.68rem", color: C.text, fontWeight: 500 }}>Time recovered across your team</p>
                    <p style={{ fontSize: "0.6rem", color: C.muted, lineHeight: 1.4, marginTop: "4px" }}>Reinvest in more clients, better work-life balance, or both</p>
                  </div>
                </div>
              </div>
            </Section>

            <Section title="How We Work Together">
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "1.1rem" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 600, color: C.process, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Recommended Path</p>
                <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.15rem", color: C.dark, marginBottom: "0.7rem" }}>Discover {"\u2192"} Implement {"\u2192"} Train</h3>
                {[
                  ["Step 1", "Discovery Call (Free)", "30-minute conversation to understand your firm, your team, and your goals"],
                  ["Step 2", "AI Readiness Diagnostic ($1,500)", "Full assessment across People, Process, and Technology with a scored report and roadmap"],
                  ["Step 3", "Implementation + Training", "Configure your tools, build your prompt library and Knowledge Sources, deliver hands-on training with your real matters"],
                  ["Ongoing", "Advisory Support (Optional)", "Monthly check-ins, prompt library updates, new feature training, and adoption monitoring"],
                ].map(([time, title, desc], i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", padding: "0.45rem 0", borderBottom: i < 3 ? `1px solid #f0eee9` : "none" }}>
                    <span style={{ fontSize: "0.68rem", fontWeight: 600, color: C.process, minWidth: "65px", flexShrink: 0 }}>{time}</span>
                    <div><p style={{ fontSize: "0.8rem", fontWeight: 600, color: C.dark }}>{title}</p><p style={{ fontSize: "0.72rem", color: C.muted }}>{desc}</p></div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Ready to See What Your Firm's Diagnostic Looks Like?">
              <div style={{ background: C.processBg, borderRadius: "8px", padding: "1.2rem", textAlign: "center" }}>
                <p style={{ fontSize: "0.85rem", color: C.text, lineHeight: 1.7, marginBottom: "0.8rem" }}>
                  This is a sample report. Your firm's diagnostic would be built around your specific team, your workflows, your Smokeball configuration, and your practice areas. It starts with a free 30-minute discovery call.
                </p>
                <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}>
                  <a href="https://calendly.com/amy-adams/discovery" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "0.7rem 1.5rem", background: C.process, borderRadius: "8px", color: "#fff", fontSize: "0.82rem", fontWeight: 500, textDecoration: "none", cursor: "pointer" }}>Book a Discovery Call</a>
                  <a href="https://gaiaallies.com/aiready" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "0.7rem 1.5rem", background: "#fff", border: `1px solid ${C.process}`, borderRadius: "8px", color: C.process, fontSize: "0.82rem", fontWeight: 500, textDecoration: "none", cursor: "pointer" }}>Visit gaiaallies.com/aiready</a>
                </div>
              </div>
            </Section>

            <div style={{ marginTop: "2rem", paddingTop: "0.8rem", borderTop: `2px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.6rem" }}>
              <div>
                <p style={{ fontSize: "0.75rem", color: C.process, fontWeight: 500 }}>Gaia Allies {"\u00B7"} AI Strategy & Training for Law Firms</p>
                <p style={{ fontSize: "0.65rem", color: C.light }}>amy@gaiaallies.com {"\u00B7"} gaiaallies.com/aiready</p>
              </div>
              <button onClick={() => { setStage("ready"); setProgress(0); }} style={{ padding: "0.4rem 1rem", background: C.process, border: "none", borderRadius: "6px", color: "#fff", fontSize: "0.72rem", cursor: "pointer" }}>Reset Demo</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
