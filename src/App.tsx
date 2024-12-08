import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { todoActions, TodoState } from "./redux/slices/todoSlice";
import { Pagination } from "./components/pagination/Pagination";
import { TodoList } from "./components/todoList/TodoList";

import styles from "./App.module.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPageLimit = 10;

  const dispatch = useAppDispatch();
  const { totalItemsNumber } = useAppSelector<TodoState>(state => state.todos);

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

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <main className={styles["main"]}>
      <h1 className={styles["header"]}>TODO list</h1>
      <div>
        <p>
          Total todo: <b>{totalItemsNumber}</b>
        </p>
      </div>
      <button className={styles["add-todo-btn"]} onClick={() => onCreateTodo()}>
        Add new todo
      </button>
      <TodoList />
      <Pagination
        totalCount={totalItemsNumber}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={perPageLimit}
      />
    </main>
  );
};

export default App;
