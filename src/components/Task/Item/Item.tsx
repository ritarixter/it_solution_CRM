import { FC, useState } from "react";
import styles from "./Item.module.scss";
import { TData } from "../Task";
import dangerIcon from "../../../images/icons/danger.svg";
import doneIcon from "../../../images/icons/done.svg";
import deleteIcon from "../../../images/icons/delete.svg";
import editIcon from "../../../images/icons/edit.svg";
import { formateDate } from "../../../utils/utils";

export const Item: FC<TData> = ({ status, endDate, title, id, done }) => {
    const [checked, setChecked] = useState<boolean>(done)
  return (
    <li
      key={id}
      className={`${styles.task__item} ${ !checked ? 
        status === "Срочно" && styles.express : styles.done
      }`}
    >
      <div className={styles.task__header}>
        <img
          src={status === "Срочно" ? dangerIcon : doneIcon}
          alt="Иконка предупреждения"
        />
        <h3
          className={`${styles.task__title} ${ 
            status === "Срочно" && styles.express 
          }`}
        >
          {status === "Срочно" ? "Срочные" : "Несрочные"}
        </h3>
      </div>
      <div className={styles.task__content}>
        <div className={styles.task__subheader}>
          <input type="checkbox" className={styles.task__checkbox} checked={checked} onChange={()=>{setChecked(!checked)}}/>
          <p className={`${styles.task__subtitle} ${checked && styles.done}`}>{title}</p>
        </div>
        <div className={styles.task__icons}>
          <button className={`${styles.button} ${styles.delete}`}>
            <img
              src={deleteIcon}
              className={styles.task__icon}
              alt="Кнопка удаления"
            />
          </button>

          <button className={`${styles.button} ${styles.edit}`}>
            <img
              src={editIcon}
              className={styles.task__icon}
              alt="Кнопка редактирования"
            />
          </button>
        </div>
      </div>
      <time className={styles.task__time} dateTime={formateDate(endDate)}>
        {formateDate(endDate)}
      </time>
    </li>
  );
};
