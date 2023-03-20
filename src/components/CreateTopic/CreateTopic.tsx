import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { topicApi } from "../../apis/topicApi";
import { RootState } from "../../redux/store";
import { TTopicPost } from "../../types/topic";
import keycloak from "../../utils/keycloak";
import CreateTopicForm from "../CreateTopicForm/CreateTopicForm";

function CreateTopic() {
  const navigate = useNavigate();
  console.log(keycloak.token);

  const handleData = async (data: TTopicPost) => {
    const topicToSend: TTopicPost = {
      name: data.name,
      color: data.color,
      description: data.description,
    };

    const postRequest = topicApi.post.newTopic(topicToSend);
    const response = await fetch(postRequest.uri, postRequest.options);
    //const postId = await response.json();
    //navigate(`/thread/${postId}`);
  };

  return (
    <>
      <div>Create Topic</div>
      <CreateTopicForm handleData={handleData} />
    </>
  );
}
export default CreateTopic;
