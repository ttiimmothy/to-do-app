import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface toDoItem {
  id: number;
  name: string;
  completed: boolean;
}

export interface IToDoItemState {
  toDoList: toDoItem[];
}

const initialState: IToDoItemState = {
  toDoList: [],
};

const toDoItemReducer = createSlice({
  name: "toDoItem",
  initialState,
  reducers: {
    getAllToDoItems: (
      state: IToDoItemState,
      action: PayloadAction<toDoItem[]>
    ) => {
      state.toDoList = action.payload;
    },

    addToDoItem: (state: IToDoItemState, action: PayloadAction<toDoItem>) => {
      state.toDoList.unshift(action.payload);
    },

    updateToDoItem: (
      state: IToDoItemState,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      const { id, name } = action.payload;
      state.toDoList.filter((item) => item.id === id)[0].name = name;
    },

    deleteToDoItem: (state: IToDoItemState, action: PayloadAction<number>) => {
      const id = action.payload;
      state.toDoList.splice(
        state.toDoList.findIndex((item) => item.id === id),
        1
      );
    },

    toggleCompleteToDoItem: (
      state: IToDoItemState,
      action: PayloadAction<number>
    ) => {
      const id = action.payload;
      state.toDoList.filter((item) => item.id === id)[0].completed =
        !state.toDoList.filter((item) => item.id === id)[0].completed;
    },
  },
});

export const {
  getAllToDoItems,
  addToDoItem,
  updateToDoItem,
  deleteToDoItem,
  toggleCompleteToDoItem,
} = toDoItemReducer.actions;
export default toDoItemReducer.reducer;
