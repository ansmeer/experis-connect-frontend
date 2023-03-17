import { ApiRequestInfo } from "../types/api";
import { TGroupPost } from "../types/group";
import keycloak from "../utils/keycloak";

const groupApiUrl = `${import.meta.env.VITE_API_BASE_URL}/group`;

export const groupApi = {
  get: {
    groups: (): ApiRequestInfo => {
      const token = keycloak.token;
      return {
        uri: new URL(groupApiUrl).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    userGroups: (): ApiRequestInfo => {
      const token = keycloak.token;
      return {
        uri: new URL(`${groupApiUrl}/user`).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    groupById: (groupId: number): ApiRequestInfo => {
      const token = keycloak.token;
      return {
        uri: new URL(`${groupApiUrl}/${groupId}`).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
  },
  post: {
    newGroup: (groupDetails: TGroupPost): ApiRequestInfo => {
      const token = keycloak.token;
      return {
        uri: new URL(groupApiUrl).toString(),
        options: {
          method: "POST",
          headers: [
            ["Authorization", `Bearer ${token}`],
            ["Content-Type", "application/json"],
          ],
          body: JSON.stringify(groupDetails),
        },
      };
    },
    addCurrentUserToGroup: (groupId: number): ApiRequestInfo => {
      const token = keycloak.token;
      return {
        uri: new URL(`${groupApiUrl}/${groupId}/join`).toString(),
        options: {
          method: "POST",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    addUserToGroup: (groupId: number, userId: string): ApiRequestInfo => {
      const token = keycloak.token;
      return {
        uri: new URL(
          `${groupApiUrl}/${groupId}/join?` +
            new URLSearchParams({ user: userId })
        ).toString(),
        options: {
          method: "POST",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
  },
};
