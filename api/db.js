// ============================
// API: /api/db
// Conexión a MongoDB y obtención de tareas y tags
// ============================

import { MongoClient, ServerApiVersion } from "mongodb";

// URI de conexión obtenida de la variable de entorno
const uri = process.env.MONGODB_URI;

// Promesa global para reutilizar la conexión entre peticiones
let clientPromise;

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

// ============================
// Handler de la API
// ============================
export default async function handler(req, res) {
  // Validar método HTTP
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    // Conectar a la base de datos
    const client = await clientPromise;
    const db = client.db("task_app");

    // ============================
    // 1) Obtener tareas con tags
    // ============================
    const datos = await db
      .collection("tasks")
      .aggregate([
        {
          $lookup: {
            from: "tags",
            localField: "tags",
            foreignField: "_id",
            as: "tagsInfo",
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            text: 1,
            creationDate: 1,
            updateDate: 1,
            tags: "$tagsInfo.nombre",
          },
        },
      ])
      .toArray();

    // ============================
    // 2) Map seguro de tareas
    // Protege contra valores nulos y asegura formato de fechas
    // ============================
    const tasks = datos.map((t) => {
      const created = t.creationDate
        ? new Date(t.creationDate).toISOString().slice(0, 10)
        : null;
      const updated = t.updateDate
        ? new Date(t.updateDate).toISOString().slice(0, 10)
        : created;

      return {
        id: t._id?.toString?.() ?? null,
        title: t.title ?? "",
        text: t.text ?? "",
        tags: Array.isArray(t.tags) ? t.tags.filter(Boolean) : [],
        created,
        updated,
      };
    });

    // ============================
    // 3) Obtener todos los tags
    // ============================
    const tagsData = await db
      .collection("tags")
      .find({})
      .project({ nombre: 1 })
      .toArray();

    const tags = (tagsData || [])
      .map((x) => (x && x.nombre ? x.nombre : null))
      .filter(Boolean);

    // ============================
    // Respuesta de la API
    // ============================
    return res.status(200).json({ tasks, tags });
  } catch (e) {
    // Log detallado para debugging
    console.error("API /api/db error:", e && e.stack ? e.stack : e);

    return res.status(500).json({
      error: "Error al obtener datos",
      details: String(e?.message ?? e),
    });
  }
}
