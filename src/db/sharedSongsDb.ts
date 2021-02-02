import Lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

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
