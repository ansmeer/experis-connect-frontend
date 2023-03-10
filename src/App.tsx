import { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import reactLogo from "./assets/react.svg";
import "./App.css";
import LoginPage from "./app/layout/pages/LoginPage";
import DashboardPage from "./app/layout/pages/DashboardPage";
import ProfilePage from "./app/layout/pages/ProfilePage";
import ProfileSettingsPage from "./app/layout/pages/ProfileSettingsPage";
import GroupListPage from "./app/layout/pages/GroupListPage";
import GroupPage from "./app/layout/pages/GroupPage";
import TopicListPage from "./app/layout/pages/TopicListPage";
import TopicPage from "./app/layout/pages/TopicPage";
import ThreadPage from "./app/layout/pages/ThreadPage";
import SearchPage from "./app/layout/pages/SearchPage";

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
    
    /*
    <div className="App">

         
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>*/
  );
}

export default App;
