import { useEffect } from "react";
import Profile from "../components/Profile/Profile";

function ProfilePage() {
  useEffect(() => {
    document.title = "Profile | Experis Connect";
  }, []);

  return <Profile />;
}

export default ProfilePage;
