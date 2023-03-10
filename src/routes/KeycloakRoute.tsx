import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import keycloak from "../utils/keycloak";

type Props = { children: ReactNode; role: string; redirectTo: string };

function KeycloakRoute({ children, role, redirectTo = "/" }: Props) {
  if (!keycloak.authenticated) {
    return <Navigate replace to={redirectTo} />;
  }

  if (keycloak.hasRealmRole(role)) {
    return <>{children}</>;
  }

  return <Navigate replace to={redirectTo} />;
}

export default KeycloakRoute;
