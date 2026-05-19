import React from 'react'
import { Users, CheckSquare, StickyNote, TrendingUp } from 'lucide-react'
import { AVATAR_COLORS } from '../store/data'

function Metric({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: 'var(--text2)' }}>{label}</span>
        <Icon size={14} color={color || 'var(--text3)'} />
      </div>
      <div style={{ fontSize: 28, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.02em' }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text3)' }}>{sub}</div>}
    </div>
  )
}

export default function Overview({ members, tasks, notes }) {
  const online = members.filter(m => m.status === 'online').length
  const openTasks = tasks.filter(t => t.status !== 'done').length
  const doneTasks = tasks.filter(t => t.status === 'done').length
  const highPriority = tasks.filter(t => t.priority === 'high' && t.status !== 'done').length

  const depts = [...new Set(members.map(m => m.dept))]
  const recentMembers = [...members].slice(-5).reverse()

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>Overview</h2>
        <p style={{ fontSize: 13, color: 'var(--text2)', marginTop: 2 }}>Your team at a glance</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        <Metric icon={Users} label="Total members" value={members.length} sub={`${depts.length} departments`} color="var(--accent2)" />
        <Metric icon={TrendingUp} label="Online now" value={online} sub={`${Math.round(online/members.length*100)}% of team`} color="var(--green)" />
        <Metric icon={CheckSquare} label="Open tasks" value={openTasks} sub={`${highPriority} high priority`} color="var(--amber)" />
        <Metric icon={StickyNote} label="Completed tasks" value={doneTasks} sub={`${notes.length} notes saved`} color="var(--blue)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14, color: 'var(--text2)' }}>Team members</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {members.slice(0, 7).map(m => {
              const colors = AVATAR_COLORS[m.colorIdx % AVATAR_COLORS.length]
              const initials = m.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
              return (
                <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="avatar" style={{ background: colors.bg, color: colors.text, width: 28, height: 28, fontSize: 10 }}>{initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: m.isMe ? 500 : 400 }}>{m.name}{m.isMe && <span style={{ fontSize: 10, color: 'var(--accent2)', marginLeft: 6 }}>you</span>}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>{m.role}</div>
                  </div>
                  <div className={`dot dot-${m.status}`} />
                </div>
              )
            })}
            {members.length > 7 && (
              <div style={{ fontSize: 12, color: 'var(--text3)', paddingTop: 2 }}>+{members.length - 7} more</div>
            )}
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14, color: 'var(--text2)' }}>Recent tasks</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {tasks.slice(0, 6).map(t => {
              const member = members.find(m => m.id === t.memberId)
              const priorityColor = t.priority === 'high' ? 'var(--red)' : t.priority === 'medium' ? 'var(--amber)' : 'var(--green)'
              return (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 3, height: 30, borderRadius: 2, background: priorityColor, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>{member?.name} · {t.tag}</div>
                  </div>
                  <span className={`badge badge-${t.status === 'done' ? 'green' : t.status === 'inprogress' ? 'blue' : 'gray'}`} style={{ fontSize: 10 }}>
                    {t.status === 'inprogress' ? 'in progress' : t.status}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
