import { useSearchParams } from "react-router-dom";
import { postApi } from "../../apis/postApi";
import { useQuery } from "react-query";
import { TPostWithReplies } from "../../types/post";
import Loading from "../Loading/Loading";
import PostList from "../PostList/PostList";

function SearchResultList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlParam = searchParams.get("search");

  const { data, isLoading, isError } = useQuery<TPostWithReplies[]>({
    queryKey: ["search", urlParam],
    queryFn: async () => {
      if (!urlParam) return;
      const postRequest = postApi.get.searchPosts(urlParam);
      const response = await fetch(postRequest.uri, postRequest.options);
      return await response.json();
    },
  });

  const hasResults = Boolean(data?.length);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div>Search results for: "{urlParam}"</div>
      {isError && <div>Could not fetch search results</div>}
      {hasResults && data ? (
        <PostList data={data} />
      ) : (
        <div>No results found</div>
      )}
    </>
  );
}

export default SearchResultList;
