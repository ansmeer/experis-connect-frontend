import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { postApi } from "../../apis/postApi";
import { TPostTargetType } from "../../types/post";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import PostList from "../PostList/PostList";
import styles from "./dashboard.module.css";

const getTargetType = (input: string | null): TPostTargetType | undefined => {
  if (input === "dms") return "USER";
  if (input === "groups") return "GROUP";
  if (input === "topic") return "TOPIC";
  return undefined;
};

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get("show");
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", "from", selectedTab],
    queryFn: async () => {
      const targetType = getTargetType(selectedTab);
      const postRequest = postApi.get.posts(targetType);
      const response = await fetch(postRequest.uri, postRequest.options);
      if (!response.ok) return;
      return await response.json();
    },
  });

  const hasData = Boolean(data?.length);

  const handleAllClick = () => {
    setSearchParams(undefined, { replace: true });
  };
  const handleGroupsClick = () => {
    setSearchParams({ show: "groups" }, { replace: true });
  };
  const handleTopicsClick = () => {
    setSearchParams({ show: "topics" }, { replace: true });
  };
  const handleDmsClick = () => {
    setSearchParams({ show: "dms" }, { replace: true });
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
    <main>
      <div className={styles["top-menu"]}>
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
            onClick={handleDmsClick}
            className={selectedTab === "dms" ? styles.selected : ""}>
            DMs
          </button>
        </div>
      </div>
      <h1>Dashboard</h1>
      {!hasData && <div>Oh wow, so empty!</div>}
      {hasData && <PostList data={data} />}
      {selectedTab === "groups" && (
        <Footer text="Explore" clickHandler={handleExploreGroupsClick} />
      )}
      {selectedTab === "topics" && (
        <Footer text="Explore" clickHandler={handleExploreTopicsClick} />
      )}
    </main>
  );
}

export default Dashboard;
