import { ApiRequestInfo } from "../types/api";
import { TUserPut } from "../types/user";

const userApiUrl = `${import.meta.env.VITE_API_BASE_URL}/user`;

export const userApi = {
  get: {
    currentUser: (): ApiRequestInfo => {
      return {
        uri: new URL(userApiUrl).toString(),
        options: {
          method: "GET",
          headers: {}, // TODO authentication headers
        },
      };
    },
    userById: (userId: string): ApiRequestInfo => {
      return {
        uri: new URL(`${userApiUrl}/${userId}`).toString(),
        options: {
          method: "GET",
          headers: {}, // TODO authentication headers
        },
      };
    },
  },
  post: {
    newUser: (userId: string): ApiRequestInfo => {
      return {
        uri: new URL(userApiUrl).toString(),
        options: {
          method: "POST",
          headers: {}, // TODO authentication headers
          body: userId,
        },
      };
    },
  },
  put: {
    user: (userId: string, userDetails: TUserPut): ApiRequestInfo => {
      return {
        uri: new URL(`${userApiUrl}/${userId}`).toString(),
        options: {
          method: "PUT",
          headers: {}, // TODO authentication headers
          body: JSON.stringify(userDetails),
        },
      };
    },
  },
};
