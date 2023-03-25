import SentimentVeryDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentVeryDissatisfiedOutlined";
import styles from "./errorFetch.module.css";

type Props = {
  text: string;
};

function ErrorFetch({ text }: Props) {
  return (
    <div className={styles["error-fetch"]}>
      <SentimentVeryDissatisfiedOutlinedIcon />
      <div>{text}</div>
    </div>
  );
}

export default ErrorFetch;
