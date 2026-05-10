import express from 'express';
import { pool } from '../db/client';
import pipelineRoutes from './routes/pipelineRoutes';
import subscriberRoutes from './routes/subscriberRoutes';
import webhookRoutes from './routes/webhookRoutes';
import jobRoutes from './routes/jobRoutes';
import path from 'path';

const app = express();

const PORT = 3000;

app.use(express.json());

app.use('/api', pipelineRoutes);
app.use('/api', subscriberRoutes);
app.use('/api', webhookRoutes);
app.use('/api', jobRoutes);

app.use(express.static(path.join(__dirname, '../../public')));

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
  });
});

// database connection test
pool
  .query('SELECT NOW()')
  .then((res) => console.log('DB connected:', res.rows[0]))
  .catch((err) => console.error('DB connection error', err));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
