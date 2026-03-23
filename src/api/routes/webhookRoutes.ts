import { Router } from "express";
import { ingestWebhookHandler } from "../controllers/webhookController";

const router = Router();

router.post("/webhooks/:webhookPath", ingestWebhookHandler);

export default router;