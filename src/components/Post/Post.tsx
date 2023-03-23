import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postApi } from "../../apis/postApi";
import { dateAndTimeOptionsEN } from "../../consts/dates";
import { setReplyToPost, showReplyForm } from "../../redux/slices/postSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { TPostWithReplies } from "../../types/post";
import Loading from "../Loading/Loading";
import UserIcon from "../UserIcon/UserIcon";
import styles from "./post.module.css";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

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
  const replyCountText =
    data?.replies.length === 1 ? "1 reply" : `${data?.replies.length} replies`;

  const handleHideClick = () => {
    setShowReplies(false);
  };
  const handleShowClick = () => {
    setShowReplies(true);
  };
  const handleReplyClick = () => {
    if (!data) return;
    dispatch(setReplyToPost(data));
    dispatch(showReplyForm());
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

  if (!data) {
    return <></>;
  }

  const createdAtDate = new Date(data?.createdAt).toLocaleDateString(
    "en-EN",
    dateAndTimeOptionsEN
  );

  return (
    <div>
      <section
        className={
          selectedPostId === id ? styles["post-highlight"] : styles.post
        }>
        <header>
          <UserIcon user={data.senderId} />
          <div>
            <div className={styles["post-title"]}>{data.title}</div>
            <div className={styles["post-description"]}>
              <Link to={`/profile/${data.senderId.id}`}>
                {data.senderId.name}
              </Link>{" "}
              on {createdAtDate}
            </div>
          </div>
        </header>
        <div className={styles["post-content"]}>{data.content}</div>
        <footer>
          {showReplies && hasReplies && (
            <button onClick={handleHideClick} className="light">
              <span>Hide {replyCountText}</span>
              <KeyboardArrowUpOutlinedIcon />
            </button>
          )}
          {!showReplies && hasReplies && (
            <button onClick={handleShowClick} className="light">
              <span>Show {replyCountText}</span>
              <KeyboardArrowDownOutlinedIcon />
            </button>
          )}
          <button onClick={handleReplyClick}>
            <span>Reply</span>
            <MessageOutlinedIcon fontSize="small" />
          </button>
        </footer>
      </section>
      {showReplies && (
        <div className={styles.replies}>
          {data.replies.map((reply) => (
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
