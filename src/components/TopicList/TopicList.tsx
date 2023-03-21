import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { topicApi } from "../../apis/topicApi";
import { RootState } from "../../redux/store";
import { TTopic } from "../../types/topic";
import Loading from "../Loading/Loading";
import TopicCard from "../TopicCard/TopicCard";
import styles from "./topicList.module.css";

function TopicList() {
  const user = useSelector((state: RootState) => state.user.details);
  const { data, isLoading, isError } = useQuery({
    queryKey: "topicList",
    queryFn: async (): Promise<TTopic[]> => {
      const topicRequest = topicApi.get.topics();
      const response = await fetch(topicRequest.uri, topicRequest.options);
      return await response.json();
    },
  });

  const topicList = data?.map((topic) => (
    <TopicCard
      key={topic.id}
      data={topic}
      isMember={user?.topics.includes(topic.id) || false}
    />
  ));

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Could not load topic list.</div>;
  }

  return (
    <>
      <h1>Topics</h1>
      <div className={styles.topicList}>{topicList}</div>
    </>
  );
}

export default TopicList;
