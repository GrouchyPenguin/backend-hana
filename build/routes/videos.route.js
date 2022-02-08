"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const videos_controller_1 = __importDefault(require("../controllers/videos.controller"));
const videos_dto_1 = require("../dtos/videos.dto");
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
class VideosRoute {
    constructor() {
        this.path = '/videos';
        this.router = express_1.Router();
        this.videosController = new videos_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.videosController.getVideos);
        this.router.get(`${this.path}/:id(\\d+)`, this.videosController.getVideoById);
        this.router.post(`${this.path}`, validation_middleware_1.default(videos_dto_1.CreateVideoDto, 'body'), this.videosController.createVideo);
        this.router.post(`${this.path}/import`, validation_middleware_1.default(videos_dto_1.ImportYoutubeVideosDto, 'body'), this.videosController.importVideosFromYoutube);
        this.router.get(`${this.path}/populated`, this.videosController.getPopulatedVideosData);
        this.router.get(`${this.path}/integration/import`, this.videosController.fetchVideosFromYoutube);
    }
}
exports.default = VideosRoute;
//# sourceMappingURL=videos.route.js.map