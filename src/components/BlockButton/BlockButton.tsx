import { FC } from "react";
import styles from "./BlockButton.module.scss";
import { useNavigate } from "react-router";

type TBlockButton = {
  text: string;
};

export const BlockButton: FC<TBlockButton> = ({ text }) => {
  const navigate = useNavigate();

  const handleClickButton = () => {
    console.log("click");
  };

  return (
    <div className={styles.buttonBlock}>
      <button className={styles.button} onClick={handleClickButton}>
        {text}
      </button>
      <p className={styles.caption} onClick={() => navigate("/analytics")}>
        Отменить
      </p>
    </div>
  );
};
