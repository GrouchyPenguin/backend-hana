import { User } from './users.interface';

export interface Video {
  id: string;
  user: string | User;
  name: string;
  resX: number;
  resY: number;
  size: number;
  length: number;
  content: string;
  uploadedAt: string;
}

export interface PopulatedVideo extends Video {
  user: User;
}
