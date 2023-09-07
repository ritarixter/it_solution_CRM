import { FC } from "react";
import styles from "./BlockButton.module.scss";

type TBlockButton = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  bigWidth?:boolean;
  style?: boolean
};

export const BlockButton: FC<TBlockButton> = ({ text, onClick, disabled, bigWidth, style }) => {
  return (
    <button
      className={`${styles.button} ${bigWidth && styles.button_big} ${style && styles.button_style}`}
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
