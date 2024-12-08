import { TodoState } from "../../redux/slices/todoSlice";
import { useAppSelector } from "../../redux/store";

import styles from "./todoList.module.css";
import { TodoItem } from "./components/todoItem/TodoItem";

export const TodoList = () => {
  const { items } = useAppSelector<TodoState>(state => state.todos);

  return (
    <div className={styles["todo-list"]}>
      {items.length > 0 &&
        items.map(todo => <TodoItem key={todo.id} {...todo} />)}
    </div>
  );
};
