import { Link } from "react-router-dom";
import { dateAndTimeOptionsEN } from "../../consts/dates";
import { TPost } from "../../types/post";
import UserIcon from "../UserIcon/UserIcon";
import styles from "./postListItem.module.css";

type Props = { data: TPost };

function PostListItem({ data }: Props) {
  const createdAtDate = new Date(data.createdAt).toLocaleDateString(
    "en-EN",
    dateAndTimeOptionsEN
  );

  return (
    <section className={styles.post}>
      <header>
        <UserIcon user={data.senderId} />
        <div>
          <h2>
            <Link to={`/thread/${data.originId}`}>{data.title}</Link>
          </h2>
          <div className={styles["post-description"]}>
            <Link to={`/profile/${data.senderId.id}`}>
              {data.senderId.name}
            </Link>{" "}
            on {createdAtDate}
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
        <Link to={`/thread/${data.originId}`}>Read thread</Link>
      </footer>
    </section>
  );
}

export default PostListItem;
