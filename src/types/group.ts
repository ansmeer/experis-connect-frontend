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

export type TGroupFormData = {
  name: "";
  description: "";
  color: "";
  isPrivate: false;
};
