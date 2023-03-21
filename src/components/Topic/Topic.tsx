import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { postApi } from "../../apis/postApi";
import { topicApi } from "../../apis/topicApi";
import { TPost } from "../../types/post";
import { TTopic } from "../../types/topic";
import { TUser } from "../../types/user";
import PostList from "../PostList/PostList";
import UserList from "../UserList/UserList";
import styles from "./topic.module.css";

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
    <main>
      <div className={styles.info}>
        <p>{data?.name}</p>
        <p>{data?.description}</p>
      </div>

      <div className={styles.tabs}>
        <button
          onClick={handlePostsClick}
          className={selectedTab === "posts" ? styles.selected : ""}>
          Posts
        </button>
        <button
          onClick={handleMembersClick}
          className={selectedTab === "members" ? styles.selected : ""}>
          Members
        </button>
      </div>

      <h1>{data?.name}</h1>

      {selectedTab === "posts" && topicPosts && <PostList data={topicPosts} />}
      {selectedTab === "members" && topicMembers && (
        <UserList data={topicMembers} />
      )}
    </main>
  );
}

export default Topic;
