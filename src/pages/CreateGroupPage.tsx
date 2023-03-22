import { useEffect } from "react";
import CreateGroup from "../components/CreateGroup/CreateGroup";

function CreateGroupPage() {
  useEffect(() => {
    document.title = "Create group | Experis Connect";
  }, []);

  return <CreateGroup />;
}
export default CreateGroupPage;
