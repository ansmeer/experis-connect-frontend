import React from "react";
import Post from "../Post/Post";
import PostReplyForm from "../PostReplyForm/PostReplyForm";

function Thread() {
  return (
    <div>
      <h1>Thread Page</h1>
      <Post />
      <PostReplyForm />
    </div>
  );
}

export default Thread;
