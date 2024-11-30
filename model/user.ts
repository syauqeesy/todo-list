import { v7 as uuid } from "uuid";
import { string } from "yup";
import { genSaltSync as genSalt, hashSync as hash } from "bcryptjs";
import { UserInfo } from "../type/user";
class User {
  private id!: string;
  private username!: string;
  private password!: string;
  private created_at!: number;
  private updated_at: number | null = null;
  private deleted_at: number | null = null;

  public constructor(username: string, password: string) {
    this.setId();
    this.setUsername(username);
    this.setPassword(password);
    this.setCreatedAt();
  }

  private setId(): void {
    this.id = uuid();
  }

  public setUsername(username: string): void {
    const rules = string()
      .min(3)
      .max(24)
      .matches(/^[a-z0-9]+$/);

    rules.validateSync(username);

    this.username = username;
  }

  public setPassword(password: string): void {
    const rules = string().min(3).max(72);

    rules.validateSync(password);

    const salt = genSalt(10);

    this.password = hash(password, salt);
  }

  private setCreatedAt(): void {
    this.created_at = Date.now();
  }

  public setUpdatedAt(): void {
    this.updated_at = Date.now();
  }

  public setDeletedAt(): void {
    this.deleted_at = Date.now();
  }

  public getId(): string {
    return this.id;
  }

  public getUsername(): string {
    return this.username;
  }

  public getPassword(): string {
    return this.password;
  }

  public getCreatedAt(): number {
    return this.created_at;
  }

  public getUpdatedAt(): number | null {
    return this.updated_at;
  }

  public getDeletedAt(): number | null {
    return this.deleted_at;
  }

  public getInfo(): UserInfo {
    const info: UserInfo = {
      id: this.getId(),
      username: this.getUsername(),
      todos: [],
      created_at: this.getCreatedAt(),
    };

    return info;
  }
}

export default User;
