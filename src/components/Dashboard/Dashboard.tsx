import React from "react";
import Explore from "../Explore/Explore";
import PostList from "../PostList/PostList";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard Page</h1>
      <PostList />
      <Explore />
    </div>
  );
}

export default Dashboard;
