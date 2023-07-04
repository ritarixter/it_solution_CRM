import { FC, useState } from "react";
import styles from "./Item.module.scss";
import dangerIcon from "../../../images/icons/danger.svg";
import doneIcon from "../../../images/icons/done.svg";
import deleteIcon from "../../../images/icons/delete.svg";
import editIcon from "../../../images/icons/edit.svg";
import { formateDate } from "../../../utils/utils-date";
import { TTask } from "../../../types";
import { v4 as uuidv4 } from "uuid";
import { PopupAddTask } from "../../PopupAddTask/PopupAddTask";
import { useAppDispatch } from "../../../services/hooks";
import { updateTask } from "../../../services/slices/task";
interface IItem {
  task: TTask;
  handleDelete: (id: number) => void;
  changeCheckedHandle: (id: number, checked: boolean) => void;
}

export const Item: FC<IItem> = ({
  task,
  handleDelete,
  changeCheckedHandle,
}) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const dispatch = useAppDispatch();
  const update = (
    name?: string,
    description?: string,
    time?: string,
    status?: string,
    id?: number
  ) => {
    let resultDate;
    if (time) {
      resultDate = new Date();
      const times = time?.split(":");
      resultDate.setHours(Number(times![0]), Number(times![1]), 0, 0);
    } else {
      resultDate = task.endDate;
    }

    dispatch(updateTask(id, task.done, status, resultDate, name, description)); //task.done - костыль и ДАТА КОЛЛИЗИЯ (-3 часа при обновлении)
    setPopupOpen(false);
  };
  return (
    <li
      key={task.id}
      className={`${styles.task__item} ${
        !task.done ? task.status === "Срочно" && styles.express : styles.done
      }`}
    >
      <div className={styles.task__header}>
        <img
          src={task.status === "Срочно" ? dangerIcon : doneIcon}
          alt="Иконка предупреждения"
        />
        <h3
          className={`${styles.task__title} ${
            task.status === "Срочно" && styles.express
          }`}
        >
          {task.status === "Срочно" ? "Срочные" : "Несрочные"}
        </h3>
      </div>
      <div className={styles.task__content}>
        <div className={styles.task__subheader}>
          <input
            type="checkbox"
            className={styles.task__checkbox}
            checked={task.done}
            onChange={() => {
              changeCheckedHandle(task.id, !task.done);
            }}
          />
          <p className={`${styles.task__subtitle} ${task.done && styles.done}`}>
            {task.title}
          </p>
        </div>
        <div className={styles.task__icons}>
          <button className={`${styles.button} ${styles.delete}`}>
            <img
              src={deleteIcon}
              className={styles.task__icon}
              alt="Кнопка удаления"
              onClick={() => handleDelete(task.id)}
            />
          </button>

          <button
            className={`${styles.button} ${styles.edit}`}
            onClick={() => setPopupOpen(!isPopupOpen)}
          >
            <img
              src={editIcon}
              className={styles.task__icon}
              alt="Кнопка редактирования"
            />
          </button>
        </div>
      </div>
      {task.description && (
        <p className={styles.description}>{task.description}</p>
      )}
      <time className={styles.task__time} dateTime={formateDate(task.endDate)}>
        {formateDate(task.endDate)}
      </time>
      <PopupAddTask
        title={task.title}
        isOpen={isPopupOpen}
        setOpen={setPopupOpen}
        onClick={update}
        task={task}
        titleButton={"Изменить задачу"}
      />
    </li>
  );
};
