import { Request, Response } from "express";
import {
  createPipeline,
  getPipelines,
  getPipelineById,
  deletePipeline,
} from "../../services/pipelineService";

export async function createPipelineHandler(req: Request, res: Response) {
  try {
    const pipeline = await createPipeline(req.body);
    res.status(201).json(pipeline);
  } catch (error) {
    res.status(500).json({ error: "Failed to create pipeline" });
  }
}

export async function getPipelinesHandler(req: Request, res: Response) {
  try {
    const result = await getPipelines();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pipelines" });
  }
}

export async function getPipelineByIdHandler(req: Request, res: Response) {
  try {
   const id = String(req.params.id);
   const pipeline = await getPipelineById(id);

    if (!pipeline) {
      return res.status(404).json({ error: "Pipeline not found" });
    }

    res.json(pipeline);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pipeline" });
  }
}

export async function deletePipelineHandler(req: Request, res: Response) {
  try {
    const id=String(req.params.id);
    await deletePipeline(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete pipeline" });
  }
}