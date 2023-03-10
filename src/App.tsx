import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import GroupListPage from "./pages/GroupListPage";
import GroupPage from "./pages/GroupPage";
import TopicListPage from "./pages/TopicListPage";
import TopicPage from "./pages/TopicPage";
import ThreadPage from "./pages/ThreadPage";
import SearchPage from "./pages/SearchResultPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/settings" element={<ProfileSettingsPage />} />
        <Route path="/grouplist" element={<GroupListPage />} />
        <Route path="/groups" element={<GroupPage />} />
        <Route path="/topiclist" element={<TopicListPage />} />
        <Route path="/topics" element={<TopicPage />} />
        <Route path="/thread" element={<ThreadPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
