export type TTopic = {
  id: number;
  name: string;
  description: string;
  color: string;
  createdAt: string;
  updatedAt: string;
};

export type TTopicPost = {
  name: string;
  description: string;
  color: string;
};

export type TTopicMini = {
  id: number;
  name: string;
};
