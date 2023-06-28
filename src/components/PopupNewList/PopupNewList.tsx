import { FC } from "react";
import styles from "./PopupNewList.module.scss";

export const PopupNewList: FC = () => {
  return (
    <div className={styles.popup}>
      <div className={styles.conteiner}>
        <h2 className={styles.conteiner_title}>Новая заявка</h2>
        <form className={styles.conteiner_form}></form>
      </div>
    </div>
  );
};
