import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import apiRouter from '../api/routes/index';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'ok' });
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'API not found' });
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}
