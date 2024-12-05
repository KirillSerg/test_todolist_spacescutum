import { useCallback, useEffect, useState } from "react";
import { Todo } from "./types/todoTypes";
import todoService from "./services/todoService";

import styles from "./App.module.css";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPageLimit = 10;

  const fetchTodos = useCallback(async () => {
    const res = await todoService.getTodos({
      page: currentPage,
      limit: perPageLimit,
    });
    if (res.status === 200) {
      setTodos(res.data);
    }
  }, [todoService, currentPage, perPageLimit, setTodos]);

  const onCreateTodo = useCallback(async () => {
    const res = await todoService.createTodo({
      userId: 1,
      title: "New todo",
      completed: false,
    });
    if (res.status === 200) {
      setTodos(prev => [{ ...res.data.todo, id: res.data.id }, ...prev]);
    }
  }, [todoService, setTodos]);

  const onUpdateTodo = useCallback(
    async (todo: Todo) => {
      const res = await todoService.updateTodo({
        userId: todo.id,
        title: "Updated todo",
        completed: todo.completed,
        id: todo.id,
      });
      if (res.status === 200) {
        setTodos(prev =>
          prev.map(todo =>
            todo.id === res.data.todo.id ? res.data.todo : todo
          )
        );
      }
    },
    [todoService, setTodos]
  );

  const onDeleteTodo = useCallback(
    async (id: number) => {
      const res = await todoService.deleteTodo(id);
      if (res.status === 200) {
        setTodos(prev => prev.filter(todo => todo.id !== id));
      }
    },
    [todoService, setTodos]
  );

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <main className={styles["main"]}>
      <h1 className={styles["header"]}>TODO list</h1>
      <button onClick={() => onCreateTodo()}>Add todo</button>
      {todos.length > 0 &&
        todos.map(todo => (
          <div key={todo.id}>
            <div>{todo.title}</div>
            <button onClick={() => onDeleteTodo(todo.id)}>delete</button>
            <button onClick={() => onUpdateTodo(todo)}>update</button>
          </div>
        ))}
    </main>
  );
};

export default App;
