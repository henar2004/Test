// pages/api/db.js
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://ender536:awdawdawd@cluster0.lsjn4fz.mongodb.net/?appName=Cluster0";

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
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
  try {
    const client = await clientPromise;

    // Solo probamos la conexión con un ping
    await client.db("admin").command({ ping: 1 });

    console.log("✅ Conexión a MongoDB Atlas exitosa");

    res.status(200).json({ message: "Conexión exitosa a MongoDB" });
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    res.status(500).json({ error: "Error conectando a MongoDB" });
  }
}
