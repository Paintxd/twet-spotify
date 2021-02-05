import inquirer from 'inquirer';
import TerminalSetup from './utils/terminal';
import { spotifyCredentialsStep } from './credentials/setSpotifyCredentials';
import { startCrons } from './cron/startCron';
import { twitterCredentialsStep } from './credentials/setTwitterCredentials';

let choices = ['Start crons', 'Setup twitter', 'Setup spotify'];

export const setupApp = (step: string) => {
  TerminalSetup.clearAndPrint();

  choices = choices.filter((option) => option !== step);
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
setupApp('');
