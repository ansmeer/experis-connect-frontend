import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { postApi } from "../../apis/postApi";
import { topicApi } from "../../apis/topicApi";
import { dateOptionsEN } from "../../consts/dates";
import { refetchUser } from "../../redux/slices/userSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { TPost } from "../../types/post";
import { TTopic } from "../../types/topic";
import { TUser } from "../../types/user";
import ErrorFetch from "../ErrorFetch/ErrorFetch";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import PostList from "../PostList/PostList";
import UserList from "../UserList/UserList";
import styles from "./topic.module.css";

function Topic() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get("show") || "posts";
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.details);
  const isSubscribed = id ? user?.topics.includes(parseInt(id, 10)) : false;

  if (!id) return <></>;
  const handleSubscribeClick = async () => {
    if (!data) return;
    const subscribeRequest = topicApi.post.addCurrentUserToTopic(data.id);
    await fetch(subscribeRequest.uri, subscribeRequest.options);
    dispatch(refetchUser());
  };

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

  const { data: topicPosts, isError: postError } = useQuery({
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

  const { data: topicMembers, isError: membersError } = useQuery({
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

  if (isLoading) {
    return <Loading />;
  }

  if (isError || postError || membersError) {
    return <ErrorFetch text="Could not fetch topic data." />;
  }

  return (
    <>
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
      {!isSubscribed && (
        <Footer text="Subscribe to topic" clickHandler={handleSubscribeClick} />
      )}
    </>
  );
}

export default Topic;
