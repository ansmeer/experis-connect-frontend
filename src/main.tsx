import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Unlocking from "./components/Unlocking/Unlocking";
import "./index.css";
import { initialize } from "./utils/keycloak";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<Unlocking />);

// Initialize Keycloak
initialize()
  .then(() => {
    // If no Keycloak error occurred, display the app
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch(() => {
    root.render(
      <React.StrictMode>
        <div>Could not connect to Keycloak</div>
      </React.StrictMode>
    );
  });
