import { useEffect } from "react";
import GroupList from "../components/GroupList/GroupList";

function GroupListPage() {
  document.title = "Groups | Experis Connect";

  return <GroupList />;
}

export default GroupListPage;
