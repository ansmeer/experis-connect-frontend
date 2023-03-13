import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginUser } from "../redux/slices/userSlice";
import { AppDispatch, RootState } from "../redux/store";
import keycloak from "../utils/keycloak";

type Props = { children: ReactNode; role: string; redirectTo?: string };

function KeycloakRoute({ children, role, redirectTo = "/" }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  if (!keycloak.authenticated) {
    return <Navigate replace to={redirectTo} />;
  }

  if (keycloak.authenticated && !user.isLoggedIn) {
    dispatch(loginUser());
  }

  if (keycloak.hasRealmRole(role)) {
    return <>{children}</>;
  }

  return <Navigate replace to={redirectTo} />;
}

export default KeycloakRoute;
