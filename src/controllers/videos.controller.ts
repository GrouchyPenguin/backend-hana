import { NextFunction, Request, Response } from 'express';
import { CreateVideoDto, ImportYoutubeVideosDto } from '../dtos/videos.dto';
import { Video, PopulatedVideo } from '../interfaces/videos.interface';
import videoService from '../services/videos.service';
import { importFromYoutube } from '../services/external';

class VideosController {
  public videoService = new videoService();

  public getVideos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllVideosData: Video[] = await this.videoService.findAllVideo();

      res.status(200).json({ data: findAllVideosData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getVideoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const videoId = req.params.id;
      const findOneVideoData: Video = await this.videoService.findVideoById(videoId);

      res.status(200).json({ data: findOneVideoData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const videoData: CreateVideoDto = req.body;
      const createVideoData: Video = await this.videoService.createVideo(videoData);

      res.status(201).json({ data: createVideoData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public importVideosFromYoutube = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: ImportYoutubeVideosDto = req.body;
      const createVideoDatas: Video[] = await this.videoService.ingestYoutubeVideos(data.videoData);

      res.status(200).json({ data: createVideoDatas, message: 'importVideosFromYoutube' });
    } catch (error) {
      next(error);
    }
  };

  public fetchVideosFromYoutube = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const videosData: CreateVideoDto[] = (await importFromYoutube()).videoData;
      const created: Video[] = await this.videoService.ingestYoutubeVideos(videosData);

      res.status(200).json({ data: created, message: 'fetchVideosFromYoutube' });
    } catch (error) {
      next(error);
    }
  };

  public getPopulatedVideosData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: PopulatedVideo[] = await this.videoService.getPopulatedVideosData();
      res.status(200).json({ data, message: 'getPopulatedVideosData' });
    } catch (error) {
      next(error)
    }
  };
}

export default VideosController;
