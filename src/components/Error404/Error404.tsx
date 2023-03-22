import styles from "./error404.module.css";

function Error404() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.error}>
        <div>
          <p>Looks like we couldn't find the page you requested.</p>
          <p>Have an ice cream instead!</p>
        </div>
        <div className={styles.icecream}></div>
      </div>
    </div>
  );
}

export default Error404;
