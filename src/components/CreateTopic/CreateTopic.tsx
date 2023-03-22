import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { topicApi } from "../../apis/topicApi";
import { RootState } from "../../redux/store";
import { TTopicPost } from "../../types/topic";
import keycloak from "../../utils/keycloak";
import CreateTopicForm from "../CreateTopicForm/CreateTopicForm";
import styles from "./createTopic.module.css";

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

  const handleGroupClick = () => {
    navigate("/create/group");
  };

  return (
    <div>
      <h1>Create new topic</h1>
      <div className={styles.divMain}>
        <div className={styles["top-menu"]}>
          <div>
            <button onClick={handleGroupClick}>Group</button>
            <button className={styles.selected}>Topic</button>
          </div>
        </div>
        <CreateTopicForm handleData={handleData} />
      </div>
    </div>
  );
}
export default CreateTopic;
