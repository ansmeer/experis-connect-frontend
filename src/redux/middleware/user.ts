import { userApi } from "../../apis/userApi";
import { TUser, TUserPut } from "../../types/user";

export async function getCurrentUser(): Promise<TUser> {
  const getUserRequest = userApi.get.currentUser();

  const response = await fetch(getUserRequest.uri, getUserRequest.options);

  if (!response.ok) {
    throw new Error("Could not get current user.");
  }

  return await response.json();
}

export async function getUser(userId: string): Promise<TUser> {
  const getUserRequest = userApi.get.userById(userId);

  const response = await fetch(getUserRequest.uri, getUserRequest.options);

  if (!response.ok) {
    throw new Error("Could not get user.");
  }

  return await response.json();
}

export async function updateCurrentUser(userDetails: TUserPut): Promise<TUser> {
  const updateUserRequest = userApi.put.user(userDetails);

  const response = await fetch(
    updateUserRequest.uri,
    updateUserRequest.options
  );

  if (!response.ok) {
    throw new Error("Could not update user.");
  }

  return await response.json();
}

export async function registerCurrentUser(): Promise<TUser> {
  const registerUserRequest = userApi.post.newUser();

  const response = await fetch(
    registerUserRequest.uri,
    registerUserRequest.options
  );

  if (!response.ok) {
    throw new Error("Could not register user.");
  }

  return await response.json();
}
