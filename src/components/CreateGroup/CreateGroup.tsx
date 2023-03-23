import { TGroupPost } from "../../types/group";
import CreateGroupFrom from "../CreateGroupForm/CreateGroupForm";
import { groupApi } from "../../apis/groupApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./createGroup.module.css";

function CreateGroup() {
  const navigate = useNavigate();

  const handleGroupData = async (data: TGroupPost) => {
    const groupToMake: TGroupPost = {
      name: data.name,
      description: data.description,
      color: data.color,
      private: data.private,
    };
    const groupRequest = groupApi.post.newGroup(groupToMake);
    const response = await fetch(groupRequest.uri, groupRequest.options);
    const groupId = await response.json();
    navigate(`/groups/${groupId}`);
  };

  const handleTopicClick = () => {
    navigate("/create/topic");
  };

  return (
    <>
      <h1>Create new group</h1>
      <main className={styles.create}>
        <div className={styles["top-menu"]}>
          <nav aria-label="create type">
            <button className={styles.selected}>Group</button>
            <button onClick={handleTopicClick}>Topic</button>
          </nav>
        </div>
        <CreateGroupFrom handleData={handleGroupData} />
      </main>
    </>
  );
}
export default CreateGroup;
