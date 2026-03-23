import axios from 'axios';
import { db } from '../db/client';
import { deliveries } from '../db/schema';

export async function createDelivery(data: {
  jobId: string;
  subscriberId: string;
  status: string;
  attemptCount: number;
  lastError?: string | null;
  lastAttemptAt?: Date | null;
  deliveredAt?: Date | null;
}) {
  const result = await db.insert(deliveries).values(data).returning();
  return result[0];
}

export async function sendToSubscriber(callbackUrl: string, payload: unknown) {
  return axios.post(callbackUrl, payload);
}

export async function sendWithRetry(
  callbackUrl: string,
  payload: unknown,
  maxAttempts = 3,
) {
  let attemptCount = 0;
  let lastError: string | null = null;

  while (attemptCount < maxAttempts) {
    attemptCount++;

    try {
      await sendToSubscriber(callbackUrl, payload);

      return {
        success: true,
        attemptCount,
        lastError: null,
      };
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'Delivery failed';

      if (attemptCount < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  return {
    success: false,
    attemptCount,
    lastError,
  };
}
