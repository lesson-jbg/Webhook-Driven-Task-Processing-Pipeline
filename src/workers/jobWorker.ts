import {
  getNextPendingJob,
  updateJobStatus,
  completeJob,
  failJob,
} from '../services/jobService';
import { getPipelineById } from '../services/pipelineService';
import { runAction } from '../actions';
import { getSubscribersByPipelineId } from '../services/subscriberService';
import { createDelivery, sendWithRetry } from '../services/deliveryService';
export async function startWorker() {
  console.log('Worker started...');

  setInterval(async () => {
    try {
      const job = await getNextPendingJob();

      if (!job) {
        return;
      }

      console.log('Processing job:', job.id);

      await updateJobStatus(job.id, 'processing');

      const pipeline = await getPipelineById(job.pipelineId);

      if (!pipeline) {
        await failJob(job.id, 'Pipeline not found');
        return;
      }

      const processedPayload = await runAction(
        pipeline.actionType,
        job.payload as { message?: string; [key: string]: unknown },
      );

      await completeJob(job.id, processedPayload);

      const subscribers = await getSubscribersByPipelineId(job.pipelineId);

      for (const subscriber of subscribers) {
        const result = await sendWithRetry(
          subscriber.callbackUrl,
          processedPayload,
          3,
        );

        await createDelivery({
          jobId: job.id,
          subscriberId: subscriber.id,
          status: result.success ? 'success' : 'failed',
          attemptCount: result.attemptCount,
          lastAttemptAt: new Date(),
          deliveredAt: result.success ? new Date() : null,
          lastError: result.lastError,
        });

        if (result.success) {
          console.log(`Delivered job ${job.id} to ${subscriber.callbackUrl}`);
        } else {
          console.error(
            `Failed delivery for job ${job.id} to ${subscriber.callbackUrl} after ${result.attemptCount} attempts`,
          );
        }
      }

      console.log('Job completed:', job.id);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unknown worker error';
      console.error('Worker error:', message);
    }
  }, 3000);
}
