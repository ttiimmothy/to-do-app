import "./App.css";
import { AddToDoItem } from "./components/AddToDoItem";
import { ToDoList } from "./components/ToDoList";

function App() {
  return (
    <>
      <h1>Todo</h1>
      <AddToDoItem />
      <ToDoList />
    </>
  );
}

export default App;
