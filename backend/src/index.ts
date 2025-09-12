import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import placesRouter from "./routes/places";
import authRouter from "./routes/authRoutes";
import eventRouter from "./routes/eventRoutes";
import userRouter from "./routes/userRoutes";

import { connectMongo } from './db';
import { ensureUserIndexs } from './services/userServices';
import { ensurePlacesIndex } from './services/placesServices';
import { ensureEventsIndex } from './services/eventServices';
import { initVoteSockets } from './services/voteServices'; 

const app = express();
const PORT = 3000;

const server = http.createServer(app);

// initialize WebSocket server
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true },
});

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

app.get('/', (_req, res) => res.send('test!'));

(async () => {
  await connectMongo();
  await ensureUserIndexs();
  await ensurePlacesIndex();
  await ensureEventsIndex();

  app.use("/api/places", placesRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/events", eventRouter);
  app.use("/api/user", userRouter);

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

  // initialize WebSocket connections
  initVoteSockets(io);  
})().catch(err => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});
