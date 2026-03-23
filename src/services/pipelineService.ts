import { db } from '../db/client';
import { pipelines } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function createPipeline(data: {
  name: string;
  webhookPath: string;
  actionType: string;
}) {
  const result = await db.insert(pipelines).values(data).returning();
  return result[0];
}

export async function getPipelines() {
  return db.select().from(pipelines);
}

export async function getPipelineById(id: string) {
  const result = await db.select().from(pipelines).where(eq(pipelines.id, id));

  return result[0];
}

export async function updatePipeline(
  id: string,
  data: {
    name?: string;
    webhookPath?: string;
    actionType?: string;
  },
) {
  const result = await db
    .update(pipelines)
    .set(data)
    .where(eq(pipelines.id, id))
    .returning();

  return result[0];
}

export async function deletePipeline(id: string) {
  await db.delete(pipelines).where(eq(pipelines.id, id));
}
