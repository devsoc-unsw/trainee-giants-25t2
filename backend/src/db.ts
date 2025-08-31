import mongoose from "mongoose";
const dotenv = require("dotenv");

dotenv.config({ path: "../../.env" });

const uri = process.env.MONGO_URI as string;
console.log(uri);

mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: any) => console.error("MongoDB connection error:", err));
