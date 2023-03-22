import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postApi } from "../../apis/postApi";
import { RootState } from "../../redux/store";
import { TPostFormData, TPostPost } from "../../types/post";
import keycloak from "../../utils/keycloak";
import CreatePostForm from "../CreatePostForm/CreatePostForm";

function CreatePost() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.details);
  console.log(keycloak.token);

  const handleData = async (data: TPostFormData) => {
    const postToSend: TPostPost = {
      senderId: user!.id,
      title: data.title,
      content: data.content,
      postTarget: data.postTarget,
      targetGroup: data.targetGroup,
      targetTopic: data.targetTopic,
      targetUser: data.targetUser,
      replyParentId: null,
    };
    const postRequest = postApi.post.newPost(postToSend);
    const response = await fetch(postRequest.uri, postRequest.options);
    const postId = await response.json();
    navigate(`/thread/${postId}`);
  };

  return (
    <>
      <h1>Create new post</h1>
      <CreatePostForm handleData={handleData} />
    </>
  );
}

export default CreatePost;
