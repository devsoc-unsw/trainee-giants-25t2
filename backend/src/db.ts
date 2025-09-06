import mongoose from "mongoose";


export async function connectMongo() {
  const uri = process.env.MONGO_URI as string;
  if (!uri) {
    throw new Error("MONGO_URI not set")
  }

  if (mongoose.connection.readyState == 1) {
    return;
  }

  await mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err: any) => console.error("MongoDB connection error:", err));
}

export function getDatabase() {
  const db = mongoose.connection.db;
  if (!db) throw new Error("Database not connected");
  return db;
}
