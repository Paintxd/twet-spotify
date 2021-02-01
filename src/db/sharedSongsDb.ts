import Lowdb, { LowdbAsync, LowdbSync } from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Songs } from 'src/spotify/songs';

export class SharedSongsDb {
  private db;

  constructor() {
    const adapter = new FileSync('shared-songs.json');
    this.db = Lowdb(adapter);
    this.setDefault();
  }

  private setDefault = () => {
    this.db.defaults({ songs: [] }).write();
  };

  insertSharedSong = (songId: string) => {
    this.db.get('songs').push(songId).write();
  };

  getSharedSongs = () => {
    return this.db.get('songs').__wrapped__.songs;
  };
}
