import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { topicApi } from "../../apis/topicApi";
import { RootState } from "../../redux/store";
import { TTopic } from "../../types/topic";
import ErrorFetch from "../ErrorFetch/ErrorFetch";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import TopicCard from "../TopicCard/TopicCard";
import styles from "./topicList.module.css";

function TopicList() {
  const navigate = useNavigate();
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

  const handleCreateClick = () => {
    navigate("/create/topic");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorFetch text="Could not load topic list." />;
  }

  return (
    <>
      <main>
        <h1>All topics</h1>
        <div className={styles.topicList}>{topicList}</div>
      </main>
      <Footer text="Create topic" clickHandler={handleCreateClick} />
    </>
  );
}

export default TopicList;
