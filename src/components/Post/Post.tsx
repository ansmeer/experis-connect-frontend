import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { postApi } from "../../apis/postApi";
import { TPostWithReplies } from "../../types/post";
import Loading from "../Loading/Loading";
import styles from "./post.module.css";

type Props = {
  id: number;
  withReplies: boolean;
};

function Post({ id, withReplies }: Props) {
  const navigate = useNavigate();
  const [showReplies, setShowReplies] = useState(withReplies);
  const { data, isLoading, isError } = useQuery<TPostWithReplies>({
    queryKey: ["post", id],
    queryFn: async () => {
      const postRequest = postApi.get.postById(id);
      const response = await fetch(postRequest.uri, postRequest.options);
      if (response.status === 404) {
        navigate("/404");
      }
      return await response.json();
    },
  });

  const handleHideClick = () => {
    setShowReplies(false);
  };
  const handleShowClick = () => {
    setShowReplies(true);
  };
  const handleReplyClick = (id: number) => {
    console.log("set reply to", id);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Could not load post.</div>;
  }

  return (
    <div className={styles["post-wrapper"]}>
      <div className={styles.post}>
        <div>
          User {data?.senderId} posted on {data?.createdAt}
        </div>
        <div>{data?.title}</div>
        <div>{data?.content}</div>
        <div className={styles["post-footer"]}>
          <div>{data?.replies.length} replies</div>
          <button onClick={() => handleReplyClick(id)}>Reply</button>
          {showReplies ? (
            <button onClick={() => handleHideClick()}>Hide replies</button>
          ) : (
            <button onClick={handleShowClick}>Show replies</button>
          )}
        </div>
      </div>
      {showReplies && (
        <div className={styles.replies}>
          {data?.replies.map((reply) => (
            <Post id={reply} key={reply} withReplies={true} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;
