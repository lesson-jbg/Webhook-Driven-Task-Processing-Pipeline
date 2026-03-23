import { Request, Response } from 'express';
import {
  createSubscriber,
  getSubscribersByPipelineId,
  deleteSubscriber,
} from '../../services/subscriberService';

export async function createSubscriberHandler(req: Request, res: Response) {
  try {
    const pipelineId = String(req.params.id);
    const { callbackUrl } = req.body;
    const subscriber = await createSubscriber({ pipelineId, callbackUrl });
    res.status(201).json(subscriber);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'failed to create subscriber' });
  }
}
export async function getSubscribersByPipelineHandler(
  req: Request,
  res: Response,
) {
  try {
    const pipelineId = String(req.params.id);
    const result = await getSubscribersByPipelineId(pipelineId);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
}

export async function deleteSubscriberHandler(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    await deleteSubscriber(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete subscriber' });
  }
}
