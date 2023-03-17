import { useNavigate } from "react-router-dom";

type Props = {
  type: "topics" | "groups";
};

function Explore({ type }: Props) {
  const navigate = useNavigate();
  const exploreClickHandler = () => {
    navigate("/" + type);
  };

  return (
    <div>
      <button onClick={exploreClickHandler}>Explore</button>
    </div>
  );
}

export default Explore;
