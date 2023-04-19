import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/*
  CONSTANT VARIABLES
*/
const TOKEN = "token";

/*
  THUNKS
*/
// export const fetchAllUsers = createAsyncThunk("users/", async () => {
//   const token = window.localStorage.getItem(TOKEN);
//   try {
//     if (token) {
//       const res = await axios.get("/api/users/", {
//         headers: {
//           authorization: token,
//         },
//       });
//       return res.data;
//     } else {
//       return {};
//     }
//   } catch (err) {
//     if (err.response.data) {
//       return thunkAPI.rejectWithValue(err.response.data);
//     } else {
//       return "There was an issue with your request.";
//     }
//   }
// });

export const fetchAllUsersAsync = createAsyncThunk(
  "users/fetchAll",
  async () => {
    try {
      const { data } = await axios.get("/api/users");
      return data;
    } catch (err) {
      console.error(err);
    }
  },
);

/*
  SLICE
*/
export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    // builder.addCase(fetchAllUsersAsync.rejected, (state, action) => {
    //   state.error = action.error;
    // });
    // builder.addCase(authenticate.rejected, (state, action) => {
    //   state.error = action.payload;
    // });
  },
});

/*
  ACTIONS
*/
// export const { logout } = allUsersSlice.actions;

/*
  REDUCER
*/
export const selectAllUsers = (state) => state.allUsers;
export default allUsersSlice.reducer;
