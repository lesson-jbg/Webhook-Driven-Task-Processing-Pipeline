import { db } from '../db/client';
import { jobs, deliveries } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function getAllJobs() {
  return db.select().from(jobs);
}

export async function getJobById(id: string) {
  const result = await db.select().from(jobs).where(eq(jobs.id, id));

  return result[0];
}

export async function getDeliveriesByJobId(jobId: string) {
  return db.select().from(deliveries).where(eq(deliveries.jobId, jobId));
}
