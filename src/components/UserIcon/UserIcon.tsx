import { Link } from "react-router-dom";
import { TUser, TUserShort } from "../../types/user";
import styles from "./userIcon.module.css";

type Props = {
  user: TUser | TUserShort;
  small?: boolean;
};

function UserIcon({ user, small = false }: Props) {
  if (!user.picture) {
  }

  let imageClassname = styles.avatar;
  if (small) {
    imageClassname += ` ${styles.small}`;
  }

  const pictureUrl = user.picture ? user.picture : "/default-avatar.png";

  return (
    <div>
      <Link to={`/profile/${user.id}`} className={styles["icon-link"]}>
        <img
          src={pictureUrl}
          alt={user.name}
          title={user.name}
          className={imageClassname}
        />
      </Link>
    </div>
  );
}

export default UserIcon;
