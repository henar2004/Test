import React, { useMemo, useState } from "react";

const SAMPLE_TASKS = [
  { id: 1, title: "Revisar SCP-173", text: "Probar movimientos", tags: ["SCP", "Urgente"], created: "2025-12-01", updated: "2025-12-02" },
  { id: 2, title: "Escribir documentación", text: "Notas de clase", tags: ["Docs"], created: "2025-11-28", updated: "2025-12-01" },
  { id: 3, title: "Actualizar HUD", text: "Arreglar UI en Roblox", tags: ["UI", "Roblox"], created: "2025-12-03", updated: "2025-12-03" },
  // añade más tareas si quieres probar
];

export default function Tareas() {
  const [view, setView] = useState("list"); // list | board
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMode, setSearchMode] = useState("title"); // title | tags
  const [selectedTags, setSelectedTags] = useState([]); // array de tags seleccionados
  const [tagMatchMode, setTagMatchMode] = useState("any"); // any | all
  const [sortField, setSortField] = useState("created"); // created | updated | title
  const [sortDir, setSortDir] = useState("desc"); // asc | desc
  const maxVisibleTags = 2; // cuántos tags mostrar antes del (+N)

  // tags únicos del dataset
  const allTags = useMemo(() => {
    const s = new Set();
    SAMPLE_TASKS.forEach(t => t.tags.forEach(tag => s.add(tag)));
    return Array.from(s).sort();
  }, []);

  // toggle tag
  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSearchMode("title");
    setTagMatchMode("any");
    setSortField("created");
    setSortDir("desc");
  };

  // filtrado + búsqueda
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return SAMPLE_TASKS.filter(task => {
      // filtro por búsqueda
      if (q) {
        if (searchMode === "title") {
          if (!task.title.toLowerCase().includes(q) && !task.text.toLowerCase().includes(q)) return false;
        } else {
          // buscar dentro de tags
          const matchTag = task.tags.some(t => t.toLowerCase().includes(q));
          if (!matchTag) return false;
        }
      }

      // filtro por selectedTags
      if (selectedTags.length > 0) {
        if (tagMatchMode === "all") {
          // task debe contener todos los tags seleccionados
          const hasAll = selectedTags.every(tag => task.tags.includes(tag));
          if (!hasAll) return false;
        } else {
          // any: al menos uno
          const hasAny = selectedTags.some(tag => task.tags.includes(tag));
          if (!hasAny) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      let va = a[sortField];
      let vb = b[sortField];
      // por fecha (strings YYYY-MM-DD) funcionan bien con localeCompare
      if (sortField === "title") {
        va = va.toLowerCase();
        vb = vb.toLowerCase();
        return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      } else {
        // created / updated
        return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      }
    });
  }, [searchQuery, searchMode, selectedTags, tagMatchMode, sortField, sortDir]);

  return (
    <main className="portfolio-bg page-fill">
      <div className="container portfolio-container">

        {/* Cabecera */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="text-white">Gestor de tareas</h3>
          <div className="d-flex gap-2">
            <div className="btn-group" role="group">
              <button className={`btn btn-ghost btn-sm ${view === "list" ? "active" : ""}`} onClick={() => setView("list")}>Lista</button>
              <button className={`btn btn-ghost btn-sm ${view === "board" ? "active" : ""}`} onClick={() => setView("board")}>Tablero</button>
            </div>
          </div>
        </div>

        {/* Panel de controles: búsqueda, modo, orden */}
        <div className="portfolio-card p-3 mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-md-5">
              <div className="input-group">
                <input
                  className="form-control dark-input"
                  placeholder={searchMode === "title" ? "Buscar por título o texto..." : "Buscar dentro de tags..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-ghost" type="button" onClick={() => setSearchQuery("")}>Limpiar</button>
              </div>
            </div>

            <div className="col-md-3">
              <select className="form-select dark-input" value={searchMode} onChange={(e) => setSearchMode(e.target.value)}>
                <option value="title">Buscar por título/texto</option>
                <option value="tags">Buscar por tag</option>
              </select>
            </div>

            <div className="col-md-4 d-flex gap-2 align-items-center">
              <select className="form-select dark-input" value={sortField} onChange={(e) => setSortField(e.target.value)}>
                <option value="created">Ordenar por fecha de creación</option>
                <option value="updated">Ordenar por fecha de modificación</option>
                <option value="title">Ordenar por nombre</option>
              </select>

              <button className="btn btn-ghost btn-sm" onClick={() => setSortDir(d => d === "asc" ? "desc" : "asc")}>
                {sortDir === "asc" ? "Asc" : "Desc"}
              </button>
            </div>
          </div>
        </div>

        {/* Tags: lista de tags y opciones any/all */}
        <div className="portfolio-card p-3 mb-4">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="small">Filtrar por tags</div>
            <div>
              <button className={`btn btn-ghost btn-sm ${tagMatchMode === "any" ? "active" : ""}`} onClick={() => setTagMatchMode("any")}>Incluye cualquiera</button>
              <button className={`btn btn-ghost btn-sm ${tagMatchMode === "all" ? "active" : ""}`} onClick={() => setTagMatchMode("all")}>Contiene todos</button>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2">
            {allTags.map(tag => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  className={`btn ${active ? "btn-cta" : "btn-ghost"} btn-sm`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              );
            })}

            <button className="btn btn-ghost btn-sm ms-2" onClick={clearFilters}>Borrar filtros</button>
          </div>
        </div>

        {/* Contenido: lista o tablero */}
        {view === "list" ? (
          <div className="list-group">
            {filtered.map(task => (
              <div key={task.id} className="list-group-item portfolio-card mb-2">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <div className="fw-bold text-white">{task.title}</div>
                    <div className="small">{sortField === "created" ? task.created : (sortField === "updated" ? task.updated : "")}</div>
                    <div className="small mt-1">
                      {task.tags.slice(0, maxVisibleTags).map(t => (
                        <span key={t} className="badge bg-secondary me-1">{t}</span>
                      ))}

                      {task.tags.length > maxVisibleTags && (
                        <span
                          className="badge bg-secondary me-1 tag-overflow"
                          title={task.tags.slice(maxVisibleTags).join(", ")}
                        >
                          +{task.tags.length - maxVisibleTags}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-white-50">{task.text}</div>
                  </div>

                  <div className="ms-3 d-flex flex-column align-items-end">
                    <div className="btn-group-vertical">
                      <button className="btn btn-ghost btn-sm">Editar</button>
                      <button className="btn btn-ghost btn-sm mt-2">Eliminar</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="portfolio-card p-3">No hay tareas que coincidan.</div>
            )}
          </div>
        ) : (
          <div className="row g-3">
            {filtered.map(task => (
              <div key={task.id} className="col-md-4">
                <div className="portfolio-card p-3 h-100">
                  <div className="d-flex justify-content-between">
                    <div className="fw-bold">{task.title}</div>
                    <div className="small">{sortField === "created" ? task.created : (sortField === "updated" ? task.updated : "")}</div>
                  </div>
                  <div className="small text-truncate mt-2">{task.text}</div>
                  <div className="mt-2">
                    {task.tags.map(tag => (
                      <span key={tag} className="badge bg-secondary me-1">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="col-12">
                <div className="portfolio-card p-3">No hay tareas que coincidan.</div>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
