import { useEffect } from "react";
import ProfileSettings from "../components/ProfileSettings/ProfileSettings";

function ProfileSettingsPage() {
  useEffect(() => {
    document.title = "Profile settings | Experis Connect";
  }, []);

  return <ProfileSettings />;
}

export default ProfileSettingsPage;
