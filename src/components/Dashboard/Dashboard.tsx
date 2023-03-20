import { useState } from "react";
import { useQuery } from "react-query";
import { postApi } from "../../apis/postApi";
import { TPostTargetType } from "../../types/post";
import Explore from "../Explore/Explore";
import Loading from "../Loading/Loading";
import PostList from "../PostList/PostList";

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState<TPostTargetType | undefined>(
    undefined
  );

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

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Could not load feed</div>;
  }

  return (
    <div>
      <h1>Dashboard Page</h1>
      <div>
        <button onClick={handleAllClick}>All</button>
        <button onClick={handleGroupsClick}>Groups</button>
        <button onClick={handleTopicsClick}>Topics</button>
        <button onClick={handleDmsClick}>DMs</button>
      </div>
      {!hasData && <div>Oh wow, so empty!</div>}
      {hasData && <PostList data={data} />}
      {selectedTab === "GROUP" && <Explore type="groups" />}
      {selectedTab === "TOPIC" && <Explore type="topics" />}
    </div>
  );
}

export default Dashboard;
