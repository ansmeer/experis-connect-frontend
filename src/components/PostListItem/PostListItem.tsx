import { Link } from "react-router-dom";
import { TPost } from "../../types/post";
import styles from "./postListItem.module.css";

type Props = { data: TPost };

function PostListItem({ data }: Props) {
  return (
    <div className={styles.post}>
      <div>
        User {data.senderId} posted on {data.createdAt}
      </div>
      <div>
        {data.id} - {data.title}
      </div>
      <div>{data.content}</div>
      <Link to={`/thread/${data.id}`} />
    </div>
  );
}

export default PostListItem;
