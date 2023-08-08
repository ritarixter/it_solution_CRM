import { FC, useState } from "react";
import styles from "./HeaderTop.module.scss";
import { Search } from "../Search/Search";
import message from "../../images/icons/message.svg";
import bell from "../../images/icons/bell.svg";
import notice from "../../images/icons/notice.svg";
import { UserBlock } from "../UserBlock/UserBlock";
import arrow from "../../images/icons/arrow.svg";
import { useAppSelector } from "../../services/hooks";
import { ProfileWindowPopup } from "../ProfileWindowPopup/ProfileWindowPopup";
import { MessagesPopup } from "../MessagesPupup/MessagesPupup";
import { NotificationsPopup } from "../NotificationsPopup/NotificationsPopup";
import { NotificationsBlock } from "../NotificationsBlock/NotificationsBlock";

export const HeaderTop: FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState<boolean>(false);
  const [openMessages, setIsOpenMessages] = useState<boolean>(false);
  const [openNotification, setIsOpenNotification] = useState<boolean>(false);
  return (
    <div className={styles.block}>
      <div className={styles.block_help}>
        <Search />
        <NotificationsBlock />
      </div>
      {user ? (
        <div className={styles.block_users}>
          <div
            className={styles.block_icon}
            onClick={() => {
              setIsOpenMessages(!openMessages);
            }}
          >
            <img src={message} alt="Сообщение" className={styles.message} />
            <img
              src={notice}
              alt="Кол-во сообщений"
              className={styles.notice}
            />
            <MessagesPopup open={openMessages} setOpen={setIsOpenMessages} />
          </div>
          <div className={styles.popup_notification}>
            <img
              src={bell}
              alt="Уведомление"
              className={styles.bell}
              onClick={() => {
                setIsOpenNotification(!openNotification);
              }}
            />
            <NotificationsPopup
              open={openNotification}
              setOpen={setIsOpenNotification}
            />
          </div>
          <div
            className={styles.users}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <UserBlock name={user.name} avatar={user.avatar} fullName={true} />
            <img
              src={arrow}
              alt="Стрелка"
              className={`${styles.arrow} ${open && styles.open}`}
            />
            <ProfileWindowPopup open={open} setOpen={setOpen} />
          </div>
        </div>
      ) : (
        <span>Загрузка...</span>
      )}
    </div>
  );
};
