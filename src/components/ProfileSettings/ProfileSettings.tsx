import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import ProfileSettingsForm from "../ProfileSettingsForm/ProfileSettingsForm";
import { refetchUser, updateUser } from "../../redux/slices/userSlice";
import { TUser } from "../../types/user";
import { useNavigate } from "react-router-dom";

function ProfileSettings() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleFormData = (data: TUser) => {
    const updatedUserPut = {
      name: data.name,
      bio: data.bio,
      funFact: data.funFact,
      status: data.status,
      picture: data.picture,
    };
    dispatch(updateUser(updatedUserPut));
    dispatch(refetchUser());
    navigate("/profile");
  };

  return (
    <main>
      <h1>Profile settings</h1>
      <ProfileSettingsForm handleData={handleFormData} />
    </main>
  );
}

export default ProfileSettings;
