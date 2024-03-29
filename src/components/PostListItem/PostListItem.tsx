import { Link } from "react-router-dom";
import { dateAndTimeOptionsEN } from "../../consts/dates";
import { TPost } from "../../types/post";
import UserIcon from "../UserIcon/UserIcon";
import styles from "./postListItem.module.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

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
              <>
                Posted in{" "}
                <Link to={`/groups/${data.targetGroup?.id}`}>
                  {data.targetGroup?.name}
                </Link>
              </>
            )}
            {data.postTarget === "TOPIC" && (
              <>
                Posted in{" "}
                <Link to={`/topics/${data.targetTopic?.id}`}>
                  {data.targetTopic?.name}
                </Link>
              </>
            )}
            {data.postTarget === "USER" && (
              <>
                Private chat with{" "}
                <Link to={`/profile/${data.targetUser?.id}`}>
                  {data.targetUser?.name}
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <div className={styles["post-content"]}>
        <ReactMarkdown>{data.content}</ReactMarkdown>
      </div>
      <footer>
        <Link to={`/thread/${data.originId}`}>Read thread</Link>
      </footer>
    </section>
  );
}

export default PostListItem;
