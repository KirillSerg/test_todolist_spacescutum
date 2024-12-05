export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export type CreateTodo = Omit<Todo, "id">

export type CreatedTodo = {
  todo: CreateTodo;
  id: number;
}
export type UpdatedTodo = {
  todo: Todo;
  id: number;
}
