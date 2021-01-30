import { SharedSongsDb } from './db/sharedSongsDb';
import { SpotifyClient } from './spotify/spotifyClient';
import { TwitterClient } from './twitter/twitterClient';

require('dotenv').config();

const argv = require('minimist')(process.argv.slice(2));

const run = async () => {
  const twitterClient = new TwitterClient();
  const spotifyClient = new SpotifyClient();
  const sharedSongsDb = new SharedSongsDb();
  await spotifyClient.refreshToken();
  const songs = await spotifyClient.getPlaylist();
  // console.log(songs)
  // twitterClient.postTwet(songs[0].url)
};
run();
