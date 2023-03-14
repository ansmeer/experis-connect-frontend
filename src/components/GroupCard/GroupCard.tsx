import { useNavigate } from "react-router-dom";
import { TGroup } from "../../types/group";
import styles from "./groupCard.module.css";

type GroupCardProps = {
  data: TGroup;
};

function GroupCard({ data }: GroupCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/groups/${data.id}`);
  };

  return (
    <div className={styles.groupCard} onClick={handleCardClick} role="button">
      <div>{data.name}</div>
      <div>Description: {data.description}</div>
      <div>Started: {data.createdAt}</div>
    </div>
  );
}

export default GroupCard;
