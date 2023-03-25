import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { topicApi } from "../../apis/topicApi";
import { refetchUser } from "../../redux/slices/userSlice";
import { AppDispatch } from "../../redux/store";
import { TTopic } from "../../types/topic";
import styles from "./topicListItem.module.css";

type Props = {
  data: TTopic;
  isMember: boolean;
};

function TopicListItem({ data, isMember }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubscribeClick = async () => {
    const subscribeRequest = topicApi.post.addCurrentUserToTopic(data.id);
    await fetch(subscribeRequest.uri, subscribeRequest.options);
    dispatch(refetchUser());
  };

  const handleUnsubscribeClick = async () => {
    const unsubscribeRequest = topicApi.put.removeCurrentUserFromTopic(data.id);
    await fetch(unsubscribeRequest.uri, unsubscribeRequest.options);
    dispatch(refetchUser());
  };

  return (
    <section className={styles.topicCard}>
      <header className={styles.header}>
        <h2 className={styles.topic}>
          <Link to={`/topics/${data.id}`}>{data.name}</Link>
        </h2>
      </header>

      <div>{data.description}</div>

      <footer>
        <Link to={`/topics/${data.id}`}>Visit</Link>
        {isMember && (
          <button onClick={handleUnsubscribeClick} className="light">
            Unsubscribe
          </button>
        )}
        {!isMember && <button onClick={handleSubscribeClick}>Subscribe</button>}
      </footer>
    </section>
  );
}

export default TopicListItem;
