import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import ProfileSettingsForm from "../ProfileSettingsForm/ProfileSettingsForm";
import { updateUser } from "../../redux/slices/userSlice";
import { TUser } from "../../types/user";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";

function ProfileSettings() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const handleFormData = (data: TUser) => {
    const updatedUserPut = {
      name: data.name,
      bio: data.bio,
      funFact: data.funFact,
      status: data.status,
      picture: data.picture,
    };
    dispatch(updateUser(updatedUserPut));
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      navigate("/profile");
    }, 500);
  };

  return (
    <main>
      <h1>Profile settings</h1>
      <ProfileSettingsForm handleData={handleFormData} />
      <Dialog open={isSaving} PaperProps={{ sx: { padding: "8px" } }}>
        Saving profile...
      </Dialog>
    </main>
  );
}

export default ProfileSettings;
