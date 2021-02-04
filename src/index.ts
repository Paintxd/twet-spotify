import figlet from 'figlet';
import inquirer from 'inquirer';

require('clear')();

export const setupApp = (spotifySetup: boolean, twitterSetup: boolean) => {
  console.log(
    figlet.textSync('Tweet Songs', {
      font: 'Electronic',
    }),
  );

  let choices;
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'start_option',
        message: 'Como deseja iniciar a aplicacao',
        choices: ['Setup twitter', 'Setup spotify', 'Start crons', 'teste'],
        filter: (val: string) => {
          return val.toLowerCase().replace(' ', '_');
        },
      },
    ])
    .then((res) => {
      switch (res.start_option) {
        case 'teste':
          require('./teste');
          break;
        case 'setup_spotify':
          require('./credentials/setSpotifyCredentials');
          break;
        case 'setup_twitter':
          require('./credentials/setTwitterCredentials');
          break;
        case 'start_crons':
          require('./cron/startCron');
          break;
      }
    })
    .catch((err) => {
      throw err;
    });
};
setupApp(false, false);
