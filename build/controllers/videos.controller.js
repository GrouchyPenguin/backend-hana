"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const videos_service_1 = __importDefault(require("../services/videos.service"));
const external_1 = require("../services/external");
class VideosController {
    constructor() {
        this.videoService = new videos_service_1.default();
        this.getVideos = async (req, res, next) => {
            try {
                const findAllVideosData = await this.videoService.findAllVideo();
                res.status(200).json({ data: findAllVideosData, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getVideoById = async (req, res, next) => {
            try {
                const videoId = req.params.id;
                const findOneVideoData = await this.videoService.findVideoById(videoId);
                res.status(200).json({ data: findOneVideoData, message: 'findOne' });
            }
            catch (error) {
                next(error);
            }
        };
        this.createVideo = async (req, res, next) => {
            try {
                const videoData = req.body;
                const createVideoData = await this.videoService.createVideo(videoData);
                res.status(201).json({ data: createVideoData, message: 'created' });
            }
            catch (error) {
                next(error);
            }
        };
        this.importVideosFromYoutube = async (req, res, next) => {
            try {
                const data = req.body;
                const createVideoDatas = await this.videoService.ingestYoutubeVideos(data.videoData);
                res.status(200).json({ data: createVideoDatas, message: 'importVideosFromYoutube' });
            }
            catch (error) {
                next(error);
            }
        };
        this.fetchVideosFromYoutube = async (req, res, next) => {
            try {
                const videosData = (await external_1.importFromYoutube()).videoData;
                const created = await this.videoService.ingestYoutubeVideos(videosData);
                res.status(200).json({ data: created, message: 'fetchVideosFromYoutube' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getPopulatedVideosData = async (req, res, next) => {
            try {
                const data = await this.videoService.getPopulatedVideosData();
                res.status(200).json({ data, message: 'getPopulatedVideosData' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = VideosController;
//# sourceMappingURL=videos.controller.js.map