import { TodoItemInfo } from "./todo-item";

export interface TodoInfo {
  id: string;
  title: string;
  description: string | null;
  items: TodoItemInfo[];
  created_at: number;
}
