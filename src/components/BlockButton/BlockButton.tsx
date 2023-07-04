import { FC } from "react";
import styles from "./BlockButton.module.scss";

type TBlockButton = {
  text: string;
  onClick: () => void;
};

export const BlockButton: FC<TBlockButton> = ({ text, onClick }) => {
  const handleClickButton = () => {
    console.log("click");
  };

  return (
    <div className={styles.buttonBlock}>
      <button className={styles.button} onClick={handleClickButton}>
        {text}
      </button>
      <p className={styles.caption} onClick={onClick}>
        Отменить
      </p>
    </div>
  );
};
