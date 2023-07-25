import { FC } from "react";
import styles from "./BlockButton.module.scss";

type TBlockButton = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};

export const BlockButton: FC<TBlockButton> = ({ text, onClick, disabled }) => {
  return (
    <button
      className={styles.button}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
