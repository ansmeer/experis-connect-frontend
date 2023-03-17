import { TPost } from "../../types/post";
import PostListItem from "../PostListItem/PostListItem";
import styles from "./postList.module.css";

type Props = { data: TPost[] };

function PostList({ data }: Props) {
  const postList = data.map((post) => (
    <PostListItem data={post} key={post.id} />
  ));

  return <div className={styles["post-list"]}>{postList}</div>;
}

export default PostList;
