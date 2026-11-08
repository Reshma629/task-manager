import React from "react"
export default function Loader() {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <p>Loading tasks...</p>
    </div>
  )
}