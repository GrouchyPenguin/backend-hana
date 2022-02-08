import { CreateVideoDto } from '../dtos/videos.dto';
import HttpException from '../exceptions/HttpException';
import { Video, PopulatedVideo } from '../interfaces/videos.interface';
import { User } from '../interfaces/users.interface';
import videoModel from '../models/videos.model';
import { isEmpty } from '../utils/util';
import UserService from './users.service';

class VideoService {
  public videos = videoModel;
  public userService = new UserService();

  public async findAllVideo(): Promise<Video[]> {
    const video: Video[] = this.videos;
    return video;
  }

  public async findVideoById(videoId: string): Promise<Video> {
    const findVideo: Video = this.videos.find(video => video.id === videoId);
    if (!findVideo) throw new HttpException(409, "Error: Not found");

    return findVideo;
  }

  public async createVideo(videoData: CreateVideoDto): Promise<Video> {
    if (isEmpty(videoData)) throw new HttpException(400, "Missing valid video payload");

    const findVideo: Video = this.videos.find(video => video.content === videoData.content);
    if (findVideo) throw new HttpException(409, `Error: Video with content ${videoData.content} already exists`);

    const createVideoData: Video = { id: String(this.videos.length + 1), uploadedAt: String(new Date()), ...videoData };
    this.videos.push(createVideoData);

    return createVideoData;
  }

  public async getPopulatedVideosData(): Promise<PopulatedVideo[]> {
    const videos = await this.findAllVideo();
    const emails = videos.map(video => String(video.user));
    const userObjects = await Promise.all(
      emails.map(email => this.userService.findUserByEmail(email))
    );
    const userObjectsByEmail: Record<string, User> = {};
    userObjects.forEach(userObj => {
      userObjectsByEmail[userObj.email] = userObj;
    });
    return videos.map(video => {
      const populatedVideo: PopulatedVideo = { ...video, user: userObjectsByEmail[String(video.user)] };
      return populatedVideo;
    });
  }

  public async ingestYoutubeVideos(videosData: CreateVideoDto[]): Promise<Video[]> {
    const out: any[] = [];
    for (let videoData of videosData) {
      out.push(await this.createVideo(videoData));
    }
    return out;
  }
}

export default VideoService;
