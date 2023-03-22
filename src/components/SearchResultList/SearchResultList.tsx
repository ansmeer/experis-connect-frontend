import { postApi } from "../../apis/postApi";
import { useQuery } from "react-query";
import { TPostWithReplies } from "../../types/post";
import Loading from "../Loading/Loading";
import PostList from "../PostList/PostList";

type Props = { search: string | null };

function SearchResultList({ search }: Props) {
  const { data, isLoading, isError } = useQuery<TPostWithReplies[]>({
    queryKey: ["search", search],
    queryFn: async () => {
      if (!search) return;
      const postRequest = postApi.get.searchPosts(search);
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
