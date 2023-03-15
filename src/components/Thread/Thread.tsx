import { useParams } from "react-router-dom";
import Post from "../Post/Post";
import PostReplyForm from "../PostReplyForm/PostReplyForm";
import styles from "./thread.module.css";

function Thread() {
  const { id } = useParams();

  if (!id) {
    return;
  }

  return (
    <div>
      <div className={styles.thread}>
        <Post id={parseInt(id, 10)} withReplies={true} />
      </div>
      <PostReplyForm />
    </div>
  );
}

export default Thread;
