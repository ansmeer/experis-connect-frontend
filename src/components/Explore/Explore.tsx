import { useNavigate } from "react-router-dom";
import styles from "./explore.module.css";

type Props = {
  type: "topics" | "groups";
};

function Explore({ type }: Props) {
  const navigate = useNavigate();
  const exploreClickHandler = () => {
    navigate("/" + type);
  };

  return (
    <div className={styles.explore}>
      <div>
        <button onClick={exploreClickHandler}>Explore</button>
      </div>
    </div>
  );
}

export default Explore;
