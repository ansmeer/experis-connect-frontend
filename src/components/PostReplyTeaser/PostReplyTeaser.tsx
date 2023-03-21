import { useDispatch } from "react-redux";
import { showReplyForm } from "../../redux/slices/postSlice";
import { AppDispatch } from "../../redux/store";
import styles from "./postReplyTeaser.module.css";

function PostReplyTeaser() {
  const dispatch = useDispatch<AppDispatch>();

  const handleReplyClick = () => {
    dispatch(showReplyForm());
  };

  return (
    <div className={styles["reply-teaser"]}>
      <button onClick={handleReplyClick}>Reply to thread</button>
    </div>
  );
}

export default PostReplyTeaser;
