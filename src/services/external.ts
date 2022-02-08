/**
 * DO NOT EDIT
 */

import { ImportYoutubeVideosDto } from '../dtos/videos.dto';


export async function importFromYoutube(): Promise<ImportYoutubeVideosDto> {
  return { videoData: [{
    "name": "Rickroll",
    "content": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "user": "alice@email.com",
    "resX": 400,
    "resY": 600,
    "size": 100000,
    "length": 420145,
  },
  {
    "name": "Real Actors Read Yelp #2",
    "content": "https://www.youtube.com/watch?v=aaSC7qVRL0w",
    "user": "bob@email.com",
    "resX": 400,
    "resY": 600,
    "size": 100000,
    "length": 420145,
  },
  {
    "name": "Real Actors Read Yelp #23",
    "content": "https://www.youtube.com/watch?v=o-O4QWQfRl4",
    "user": "charlie@email.com",
    "resX": 400,
    "resY": 600,
    "size": 100000,
    "length": 420145
  }]};
}
