import { Link } from "react-router-dom";
import { TUser, TUserShort } from "../../types/user";
import styles from "./userIcon.module.css";

type Props = {
  user: TUser | TUserShort;
};

function UserIcon({ user }: Props) {
  if (!user.picture) {
  }

  const pictureUrl = user.picture ? user.picture : "/default-avatar.png";

  return (
    <div>
      <Link to={`/profile/${user.id}`}>
        <img
          src={pictureUrl}
          alt={user.name}
          title={user.name}
          className={styles.avatar}
        />
      </Link>
    </div>
  );
}

export default UserIcon;
