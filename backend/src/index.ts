import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('test!');
});

app.listen(PORT, () => {
  console.log(`what2eat backend running at http://localhost:${PORT}`);
});