import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todoService from '../../services/todoService';
import { CreateTodo, PaginationProps, Todo } from '../../types/todoTypes';

export enum STATUS {
  idle,
  loading,
  failed,
}

export interface TodoState {
  items: Todo[];
  status: STATUS;
}

const initialState: TodoState = {
  items: [],
  status: STATUS.idle,
};

export const getTodos = createAsyncThunk('todos/getTodos', async (props: PaginationProps) => {
  const res = await todoService.getTodos(props)
  return res;
});

export const createTodo = createAsyncThunk('todos/createTodo', async (newtodo: CreateTodo) => {
  const res = await todoService.createTodo(newtodo)
  return res;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatedtodo: Todo) => {
  const res = await todoService.updateTodo(updatedtodo)
  return res;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: number) => {
  const res = await todoService.deleteTodo(id)
  return { res, id };
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.status = STATUS.loading;
      })
      .addCase(getTodos.fulfilled, (state, { payload }) => {
        state.status = STATUS.idle;
        state.items = payload.data;
      })
      .addCase(getTodos.rejected, (state) => {
        state.status = STATUS.failed;
      })

      //
      .addCase(createTodo.pending, (state) => {
        state.status = STATUS.loading;
      })
      .addCase(createTodo.fulfilled, (state, { payload }) => {
        state.items = [{ ...payload.data.todo, id: payload.data.id }, ...state.items];
      })
      .addCase(createTodo.rejected, (state) => {
        state.status = STATUS.failed;
      })

      //
      .addCase(updateTodo.pending, (state) => {
        state.status = STATUS.loading;
      })
      .addCase(updateTodo.fulfilled, (state, { payload }) => {
        state.items = state.items.map(todo =>
          todo.id === payload.data.todo.id ? payload.data.todo : todo
        )
      })
      .addCase(updateTodo.rejected, (state) => {
        state.status = STATUS.failed;
      })

      //
      .addCase(deleteTodo.pending, (state) => {
        state.status = STATUS.loading;
      })
      .addCase(deleteTodo.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(todo => todo.id !== payload.id)
      })
      .addCase(deleteTodo.rejected, (state) => {
        state.status = STATUS.failed;
      })
  },
});

export default todoSlice.reducer;

export const todoActions = {
  ...todoSlice.actions,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};