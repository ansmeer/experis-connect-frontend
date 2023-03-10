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
import Layout from "./components/Layout/Layout";
import Header from "./components/Header/Header";
import KeycloakRoute from "./routes/KeycloakRoute";
import { ROLES } from "./consts/roles";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <KeycloakRoute role={ROLES.User} redirectTo="/">
                <DashboardPage />
              </KeycloakRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <KeycloakRoute role={ROLES.User} redirectTo="/">
                <ProfilePage />
              </KeycloakRoute>
            }
          />
          <Route
            path="/profile/settings"
            element={
              <KeycloakRoute role={ROLES.User} redirectTo="/">
                <ProfileSettingsPage />
              </KeycloakRoute>
            }
          />
          <Route
            path="/grouplist"
            element={
              <KeycloakRoute role={ROLES.User} redirectTo="/">
                <GroupListPage />
              </KeycloakRoute>
            }
          />
          <Route
            path="/groups"
            element={
              <KeycloakRoute role={ROLES.User} redirectTo="/">
                <GroupPage />
              </KeycloakRoute>
            }
          />
          <Route
            path="/topiclist"
            element={
              <KeycloakRoute role={ROLES.User} redirectTo="/">
                <TopicListPage />
              </KeycloakRoute>
            }
          />
          <Route
            path="/topics"
            element={
              <KeycloakRoute role={ROLES.User} redirectTo="/">
                <TopicPage />
              </KeycloakRoute>
            }
          />
          <Route
            path="/thread"
            element={
              <KeycloakRoute role={ROLES.User} redirectTo="/">
                <ThreadPage />
              </KeycloakRoute>
            }
          />
          <Route
            path="/search"
            element={
              <KeycloakRoute role={ROLES.User} redirectTo="/">
                <SearchPage />
              </KeycloakRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
