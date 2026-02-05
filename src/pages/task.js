// ==================
// Pagina: Task.js
// Página de gestor de tareas
// ==================

import React, {
  useMemo,
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import "../styles/task.css";
import { useEffect } from "react";

// ==================
// DATOS ESTÁTICOS
// ==================

// ==================
// COMPONENTE: TagList
// Renderiza tags con truncado responsivo y tooltip al hover
// ==================
function TagList({ tags }) {
  // Referencias a elementos del DOM
  const containerRef = useRef(null);
  const measurerRef = useRef(null);

  // Estados locales del componente
  const [visibleCount, setVisibleCount] = useState(tags.length);
  const [expanded, setExpanded] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  // Trunca un tag a X caracteres máximo
  const truncate = useCallback(
    (t, max = 10) => (t.length > max ? t.slice(0, max) + "..." : t),
    [],
  );

  // Genera array de tags truncados
  const truncated = useMemo(
    () => tags.map((t) => truncate(t)),
    [tags, truncate],
  );

  // Calcula cuántos tags caben en el contenedor según su ancho
  const measure = useCallback(() => {
    if (expanded) {
      setVisibleCount(tags.length);
      return;
    }
    const cont = containerRef.current;
    const m = measurerRef.current;
    if (!cont || !m) return;

    const plusText = `+${tags.length}`;
    const gap = 6;
    let used = 0;
    let lastVisible = -1;
    const contW = cont.offsetWidth;

    m.textContent = plusText;
    const plusW = m.offsetWidth + gap;

    for (let i = 0; i < truncated.length; i++) {
      m.textContent = truncated[i];
      const w = m.offsetWidth + gap;
      if (used + w + plusW <= contW) {
        used += w;
        lastVisible = i;
      } else break;
    }

    setVisibleCount(lastVisible + 1);
  }, [tags.length, truncated, expanded]);

  // ResizeObserver: recalcula tags visibles cuando cambia el tamaño del contenedor
  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <>
      {/* Elemento invisible para medir ancho de texto */}
      <div
        ref={measurerRef}
        style={{
          position: "fixed",
          top: -9999,
          left: -9999,
          whiteSpace: "nowrap",
        }}
      />

      {/* Contenedor visible de tags */}
      <div ref={containerRef} className="d-flex gap-2 flex-wrap mt-2">
        {/* Mapea y renderiza tags visibles con tooltip al hover */}
        {tags.slice(0, visibleCount).map((tag, i) => (
          <div
            key={tag + i}
            className="task-tag-wrapper"
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            {/* Tag truncado */}
            <div className="task-btn-sm fw-semibold app-text-xs task-tag-item">
              {truncated[i].charAt(0).toUpperCase() + truncated[i].slice(1)}
            </div>

            {/* Tooltip con tag completo si está truncado */}
            {hoverIndex === i && (
              <div className="task-btn-sm task-tag-tooltip app-text-xs">
                {tag}
              </div>
            )}
          </div>
        ))}

        {/* Botón "+X" para expandir si hay tags ocultos */}
        {!expanded && visibleCount < tags.length && (
          <div
            className="task-btn-sm fw-semibold app-text-xs task-tag-item"
            onClick={() => setExpanded(true)}
          >
            +{tags.length - visibleCount}
          </div>
        )}

        {/* Botón "▲" para contraer cuando está expandido */}
        {expanded && (
          <div
            className="task-btn-sm fw-semibold app-text-xs task-tag-item"
            onClick={() => setExpanded(false)}
          >
            ▲
          </div>
        )}
      </div>
    </>
  );
}

