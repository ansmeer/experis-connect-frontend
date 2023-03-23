import styles from "./footer.module.css";

type Props = {
  text: string;
  clickHandler: () => void;
};

function Footer({ text, clickHandler }: Props) {
  return (
    <footer aria-label="more actions" className={styles.footer}>
      <div>
        <button onClick={clickHandler}>{text}</button>
      </div>
    </footer>
  );
}

export default Footer;
