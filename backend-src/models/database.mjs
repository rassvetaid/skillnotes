import "dotenv/config";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_URL, { maxPoolSize: 10 });

const connectedClient = await client.connect();

const db = connectedClient.db(process.env.DB_NAME);

export default db;
