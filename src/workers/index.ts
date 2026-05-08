import 'dotenv/config';
import { startSqsWorker } from './sqsWorker';

startSqsWorker().catch((error) => {
  console.error('Failed to start SQS worker:', error);
  process.exit(1);
});
