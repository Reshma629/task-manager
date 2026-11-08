import React from 'react'
import { useState } from 'react'

const priorities = ['Low', 'Medium', 'High']

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      setError('Please enter a task title.')
      return
    }

    addTask({
      title: trimmedTitle,
      priority,
      dueDate: dueDate || null,
      completed: false,
    })

    setTitle('')
    setPriority('Medium')
    setDueDate('')
    setError('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-field title-field">
        <label htmlFor="task-title">Task title</label>
        <input
          id="task-title"
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
            if (error) setError('')
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'title-error' : undefined}
        />
        {error && <p className="error" id="title-error" role="alert">{error}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="task-priority">Priority</label>
        <select
          id="task-priority"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          {priorities.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="task-due-date">Due date</label>
        <input
          id="task-due-date"
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
      </div>

      <button className="add-button" type="submit">Add task</button>
    </form>
  )
}