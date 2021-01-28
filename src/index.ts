import { SpotifyClient } from './spotify/spotifyClient';
import { TwitterClient } from './twitter/twitterClient';

require('dotenv').config();

const argv = require('minimist')(process.argv.slice(2));

const run = async () => {
  const twitterClient = new TwitterClient();
  const spotifyClient = new SpotifyClient();
  await spotifyClient.refreshToken();
  await spotifyClient.getPlaylist();
};
run();
