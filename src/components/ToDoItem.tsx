import { useState } from "react";

interface toDoItemProps {
  id: number;
  name: string;
  completed: boolean;
  toggleCompleteToDo: (id: number) => void;
  updateToDo: (id: number, name: string) => void;
  deleteToDo: (id: number) => void;
}

export const ToDoItem: React.FC<toDoItemProps> = ({
  id,
  name,
  completed,
  toggleCompleteToDo,
  updateToDo,
  deleteToDo,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoItemName, setToDoItemName] = useState(name);
  function handleSave() {
    setIsUpdating(!isUpdating);
    if (isUpdating && toDoItemName) {
      updateToDo(id, toDoItemName);
    }
  }
  return (
    <div className="flex items-center justify-between p-1 mb-2 border rounded-lg border-indigo-500 gap-1">
      <div className="wrapper flex items-center gap-1 grow w-full">
        <input
          type="checkbox"
          onChange={() => toggleCompleteToDo(id)}
          checked={completed}
        />
        <input
          className={`${completed ? "completed" : ""} ${
            isUpdating ? "bg-[#efefef4d]" : "bg-white"
          } grow w-full no-focus-outline`}
          type="text"
          disabled={!isUpdating}
          value={toDoItemName}
          onChange={(e) => setToDoItemName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSave();
            }
          }}
        />
      </div>
      <div className="to-do-item-buttons flex items-center grow-0">
        <button
          className="bg-white no-hover-outline no-focus-outline border-0 text-[#3b3b3b] "
          onClick={handleSave}
        >
          {isUpdating ? "Save" : "Update"}
        </button>
        <button
          className="bg-white no-hover-outline no-focus-outline border-0 text-[#3b3b3b] "
          onClick={() => {
            deleteToDo(id);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
