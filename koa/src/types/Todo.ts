export interface Todo {
  id: string;
  title: string;
  assignee?: string;
}

export type UnsavedTodo = Omit<Todo, 'id'>;