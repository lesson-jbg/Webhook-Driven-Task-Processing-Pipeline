import { db } from "../db/client";
import { jobs, pipelines } from "../db/schema";
import { eq ,and} from "drizzle-orm";

export async function findPipelineByWebhookPath(webhookPath: string) {
  const result = await db.select().from(pipelines).where(eq(pipelines.webhookPath, webhookPath));
  return result[0];
}

export async function createJob(data: {
  pipelineId: string;
  payload: unknown;
}) {
  const result = await db.insert(jobs).values({
      pipelineId: data.pipelineId,
      payload: data.payload,
      status: "pending",
    }).returning();

  return result[0];
}
export async function getNextPendingJob() {
  const result = await db.select().from(jobs).where(eq(jobs.status, "pending")).limit(1);
  return result[0];
}

export async function updateJobStatus(jobId: string,status: "pending" | "processing" | "completed" | "failed") {
  const result = await db.update(jobs).set({status,updatedAt: new Date(),}).where(eq(jobs.id, jobId)).returning();
  return result[0];
}
export async function completeJob(
  jobId: string,
  processedPayload: unknown
) {
  const result = await db
    .update(jobs)
    .set({
      status: "completed",
      processedPayload,
      updatedAt: new Date(),
    })
    .where(eq(jobs.id, jobId))
    .returning();

  return result[0];
}

export async function failJob(jobId: string, errorMessage: string) {
  const result = await db
    .update(jobs)
    .set({
      status: "failed",
      errorMessage,
      updatedAt: new Date(),
    })
    .where(eq(jobs.id, jobId))
    .returning();

  return result[0];
}