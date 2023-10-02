import { FC, useState } from "react";
import styles from "./NotificationsBlock.module.scss";
import arrow from "../../images/icons/arrow_white.svg";
import { NotificationsPopup } from "../NotificationsPopup/NotificationsPopup";

export const NotificationsBlock: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <div
        className={`${styles.box} ${open && styles.box_open}`}
        onClick={() => {
          setOpen(true);
        }}
      >
        <p className={styles.box_text}>Важные сообщения о дедлайне</p>
        <img
          src={arrow}
          alt="Стрелка"
          className={`${styles.arrow} ${open && styles.open}`}
        />
      </div>
      {open && (
        <div className={styles.popup}>
          <NotificationsPopup open={open} setOpen={setOpen} />
        </div>
      )}
    </div>
  );
};
