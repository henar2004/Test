// Importa MongoClient y ServerApiVersion desde el paquete mongodb
const { MongoClient, ServerApiVersion } = require("mongodb");

// URI de conexión a tu base de datos MongoDB
const uri =
  "mongodb+srv://ender536:awdawdawd@cluster0.4onbi1n.mongodb.net/?appName=Cluster0";

let client; // Variable para almacenar la instancia del cliente Mongo
let clientPromise; // Variable para almacenar la promesa de conexión

// Evita crear múltiples conexiones al reutilizar la conexión global
if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    // Crea un nuevo cliente de MongoDB
    serverApi: {
      // Configuración de la API del servidor
      version: ServerApiVersion.v1,
      strict: true, // Activa validaciones estrictas
      deprecationErrors: true, // Muestra errores por funciones obsoletas
    },
  });
  global._mongoClientPromise = client.connect(); // Conecta y guarda la promesa global
}

clientPromise = global._mongoClientPromise; // Usa la promesa global para la conexión

// Función asíncrona para probar la conexión a la base de datos
async function handler() {
  try {
    const client = await clientPromise; // Espera a que la conexión se establezca
    const db = client.db("task_app"); // Selecciona la base de datos

    // Ejecutamos agregación para hacer "join" con users y tags
    const datos = await db
      .collection("tasks")
      .aggregate([
        // Lookup para traer info de los usuarios
        {
          $lookup: {
            from: "users", // colección a unir
            localField: "userId", // campo en tasks
            foreignField: "_id", // campo en users
            as: "userInfo", // resultado en un array
          },
        },
        // Lookup para traer info de los tags
        {
          $lookup: {
            from: "tags",
            localField: "tags", // array de ObjectId en tasks
            foreignField: "_id", // _id en tags
            as: "tagsInfo",
          },
        },
        // Opcional: sacar solo los nombres que nos interesan
        {
          $project: {
            _id: 1,
            title: 1,
            text: 1,
            creationDate: 1,
            updateDate: 1,
            user: { $arrayElemAt: ["$userInfo.name", 0] },
            tags: "$tagsInfo.nombre",
          },
        },
      ])
      .toArray();

    console.log(datos); // Muestra los datos obtenidos
  } catch (e) {
    console.error(e);
  }
}

handler(); // Llama a la función para probar la conexión
