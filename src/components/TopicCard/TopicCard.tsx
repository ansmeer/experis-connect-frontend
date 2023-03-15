import { useNavigate } from "react-router-dom";
import { TTopic } from "../../types/topic";
import styles from "./topicCard.module.css";

type TopicCardProps = {
  data: TTopic;
  isMember: boolean;
};

function TopicCard({ data, isMember }: TopicCardProps) {
  const navigate = useNavigate();

  const handleVisitClick = () => {
    navigate(`/topics/${data.id}`);
  };

  return (
    <div className={styles.topicCard}>
      <div>{data.name}</div>
      <div>Description: {data.description}</div>
      <div>Started: {data.createdAt}</div>
      {isMember && <div>you are following this topic</div>}
      <button onClick={handleVisitClick}>Visit topic</button>
    </div>
  );
}

export default TopicCard;
