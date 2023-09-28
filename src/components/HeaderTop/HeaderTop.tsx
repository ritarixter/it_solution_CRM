import { FC, useEffect, useState } from "react";
import styles from "./HeaderTop.module.scss";
import { Search } from "../Search/Search";
import bell from "../../images/icons/bell.svg";
import { UserBlock } from "../UserBlock/UserBlock";
import arrow from "../../images/icons/arrow.svg";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { ProfileWindowPopup } from "../ProfileWindowPopup/ProfileWindowPopup";
import { NotificationsPopup } from "../NotificationsPopup/NotificationsPopup";
import { changeCountNotify, setCountStep } from "../../services/slices/user";

export const HeaderTop: FC = () => {
  const { user, users } = useAppSelector((state) => state.user);
  const { step } = useAppSelector((state) => state.step);
  const { list } = useAppSelector((state) => state.list);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [count, setCount] = useState<number>(0);

  const [openNotification, setIsOpenNotification] = useState<boolean>(false);

  // useEffect(() => {
  //   setCount(user.count);
  // }, [step, user, users, list]);
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
              if (openNotification) {
                dispatch(changeCountNotify(user.id, 0));  
              }
            }}
          >
            <img src={bell} alt="Уведомление" className={styles.bell} />
            {user.count > 0 && <div className={styles.notice}>{user.count}</div>}
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
