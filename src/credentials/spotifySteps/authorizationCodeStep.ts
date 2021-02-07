import inquirer from 'inquirer';
import kleur from 'kleur';
import EnvFile from '../../utils/envFile';
import TerminalSetup from '../../utils/terminal';

export const authorizationCodeStep = async (authorizationUrl: string) => {
  TerminalSetup.clearAndPrint();
  console.log(kleur.bgRed().bold().white(authorizationUrl));

  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'authorization_code',
        message: 'Insert your authorization code',
      },
    ])
    .then((res) => {
      EnvFile.writeFile(`SPOTIFY_AUTHORIZATION_CODE=${res.authorization_code}`);
    });
};
