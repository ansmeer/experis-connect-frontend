import { useEffect } from "react";
import TopicList from "../components/TopicList/TopicList";

function TopicListPage() {
  useEffect(() => {
    document.title = "Topics | Experis Connect";
  }, []);

  return <TopicList />;
}

export default TopicListPage;
