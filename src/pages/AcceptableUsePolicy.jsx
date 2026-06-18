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
    title: 'Purpose of This Policy',
    content: (
      <>
        <P>
          This Acceptable Use Policy ("AUP") describes the rules that apply when you use the Complyra
          platform. It is intended to help protect the platform, our customers, and the integrity of the
          compliance workflows supported by the service.
        </P>
        <P>
          By using the platform, you agree to follow this AUP in addition to our Terms and Conditions and
          Privacy Policy.
        </P>
      </>
    ),
  },
  {
    title: 'Prohibited Uses',
    content: (
      <>
        <P>You must not use the Complyra platform to do any of the following:</P>
        <BulletList items={[
          'Upload fabricated, synthetic, manipulated, or knowingly inaccurate transaction data or customer data.',
          'Use the platform for unlawful, fraudulent, deceptive, or abusive activity.',
          'Attempt to access data, records, or accounts belonging to another organisation or tenant.',
          'Bypass or attempt to bypass access controls, rate limits, session limits, audit logging, or account restrictions.',
          'Reverse engineer, decompile, disassemble, probe, or attempt to extract source code, model logic, rule logic, or proprietary workflows from the platform.',
          'Upload malware, ransomware, malicious scripts, executable files, or any content intended to compromise the platform or other users.',
          'Use automated scraping, crawling, bulk extraction, or API abuse beyond documented limits or approved integrations.',
          'Submit knowingly false, misleading, or malicious compliance outputs, including false alerts or reports.',
          'Use production data, customer data, or PAN details for testing unless you are authorised to do so and you have applied proper masking or anonymisation where required.',
        ]} />
      </>
    ),
  },
  {
    title: 'Customer Data Rules',
    content: (
      <>
        <P>
          You are responsible for ensuring that any data uploaded to the platform has been collected and
          shared lawfully, and that you have the right to use it for your compliance purposes.
        </P>
        <BulletList items={[
          'Do not upload data you are not authorised to process.',
          'Do not use the platform to process data unrelated to your compliance workflow without approval from your organisation and, where needed, legal review.',
          'Do not upload personal data into test environments unless it is strictly necessary and properly protected.',
          'Do not store secrets, passwords, private keys, or unrelated confidential documents in free-text notes or unsupported fields.',
        ]} />
        <InfoBox color="#fffbe6" borderColor="#ffe58f" titleColor="#874d00" title="Testing Guidance">
          <Paragraph style={{ color: '#7c5308', fontSize: 14, marginBottom: 0 }}>
            For MVP testing, prefer masked, dummy, or synthetic records. Production customer data should only
            be used in a live organisation account with appropriate access controls and internal approval.
          </Paragraph>
        </InfoBox>
      </>
    ),
  },
  {
    title: 'Security and Access',
    content: (
      <>
        <P>You must keep your account credentials secure and must not share them with unauthorised persons.</P>
        <BulletList items={[
                             'Use strong, unique passwords for platform access and comply with any password-strength requirements enforced by the platform.',
                             'Do not share login credentials between users.',
                             'Do not attempt to bypass account lockout, login throttling, session expiry, or token security controls.',
                             'Promptly remove access for users who leave your organisation or no longer need access.',
                             'Immediately notify us if you suspect unauthorised access, credential compromise, or suspicious platform activity.',
                             'Do not disable or interfere with security features, logging, cookie handling, encryption controls, or access control mechanisms.',
                           ]} />
        <InfoBox color="#f0f9f0" borderColor="#b7eb8f" titleColor="#389e0d" title="Platform Security Controls">
          <Paragraph style={{ color: '#2e7d0a', fontSize: 14, marginBottom: 0 }}>
            We may enforce authentication controls, role-based access, logging, and request throttling to
            help protect the service and customer data. No security measure can guarantee absolute protection.
          </Paragraph>
        </InfoBox>
      </>
    ),
  },
  {
    title: 'Rate Limits and Fair Use',
    content: (
      <>
        <P>We may apply rate limits, quotas, and other usage controls to preserve platform stability and fairness across customers.</P>
        <DataTable
          headers={['Limit Type', 'MVP Guidance', 'Notes']}
          rows={[
            ['CSV upload size', 'As configured by plan or environment', 'Large files may be rejected, split, or queued for processing'],
            ['API requests', 'Subject to documented throttling', 'May vary by tenant, route, workflow, or integration'],
            ['Login attempts', 'Subject to lockout or temporary delay after repeated failures', 'Designed to reduce brute-force and credential abuse risk'],
            ['Password reset and auth flows', 'May be rate-limited or time-bound', 'Used to protect account recovery and session security'],
            ['Export requests', 'May be limited to prevent abuse or excessive load', 'Support can assist with approved bulk exports'],
          ]}
        />
        <P>
          We may change rate limits or introduce additional safeguards if necessary to protect the platform,
          comply with law, or support service quality.
        </P>
      </>
    ),
  },
  {
    title: 'Monitoring and Enforcement',
    content: (
      <>
        <P>
          We may monitor platform use for security, abuse prevention, debugging, quality control, and
          compliance with this AUP.
        </P>
        <BulletList items={[
          'We may investigate suspected violations of this AUP.',
          'We may remove or disable content that appears to violate this AUP or applicable law.',
          'We may suspend, restrict, or terminate access if we reasonably believe a violation has occurred or if continued access would create risk to the platform or other users.',
          'Where appropriate, we may preserve logs or evidence and cooperate with lawful requests from authorities.',
        ]} />
      </>
    ),
  },
  {
    title: 'Incident Reporting',
    content: (
      <>
        <P>If you suspect a security incident, unauthorised access, or misuse of the platform, notify us promptly.</P>
        <ContactBox lines={[
          'Security Contact: admin@complyra.in',
          'Subject: SECURITY INCIDENT — [Your Organisation Name]',
          'Include: what happened, when you noticed it, and which accounts or records may be affected',
        ]} />
      </>
    ),
  },
  {
    title: 'No Warranty of Compliance',
    content: (
      <>
        <P>
          The platform is designed to support compliance workflows, but it does not guarantee that your
          organisation will remain compliant with all applicable laws, regulations, circulars, or internal
          policies.
        </P>
        <P>
          Your organisation remains responsible for reviewing outputs, making final decisions, and ensuring
          that filings, approvals, retention, and escalation steps are handled correctly.
        </P>
      </>
    ),
  },
  {
    title: 'Changes to This Policy',
    content: (
      <>
        <P>We may update this AUP from time to time. If we make material changes, we will post the updated version on the platform or notify the registered account contact where appropriate.</P>
        <P>Continued use of the platform after the updated policy takes effect means you accept the revised AUP, to the extent permitted by law.</P>
      </>
    ),
  },
  {
    title: 'Contact Us',
    content: (
      <ContactBox lines={[
        'Complyra Technologies',
        'Support: admin@complyra.in',
        'Pune, Maharashtra, India',
      ]} />
    ),
  },
];

const AcceptableUsePolicy = () => {
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
            POLICY DOCUMENT
          </div>
          <Title level={1} style={{ color: '#fff', fontSize: 40, fontWeight: 800, marginBottom: 12, letterSpacing: -1 }}>
            Acceptable Use Policy
          </Title>
          <Text style={{ color: '#8fafd8', fontSize: 15 }}>
            Safe Usage Rules · Security Expectations · Rate Limits · Incident Reporting · Version 1.0 — MVP
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
          <span onClick={() => navigate('/terms-and-conditions')} style={{ color: '#4a6080', cursor: 'pointer', textDecoration: 'underline' }}>Terms &amp; Conditions</span>
        </Text>
      </Footer>
    </Layout>
  );
};

export default AcceptableUsePolicy;