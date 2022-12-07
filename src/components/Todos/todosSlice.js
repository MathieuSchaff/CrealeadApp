import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const todosSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addTodo: (state, action) => {},
    deleteTodo: (state, action) => {},
    mutateTodo: (state, action) => {},
  },
});
export const { addTodo, deleteTodo, mutateTodo } = todosSlice.actions;
export const selectAllTodos = (state) => state.todos;
export default todosSlice.reducer;
