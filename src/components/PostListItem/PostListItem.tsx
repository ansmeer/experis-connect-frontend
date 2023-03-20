import { Link } from "react-router-dom";
import { TPost } from "../../types/post";
import UserIcon from "../UserIcon/UserIcon";
import styles from "./postListItem.module.css";

type Props = { data: TPost };

function PostListItem({ data }: Props) {
  return (
    <section className={styles.post}>
      <header>
        <UserIcon user={data.senderId} />
        <div>
          <h2>{data.title}</h2>
          <div className={styles["post-description"]}>
            <Link to={`/profile/${data.senderId.id}`}>
              {data.senderId.name}
            </Link>{" "}
            on {data.createdAt}
          </div>
          <div className={styles["post-description"]}>
            {data.postTarget === "GROUP" && (
              <Link to={`/groups/${data.targetGroup?.id}`}>
                {data.targetGroup?.name}
              </Link>
            )}
            {data.postTarget === "TOPIC" && (
              <Link to={`/topics/${data.targetTopic?.id}`}>
                {data.targetTopic?.name}
              </Link>
            )}
          </div>
        </div>
      </header>
      <div className={styles["post-content"]}>{data.content}</div>
      <footer>
        <Link to={`/thread/${data.id}`}>Read thread</Link>
      </footer>
    </section>
  );
}

export default PostListItem;
