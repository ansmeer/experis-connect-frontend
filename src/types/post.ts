import { TUserShort } from "./user";

export type TPost = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  postTarget: TPostTargetType;
  senderId: TUserShort;
  replyParentId: number | null;
  targetUser: string | null;
  targetGroup: number | null;
  targetTopic: number | null;
};

export type TPostTargetType = "user" | "group" | "topic";

export type TPostWithReplies = TPost & {
  replies: number[];
};

export type TPostFormData = {
  title: string;
  content: string;
  postTarget: "user" | "group" | "topic";
  targetUser: string | null;
  targetGroup: number | null;
  targetTopic: number | null;
};

export type TPostPost = {
  title: string;
  content: string;
  postTarget: TPostTargetType;
  senderId: string;
  replyParentId: number | null;
  targetUser: string | null;
  targetGroup: number | null;
  targetTopic: number | null;
};

export type TPostPut = {
  title: string;
  content: string;
};
