import { SharedSongsDb } from './db/sharedSongsDb';
import { SpotifyClient } from './spotify/spotifyClient';
import { TwitterClient } from './twitter/twitterClient';
import { RandomGenerator } from './utils/randonsGenerator';

require('dotenv').config();

const argv = require('minimist')(process.argv.slice(2));

const run = async () => {
  const twitterClient = new TwitterClient();
  const spotifyClient = new SpotifyClient();
  const sharedSongsDb = new SharedSongsDb();
  await spotifyClient.refreshToken();

  const playlistSize = await spotifyClient.getPlaylist();

  const offset = RandomGenerator.offsetRandom(playlistSize);
  const songs = await spotifyClient.getPlaylistTracks(offset);
  const sharedSongs: string[] = sharedSongsDb.getSharedSongs();

  const filteredSongs = songs.filter(song => sharedSongs.indexOf(song.id) < 0);

  const randomSongPosition = RandomGenerator.positionShare(filteredSongs.length);
  const sharedSong = filteredSongs[randomSongPosition];
  sharedSongsDb.insertSharedSong(sharedSong.id);
  console.log(sharedSong);

  // twitterClient.postTwet(sharedSong.url)
};
run();
