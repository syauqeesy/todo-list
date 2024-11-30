import { TodoInfo } from "./todo";

export interface UserInfo {
  id: string;
  username: string;
  todos: TodoInfo[];
  created_at: number;
}
