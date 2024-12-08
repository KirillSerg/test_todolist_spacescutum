import { useCallback, useEffect, useState } from "react";
import { Todo } from "./types/todoTypes";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { todoActions, TodoState } from "./redux/slices/todoSlice";

import styles from "./App.module.css";
import { Pagination } from "./components/pagination/Pagination";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPageLimit = 10;

  const dispatch = useAppDispatch();
  const { items, totalItemsNumber } = useAppSelector<TodoState>(
    state => state.todos
  );

  const totalPages = Math.ceil(totalItemsNumber / perPageLimit);

  const fetchTodos = useCallback(async () => {
    dispatch(
      todoActions.getTodos({
        page: currentPage,
        limit: perPageLimit,
      })
    );
  }, [dispatch, todoActions, currentPage, perPageLimit]);

  const onCreateTodo = useCallback(() => {
    dispatch(
      todoActions.createTodo({
        userId: 1,
        title: "New todo",
        completed: false,
      })
    );
  }, [dispatch, todoActions]);

  const onUpdateTodo = useCallback(
    (todo: Todo) => {
      dispatch(
        todoActions.updateTodo({
          userId: todo.id,
          title: "Updated todo",
          completed: todo.completed,
          id: todo.id,
        })
      );
    },
    [dispatch, todoActions]
  );

  const onDeleteTodo = useCallback(
    async (id: number) => {
      dispatch(todoActions.deleteTodo(id));
    },
    [dispatch, todoActions]
  );

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <main className={styles["main"]}>
      <h1 className={styles["header"]}>TODO list</h1>
      <button onClick={() => onCreateTodo()}>Add todo</button>
      {items.length > 0 &&
        items.map(todo => (
          <div key={todo.id}>
            <div>{todo.title}</div>
            <button onClick={() => onDeleteTodo(todo.id)}>delete</button>
            <button onClick={() => onUpdateTodo(todo)}>update</button>
          </div>
        ))}
      <Pagination
        // totalPages={totalPages}
        totalCount={totalItemsNumber}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={perPageLimit}
      />
    </main>
  );
};

export default App;
