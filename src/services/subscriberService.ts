import { db } from '../db/client';
import { subscribers } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function createSubscriber(data: {
  pipelineId: string;
  callbackUrl: string;
}) {
  const result = await db.insert(subscribers).values(data).returning();
  return result[0];
}

export async function getSubscribersByPipelineId(pipelineId: string) {
  return db
    .select()
    .from(subscribers)
    .where(eq(subscribers.pipelineId, pipelineId));
}

export async function deleteSubscriber(id: string) {
  await db.delete(subscribers).where(eq(subscribers.id, id));
}
