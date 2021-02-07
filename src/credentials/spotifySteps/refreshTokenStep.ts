import SpotifyWebApi from 'spotify-web-api-node';
import EnvFile from '../../utils/envFile';

export const refreshTokenStep = async () => {
  const spotifyClient = new SpotifyWebApi({
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  spotifyClient.authorizationCodeGrant(process.env.SPOTIFY_AUTHORIZATION_CODE)
    .then((res) => {
      EnvFile.writeFile(`SPOTIFY_REFRESH_TOKEN=${res.body.refresh_token}`);
    });
};
