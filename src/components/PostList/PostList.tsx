import { useEffect, useState } from "react";
import { TPost } from "../../types/post";
import InfiniteScroll from "react-infinite-scroll-component";
import PostListItem from "../PostListItem/PostListItem";
import styles from "./postList.module.css";
import Loading from "../Loading/Loading";

type Props = {
  initialData: TPost[];
  fetchData: (offset: number) => Promise<TPost[]>;
};

function PostList({ initialData, fetchData }: Props) {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPosts(initialData);
  }, [initialData]);

  const loadMore = async (): Promise<TPost[]> => {
    const newPosts = await fetchData(posts.length);
    if (newPosts.length === 0) {
      setHasMore(false);
      return posts;
    }
    const allPosts = [...posts, ...newPosts];
    setPosts(allPosts);
    return allPosts;
  };

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<Loading />}
      endMessage={<div>Yay! You have seen it all.</div>}>
      {posts.map((post) => (
        <PostListItem data={post} key={post.id} />
      ))}
    </InfiniteScroll>
  );
}

export default PostList;
