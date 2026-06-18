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
            borderBottom: '2px solid #e8ecf4'
          }}>{h}</th>
        ))}</tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri}>{row.map((cell, ci) => (
            <td key={ci} style={{
              padding: '10px 14px', borderBottom: '1px solid #f0f2f5',
              verticalAlign: 'top', color: '#4a5568', lineHeight: 1.6
            }} dangerouslySetInnerHTML={{ __html: cell }} />
          ))}</tr>
        ))}
      </tbody>
    </table>
  </div>
);

const InfoBox = ({ color, borderColor, titleColor, title, children }) => (
  <div style={{ background: color, border: `1px solid ${borderColor}`, borderRadius: 10, padding: '14px 18px', marginTop: 12 }}>
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
    title: 'Who We Are',
    content: (
      <>
        <P>
          <strong>Complyra</strong> ("we", "our", "Platform") is a RegTech SaaS platform operated by{' '}
          <strong>Complyra Technologies</strong>, providing AML/CFT compliance workflow software and related services.
          automation services to Non-Banking Financial Companies (NBFCs) and other regulated financial
          entities in India.
        </P>
        <P>
          This Privacy Policy explains how we collect, use, store, disclose, and protect information when
          you use the Complyra platform accessible at app.complyra.in.
        </P>
        <InfoBox color="#fffbe6" borderColor="#ffe58f" titleColor="#874d00" title="B2B Platform Notice">
          <Paragraph style={{ color: '#7c5308', fontSize: 14, marginBottom: 0 }}>
            Complyra is a business-to-business (B2B) service. Your organisation is generally responsible
            for determining the lawful basis and instructions for end-customer data it uploads to the
            platform, including any notices or consents required under applicable law.
          </Paragraph>
        </InfoBox>
      </>
    ),
  },
  {
    title: 'Data We Collect',
    content: (
      <>
        <P>
          We collect only the data reasonably necessary to operate the platform, support your subscription,
          and provide the services you request.
        </P>
        <DataTable
          headers={['Category', 'Data Types', 'Source']}
          rows={[
            ['<strong>Organisation &amp; Account Data</strong>', 'Organisation name, GSTIN, CIN, registration details, registered address, authorised contact details, billing details', 'Provided during signup or account setup'],
            ['<strong>Platform User Data</strong>', 'Name, email address, role, password hash, password reset metadata, login history, account status and lockout events', 'Provided during onboarding or collected during account administration and authentication'],
            ['<strong>End-Customer Compliance Data</strong>', 'Customer name, customer code, PAN, risk score, KYC status, KYC dates, and similar compliance fields', 'Uploaded by your organisation'],
            ['<strong>Transaction Data</strong>', 'Transaction ID, amount, date, account references, counterparty details, risk flags, rule triggers, threshold outcomes, and related monitoring inputs', 'Uploaded by your organisation'],
            ['<strong>Alert, Case, and STR Draft Data</strong>', 'Alert records, case records, triggered rules, suggested activity type codes, rule explanations, draft narratives, notes, assignment history, and linked transaction IDs', 'Generated within the platform or entered by your organisation'],
            ['<strong>Audit and Security Logs</strong>', 'Login events, IP address, user actions, timestamps, token/session events, alert review actions, dismissals, and case conversion events', 'Automatically collected'],
            ['<strong>Billing Data</strong>', 'Subscription tier, invoice details, payment reference IDs, tax details', 'Collected through our billing provider'],
            ['<strong>Support Data</strong>', 'Messages, tickets, screenshots, and other information shared with support', 'Provided by you'],
          ]}
        />
      </>
    ),
  },
  {
    title: 'How We Use Data',
    content: (
      <>
        <P>
          We use data only for legitimate business and service purposes, including the following.
        </P>
        <BulletList items={[
                             '<strong>Platform delivery:</strong> To provide AML/CFT workflow features such as transaction monitoring, risk scoring, alert generation, case management, threshold configuration, and reporting.',
                             '<strong>Decision support:</strong> To generate suggested activity type codes, rule explanations, customer flag reasons, and draft narratives for authorised user review.',
                             '<strong>Account administration:</strong> To create and manage user accounts, authenticate users, enforce access control, process password resets, and manage subscriptions.',
                             '<strong>Security and abuse prevention:</strong> To monitor for suspicious access, apply account lockout or throttling controls, maintain logs, and secure the platform.',
                             '<strong>Compliance support:</strong> To generate reports, maintain audit trails, and support regulatory workflows requested by your organisation.',
                             '<strong>Billing and finance:</strong> To process subscription payments, issue invoices, and manage taxes.',
                             '<strong>Support and communication:</strong> To respond to questions, incident reports, and service notifications.',
                             '<strong>Legal obligations:</strong> To comply with applicable Indian laws, regulatory requirements, lawful requests, or court orders.',
                           ]} />
        <P>
          We do not sell personal data, and we do not use customer data for advertising. We also do not use
          uploaded compliance data to train third-party AI models for unrelated purposes.
        </P>
      </>
    ),
  },
  {
    title: 'Cookies and Sessions',
    content: (
      <>
        <P>
          Complyra uses session and authentication mechanisms needed to secure the platform. In the MVP
          version, we do not rely on advertising cookies or third-party behavioural tracking cookies.
        </P>
        <P>
          If we introduce analytics or similar tools later, we will update this policy and provide
          appropriate notice.
        </P>
      </>
    ),
  },
  {
    title: 'Storage and Security',
    content: (
      <>
        <P>
          We implement reasonable technical and organisational safeguards designed to protect data against
          unauthorised access, loss, misuse, or alteration.
        </P>
        <BulletList items={[
                             '<strong>Access controls:</strong> Role-based access and administrative restrictions.',
                             '<strong>Encryption:</strong> Encryption in transit and, where implemented, encryption at rest and encryption of generated reports or other sensitive compliance outputs.',
                             '<strong>Passwords:</strong> Passwords are stored using strong one-way hashing, not in plaintext, and password quality requirements may be enforced.',
                             '<strong>Authentication security:</strong> We may use secure cookie handling, session expiry controls, refresh token rotation, and account lockout or throttling measures.',
                             '<strong>Audit logging:</strong> Security and platform actions are logged for operational and compliance purposes.',
                             '<strong>Secure links:</strong> Time-limited links may be used for file access where applicable.',
                             '<strong>Infrastructure:</strong> We use cloud infrastructure and storage providers to operate the platform and maintain backups.',
                           ]} />
        <InfoBox color="#f0f9f0" borderColor="#b7eb8f" titleColor="#389e0d" title="India-Focused Hosting">
          <Paragraph style={{ color: '#2e7d0a', fontSize: 14, marginBottom: 0 }}>
            Where feasible and applicable to the service architecture, we aim to store primary production
            data in India. This statement does not apply to every vendor, backup, transit path, or support
            tool unless separately configured and verified.
          </Paragraph>
        </InfoBox>
      </>
    ),
  },
  {
    title: 'Third-Party Service Providers',
    content: (
      <>
        <P>
          We share data only with service providers and third parties that help us operate the platform or
          fulfil our legal and contractual obligations. Such parties are permitted to process data only for
          the purposes we authorise and subject to appropriate safeguards.
        </P>
        <DataTable
          headers={['Provider', 'Purpose', 'Data Shared', 'Data Location']}
          rows={[
            ['<strong>Razorpay</strong>', 'Subscription billing and payment processing', 'Billing name, email, amount, payment reference details', 'India'],
            ['<strong>Resend</strong>', 'Transactional emails such as alerts, invoices, and account notices', 'Recipient email address and message content necessary for delivery', 'May involve processing outside India depending on provider routing'],
            ['<strong>DigitalOcean</strong>', 'Cloud infrastructure, hosting, object storage, backups', 'Data required to run the platform', 'India region where configured'],
          ]}
        />
        <P>
          We do not disclose customer data to third parties for their independent marketing purposes. If a
          disclosure is required by law, regulation, or lawful order, we may provide the minimum information
          necessary to comply.
        </P>
      </>
    ),
  },
  {
    title: 'Data Retention and Deletion',
    content: (
      <BulletList items={[
        '<strong>Account and user data:</strong> Retained during the subscription term and for a limited period after cancellation for account closure, support, and legal recordkeeping.',
        '<strong>Transaction and audit records:</strong> Retained for the period required by applicable law or your contractual instructions.',
        '<strong>Compliance reports and generated alerts:</strong> Retained for the period required for regulatory, audit, or evidentiary purposes.',
        '<strong>Support communications:</strong> Retained for the time needed to resolve the issue and maintain service history.',
        '<strong>Backups:</strong> Retained for a limited period in line with our backup and disaster recovery practices.',
      ]} />
    ),
  },
  {
    title: 'Your Rights and Requests',
    content: (
      <>
        <P>
          Subject to applicable law, you may request access to, correction of, or deletion of personal data
          we hold about you, and you may also raise concerns about how we handle data.
        </P>
        <P>
          For B2B customer data, requests may need to be routed through the authorised representative of
          your organisation. Some data may not be deleted immediately if we are required to retain it for
          legal, security, or compliance reasons.
        </P>
        <ContactBox lines={[
          'Grievance Contact',
          'Complyra Technologies',
          'Email: admin@complyra.in',
          'Pune, Maharashtra, India',
        ]} />
      </>
    ),
  },
  {
    title: 'Security Incidents',
    content: (
      <P>
        If we become aware of a personal data breach, we will take reasonable steps to contain, investigate,
        and mitigate the incident and to notify affected parties or authorities where required by applicable
        law.
      </P>
    ),
  },
  {
    title: 'International Transfers',
    content: (
      <P>
        Our MVP is designed to support India-focused operations. If any data is processed or accessed
        outside India by a third-party service provider, it will be done only where permitted by applicable
        law and subject to appropriate safeguards.
      </P>
    ),
  },
  {
    title: 'Changes To This Policy',
    content: (
      <>
        <P>
          We may update this Privacy Policy from time to time to reflect changes in our product, security
          practices, legal requirements, or service providers.
        </P>
        <BulletList items={[
          'We will post the updated policy when it changes.',
          'Where appropriate, we may notify the registered account contact through the platform or by email.',
        ]} />
        <P>
          Your continued use of the platform after the effective date of the updated policy means you accept
          the revised version, to the extent permitted by law.
        </P>
      </>
    ),
  },
  {
    title: 'Contact Us',
    content: (
      <ContactBox lines={[
        'Complyra Technologies',
        'Support: admin@complyra.in',
//         'DPIIT-recognised startup | Pune, Maharashtra, India',
      ]} />
    ),
  },
];

const PrivacyPolicy = () => {
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
            Privacy Policy
          </Title>
          <Text style={{ color: '#8fafd8', fontSize: 15 }}>
            Effective Date: 25 May 2026 &nbsp;·&nbsp; Data Jurisdiction: India &nbsp;·&nbsp; Governed by applicable Indian data protection and security laws
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
          <span onClick={() => navigate('/terms-and-conditions')} style={{ color: '#4a6080', cursor: 'pointer', textDecoration: 'underline' }}>Terms &amp; Conditions</span>
          &nbsp;|&nbsp;
          <span onClick={() => navigate('/acceptable-use')} style={{ color: '#4a6080', cursor: 'pointer', textDecoration: 'underline' }}>Acceptable Use Policy</span>
        </Text>
      </Footer>
    </Layout>
  );
};

export default PrivacyPolicy;