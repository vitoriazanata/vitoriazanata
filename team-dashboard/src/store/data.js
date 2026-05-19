export const AVATAR_COLORS = [
  { bg: '#2d1f6e', text: '#a89cff' },
  { bg: '#0f3d2e', text: '#3ecf8e' },
  { bg: '#3d1a0f', text: '#f5a623' },
  { bg: '#1a0f3d', text: '#5b9cf6' },
  { bg: '#3d0f2a', text: '#f472b6' },
  { bg: '#0f2d3d', text: '#67e8f9' },
  { bg: '#1e3a1e', text: '#86efac' },
  { bg: '#3d2d0f', text: '#fcd34d' },
]

export const initialMembers = [
  { id: 1, name: 'Vitoria', role: 'Team Lead', dept: 'Management', status: 'online', colorIdx: 0, isMe: true },
  { id: 2, name: 'Alice Rocha', role: 'Lead Engineer', dept: 'Engineering', status: 'online', colorIdx: 1 },
  { id: 3, name: 'Bruno Martins', role: 'Backend Dev', dept: 'Engineering', status: 'online', colorIdx: 2 },
  { id: 4, name: 'Camila Ferreira', role: 'Frontend Dev', dept: 'Engineering', status: 'busy', colorIdx: 3 },
  { id: 5, name: 'Diego Lima', role: 'UX Designer', dept: 'Design', status: 'offline', colorIdx: 4 },
  { id: 6, name: 'Elena Silva', role: 'Product Designer', dept: 'Design', status: 'online', colorIdx: 5 },
  { id: 7, name: 'Felipe Nunes', role: 'QA Engineer', dept: 'Engineering', status: 'away', colorIdx: 6 },
  { id: 8, name: 'Daniel Senna', role: 'Data Analyst', dept: 'Data', status: 'online', colorIdx: 7 },
  { id: 9, name: 'Rafael Stettiner', role: 'Data Analyst', dept: 'Data', status: 'online', colorIdx: 0 },
  { id: 10, name: 'Leonardo Neute', role: 'Data Analyst', dept: 'Data', status: 'online', colorIdx: 1 },
  { id: 11, name: 'Bernardo Savieri', role: 'Data Analyst', dept: 'Data', status: 'online', colorIdx: 2 },
  { id: 12, name: 'Heitor Haruo', role: 'Data Analyst', dept: 'Data', status: 'online', colorIdx: 3 },
  { id: 13, name: 'Lucas del Poggetto', role: 'Data Analyst', dept: 'Data', status: 'online', colorIdx: 4 },
]

export const initialTasks = [
  { id: 1, title: 'Set up CI/CD pipeline', memberId: 3, priority: 'high', status: 'todo', due: '2025-05-21', tag: 'Engineering' },
  { id: 2, title: 'Redesign onboarding flow', memberId: 5, priority: 'high', status: 'todo', due: '2025-05-22', tag: 'Design' },
  { id: 3, title: 'Write API docs', memberId: 2, priority: 'medium', status: 'todo', due: '2025-05-23', tag: 'Engineering' },
  { id: 4, title: 'Auth module refactor', memberId: 4, priority: 'high', status: 'inprogress', due: '2025-05-20', tag: 'Engineering' },
  { id: 5, title: 'Dashboard UI', memberId: 4, priority: 'medium', status: 'inprogress', due: '2025-05-21', tag: 'Design' },
  { id: 6, title: 'Unit test coverage', memberId: 7, priority: 'medium', status: 'inprogress', due: '2025-05-22', tag: 'QA' },
  { id: 7, title: 'Sprint planning', memberId: 2, priority: 'low', status: 'done', due: '2025-05-16', tag: 'Planning' },
  { id: 8, title: 'Bug fix #214', memberId: 3, priority: 'medium', status: 'done', due: '2025-05-15', tag: 'Engineering' },
]

export const initialNotes = [
  { id: 1, content: 'Sprint review on Friday — remind everyone to prep demos.', createdAt: '2025-05-17T10:00:00Z', pinned: true },
  { id: 2, content: 'Check Jira board before Monday standup.', createdAt: '2025-05-16T09:00:00Z', pinned: false },
]
