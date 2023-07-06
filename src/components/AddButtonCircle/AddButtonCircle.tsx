import { FC } from "react";
import styles from "./AddButtonCircle.module.scss";

export const AddButtonCircle: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button className={styles.plus} onClick={onClick}>
      +
    </button>
  );
};
