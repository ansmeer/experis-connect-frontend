import { useEffect } from "react";
import Error404 from "../components/Error404/Error404";

function Error404Page() {
  useEffect(() => {
    document.title = "Not found | Experis Connect";
  }, []);

  return <Error404 />;
}

export default Error404Page;
