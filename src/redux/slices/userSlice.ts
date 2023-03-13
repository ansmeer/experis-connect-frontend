import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUser, TUserPut } from "../../types/user";
import {
  registerCurrentUser,
  getCurrentUser,
  updateCurrentUser,
} from "../middleware/user";

// Initial state

export type UserState = {
  error: undefined | any; // TODO fix any here, what type is error? string?
  isLoggedIn: boolean;
  details: TUser | undefined;
};

const userInitialState: UserState = {
  error: null,
  isLoggedIn: false,
  details: undefined,
};

// Reducers

const userReducers = {
  logout: (state: UserState) => {
    state.error = undefined;
    state.isLoggedIn = false;
    state.details = undefined;
  },
};

// Extra reducers: async loginUser

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (): Promise<TUser> => {
    const user = await getCurrentUser();
    return user;
  }
);

const loginUserFulfilled = (state: UserState, action) => {
  state.error = undefined;
  state.isLoggedIn = true;
  state.details = action.payload;
};

// Extra reducers: async registerUser

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (): Promise<TUser> => {
    const user = await registerCurrentUser();
    return user;
  }
);

const registerUserFulfilled = (state: UserState, action) => {
  loginUserFulfilled(state, action);
};

// Extra reducers: async updateUser

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userDetails: TUserPut): Promise<TUser> => {
    const user = await updateCurrentUser(userDetails);
    return user;
  }
);

const updateUserFulfilled = (state: UserState, action) => {
  loginUserFulfilled(state, action);
};

// Extra reducers: defaults

const defaultRejected = (state: UserState, action) => {
  state.error = action.error.message;
};

// Create slice

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: userReducers,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, loginUserFulfilled)
      .addCase(loginUser.rejected, defaultRejected)
      .addCase(registerUser.fulfilled, registerUserFulfilled)
      .addCase(registerUser.rejected, defaultRejected)
      .addCase(updateUser.fulfilled, updateUserFulfilled)
      .addCase(updateUser.rejected, defaultRejected);
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
