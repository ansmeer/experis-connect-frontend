import { ApiRequestInfo } from "../types/api";
import { TPostPost, TPostPut } from "../types/post";

const postApiUrl = `${import.meta.env.VITE_API_BASE_URL}/post`;

// TODO pagination for all GET requests
export const postApi = {
  get: {
    posts: (): ApiRequestInfo => {
      return {
        uri: new URL(postApiUrl).toString(),
        options: {
          method: "GET",
          headers: {}, // TODO authentication headers
        },
      };
    },
    searchPosts: (searchTerm: string): ApiRequestInfo => {
      return {
        uri: new URL(
          `${postApiUrl}?` + new URLSearchParams({ search: searchTerm })
        ).toString(),
        options: {
          method: "GET",
          headers: {}, // TODO authentication headers
        },
      };
    },
    postDms: (): ApiRequestInfo => {
      return {
        uri: new URL(`${postApiUrl}/user`).toString(),
        options: {
          method: "GET",
          headers: {}, // TODO authentication headers
        },
      };
    },
    searchPostDms: (searchTerm: string): ApiRequestInfo => {
      return {
        uri: new URL(
          `${postApiUrl}/user?` + new URLSearchParams({ search: searchTerm })
        ).toString(),
        options: {
          method: "GET",
          headers: {}, // TODO authentication headers
        },
      };
    },
    postDmsFromUser: (userId: string): ApiRequestInfo => {
      return {
        uri: new URL(`${postApiUrl}/user/${userId}`).toString(),
        options: {
          method: "GET",
          headers: {}, // TODO authentication headers
        },
      };
    },
    searchPostDmsFromUser: (
      userId: string,
      searchTerm: string
    ): ApiRequestInfo => {
      return {
        uri: new URL(
          `${postApiUrl}/user/${userId}?` +
            new URLSearchParams({ search: searchTerm })
        ).toString(),
        options: {
          method: "GET",
          headers: {}, // TODO authentication headers
        },
      };
    },
    postsFromGroup: (groupId: number): ApiRequestInfo => {
      return {
        uri: new URL(`${postApiUrl}/group/${groupId}`).toString(),
        options: {
          method: "GET",
          headers: {}, // TODO authentication headers
        },
      };
    },
    searchPostsFromGroup: (
      groupId: number,
      searchTerm: string
    ): ApiRequestInfo => {
      return {
        uri: new URL(
          `${postApiUrl}/group/${groupId}?` +
            new URLSearchParams({ search: searchTerm })
        ).toString(),
        options: {
          method: "GET",
          headers: {}, // TODO authentication headers
        },
      };
    },
    postsFromTopic: (topicId: number): ApiRequestInfo => {
      return {
        uri: new URL(`${postApiUrl}/topic/${topicId}`).toString(),
        options: {
          method: "GET",
          headers: {}, // TODO authentication headers
        },
      };
    },
    searchPostsFromTopic: (
      topicId: number,
      searchTerm: string
    ): ApiRequestInfo => {
      return {
        uri: new URL(
          `${postApiUrl}/topic/${topicId}?` +
            new URLSearchParams({ search: searchTerm })
        ).toString(),
        options: {
          method: "GET",
          headers: {}, // TODO authentication headers
        },
      };
    },
  },
  post: {
    newPost: (postDetails: TPostPost): ApiRequestInfo => {
      return {
        uri: new URL(postApiUrl).toString(),
        options: {
          method: "POST",
          headers: {}, // TODO authentication headers
          body: JSON.stringify(postDetails),
        },
      };
    },
  },
  put: {
    updatePost: (postId: number, postDetails: TPostPut): ApiRequestInfo => {
      return {
        uri: new URL(`${postApiUrl}/${postId}`).toString(),
        options: {
          method: "PUT",
          headers: {}, // TODO authentication headers
          body: JSON.stringify(postDetails),
        },
      };
    },
  },
};
