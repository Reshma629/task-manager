import React from 'react'
import { useMemo, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import FilterTabs from './components/FilterTabs'
import Loader from './components/Loader'
import useTasks from './hooks/useTasks'
import { filterTasks } from './utils/filterTasks'
import { sortTasks } from './utils/sortTasks'

export default function App() {
  const {
    tasks,
    loading,
    error,
    retry,
    addTask,
    updateTask,
    deleteTask,
  } = useTasks()

  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('dueDate')

  const visibleTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filter, search)
    return sortTasks(filtered, sortBy)
  }, [tasks, filter, search, sortBy])

  const tasksLeftCount = tasks.filter((task) => !task.completed).length

  if (loading) return <Loader />

  if (error) {
    return (
      <main className="app-container">
        <section className="error-panel" role="alert">
          <h1>Unable to load tasks</h1>
          <p>{error}</p>
          <button type="button" onClick={retry}>Retry</button>
        </section>
      </main>
    )
  }

  return (
    <main className="app-container">
      <header className="app-header">
        <div>
          <p className="eyebrow">STAY ORGANIZED</p>
          <h1>Task Manager</h1>
          <p className="subtitle">Plan your work and keep track of what matters.</p>
        </div>
        <div className="task-summary" aria-live="polite">
          <strong>{tasksLeftCount}</strong>
          <span>tasks left</span>
        </div>
      </header>

      <TaskForm addTask={addTask} />

      <FilterTabs
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <TaskList
        tasks={visibleTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </main>
  )
}