import { FC, useState } from "react";
import styles from "./HeaderTop.module.scss";
import { Search } from "../Search/Search";
import bell from "../../images/icons/bell.svg";
import notice from "../../images/icons/notice.svg";
import { UserBlock } from "../UserBlock/UserBlock";
import arrow from "../../images/icons/arrow.svg";
import { useAppSelector } from "../../services/hooks";
import { ProfileWindowPopup } from "../ProfileWindowPopup/ProfileWindowPopup";
import { NotificationsPopup } from "../NotificationsPopup/NotificationsPopup";

export const HeaderTop: FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState<boolean>(false);
  const [openNotification, setIsOpenNotification] = useState<boolean>(false);
  return (
    <div className={styles.block}>
      <div className={styles.block_help}>
        <Search />
      </div>
      {user ? (
        <div className={styles.block_users}>
          <div
            className={styles.popup_notification}
            onClick={() => {
              setIsOpenNotification(!openNotification);
            }}
          >
            <img src={bell} alt="Уведомление" className={styles.bell} />
            <img
              src={notice}
              alt="Кол-во сообщений"
              className={styles.notice}
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
