import { ApiRequestInfo } from "../types/api";
import { TTopicPost } from "../types/topic";

const topicApiUrl = `${import.meta.env.VITE_API_BASE_URL}/topic`;

export const topicApi = {
  get: {
    topics: (): ApiRequestInfo => {
      return {
        uri: new URL(topicApiUrl).toString(),
        options: {
          method: "GET",
          headers: {}, // TODO authentication headers
        },
      };
    },
    topicById: (topicId: number): ApiRequestInfo => {
      return {
        uri: new URL(`${topicApiUrl}/${topicId}`).toString(),
        options: {
          method: "GET",
          headers: {}, // TODO authentication headers
        },
      };
    },
  },
  post: {
    newTopic: (topicDetails: TTopicPost): ApiRequestInfo => {
      return {
        uri: new URL(topicApiUrl).toString(),
        options: {
          method: "POST",
          headers: {}, // TODO authentication headers
          body: JSON.stringify(topicDetails),
        },
      };
    },
    addCurrentUserToTopic: (topicId: number): ApiRequestInfo => {
      return {
        uri: new URL(`${topicApiUrl}/${topicId}/join`).toString(),
        options: {
          method: "POST",
          headers: {}, // TODO authentication headers
        },
      };
    },
    addUserToTopic: (topicId: number, userId: string): ApiRequestInfo => {
      return {
        uri: new URL(
          `${topicApiUrl}/${topicId}/join?` +
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
