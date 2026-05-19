import React, { useState, useRef, useEffect } from 'react'
import { Send, Cpu, Lightbulb } from 'lucide-react'

const EXAMPLES = [
  'Put Lucas a task to check some merchant approval rate',
  'Add Daniel Senna a high priority task: review Q2 data pipeline',
  'Mark the CI/CD pipeline task as done',
  'Add a note: team sync moved to Thursday',
  'Add a new member: João Costa, Backend Dev, Engineering',
  'Remove the accessibility audit task',
]

export default function AICommands({ members, tasks, notes, addMember, removeMember, addTask, removeTask, updateTask, addNote }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hey! I can control your dashboard via natural language. Try something like "Put Lucas a task to check some merchant approval rate" or "Add a note: standup moved to 10am".' }
  ])
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState(localStorage.getItem('claude_api_key') || '')
  const [showKeyInput, setShowKeyInput] = useState(!localStorage.getItem('claude_api_key'))
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const saveKey = (k) => {
    localStorage.setItem('claude_api_key', k)
    setApiKey(k)
    setShowKeyInput(false)
  }

  const buildContext = () => `
You are a dashboard assistant. Based on the user's natural language command, return a JSON action object.

Current state:
- Members: ${JSON.stringify(members.map(m => ({ id: m.id, name: m.name, role: m.role, dept: m.dept })))}
- Tasks: ${JSON.stringify(tasks.map(t => ({ id: t.id, title: t.title, memberId: t.memberId, status: t.status, priority: t.priority })))}

Return ONLY valid JSON with this shape:
{
  "action": "add_task" | "remove_task" | "update_task" | "add_member" | "remove_member" | "add_note",
  "data": { ...relevant fields },
  "message": "human-readable confirmation"
}

For add_task: data = { title, memberId (match by name), priority ("low"|"medium"|"high"), status ("todo"|"inprogress"|"done"), tag, due }
For remove_task: data = { id } (match by title if needed)
For update_task: data = { id, ...fields to update }
For add_member: data = { name, role, dept, status: "online", colorIdx: ${members.length % 8} }
For remove_member: data = { id } (match by name)
For add_note: data = { content }

Match member names partially and case-insensitively. If no member found for a task, set memberId to null.
`

  const executeAction = (parsed) => {
    const { action, data } = parsed
    if (action === 'add_task') {
      addTask({ title: data.title, memberId: data.memberId, priority: data.priority || 'medium', status: data.status || 'todo', tag: data.tag || '', due: data.due || '' })
    } else if (action === 'remove_task') {
      removeTask(data.id)
    } else if (action === 'update_task') {
      updateTask(data.id, data)
    } else if (action === 'add_member') {
      addMember(data)
    } else if (action === 'remove_member') {
      removeMember(data.id)
    } else if (action === 'add_note') {
      addNote(data.content)
    }
  }

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 500,
          system: buildContext(),
          messages: [{ role: 'user', content: userMsg }],
        }),
      })

      const data = await res.json()
      const text = data.content?.[0]?.text || ''

      try {
        const clean = text.replace(/```json|```/g, '').trim()
        const parsed = JSON.parse(clean)
        executeAction(parsed)
        setMessages(prev => [...prev, { role: 'assistant', content: parsed.message || 'Done!', action: parsed.action }])
      } catch {
        setMessages(prev => [...prev, { role: 'assistant', content: text || 'Sorry, I could not parse that command. Try rephrasing.' }])
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error connecting to Claude API. Check your API key.' }])
    }
    setLoading(false)
  }

  if (showKeyInput) {
    return (
      <div className="fade-in">
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>AI Commands</h2>
          <p style={{ fontSize: 13, color: 'var(--text2)', marginTop: 2 }}>Control your dashboard with natural language</p>
        </div>
        <div className="card" style={{ maxWidth: 480 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Cpu size={18} color="var(--accent2)" />
            <span style={{ fontSize: 14, fontWeight: 500 }}>Connect Claude API</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 16, lineHeight: 1.6 }}>
            To use AI commands, you need a Claude API key from Anthropic. Your key is stored locally in your browser only.
          </p>
          <div className="form-group">
            <label className="form-label">API key</label>
            <input type="text" placeholder="sk-ant-…" id="key-input" />
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button className="btn btn-primary" onClick={() => {
              const k = document.getElementById('key-input').value.trim()
              if (k) saveKey(k)
            }}>Save & continue</button>
            <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--accent2)', textDecoration: 'none', marginTop: 8 }}>
              Get an API key →
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>AI Commands</h2>
          <p style={{ fontSize: 13, color: 'var(--text2)', marginTop: 2 }}>Type a command to update your dashboard</p>
        </div>
        <button className="btn" style={{ fontSize: 11 }} onClick={() => setShowKeyInput(true)}>Change API key</button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {EXAMPLES.map((ex, i) => (
          <button key={i} className="btn" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => setInput(ex)}>
            <Lightbulb size={10} /> {ex}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '78%', padding: '10px 14px', borderRadius: 12,
              background: m.role === 'user' ? 'var(--accent)' : 'var(--bg3)',
              color: m.role === 'user' ? '#fff' : 'var(--text)',
              fontSize: 13, lineHeight: 1.5,
              borderBottomRightRadius: m.role === 'user' ? 3 : 12,
              borderBottomLeftRadius: m.role === 'assistant' ? 3 : 12,
            }}>
              {m.content}
              {m.action && <div style={{ fontSize: 10, marginTop: 4, color: 'rgba(255,255,255,0.6)' }}>action: {m.action}</div>}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex' }}>
            <div style={{ background: 'var(--bg3)', padding: '10px 14px', borderRadius: '12px 12px 12px 3px', fontSize: 13, color: 'var(--text3)' }}>
              Thinking…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          placeholder='e.g. "Put Lucas a task to check merchant approval rate"'
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') send() }}
          style={{ flex: 1 }}
        />
        <button className="btn btn-primary" onClick={send} disabled={loading || !input.trim()}>
          <Send size={14} />
        </button>
      </div>
    </div>
  )
}
