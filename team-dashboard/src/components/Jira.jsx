import React, { useState } from 'react'
import { ExternalLink, Key, Globe, CheckCircle } from 'lucide-react'

const SETUP_STEPS = [
  {
    step: 1,
    title: 'Get your Jira API token',
    desc: 'Go to your Atlassian account settings and generate an API token.',
    link: 'https://id.atlassian.com/manage-profile/security/api-tokens',
    linkLabel: 'Atlassian API tokens →',
  },
  {
    step: 2,
    title: 'Find your Jira domain',
    desc: 'It\'s the subdomain in your Jira URL, e.g. your-company.atlassian.net',
  },
  {
    step: 3,
    title: 'Set environment variables',
    desc: 'Add the following to your .env file at the project root:',
    code: `VITE_JIRA_DOMAIN=your-company.atlassian.net
VITE_JIRA_EMAIL=you@yourcompany.com
VITE_JIRA_TOKEN=your_api_token_here
VITE_JIRA_PROJECT=YOUR_PROJECT_KEY`,
  },
  {
    step: 4,
    title: 'Install the Jira proxy (CORS)',
    desc: 'Jira\'s API blocks browser requests. Add a simple proxy via Vite config:',
    code: `// vite.config.js
server: {
  proxy: {
    '/jira-api': {
      target: 'https://your-company.atlassian.net',
      changeOrigin: true,
      rewrite: path => path.replace(/^\\/jira-api/, ''),
      headers: {
        Authorization: 'Basic ' + btoa(email + ':' + token)
      }
    }
  }
}`,
  },
  {
    step: 5,
    title: 'Redeploy on Vercel',
    desc: 'Add the env variables under Project → Settings → Environment Variables in Vercel, then redeploy.',
  },
]

const MOCK_TICKETS = [
  { key: 'TEAM-42', summary: 'Implement merchant approval rate endpoint', assignee: 'Lucas del Poggetto', status: 'In Progress', priority: 'High' },
  { key: 'TEAM-41', summary: 'Fix null pointer in payment service', assignee: 'Bruno Martins', status: 'To Do', priority: 'High' },
  { key: 'TEAM-39', summary: 'Update onboarding docs', assignee: 'Elena Silva', status: 'In Progress', priority: 'Medium' },
  { key: 'TEAM-38', summary: 'Add pagination to reports API', assignee: 'Camila Ferreira', status: 'Review', priority: 'Medium' },
  { key: 'TEAM-35', summary: 'Dashboard performance audit', assignee: 'Alice Rocha', status: 'Done', priority: 'Low' },
]

const STATUS_BADGE = {
  'In Progress': 'badge-blue', 'To Do': 'badge-gray', 'Done': 'badge-green', 'Review': 'badge-amber'
}

export default function Jira() {
  const [tab, setTab] = useState('preview')

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>Jira board</h2>
          <p style={{ fontSize: 13, color: 'var(--text2)', marginTop: 2 }}>Connect your Jira project to see live tickets</p>
        </div>
        <div style={{ display: 'flex', background: 'var(--bg3)', borderRadius: 'var(--radius-sm)', padding: 3, gap: 2 }}>
          {['preview', 'setup'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '5px 14px', borderRadius: 6, fontSize: 12, fontWeight: tab === t ? 500 : 400,
              background: tab === t ? 'var(--bg4)' : 'transparent',
              color: tab === t ? 'var(--text)' : 'var(--text3)',
              border: tab === t ? '1px solid var(--border)' : '1px solid transparent',
              transition: 'all 0.15s',
            }}>
              {t === 'preview' ? 'Preview (mock)' : 'Setup guide'}
            </button>
          ))}
        </div>
      </div>

      {tab === 'preview' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'var(--amber-bg)', border: '1px solid rgba(245,166,35,0.2)', borderRadius: 'var(--radius-sm)', marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: 'var(--amber)' }}>
              This is mock data. Connect your Jira account in the Setup guide tab to see real tickets.
            </span>
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 160px 120px 80px', gap: 12, padding: '10px 16px', borderBottom: '1px solid var(--border)', fontSize: 11, color: 'var(--text3)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              <span>Key</span><span>Summary</span><span>Assignee</span><span>Status</span><span>Priority</span>
            </div>
            {MOCK_TICKETS.map((t, i) => (
              <div key={t.key} style={{
                display: 'grid', gridTemplateColumns: '90px 1fr 160px 120px 80px', gap: 12,
                padding: '11px 16px', alignItems: 'center',
                borderBottom: i < MOCK_TICKETS.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <span style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--accent2)' }}>{t.key}</span>
                <span style={{ fontSize: 13 }}>{t.summary}</span>
                <span style={{ fontSize: 12, color: 'var(--text2)' }}>{t.assignee}</span>
                <span className={`badge ${STATUS_BADGE[t.status] || 'badge-gray'}`} style={{ fontSize: 11, width: 'fit-content' }}>{t.status}</span>
                <span style={{ fontSize: 12, color: t.priority === 'High' ? 'var(--red)' : t.priority === 'Medium' ? 'var(--amber)' : 'var(--text3)' }}>{t.priority}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'setup' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {SETUP_STEPS.map(s => (
            <div key={s.step} className="card" style={{ display: 'flex', gap: 16 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-bg)',
                color: 'var(--accent2)', fontSize: 13, fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>{s.step}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{s.title}</div>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{s.desc}</p>
                {s.code && (
                  <pre style={{
                    marginTop: 10, background: 'var(--bg)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)', padding: '10px 14px', fontSize: 12,
                    fontFamily: 'var(--mono)', color: 'var(--accent2)', overflowX: 'auto', lineHeight: 1.7,
                  }}>{s.code}</pre>
                )}
                {s.link && (
                  <a href={s.link} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8,
                    fontSize: 12, color: 'var(--accent2)', textDecoration: 'none',
                  }}>
                    <ExternalLink size={11} /> {s.linkLabel}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
