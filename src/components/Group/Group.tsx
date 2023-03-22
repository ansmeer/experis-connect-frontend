import { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { groupApi } from "../../apis/groupApi";
import { postApi } from "../../apis/postApi";
import { TGroup } from "../../types/group";
import { TPost } from "../../types/post";
import { TUser } from "../../types/user";
import PostList from "../PostList/PostList";
import UserList from "../UserList/UserList";
import styles from "./group.module.css";

function Group() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get("show") || "posts";
  const { id } = useParams();

  if (!id) return <></>;

  const handlePostsClick = () => {
    setSearchParams({ show: "posts" }, { replace: true });
  };
  const handleMembersClick = () => {
    setSearchParams({ show: "members" }, { replace: true });
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
    isError: postsError,
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

  useEffect(() => {
    document.title = data
      ? `${data?.name} | Experis Connect`
      : "Experis Connect";
  }, [data]);

  if (isError || membersError || postsError) {
    return <div>Could not load data</div>;
  }

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

      {selectedTab === "posts" && groupPosts && <PostList data={groupPosts} />}
      {selectedTab === "members" && groupMembers && (
        <UserList data={groupMembers} />
      )}
    </main>
  );
}

export default Group;
