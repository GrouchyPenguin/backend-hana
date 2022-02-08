import { Video, PopulatedVideo } from '../interfaces/videos.interface';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import videoModel from '../models/videos.model';
import UserService from './users.service';
import VideoService from './videos.service';

const migrations: (() => Promise<string>)[] = [
  async (): Promise<string> => {
    // add code here
    const out = 'NULL SET MIGRATION';
    console.log(out);
    return out;
  },
];

class MigrationService {
  public async runMigrations(): Promise<string[]> {
    return await Promise.all(migrations.map((migration: Function) => migration()));
  }
}

export default MigrationService;
