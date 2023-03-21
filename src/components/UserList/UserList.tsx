import { TUser } from "../../types/user";
import UserIcon from "../UserIcon/UserIcon";
import styles from "./userList.module.css";

type UserListProps = {
  data: TUser[];
};

function UserList({ data }: UserListProps) {
  const userList = data.map((user) => (
    <UserListItem data={user} key={user.id} />
  ));

  return <ul className={styles["user-list"]}>{userList}</ul>;
}

type UserListItemProps = {
  data: TUser;
};

function UserListItem({ data }: UserListItemProps) {
  return (
    <li>
      <UserIcon user={data} small={true} />
      {data.name}
    </li>
  );
}

export default UserList;
