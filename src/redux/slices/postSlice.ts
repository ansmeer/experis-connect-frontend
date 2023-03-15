import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPostWithReplies } from "../../types/post";

// Initial state

export type PostState = {
  replyToPost: TPostWithReplies | undefined;
};

const postInitialState: PostState = {
  replyToPost: undefined,
};

// Reducers

const postReducers = {
  setReplyToPost: (
    state: PostState,
    action: PayloadAction<TPostWithReplies>
  ) => {
    state.replyToPost = action.payload;
  },
};

// Create slice

export const postSlice = createSlice({
  name: "post",
  initialState: postInitialState,
  reducers: postReducers,
});

export const { setReplyToPost } = postSlice.actions;

export default postSlice.reducer;
