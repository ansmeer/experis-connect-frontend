import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { postApi } from "../../apis/postApi";
import { TPost, TPostTargetType } from "../../types/post";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import PostList from "../PostList/PostList";
import styles from "./dashboard.module.css";

const getTargetType = (input: string | null): TPostTargetType | undefined => {
  switch (input) {
    case "chats":
      return "USER";
    case "groups":
      return "GROUP";
    case "topics":
      return "TOPIC";
    default:
      return undefined;
  }
};

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get("show");
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", "from", selectedTab],
    queryFn: async () => {
      const targetType = getTargetType(selectedTab);
      const postRequest = postApi.get.postByPage(7, 0, targetType);
      const response = await fetch(postRequest.uri, postRequest.options);
      if (!response.ok) return [];
      return await response.json();
    },
  });

  const getMorePosts = async (offset: number): Promise<TPost[]> => {
    const targetType = getTargetType(selectedTab);
    const postRequest = postApi.get.postByPage(5, offset, targetType);
    const response = await fetch(postRequest.uri, postRequest.options);
    return await response.json();
  };

  const hasData = Boolean(data?.length);

  const handleAllClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setSearchParams(undefined, { replace: true });
  };
  const handleGroupsClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setSearchParams({ show: "groups" }, { replace: true });
  };
  const handleTopicsClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setSearchParams({ show: "topics" }, { replace: true });
  };
  const handleChatsClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setSearchParams({ show: "chats" }, { replace: true });
  };
  const handleExploreGroupsClick = () => {
    navigate("/groups");
  };
  const handleExploreTopicsClick = () => {
    navigate("/topics");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Could not load feed</div>;
  }

  return (
    <>
      <main>
        <nav aria-label="dashboard" className={styles["top-menu"]}>
          <div>
            <button
              onClick={handleAllClick}
              className={!selectedTab ? styles.selected : ""}>
              All
            </button>
            <button
              onClick={handleGroupsClick}
              className={selectedTab === "groups" ? styles.selected : ""}>
              Groups
            </button>
            <button
              onClick={handleTopicsClick}
              className={selectedTab === "topics" ? styles.selected : ""}>
              Topics
            </button>
            <button
              onClick={handleChatsClick}
              className={selectedTab === "chats" ? styles.selected : ""}>
              Chats
            </button>
          </div>
        </nav>
        <h1>
          Dashboard
          {selectedTab &&
            ": " +
              selectedTab.charAt(0).toUpperCase() +
              selectedTab.substring(1)}
        </h1>
        {!hasData && <div>Oh wow, so empty!</div>}
        {hasData && <PostList initialData={data} fetchData={getMorePosts} />}
      </main>
      {selectedTab === "groups" && (
        <Footer
          text="Explore more groups"
          clickHandler={handleExploreGroupsClick}
        />
      )}
      {selectedTab === "topics" && (
        <Footer
          text="Explore more topics"
          clickHandler={handleExploreTopicsClick}
        />
      )}
    </>
  );
}

export default Dashboard;
