import { FC, useEffect, useState } from "react";
import styles from "./NotificationsBlock.module.scss";
import arrow from "../../images/icons/arrow_down.svg";
import { NotificationsPopup } from "../NotificationsPopup/NotificationsPopup";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getUser } from "../../services/slices/user";

export const NotificationsBlock: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.box} ${open && styles.box_open}`}
        onClick={() => { 
          if(user.notifications.length != 0)
          setOpen(!open);
        }}
      >
        <p className={styles.box_text}>{user.notifications.length != 0 ? user.notifications[0].message : "Уведомлений нет"}</p>
        <img
          src={arrow}
          alt="Стрелка"
          className={`${styles.arrow} ${open && styles.open}`}
        />
      </div>
      {(user.notifications.length != 0 && open) && (
        <NotificationsPopup
          notifications={user.notifications ? user.notifications : []}
          open={open}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};
