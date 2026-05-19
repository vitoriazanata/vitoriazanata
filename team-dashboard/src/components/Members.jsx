import React, { useState } from 'react'
import { Plus, Trash2, Search } from 'lucide-react'
import { AVATAR_COLORS } from '../store/data'

const STATUSES = ['online', 'busy', 'away', 'offline']
const DEPTS = ['Engineering', 'Design', 'Data', 'Management', 'Product', 'QA', 'Marketing']

function MemberModal({ onClose, onAdd, existingCount }) {
  const [form, setForm] = useState({ name: '', role: '', dept: 'Engineering', status: 'online' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = () => {
    if (!form.name.trim()) return
    onAdd({ ...form, colorIdx: existingCount % AVATAR_COLORS.length })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal slide-up" onClick={e => e.stopPropagation()}>
        <div className="modal-title">Add team member</div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input type="text" placeholder="Full name" value={form.name} onChange={e => set('name', e.target.value)} autoFocus />
          </div>
          <div className="form-group">
            <label className="form-label">Role</label>
            <input type="text" placeholder="e.g. Data Analyst" value={form.role} onChange={e => set('role', e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Department</label>
            <select value={form.dept} onChange={e => set('dept', e.target.value)} style={{ width: '100%' }}>
              {DEPTS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select value={form.status} onChange={e => set('status', e.target.value)} style={{ width: '100%' }}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="modal-actions">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Add member</button>
        </div>
      </div>
    </div>
  )
}

export default function Members({ members, tasks, addMember, removeMember }) {
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('')

  const depts = [...new Set(members.map(m => m.dept))]
  const filtered = members.filter(m => {
    const q = search.toLowerCase()
    return (!q || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q))
      && (!deptFilter || m.dept === deptFilter)
  })

  const grouped = depts.reduce((acc, dept) => {
    const group = filtered.filter(m => m.dept === dept)
    if (group.length) acc[dept] = group
    return acc
  }, {})

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>Members</h2>
          <p style={{ fontSize: 13, color: 'var(--text2)', marginTop: 2 }}>{members.length} people across {depts.length} departments</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={14} /> Add member
        </button>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }} />
          <input type="text" placeholder="Search by name or role…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 32 }} />
        </div>
        <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
          <option value="">All departments</option>
          {depts.map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {Object.entries(grouped).map(([dept, group]) => (
          <div key={dept}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
              {dept} · {group.length}
            </div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {group.map((m, i) => {
                const colors = AVATAR_COLORS[m.colorIdx % AVATAR_COLORS.length]
                const initials = m.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
                const memberTasks = tasks.filter(t => t.memberId === m.id)
                const openCount = memberTasks.filter(t => t.status !== 'done').length

                return (
                  <div key={m.id} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                    borderBottom: i < group.length - 1 ? '1px solid var(--border)' : 'none',
                    transition: 'background 0.1s',
                  }}>
                    <div className="avatar" style={{ background: colors.bg, color: colors.text }}>{initials}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{m.name}</span>
                        {m.isMe && <span className="badge badge-accent" style={{ fontSize: 10 }}>you</span>}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text3)' }}>{m.role}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {openCount > 0 && (
                        <span className="badge badge-gray">{openCount} task{openCount !== 1 ? 's' : ''}</span>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text3)' }}>
                        <div className={`dot dot-${m.status}`} />
                        {m.status}
                      </div>
                      {!m.isMe && (
                        <button className="btn btn-ghost" style={{ padding: '4px 6px', color: 'var(--text3)' }}
                          onClick={() => { if (confirm(`Remove ${m.name}?`)) removeMember(m.id) }}>
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text3)', padding: '40px 0', fontSize: 13 }}>No members found</div>
        )}
      </div>

      {showModal && <MemberModal onClose={() => setShowModal(false)} onAdd={addMember} existingCount={members.length} />}
    </div>
  )
}
