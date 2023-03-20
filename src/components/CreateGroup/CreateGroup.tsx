import { TGroupFormData, TGroupPost } from "../../types/group";
import CreateGroupFrom from "../CreateGroupForm/CreateGroupForm";
import { groupApi } from "../../apis/groupApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function CreateGroup() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.details);
  const handleData = async (data: TGroupFormData) => {
    const groupToMake: TGroupPost = {
      name: data.name,
      description: data.description,
      color: data.color,
      isPrivate: data.isPrivate,
    };
    const groupRequest = groupApi.post.newGroup(groupToMake);
    const response = await fetch(groupRequest.uri, groupRequest.options);
    // const groupId = await response.json(); TODO fix backend to return id.
    // navigate(`/group/${groupId}`);
  };
  return (
    <>
      <div>CreateGroup</div>
      <CreateGroupFrom handleData={handleData} />
    </>
  );
}
export default CreateGroup;
