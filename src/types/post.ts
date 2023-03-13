export type TPost = {
  id: number;
  createdAt: number;
  updatedAt: number;
  title: string;
  content: string;
  postTarget: "user" | "group" | "target";
  senderId: string;
  replyParentId: number | null;
  targetUser: string | null;
  targetGroup: number | null;
  targetTopic: number | null;
};

export type TPostWithReplies = TPost & {
  replies: TPost[];
};

export type TPostPost = {
  title: string;
  content: string;
  postTarget: "user" | "group" | "target";
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
