import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

const sqs = new SQSClient({
  region: process.env.AWS_REGION || 'eu-north-1',
});

const queueUrl = process.env.SQS_QUEUE_URL;

export async function sendJobMessageToQueue(data: {
  jobId: string;
  pipelineId: string;
  actionType: string;
}) {
  if (!queueUrl) {
    throw new Error('SQS_QUEUE_URL is missing');
  }

  await sqs.send(
    new SendMessageCommand({
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(data),
    }),
  );
}
