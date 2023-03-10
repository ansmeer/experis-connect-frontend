import { ApiRequestInfo } from "../types/api";
import { TGroupPost } from "../types/group";

const groupApiUrl = `${import.meta.env.VITE_API_BASE_URL}/group`;

export const groupApi = {
  get: {
    groups: (): ApiRequestInfo => {
      return {
        uri: new URL(groupApiUrl).toString(),
        options: {
          method: "GET",
          headers: {}, // TODO authentication headers
        },
      };
    },
    groupById: (groupId: number): ApiRequestInfo => {
      return {
        uri: new URL(`${groupApiUrl}/${groupId}`).toString(),
        options: {
          method: "GET",
          headers: {}, // TODO authentication headers
        },
      };
    },
  },
  post: {
    newGroup: (groupDetails: TGroupPost): ApiRequestInfo => {
      return {
        uri: new URL(groupApiUrl).toString(),
        options: {
          method: "POST",
          headers: {}, // TODO authentication headers
          body: JSON.stringify(groupDetails),
        },
      };
    },
    addCurrentUserToGroup: (groupId: number): ApiRequestInfo => {
      return {
        uri: new URL(`${groupApiUrl}/${groupId}/join`).toString(),
        options: {
          method: "POST",
          headers: {}, // TODO authentication headers
        },
      };
    },
    addUserToGroup: (groupId: number, userId: string): ApiRequestInfo => {
      return {
        uri: new URL(
          `${groupApiUrl}/${groupId}/join?` +
            new URLSearchParams({ user: userId })
        ).toString(),
        options: {
          method: "POST",
          headers: {}, // TODO authentication headers
        },
      };
    },
  },
};
