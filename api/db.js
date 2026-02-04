// Importamos el cliente de MongoDB y la versión de la API del servidor
import { MongoClient, ServerApiVersion } from "mongodb";

// URI de conexión a MongoDB Atlas
const uri =
  "mongodb+srv://ender536:awdawdawd@cluster0.4onbi1n.mongodb.net/?appName=Cluster0";

// Promesa global para reutilizar la conexión entre peticiones
let clientPromise;

// Evita crear múltiples conexiones en desarrollo (hot reload de Next.js)
if (!global._mongoClientPromise) {
  // Creamos el cliente de MongoDB
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1, // Versión estable de la API
      strict: true,                 // Fuerza validaciones estrictas
      deprecationErrors: true,      // Muestra errores por funciones obsoletas
    },
  });

  // Guardamos la promesa de conexión globalmente
  global._mongoClientPromise = client.connect();
}

// Usamos siempre la misma promesa
clientPromise = global._mongoClientPromise;

// ==================
// API Route: /api/tasks
// ==================
export default async function handler(req, res) {
  // Solo permitimos peticiones GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    // Esperamos a que la conexión con MongoDB esté lista
    const client = await clientPromise;

    // Seleccionamos la base de datos
    const db = client.db("task_app");

    // Agregación para traer tareas con sus tags
    const datos = await db
      .collection("tasks")
      .aggregate([
        {
          // JOIN con la colección "tags"
          $lookup: {
            from: "tags",          // Colección destino
            localField: "tags",    // Array de ObjectId en tasks
            foreignField: "_id",   // _id en tags
            as: "tagsInfo",        // Resultado del lookup
          },
        },
        {
          // Seleccionamos solo los campos necesarios
          $project: {
            _id: 1,
            title: 1,
            text: 1,
            creationDate: 1,
            updateDate: 1,
            // Convertimos los tags a un array de nombres
            tags: "$tagsInfo.nombre",
          },
        },
      ])
      .toArray();

    // Adaptamos el resultado al formato que espera Task.js
    const tasks = datos.map((t) => ({
      id: t._id.toString(), // Convertimos ObjectId a string
      title: t.title,
      text: t.text,
      tags: t.tags ?? [],   // Aseguramos que siempre sea un array
      created: t.creationDate
        ?.toISOString()
        .slice(0, 10),      // Fecha YYYY-MM-DD
      updated:
        t.updateDate?.toISOString().slice(0, 10) ??
        t.creationDate?.toISOString().slice(0, 10),
    }));

    // Respondemos con las tareas en JSON
    res.status(200).json(tasks);
  } catch (e) {
    // Log del error en servidor
    console.error(e);

    // Respuesta de error genérica
    res.status(500).json({ error: "Error al obtener tareas" });
  }
}
