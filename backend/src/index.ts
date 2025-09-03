import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";

import placesRouter from "./routes/places";
import authRouter from "./routes/authRoutes"

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());

app.get('/', (_req, res) => {
  res.send('test!');
});

app.use("/api/places", placesRouter); // calls the route
app.use("/api/auth", authRouter)

app.listen(PORT, () => {
  console.log(`what2eat backend running at http://localhost:${PORT}`);
});