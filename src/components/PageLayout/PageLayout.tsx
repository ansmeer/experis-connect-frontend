import { ReactNode } from "react";
import styles from "./pageLayout.module.css";

type Props = {
  children: ReactNode;
};

function PageLayout({ children }: Props) {
  return <div className={styles.page}>{children}</div>;
}

export default PageLayout;
