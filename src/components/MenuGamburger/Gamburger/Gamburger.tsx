import { FC } from "react";
import styles from "../MenuGamburger.module.scss";

type TGamburger = {
  open?: boolean;
};

export const Gamburger: FC<TGamburger> = ({ open, }) => {
  return (
    <div className={styles.menuClick}>
      <span
        className={`${styles.line1} ${
          open ? styles.line1_active : styles.line1_NoActive
        }`}
      ></span>
      <span
        className={`${styles.line2} ${
          open ? styles.line2_active : styles.line2_NoActive
        }`}
      ></span>
      <span
        className={`${styles.line3} ${
          open ? styles.line3_active : styles.line3_NoActive
        }`}
      ></span>
    </div>
  );
};
