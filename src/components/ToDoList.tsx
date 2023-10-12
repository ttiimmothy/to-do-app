import { ToDoItem } from "./ToDoItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  toggleCompleteToDoItem,
  deleteToDoItem,
  getAllToDoItems,
  updateToDoItem,
} from "../redux/toDoList/reducer";
import { IRootState } from "../store";

export function ToDoList() {
  const dispatch = useDispatch();
  useEffect(() => {
    const saved = localStorage.getItem("todo-list");
    if (!saved) dispatch(getAllToDoItems([]));
    const initialValue = JSON.parse(saved!);
    dispatch(getAllToDoItems(initialValue || []));
  }, [dispatch]);

  // eslint-disable-next-line prefer-const
  let toDoItems = useSelector((state: IRootState) => state.toDoItem.toDoList);

  function toggleCompleteToDo(id: number) {
    dispatch(toggleCompleteToDoItem(id));
    const newToDoItems = toDoItems.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    localStorage.setItem("todo-list", JSON.stringify(newToDoItems));
  }
  function updateToDo(id: number, name: string) {
    dispatch(updateToDoItem({ id, name }));
    const newToDoItems = toDoItems.map((item) => {
      if (item.id === id) {
        return { ...item, name };
      }
      return item;
    });
    localStorage.setItem("todo-list", JSON.stringify(newToDoItems));
  }
  function deleteToDo(id: number) {
    dispatch(deleteToDoItem(id));

    localStorage.setItem(
      "todo-list",
      JSON.stringify(toDoItems.filter((item) => item.id !== id))
    );
  }

  return (
    <div className="min-h-[30rem] max-h-[40rem] overflow-y-auto">
      {toDoItems.length === 0 ? (
        <div>No todos found</div>
      ) : (
        toDoItems.map((toDoItem, index) => {
          return toDoItem.id >= 0 ? (
            <ToDoItem
              key={toDoItem.id}
              id={toDoItem.id}
              name={toDoItem.name}
              completed={toDoItem.completed}
              toggleCompleteToDo={toggleCompleteToDo}
              updateToDo={updateToDo}
              deleteToDo={deleteToDo}
            />
          ) : (
            <div key={index}></div>
          );
        })
      )}
    </div>
  );
}
