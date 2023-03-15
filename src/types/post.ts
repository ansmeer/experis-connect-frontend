export type TPost = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  postTarget: "user" | "group" | "topic";
  senderId: string;
  replyParentId: number | null;
  targetUser: string | null;
  targetGroup: number | null;
  targetTopic: number | null;
};

export type TPostWithReplies = TPost & {
  replies: number[];
};

export type TPostPost = {
  title: string;
  content: string;
  postTarget: "user" | "group" | "topic";
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
