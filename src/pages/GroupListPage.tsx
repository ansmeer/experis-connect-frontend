import { useEffect } from "react";
import GroupList from "../components/GroupList/GroupList";

function GroupListPage() {
  useEffect(() => {
    document.title = "Groups | Experis Connect";
  }, []);

  return <GroupList />;
}

export default GroupListPage;
