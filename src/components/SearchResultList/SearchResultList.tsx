import { postApi } from "../../apis/postApi";
import { useQuery } from "react-query";
import { TPost, TPostWithReplies } from "../../types/post";
import Loading from "../Loading/Loading";
import PostList from "../PostList/PostList";
import ErrorFetch from "../ErrorFetch/ErrorFetch";

type Props = { search: string | null };

function SearchResultList({ search }: Props) {
  const { data, isLoading, isError } = useQuery<TPostWithReplies[]>({
    queryKey: ["search", search],
    queryFn: async () => {
      if (!search) return;
      const postRequest = postApi.get.searchPostsByPage(search, 7, 0);
      const response = await fetch(postRequest.uri, postRequest.options);
      return await response.json();
    },
  });

  const getMorePosts = async (offset: number): Promise<TPost[]> => {
    if (!search) return [];
    const postRequest = postApi.get.searchPostsByPage(search, 5, offset);
    const response = await fetch(postRequest.uri, postRequest.options);
    return await response.json();
  };

  const hasResults = Boolean(data?.length);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorFetch text="Could not fetch search results." />;
  }

  return (
    <>
      {hasResults && data ? (
        <PostList initialData={data} fetchData={getMorePosts} />
      ) : (
        <div>No results found.</div>
      )}
    </>
  );
}

export default SearchResultList;
