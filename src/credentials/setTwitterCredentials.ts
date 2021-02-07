import inquirer from 'inquirer';
import EnvFile from '../utils/envFile';
import { setupApp } from '../index';
import TerminalSetup from '../utils/terminal';

export const twitterCredentialsStep = () => {
  TerminalSetup.clearAndPrint();

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'consumer_key',
        message: 'Insert your consumer key',
      },
      {
        type: 'input',
        name: 'consumer_secret',
        message: 'Insert your consumer secret',
      },
      {
        type: 'input',
        name: 'acess_token_key',
        message: 'Insert your acess token key',
      },
      {
        type: 'input',
        name: 'acess_token_secret',
        message: 'Insert your acess token secret',
      },
    ])
    .then((res) => {
      const envValues = `TWITTER_CONSUMER_KEY=${res.consumer_key}\nTWITTER_CONSUMER_SECRET=${res.consumer_secret}\nTWITTER_ACCESS_TOKEN_KEY=${res.acess_token_key}\nTWITTER_ACCESS_TOKEN_SECRET=${res.acess_token_secret}\n`;
      EnvFile.writeFile(envValues);

      setupApp();
    });
};
