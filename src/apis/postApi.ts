import { ApiRequestInfo } from "../types/api";
import { TPostPost, TPostPut, TPostTargetType } from "../types/post";
import keycloak, { getKeycloakToken } from "../utils/keycloak";

const postApiUrl = `${import.meta.env.VITE_API_BASE_URL}/post`;

// TODO pagination for all GET requests
export const postApi = {
  get: {
    posts: (target?: TPostTargetType): ApiRequestInfo => {
      let requestUrl = postApiUrl;
      if (target) {
        requestUrl += `/${target.toLowerCase()}`;
      }
      const token = getKeycloakToken();
      return {
        uri: new URL(requestUrl).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    postByPage: (
      limit: number,
      offset: number,
      target?: TPostTargetType
    ): ApiRequestInfo => {
      let requestUrl = postApiUrl;
      if (target) {
        requestUrl += `/${target.toLowerCase()}`;
      }
      const token = getKeycloakToken();
      return {
        uri: new URL(
          `${requestUrl}?` +
            new URLSearchParams([
              ["limit", `${limit}`],
              ["offset", `${offset}`],
            ])
        ).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    postById: (id: number): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(`${postApiUrl}/${id}`).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    searchPosts: (searchTerm: string): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(
          `${postApiUrl}?` + new URLSearchParams({ search: searchTerm })
        ).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    searchPostsByPage: (
      searchTerm: string,
      limit: number,
      offset: number
    ): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(
          `${postApiUrl}?` +
            new URLSearchParams([
              ["search", searchTerm],
              ["limit", `${limit}`],
              ["offset", `${offset}`],
            ])
        ).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    postDms: (): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(`${postApiUrl}/user`).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    searchPostDms: (searchTerm: string): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(
          `${postApiUrl}/user?` + new URLSearchParams({ search: searchTerm })
        ).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    postDmsFromUser: (userId: string): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(`${postApiUrl}/user/${userId}`).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    searchPostDmsFromUser: (
      userId: string,
      searchTerm: string
    ): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(
          `${postApiUrl}/user/${userId}?` +
            new URLSearchParams({ search: searchTerm })
        ).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    postsFromGroup: (groupId: number): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(`${postApiUrl}/group/${groupId}`).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    postsFromGroupByPage: (
      groupId: number,
      limit: number,
      offset: number
    ): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(
          `${postApiUrl}/group/${groupId}?` +
            new URLSearchParams([
              ["limit", `${limit}`],
              ["offset", `${offset}`],
            ])
        ).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    searchPostsFromGroup: (
      groupId: number,
      searchTerm: string
    ): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(
          `${postApiUrl}/group/${groupId}?` +
            new URLSearchParams({ search: searchTerm })
        ).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    postsFromTopic: (topicId: number): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(`${postApiUrl}/topic/${topicId}`).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    postsFromTopicByPage: (
      topicId: number,
      limit: number,
      offset: number
    ): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(
          `${postApiUrl}/topic/${topicId}?` +
            new URLSearchParams([
              ["limit", `${limit}`],
              ["offset", `${offset}`],
            ])
        ).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
    searchPostsFromTopic: (
      topicId: number,
      searchTerm: string
    ): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(
          `${postApiUrl}/topic/${topicId}?` +
            new URLSearchParams({ search: searchTerm })
        ).toString(),
        options: {
          method: "GET",
          headers: [["Authorization", `Bearer ${token}`]],
        },
      };
    },
  },
  post: {
    newPost: (postDetails: TPostPost): ApiRequestInfo => {
      const token = getKeycloakToken();
      return {
        uri: new URL(postApiUrl).toString(),
        options: {
          method: "POST",
          headers: [
            ["Authorization", `Bearer ${token}`],
            ["Content-Type", "application/json"],
          ],
          body: JSON.stringify(postDetails),
        },
      };
    },
  },
  put: {
    updatePost: (postId: number, postDetails: TPostPut): ApiRequestInfo => {
      keycloak.updateToken(30);
      const token = getKeycloakToken();
      return {
        uri: new URL(`${postApiUrl}/${postId}`).toString(),
        options: {
          method: "PUT",
          headers: [
            ["Authorization", `Bearer ${token}`],
            ["Content-Type", "application/json"],
          ],
          body: JSON.stringify(postDetails),
        },
      };
    },
  },
};
