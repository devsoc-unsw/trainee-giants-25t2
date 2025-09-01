import express from 'express';
import cors from 'cors';

import placesRouter from "./routes/places";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));

app.get('/', (_req, res) => {
  res.send('test!');
});

app.use("/api/places", placesRouter); // calls the route

app.listen(PORT, () => {
  console.log(`what2eat backend running at http://localhost:${PORT}`);
});