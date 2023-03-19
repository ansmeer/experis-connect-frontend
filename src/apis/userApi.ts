import { ApiRequestInfo } from "../types/api";
import { TUserPut } from "../types/user";
import keycloak, { getKeycloakToken } from "../utils/keycloak";

const userApiUrl = `${import.meta.env.VITE_API_BASE_URL}/user`;

export const userApi = {
  get: {
    currentUser: (): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(userApiUrl).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    userById: (userId: string): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(`${userApiUrl}/${userId}`).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
  },
  post: {
    newUser: (): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(userApiUrl).toString(),
        options: {
          method: "POST",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
  },
  put: {
    user: (userDetails: TUserPut): ApiRequestInfo => {
      const userId = keycloak.subject;
      const token = getKeycloakToken();
      return {
        uri: new URL(`${userApiUrl}/${userId}`).toString(),
        options: {
          method: "PUT",
          headers: [
            ["Authorization", `Bearer ${token}`],
            ["Content-Type", "application/json"],
          ],
          body: JSON.stringify(userDetails),
        },
      };
    },
  },
};
