"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const videos_model_1 = __importDefault(require("../models/videos.model"));
const util_1 = require("../utils/util");
const users_service_1 = __importDefault(require("./users.service"));
class VideoService {
    constructor() {
        this.videos = videos_model_1.default;
        this.userService = new users_service_1.default();
    }
    async findAllVideo() {
        const video = this.videos;
        return video;
    }
    async findVideoById(videoId) {
        const findVideo = this.videos.find(video => video.id === videoId);
        if (!findVideo)
            throw new HttpException_1.default(409, "Error: Not found");
        return findVideo;
    }
    async createVideo(videoData) {
        if (util_1.isEmpty(videoData))
            throw new HttpException_1.default(400, "Missing valid video payload");
        const findVideo = this.videos.find(video => video.content === videoData.content);
        if (findVideo)
            throw new HttpException_1.default(409, `Error: Video with content ${videoData.content} already exists`);
        const createVideoData = Object.assign({ id: String(this.videos.length + 1), uploadedAt: String(new Date()) }, videoData);
        this.videos.push(createVideoData);
        return createVideoData;
    }
    async getPopulatedVideosData() {
        const videos = await this.findAllVideo();
        const emails = videos.map(video => String(video.user));
        const userObjects = await Promise.all(emails.map(email => this.userService.findUserByEmail(email)));
        const userObjectsByEmail = {};
        userObjects.forEach(userObj => {
            userObjectsByEmail[userObj.email] = userObj;
        });
        return videos.map(video => {
            const populatedVideo = Object.assign(Object.assign({}, video), { user: userObjectsByEmail[String(video.user)] });
            return populatedVideo;
        });
    }
    async ingestYoutubeVideos(videosData) {
        const out = [];
        for (let videoData of videosData) {
            out.push(await this.createVideo(videoData));
        }
        return out;
    }
}
exports.default = VideoService;
//# sourceMappingURL=videos.service.js.map