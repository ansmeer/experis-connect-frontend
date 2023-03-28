import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { postApi } from "../../apis/postApi";
import { hideReplyForm, showReplyForm } from "../../redux/slices/postSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { TPostPost, TPostPut, TPostWithReplies } from "../../types/post";
import ErrorFetch from "../ErrorFetch/ErrorFetch";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import Post from "../Post/Post";
import PostReplyForm from "../PostReplyForm/PostReplyForm";
import styles from "./thread.module.css";

function Thread() {
  const { id } = useParams();
  const replyFormIsVisible = useSelector(
    (state: RootState) => state.post.showReplyForm
  );
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.details);
  const selectedPost = useSelector(
    (state: RootState) => state.post.replyToPost
  );

  const { data, isLoading, isError, refetch } = useQuery<TPostWithReplies>({
    queryKey: ["post", id],
    queryFn: async () => {
      const postId = id ? parseInt(id, 10) : 0;
      const postRequest = postApi.get.postById(postId);
      const response = await fetch(postRequest.uri, postRequest.options);
      if (response.status === 404) {
        navigate("/404");
      }
      return await response.json();
    },
  });

  useEffect(() => {
    dispatch(hideReplyForm());
  }, []);

  useEffect(() => {
    document.title = data
      ? `${data.title} | Experis Connect`
      : "Experis Connect";
  }, [data]);

  if (!id) return <></>;

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorFetch text="Could not fetch thread." />;
  }

  const handleReplyData = async (data: TPostPut) => {
    const postToSend: TPostPost = {
      title: data.title,
      content: data.content,
      senderId: user!.id,
      replyParentId: selectedPost!.id,
      postTarget: selectedPost!.postTarget,
      targetUser: selectedPost!.targetUser?.id || null,
      targetGroup: selectedPost!.targetGroup?.id || null,
      targetTopic: selectedPost!.targetTopic?.id || null,
    };

    const postRequest = postApi.post.newPost(postToSend);
    await fetch(postRequest.uri, postRequest.options);

    window.location.reload(); // TODO is there a better way to refresh?
  };

  const handleReplyClick = () => {
    dispatch(showReplyForm());
  };

  return (
    <>
      <main>
        <div className={styles.thread}>
          <h1>Thread: {data?.title}</h1>
          <div className={styles["thread-description"]}>
            {data?.postTarget === "GROUP" && (
              <>
                Posted in{" "}
                <Link to={`/groups/${data.targetGroup?.id}`}>
                  {data.targetGroup?.name}
                </Link>
              </>
            )}
            {data?.postTarget === "TOPIC" && (
              <>
                Posted in{" "}
                <Link to={`/topics/${data.targetTopic?.id}`}>
                  {data.targetTopic?.name}
                </Link>
              </>
            )}
            {data?.postTarget === "USER" && (
              <>
                Private chat with{" "}
                <Link to={`/profile/${data.targetUser?.id}`}>
                  {data.targetUser?.name}
                </Link>
              </>
            )}
          </div>
          <Post id={parseInt(id, 10)} withReplies={true} selectPost={true} />
        </div>
      </main>
      <div className={styles.reply}>
        {replyFormIsVisible ? (
          <PostReplyForm handleData={handleReplyData} />
        ) : (
          <Footer text="Reply to thread" clickHandler={handleReplyClick} />
        )}
      </div>
    </>
  );
}

export default Thread;
