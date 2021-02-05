import inquirer from 'inquirer';
import SpotifyWebApi from 'spotify-web-api-node';
import EnvFile from '../../utils/envFile';
import TerminalSetup from '../../utils/terminal';

export const authorizeStep = async () => {
  TerminalSetup.clearAndPrint();
  const scopes = ['user-read-recently-played', 'user-read-currently-playing'];
  const redirectUri = 'localhost:8081';

  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'client_id',
        message: 'Insert your client id',
      },
      {
        type: 'input',
        name: 'client_secret',
        message: 'Insert your client secret',
      },
    ])
    .then((res) => {
      const envValues = `SPOTIFY_CLIENT_ID=${res.client_id}\nSPOTIFY_CLIENT_SECRET=${res.client_secret}`;
      EnvFile.writeFile(envValues);

      const spotifyClient = new SpotifyWebApi({
        redirectUri,
        clientId: res.client_id,
      });

      const authorizationUrl = spotifyClient.createAuthorizeURL(scopes, 'authorization');
      console.log(`Acess this link and get your authorization code \n - ${authorizationUrl}`);
    });
};
