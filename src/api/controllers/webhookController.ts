import { Request, Response } from 'express';
import {
  findPipelineByWebhookPath,
  createJob,
} from '../../services/jobService';

export async function ingestWebhookHandler(req: Request, res: Response) {
  try {
    const webhookPath = String(req.params.webhookPath);
    const pipeline = await findPipelineByWebhookPath(webhookPath);
    if (!pipeline) {
      return res.status(404).json({ error: 'Pipeline not found' });
    }
    const job = await createJob({ pipelineId: pipeline.id, payload: req.body });
    res.status(202).json({ message: 'webhook received and job queued!', job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'failed to ingest webhook' });
  }
}
