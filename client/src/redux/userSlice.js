import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllUsersAsync = createAsyncThunk(
  "users/getAllUsersAsync",
  async () => {
    try {
      const resp = await fetch("http://localhost:3990/users/all");
      if (resp.ok) {
        const users = await resp.json();

        return { users };
      }
    } catch (error) {
      console.log("not present");
    }
  }
);

export const loginAsync = createAsyncThunk(
  "userLogin",
  async ({ email, password }) => {
    try {
      const resp = await fetch("http://localhost:3990/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (resp.ok) {
        const user = await resp.json();
        // store user's token in local storage
        localStorage.setItem("token", user.token);
        localStorage.setItem("userName", user.user.firstName);
        localStorage.setItem("userId", user.user._id);
        localStorage.setItem("role", user.user.systemRole);
        return { user };
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState: [
    {
      user: [],
    },
  ],
  reducers: {},
  extraReducers: {
    [getAllUsersAsync.fulfilled]: (state, action) => {
      return action.payload.users;
    },

    [loginAsync.fulfilled]: (state, action) => {
      state.loginUser = action.payload.user.user;
      state.token = action.payload.user.token;
    },
  },
});

export default userSlice.reducer;
