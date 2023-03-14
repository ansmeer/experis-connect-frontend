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
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Header />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <KeycloakRoute role={ROLES.User}>
                    <DashboardPage />
                  </KeycloakRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <KeycloakRoute role={ROLES.User}>
                    <ProfilePage />
                  </KeycloakRoute>
                }
              />
              <Route
                path="/profile/settings"
                element={
                  <KeycloakRoute role={ROLES.User}>
                    <ProfileSettingsPage />
                  </KeycloakRoute>
                }
              />
              <Route
                path="/grouplist"
                element={
                  <KeycloakRoute role={ROLES.User}>
                    <GroupListPage />
                  </KeycloakRoute>
                }
              />
              <Route
                path="/group"
                element={
                  <KeycloakRoute role={ROLES.User}>
                    <GroupPage />
                  </KeycloakRoute>
                }
              />
              <Route
                path="/topiclist"
                element={
                  <KeycloakRoute role={ROLES.User}>
                    <TopicListPage />
                  </KeycloakRoute>
                }
              />
              <Route
                path="/topic"
                element={
                  <KeycloakRoute role={ROLES.User}>
                    <TopicPage />
                  </KeycloakRoute>
                }
              />
              <Route
                path="/thread"
                element={
                  <KeycloakRoute role={ROLES.User}>
                    <ThreadPage />
                  </KeycloakRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <KeycloakRoute role={ROLES.User}>
                    <SearchPage />
                  </KeycloakRoute>
                }
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
