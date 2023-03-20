import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { groupApi } from "../../apis/groupApi";
import { postApi } from "../../apis/postApi";
import { RootState } from "../../redux/store";
import { TGroup } from "../../types/group";
import { TPost } from "../../types/post";
import { TUser } from "../../types/user";
import PostList from "../PostList/PostList";

function Group() {
  const [selectedTab, setSelectedTab] = useState<string>("posts");
  const { id } = useParams();

  if (!id) return <></>;
  const handlePostsClick = () => {
    setSelectedTab("posts");
  };
  const handleMembersClick = () => {
    setSelectedTab("members");
  };
  const groupId = parseInt(id);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["groupDetail", id],
    queryFn: async (): Promise<TGroup> => {
      const groupRequest = groupApi.get.groupById(groupId);
      const response = await fetch(groupRequest.uri, groupRequest.options);
      return await response.json();
    },
  });
  const {
    data: groupPosts,
    isLoading: postsLoading,
    isError: postError,
  } = useQuery({
    queryKey: ["groupPosts", id],
    queryFn: async (): Promise<TPost[]> => {
      const groupRequest = postApi.get.postsFromGroup(groupId);
      const response = await fetch(groupRequest.uri, groupRequest.options);
      return await response.json();
    },
  });
  const {
    data: groupMembers,
    isLoading: membersLoading,
    isError: membersError,
  } = useQuery({
    queryKey: ["groupMembers", id],
    queryFn: async (): Promise<TUser[]> => {
      const groupRequest = groupApi.get.groupMembers(groupId);
      const response = await fetch(groupRequest.uri, groupRequest.options);
      return await response.json();
    },
  });

  const hasData = Boolean(groupPosts?.length);

  return (
    <>
      <div>
        <h1>Group Page</h1>
        <p>{data?.name}</p>
        <p>{data?.description}</p>
      </div>
      <div>
        <button onClick={handlePostsClick}>Posts</button>
        <button onClick={handleMembersClick}>Members</button>
      </div>
      <div>
        {selectedTab === "posts" && groupPosts && (
          <PostList data={groupPosts} />
        )}
        {selectedTab === "members" &&
          groupMembers &&
          groupMembers.map((userName) => (
            <div key={userName.name}>{userName.name}</div>
          ))}
      </div>
    </>
  );
}

export default Group;
