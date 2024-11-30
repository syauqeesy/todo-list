import Service from "./service";
import { UserInfo } from "../type/user";
import { CreateUserRequest } from "../type/user";
import UserModel from "../model/user";

export interface UserService {
  register(request: CreateUserRequest): Promise<UserInfo>;
}

export class User extends Service implements UserService {
  public async register(request: CreateUserRequest): Promise<UserInfo> {
    const user = new UserModel(request.username, request.password);

    await this.repository.user.insert(user);

    return user.getInfo();
  }
}
