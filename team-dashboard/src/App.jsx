import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Overview from './components/Overview'
import Members from './components/Members'
import Tasks from './components/Tasks'
import Notes from './components/Notes'
import Jira from './components/Jira'
import AICommands from './components/AICommands'
import { useDashboard } from './hooks/useDashboard'

export default function App() {
  const [tab, setTab] = useState('overview')
  const db = useDashboard()
  const me = db.members.find(m => m.isMe)

  const renderPanel = () => {
    switch (tab) {
      case 'overview': return <Overview members={db.members} tasks={db.tasks} notes={db.notes} />
      case 'members': return <Members members={db.members} tasks={db.tasks} addMember={db.addMember} removeMember={db.removeMember} />
      case 'tasks': return <Tasks members={db.members} tasks={db.tasks} addTask={db.addTask} removeTask={db.removeTask} updateTask={db.updateTask} />
      case 'notes': return <Notes notes={db.notes} addNote={db.addNote} removeNote={db.removeNote} toggleNotePin={db.toggleNotePin} />
      case 'jira': return <Jira />
      case 'ai': return (
        <AICommands
          members={db.members} tasks={db.tasks} notes={db.notes}
          addMember={db.addMember} removeMember={db.removeMember}
          addTask={db.addTask} removeTask={db.removeTask} updateTask={db.updateTask}
          addNote={db.addNote}
        />
      )
      default: return null
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar active={tab} onChange={setTab} me={me} />
      <main style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
        {renderPanel()}
      </main>
    </div>
  )
}
