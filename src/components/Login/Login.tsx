import { Navigate } from "react-router-dom";
import keycloak from "../../utils/keycloak";

function Login() {
  const onLoginClick = () => {
    keycloak.login();
  };

  if (keycloak.authenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={onLoginClick}>Login</button>
    </div>
  );
}

export default Login;
