"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const videos_model_1 = __importDefault(require("../models/videos.model"));
const videos_route_1 = __importDefault(require("../routes/videos.route"));
afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
});
describe('Testing Videos', () => {
    describe('[GET] /videos', () => {
        it('response statusCode 200 / findAll', () => {
            const findVideo = videos_model_1.default;
            const videosRoute = new videos_route_1.default();
            const app = new app_1.default([videosRoute]);
            return supertest_1.default(app.getServer()).get(`${videosRoute.path}`).expect(200, { data: findVideo, message: 'findAll' });
        });
    });
    describe('[GET] /videos/:id', () => {
        it('response statusCode 200 / findOne', () => {
            const videoId = '1';
            const findVideo = videos_model_1.default.find(video => video.id === videoId);
            const videosRoute = new videos_route_1.default();
            const app = new app_1.default([videosRoute]);
            return supertest_1.default(app.getServer()).get(`${videosRoute.path}/${videoId}`).expect(200, { data: findVideo, message: 'findOne' });
        });
    });
    describe('[POST] /videos', () => {
        it('response statusCode 201 / created', async () => {
            const videoData = {
                name: 'test',
                content: 'blah.com/video.mov',
                user: 'kim@gmail.com',
                resX: 1,
                resY: 2,
                size: 3,
                length: 4,
            };
            const videosRoute = new videos_route_1.default();
            const app = new app_1.default([videosRoute]);
            return supertest_1.default(app.getServer()).post(`${videosRoute.path}`).send(videoData).expect(201);
        });
    });
    describe('[GET] /videos/integration/import', () => {
        const videosRoute = new videos_route_1.default();
        const app = new app_1.default([videosRoute]);
        it('response statusCode 200 / imported', async () => {
            return supertest_1.default(app.getServer()).get(`${videosRoute.path}/integration/import`).send().expect(200);
        });
    });
});
//# sourceMappingURL=videos.test.js.map