import { Navigate } from "react-router-dom";
import keycloak from "../../utils/keycloak";
import styles from "./login.module.css";

function Login() {
  const onLoginClick = () => {
    keycloak.login();
  };

  if (keycloak.authenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className={styles["login-wrapper"]}>
      <div className={styles.login}>
        <img src="/logo.png" alt="Experis Connect" />
        <div>
          Connect with your Experis alumnis and co-students to explore what is
          happening in your network.
        </div>
        <button onClick={onLoginClick}>Login</button>
      </div>
    </div>
  );
}

export default Login;
