import { TGroupMini } from "./group";
import { TTopicMini } from "./topic";
import { TUserShort } from "./user";

export type TPost = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  originId: number;
  postTarget: TPostTargetType;
  senderId: TUserShort;
  replyParentId: number | null;
  targetUser: TUserShort | null;
  targetGroup: TGroupMini | null;
  targetTopic: TTopicMini | null;
};

export type TPostTargetType = "USER" | "GROUP" | "TOPIC";

export type TPostWithReplies = TPost & {
  replies: number[];
};

export type TPostFormData = {
  title: string;
  content: string;
  postTarget: TPostTargetType;
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
