import {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from '@aws-sdk/client-sqs';
import { processJobById } from './jobWorker';

const sqs = new SQSClient({
  region: process.env.AWS_REGION || 'eu-north-1',
});

const queueUrl = process.env.SQS_QUEUE_URL;

export async function startSqsWorker() {
  if (!queueUrl) {
    throw new Error('SQS_QUEUE_URL is missing');
  }

  console.log('SQS Worker started...');

  while (true) {
    try {
      const response = await sqs.send(
        new ReceiveMessageCommand({
          QueueUrl: queueUrl,
          MaxNumberOfMessages: 1,
          WaitTimeSeconds: 20,
          VisibilityTimeout: 60,
        }),
      );

      const messages = response.Messages || [];

      for (const message of messages) {
        if (!message.Body || !message.ReceiptHandle) {
          continue;
        }

        try {
          const body = JSON.parse(message.Body);

          if (!body.jobId) {
            throw new Error('SQS message does not contain jobId');
          }

          console.log('Received SQS job:', body.jobId);

          await processJobById(body.jobId);

          await sqs.send(
            new DeleteMessageCommand({
              QueueUrl: queueUrl,
              ReceiptHandle: message.ReceiptHandle,
            }),
          );

          console.log('Deleted SQS message for job:', body.jobId);
        } catch (error) {
          const messageText =
            error instanceof Error ? error.message : 'Unknown SQS job error';

          console.error('Failed to process SQS message:', messageText);

          // Important:
          // Do NOT delete failed messages.
          // SQS will retry them.
          // After maxReceiveCount = 3, they move to DLQ.
        }
      }
    } catch (error) {
      const messageText =
        error instanceof Error ? error.message : 'Unknown polling error';

      console.error('SQS polling error:', messageText);

      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}
