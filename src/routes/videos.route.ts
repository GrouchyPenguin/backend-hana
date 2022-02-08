import { Router } from 'express';
import VideosController from '../controllers/videos.controller';
import { CreateVideoDto, ImportYoutubeVideosDto } from '../dtos/videos.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class VideosRoute implements Route {
  public path = '/videos';
  public router = Router();
  public videosController = new VideosController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.videosController.getVideos);
    this.router.get(`${this.path}/:id(\\d+)`, this.videosController.getVideoById);
    this.router.post(`${this.path}`, validationMiddleware(CreateVideoDto, 'body'), this.videosController.createVideo);
    this.router.post(`${this.path}/import`, validationMiddleware(ImportYoutubeVideosDto, 'body'), this.videosController.importVideosFromYoutube);
    this.router.get(`${this.path}/populated`, this.videosController.getPopulatedVideosData);
    this.router.get(`${this.path}/integration/import`, this.videosController.fetchVideosFromYoutube);
  }
}

export default VideosRoute;
