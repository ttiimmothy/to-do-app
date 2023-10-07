import { combineReducers, configureStore } from "@reduxjs/toolkit/";
import toDoItemReducer, { IToDoItemState } from "./redux/toDoList/reducer";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

export interface IRootState {
  toDoItem: IToDoItemState;
}

const reducer = combineReducers<IRootState>({ toDoItem: toDoItemReducer });

export default configureStore({
  reducer,
  devTools: window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__,
});
