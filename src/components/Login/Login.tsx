import React from "react";
import keycloak from "../../utils/keycloak";

function Login() {
  const onLoginClick = () => {
    keycloak.login();
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={onLoginClick}>Login</button>
    </div>
  );
}

export default Login;
