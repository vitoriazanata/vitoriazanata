import React, { useState } from 'react'
import { Plus, Trash2, Pin } from 'lucide-react'

export default function Notes({ notes, addNote, removeNote, toggleNotePin }) {
  const [draft, setDraft] = useState('')

  const sorted = [...notes].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))

  const handleAdd = () => {
    if (!draft.trim()) return
    addNote(draft.trim())
    setDraft('')
  }

  const fmt = (iso) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>Notes</h2>
        <p style={{ fontSize: 13, color: 'var(--text2)', marginTop: 2 }}>Quick notes for your team</p>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <textarea
          placeholder="Write a quick note…"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) handleAdd() }}
          style={{ background: 'transparent', border: 'none', padding: 0, resize: 'none', minHeight: 72, fontSize: 14 }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10, borderTop: '1px solid var(--border)', paddingTop: 10 }}>
          <button className="btn btn-primary" onClick={handleAdd} disabled={!draft.trim()}>
            <Plus size={13} /> Save note
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {sorted.map(note => (
          <div key={note.id} className="card" style={{
            borderColor: note.pinned ? 'var(--accent-border)' : 'var(--border)',
            position: 'relative',
          }}>
            {note.pinned && (
              <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 4 }}>
                <span style={{ fontSize: 10, color: 'var(--accent2)', background: 'var(--accent-bg)', padding: '1px 6px', borderRadius: 10 }}>pinned</span>
              </div>
            )}
            <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text)', marginBottom: 12, paddingRight: note.pinned ? 60 : 0 }}>{note.content}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, color: 'var(--text3)' }}>{fmt(note.createdAt)}</span>
              <div style={{ display: 'flex', gap: 4 }}>
                <button className="btn btn-ghost" style={{ padding: '3px 5px', color: note.pinned ? 'var(--accent2)' : 'var(--text3)' }} onClick={() => toggleNotePin(note.id)}>
                  <Pin size={12} />
                </button>
                <button className="btn btn-ghost" style={{ padding: '3px 5px', color: 'var(--text3)' }} onClick={() => removeNote(note.id)}>
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {notes.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text3)', padding: '40px 0', fontSize: 13 }}>
            No notes yet — add one above
          </div>
        )}
      </div>
    </div>
  )
}
