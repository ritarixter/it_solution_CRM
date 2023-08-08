import { FC } from "react";
import styles from "./PreloaderBlock.module.scss";

export const PreloaderBlock: FC = () => {
  return <div className={styles.loader}></div>;
};
