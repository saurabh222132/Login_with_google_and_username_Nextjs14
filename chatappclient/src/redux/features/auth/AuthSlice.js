"use client";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Signup, Login, LoginByGoogle, checkAuth } from "./AuthAPI";

const initialState = {
  status: "ideal",
  message: "",
  totalUsers: [],
  loggedInuser: null,
};

export const createUserAsync = createAsyncThunk(
  "Auth/createuser",
  async (userdata) => {
    const response = await Signup(userdata);
    return response;
  }
);

export const LoginUserAsync = createAsyncThunk(
  "Auth/loginuser",
  async (userdata) => {
    const response = await Login(userdata);
    return response;
  }
);

export const LoginUserByGoogleAsync = createAsyncThunk(
  "Auth/loginUserByGoolge",
  async () => {
    const response = await LoginByGoogle();
    return response;
  }
);
export const checkAuthAsync = createAsyncThunk(
  "Auth/checkAuthAsync",
  async () => {
    const response = await checkAuth();
    return response;
  }
);

const AuthSlice = createSlice({
  name: "authSlcie",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.status = "fulfilled";
          state.success = action.payload.success;
          state.message = action.payload.message;
          state.totalUsers = [...action.payload.totalUsers];
          state.loggedInuser = action.payload.user;
        } else {
          state.status = "fulfilled";
          state.success = action.payload.success;
          state.message = action.payload.message;
        }
      })
      .addCase(LoginUserAsync.pending, (state, action) => {
        state.status = "pening";
      })
      .addCase(LoginUserAsync.fulfilled, (state, action) => {
        console.log("login success", action.payload);
        state.loggedInuser = action.payload.user;
        state.totalUsers = [...action.payload.totalUsers];
      })
      .addCase(LoginUserByGoogleAsync.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(LoginUserByGoogleAsync.fulfilled, (state, action) => {
        state.loggedInuser = action.payload.user;
        state.totalUsers = [...action.payload.totalUsers];
      })
      .addCase(checkAuthAsync.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "fullfilled";
        console.log("Check Auth API called", action.payload);
        state.loggedInuser = action.payload.user;
        state.totalUsers = action.payload.totalUsers;
      });
  },
});

// export const { addValue, subValue, addByAmount } = AuthSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInuser;
export const selectLoginMessage = (state) => state.auth.message;
export const selectLogingSuccess = (state) => state.auth.success;

export const AuthReducer = AuthSlice.reducer;
