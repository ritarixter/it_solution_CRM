import { FC, useEffect, useState } from "react";
import styles from "./HeaderTop.module.scss";
import { Search } from "../Search/Search";
import bell from "../../images/icons/bell.svg";
import notice from "../../images/icons/notice.svg";
import { UserBlock } from "../UserBlock/UserBlock";
import arrow from "../../images/icons/arrow.svg";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { ProfileWindowPopup } from "../ProfileWindowPopup/ProfileWindowPopup";
import { NotificationsPopup } from "../NotificationsPopup/NotificationsPopup";
import { getStep, setNullCountStep } from "../../services/slices/step";

export const HeaderTop: FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch()
  const { count } = useAppSelector((state) => state.step);
  const [openNotification, setIsOpenNotification] = useState<boolean>(false);
  const [countStep, setCountStep] = useState<number>(0);


  useEffect(() => {
    setCountStep(count);
  }, [count]);


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
              dispatch(setNullCountStep())
            }}
          >
            <img src={bell} alt="Уведомление" className={styles.bell} />
            {countStep > 0 && <div className={styles.notice}>{countStep}</div>}
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
