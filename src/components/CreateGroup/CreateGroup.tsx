import { TGroupPost } from "../../types/group";
import CreateGroupFrom from "../CreateGroupForm/CreateGroupForm";
import { groupApi } from "../../apis/groupApi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./createGroup.module.css";
import { useState } from "react";
import { TTopicPost } from "../../types/topic";
import { topicApi } from "../../apis/topicApi";

function CreateGroup() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<string>("GROUP");
  const user = useSelector((state: RootState) => state.user.details);
  const handleGroupData = async (data: TGroupPost) => {
    const groupToMake: TGroupPost = {
      name: data.name,
      description: data.description,
      color: data.color,
      private: data.private,
    };
    const groupRequest = groupApi.post.newGroup(groupToMake);
    const response = await fetch(groupRequest.uri, groupRequest.options);
    // const groupId = await response.json(); TODO fix backend to return id.
    // navigate(`/group/${groupId}`);
  };

  const handleTopicClick = () => {
    navigate("/create/topic");
  };

  return (
    <div>
      <h1>Create new group</h1>
      <div className={styles.mainDiv}>
        <div className={styles["top-menu"]}>
          <div>
            <button className={styles.selected}>Group</button>
            <button onClick={handleTopicClick}>Topic</button>
          </div>
        </div>
        <CreateGroupFrom handleData={handleGroupData} />
      </div>
    </div>
  );
}
export default CreateGroup;
