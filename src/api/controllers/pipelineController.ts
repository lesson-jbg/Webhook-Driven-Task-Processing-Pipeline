import { Request, Response } from 'express';
import {
  createPipeline,
  getPipelines,
  getPipelineById,
  deletePipeline,
  updatePipeline,
} from '../../services/pipelineService';

export async function createPipelineHandler(req: Request, res: Response) {
  try {
    const pipeline = await createPipeline(req.body);
    res.status(201).json(pipeline);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create pipeline' });
  }
}

export async function getPipelinesHandler(req: Request, res: Response) {
  try {
    const result = await getPipelines();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch pipelines' });
  }
}

export async function getPipelineByIdHandler(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    const pipeline = await getPipelineById(id);

    if (!pipeline) {
      return res.status(404).json({ error: 'Pipeline not found' });
    }

    res.json(pipeline);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch pipeline' });
  }
}

export async function deletePipelineHandler(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    await deletePipeline(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete pipeline' });
  }
}
export async function updatePipelineHandler(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    const updatedPipeline = await updatePipeline(id, req.body);

    if (!updatedPipeline) {
      return res.status(404).json({ error: 'Pipeline not found' });
    }

    res.json(updatedPipeline);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update pipeline' });
  }
}
