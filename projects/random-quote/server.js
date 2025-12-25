import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3000;
// to make it work run node server.js
// Enable CORS for all origins
app.use(
  cors({
    origin: 'http://127.0.0.1:5500', // or 'http://localhost:5500' if you open that
  })
);

app.get('/quotes', async (req, res) => {
  try {
    const response = await fetch('https://zenquotes.io/api/quotes/');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
