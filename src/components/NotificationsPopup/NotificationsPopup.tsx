import { FC } from "react";
import styles from "./NotificationsPopup.module.scss";
import moment from "moment";
import "moment/locale/ru";
import { events } from "./constants";

type TNotificationsPopup = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const NotificationsPopup: FC<TNotificationsPopup> = ({
  open,
  setOpen,
}) => {
  return (
    <div
      className={`${styles.popup__container} ${
        open && styles.popup__container_opened
      }`}
      onClick={() => setOpen(false)}
    >
      {events.map((event) => (
        <div key={event.id} className={styles.truncate}>
          {event.title}
          <div className={styles.dateFromNow}>
            {moment(event.createdAt, "YYYYMMDDhhmmss").fromNow()}
          </div>
        </div>
      ))}
      <div className={styles.buttons}>
        <button className={styles.btnShow}>Показать всё</button>
      </div>
    </div>
  );
};
