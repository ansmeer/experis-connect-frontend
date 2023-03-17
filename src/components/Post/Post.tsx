import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postApi } from "../../apis/postApi";
import { setReplyToPost } from "../../redux/slices/postSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { TPostWithReplies } from "../../types/post";
import Loading from "../Loading/Loading";
import styles from "./post.module.css";

type Props = {
  id: number;
  withReplies: boolean;
  selectPost: boolean;
};

function Post({ id, withReplies, selectPost }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const selectedPostId = useSelector(
    (state: RootState) => state.post.replyToPost?.id
  );
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
  const hasReplies = Boolean(data?.replies.length);

  const handleHideClick = () => {
    setShowReplies(false);
  };
  const handleShowClick = () => {
    setShowReplies(true);
  };
  const handleReplyClick = () => {
    if (!data) return;
    dispatch(setReplyToPost(data));
  };

  useEffect(() => {
    if (selectPost && data) {
      dispatch(setReplyToPost(data));
    }
  }, [selectPost, data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Could not load post.</div>;
  }

  return (
    <div className={styles["post-wrapper"]}>
      <div
        className={
          selectedPostId === id ? styles["post-highlight"] : styles.post
        }>
        <div>
          User {data?.senderId} posted on {data?.createdAt}
        </div>
        <div>
          {data?.id} - {data?.title}
        </div>
        <div>{data?.content}</div>
        <div className={styles["post-footer"]}>
          <div>{data?.replies.length} replies</div>
          <button onClick={handleReplyClick}>Reply</button>
          {showReplies && hasReplies && (
            <button onClick={handleHideClick}>Hide replies</button>
          )}
          {!showReplies && hasReplies && (
            <button onClick={handleShowClick}>Show replies</button>
          )}
        </div>
      </div>
      {showReplies && (
        <div className={styles.replies}>
          {data?.replies.map((reply) => (
            <Post
              id={reply}
              key={reply}
              withReplies={true}
              selectPost={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;
