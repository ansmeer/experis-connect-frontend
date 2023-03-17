import { useEffect, useState } from "react";
import { TPost } from "../../types/post";
import DashboardAll from "../DashboardAll/DashboardAll";
import DashboardDms from "../DashboardDms/DashboardDms";
import DashboardGroups from "../DashboardGroups/DashboardGroups";
import DashboardTopics from "../DashboardTopics/DashboardTopics";
import Explore from "../Explore/Explore";
import PostList from "../PostList/PostList";

type TabType = "all" | "groups" | "topics" | "dms";

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState<TabType>("all");

  const handleAllClick = () => {
    setSelectedTab("all");
  };
  const handleGroupsClick = () => {
    setSelectedTab("groups");
  };
  const handleTopicsClick = () => {
    setSelectedTab("topics");
  };
  const handleDmsClick = () => {
    setSelectedTab("dms");
  };

  return (
    <div>
      <h1>Dashboard Page</h1>
      <div>
        <button onClick={handleAllClick}>All</button>
        <button onClick={handleGroupsClick}>Groups</button>
        <button onClick={handleTopicsClick}>Topics</button>
        <button onClick={handleDmsClick}>DMs</button>
      </div>
      {selectedTab === "all" && <DashboardAll />}
      {selectedTab === "groups" && <DashboardGroups />}
      {selectedTab === "topics" && <DashboardTopics />}
      {selectedTab === "dms" && <DashboardDms />}
    </div>
  );
}

export default Dashboard;
