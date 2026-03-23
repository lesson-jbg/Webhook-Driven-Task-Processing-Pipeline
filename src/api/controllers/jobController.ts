import { Request, Response } from 'express';
import {
  getAllJobs,
  getJobById,
  getDeliveriesByJobId,
} from '../../services/jobQueryService';

export async function getJobsHandler(req: Request, res: Response) {
  try {
    const jobs = await getAllJobs();
    res.json(jobs);
  } catch {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
}

export async function getJobByIdHandler(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    const job = await getJobById(id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(job);
  } catch {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
}

export async function getJobDeliveriesHandler(req: Request, res: Response) {
  try {
    const jobId = String(req.params.id);
    const deliveries = await getDeliveriesByJobId(jobId);
    res.json(deliveries);
  } catch {
    res.status(500).json({ error: 'Failed to fetch deliveries' });
  }
}
