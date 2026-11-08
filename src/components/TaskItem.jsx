import React from 'react'
import { useEffect, useRef, useState } from 'react'

function isPastDue(dueDate) {
  if (!dueDate) return false

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const due = new Date(`${dueDate}T00:00:00`)
  return due < today
}

export default function TaskItem({ task, updateTask, deleteTask }) {
  const { id, title, priority, dueDate, completed } = task
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  function saveEdit() {
    const trimmedTitle = editTitle.trim()
    if (!trimmedTitle) {
      setEditTitle(title)
      setEditing(false)
      return
    }

    updateTask(id, { title: trimmedTitle })
    setEditing(false)
  }

  function handleEditKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      saveEdit()
    }

    if (event.key === 'Escape') {
      setEditTitle(title)
      setEditing(false)
    }
  }

  function startEditing() {
    setEditTitle(title)
    setEditing(true)
  }

  return (
    <li className={`task-item priority-border-${priority.toLowerCase()}`}>
      <input
        className="task-checkbox"
        type="checkbox"
        checked={completed}
        onChange={() => updateTask(id, { completed: !completed })}
        aria-label={`Mark "${title}" as ${completed ? 'active' : 'completed'}`}
      />

      <div className="task-main">
        {editing ? (
          <input
            ref={inputRef}
            className="edit-input"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            onKeyDown={handleEditKeyDown}
            aria-label="Edit task title"
          />
        ) : (
          <button
            type="button"
            className={`task-title ${completed ? 'completed' : ''}`}
            onDoubleClick={startEditing}
            onKeyDown={(event) => {
              if (event.key === 'Enter') startEditing()
            }}
            title="Double-click or press Enter to edit"
          >
            {title}
          </button>
        )}

        <div className="task-meta">
          <span className={`priority-badge priority-${priority.toLowerCase()}`}>
            {priority}
          </span>
          <span className="due-date">
            {dueDate
              ? new Date(`${dueDate}T00:00:00`).toLocaleDateString('en-IN')
              : 'No due date'}
          </span>
          {!completed && isPastDue(dueDate) && (
            <span className="overdue-label">Overdue</span>
          )}
        </div>
      </div>

      <button
        type="button"
        className="delete-button"
        onClick={() => deleteTask(id)}
        aria-label={`Delete ${title}`}
      >
        Delete
      </button>
    </li>
  )
}