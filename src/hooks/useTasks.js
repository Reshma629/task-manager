import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const STORAGE_KEY = 'task_manager_tasks'

export default function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  // First visit: fetch starter data. Later visits: restore saved tasks.
  useEffect(() => {
    let cancelled = false

    async function loadTasks() {
      setLoading(true)
      setError(null)

      try {
        const savedTasks = localStorage.getItem(STORAGE_KEY)

        if (savedTasks !== null) {
          const parsedTasks = JSON.parse(savedTasks)
          if (!Array.isArray(parsedTasks)) {
            throw new Error('Saved task data is invalid. Clear the task_manager_tasks entry in localStorage and retry.')
          }
          if (!cancelled) setTasks(parsedTasks)
        } else {
          const response = await fetch('/tasks.json')
          if (!response.ok) {
            throw new Error(`Could not load tasks.json (HTTP ${response.status}).`)
          }

          const starterTasks = await response.json()
          if (!Array.isArray(starterTasks)) {
            throw new Error('tasks.json must contain an array of tasks.')
          }
          if (!cancelled) setTasks(starterTasks)
        }
      } catch (loadError) {
        if (!cancelled) setError(loadError.message || 'Something went wrong while loading tasks.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadTasks()
    return () => {
      cancelled = true
    }
  }, [retryCount])

  // Do not overwrite saved data until the initial load has completed.
  useEffect(() => {
    if (loading || error) return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      setError('Tasks could not be saved to localStorage. Check your browser storage settings.')
    }
  }, [tasks, loading, error])

  const retry = useCallback(() => {
    setRetryCount((count) => count + 1)
  }, [])

  const addTask = useCallback((newTask) => {
    setTasks((currentTasks) => [
      ...currentTasks,
      { ...newTask, id: Date.now() + Math.random() },
    ])
  }, [])

  const updateTask = useCallback((id, updatedFields) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task,
      ),
    )
  }, [])

  const deleteTask = useCallback((id) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?')
    if (!confirmed) return 

    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
     toast.success("Task deleted successfully!");
  }, [])

  return {
    tasks,
    loading,
    error,
    retry,
    addTask,
    updateTask,
    deleteTask,
  }
}