import { ApiRequestInfo } from "../types/api";
import { TTopicPost } from "../types/topic";
import { getKeycloakToken } from "../utils/keycloak";

const topicApiUrl = `${import.meta.env.VITE_API_BASE_URL}/topic`;

export const topicApi = {
  get: {
    topics: (): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(topicApiUrl).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    userTopics: (): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(`${topicApiUrl}/user`).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    topicById: (topicId: number): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(`${topicApiUrl}/${topicId}`).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    topicMembers: (topicId: number): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(`${topicApiUrl}/${topicId}/user/list`).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
  },
  post: {
    newTopic: (topicDetails: TTopicPost): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(topicApiUrl).toString(),
        options: {
          method: "POST",
          headers: [
            ["Authorization", `Bearer ${token}`],
            ["Content-Type", "application/json"],
          ],
          body: JSON.stringify(topicDetails),
        },
      };
    },
    addCurrentUserToTopic: (topicId: number): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(`${topicApiUrl}/${topicId}/join`).toString(),
        options: {
          method: "POST",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    addUserToTopic: (topicId: number, userId: string): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(
          `${topicApiUrl}/${topicId}/join?` +
            new URLSearchParams({ user: userId })
        ).toString(),
        options: {
          method: "POST",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
  },
  put: {
    removeCurrentUserFromTopic: (topicId: number): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(`${topicApiUrl}/${topicId}/leave`).toString(),
        options: {
          method: "PUT",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
  },
};
