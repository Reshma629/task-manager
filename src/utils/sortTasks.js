const priorityRank = {
  High: 1,
  Medium: 2,
  Low: 3,
}

export function sortTasks(tasks, sortBy) {
  const sortedTasks = [...tasks]

  if (sortBy === 'dueDate') {
    sortedTasks.sort((a, b) => {
      // Tasks without a due date should always appear last.
      if (!a.dueDate && !b.dueDate) return 0
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return a.dueDate.localeCompare(b.dueDate)
    })
  }

  if (sortBy === 'priority') {
    sortedTasks.sort(
      (a, b) => priorityRank[a.priority] - priorityRank[b.priority],
    )
  }

  return sortedTasks
}