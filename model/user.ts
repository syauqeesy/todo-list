import { v7 as uuid } from "uuid";
import { string } from "yup";
import { genSaltSync as genSalt, hashSync as hash } from "bcryptjs";
import { UserInfo } from "../type/user";

interface UserModel {
  id?: string;
  username: string;
  password?: string;
  created_at?: number;
  updated_at?: number | null;
  deleted_at?: number | null;
}

class User {
  private id!: string;
  private username!: string;
  private password!: string;
  private created_at!: number;
  private updated_at: number | null = null;
  private deleted_at: number | null = null;

  public constructor(user: UserModel) {
    this.setId(user.id);
    this.setUsername(user.username);
    if (user.password) this.setPassword(user.password);
    this.setCreatedAt(user.created_at);
    this.setUpdatedAt(user.updated_at);
    this.setDeletedAt(user.deleted_at);
  }

  public setId(id?: string): void {
    this.id = id ? id : uuid();
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

  public setCreatedAt(createdAt?: number): void {
    this.created_at = createdAt ? createdAt : Date.now();
  }

  public setUpdatedAt(updatedAt?: number | null): void {
    this.updated_at = updatedAt ? updatedAt : Date.now();
  }

  public setDeletedAt(deletedAt?: number | null): void {
    this.deleted_at = deletedAt ? deletedAt : Date.now();
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
