import { FC, useEffect, useState } from "react";
import styles from "./NotificationsPopup.module.scss";
import moment from "moment";
import "moment/locale/ru";
import { useNavigate } from "react-router";
import { TNotify } from "../../types/TNotify";
import { useAppSelector } from "../../services/hooks";

type TNotificationsPopup = {
  open: boolean;
  setOpen: (value: boolean) => void;
  notifications: TNotify[];
};

export const NotificationsPopup: FC<TNotificationsPopup> = ({
  open,
  setOpen,
  notifications,
}) => {
  const [notificationsData, setNotificationsData] = useState<TNotify[]>([]);
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    const arr = [...notifications];
    setNotificationsData(arr);
  }, [notifications, user]);
  const navigate = useNavigate();
  return (
    <div
      className={`${styles.popup__container} ${
        open && styles.popup__container_opened
      }`}
      onClick={() => setOpen(false)}
    >
      {notificationsData.slice(0, 5).map((item) => (
        <div
          key={item.id}
          className={styles.truncate}
          onClick={() => {
            navigate(`/applications/${item.list.id}`);
          }}
        >
          <span className={styles.new}>Новое</span>
          {item.message}
          <div className={styles.dateFromNow}>
            {moment(item.updatedAt, "YYYYMMDDhhmmss")
              .subtract(-3, "hours")
              .fromNow()}
          </div>
        </div>
      ))}
      {/* <div className={styles.buttons}>
        <button className={styles.btnShow}>Показать всё</button>
      </div> */}
    </div>
  );
};
