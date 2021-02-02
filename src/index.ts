import fs from 'fs';
import path from 'path';
import { CronJob } from 'cron';
import { share } from './songSharing/shareSong';

const shareJob = new CronJob('0 19 * * *', 
  () => share(), null, true, 'America/Sao_Paulo'
);

const clearDbJob = new CronJob('0 20 * * 0',
  () => fs.unlinkSync(path.join(__dirname, '../shared-songs.json')),
  null, true, 'America/Sao_Paulo'
);

console.log('- Starting jobs');
shareJob.start();
clearDbJob.start();
