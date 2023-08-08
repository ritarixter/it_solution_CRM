import { FC } from "react";
import styles from "./ButtonCircle.module.scss";

export const ButtonCircle: FC<{
  onClick: () => void;
  content?: any;
  disabled?: boolean;
}> = ({ onClick, content = "+", disabled }) => {
  return (
    <button
      disabled={disabled}
      className={styles.plus}
      onClick={onClick}
      type="button"
    >
      {content}
    </button>
  );
};
