import 'dotenv/config';
import { startWorker } from './jobWorker';

startWorker();

console.log('Worker entry started');