// ==================
// COMPONENTE PRINCIPAL: Tareas
// Gestor de tareas completo con búsqueda, filtros y dos vistas
// ==================
export default function Tareas() {
  const [tasks, setTasks] = useState([]); // reemplaza SAMPLE_TASKS
  const [allTags, setAllTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.tasks);
        setAllTags(data.tags);

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  // ===== ESTADO DE VISTA =====
  const [view, setView] = useState("list"); // "list" o "board"

  // ===== ESTADO DE BÚSQUEDA =====
  const [searchQuery, setSearchQuery] = useState(""); // Texto de búsqueda
  const [searchMode, setSearchMode] = useState("title"); // "title" o "tags"

  // ===== ESTADO DE FILTROS =====
  const [selectedTags, setSelectedTags] = useState([]); // Tags seleccionados
  const [tagMatchMode, setTagMatchMode] = useState("any"); // "any" o "all"

  // ===== ESTADO DE ORDENAMIENTO =====
  const [sortField, setSortField] = useState("created"); // Campo a ordenar
  const [sortDir, setSortDir] = useState("desc"); // "asc" o "desc"

  // ===== ESTADO DE UI =====
  const [tagsOpen, setTagsOpen] = useState(false); // Panel de filtros abierto/cerrado

  // ==================
  // FUNCIONES: Acciones de estado
  // ==================
  // Toggle: añade o quita un tag de los filtros seleccionados
  const toggleTag = useCallback((tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  // Limpia búsqueda y todos los filtros
  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedTags([]);
    setSearchMode("title");
    setTagMatchMode("any");
  }, []);

  // ==================
  // LÓGICA: Filtrado y ordenamiento de tareas
  // ==================
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    // Filtra tareas por búsqueda y tags seleccionados
    const res = tasks.filter((task) => {
      // ===== FILTRO DE BÚSQUEDA =====
      if (q) {
        if (searchMode === "title") {
          // Busca en título y descripción
          if (
            !task.title.toLowerCase().includes(q) &&
            !task.text.toLowerCase().includes(q)
          )
            return false;
        } else {
          // Busca en tags
          if (!task.tags.some((t) => t.toLowerCase().includes(q))) return false;
        }
      }

      // ===== FILTRO DE TAGS =====
      if (selectedTags.length > 0) {
        if (tagMatchMode === "all") {
          // Modo "contiene todos": debe tener TODOS los tags seleccionados
          if (!selectedTags.every((tag) => task.tags.includes(tag)))
            return false;
        } else {
          // Modo "incluye cualquiera": debe tener AL MENOS UNO de los tags
          if (!selectedTags.some((tag) => task.tags.includes(tag)))
            return false;
        }
      }

      return true;
    });

    // ===== ORDENAMIENTO =====
    const sorted = res.sort((a, b) => {
      let va = a[sortField];
      let vb = b[sortField];

      // Ordenamiento por fecha
      if (sortField === "created" || sortField === "updated") {
        const da = Date.parse(va);
        const db = Date.parse(vb);
        return sortDir === "asc" ? da - db : db - da;
      }

      // Ordenamiento alfabético (para título)
      return sortDir === "asc"
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });

    return sorted;
  }, [
    searchQuery,
    searchMode,
    selectedTags,
    tagMatchMode,
    sortField,
    sortDir,
    tasks,
  ]);

  // ==================
  // RENDER
  // ==================
  return (
    <main className="app-page-bg app-page-fill">
      <div className="container app-container">
        {/* ===== ENCABEZADO CON TÍTULO Y BOTONES DE VISTA ===== */}
        <div className="d-inline-flex justify-content-between align-items-center p-3 app-card portafolio-card-list rounded">
          {/* Botones para cambiar entre vista lista y tablero */}
          <div className="d-flex gap-2">
            <button
              className={`app-text-sm fw-semibold task-btn-sm ${view === "list" ? "task-active" : ""}`}
              onClick={() => setView("list")}
            >
              Lista
            </button>
            <button
              className={`app-text-sm fw-semibold task-btn-sm ${view === "board" ? "task-active" : ""}`}
              onClick={() => setView("board")}
            >
              Tablero
            </button>
          </div>
        </div>

        {/* ===== PANEL: BÚSQUEDA Y ORDENAMIENTO ===== */}
        <div className="app-card p-3 mb-4 rounded">
          <div className="row g-3 align-items-center">
            {/* Campo de búsqueda con botón limpiar */}
            <div className="col-md-5">
              <div className="input-group">
                <input
                  className="form-control app-text-sm fw-semibold"
                  placeholder={
                    searchMode === "title"
                      ? "Buscar por título o texto..."
                      : "Buscar dentro de tags..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="task-btn-sm app-text-sm fw-semibold"
                  onClick={() => setSearchQuery("")}
                >
                  Limpiar
                </button>
              </div>
            </div>

            {/* Selector del modo de búsqueda */}
            <div className="col-md-3">
              <select
                className="form-select app-text-sm fw-semibold"
                value={searchMode}
                onChange={(e) => setSearchMode(e.target.value)}
              >
                <option value="title">Buscar por título/texto</option>
                <option value="tags">Buscar por tag</option>
              </select>
            </div>

            {/* Selector de ordenamiento + botón de dirección */}
            <div className="col-md-4">
              <div className="input-group">
                <select
                  className="form-select app-text-sm fw-semibold"
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value)}
                >
                  <option value="created">Ordenar por fecha de creación</option>
                  <option value="updated">
                    Ordenar por fecha de modificación
                  </option>
                  <option value="title">Ordenar por nombre</option>
                </select>

                {/* Botón para cambiar dirección de ordenamiento (asc/desc) */}
                <button
                  className="task-btn-sm app-text-sm fw-semibold"
                  onClick={() =>
                    setSortDir((d) => (d === "asc" ? "desc" : "asc"))
                  }
                >
                  {sortDir === "asc" ? "Asc" : "Desc"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===== PANEL: FILTROS POR TAGS ===== */}
        <div className="app-card p-3 mb-4 rounded">
          <div className="d-flex justify-content-between align-items-center">
            {/* Botón para abrir/cerrar panel de filtros */}
            <button
              className={`app-text-sm fw-semibold task-btn-sm ${tagsOpen ? "task-active" : ""}`}
              onClick={() => setTagsOpen((open) => !open)}
            >
              Filtrar por tags
            </button>

            {/* Botones para cambiar modo de coincidencia de tags */}
            <div className="d-flex gap-2">
              <button
                className={`app-text-sm fw-semibold task-btn-sm ${tagMatchMode === "any" ? "task-active" : ""}`}
                onClick={() => setTagMatchMode("any")}
              >
                Incluye cualquiera
              </button>
              <button
                className={`app-text-sm fw-semibold task-btn-sm ${tagMatchMode === "all" ? "task-active" : ""}`}
                onClick={() => setTagMatchMode("all")}
              >
                Contiene todos
              </button>
            </div>
          </div>

          {/* Lista de tags disponibles para filtrar (se muestra cuando tagsOpen es true) */}
          {tagsOpen && (
            <div className="d-flex flex-wrap gap-2 mt-3">
              {/* Botones de cada tag disponible */}
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`app-text-sm fw-semibold task-btn-sm ${
                    selectedTags.includes(tag) ? "task-active" : ""
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              ))}

              {/* Botón para limpiar todos los filtros */}
              <button
                className="task-btn-sm fw-semibold app-text-sm"
                onClick={clearFilters}
              >
                Borrar filtros
              </button>
            </div>
          )}
        </div>

        {/* ===== VISTA: LISTA ===== */}
        {view === "list" ? (
          <div className="list-group">
            {loading ? (
              <div className="app-card app-text-md rounded p-3">
                Cargando tareas...
              </div>
            ) : tasks.length === 0 ? (
              <div className="app-card app-text-md rounded p-3">
                No hay tareas en la base de datos.
              </div>
            ) : filtered.length === 0 ? (
              <div className="app-card app-text-md rounded p-3">
                No hay tareas que coincidan con los filtros.
              </div>
            ) : (
              filtered.map((task) => (
                <div
                  key={task.id}
                  className="app-card rounded p-3 mb-4 position-relative"
                >
                  {/* ===== BOTONES FLOTANTES A LA DERECHA ===== */}
                  <div className="d-flex gap-2 task-card-buttons">
                    <button className="task-btn-sm fw-semibold app-text-sm">
                      Editar
                    </button>
                    <button className="task-btn-sm task-card-disabled-btn fw-semibold app-text-sm">
                      Eliminar
                    </button>
                  </div>

                  <div className="fw-semibold app-text-md">{task.title}</div>
                  <div className="app-text-sm task-timeline-sub">
                    Creado: {task.created} · Modificado: {task.updated}
                  </div>
                  <TagList tags={task.tags} />
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="row g-4">
            {loading ? (
              <div className="col-12">
                <div className="app-card app-text-md rounded p-3">
                  Cargando tareas...
                </div>
              </div>
            ) : tasks.length === 0 ? (
              <div className="col-12">
                <div className="app-card app-text-md rounded p-3">
                  No hay tareas en la base de datos.
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="col-12">
                <div className="app-card app-text-md rounded p-3">
                  No hay tareas que coincidan con los filtros.
                </div>
              </div>
            ) : (
              filtered.map((task) => (
                <div key={task.id} className="col-md-4">
                  <div className="app-card rounded p-3 d-flex flex-column h-100">
                    <div className="fw-semibold app-text-md">{task.title}</div>
                    <div className="app-text-sm task-timeline-sub">
                      Creado: {task.created} · Modificado: {task.updated}
                    </div>
                    <div className="app-text-sm task-timeline-sub mt-2 task-two-lines">
                      {task.text}
                    </div>
                    <TagList tags={task.tags} />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}
