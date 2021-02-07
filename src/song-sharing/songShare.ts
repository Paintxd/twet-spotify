import kleur from 'kleur';
import { RandomGenerator } from './utils/randonsGenerator';
import { SharedSongsDb } from '../db/sharedSongsDb';
import { Song } from './spotify/song';
import { SpotifyClient } from './spotify/spotifyClient';
import { TwitterClient } from './twitter/twitterClient';

class SongShare {
  private twitterClient: TwitterClient;
  private spotifyClient: SpotifyClient;
  private sharedSongsDb: SharedSongsDb;

  constructor() {
    this.twitterClient = new TwitterClient();
    this.spotifyClient = new SpotifyClient();
    this.sharedSongsDb = new SharedSongsDb();
  }

  share = async () => {
    await this.spotifyClient.refreshToken();

    const sharedSongs: string[] = this.sharedSongsDb.getSharedSongs();

    const recentListenings = await this.spotifyClient.getRecentListenings();
    const recentShare = this.getSong(recentListenings, sharedSongs);
    if (recentShare)
      return this.postAndInsert(recentShare, 'recent listening');

    const playlistSize = await this.spotifyClient.getPlaylist();
    const offset = RandomGenerator.offsetRandom(playlistSize);
    const songs = await this.spotifyClient.getPlaylistTracks(offset);
    const sharedSong = this.getSong(songs, sharedSongs);

    return this.postAndInsert(sharedSong, 'random');
  };

  private postAndInsert = (song: Song, type: string) => {
    console.log(kleur.bold().white(`shared ${type} - ${song}`));

    this.sharedSongsDb.insertSharedSong(song.id);
    this.twitterClient.postTwet(song.url);
  };

  private getSong = (songs: Song[], sharedSongs: string[]): Song => {
    const songsFiltered = songs.filter(
      (obj) => sharedSongs.indexOf(obj.id) < 0,
    );

    const listLength = songsFiltered.length;

    const songShared = songsFiltered[RandomGenerator.positionShare(listLength)];
    return songShared || null;
  };
}

export default new SongShare();
