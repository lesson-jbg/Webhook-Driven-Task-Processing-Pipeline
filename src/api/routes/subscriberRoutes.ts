import { Router } from "express";
import { createSubscriberHandler,getSubscribersByPipelineHandler,deleteSubscriberHandler } from "../controllers/subscriberController";

const router =Router();

router.post("/pipelines/:id/subscribers", createSubscriberHandler);
router.get("/pipelines/:id/subscribers", getSubscribersByPipelineHandler);
router.delete("/subscribers/:id", deleteSubscriberHandler);

export default router;