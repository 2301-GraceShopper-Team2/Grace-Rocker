import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleUser = createAsyncThunk("user", async (id) => {
  const { data } = await axios.get(`/api/users/${id}`);
  return data;
});

export const editUser = createAsyncThunk(
  "updateUser",
  async ({ id, username, email }) => {
    const { data } = await axios.put(`/api/users/${id}`, {
      username: username,
      email: email,
    });
    return data;
  }
);

const singleUserSlice = createSlice({
  name: "user",
  initialState: {
    singleUser: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleUser.fulfilled, (state, { payload }) => {
      state.singleUser = payload;
    });
    builder.addCase(editUser.fulfilled, (state, { payload }) => {
      state.singleUser = payload;
    });
  },
});

export default singleUserSlice;
