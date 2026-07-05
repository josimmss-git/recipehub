// import { MongoClient } from "mongodb";

// const client = new MongoClient(process.env.MONGODB_URI);

// export default async function dbConnect() {
//   return client.db(process.env.DB_NAME);
// }


import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not set");
}

if (process.env.NODE_ENV === "development") {
  // dev mode-এ hot reload হলে global variable ধরে রাখবে,
  // ফলে বারবার নতুন কানেকশন তৈরি হবে না
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // production-এ প্রতি সার্ভার ইনস্ট্যান্সে একবারই কানেকশন হবে
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default async function dbConnect() {
  const connectedClient = await clientPromise;
  return connectedClient.db(process.env.DB_NAME);
}