import { useEffect } from "react";
import Dashboard from "../components/Dashboard/Dashboard";

function DashboardPage() {
  useEffect(() => {
    document.title = "Dashboard | Experis Connect";
  }, []);

  return <Dashboard />;
}

export default DashboardPage;
