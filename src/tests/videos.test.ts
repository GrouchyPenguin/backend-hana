import request from 'supertest';
import App from '../app';
import { Video } from '../interfaces/videos.interface';
import videoModel from '../models/videos.model';
import UserRoute from '../routes/users.route';
import VideoRoute from '../routes/videos.route';
import { CreateVideoDto } from '../dtos/videos.dto';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Videos', () => {
  describe('[GET] /videos', () => {
    it('response statusCode 200 / findAll', () => {
      const findVideo: Video[] = videoModel;
      const videosRoute = new VideoRoute();
      const app = new App([videosRoute]);

      return request(app.getServer()).get(`${videosRoute.path}`).expect(200, { data: findVideo, message: 'findAll' });
    });
  });

  describe('[GET] /videos/:id', () => {
    it('response statusCode 200 / findOne', () => {
      const videoId = '1';
      const findVideo: Video = videoModel.find(video => video.id === videoId);
      const videosRoute = new VideoRoute();
      const app = new App([videosRoute]);

      return request(app.getServer()).get(`${videosRoute.path}/${videoId}`).expect(200, { data: findVideo, message: 'findOne' });
    });
  });

  describe('[POST] /videos', () => {
    it('response statusCode 201 / created', async () => {
      const videoData: CreateVideoDto = {
        name: 'test',
        content: 'blah.com/video.mov',
        user: 'kim@gmail.com',
        resX: 1,
        resY: 2,
        size: 3,
        length: 4,
      };
      const videosRoute = new VideoRoute();
      const app = new App([videosRoute]);

      return request(app.getServer()).post(`${videosRoute.path}`).send(videoData).expect(201);
    });
  });

  describe('[GET] /videos/integration/import', () => {
    const videosRoute = new VideoRoute();
    const app = new App([videosRoute]);

    it('response statusCode 200 / imported', async () => {
      return request(app.getServer()).get(`${videosRoute.path}/integration/import`).send().expect(200);
    });
  });
});
