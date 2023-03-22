import { useEffect } from "react";
import CreateTopic from "../components/CreateTopic/CreateTopic";

function CreateTopicPage() {
  useEffect(() => {
    document.title = "Create topic | Experis Connect";
  }, []);

  return <CreateTopic />;
}

export default CreateTopicPage;
