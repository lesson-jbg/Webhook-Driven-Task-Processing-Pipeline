import { Router } from "express";
import {
  getJobsHandler,
  getJobByIdHandler,
  getJobDeliveriesHandler,
} from "../controllers/jobController";

const router = Router();

router.get("/jobs", getJobsHandler);
router.get("/jobs/:id", getJobByIdHandler);
router.get("/jobs/:id/deliveries", getJobDeliveriesHandler);

export default router;