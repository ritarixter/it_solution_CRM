import { FC } from "react";
import styles from "./Preloader.module.scss";

export const Preloader: FC = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.preloader__container}>
        <span className={styles.preloader__round}></span>
      </div>
    </div>
  );
};
