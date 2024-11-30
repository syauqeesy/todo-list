import Database from "./database";
import { User, UserRepository } from "./user";

export interface repository {
  user: UserRepository;
}

export const initRepository = (database: Database): repository => {
  const r: repository = {
    user: new User(database),
  };

  return r;
};
