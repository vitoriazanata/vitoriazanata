import React from 'react'
import { Users, CheckSquare, StickyNote, Trello, Cpu, LayoutDashboard } from 'lucide-react'

const NAV = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'members', icon: Users, label: 'Members' },
  { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
  { id: 'notes', icon: StickyNote, label: 'Notes' },
  { id: 'jira', icon: Trello, label: 'Jira' },
  { id: 'ai', icon: Cpu, label: 'AI Commands' },
]

export default function Sidebar({ active, onChange, me }) {
  return (
    <aside style={{
      width: 220, flexShrink: 0,
      background: 'var(--bg2)', borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      padding: '0',
      position: 'sticky', top: 0, height: '100vh',
    }}>
      <div style={{ padding: '22px 20px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em' }}>
          Team Dashboard
        </div>
        {me && (
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 3 }}>
            Welcome back, {me.name} 👋
          </div>
        )}
      </div>

      <nav style={{ flex: 1, padding: '10px 10px' }}>
        {NAV.map(({ id, icon: Icon, label }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-sm)',
                fontSize: 13, fontWeight: isActive ? 500 : 400,
                color: isActive ? 'var(--accent2)' : 'var(--text2)',
                background: isActive ? 'var(--accent-bg)' : 'transparent',
                border: isActive ? '1px solid var(--accent-border)' : '1px solid transparent',
                marginBottom: 2, transition: 'all 0.15s', textAlign: 'left',
              }}
            >
              <Icon size={15} strokeWidth={isActive ? 2 : 1.5} />
              {label}
              {id === 'jira' && (
                <span style={{
                  marginLeft: 'auto', fontSize: 9, padding: '1px 5px',
                  background: 'var(--amber-bg)', color: 'var(--amber)',
                  borderRadius: 20, fontWeight: 600, letterSpacing: '0.03em'
                }}>SETUP</span>
              )}
            </button>
          )
        })}
      </nav>

      <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border)' }}>
        <div style={{ fontSize: 11, color: 'var(--text3)' }}>
          Powered by Claude AI
        </div>
      </div>
    </aside>
  )
}
