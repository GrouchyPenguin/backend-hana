import bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import { isEmpty } from '../utils/util';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = this.users;
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    const findUser: User = this.users.find(user => user.id === userId);
    if (!findUser) throw new HttpException(404, "Error: User not found");

    return findUser;
  }

  public async findUserByEmail(email: string): Promise<User> {
    const findUser: User = this.users.find(user => user.email === email);
    if (!findUser) throw new HttpException(404, "Error: User not found");

    return findUser;
  }

  public async userExistWithEmail(email: string | User): Promise<boolean> {
    let val: string = '';
    if (typeof email !== "string") {
      val = (email as User).email;
    } else {
      val = (email as string);
    }
    return Boolean(this.users.find(user => user.email === val));
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "Malformed payload");

    const findUser: User = this.users.find(user => user.email === userData.email);
    if (findUser) throw new HttpException(409, `Error: User with email ${userData.email} already exists`);

    const pw = userData.password || 'defaultPassword';
    const hashedPassword = await bcrypt.hash(pw, 10);
    const createUserData: User = { id: String(this.users.length + 1), ...userData, password: hashedPassword };
    this.users.push(createUserData);

    return createUserData;
  }

  public async updateUser(userId: string, userData: User): Promise<User[]> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = this.users.find(user => user.id === userId);
    if (!findUser) throw new HttpException(404, "Error: User not found");

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const updateUserData: User[] = this.users.map((user: User) => {
      if (user.id === findUser.id) user = { id: userId, ...userData, password: hashedPassword };
      return user;
    });

    return updateUserData;
  }

  public async deleteUser(userId: string): Promise<User[]> {
    const findUser: number = this.users.findIndex(user => user.id === userId);
    if (findUser < 0) throw new HttpException(404, "Error: User not found");

    this.users.splice(findUser, 1);
    return this.users;
  }
}

export default UserService;
