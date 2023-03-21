import styles from "./footer.module.css";

type Props = {
  text: string;
  clickHandler: () => void;
};

function Footer({ text, clickHandler }: Props) {
  return (
    <div className={styles.footer}>
      <div>
        <button onClick={clickHandler}>{text}</button>
      </div>
    </div>
  );
}

export default Footer;
