import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import ProfileSettingsForm from "../ProfileSettingsForm/ProfileSettingsForm";
import { updateUser } from "../../redux/slices/userSlice";
import { TUser } from "../../types/user";

function ProfileSettings() {
  const dispatch = useDispatch<AppDispatch>();

  const handleFormData = (data: TUser) => {
    const updatedUserPut = {
      name: data.name,
      bio: data.bio,
      funFact: data.funFact,
      status: data.status,
      picture: data.picture,
    };
    dispatch(updateUser(updatedUserPut));
  };

  return (
    <div>
      <h1>User settings</h1>
      <ProfileSettingsForm handleData={handleFormData} />
    </div>
  );
}

export default ProfileSettings;
