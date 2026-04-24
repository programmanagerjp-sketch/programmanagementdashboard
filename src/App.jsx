import React, { useMemo, useState } from "react";
import {
  Sparkles, AlertTriangle, CheckCircle2, Clock,
  FileText, GitBranch, ShieldCheck
} from "lucide-react";

const jiraStories = [
  { id:"BSC-AI-101", title:"Create AI-readable program intake template", team:"TPM Ops", owner:"Jatin", status:"Done", dueDate:"2026-05-03", risk:"Low", dependency:"None" },
  { id:"BSC-AI-112", title:"Connect Jira sprint data to weekly rollup workflow", team:"Data Engineering", owner:"Ravi", status:"In Progress", dueDate:"2026-05-08", risk:"Medium", dependency:"Jira API approval" },
  { id:"BSC-AI-118", title:"Build dependency aging dashboard", team:"Platform Engineering", owner:"Maya", status:"Blocked", dueDate:"2026-05-06", risk:"High", dependency:"Planview export format" },
  { id:"BSC-AI-124", title:"Create PHI redaction check before LLM summarization", team:"Security / Compliance", owner:"Nina", status:"In Progress", dueDate:"2026-05-10", risk:"High", dependency:"Security architecture review" },
  { id:"BSC-AI-131", title:"Generate executive update from Jira + RAID + notes", team:"AI Enablement", owner:"Arjun", status:"In Progress", dueDate:"2026-05-09", risk:"Medium", dependency:"Prompt approval" }
];

const raidItems = [
  { type:"Risk", item:"Planview export format changed, causing milestone mapping gaps", owner:"Maya", severity:"High", ageDays:16, mitigation:"Create translation layer and validate with PMO" },
  { type:"Dependency", item:"Jira API access approval pending", owner:"Ravi", severity:"Medium", ageDays:8, mitigation:"Escalate through platform governance" },
  { type:"Issue", item:"Security requires PHI redaction proof before pilot expansion", owner:"Nina", severity:"High", ageDays:5, mitigation:"Run redaction test cases and document controls" },
  { type:"Decision", item:"Build lightweight workflow internally vs buy platform", owner:"Jatin", severity:"Medium", ageDays:10, mitigation:"Compare cost, speed, security, integration complexity" }
];

const meetingNotes = `Weekly AI PM Operating Rhythm - Q2 Sprint 3

Data Engineering confirmed Jira data extraction is working in lower environment, but production access is pending. Platform team is blocked because Planview milestone exports changed column names. Security asked for a PHI redaction proof before broader rollout. TPM Ops completed the standardized intake template. Leadership wants a concise executive update by Friday.`;

function App() {
  const [tab, setTab] = useState("layers");

  const done = jiraStories.filter((x) => x.status === "Done").length;
  const inProgress = jiraStories.filter((x) => x.status === "In Progress").length;
  const blocked = jiraStories.filter((x) => x.status === "Blocked").length;

  const riskDigest = useMemo(
    () =>
      raidItems
        .filter((r) => r.severity === "High" || r.ageDays > 7)
        .map((r) => ({
          ...r,
          signal: r.ageDays > 14 ? "Aging risk: escalate this week" : "Review mitigation",
        })),
    []
  );

  return (
    <div className="page">
      <header className="hero">
        <div className="badge"><Sparkles size={16} /> AI-native TPM prototype</div>
        <h1>AI-Powered Program Operating System</h1>
        <p>
          A real-life BSC-style TPM system that turns Jira, RAID logs, meeting notes,
          and team context into status rollups, risk digests, executive updates, and AI-readable documentation.
        </p>
      </header>

      <section className="metrics">
        <Metric icon={<CheckCircle2 />} label="Done" value={done} />
        <Metric icon={<Clock />} label="In Progress" value={inProgress} />
        <Metric icon={<AlertTriangle />} label="Blocked" value={blocked} />
        <Metric icon={<GitBranch />} label="Open RAID" value={raidItems.length} />
      </section>

      <nav className="tabs">
        {["layers", "agents", "status", "risks", "exec", "brain", "data"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={tab === t ? "active" : ""}>
            {t.toUpperCase()}
          </button>
        ))}
      </nav>

      {tab === "layers" && <Layers />}
      {tab === "agents" && <Agents />}
      {tab === "status" && <Status done={done} inProgress={inProgress} blocked={blocked} />}
      {tab === "risks" && <Risks riskDigest={riskDigest} />}
      {tab === "exec" && <Exec />}
      {tab === "brain" && <Brain />}
      {tab === "data" && <Data />}
    </div>
  );
}

function Layers() {
  const layers = [
    ["Source Systems", ["Jira stories", "Planview milestones", "RAID logs", "Meeting notes", "Docs"]],
    ["Ingestion + Normalization", ["Extract fields", "Clean status", "Map owners", "Standardize dates", "Tag dependencies"]],
    ["Team Brain", ["Program charter", "Decision rules", "Operating cadence", "Architecture context"]],
    ["AI Agent Layer", ["Status agent", "Risk agent", "Meeting agent", "Exec agent", "Knowledge agent"]],
    ["Human Review + Publishing", ["TPM approval", "Security review", "Exec update", "Slack digest"]],
  ];

  return <Card title="System Architecture Layers" icon={<GitBranch />}>
    <div className="grid5">
      {layers.map(([title, items], i) => (
        <div className="layer" key={title}>
          <div className="num">{i + 1}</div>
          <h3>{title}</h3>
          {items.map((x) => <p key={x}>• {x}</p>)}
        </div>
      ))}
    </div>
    <div className="flow">
      Jira / Planview / Notes -&gt; Normalize -&gt; Team Brain -&gt; AI Agents -&gt; Guardrails -&gt; TPM Review -&gt; Publish
    </div>
  </Card>;
}

