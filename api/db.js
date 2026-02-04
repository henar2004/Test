// Importamos el cliente de MongoDB y la versión de la API del servidor
import { MongoClient, ServerApiVersion } from "mongodb";

// URI de conexión a MongoDB Atlas
const uri =
  "mongodb+srv://ender536:awdawdawd@cluster0.4onbi1n.mongodb.net/?appName=Cluster0";

// Promesa global para reutilizar la conexión entre peticiones
let clientPromise;

// Evita crear múltiples conexiones en desarrollo (hot reload de Next.js)
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

// ==================
// API Route: /api/db
// ==================
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("task_app");

    // =========================
    // 1. Obtener tareas con tags
    // =========================
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

    const tasks = datos.map((t) => ({
      id: t._id.toString(),
      title: t.title,
      text: t.text,
      tags: t.tags ?? [],
      created: t.creationDate?.toISOString().slice(0, 10),
      updated:
        t.updateDate?.toISOString().slice(0, 10) ??
        t.creationDate?.toISOString().slice(0, 10),
    }));

    // =========================
    // 2. Obtener TODOS los tags
    // =========================
    const tagsData = await db
      .collection("tags")
      .find({})
      .project({ nombre: 1 })
      .toArray();

    const tags = tagsData.map((t) => t.nombre);

    // =========================
    // 3. Respuesta combinada
    // =========================
    res.status(200).json({
      tasks,
      tags,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al obtener datos" });
  }
}
