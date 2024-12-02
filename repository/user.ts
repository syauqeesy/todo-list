import Repository from "./repository";
import UserModel from "../model/user";
import { PoolConnection, RowDataPacket } from "mysql2/promise";

export interface UserRepository {
  selectByUsername(username: string): Promise<UserModel | null>;
  insert(user: UserModel): Promise<void>;
}

export class User extends Repository implements UserRepository {
  public async selectByUsername(username: string): Promise<UserModel | null> {
    return this.database.withConnection<UserModel | null>(
      async (poolConnection: PoolConnection): Promise<UserModel | null> => {
        const [result] = await poolConnection.query<RowDataPacket[]>(
          "SELECT * FROM users WHERE username = ? AND deleted_at IS NULL LIMIT 1",
          [username],
        );

        if (result.length !== 1) return null;

        const user = new UserModel(result[0].username);

        user.setId(result[0].id);
        user.setCreatedAt(result[0].created_at);

        return user;
      },
    );
  }

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
