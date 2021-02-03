import fs from 'fs';
import path from 'path';
import { CronJob } from 'cron';
import songShare from './songSharing/songShare';

const shareJob = new CronJob('0 19 * * *', 
  () => songShare.share(), 
  null, true, 'America/Sao_Paulo'
);

const clearDbJob = new CronJob('0 20 * * 0',
  () => fs.unlinkSync(path.join(__dirname, '../shared-songs.json')),
  null, true, 'America/Sao_Paulo'
);

console.log('- Starting jobs');
shareJob.start();
clearDbJob.start();
