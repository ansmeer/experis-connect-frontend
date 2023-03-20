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
import Header from "./components/Header/Header";
import KeycloakRoute from "./routes/KeycloakRoute";
import { ROLES } from "./consts/roles";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Error404Page from "./pages/Error404Page";
import CreatePostPage from "./pages/CreatePostPage";

import CreateTopicPage from "./pages/CreateTopicPage"

import PageLayout from "./components/PageLayout/PageLayout";


function App() {
  const queryDefaultOptions = {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 30 * 1000,
      },
    },
  };
  const queryClient = new QueryClient(queryDefaultOptions);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <PageLayout>
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
                path="/profile/:id?"
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
                path="/groups"
                element={
                  <KeycloakRoute role={ROLES.User}>
                    <GroupListPage />
                  </KeycloakRoute>
                }
              />
              <Route
                path="/groups/:id"
                element={
                  <KeycloakRoute role={ROLES.User}>
                    <GroupPage />
                  </KeycloakRoute>
                }
              />
              <Route
                path="/topics"
                element={
                  <KeycloakRoute role={ROLES.User}>
                    <TopicListPage />
                  </KeycloakRoute>
                }
              />
              <Route
                path="/topics/:id"
                element={
                  <KeycloakRoute role={ROLES.User}>
                    <TopicPage />
                  </KeycloakRoute>
                }
              />
              <Route
                path="/thread/:id"
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
              <Route
                path="/create/post"
                element={
                  <KeycloakRoute role={ROLES.User}>
                    <CreatePostPage />
                  </KeycloakRoute>
                }
              />
              <Route 
              path="/create/topic"
              element={
                <KeycloakRoute role={ROLES.User}>
                  <CreateTopicPage></CreateTopicPage>
                </KeycloakRoute>
              }
              />
              <Route path="*" element={<Error404Page />} />
            </Routes>
          </PageLayout>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
