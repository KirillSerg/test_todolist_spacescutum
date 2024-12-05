import { AxiosResponse } from "axios";
import api from "../api/api";
import { CreatedTodo, CreateTodo, Todo, UpdatedTodo } from "../types/todoTypes";

type PaginationProps = {
  page?: number;
  limit?: number;
}

const getTodos = async (props: PaginationProps): Promise<AxiosResponse<Todo[]>> => {
  return await api.get("todos", {
    params: {
      _limit: props.limit,
      _page: props.page
    }
  });
};

const createTodo = async (todo: CreateTodo): Promise<AxiosResponse<CreatedTodo>> => {
  return await api.post("todos", {
    todo
  });
};
const updateTodo = async (todo: Todo): Promise<AxiosResponse<UpdatedTodo>> => {
  return await api.put(`todos/${todo.id}/`, {
    todo
  });
};

const deleteTodo = async (id: number) => {
  return await api.delete(`todos/${id}/`);
};

export default {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};