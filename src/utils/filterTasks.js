export function filterTasks(tasks, filter, search) {
  const normalizedSearch = search.trim().toLowerCase()

  return tasks.filter((task) => {
    if (filter === 'active' && task.completed) return false
    if (filter === 'completed' && !task.completed) return false

    return task.title.toLowerCase().includes(normalizedSearch)
  })
}