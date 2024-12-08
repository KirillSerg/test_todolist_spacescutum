import { useCallback, useState } from "react";
import { Todo } from "../../../../types/todoTypes";
import styles from "./todoItem.module.css";
import { useAppDispatch } from "../../../../redux/store";
import { todoActions } from "../../../../redux/slices/todoSlice";
import deleteIcon from "../../../../assets/icons/delete.svg";
import saveIcon from "../../../../assets/icons/save.svg";
import editIcon from "../../../../assets/icons/pencil.svg";

export const TodoItem: React.FC<Todo> = todo => {
  const [editMode, setEditMode] = useState(false);
  const [updatedTodoTxt, setUpdatedTodoTxt] = useState(todo.title);

  const dispatch = useAppDispatch();

  const onUpdateTodo = useCallback(
    (status?: boolean) => {
      dispatch(
        todoActions.updateTodo({
          ...todo,
          title: updatedTodoTxt,
          completed: status === undefined ? todo.completed : status,
        })
      );
      setEditMode(false);
    },
    [dispatch, todoActions, setEditMode, updatedTodoTxt]
  );

  const onDeleteTodo = useCallback(() => {
    dispatch(todoActions.deleteTodo(todo.id));
  }, [dispatch, todoActions]);
  return (
    <div className={styles["todo-item"]}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onUpdateTodo(!todo.completed)}
      />
      {!editMode && (
        <div
          className={`${styles["todo-item_title"]} ${
            todo.completed && styles["complited"]
          }`}
        >
          {updatedTodoTxt}
        </div>
      )}
      {editMode && (
        <input
          className={styles["todo-item_title"]}
          autoFocus
          type="text"
          value={updatedTodoTxt}
          onChange={e => setUpdatedTodoTxt(e.target.value)}
        />
      )}
      <div className={styles["container-todoBtn"]}>
        <button className={styles["todoBtn"]} onClick={() => onDeleteTodo()}>
          <img src={deleteIcon} alt="delete-icon" />
        </button>
        {!editMode && (
          <button
            className={styles["todoBtn"]}
            onClick={() => setEditMode(true)}
          >
            <img src={editIcon} alt="edit-icon" />
          </button>
        )}
        {editMode && (
          <button className={styles["todoBtn"]} onClick={() => onUpdateTodo()}>
            <img src={saveIcon} alt="save-icon" />
          </button>
        )}
      </div>
    </div>
  );
};
