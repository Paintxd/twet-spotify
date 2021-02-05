import { setupApp } from '../index';
import TerminalSetup from '../utils/terminal';

export const spotifyCredentialsStep = () => {
  TerminalSetup.clearAndPrint();



  // const envValues = `
  // SPOTIFY_CLIENT_ID=
  // SPOTIFY_CLIENT_SECRET=
  // SPOTIFY_REFRESH_TOKEN=
  // SPOTIFY_AUTHORIZATION_CODE=
  // `;

  setupApp('Setup spotify');
};
