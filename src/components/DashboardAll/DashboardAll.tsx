import { useQuery } from "react-query";
import { postApi } from "../../apis/postApi";
import Loading from "../Loading/Loading";

function DashboardAll() {
  const { data, isLoading, isError } = useQuery({
    queryKey: "dashboard-groups",
    queryFn: async () => {
      const postRequest = postApi.get.posts();
      const response = await fetch(postRequest.uri, postRequest.options);
      // TODO backend: filter posts based on target type
      // TODO backend: filter for top level posts
      return await response.json();
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Could not load feed.</div>;
  }

  return (
    <div>
      {data
        ?.filter((post) => post.replyParentId === 0)
        .map((post) => (
          <div>post</div>
        ))}
    </div>
  );
}

export default DashboardAll;
