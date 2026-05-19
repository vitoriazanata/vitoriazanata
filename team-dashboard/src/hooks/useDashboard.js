import { useState, useCallback } from 'react'
import { initialMembers, initialTasks, initialNotes } from '../store/data'

let nextId = 100

export function useDashboard() {
  const [members, setMembers] = useState(initialMembers)
  const [tasks, setTasks] = useState(initialTasks)
  const [notes, setNotes] = useState(initialNotes)

  const addMember = useCallback((member) => {
    setMembers(prev => [...prev, { ...member, id: ++nextId }])
  }, [])

  const removeMember = useCallback((id) => {
    setMembers(prev => prev.filter(m => m.id !== id))
    setTasks(prev => prev.filter(t => t.memberId !== id))
  }, [])

  const updateMember = useCallback((id, updates) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m))
  }, [])

  const addTask = useCallback((task) => {
    setTasks(prev => [...prev, { ...task, id: ++nextId }])
  }, [])

  const removeTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }, [])

  const updateTask = useCallback((id, updates) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
  }, [])

  const addNote = useCallback((content) => {
    setNotes(prev => [{ id: ++nextId, content, createdAt: new Date().toISOString(), pinned: false }, ...prev])
  }, [])

  const removeNote = useCallback((id) => {
    setNotes(prev => prev.filter(n => n.id !== id))
  }, [])

  const toggleNotePin = useCallback((id) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n))
  }, [])

  return {
    members, tasks, notes,
    addMember, removeMember, updateMember,
    addTask, removeTask, updateTask,
    addNote, removeNote, toggleNotePin,
  }
}
