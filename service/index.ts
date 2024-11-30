import { repository } from "../repository";
import { User, UserService } from "./user";

export interface service {
  user: UserService;
}

export const initService = (repository: repository) => {
  const s: service = {
    user: new User(repository),
  };

  return s;
};
