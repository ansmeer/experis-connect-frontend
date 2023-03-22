import { Link } from "react-router-dom";
import { TGroup } from "../../types/group";
import styles from "./groupCard.module.css";
import { groupApi } from "../../apis/groupApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { refetchUser } from "../../redux/slices/userSlice";

type GroupCardProps = {
  data: TGroup;
  isMember: boolean;
};

function GroupCard({ data, isMember }: GroupCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleJoinClick = async () => {
    const joinRequest = groupApi.post.addCurrentUserToGroup(data.id);
    await fetch(joinRequest.uri, joinRequest.options);
    dispatch(refetchUser());
  };

  const handleLeaveClick = async () => {
    const joinRequest = groupApi.put.removeCurrentUserFromGroup(data.id);
    await fetch(joinRequest.uri, joinRequest.options);
    dispatch(refetchUser());
  };

  return (
    <section className={styles.groupCard}>
      <header className={styles.header}>
        <h2>
          <Link to={`/groups/${data.id}`}>
            {data.name}
            {/* // TODO icon lock */}
            {data.private && " (private group)"}
          </Link>
        </h2>
        <p>Founded {}</p>
        {/* TODO insert date here */}
      </header>

      <div>{data.description}</div>

      <footer>
        <Link to={`/groups/${data.id}`}>Visit</Link>
        {isMember && <button onClick={handleLeaveClick}>Leave</button>}
        {!isMember && !data.private && (
          <button onClick={handleJoinClick}>Join</button>
        )}
      </footer>
    </section>
  );
}

export default GroupCard;
