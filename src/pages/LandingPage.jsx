import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout, Row, Col, Button, Card, Typography,
  Steps, Tag, Divider, Space, Badge,
} from "antd";
import {
  AuditOutlined, FileProtectOutlined, BellOutlined,
  FolderOpenOutlined, GlobalOutlined, SearchOutlined,
  IdcardOutlined, BarChartOutlined, LockOutlined,
  ArrowRightOutlined, CheckCircleFilled, SafetyOutlined,
  EyeOutlined, FileTextOutlined, UserOutlined,
  FilterOutlined, AlertOutlined, ControlOutlined,
  UploadOutlined, FilePdfOutlined, SolutionOutlined,
  ApartmentOutlined, DatabaseOutlined, ToolOutlined,
  PaperClipOutlined, PlayCircleOutlined
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const BRAND = "#1677ff";
const BG = "#f5f7fa";
const DARK = "#0a1628";

const FOUNDER_EMAIL = "kunalbhandare104@gmail.com";
const CALENDLY_LINK = "https://calendly.com/kunalbhandare104/30min";
const CALENDLY_URL  = CALENDLY_LINK; // used by native widget

const containerStyle = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "0 32px",
};

const sectionStyle = { padding: "88px 0", background: BG };
const sectionAltStyle = { padding: "88px 0", background: "#eef2f9" };

const globalStyles = `
  *, body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }

  .feature-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
  .feature-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(22,119,255,0.12), 0 2px 8px rgba(0,0,0,0.05) !important;
    border-color: #1677ff !important;
  }
  .feature-card:hover .icon-wrap {
    background: #1677ff !important;
  }
  .feature-card:hover .icon-wrap svg { color: #fff !important; }

  .pricing-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
  .pricing-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 60px rgba(22,119,255,0.18) !important;
  }

  .screenshot-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
  .screenshot-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 48px rgba(22,119,255,0.12) !important;
    border-color: #1677ff !important;
  }

  .nav-link {
    color: #4a5568; font-size: 14px; font-weight: 500;
    cursor: pointer; text-decoration: none;
    transition: color 0.2s ease;
  }
  .nav-link:hover { color: #1677ff; }

  .ant-btn-primary {
    transition: all 0.2s ease !important;
  }
  .ant-btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(22,119,255,0.4) !important;
  }

  .dash-bar { transition: opacity 0.2s, transform 0.2s; }
  .dash-bar:hover { opacity: 1 !important; transform: scaleY(1.05); }

  .check-icon { transition: transform 0.2s ease; }
  .pricing-card:hover .check-icon { transform: scale(1.1); }

  .video-card {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .video-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 48px rgba(22,119,255,0.15) !important;
  }

  .video-frame {
    aspect-ratio: 16 / 9;
    width: 100%;
    border: none;
    border-radius: 14px;
  }
`;

// ── DASHBOARD PREVIEW ──────────────────────────────────────────
const DashboardPreview = React.memo(() => (
  <div
    style={{
      background: "linear-gradient(160deg, #071829 0%, #0a1f3d 100%)",
      borderRadius: 16,
      padding: 24,
      border: "1px solid #1e3a5f",
      boxShadow: "0 32px 80px rgba(0,0,0,0.45)",
    }}
  >
    {/* Title bar */}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
      <div style={{ display: "flex", gap: 6 }}>
        <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e" }} />
        <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840" }} />
      </div>
      <Text style={{ color: "#8899aa", fontSize: 12 }}>Complyra — AML Dashboard</Text>
      <Badge status="processing" text={<span style={{ color: "#52c41a", fontSize: 12 }}>Live</span>} />
    </div>

    {/* Stats row */}
    <Row gutter={10} style={{ marginBottom: 14 }}>
      {[
        { label: "Alerts", value: "1,247", color: "#ff4d4f" },
        { label: "Cases", value: "384", color: "#faad14" },
        { label: "STR Filed", value: "62", color: "#1677ff" },
        { label: "High Risk", value: "218", color: "#ff7a45" },
      ].map((s) => (
        <Col span={6} key={s.label}>
          <div style={{ background: "#0d2137", borderRadius: 8, padding: "10px 12px", border: "1px solid #1e3a5f" }}>
            <Text style={{ color: "#6a85a3", fontSize: 10, display: "block", textTransform: "uppercase", letterSpacing: 0.4 }}>{s.label}</Text>
            <Text style={{ color: s.color, fontSize: 20, fontWeight: 800 }}>{s.value}</Text>
          </div>
        </Col>
      ))}
    </Row>

    {/* Bar chart */}
    <div style={{ background: "#0d2137", borderRadius: 8, border: "1px solid #1e3a5f", padding: 14, marginBottom: 12 }}>
      <Text style={{ color: "#8899aa", fontSize: 12 }}>Transaction Volume — Last 30 Days</Text>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginTop: 10, height: 56 }}>
        {[35, 55, 40, 70, 50, 85, 60, 90, 45, 75, 65, 95].map((h, i) => (
          <div
            key={i}
            className="dash-bar"
            style={{
              flex: 1,
              height: `${h}%`,
              background: i % 4 === 0 ? "linear-gradient(to top, #ff4d4f, #ff7a7a)" : "linear-gradient(to top, #1677ff, #69b1ff)",
              borderRadius: "3px 3px 0 0",
              opacity: 0.65,
            }}
          />
        ))}
      </div>
    </div>

    {/* Transaction rows */}
    {[
      { id: "TXN-9821", cust: "Arjun Capital Ltd", amt: "₹48,00,000", risk: "HIGH", status: "Alert" },
      { id: "TXN-9820", cust: "Priya Finserv Pvt", amt: "₹12,50,000", risk: "MED", status: "Review" },
      { id: "TXN-9819", cust: "Suresh Enterprises", amt: "₹5,20,000", risk: "LOW", status: "Clear" },
    ].map((row) => (
      <div
        key={row.id}
        style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "#0d2137", borderRadius: 5, padding: "7px 10px",
          marginBottom: 5, border: "1px solid #1e3a5f",
        }}
      >
        <Text style={{ color: "#4096ff", fontSize: 11, width: 78 }}>{row.id}</Text>
        <Text style={{ color: "#c0cee0", fontSize: 11, flex: 1 }}>{row.cust}</Text>
        <Text style={{ color: "#e0e8f0", fontSize: 11, width: 88, textAlign: "right" }}>{row.amt}</Text>
        <Tag color={row.risk === "HIGH" ? "volcano" : row.risk === "MED" ? "orange" : "success"} style={{ fontSize: 10, marginLeft: 8 }}>{row.risk}</Tag>
        <Tag color={row.status === "Alert" ? "red" : row.status === "Review" ? "orange" : "green"} style={{ fontSize: 10 }}>{row.status}</Tag>
      </div>
    ))}
  </div>
));

