import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postApi } from "../../apis/postApi";
import { hideReplyForm, showReplyForm } from "../../redux/slices/postSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { TPostPost, TPostPut } from "../../types/post";
import Footer from "../Footer/Footer";
import Post from "../Post/Post";
import PostReplyForm from "../PostReplyForm/PostReplyForm";
import styles from "./thread.module.css";

function Thread() {
  const { id } = useParams();
  const replyFormIsVisible = useSelector(
    (state: RootState) => state.post.showReplyForm
  );
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.details);
  const selectedPost = useSelector(
    (state: RootState) => state.post.replyToPost
  );

  useEffect(() => {
    dispatch(hideReplyForm());
  }, []);

  // useEffect(() => { // TODO page title
  //   document.title = urlParam
  //     ? `Search: ${urlParam} | Experis Connect`
  //     : "Experis Connect";
  // }, [urlParam]);

  if (!id) return <></>;

  const handleReplyData = async (data: TPostPut) => {
    const postToSend: TPostPost = {
      title: data.title,
      content: data.content,
      senderId: user!.id,
      replyParentId: selectedPost!.id,
      postTarget: selectedPost!.postTarget,
      targetUser: selectedPost!.targetUser,
      targetGroup: selectedPost!.targetGroup?.id || null,
      targetTopic: selectedPost!.targetTopic?.id || null,
    };

    const postRequest = postApi.post.newPost(postToSend);
    await fetch(postRequest.uri, postRequest.options);

    // TODO fix data refresh in all post components
  };

  const handleReplyClick = () => {
    dispatch(showReplyForm());
  };

  return (
    <>
      <main>
        <div className={styles.thread}>
          <h1>Thread</h1>
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
