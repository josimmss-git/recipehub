import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

let client;
let clientPromise;

// Development Mode
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Production Mode
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default async function dbConnect() {
  const connectedClient = await clientPromise;
  return connectedClient.db(process.env.DB_NAME);
}

