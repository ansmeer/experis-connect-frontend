import { useNavigate } from "react-router-dom";
import { TGroup } from "../../types/group";
import styles from "./groupCard.module.css";

type GroupCardProps = {
  data: TGroup;
  isMember: boolean;
};

function GroupCard({ data, isMember }: GroupCardProps) {
  const navigate = useNavigate();

  const handleVisitClick = () => {
    navigate(`/groups/${data.id}`);
  };

  return (
    <div className={styles.groupCard} role="button">
      <div>{data.name}</div>
      <div>Description: {data.description}</div>
      <div>Started: {data.createdAt}</div>
      <div>{data.isPrivate && "private group"}</div>
      {isMember && <div>you are a member</div>}
      <button onClick={handleVisitClick}>Visit group</button>
    </div>
  );
}

export default GroupCard;
