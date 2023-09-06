import { FC } from "react";
import styles from "./BlockButton.module.scss";

type TBlockButton = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  bigWidth?:boolean
};

export const BlockButton: FC<TBlockButton> = ({ text, onClick, disabled, bigWidth }) => {
  return (
    <button
      className={`${styles.button} ${bigWidth && styles.button_big}`}
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
