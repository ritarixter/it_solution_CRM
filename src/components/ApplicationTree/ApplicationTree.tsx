import { FC } from "react";
import styles from "./ApplicationTree.module.scss";
import { Scheme } from "./Scheme/Scheme";

export const ApplicationTree: FC = () => {
  return (
    <div className={styles.applicationTree}>
      <div className={styles.rightBlock}>
        <Scheme />
      </div>
    </div>
  );
};
