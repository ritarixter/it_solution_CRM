import { FC, useEffect, useState } from "react";
import styles from "./NotificationsPopup.module.scss";
import moment from "moment";
import "moment/locale/ru";
import { events } from "./constants";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getStep } from "../../services/slices/step";
import { TStep } from "../../types/TStep";
import { useNavigate } from "react-router";
import { TNotify } from "../../types/TNotify";

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
  const navigate = useNavigate();
  return (
    <div
      className={`${styles.popup__container} ${
        open && styles.popup__container_opened
      }`}
      onClick={() => setOpen(false)}
    >
      { notifications.slice(0,5).map((item) => (
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
              {moment(item.updatedAt, "YYYYMMDDhhmmss").fromNow()}
            </div>
          </div>

      ))}
      {/* <div className={styles.buttons}>
        <button className={styles.btnShow}>Показать всё</button>
      </div> */}
    </div>
  );
};
