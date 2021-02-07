import inquirer from 'inquirer';
import TerminalSetup from './utils/terminal';
import { spotifyCredentialsStep } from './credentials/setSpotifyCredentials';
import { startCrons } from './cron/startCron';
import { twitterCredentialsStep } from './credentials/setTwitterCredentials';

export const setupApp = () => {
  TerminalSetup.clearAndPrint();

  const choices = ['Start crons'];
  if(!process.env.TWITTER_ACCESS_TOKEN_SECRET)
    choices.push('Setup twitter');
  if(!process.env.SPOTIFY_REFRESH_TOKEN)
    choices.push('Setup spotify');

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'start_option',
        message: 'Select your startup',
        choices,
        filter: (val: string) => {
          return val.toLowerCase().replace(' ', '_');
        },
      },
    ])
    .then((res) => {
      switch (res.start_option) {
        case 'setup_spotify':
          spotifyCredentialsStep();
          break;
        case 'setup_twitter':
          twitterCredentialsStep();
          break;
        case 'start_crons':
          startCrons();
          break;
      }
    })
    .catch((err) => {
      throw err;
    });
};
setupApp();
