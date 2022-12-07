import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectUser = (state) => state.user;

export default usersSlice.reducer;
