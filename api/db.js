// Importamos el cliente de MongoDB y la versión de la API del servidor
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
console.log("MongoDB URI:", uri ? "✅ Configurada" : "❌ No configurada", uri);
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

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("task_app");

    // 1) traer tareas con lookup
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

    // 2) map seguro: proteger fechas y tags
    const tasks = datos.map((t) => {
      const created = t.creationDate ? new Date(t.creationDate).toISOString().slice(0, 10) : null;
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

    // 3) traer tags (defensivo)
    const tagsData = await db
      .collection("tags")
      .find({})
      .project({ nombre: 1 })
      .toArray();

    const tags = (tagsData || []).map((x) => (x && x.nombre ? x.nombre : null)).filter(Boolean);

    return res.status(200).json({ tasks, tags });
  } catch (e) {
    // log más explícito para ver errores en Vercel
    console.error("API /api/db error:", e && e.stack ? e.stack : e);
    return res.status(500).json({ error: "Error al obtener datos", details: String(e?.message ?? e) });
  }
}
