"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const users_model_1 = __importDefault(require("../models/users.model"));
const util_1 = require("../utils/util");
class UserService {
    constructor() {
        this.users = users_model_1.default;
    }
    async findAllUser() {
        const users = this.users;
        return users;
    }
    async findUserById(userId) {
        const findUser = this.users.find(user => user.id === userId);
        if (!findUser)
            throw new HttpException_1.default(404, "Error: User not found");
        return findUser;
    }
    async findUserByEmail(email) {
        const findUser = this.users.find(user => user.email === email);
        if (!findUser)
            throw new HttpException_1.default(404, "Error: User not found");
        return findUser;
    }
    async userExistWithEmail(email) {
        let val = '';
        if (typeof email !== "string") {
            val = email.email;
        }
        else {
            val = email;
        }
        return Boolean(this.users.find(user => user.email === val));
    }
    async createUser(userData) {
        if (util_1.isEmpty(userData))
            throw new HttpException_1.default(400, "Malformed payload");
        const findUser = this.users.find(user => user.email === userData.email);
        if (findUser)
            throw new HttpException_1.default(409, `Error: User with email ${userData.email} already exists`);
        const pw = userData.password || 'defaultPassword';
        const hashedPassword = await bcrypt_1.default.hash(pw, 10);
        const createUserData = Object.assign(Object.assign({ id: String(this.users.length + 1) }, userData), { password: hashedPassword });
        this.users.push(createUserData);
        return createUserData;
    }
    async updateUser(userId, userData) {
        if (util_1.isEmpty(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = this.users.find(user => user.id === userId);
        if (!findUser)
            throw new HttpException_1.default(404, "Error: User not found");
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
        const updateUserData = this.users.map((user) => {
            if (user.id === findUser.id)
                user = Object.assign(Object.assign({ id: userId }, userData), { password: hashedPassword });
            return user;
        });
        return updateUserData;
    }
    async deleteUser(userId) {
        const findUser = this.users.findIndex(user => user.id === userId);
        if (findUser < 0)
            throw new HttpException_1.default(404, "Error: User not found");
        this.users.splice(findUser, 1);
        return this.users;
    }
}
exports.default = UserService;
//# sourceMappingURL=users.service.js.map