// ── PRODUCT SCREENSHOTS ────────────────────────────────────────
const screenshots = Object.freeze([
  {
      title: "Transaction Monitoring",
      desc: "Upload transaction data from CSV and automatically detect suspicious activity using configurable AML thresholds.",
      icon: <BarChartOutlined style={{ color: BRAND }} />,
      content: (
        <div>
          <Row gutter={10} style={{ marginBottom: 12 }}>
            {[["Total Volume", "₹12.4Cr"], ["All Transactions", "1,247"], ["Flagged", "891"], ["STR Submitted", "356"]].map(([l, v], i) => (
              <Col span={6} key={i}>
                <div style={{ background: "#f0f5ff", borderRadius: 6, padding: "10px 8px", textAlign: "center" }}>
                  <Text style={{ fontSize: 11, color: "#666", display: "block" }}>{l}</Text>
                  <Text style={{ fontWeight: 700, color: DARK, fontSize: 15 }}>{v}</Text>
                </div>
              </Col>
            ))}
          </Row>
          <div style={{ background: "#f9fafb", borderRadius: 8, padding: 12, border: "1px solid #e8ecf4" }}>
            {[["TXN-9821", "Arjun Capital", "₹48L", "volcano", "Alert"], ["TXN-9820", "Priya Finserv", "₹12.5L", "orange", "Review"], ["TXN-9819", "Suresh Ent.", "₹5.2L", "success", "Clear"]].map(([id, cust, amt, tc, st]) => (
              <div key={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: id !== "TXN-9819" ? "1px solid #eef2f7" : "none" }}>
                <Text style={{ fontSize: 12, color: BRAND, width: 76 }}>{id}</Text>
                <Text style={{ fontSize: 12, color: "#334", flex: 1 }}>{cust}</Text>
                <Text style={{ fontSize: 12, color: "#334" }}>{amt}</Text>
                <Tag color={tc} style={{ fontSize: 10 }}>{st}</Tag>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  {
      title: "Alert Investigation",
      icon: <BellOutlined style={{ color: "#ff4d4f" }} />,
      content: (
        <div>
          {[
            { id: "ALT-0042", desc: "Structuring pattern detected across 5 linked transactions", sev: "Critical", color: "red" },
            { id: "ALT-0041", desc: "Unusual cash deposit — ₹2.1Cr in single transaction", sev: "High", color: "volcano" },
            { id: "ALT-0040", desc: "Rapid succession transactions below reporting threshold", sev: "Medium", color: "orange" },
          ].map((a) => (
            <div key={a.id} style={{ background: "#fff8f8", borderRadius: 8, padding: 12, marginBottom: 10, border: "1px solid #ffe0e0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <Text style={{ fontWeight: 600, fontSize: 13, color: DARK }}>{a.id}</Text>
                <Tag color={a.color}>{a.sev}</Tag>
              </div>
              <Text style={{ fontSize: 12, color: "#666" }}>{a.desc}</Text>
              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <Button size="small" type="primary" style={{ fontSize: 11 }}>Convert to Case</Button>
                <Button size="small" style={{ fontSize: 11 }}>Dismiss</Button>
              </div>
            </div>
          ))}
        </div>
      ),
    },

  {
      title: "Customer Management",
      desc: "Manage customer profiles, correct data quality issues, and review transaction history before STR filing.",
      icon: <UserOutlined style={{ color: "#722ed1" }} />,
      content: (
        <div>
          <div style={{ background: "#f9f0ff", border: "1px solid #d3adf7", borderRadius: 8, padding: 12, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ color: "#531dab", fontWeight: 600, fontSize: 13 }}>Customer Repository</Text>
              <Tag color="volcano" style={{ fontSize: 10 }}>2 Data Issues</Tag>
            </div>
            <Text style={{ display: "block", color: "#666", fontSize: 12, marginTop: 4 }}>
              Missing PAN · Invalid gender field · STR blocked until resolved
            </Text>
          </div>
          {[
            { name: "Rajesh Mehta", id: "CUST-0041", pan: "ABCPM1234D", risk: "HIGH", color: "#ff4d4f", issue: null },
            { name: "Priya Finserv Pvt", id: "CUST-0040", pan: "—", risk: "MED", color: "#faad14", issue: "PAN Missing" },
            { name: "Suresh Enterprises", id: "CUST-0039", pan: "XYZSE5678F", risk: "LOW", color: "#52c41a", issue: null },
          ].map((c) => (
            <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: c.issue ? "#fffbe6" : "#f9fafb", borderRadius: 6, marginBottom: 6, border: `1px solid ${c.issue ? "#ffe58f" : "#e8ecf4"}` }}>
              <div>
                <Text style={{ fontSize: 12, fontWeight: 600, color: DARK, display: "block" }}>{c.name}</Text>
                <Text style={{ fontSize: 11, color: "#888" }}>{c.id} · PAN: {c.pan}</Text>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {c.issue && <Tag color="warning" style={{ fontSize: 10 }}>{c.issue}</Tag>}
                <Tag color={c.risk === "HIGH" ? "volcano" : c.risk === "MED" ? "orange" : "success"} style={{ fontSize: 10 }}>{c.risk}</Tag>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Explainable Risk Scoring",
      desc: "Understand exactly why a customer was flagged — rules triggered, thresholds breached, and risk indicators surfaced.",
      icon: <BarChartOutlined style={{ color: "#fa8c16" }} />,
      content: (
        <div>
          <div style={{ background: "#fff7e6", border: "1px solid #ffd591", borderRadius: 8, padding: 12, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <Text style={{ fontWeight: 700, color: "#d46b08", fontSize: 13 }}>Rajesh Mehta — Risk Score: 87 / 100</Text>
              <Tag color="volcano">HIGH RISK</Tag>
            </div>
            <div style={{ background: "#fff", borderRadius: 6, height: 10, border: "1px solid #ffe0a0", overflow: "hidden" }}>
              <div style={{ width: "87%", height: "100%", background: "linear-gradient(90deg, #faad14, #ff4d4f)", borderRadius: 6 }} />
            </div>
          </div>
          <Text style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 8 }}>Rules Triggered</Text>
          {[
            { rule: "Cash Threshold Breach", detail: "₹48L single transaction — limit ₹10L", color: "#ff4d4f", bg: "#fff1f0", border: "#ffa39e" },
            { rule: "Structuring Pattern", detail: "5 transactions just below ₹10L in 48hrs", color: "#fa8c16", bg: "#fff7e6", border: "#ffd591" },
            { rule: "High Frequency Activity", detail: "23 transactions in 7 days — threshold: 10", color: "#faad14", bg: "#fffbe6", border: "#ffe58f" },
          ].map((r) => (
            <div key={r.rule} style={{ display: "flex", alignItems: "flex-start", gap: 10, background: r.bg, borderRadius: 6, padding: "8px 10px", marginBottom: 6, border: `1px solid ${r.border}` }}>
              <AlertOutlined style={{ color: r.color, marginTop: 2, fontSize: 13 }} />
              <div>
                <Text style={{ fontSize: 12, fontWeight: 600, color: DARK, display: "block" }}>{r.rule}</Text>
                <Text style={{ fontSize: 11, color: "#888" }}>{r.detail}</Text>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  {
      title: "Case Management",
      desc: "Review alerts, collect evidence, document findings, and prepare cases for compliance review.",
      icon: <FolderOpenOutlined style={{ color: "#faad14" }} />,
      content: (
        <div>
          <Row gutter={10} style={{ marginBottom: 12 }}>
            {[{ l: "New", v: "84", c: "#1677ff" }, { l: "In Review", v: "31", c: "#faad14" }, { l: "Escalated", v: "12", c: "#ff4d4f" }, { l: "STR Filed", v: "62", c: "#52c41a" }].map((s) => (
              <Col span={6} key={s.l}>
                <div style={{ textAlign: "center", padding: 10, background: "#f9fafb", borderRadius: 8, border: "1px solid #eef2f7" }}>
                  <Text style={{ fontSize: 18, fontWeight: 700, color: s.c, display: "block" }}>{s.v}</Text>
                  <Text style={{ fontSize: 11, color: "#888" }}>{s.l}</Text>
                </div>
              </Col>
            ))}
          </Row>
          {[
            { id: "CASE-0237", name: "Rajesh Mehta", status: "Escalated", tc: "volcano" },
            { id: "CASE-0236", name: "ABC Corp Ltd", status: "In Progress", tc: "orange" },
            { id: "CASE-0235", name: "Priya Fintech", status: "STR Filed", tc: "success" },
          ].map(({ id, name, status, tc }) => (
            <div key={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: "#f5f7fa", borderRadius: 6, marginBottom: 6, border: "1px solid #e8ecf4" }}>
              <div>
                <Text style={{ fontSize: 12, fontWeight: 600, color: DARK, display: "block" }}>{id} · {name}</Text>
                <Text style={{ fontSize: 11, color: "#888" }}>Suspicious Activity Investigation</Text>
              </div>
              <Tag color={tc} style={{ fontSize: 10 }}>{status}</Tag>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "STR Filing — Maker-Checker Approval",
      desc: "Convert approved investigations into FIU-IND ARF v2.2 compliant XML reports with Maker-Checker approval.",
      icon: <FileProtectOutlined style={{ color: "#52c41a" }} />,
      content: (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
            {[["DRAFT", "#8899bb", true], ["PENDING APPROVAL", "#faad14", false], ["APPROVED", "#1677ff", false], ["SUBMITTED", "#52c41a", false]].map(([label, color, active], i, arr) => (
              <React.Fragment key={label}>
                <div style={{ background: active ? `${color}20` : "#f0f0f0", border: `1px solid ${active ? color : "#ddd"}`, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: active ? 700 : 400, color: active ? color : "#aaa" }}>{label}</div>
                {i < arr.length - 1 && <span style={{ color: "#ccc", fontSize: 12 }}>→</span>}
              </React.Fragment>
            ))}
          </div>
          <div style={{ background: "#f6ffed", border: "1px solid #b7eb8f", borderRadius: 8, padding: 12, marginBottom: 12 }}>
            <Text style={{ color: "#389e0d", fontWeight: 600, fontSize: 13 }}>FIU-IND ARF v2.2 Compliant STR</Text>
            <Text style={{ display: "block", color: "#666", fontSize: 12, marginTop: 4 }}>Auto-populated from case data. Awaiting Compliance Officer sign-off.</Text>
          </div>
          {[["Report Reference", "STR-2026-0062"], ["Subject", "Rajesh Mehta — CASE-0237"], ["Amount", "₹48,00,000"], ["Grounds", "Structuring / Layering (SR-04)"], ["Status", "Draft — Pending CO Approval"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #eef2f7" }}>
              <Text style={{ fontSize: 12, color: "#888" }}>{k}</Text>
              <Text style={{ fontSize: 12, fontWeight: 500, color: DARK }}>{v}</Text>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <Button type="primary" style={{ background: "#52c41a", borderColor: "#52c41a", flex: 1, fontSize: 12 }}>Approve & Generate XML</Button>
            <Button style={{ fontSize: 12 }}>Reject</Button>
          </div>
        </div>
      ),
    },
    {
      title: "CSV Upload & Column Mapping",
      icon: <UploadOutlined style={{ color: "#1677ff" }} />,
      content: (
        <div>
          <div style={{ background: "#e6f4ff", border: "1px solid #91caff", borderRadius: 8, padding: 12, marginBottom: 12 }}>
            <Text style={{ color: "#0958d9", fontWeight: 600, fontSize: 13 }}>Dynamic Column Mapping — Any CSV Format</Text>
            <Text style={{ display: "block", color: "#666", fontSize: 12, marginTop: 4 }}>Map your bank's CSV columns to Complyra fields once. Reused on every subsequent upload.</Text>
          </div>
          <div style={{ background: "#f9fafb", borderRadius: 8, padding: 10, border: "1px solid #e8ecf4", marginBottom: 10 }}>
            {[["Your Column", "→ Complyra Field"], ["txn_date", "→ transactionDate"], ["debit_amt", "→ amount (DEBIT)"], ["acc_no", "→ accountNumber"], ["ifsc", "→ ifscCode (geo-risk scored)"]].map(([a, b], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: i < 4 ? "1px solid #eef2f7" : "none" }}>
                <Text style={{ fontSize: 11, color: i === 0 ? "#888" : "#1677ff", fontWeight: i === 0 ? 600 : 400 }}>{a}</Text>
                <Text style={{ fontSize: 11, color: i === 0 ? "#888" : "#52c41a", fontWeight: i === 0 ? 600 : 400 }}>{b}</Text>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ]);

const features = Object.freeze([
  {
    icon: <UploadOutlined />,
    title: "Flexible CSV Upload",
    desc: "Upload transaction files from any source system and save reusable mappings for future imports.",
  },
  {
    icon: <UserOutlined />,
    title: "Customer Management",
    desc: "Manage customer profiles, review transaction history, and correct regulatory data issues before STR submission.",
  },
  {
    icon: <BarChartOutlined />,
    title: "Explainable Risk Scoring",
    desc: "Generate customer risk scores using configurable AML rules with full visibility into triggered conditions.",
  },
  {
    icon: <BellOutlined />,
    title: "Alert Review",
    desc: "Every alert includes triggered rules, suspicious indicators, threshold breaches, and supporting transaction context.",
  },
//   {
//     icon: <SearchOutlined />,
//     title: "Rule Explainability",
//     desc: "Show why customers were flagged, which rules triggered, and how thresholds were breached.",
//   },
//   {
//     icon: <FolderOpenOutlined />,
//     title: "Flagged Transaction Review",
//     desc: "Investigate suspicious customer activity, review linked transactions, and determine escalation actions.",
//   },
  {
    icon: <ApartmentOutlined />,
    title: "Case Assignment & Ownership",
    desc: "Assign investigations to analysts and maintain accountability throughout the review lifecycle.",
  },
//   {
//     icon: <PaperClipOutlined />,
//     title: "Evidence Management",
//     desc: "Attach supporting documents, screenshots, investigation evidence, and filing acknowledgements.",
//   },
  {
    icon: <FileTextOutlined />,
    title: "Assisted STR Preparation",
    desc: "Generate draft narratives and activity type suggestions while keeping compliance officers in control.",
  },
  {
    icon: <FileProtectOutlined />,
    title: "FIU-IND XML Generation",
    desc: "Generate structured XML output aligned with FIU-IND filing requirements and submission workflows.",
  },
//   {
//     icon: <CheckCircleFilled />,
//     title: "Regulatory Data Validation",
//     desc: "Validate mandatory fields, customer information, and filing requirements before approval.",
//   },
  {
    icon: <AuditOutlined />,
    title: "Complete Investigation Audit Trail",
    desc: "Track alerts, investigations, approvals, assignments, workflow transitions, and reporting actions.",
  },
]);

// ── SECURITY FEATURES ──────────────────────────────────────────
const securityFeatures = Object.freeze([
  {
    icon: <LockOutlined />,
    title: "Strong Password Controls",
    desc: "Enforces stronger passwords and supports secure password reset flows for production readiness.",
  },
  {
    icon: <SafetyOutlined />,
    title: "Secure Session Design",
    desc: "Refresh tokens are handled through HttpOnly cookies to reduce browser-side token exposure.",
  },
  {
    icon: <AuditOutlined />,
    title: "Auditable User Actions",
    desc: "Alert review, dismissal, case conversion, and operational actions are recorded for review.",
  },
  {
    icon: <EyeOutlined />,
    title: "Access Protection",
    desc: "Account lockout and login rate limiting help reduce brute-force and credential abuse risk.",
  },
  {
    icon: <FileProtectOutlined />,
    title: "Protected Compliance Outputs",
    desc: "Reports are encrypted and sensitive compliance workflows are designed for controlled access.",
  },
  {
    icon: <ControlOutlined />,
    title: "Configurable Monitoring",
    desc: "Thresholds and rule settings can be controlled without weakening the review workflow.",
  },
]);

// ── MAIN COMPONENT ─────────────────────────────────────────────
const LandingPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

const openCalendlyPopup = useCallback(() => {
  const tryOpen = (attempts = 0) => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
      return;
    }
    if (attempts < 6) {
      // Retry every 500ms, up to 3 seconds
      setTimeout(() => tryOpen(attempts + 1), 500);
    } else {
      // True fallback only after 3s of retries
      window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
    }
  };
  tryOpen();
}, []);

useEffect(() => {
  // Warm up Calendly iframe ~2s after page load (after LCP)
  const timer = setTimeout(() => {
    if (window.Calendly) {
      window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: document.getElementById('calendly-prefetch-container'),
        prefill: {},
        utm: {},
      });
    }
  }, 2000);
  return () => clearTimeout(timer);
}, []);

  const footerColumns = [
    {
      title: 'Product',
      links: [
        { label: 'Features',  action: () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }) },
        { label: 'Pricing',   action: () => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }) },
      ],
    },
    {
      title: 'Support',
      links: [
//         { label: 'Contact Sales', action: () => setOpenCalendly(true) },
        { label: 'Support',       action: () => { window.location.href = 'mailto:admin@complyra.in'; } },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy',   action: () => navigate('/privacy-policy') },
        { label: 'Terms of Service', action: () => navigate('/terms-and-conditions') },
        { label: 'Acceptable Use',   action: () => navigate('/acceptable-use') },
      ],
    },
  ];

    useEffect(() => {
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            setScrolled(window.scrollY > 20);
            ticking = false;
          });
          ticking = true;
        }
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <Layout style={{ background: BG, minHeight: "100vh" }}>
      <style>{globalStyles}</style>

      {/* ── 1. NAVBAR ── */}
      <Header
        style={{
          position: "sticky", top: 0, zIndex: 1000,
          background: scrolled ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.98)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #e8ecf4",
          boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
          padding: "0 24px", height: 64, lineHeight: "64px",
          transition: "all 0.3s",
        }}
      >
        <div style={{ ...containerStyle, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: `linear-gradient(135deg, ${BRAND}, #0958d9)`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SafetyOutlined style={{ color: "#fff", fontSize: 16 }} />
            </div>
            <Text style={{ fontSize: 20, fontWeight: 800, color: DARK, letterSpacing: "-0.5px" }}>Complyra</Text>
          </div>

          <Space size={28}>
            {["Features", "Pricing", /* "Login" */].map((item) => (
              <a
                key={item}
                className="nav-link"
                onClick={() => {
//                   if (item === "Login") navigate("/login");
                  if (item === "Pricing") document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
                  if (item === "Features") document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {item}
              </a>
            ))}
            <Button
              type="primary"
              size="middle"
              style={{ borderRadius: 6, fontWeight: 600, paddingInline: 20 }}
                onClick={openCalendlyPopup}
            >
              Request Demo
            </Button>
          </Space>
        </div>
      </Header>

      <Content>
        {/* ── 2. HERO ── */}
        <div
          style={{
            background: "linear-gradient(160deg, #051226 0%, #0a1f3d 60%, #0d2b54 100%)",
            padding: "96px 24px 80px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle grid overlay only — no blobs */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(22,119,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(22,119,255,0.04) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

          <div style={{ ...containerStyle, position: "relative", zIndex: 1 }}>
            <Row gutter={[48, 48]} align="middle">
              <Col xs={24} lg={12}>
                {/* Compliance badge — no emoji */}
                <div style={{ display: "inline-block", background: "rgba(22,119,255,0.12)", border: "1px solid rgba(22,119,255,0.3)", borderRadius: 20, color: "#69b1ff", fontSize: 12, fontWeight: 600, letterSpacing: 0.4, padding: "5px 16px", marginBottom: 24 }}>
                  RBI PMLA · FIU-IND Compliant Platform
                </div>

                <Title
                  level={1}
                  style={{
                    color: "#ffffff",
                    fontSize: 44,
                    fontWeight: 800,
                    lineHeight: 1.15,
                    marginBottom: 24,
                    letterSpacing: "-1px",
                  }}
                >
                  AML Investigation & STR Workflow Platform for NBFCs
                </Title>

                <Paragraph
                  style={{
                    color: "#8fafd8",
                    fontSize: 17,
                    lineHeight: 1.75,
                    marginBottom: 40,
                  }}
                >
                  Move from transaction monitoring to investigation, evidence collection,
                  maker-checker approval, and FIU-IND reporting within a single compliance
                  workflow. Review alerts, investigate suspicious activity, prepare STRs,
                  generate compliant XML, and maintain a complete audit trail.
                </Paragraph>

                <Space size={14}>
                  <Button
                    type="primary"
                    size="large"
                    icon={<ArrowRightOutlined />}
                    style={{ height: 50, paddingInline: 30, borderRadius: 8, fontWeight: 700, fontSize: 15 }}
                    onClick={openCalendlyPopup}
                  >
                    Request Demo
                  </Button>
                  <Button
                    size="large"
                    style={{ height: 50, paddingInline: 30, borderRadius: 8, fontWeight: 500, fontSize: 15, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", color: "#cbd5e1" }}
                    onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    See All Features
                  </Button>
                </Space>

                {/* Hero trust markers — no unverifiable claims */}
              <div style={{ marginTop: 40, display: "flex", gap: 0, flexWrap: "wrap" }}>
                {[
                   ["Risk Scoring", "Explainable AML scoring"],
                   ["Alert Review", "Triggered rules & evidence"],
                   ["STR Workflow", "Draft → Approval → XML"],
                   ["Audit Trail", "Full investigation history"],
                 ].map(([v, l], i) => (
                  <div
                    key={l}
                    style={{
                      paddingRight: 20,
                      marginRight: 24,
                      borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none",
                      marginBottom: 8,
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: 700, fontSize: 16, display: "block" }}>
                      {v}
                    </Text>
                    <Text style={{ color: "#5a80aa", fontSize: 12 }}>{l}</Text>
                  </div>
                ))}
              </div>
              </Col>

              <Col xs={24} lg={12}>
                <DashboardPreview />
              </Col>
            </Row>
          </div>
        </div>

        {/* ── 3. PRODUCT DEMO VIDEO ── */}
        <div style={sectionStyle}>
          <div style={containerStyle}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <Tag
                color="blue"
                style={{
                  borderRadius: 999,
                  paddingInline: 12,
                  marginBottom: 16,
                }}
              >
                Product Walkthrough
              </Tag>

              <Title
                level={2}
                style={{
                  color: DARK,
                  fontWeight: 800,
                  fontSize: 34,
                  marginBottom: 12,
                }}
              >
                Watch The Complete AML Workflow In Action
              </Title>

              <Text
                style={{
                  color: "#6b7a99",
                  fontSize: 16,
                  maxWidth: 760,
                  display: "block",
                  margin: "0 auto",
                }}
              >
                See how compliance teams move from transaction upload to
                alert review, investigation, case management, maker-checker
                approval, STR preparation, and FIU-IND XML generation.
              </Text>
            </div>

            <Card
              className="video-card"
              style={{
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid #d8e4f4",
                boxShadow: "0 8px 30px rgba(22,119,255,0.08)",
              }}
              bodyStyle={{
                padding: 20,
              }}
            >

            <iframe
              className="video-frame"
              src="https://www.loom.com/embed/b963c349c90f4a29a99bf501f254f450"
              title="Complyra AML Workflow Demo"
              frameBorder="0"
              allow="fullscreen; picture-in-picture"
              allowFullScreen
            />

              <Row
                gutter={[24, 24]}
                style={{
                  marginTop: 24,
                }}
              >
                <Col xs={24} md={8}>
                  <div
                    style={{
                      background: "#f8fbff",
                      border: "1px solid #deebf7",
                      borderRadius: 12,
                      padding: 16,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 700,
                        color: DARK,
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      Alert Investigation
                    </Text>

                    <Text style={{ color: "#6b7a99", fontSize: 13 }}>
                      Review triggered rules, suspicious indicators,
                      evidence and analyst actions.
                    </Text>
                  </div>
                </Col>

                <Col xs={24} md={8}>
                  <div
                    style={{
                      background: "#f8fbff",
                      border: "1px solid #deebf7",
                      borderRadius: 12,
                      padding: 16,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 700,
                        color: DARK,
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      Case & STR Workflow
                    </Text>

                    <Text style={{ color: "#6b7a99", fontSize: 13 }}>
                      Convert alerts into investigations, assign analysts,
                      draft STRs and manage approvals.
                    </Text>
                  </div>
                </Col>

                <Col xs={24} md={8}>
                  <div
                    style={{
                      background: "#f8fbff",
                      border: "1px solid #deebf7",
                      borderRadius: 12,
                      padding: 16,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 700,
                        color: DARK,
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      FIU XML Generation
                    </Text>

                    <Text style={{ color: "#6b7a99", fontSize: 13 }}>
                      Generate compliant XML output with audit-ready
                      approval history.
                    </Text>
                  </div>
                </Col>
              </Row>

              <div
                style={{
                  textAlign: "center",
                  marginTop: 28,
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  icon={<PlayCircleOutlined />}
                  onClick={openCalendlyPopup}                >
                  Book Live Demo
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* ── 4. THREE PILLARS ── */}
{/*         <div style={sectionStyle}> */}
{/*           <div style={containerStyle}> */}
{/*             <div style={{ textAlign: "center", marginBottom: 52 }}> */}
{/*                           <Title level={2} style={{ color: DARK, fontWeight: 800, fontSize: 34, marginBottom: 12 }}> */}
{/*                             Built for NBFC Compliance Teams */}
{/*                           </Title> */}
{/*                           <Text style={{ color: "#6b7a99", fontSize: 16 }}> */}
{/*                             Six core workflow screens — from customer data validation and explainable risk scoring to STR filing and XML generation. */}
{/*                           </Text> */}
{/*                         </div> */}

{/*             <Row gutter={[24, 24]}> */}
{/*               {screenshots */}
{/*                 .filter((s) => */}
{/*                                   [ */}
{/*                                     "Transaction Monitoring", */}
{/*                                     "Alert Investigation", */}
{/*                                     "Customer Management", */}
{/*                                     "Explainable Risk Scoring", */}
{/*                                     "Case Management", */}
{/*                                     "STR Filing — Maker-Checker Approval", */}
{/*                                   ].includes(s.title) */}
{/*                                 ) */}
{/*                 .map((s) => ( */}
{/*                   <Col xs={24} md={12} lg={8} key={s.title}> */}
{/*                     <Card */}
{/*                       className="screenshot-card" */}
{/*                       title={ */}
{/*                         <Space> */}
{/*                           {s.icon} */}
{/*                           <Text style={{ fontWeight: 700, color: DARK, fontSize: 14 }}> */}
{/*                             {s.title} */}
{/*                           </Text> */}
{/*                         </Space> */}
{/*                       } */}
{/*                       style={{ */}
{/*                         borderRadius: 14, */}
{/*                         border: "1px solid #d8e4f4", */}
{/*                         boxShadow: "0 4px 20px rgba(0,0,0,0.05)", */}
{/*                       }} */}
{/*                       headStyle={{ */}
{/*                         background: "#f8fafe", */}
{/*                         borderBottom: "1px solid #e8ecf4", */}
{/*                         borderRadius: "14px 14px 0 0", */}
{/*                       }} */}
{/*                       bodyStyle={{ minHeight: 210 }} */}
{/*                     > */}
{/*                       {s.content} */}
{/*                     </Card> */}
{/*                   </Col> */}
{/*                 ))} */}
{/*             </Row> */}
{/*           </div> */}
{/*         </div> */}

        {/* ── 5. ALL FEATURES ── */}
        <div style={sectionStyle} id="features">
          <div style={containerStyle}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <Title level={2} style={{ color: DARK, fontWeight: 800, fontSize: 34, marginBottom: 12 }}>
              AML Compliance Features
            </Title>
            <Text style={{ color: "#6b7a99", fontSize: 16 }}>
              End-to-end AML investigation workflow including customer management, risk scoring, alert review, case investigations, evidence collection, STR preparation, approval workflows, and FIU-IND reporting.            </Text>
          </div>

            <Row gutter={[18, 18]}>
              {features.map((f) => (
                <Col xs={24} sm={12} md={8} lg={6} key={f.title}>
                  <Card
                    className="feature-card"
                    style={{ borderRadius: 12, border: "1px solid #e4ecf7", boxShadow: "0 1px 8px rgba(22,119,255,0.04)", height: "100%", cursor: "default" }}
                    bodyStyle={{ padding: 22 }}
                  >
                    <div className="icon-wrap" style={{ width: 44, height: 44, borderRadius: 11, background: "#eef4ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, color: BRAND, marginBottom: 14, transition: "background 0.25s" }}>
                      {f.icon}
                    </div>
                    <Text style={{ fontSize: 13, fontWeight: 700, color: DARK, display: "block", marginBottom: 7 }}>{f.title}</Text>
                    <Text style={{ fontSize: 12, color: "#6b7a99", lineHeight: 1.6 }}>{f.desc}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>

       {/* ── 6. HOW IT WORKS ── */}
       <div style={sectionAltStyle}>
         <div style={containerStyle}>
           <div style={{ textAlign: "center", marginBottom: 52 }}>
             <Title level={2} style={{ color: DARK, fontWeight: 800, fontSize: 34, marginBottom: 12 }}>
               How Complyra Works
             </Title>
             <Text style={{ color: "#6b7a99", fontSize: 16 }}>
               From transaction file upload to analyst review and FIU-IND draft preparation.
             </Text>
           </div>

           <div
             style={{
               background: "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
               borderRadius: 20,
               border: "1px solid #d7e6f7",
               boxShadow: "0 16px 50px rgba(22,119,255,0.08)",
               padding: 28,
             }}
           >
             <Row gutter={[20, 20]}>
               {[
                  {
                    step: "01",
                    title: "Customer & Transaction Upload",
                    desc: "Import customer and transaction data using reusable mappings and validation controls.",
                    icon: <DatabaseOutlined style={{ color: BRAND, fontSize: 22 }} />,
                    tone: "#e6f4ff",
                    border: "#91caff",
                  },
                  {
                    step: "02",
                    title: "Regulatory Data Validation",
                    desc: "Validate mandatory customer information and identify data quality issues before processing.",
                    icon: <CheckCircleFilled style={{ color: "#52c41a", fontSize: 22 }} />,
                    tone: "#f6ffed",
                    border: "#b7eb8f",
                  },
                  {
                    step: "03",
                    title: "Risk Scoring",
                    desc: "Apply AML rules and thresholds to generate explainable customer risk scores.",
                    icon: <BarChartOutlined style={{ color: "#1677ff", fontSize: 22 }} />,
                    tone: "#f0f5ff",
                    border: "#adc6ff",
                  },
                  {
                    step: "04",
                    title: "Alert Generation",
                    desc: "Automatically generate alerts with supporting rules, indicators, and suspicious transaction context.",
                    icon: <BellOutlined style={{ color: "#ff4d4f", fontSize: 22 }} />,
                    tone: "#fff1f0",
                    border: "#ffa39e",
                  },
                  {
                    step: "05",
                    title: "Alert Review & Investigation",
                    desc: "Review suspicious activity, examine transactions, and decide whether escalation is required.",
                    icon: <SearchOutlined style={{ color: "#722ed1", fontSize: 22 }} />,
                    tone: "#f9f0ff",
                    border: "#d3adf7",
                  },
                  {
                    step: "06",
                    title: "Case Assignment & Evidence Collection",
                    desc: "Assign cases to analysts, collect supporting evidence, and document investigation findings.",
                    icon: <PaperClipOutlined style={{ color: "#13c2c2", fontSize: 22 }} />,
                    tone: "#e6fffb",
                    border: "#87e8de",
                  },
                  {
                    step: "07",
                    title: "STR Draft Preparation",
                    desc: "Generate draft narratives and activity type suggestions with editable compliance review workflows.",
                    icon: <FileTextOutlined style={{ color: "#fa8c16", fontSize: 22 }} />,
                    tone: "#fff7e6",
                    border: "#ffd591",
                  },
                  {
                    step: "08",
                    title: "Maker-Checker Approval",
                    desc: "Review, approve, reject, and track STR preparation through controlled approval workflows.",
                    icon: <SolutionOutlined style={{ color: "#1677ff", fontSize: 22 }} />,
                    tone: "#f0f5ff",
                    border: "#adc6ff",
                  },
                  {
                    step: "09",
                    title: "FIU-IND XML Generation",
                    desc: "Generate filing-ready XML aligned with FIU-IND reporting requirements.",
                    icon: <FileProtectOutlined style={{ color: "#52c41a", fontSize: 22 }} />,
                    tone: "#f6ffed",
                    border: "#b7eb8f",
                  },
                ].map((item) => (
                 <Col xs={24} md={12} lg={8} key={item.step}>
                   <div
                     style={{
                       height: "100%",
                       background: "#fff",
                       borderRadius: 16,
                       border: `1px solid ${item.border}`,
                       boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                       padding: 22,
                       position: "relative",
                       overflow: "hidden",
                     }}
                   >
                     <div
                       style={{
                         position: "absolute",
                         top: 0,
                         left: 0,
                         right: 0,
                         height: 4,
                         background: `linear-gradient(90deg, ${item.border}, ${BRAND})`,
                       }}
                     />
                     <div
                       style={{
                         width: 52,
                         height: 52,
                         borderRadius: 14,
                         background: item.tone,
                         border: `1px solid ${item.border}`,
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "center",
                         marginBottom: 16,
                       }}
                     >
                       {item.icon}
                     </div>

                     <Text
                       style={{
                         display: "inline-block",
                         fontSize: 11,
                         fontWeight: 700,
                         color: BRAND,
                         background: "#f0f5ff",
                         border: "1px solid #d6e4ff",
                         borderRadius: 999,
                         padding: "3px 10px",
                         marginBottom: 12,
                       }}
                     >
                       STEP {item.step}
                     </Text>

                     <Text style={{ display: "block", color: DARK, fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
                       {item.title}
                     </Text>

                     <Text style={{ color: "#6b7a99", fontSize: 13, lineHeight: 1.75 }}>
                       {item.desc}
                     </Text>
                   </div>
                 </Col>
               ))}
             </Row>
           </div>
         </div>
       </div>

        {/* ── 7. WHY COMPLYRA ── */}
        <div style={sectionStyle}>
          <div style={containerStyle}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <Title level={2} style={{ color: DARK, fontWeight: 800, fontSize: 34, marginBottom: 12 }}>
                Why Compliance Teams Use Complyra
              </Title>
              <Text style={{ color: "#6b7a99", fontSize: 16 }}>
                Designed to eliminate the bottlenecks in manual AML compliance operations.
              </Text>
            </div>

            <Row gutter={[24, 24]}>
              {[
                 {
                   icon: <ControlOutlined style={{ fontSize: 26, color: BRAND }} />,
                   title: "Reduce Analyst Manual Work",
                   desc: "Replace spreadsheet-led review with automated alert generation, rule reasons, and pre-filled draft narratives.",
                 },
                 {
                   icon: <AlertOutlined style={{ fontSize: 26, color: "#ff4d4f" }} />,
                   title: "Explain Why a Customer Was Flagged",
                   desc: "Give analysts and Compliance Officers clearer rule triggers, threshold explanations, and type-code reasoning.",
                 },
                 {
                   icon: <FolderOpenOutlined style={{ fontSize: 26, color: "#52c41a" }} />,
                   title: "Create a Defensible Audit Trail",
                   desc: "Track alert dismissal, case conversion, review actions, and approval history in one auditable workflow.",
                 },
                 {
                   icon: <FileProtectOutlined style={{ fontSize: 26, color: "#faad14" }} />,
                   title: "Go Live with a Focused Pilot",
                   desc: "Start with the highest-friction AML workflow for your NBFC: upload, monitor, review, investigate, and draft STR.",
                 },
               ].map((b) => (
                <Col xs={24} sm={12} key={b.title}>
                  <Card
                    className="feature-card"
                    style={{ borderRadius: 16, border: "1px solid #e4ecf7", boxShadow: "0 2px 16px rgba(22,119,255,0.04)", height: "100%", cursor: "default" }}
                    bodyStyle={{ padding: 32 }}
                  >
                    <div className="icon-wrap" style={{ width: 48, height: 48, borderRadius: 12, background: "#eef4ff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, transition: "background 0.25s" }}>{b.icon}</div>
                    <Text style={{ fontSize: 16, fontWeight: 700, color: DARK, display: "block", marginBottom: 10 }}>{b.title}</Text>
                    <Text style={{ color: "#6b7a99", fontSize: 14, lineHeight: 1.7 }}>{b.desc}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>

{/*         <div style={sectionStyle}> */}
{/*           <div style={containerStyle}> */}
{/*             <div style={{ textAlign: "center", marginBottom: 52 }}> */}
{/*               <Title level={2} style={{ color: DARK, fontWeight: 800, fontSize: 34 }}> */}
{/*                 Built for AML Teams */}
{/*               </Title> */}
{/*               <Text style={{ color: "#6b7a99", fontSize: 16 }}> */}
{/*                 Designed around how AML analysts and Compliance Officers actually work. */}
{/*               </Text> */}
{/*             </div> */}

{/*             <Row gutter={[24, 24]}> */}
{/*               <Col xs={24} md={12}> */}
{/*                 <Card */}
{/*                   className="feature-card" */}
{/*                   style={{ */}
{/*                     borderRadius: 16, */}
{/*                     border: "1px solid #d8e4f4", */}
{/*                     boxShadow: "0 4px 20px rgba(0,0,0,0.05)", */}
{/*                     height: "100%", */}
{/*                   }} */}
{/*                   bodyStyle={{ padding: 28 }} */}
{/*                 > */}
{/*                   <div */}
{/*                     style={{ */}
{/*                       width: 52, */}
{/*                       height: 52, */}
{/*                       borderRadius: 14, */}
{/*                       background: "#eef4ff", */}
{/*                       display: "flex", */}
{/*                       alignItems: "center", */}
{/*                       justifyContent: "center", */}
{/*                       marginBottom: 18, */}
{/*                     }} */}
{/*                   > */}
{/*                     <SearchOutlined style={{ fontSize: 22, color: BRAND }} /> */}
{/*                   </div> */}

{/*                   <Title */}
{/*                     level={4} */}
{/*                     style={{ */}
{/*                       marginBottom: 18, */}
{/*                       color: DARK, */}
{/*                       fontWeight: 700, */}
{/*                     }} */}
{/*                   > */}
{/*                     AML Analysts */}
{/*                   </Title> */}

{/*                   <Space direction="vertical" size={12} style={{ width: "100%" }}> */}
{/*                     {[ */}
{/*                       "Review flagged customers", */}
{/*                       "Investigate suspicious transactions", */}
{/*                       "Analyze triggered AML rules", */}
{/*                       "Collect investigation evidence", */}
{/*                       "Create and manage cases", */}
{/*                       "Draft STR submissions", */}
{/*                     ].map((item) => ( */}
{/*                       <div */}
{/*                         key={item} */}
{/*                         style={{ */}
{/*                           display: "flex", */}
{/*                           alignItems: "flex-start", */}
{/*                           gap: 10, */}
{/*                         }} */}
{/*                       > */}
{/*                         <CheckCircleFilled */}
{/*                           style={{ */}
{/*                             color: "#1677ff", */}
{/*                             marginTop: 4, */}
{/*                           }} */}
{/*                         /> */}
{/*                         <Text style={{ color: "#55637a" }}> */}
{/*                           {item} */}
{/*                         </Text> */}
{/*                       </div> */}
{/*                     ))} */}
{/*                   </Space> */}
{/*                 </Card> */}
{/*               </Col> */}

{/*               <Col xs={24} md={12}> */}
{/*                 <Card */}
{/*                   className="feature-card" */}
{/*                   style={{ */}
{/*                     borderRadius: 16, */}
{/*                     border: "1px solid #d8e4f4", */}
{/*                     boxShadow: "0 4px 20px rgba(0,0,0,0.05)", */}
{/*                     height: "100%", */}
{/*                   }} */}
{/*                   bodyStyle={{ padding: 28 }} */}
{/*                 > */}
{/*                   <div */}
{/*                     style={{ */}
{/*                       width: 52, */}
{/*                       height: 52, */}
{/*                       borderRadius: 14, */}
{/*                       background: "#f6ffed", */}
{/*                       display: "flex", */}
{/*                       alignItems: "center", */}
{/*                       justifyContent: "center", */}
{/*                       marginBottom: 18, */}
{/*                     }} */}
{/*                   > */}
{/*                     <SafetyOutlined */}
{/*                       style={{ */}
{/*                         fontSize: 22, */}
{/*                         color: "#52c41a", */}
{/*                       }} */}
{/*                     /> */}
{/*                   </div> */}

{/*                   <Title */}
{/*                     level={4} */}
{/*                     style={{ */}
{/*                       marginBottom: 18, */}
{/*                       color: DARK, */}
{/*                       fontWeight: 700, */}
{/*                     }} */}
{/*                   > */}
{/*                     Compliance Officers */}
{/*                   </Title> */}

{/*                   <Space direction="vertical" size={12} style={{ width: "100%" }}> */}
{/*                     {[ */}
{/*                       "Configure AML thresholds", */}
{/*                       "Review analyst investigations", */}
{/*                       "Assign and reassign cases", */}
{/*                       "Approve STR submissions", */}
{/*                       "Generate FIU-IND XML", */}
{/*                       "Maintain audit readiness", */}
{/*                     ].map((item) => ( */}
{/*                       <div */}
{/*                         key={item} */}
{/*                         style={{ */}
{/*                           display: "flex", */}
{/*                           alignItems: "flex-start", */}
{/*                           gap: 10, */}
{/*                         }} */}
{/*                       > */}
{/*                         <CheckCircleFilled */}
{/*                           style={{ */}
{/*                             color: "#52c41a", */}
{/*                             marginTop: 4, */}
{/*                           }} */}
{/*                         /> */}
{/*                         <Text style={{ color: "#55637a" }}> */}
{/*                           {item} */}
{/*                         </Text> */}
{/*                       </div> */}
{/*                     ))} */}
{/*                   </Space> */}
{/*                 </Card> */}
{/*               </Col> */}
{/*             </Row> */}
{/*           </div> */}
{/*         </div> */}

        {/* ── 8. SECURITY ── */}
        <div style={sectionAltStyle}>
          <div style={containerStyle}>
            <Row gutter={[64, 48]} align="middle">
              <Col xs={24} lg={10}>
                <Tag style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 600, marginBottom: 24, display: "inline-block" }}>
                  Enterprise Security
                </Tag>
                <Title level={2} style={{ color: DARK, fontWeight: 800, fontSize: 34, marginBottom: 16 }}>
                  Built for Financial Institution Security Standards
                </Title>
                <Paragraph style={{ color: "#6b7a99", fontSize: 15, lineHeight: 1.8 }}>
                  Complyra is built with security-first principles required by regulated financial institutions.
                  Data is stored on DigitalOcean Bangalore for RBI data residency compliance.
                  Every action is logged in an immutable audit trail.
                </Paragraph>
              </Col>
              <Col xs={24} lg={14}>
                <Row gutter={[16, 16]}>
                  {securityFeatures.map((f) => (
                    <Col xs={24} sm={12} key={f.title}>
                      <Card
                        className="feature-card"
                        style={{ borderRadius: 12, border: "1px solid #d1ead1", boxShadow: "0 2px 10px rgba(82,196,26,0.06)", cursor: "default" }}
                        bodyStyle={{ padding: 22 }}
                      >
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: "#f6ffed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, color: "#52c41a", marginBottom: 12, border: "1px solid #d9f7be" }}>
                          {f.icon}
                        </div>
                        <Text style={{ fontWeight: 700, color: DARK, fontSize: 13, display: "block", marginBottom: 6 }}>{f.title}</Text>
                        <Text style={{ color: "#6b7a99", fontSize: 12, lineHeight: 1.6 }}>{f.desc}</Text>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </div>
        </div>

        {/* ── 9. PRICING ── */}
        <div style={sectionStyle} id="pricing">
          <div style={containerStyle}>
            <Card
              style={{
                borderRadius: 24,
                border: "1px solid #cfe0f5",
                boxShadow: "0 16px 48px rgba(22,119,255,0.10)",
                overflow: "hidden",
              }}
              bodyStyle={{ padding: 0 }}
            >
              <Row gutter={0}>
                <Col xs={24} lg={14}>
                  <div style={{ padding: 40 }}>
                    <Tag color="blue" style={{ marginBottom: 16, borderRadius: 999, paddingInline: 12 }}>
                      Founding Designer Program
                    </Tag>
                    <Title level={2} style={{ color: DARK, fontWeight: 800, fontSize: 34, marginBottom: 12 }}>
                      Join the first 5 NBFC pilot cohort
                    </Title>
                    <Text style={{ color: "#6b7a99", fontSize: 16, display: "block", lineHeight: 1.8, marginBottom: 24 }}>
                      Work directly with the founding team to shape Complyra around your real AML operations — from CSV upload and alert review to STR draft preparation and FIU-IND XML workflows.
                    </Text>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
                      {[
                        "Hands-on onboarding for your transaction format",
                        "Priority product feedback incorporation",
                        "Pilot support for compliance team workflows",
                        "Founding customer pricing and roadmap access",
                      ].map((item) => (
                        <div
                          key={item}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            background: "#f8fbff",
                            border: "1px solid #deebf7",
                            borderRadius: 12,
                            padding: "12px 14px",
                          }}
                        >
                          <CheckCircleFilled style={{ color: "#1677ff", marginTop: 3 }} />
                          <Text style={{ color: DARK, fontSize: 13, lineHeight: 1.6 }}>{item}</Text>
                        </div>
                      ))}
                    </div>

                    <Space size={14} wrap>
                        <Button type="primary" size="large" onClick={openCalendlyPopup}>
                        Book Founding Pilot Demo
                      </Button>
{/*                       <Button size="large" onClick={() => navigate("/login")}> */}
{/*                         Login */}
{/*                       </Button> */}
                    </Space>
                  </div>
                </Col>

                <Col xs={24} lg={10}>
                  <div
                    style={{
                      height: "100%",
                      background: "linear-gradient(160deg, #071829 0%, #0a1f3d 100%)",
                      padding: 40,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "#8fafd8", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 16 }}>
                      Best fit for pilot teams
                    </Text>

                    {[
                      ["Compliance Officers", "Review draft STRs with suggested type codes and editable narratives"],
                      ["AML Analysts", "Work alerts faster with rule triggers, reasons, and alert-to-case actions"],
                      ["NBFC Leadership", "See a practical path from manual review to production workflow automation"],
                    ].map(([title, desc]) => (
                      <div
                        key={title}
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 14,
                          padding: 16,
                          marginBottom: 14,
                        }}
                      >
                        <Text style={{ color: "#fff", display: "block", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
                          {title}
                        </Text>
                        <Text style={{ color: "#9fb7d3", fontSize: 13, lineHeight: 1.7 }}>
                          {desc}
                        </Text>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
        </div>

        {/* ── 10. FINAL CTA ── */}
        <div
          style={{
            background: "linear-gradient(160deg, #040e1f 0%, #051830 50%, #071e3d 100%)",
            padding: "96px 24px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(22,119,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(22,119,255,0.04) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Title level={2} style={{ color: "#fff", fontSize: 38, fontWeight: 800, marginBottom: 14 }}>
              Start Your AML Compliance Program
            </Title>
            <Paragraph style={{ color: "#8fafd8", fontSize: 17, marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>
              Automate monitoring, investigation, and FIU-IND reporting for your NBFC with Complyra.
            </Paragraph>
            <Space size={14}>
              <Button
                type="primary" size="large" icon={<ArrowRightOutlined />}
                style={{ height: 50, paddingInline: 32, borderRadius: 8, fontWeight: 700, fontSize: 15 }}
                onClick={openCalendlyPopup}              >
                Request Demo
              </Button>
              <Button
                size="large"
                style={{ height: 50, paddingInline: 32, borderRadius: 8, fontWeight: 500, fontSize: 15, background: "transparent", border: "1px solid rgba(255,255,255,0.22)", color: "#fff" }}
                onClick={() => {
                  window.location.href =
                    `mailto:${FOUNDER_EMAIL}?subject=Interested in Complyra AML Platform`;
                }}
              >
                Talk to Founder
              </Button>
            </Space>
          </div>
        </div>
      </Content>

      {/* ── 11. FOOTER ── */}
      <Footer style={{ background: "#040d1a", padding: "56px 24px 28px" }}>
        <div style={containerStyle}>
          <Row gutter={[48, 36]}>
            <Col xs={24} md={9}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 32, height: 32, background: `linear-gradient(135deg, ${BRAND}, #0958d9)`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <SafetyOutlined style={{ color: "#fff", fontSize: 16 }} />
                </div>
                <Text style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>Complyra</Text>
              </div>
           <Text
             style={{
               color: "#5a7090",
               fontSize: 14,
               lineHeight: 1.8,
               display: "block",
               maxWidth: 340,
             }}
           >
             From transaction monitoring to investigation, maker-checker approval,
             and FIU-IND reporting — all within a single AML workflow platform.
           </Text>
              <div style={{ marginTop: 16 }}>
               <Tag style={{ background: "transparent", border: "1px solid #0f2240", color: "#3d5570", fontSize: 12 }}>
                 Risk Scoring
               </Tag>
               <Tag style={{ background: "transparent", border: "1px solid #0f2240", color: "#3d5570", fontSize: 12, marginLeft: 6 }}>
                 Alert & Case Management
               </Tag>
               <Tag style={{ background: "transparent", border: "1px solid #0f2240", color: "#3d5570", fontSize: 12, marginLeft: 6 }}>
                 STR Workflow
               </Tag>
              </div>
            </Col>

            {footerColumns.map(col => (
              <Col xs={8} md={5} key={col.title}>
                <Text style={{ color: '#8899aa', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 14 }}>
                  {col.title}
                </Text>
                {col.links.map(link => (
                  <a
                    key={link.label}
                    style={{ display: 'block', color: '#4a6080', fontSize: 14, marginBottom: 10, textDecoration: 'none', transition: 'color 0.2s', cursor: 'pointer' }}
                    onMouseEnter={e => e.target.style.color = '#4096ff'}
                    onMouseLeave={e => e.target.style.color = '#4a6080'}
                    onClick={link.action}
                  >
                    {link.label}
                  </a>
                ))}
              </Col>
            ))}

          </Row>

          <Divider style={{ borderColor: "#0f2240", margin: "36px 0 20px" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <Text style={{ color: "#3d5570", fontSize: 13 }}>© 2026 Complyra Technologies Pvt. Ltd. All rights reserved.</Text>
            <Text style={{ color: "#2d4060", fontSize: 12 }}>AML Compliance Workflow Platform</Text>
           <Text style={{ color: '#2d4060', fontSize: 12 }}>|</Text>
         </div>
        </div>
      </Footer>

      {/* Hidden Calendly prefetch container — warms iframe silently */}
      <div
        id="calendly-prefetch-container"
        style={{
          position: 'fixed',
          bottom: -9999,
          left: -9999,
          width: 320,
          height: 630,
          visibility: 'hidden',
          pointerEvents: 'none',
          zIndex: -1,
          overflow: 'hidden',
        }}
      />
    </Layout>
  );
};

export default LandingPage;