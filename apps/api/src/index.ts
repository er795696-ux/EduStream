import express from 'express';
import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const app = express();
const PORT = 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});