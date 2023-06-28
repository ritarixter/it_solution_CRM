import { FC } from "react";
import styles from "./BlockComments.module.scss";

export const BlockComments: FC = () => {
  return (
    <div className={styles.comments}>
      <p className={styles.caption}>Комментарий</p>
      <textarea className={styles.comment_text} />
    </div>
  );
};
