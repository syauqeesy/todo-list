import Repository from "./repository";
import UserModel from "../model/user";
import { PoolConnection } from "mysql2/promise";

export interface UserRepository {
  insert(user: UserModel): Promise<void>;
}

export class User extends Repository implements UserRepository {
  public async insert(user: UserModel): Promise<void> {
    return this.database.withConnection<void>(
      async (poolConnection: PoolConnection): Promise<void> => {
        poolConnection.query(
          "INSERT INTO users (id, username, password, created_at) VALUES (?, ?, ?, ?)",
          [
            user.getId(),
            user.getUsername(),
            user.getPassword(),
            user.getCreatedAt(),
          ],
        );
      },
    );
  }
}
