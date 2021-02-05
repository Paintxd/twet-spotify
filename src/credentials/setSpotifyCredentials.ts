import { authorizeStep } from './spotifySteps/authorizeStep';
import { authorizationCodeStep } from './spotifySteps/authorizationCodeStep';
import { refreshTokenStep } from './spotifySteps/refreshTokenStep';
import { setupApp } from '../index';
import TerminalSetup from '../utils/terminal';

export const spotifyCredentialsStep = async () => {
  await authorizeStep();

  await authorizationCodeStep();

  await refreshTokenStep();

  setupApp('Setup spotify');
};
