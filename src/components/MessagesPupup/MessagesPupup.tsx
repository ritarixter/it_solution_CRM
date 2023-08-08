import { FC } from "react";
import styles from "./MessagesPupup.module.scss";
import moment from "moment";
import "moment/locale/ru";
import { users } from "./constants";

type TMessagesPopup = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const MessagesPopup: FC<TMessagesPopup> = ({ open, setOpen }) => {
  return (
    <div
      className={`${styles.popup__container} ${
        open && styles.popup__container_opened
      }`}
      onClick={() => setOpen(false)}
    >
      <div className={styles.messageArea}>
        {users.map((user) => (
          <div className={styles.truncate} key={user.id}>
            От {user.name} об объекте бла бла бла ля ля тапаля на Чпоколова
            <div className={styles.dateFromNow}>
              <strong>{user.login} </strong>{" "}
              {moment(user.date, "YYYYMMDDhhmmss").fromNow()}
            </div>
          </div>
        ))}
        <div className={styles.truncate}>
          23 января 2019 года на глобальную тему Хомячков
          <div className={styles.dateFromNow}>
            <strong>Dan </strong>{" "}
            {moment("2023-06-28 00:41:38", "YYYYMMDDhhmmss").fromNow()}
          </div>
        </div>
        <div className={styles.truncate}>
          Сообщение от 12 декабря от главного штаба Хомячков
          <div className={styles.dateFromNow}>
            <strong>Raw </strong>{" "}
            {moment("2023-06-27 06:41:38", "YYYYMMDDhhmmss").fromNow()}
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.btnShow}>Показать всё</button>
        <button className={styles.btnNewMessage}>Начать новую переписку</button>
      </div>
    </div>
  );
};
