import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postApi } from "../../apis/postApi";
import { RootState } from "../../redux/store";
import { TPostPost, TPostPut } from "../../types/post";
import Post from "../Post/Post";
import PostReplyForm from "../PostReplyForm/PostReplyForm";
import styles from "./thread.module.css";

function Thread() {
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user.details);
  const selectedPost = useSelector(
    (state: RootState) => state.post.replyToPost
  );

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

  return (
    <div>
      <div className={styles.thread}>
        <Post id={parseInt(id, 10)} withReplies={true} selectPost={true} />
      </div>
      <PostReplyForm handleData={handleReplyData} />
    </div>
  );
}

export default Thread;
