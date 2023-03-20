export type TGroup = {
  id: number;
  name: string;
  description: string;
  color: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TGroupPost = {
  name: string;
  description: string;
  color: string;
  isPrivate: boolean;
};

export type TGroupMini = {
  id: number;
  name: string;

export type TGroupFormData = {
  name: string;
  description: string;
  color: string;
  isPrivate: boolean;
};
