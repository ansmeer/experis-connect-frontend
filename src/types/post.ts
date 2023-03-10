export type TPost = {
  id: number;
  createdAt: number;
  updatedAt: number;
  title: string;
  content: string;
  postTarget: "user" | "group" | "target";
  senderId: string;
  replyParentId?: number;
  targetUser?: string;
  targetGroup?: number;
  targetTopic?: number;
};

export type TPostPost = {
  title: string;
  content: string;
  postTarget: "user" | "group" | "target";
  senderId: string;
  replyParentId?: number;
  targetUser?: string;
  targetGroup?: number;
  targetTopic?: number;
};

export type TPostPut = {
  title: string;
  content: string;
};
