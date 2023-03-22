export type TGroup = {
  id: number;
  name: string;
  description: string;
  color: string;
  private: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TGroupPost = {
  name: string;
  description: string;
  color: string;
  private: boolean;
};

export type TGroupMini = {
  id: number;
  name: string;
};
