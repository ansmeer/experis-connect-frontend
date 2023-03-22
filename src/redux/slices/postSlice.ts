import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPostWithReplies } from "../../types/post";

// Initial state

export type PostState = {
  showReplyForm: boolean;
  replyToPost: TPostWithReplies | undefined;
};

const postInitialState: PostState = {
  showReplyForm: false,
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
  showReplyForm: (state: PostState) => {
    state.showReplyForm = true;
  },
  hideReplyForm: (state: PostState) => {
    state.showReplyForm = false;
  },
};

// Create slice

export const postSlice = createSlice({
  name: "post",
  initialState: postInitialState,
  reducers: postReducers,
});

export const { setReplyToPost, showReplyForm, hideReplyForm } =
  postSlice.actions;

export default postSlice.reducer;
