import React, { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

const COLUMNS = [
  { key: 'todo', label: 'To do', color: 'var(--text3)' },
  { key: 'inprogress', label: 'In progress', color: 'var(--blue)' },
  { key: 'done', label: 'Done', color: 'var(--green)' },
]
const PRIORITIES = ['low', 'medium', 'high']
const PRIORITY_COLOR = { high: 'var(--red)', medium: 'var(--amber)', low: 'var(--green)' }
const PRIORITY_BADGE = { high: 'badge-red', medium: 'badge-amber', low: 'badge-green' }

function TaskModal({ members, onClose, onAdd }) {
  const [form, setForm] = useState({
    title: '', memberId: members[0]?.id || '', priority: 'medium',
    status: 'todo', due: '', tag: ''
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal slide-up" onClick={e => e.stopPropagation()}>
        <div className="modal-title">New task</div>
        <div className="form-group">
          <label className="form-label">Task title</label>
          <input type="text" placeholder="What needs to be done?" value={form.title} onChange={e => set('title', e.target.value)} autoFocus />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Assign to</label>
            <select value={form.memberId} onChange={e => set('memberId', Number(e.target.value))} style={{ width: '100%' }}>
              {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Priority</label>
            <select value={form.priority} onChange={e => set('priority', e.target.value)} style={{ width: '100%' }}>
              {PRIORITIES.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Status</label>
            <select value={form.status} onChange={e => set('status', e.target.value)} style={{ width: '100%' }}>
              {COLUMNS.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Tag</label>
            <input type="text" placeholder="e.g. Engineering" value={form.tag} onChange={e => set('tag', e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Due date</label>
          <input type="text" placeholder="e.g. May 25" value={form.due} onChange={e => set('due', e.target.value)} />
        </div>
        <div className="modal-actions">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => { if (form.title.trim()) { onAdd(form); onClose() } }}>
            Create task
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Tasks({ members, tasks, addTask, removeTask, updateTask }) {
  const [showModal, setShowModal] = useState(false)
  const [memberFilter, setMemberFilter] = useState('')

  const filtered = memberFilter ? tasks.filter(t => t.memberId === Number(memberFilter)) : tasks

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>Tasks</h2>
          <p style={{ fontSize: 13, color: 'var(--text2)', marginTop: 2 }}>{tasks.filter(t => t.status !== 'done').length} open · {tasks.filter(t => t.status === 'done').length} done</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <select value={memberFilter} onChange={e => setMemberFilter(e.target.value)}>
            <option value="">All members</option>
            {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={14} /> New task
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {COLUMNS.map(col => {
          const colTasks = filtered.filter(t => t.status === col.key)
          return (
            <div key={col.key}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 10, padding: '6px 10px',
                background: 'var(--bg3)', borderRadius: 'var(--radius-sm)',
              }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: col.color }}>{col.label}</span>
                <span style={{ fontSize: 11, background: 'var(--bg4)', color: 'var(--text3)', borderRadius: 20, padding: '1px 7px' }}>{colTasks.length}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {colTasks.map(task => {
                  const member = members.find(m => m.id === task.memberId)
                  return (
                    <div key={task.id} className="card" style={{
                      padding: '12px 14px',
                      borderLeft: `3px solid ${PRIORITY_COLOR[task.priority]}`,
                      borderRadius: 'var(--radius)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6, marginBottom: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4 }}>{task.title}</span>
                        <button className="btn btn-ghost" style={{ padding: '2px 4px', color: 'var(--text3)', flexShrink: 0 }} onClick={() => removeTask(task.id)}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: 'center' }}>
                        {member && <span className="badge badge-gray" style={{ fontSize: 10 }}>{member.name}</span>}
                        {task.tag && <span className="badge badge-accent" style={{ fontSize: 10 }}>{task.tag}</span>}
                        <span className={`badge ${PRIORITY_BADGE[task.priority]}`} style={{ fontSize: 10 }}>{task.priority}</span>
                        {task.due && <span style={{ fontSize: 10, color: 'var(--text3)', marginLeft: 'auto' }}>{task.due}</span>}
                      </div>
                      {col.key !== 'done' && (
                        <div style={{ marginTop: 8, display: 'flex', gap: 4 }}>
                          {COLUMNS.filter(c => c.key !== col.key).map(c => (
                            <button key={c.key} className="btn" style={{ fontSize: 10, padding: '3px 8px' }}
                              onClick={() => updateTask(task.id, { status: c.key })}>
                              → {c.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
                {colTasks.length === 0 && (
                  <div style={{ fontSize: 12, color: 'var(--text3)', textAlign: 'center', padding: '20px 0', border: '1px dashed var(--border)', borderRadius: 'var(--radius)' }}>
                    No tasks
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {showModal && <TaskModal members={members} onClose={() => setShowModal(false)} onAdd={addTask} />}
    </div>
  )
}