function Agents() {
  const agents = [
    ["Status Rollup Agent", "Jira, milestones, RAID", "Summarizes progress and blockers", "Weekly status report", "TPM reviews before publishing"],
    ["Meeting Intelligence Agent", "Meeting transcript/notes", "Extracts decisions and action items", "Action tracker and decision log", "Human confirms owners"],
    ["Risk & Dependency Agent", "RAID, blockers, dependency age", "Flags stale risks and escalation candidates", "Risk digest", "TPM decides escalation"],
    ["Executive Update Agent", "Status, risks, KPIs", "Creates decision-oriented exec narrative", "1-page update", "No PHI; TPM validates"],
    ["Team Brain Agent", "Charter, rules, glossary", "Retrieves program context", "Context-aware answers", "Approved knowledge only"],
    ["Governance Guardrail Agent", "Generated outputs + policy rules", "Checks sensitive data or decision overreach", "Allow / revise / block", "Blocks PHI/security auto-actions"],
  ];

  return <Card title="AI Agents and Responsibilities" icon={<Sparkles />}>
    <div className="grid2">
      {agents.map((a) => (
        <div className="agent" key={a[0]}>
          <h3>{a[0]}</h3>
          <p><b>Input:</b> {a[1]}</p>
          <p><b>Logic:</b> {a[2]}</p>
          <p><b>Output:</b> {a[3]}</p>
          <p className="guard"><b>Guardrail:</b> {a[4]}</p>
        </div>
      ))}
    </div>
  </Card>;
}

function Status({ done, inProgress, blocked }) {
  return <Card title="AI-Generated Weekly Status" icon={<FileText />}>
    <div className="summary">
      Q2 Sprint 3 is progressing with {done} completed item, {inProgress} in progress, and {blocked} blocked workstream.
    </div>
    <ul>
      <li>TPM Ops completed AI-readable intake template.</li>
      <li>AI Enablement and Data Engineering are progressing on automated rollups.</li>
      <li>High-severity risks remain around Planview mapping and PHI redaction controls.</li>
      <li>Leadership decision needed: internal build vs external PM intelligence tooling.</li>
    </ul>
  </Card>;
}

function Risks({ riskDigest }) {
  return <Card title="Risk & Dependency Agent" icon={<AlertTriangle />}>
    <div className="grid2">
      {riskDigest.map((r) => (
        <div className="risk" key={r.item}>
          <span className={r.severity === "High" ? "pill danger" : "pill"}>{r.severity}</span>
          <h3>{r.type}: {r.item}</h3>
          <p><b>Owner:</b> {r.owner}</p>
          <p><b>Age:</b> {r.ageDays} days</p>
          <p><b>AI Signal:</b> {r.signal}</p>
          <p><b>Mitigation:</b> {r.mitigation}</p>
        </div>
      ))}
    </div>
  </Card>;
}

function Exec() {
  return <Card title="Executive Update Generator" icon={<Sparkles />}>
    <h3>Executive Update: AI-Native TPM Operating System Pilot</h3>
    <p>
      The pilot is on track to reduce manual reporting effort and improve delivery visibility,
      but two control-plane risks need attention before broader rollout.
    </p>
    <h4>Leadership asks</h4>
    <ul>
      <li>Approve security review path for PHI redaction and human-in-the-loop governance.</li>
      <li>Confirm internal build vs external tooling evaluation.</li>
      <li>Escalate Planview export standardization with PMO data owner.</li>
    </ul>
    <div className="guard">
      Expected impact: 40% reduction in manual status reporting, faster risk detection,
      and more consistent executive updates.
    </div>
  </Card>;
}

function Brain() {
  return <Card title="Team Brain / AI-Readable Program Context" icon={<ShieldCheck />}>
    <div className="grid3">
      <BrainItem title="Program Charter" text="AI-native TPM operating system for cloud, data, and compliance programs" code="goal: reduce manual PM reporting; systems: Jira, Planview, Docs; guardrails: PHI redaction" />
      <BrainItem title="Decision Rule" text="AI can draft and summarize, but cannot approve compliance, funding, or security decisions" code="ai_allowed: draft, summarize, classify; ai_blocked: approve, expose PHI" />
      <BrainItem title="Operating Cadence" text="Weekly status rollup, risk review, and executive update" code="cadence: weekly; rituals: status_rollup, risk_review, exec_update" />
    </div>
  </Card>;
}

function Data() {
  return <Card title="Sample Data" icon={<FileText />}>
    <h3>Jira Stories</h3>
    <table>
      <thead><tr><th>ID</th><th>Team</th><th>Status</th><th>Risk</th></tr></thead>
      <tbody>
        {jiraStories.map((s) => <tr key={s.id}><td>{s.id}</td><td>{s.team}</td><td>{s.status}</td><td>{s.risk}</td></tr>)}
      </tbody>
    </table>
    <h3>Meeting Notes Input</h3>
    <pre>{meetingNotes}</pre>
  </Card>;
}

function Metric({ icon, label, value }) {
  return <div className="metric">{icon}<div><h2>{value}</h2><p>{label}</p></div></div>;
}

function Card({ title, icon, children }) {
  return <section className="card"><h2>{icon} {title}</h2>{children}</section>;
}

function BrainItem({ title, text, code }) {
  return <div className="brain"><h3>{title}</h3><p>{text}</p><pre>{code}</pre></div>;
}

export default App;
