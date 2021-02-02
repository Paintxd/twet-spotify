import { Song } from '../spotify/song';
import { RandomGenerator } from './randonsGenerator';

export class SongShare {
  static shareSong = (
    songs: Song[],
    recentListenings: Song[],
    sharedSongs: string[],
  ): Song => {
    const recentShare = SongShare.findSong(recentListenings, sharedSongs);
    const recentShareLength = recentShare.length;
    if (recentShareLength)
      return recentShare[RandomGenerator.positionShare(recentShareLength)];

    const songsFiltered = SongShare.findSong(songs, sharedSongs);

    return songsFiltered[RandomGenerator.positionShare(songsFiltered.length)];
  };

  private static findSong = (songs: Song[], sharedSongs: string[]) => {
    return songs.filter((obj) => sharedSongs.indexOf(obj.id) < 0);
  };
}
