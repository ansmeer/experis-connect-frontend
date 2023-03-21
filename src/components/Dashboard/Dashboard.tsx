import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { postApi } from "../../apis/postApi";
import { TPostTargetType } from "../../types/post";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import PostList from "../PostList/PostList";
import styles from "./dashboard.module.css";

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState<TPostTargetType | undefined>(
    undefined
  );
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", "from", selectedTab],
    queryFn: async () => {
      const postRequest = postApi.get.posts(selectedTab);
      const response = await fetch(postRequest.uri, postRequest.options);
      if (!response.ok) return;
      return await response.json();
    },
  });

  const hasData = Boolean(data?.length);

  const handleAllClick = () => {
    setSelectedTab(undefined);
  };
  const handleGroupsClick = () => {
    setSelectedTab("GROUP");
  };
  const handleTopicsClick = () => {
    setSelectedTab("TOPIC");
  };
  const handleDmsClick = () => {
    setSelectedTab("USER");
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
            className={selectedTab === "GROUP" ? styles.selected : ""}>
            Groups
          </button>
          <button
            onClick={handleTopicsClick}
            className={selectedTab === "TOPIC" ? styles.selected : ""}>
            Topics
          </button>
          <button
            onClick={handleDmsClick}
            className={selectedTab === "USER" ? styles.selected : ""}>
            DMs
          </button>
        </div>
      </div>
      <h1>Dashboard</h1>
      {!hasData && <div>Oh wow, so empty!</div>}
      {hasData && <PostList data={data} />}
      {selectedTab === "GROUP" && (
        <Footer text="Explore" clickHandler={handleExploreGroupsClick} />
      )}
      {selectedTab === "TOPIC" && (
        <Footer text="Explore" clickHandler={handleExploreTopicsClick} />
      )}
    </main>
  );
}

export default Dashboard;
