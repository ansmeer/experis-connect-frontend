import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { postApi } from "../../apis/postApi";
import { topicApi } from "../../apis/topicApi";
import { TPost } from "../../types/post";
import { TTopic } from "../../types/topic";
import { TUser } from "../../types/user";
import PostList from "../PostList/PostList";

function Topic() {
  const [selectedTab, setSelectedTab] = useState<string>("posts");
  const { id } = useParams();

  if (!id) return <></>;
  const handlePostsClick = () => {
    setSelectedTab("posts");
  };
  const handleMembersClick = () => {
    setSelectedTab("members");
  };
  const topicId = parseInt(id);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["topicDetail", id],
    queryFn: async (): Promise<TTopic> => {
      const topicRequest = topicApi.get.topicById(topicId);
      const response = await fetch(topicRequest.uri, topicRequest.options);
      return await response.json();
    },
  });
  const {
    data: topicPosts,
    isLoading: topicLoading,
    isError: postError,
  } = useQuery({
    queryKey: ["topicPosts", id],
    queryFn: async (): Promise<TPost[]> => {
      const topicRequest = postApi.get.postsFromTopic(topicId);
      const response = await fetch(topicRequest.uri, topicRequest.options);
      return await response.json();
    },
  });
  const {
    data: topicMembers,
    isLoading: membersLoading,
    isError: membersError,
  } = useQuery({
    queryKey: ["topicMembers", id],
    queryFn: async (): Promise<TUser[]> => {
      const topicRequest = topicApi.get.topicMembers(topicId);
      const response = await fetch(topicRequest.uri, topicRequest.options);
      return await response.json();
    },
  });
  return (
    <>
      <div>
        <h1>Topic Page</h1>
        <p>{data?.name}</p>
        <p>{data?.description}</p>
      </div>
      <div>
        <button onClick={handlePostsClick}>Posts</button>
        <button onClick={handleMembersClick}>Members</button>
      </div>
      <div>
        {selectedTab === "posts" && topicPosts && (
          <PostList data={topicPosts} />
        )}
        {selectedTab === "members" &&
          topicMembers &&
          topicMembers.map((userName) => (
            <div key={userName.name}>{userName.name}</div>
          ))}
      </div>
    </>
  );
}

export default Topic;
