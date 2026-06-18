import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Typography, Divider } from 'antd';
import { SafetyOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const BRAND = '#1677ff';
const DARK = '#0a1628';
const BG = '#f5f7fa';
const containerStyle = { maxWidth: 860, margin: '0 auto', padding: '0 32px' };

const P = ({ children }) => (
  <Paragraph style={{ color: '#4a5568', fontSize: 15, lineHeight: 1.8, marginBottom: 12 }}>
    {children}
  </Paragraph>
);

const BulletList = ({ items }) => (
  <ul style={{ paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
    {items.map((item, i) => (
      <li key={i} style={{ color: '#4a5568', fontSize: 15, lineHeight: 1.7 }}
          dangerouslySetInnerHTML={{ __html: item }} />
    ))}
  </ul>
);

const DataTable = ({ headers, rows }) => (
  <div style={{ overflowX: 'auto', marginBottom: 16 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
      <thead>
        <tr>{headers.map((h, i) => (
          <th key={i} style={{
            textAlign: 'left', fontWeight: 600, fontSize: 12, textTransform: 'uppercase',
            letterSpacing: '0.06em', color: '#6b7a99', padding: '10px 14px',
            borderBottom: '2px solid #e8ecf4',
          }}>{h}</th>
        ))}</tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri}>{row.map((cell, ci) => (
            <td key={ci} style={{
              padding: '10px 14px', borderBottom: '1px solid #f0f2f5',
              verticalAlign: 'top', color: '#4a5568', lineHeight: 1.6,
            }} dangerouslySetInnerHTML={{ __html: cell }} />
          ))}</tr>
        ))}
      </tbody>
    </table>
  </div>
);

const InfoBox = ({ color, borderColor, titleColor, title, children }) => (
  <div style={{ background: color, border: `1px solid ${borderColor}`, borderRadius: 10, padding: '14px 18px', marginBottom: 16 }}>
    {title && <Text style={{ fontWeight: 700, color: titleColor, display: 'block', marginBottom: 6 }}>{title}</Text>}
    {children}
  </div>
);

const ContactBox = ({ lines }) => (
  <div style={{ background: '#f9fafb', border: '1px solid #e2e8f0', borderRadius: 10, padding: '20px 24px', marginTop: 16 }}>
    {lines.map((l, i) => <Text key={i} style={{ display: 'block', color: '#4a5568', fontSize: 14, marginBottom: 6 }}>{l}</Text>)}
  </div>
);

const sections = [
  {
    title: 'Acceptance of Terms',
    content: (
      <>
        <P>
          These Terms and Conditions ("Terms") constitute a legally binding agreement between{' '}
          <strong>Complyra Technologies</strong> (operating as <strong>Complyra</strong>,
           hereinafter "Company", "we", "us") and the entity accessing or using the Complyra platform
          ("Client", "you").
        </P>
        <P>
          By completing the signup process, activating a paid subscription, or uploading any data to the
          platform, your organisation confirms that an authorised signatory has read, understood, and agreed
          to these Terms. If you do not agree, you must not use the platform.
        </P>
        <InfoBox color="#fffbe6" borderColor="#ffe58f" titleColor="#874d00" title="B2B Agreement">
          <Paragraph style={{ color: '#7c5308', fontSize: 14, marginBottom: 0 }}>
            These Terms govern an agreement between Complyra and a regulated financial institution. The
            individual signing up on behalf of an organisation warrants that they have authority to bind the
            organisation. These Terms do not create rights for individual end-customers of the Client.
          </Paragraph>
        </InfoBox>
      </>
    ),
  },
  {
    title: 'Description of Services',
    content: (
      <>
        <P>Complyra provides a cloud-based RegTech SaaS platform offering AML/CFT workflow software for transaction monitoring, alert handling, case investigation, STR draft preparation, and FIU-IND XML generation for regulated financial entities.</P>
        <DataTable
          headers={['Feature']}
          rows={[
            ['CSV Transaction Upload &amp; Column Mapping'],
            ['AML Rule Engine &amp; Threshold-Based Monitoring'],
            ['Auto Alert Generation for Flagged Customers'],
            ['Alert Review, Dismissal, and Alert-to-Case Conversion'],
            ['Suggested Activity Type Codes, Rule Explanations, and Draft Narratives'],
            ['STR Draft Preparation and FIU-IND XML Generation'],
            ['Audit Logs'],
            ['Rule Threshold Configuration'],
            ['Password Reset and Account Security Controls'],
          ]}
        />
        <P>
          A <strong>14-day free trial</strong> may be available for new organisations. Trial accounts may have access
          limits on features, volume, or frequency of use.
        </P>

        <InfoBox color="#fffbe6" borderColor="#ffe58f" titleColor="#874d00" title="Important Workflow Disclaimer">
          <Paragraph style={{ color: '#7c5308', fontSize: 14, marginBottom: 0 }}>
            Suggestions, alerts, rule explanations, activity type recommendations, generated narratives, scores, and similar outputs are decision-support tools only. Your organisation remains responsible for validating outputs, conducting investigations, approving reports, and ensuring regulatory filings are accurate and complete.
          </Paragraph>
        </InfoBox>
      </>
    ),
  },
  {
    title: 'Eligibility',
    content: (
      <>
        <P>To use Complyra, your organisation must:</P>
        <BulletList items={[
          'Be a legal entity that is required to perform AML/CFT or similar compliance workflows, or that is otherwise authorised by law to use the platform.',
          'Have an authorised representative who can bind the organisation to these Terms.',
          'Not be debarred, blacklisted, or otherwise prohibited from using third-party compliance software under applicable law or regulatory direction.',
          'Use the platform only for lawful business and compliance purposes.',
        ]} />
        <P>Complyra is available <strong>exclusively to legal entities</strong>. Individuals may not register personal consumer accounts on this platform.</P>
      </>
    ),
  },
  {
    title: 'Account Creation and Access',
    content: (
      <BulletList items={[
        'The <strong>Compliance Officer</strong> role is the primary administrator for each organisation. One primary Compliance Officer account may be designated per organisation, subject to your plan and administrative setup.',
        'The Compliance Officer may create additional <strong>Analyst</strong> accounts for their team. Role-based access control (RBAC) is enforced so users can only perform actions allowed by their assigned role.',
        'You are responsible for maintaining the confidentiality of credentials and all activity under your account. You must use strong passwords and follow any authentication controls we deploy.',
        'You must notify us immediately at <a href="mailto:admin@complyra.in">admin@complyra.in</a> if you suspect unauthorised access to your account.',
        'We may use tenant isolation, access controls, and logging to protect customer data, but no system can guarantee absolute security.',
      ]} />
    ),
  },
  {
    title: 'Subscription, Billing, and Refunds',
    content: (
      <>
        <P>Subscription fees are charged according to the plan selected at the time of activation. Prices are stated in Indian Rupees (INR) and may be exclusive of applicable taxes unless stated otherwise.</P>
        <BulletList items={[
          '<strong>Billing cycles:</strong> Monthly, Quarterly, or Annual, depending on the selected plan.',
          '<strong>Payment processor:</strong> Razorpay or another payment processor we may designate from time to time.',
          '<strong>Auto-renewal:</strong> Subscriptions may auto-renew unless cancelled before the renewal date.',
          '<strong>Access after expiry:</strong> Access may be suspended at expiry or shortly thereafter. Data export access, if offered, may be available for a limited period.',
          '<strong>Trial:</strong> Free trials, if offered, are limited to one per eligible organisation unless we approve otherwise.',
          '<strong>Refunds:</strong> Fees are generally non-refundable unless required by law or expressly stated in a written offer or invoice.',
          '<strong>Price changes:</strong> We may change pricing with prior notice on a reasonable basis before the change takes effect.',
        ]} />
      </>
    ),
  },
  {
    title: 'Client Obligations and Acceptable Use',
    content: (
      <>
        <P>By using Complyra, you represent and warrant that:</P>
        <BulletList items={[
          'All transaction data, customer data, and documents uploaded are lawfully obtained and you have the right to process them for your compliance purposes.',
          'You will not upload data that you do not have the right to provide to us, including data belonging to third parties without proper authority.',
          'You will not attempt to reverse-engineer, scrape, probe, overload, or otherwise misuse the platform or its APIs.',
          'You will not use the platform for unlawful, fraudulent, misleading, or abusive purposes.',
          'You will maintain accurate organisation details and account information, especially where those details are used in compliance outputs or billing.',
          'You remain responsible for timely regulatory decisions, filings, reviews, and approvals made by your organisation, even where the platform provides reminders or workflow support.',
        ]} />
        <InfoBox color="#fff0f6" borderColor="#ffadd2" titleColor="#c41d7f" title="Important Responsibility Notice">
          <Paragraph style={{ color: '#9b0d5e', fontSize: 14, marginBottom: 0 }}>
            Complyra is a compliance-support tool. It does not replace your organisation’s legal obligations,
            internal controls, or professional judgment. Your organisation remains responsible for any
            regulatory filing, approval, or decision made using the platform.
          </Paragraph>
        </InfoBox>
      </>
    ),
  },
  {
    title: 'Compliance and Regulatory Use',
    content: (
      <>
        <P>Complyra is designed to support common AML/CFT workflows, but we do not guarantee that use of the platform alone will make your organisation compliant with all applicable laws or regulations.</P>
        <BulletList items={[
          '<strong>AML/CFT workflows:</strong> Transaction monitoring, alerting, case tracking, and STR preparation support.',
          '<strong>Report generation:</strong> Generation of structured outputs and supporting records for regulatory workflows.',
          '<strong>Security logs:</strong> Activity logging for administration, troubleshooting, and audit support.',
          '<strong>Data handling:</strong> Data storage and processing in line with the service architecture and applicable law.',
        ]} />
        <P>You acknowledge that legal and regulatory requirements may change over time. We may update the platform from time to time, but you remain responsible for understanding the rules that apply to your organisation.</P>
      </>
    ),
  },
  {
    title: 'Intellectual Property',
    content: (
      <BulletList items={[
        '<strong>Platform IP:</strong> All software, workflows, UI design, documentation, and other materials that form part of the Complyra platform remain the property of Complyra Technologies or its licensors.',
        '<strong>Client Data:</strong> Data you upload remains your data or your licensor’s data, as applicable. You grant us a limited licence to process it solely to provide the services.',
        '<strong>Generated Outputs:</strong> Reports, alerts, and other outputs generated from your data may be used by your organisation as part of its compliance records, subject to applicable law and your subscription terms.',
        '<strong>Feedback:</strong> If you provide suggestions or feedback, you grant us a royalty-free licence to use them without restriction.',
      ]} />
    ),
  },
  {
    title: 'Limitation of Liability and Disclaimers',
    content: (
      <>
        <InfoBox color="#fff0f6" borderColor="#ffadd2" titleColor="#c41d7f" title="Important Disclaimer">
          <Paragraph style={{ color: '#9b0d5e', fontSize: 14, marginBottom: 0 }}>
            Complyra is provided on an "as-is" and "as-available" basis for the MVP/pilot phase. We do not
            promise that the platform will be uninterrupted, error-free, or that every risk score, alert,
            match, or output will be correct in every case.
          </Paragraph>
        </InfoBox>
        <P>To the maximum extent permitted by applicable Indian law:</P>
        <BulletList items={[
          'Our total aggregate liability to a Client will not exceed the subscription fees paid by that Client in the 3 months immediately preceding the event giving rise to the claim, unless a different limit is required by law.',
          'We are not liable for regulatory penalties, fines, or enforcement actions imposed on your organisation by any regulator or authority.',
          'We are not liable for indirect, consequential, incidental, special, or punitive damages, including loss of business, revenue, or reputation.',
          'Screening outputs and alert results may include false positives or false negatives. Your organisation should review outputs before taking action.',
        ]} />
      </>
    ),
  },
  {
    title: 'Suspension and Termination',
    content: (
      <>
        <P>We may suspend or terminate your access to the platform in the following situations:</P>
        <BulletList items={[
          '<strong>Payment failure:</strong> If subscription fees remain unpaid after the due date.',
          '<strong>Policy violation:</strong> If you use the platform in a fraudulent, unlawful, or abusive manner.',
          '<strong>Security threat:</strong> If we reasonably believe your account, data, or use of the platform presents a security risk.',
          '<strong>Legal or regulatory direction:</strong> If we are required to do so by law, court order, or regulatory authority.',
          '<strong>Material breach:</strong> If you materially breach these Terms and fail to cure the breach within a reasonable period after notice, where cure is possible.',
        ]} />
        <P>
          Upon termination, your right to access the platform ends. We may retain certain data for a limited
          period after termination for backup, export, support, dispute resolution, or legal retention
          purposes.
        </P>
        <P>Where we offer export access, it may be available only for a limited time after termination or expiry.</P>
      </>
    ),
  },
  {
    title: 'Dispute Resolution and Governing Law',
    content: (
      <>
        <P>
          These Terms are governed by and construed in accordance with the laws of <strong>India</strong>.
          Any dispute arising from or in connection with these Terms or the use of the Complyra platform
          shall be subject to the exclusive jurisdiction of the competent courts in <strong>Pune, Maharashtra, India</strong>,
          unless applicable law requires otherwise.
        </P>
        <P>
          Before initiating formal proceedings, the parties should first attempt to resolve the dispute in good faith by contacting <a href="mailto:admin@complyra.in">admin@complyra.in</a>.
        </P>
        <P>These Terms are drafted in English. If a translation is provided, the English version will control in case of inconsistency.</P>
      </>
    ),
  },
  {
    title: 'Contact and Notices',
    content: (
      <ContactBox lines={[
        'Complyra Technologies',
        'Support: admin@complyra.in',
//         'DPIIT-recognised startup | Pune, Maharashtra, India',
//         'CIN / GSTIN: [Insert legal entity details]',
      ]} />
    ),
  },
];

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ background: BG, minHeight: '100vh' }}>
      <Header style={{
        position: 'sticky', top: 0, zIndex: 1000,
        background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e8ecf4', boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        padding: '0 24px', height: 64, lineHeight: '64px',
      }}>
        <div style={{ ...containerStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <div style={{ width: 32, height: 32, background: `linear-gradient(135deg, ${BRAND}, #0958d9)`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SafetyOutlined style={{ color: '#fff', fontSize: 16 }} />
            </div>
            <Text style={{ fontSize: 20, fontWeight: 800, color: DARK, letterSpacing: -0.5 }}>Complyra</Text>
          </div>
          <span onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6b7a99', fontSize: 14, cursor: 'pointer' }}>
            <ArrowLeftOutlined /> Back
          </span>
        </div>
      </Header>

      <Content>
        <div style={{ background: 'linear-gradient(160deg, #051226 0%, #0a1f3d 60%, #0d2b54 100%)', padding: '64px 24px 52px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(22,119,255,0.12)', border: '1px solid rgba(22,119,255,0.3)', borderRadius: 20, color: '#69b1ff', fontSize: 12, fontWeight: 600, letterSpacing: 0.4, padding: '5px 16px', marginBottom: 20 }}>
            LEGAL DOCUMENT
          </div>
          <Title level={1} style={{ color: '#fff', fontSize: 40, fontWeight: 800, marginBottom: 12, letterSpacing: -1 }}>
            Terms &amp; Conditions
          </Title>
          <Text style={{ color: '#8fafd8', fontSize: 15 }}>
            Effective Date: 25 May 2026 &nbsp;·&nbsp; Governing Law: India &nbsp;·&nbsp; Version 1.0 — MVP
          </Text>
        </div>

        <div style={{ ...containerStyle, padding: '52px 32px 80px' }}>
          {sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 44 }}>
              <Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: BRAND, display: 'block', marginBottom: 6 }}>
                Section {String(i + 1).padStart(2, '0')}
              </Text>
              <Title level={3} style={{ color: DARK, fontWeight: 700, fontSize: 20, marginBottom: 16, marginTop: 0 }}>
                {s.title}
              </Title>
              {s.content}
              {i < sections.length - 1 && <Divider style={{ marginTop: 44, borderColor: '#e8ecf4' }} />}
            </div>
          ))}
        </div>
      </Content>

      <Footer style={{ background: '#040d1a', padding: '28px 24px', textAlign: 'center' }}>
        <Text style={{ color: '#3d5570', fontSize: 13 }}>
          © 2026 Complyra Technologies. All rights reserved. &nbsp;|&nbsp;
          <span onClick={() => navigate('/privacy-policy')} style={{ color: '#4a6080', cursor: 'pointer', textDecoration: 'underline' }}>Privacy Policy</span>
          &nbsp;|&nbsp;
          <span onClick={() => navigate('/acceptable-use')} style={{ color: '#4a6080', cursor: 'pointer', textDecoration: 'underline' }}>Acceptable Use Policy</span>
        </Text>
      </Footer>
    </Layout>
  );
};

export default TermsAndConditions;