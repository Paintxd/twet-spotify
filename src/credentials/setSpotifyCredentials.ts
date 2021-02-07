import express from 'express';
import { authorizeStep } from './spotifySteps/authorizeStep';
import { authorizationCodeStep } from './spotifySteps/authorizationCodeStep';
import { refreshTokenStep } from './spotifySteps/refreshTokenStep';
import { setupApp } from '../index';

export const spotifyCredentialsStep = async () => {
  setupExpress();

  const authorizationUrl = await authorizeStep();

  await authorizationCodeStep(authorizationUrl);

  await refreshTokenStep();

  setupApp();
};

const setupExpress = () => {
  const app = express();
  app.set('views', 'src/views');
  app.set('view engine', 'ejs');
  const server = app.listen(8081, () => {});

  app.get('', (req, res) => {
    if (req.query && req.query.code)
      res.render('index', { code: req.query.code });
    server.close();
  });
};
