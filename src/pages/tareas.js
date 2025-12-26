// components/TaskDashboard.js
import React, { useState } from "react";

const SAMPLE_TASKS = [
  { id: 1, title: "Revisar SCP-173", text: "Probar movimientos", tags: ["SCP", "Urgente"], created: "2025-12-01", updated: "2025-12-02" },
  { id: 2, title: "Escribir documentación", text: "Notas de clase", tags: ["Docs"], created: "2025-11-28", updated: "2025-12-01" },
  { id: 3, title: "Actualizar HUD", text: "Arreglar UI en Roblox", tags: ["UI", "Roblox"], created: "2025-12-03", updated: "2025-12-03" },
];

export default function TaskDashboard() {
  const [view, setView] = useState("list");
  const [filter, setFilter] = useState("created");

  return (
    <main className="portfolio-bg page-fill">
      <div className="container portfolio-container">

        <div className="portfolio-card p-3 mb-4 d-flex justify-content-between align-items-center">
          <h3 className="m-0">Gestor de tareas</h3>
          <div className="btn-group">
            <button className={`btn btn-ghost btn-sm ${view==="list" ? "active" : ""}`} onClick={()=>setView("list")}>Lista</button>
            <button className={`btn btn-ghost btn-sm ${view==="board" ? "active" : ""}`} onClick={()=>setView("board")}>Tablero</button>
          </div>
        </div>

        <div className="portfolio-card p-3 mb-4">
          <div className="row g-3">
            <div className="col-md-6">
              <input className="form-control dark-input" placeholder="Buscar por nombre o tags" />
            </div>
            <div className="col-md-3">
              <select className="form-select dark-input" value={filter} onChange={(e)=>setFilter(e.target.value)}>
                <option value="created">Fecha de creación</option>
                <option value="updated">Fecha de modificación</option>
              </select>
            </div>
          </div>
        </div>

        {view === "list" ? (
          <div className="list-group mb-4">
            {SAMPLE_TASKS.map(task => (
              <div key={task.id} className="list-group-item portfolio-card mb-2">
                <div className="fw-bold">{task.title}</div>
                <div className="small text-muted">{filter === "created" ? task.created : task.updated}</div>
                <div className="small mt-1">
                  {task.tags.map(tag => (
                    <span key={tag} className="badge bg-secondary me-1">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row g-3">
            {SAMPLE_TASKS.map(task => (
              <div key={task.id} className="col-md-4">
                <div className="portfolio-card p-3 h-100">
                  <div className="fw-bold mb-1">{task.title}</div>
                  <div className="small text-muted mb-2">{filter === "created" ? task.created : task.updated}</div>
                  <div className="small">{task.text.slice(0, 50)}...</div>
                  <div className="mt-2">
                    {task.tags.map(tag => (
                      <span key={tag} className="badge bg-secondary me-1">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
