import { Worker, Job } from 'bullmq';

const process= 'randomByte'
const worker = new Worker(queueName, async (job) => {
  await job.updateProgress(42);

  await job.updateProgress({ foo: 'bar' });

  return process;
});