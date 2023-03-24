import { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { postApi } from "../../apis/postApi";
import { topicApi } from "../../apis/topicApi";
import { dateOptionsEN } from "../../consts/dates";
import { TPost } from "../../types/post";
import { TTopic } from "../../types/topic";
import { TUser } from "../../types/user";
import PostList from "../PostList/PostList";
import UserList from "../UserList/UserList";
import styles from "./topic.module.css";

function Topic() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get("show") || "posts";
  const { id } = useParams();

  if (!id) return <></>;
  const handlePostsClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setSearchParams({ show: "posts" }, { replace: true });
  };
  const handleMembersClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setSearchParams({ show: "members" }, { replace: true });
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

  const createdAtDate = data
    ? new Date(data.createdAt).toLocaleDateString("en-EN", dateOptionsEN)
    : "";

  const {
    data: topicPosts,
    isLoading: topicLoading,
    isError: postError,
  } = useQuery({
    queryKey: ["topicPosts", id],
    queryFn: async (): Promise<TPost[]> => {
      const topicRequest = postApi.get.postsFromTopicByPage(topicId, 7, 0);
      const response = await fetch(topicRequest.uri, topicRequest.options);
      return await response.json();
    },
  });

  const getMorePosts = async (offset: number): Promise<TPost[]> => {
    const postRequest = postApi.get.postsFromGroupByPage(
      parseInt(id, 10),
      5,
      offset
    );
    const response = await fetch(postRequest.uri, postRequest.options);
    return await response.json();
  };

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

  useEffect(() => {
    document.title = data
      ? `${data?.name} | Experis Connect`
      : "Experis Connect";
  }, [data]);

  return (
    <main>
      <div className={styles.info}>
        <p>{data?.name}</p>
        <p>Founded {createdAtDate}</p>
        <p>{data?.description}</p>
      </div>

      <nav className={styles.tabs}>
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
      </nav>

      <h1>
        {data?.name}:{" "}
        {selectedTab.charAt(0).toUpperCase() + selectedTab.substring(1)}
      </h1>

      {selectedTab === "posts" && !topicPosts?.length && (
        <div>There are no posts in this topic.</div>
      )}
      {selectedTab === "posts" && topicPosts && topicPosts.length > 0 && (
        <PostList initialData={topicPosts} fetchData={getMorePosts} />
      )}
      {selectedTab === "members" && topicMembers && (
        <UserList data={topicMembers} />
      )}
    </main>
  );
}

export default Topic;
