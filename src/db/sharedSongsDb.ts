import Lowdb, { LowdbSync } from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Songs } from 'src/spotify/songs';

export class SharedSongsDb {
  private db: LowdbSync<Songs[]>;

  constructor() {
    const adapter = new FileSync('shared-songs.json');
    this.db = Lowdb(adapter);
    this.setDefault();
  }

  private setDefault = () => {
    this.db.defaults({ songs: [] }).write();
  };
}
