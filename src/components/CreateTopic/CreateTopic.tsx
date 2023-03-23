import { useNavigate } from "react-router-dom";
import { topicApi } from "../../apis/topicApi";
import { TTopicPost } from "../../types/topic";
import CreateTopicForm from "../CreateTopicForm/CreateTopicForm";
import styles from "./createTopic.module.css";

function CreateTopic() {
  const navigate = useNavigate();

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
    <>
      <h1>Create new topic</h1>
      <main className={styles.create}>
        <div className={styles["top-menu"]}>
          <nav aria-label="create type">
            <button onClick={handleGroupClick}>Group</button>
            <button className={styles.selected}>Topic</button>
          </nav>
        </div>
        <CreateTopicForm handleData={handleData} />
      </main>
    </>
  );
}
export default CreateTopic;
