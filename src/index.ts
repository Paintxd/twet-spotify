import { SharedSongsDb } from './db/sharedSongsDb';
import { SpotifyClient } from './spotify/spotifyClient';
import { TwitterClient } from './twitter/twitterClient';
import { RandomGenerator } from './utils/randonsGenerator';
import { SongShare } from './utils/songShare';

const run = async () => {
  const twitterClient = new TwitterClient();
  const spotifyClient = new SpotifyClient();
  const sharedSongsDb = new SharedSongsDb();
  await spotifyClient.refreshToken();

  const playlistSize = await spotifyClient.getPlaylist();
  const offset = RandomGenerator.offsetRandom(playlistSize);

  const songs = await spotifyClient.getPlaylistTracks(offset);
  const sharedSongs: string[] = sharedSongsDb.getSharedSongs();
  const recentListenings = await spotifyClient.getRecentListenings();

  const sharedSong = SongShare.shareSong(songs, recentListenings, sharedSongs);
  sharedSongsDb.insertSharedSong(sharedSong.id);
  console.log(`Shared song - ${JSON.stringify(sharedSong)}\n`);

  // twitterClient.postTwet(sharedSong.url);
};
run();
