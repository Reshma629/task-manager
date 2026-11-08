# React Task Manager

A one-page task manager built with React function components and hooks, Vite, and plain CSS.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Features

- Loads starter tasks from `public/tasks.json` on the first visit.
- Saves task changes to `localStorage` and restores them on later visits.
- Add tasks with a required title, priority, and optional due date.
- Mark tasks complete or active.
- Edit a task title: double-click the title (or focus it and press Enter), then press Enter to save or Escape to cancel.
- Delete tasks after browser confirmation.
- Filter by All, Active, and Completed.
- Case-insensitive title search.
- Sort by due date (no due date last) or priority (High first).
- Shows an Overdue label for incomplete tasks with a past due date.
- Responsive layout for mobile and desktop.

## Project structure

```text
react-task-manager/
├── public/
│   └── tasks.json
├── src/
│   ├── components/
│   │   ├── FilterTabs.jsx
│   │   ├── Loader.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskItem.jsx
│   │   └── TaskList.jsx
│   ├── hooks/
│   │   └── useTasks.js
│   ├── utils/
│   │   ├── filterTasks.js
│   │   └── sortTasks.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
└── package.json
```

## State approach

`useTasks` is the single source of truth for task data and task operations. `App` stores only the current filter, search text, and sort selection. The displayed list and remaining-task count are derived from state rather than stored separately.

## Notes

- To test the first-visit JSON loading flow again, remove the `task_manager_tasks` key from browser localStorage and refresh.
- The task data is stored in the current browser only; there is no backend.
