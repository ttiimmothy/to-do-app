import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToDoItem } from "../redux/toDoList/reducer";
import { IRootState } from "../store";

export function AddToDoItem() {
  const [text, setText] = useState("");
  const toDoItems = useSelector((state: IRootState) => state.toDoItem.toDoList);

  const dispatch = useDispatch();

  const addToDo = () => {
    if (text !== "") {
      const newToDoItem = {
        id: Date.now(),
        name: text,
        completed: false,
      };
      dispatch(addToDoItem(newToDoItem));
      localStorage.setItem(
        "todo-list",
        JSON.stringify([newToDoItem, ...toDoItems])
      );
      setText("");
    }
  };
  return (
    <div className="border border-gray-400 rounded-full px-5 py-2 mt-1 bg-[#3b3b3b] w-96 justify-between flex mb-2">
      <input
        className="w-5/6 no-focus-outline bg-[#3b3b3b] text-primary-100"
        type="text"
        placeholder="Enter your to-do"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addToDo();
          }
        }}
      />
      <button
        className="border border-gray-400 rounded-full bg-primary-100 text-[#3b3b3b] py-1 px-3 no-focus-outline"
        onClick={addToDo}
      >
        <span className="text-xl">+</span>
      </button>
    </div>
  );
}
