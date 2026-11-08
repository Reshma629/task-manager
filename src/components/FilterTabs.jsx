import React from "react"
const filters = ['all', 'active', 'completed']

export default function FilterTabs({
  filter,
  setFilter,
  search,
  setSearch,
  sortBy,
  setSortBy,
}) {
  return (
    <section className="toolbar" aria-label="Task controls">
      <div className="tabs" role="group" aria-label="Filter tasks">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            className={`tab-button ${filter === item ? 'active' : ''}`}
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      <div className="search-sort">
        <label className="visually-hidden" htmlFor="task-search">Search tasks</label>
        <input
          id="task-search"
          type="search"
          placeholder="Search tasks..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <label className="visually-hidden" htmlFor="task-sort">Sort tasks</label>
        <select
          id="task-sort"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="dueDate">Due date: soonest</option>
          <option value="priority">Priority: high first</option>
        </select>
      </div>
    </section>
  )
}