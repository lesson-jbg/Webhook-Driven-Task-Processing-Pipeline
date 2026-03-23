import { Router } from 'express';
import {
  createPipelineHandler,
  deletePipelineHandler,
  getPipelineByIdHandler,
  getPipelinesHandler,
  updatePipelineHandler,
} from '../controllers/pipelineController';

const router = Router();

router.post('/pipelines', createPipelineHandler);
router.get('/pipelines', getPipelinesHandler);
router.get('/pipelines/:id', getPipelineByIdHandler);
router.delete('/pipelines/:id', deletePipelineHandler);
router.put('/pipelines/:id', updatePipelineHandler);

export default router;
