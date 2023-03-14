export type TUser = {
  id: string;
  name: string;
  picture: string;
  status: string;
  bio: string;
  funFact: string;
  updatedAt: string;
  createdAt: string;
  groups: number[];
  topics: number[];
};

export type TUserPut = {
  name: string;
  picture: string;
  status: string;
  bio: string;
  funFact: string;
};
