import React from 'react'
import TaskItem from './TaskItem'

export default function TaskList({ tasks, updateTask, deleteTask }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h2>No tasks found</h2>
        <p>Try another filter or add a new task.</p>
      </div>
    )
  }

  return (
    <ul className="task-list" aria-label="Task list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  )
}