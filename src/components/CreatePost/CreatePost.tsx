import { useSelector } from "react-redux";
import { postApi } from "../../apis/postApi";
import { RootState } from "../../redux/store";
import { TPostFormData, TPostPost } from "../../types/post";
import keycloak from "../../utils/keycloak";
import CreatePostForm from "../CreatePostForm/CreatePostForm";

function CreatePost() {
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
    await fetch(postRequest.uri, postRequest.options);
  };

  return (
    <>
      <div>CreatePost</div>
      <CreatePostForm handleData={handleData} />
    </>
  );
}

export default CreatePost;
