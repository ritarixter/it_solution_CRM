import { FC } from "react";
import styles from "./PopupAddTask.module.scss";
import { BlockButton } from "../BlockButton/BlockButton";
import "moment/locale/ru";
import moment from "moment";

type TPopupAddTask = {
  title?: string;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const PopupAddTask: FC<TPopupAddTask> = ({ title, isOpen, setOpen }) => {
  const formatDate = () => {
    var now = moment();
    return now.format("dd DD MMMM");
  };

  return (
    <div className={`${styles.popup} ${isOpen && styles.popup_opened}`}>
      <div className={styles.popup_conteiner}>
        <div className={styles.containerTitle}>
          <h3 className={styles.popup_title}>{title}</h3>
          <p className={styles.popup_text}>{formatDate()}</p>
        </div>
        <div className={styles.create_task}>
          <input className={styles.inputTitle} placeholder="Название" />
          <textarea className={styles.description} placeholder="Описание" />
          <div className={styles.block}>
            <input className={styles.inputDate} type="date" />
            <select className={styles.dropdown} name="priority">
              <option value="Срочно" className={styles.dropdown_red}>
                Срочно
              </option>
              <option value="Несрочно" className={styles.dropdown_green}>
                Несрочно
              </option>
            </select>
          </div>
        </div>
        <BlockButton text={"Добавить задачу"} onClick={() => setOpen(false)} />
      </div>
    </div>
  );
};
