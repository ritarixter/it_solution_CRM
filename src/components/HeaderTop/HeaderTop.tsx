import { FC, useState } from "react";
import styles from "./HeaderTop.module.scss";
import { UserBlock } from "../UserBlock/UserBlock";
import arrow from "../../images/icons/arrow.svg";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { ProfileWindowPopup } from "../ProfileWindowPopup/ProfileWindowPopup";
//import { changeCountNotify } from "../../services/slices/user";
import { NotificationsBlock } from "../NotificationsBlock/NotificationsBlock";



export const HeaderTop: FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  // useEffect(() => {
  //   setCount(user.count);
  // }, [step, user, users, list]);
  return (
    <div className={styles.block}>
      <div className={styles.block_help}>
        <NotificationsBlock />
      </div>
      {user ? (
        <div className={styles.block_users}>
          {/* <div
            className={styles.popup_notification}
            onClick={() => {
              setIsOpenNotification(!openNotification);
              if (openNotification) {
                dispatch(changeCountNotify(user.id, 0));  
              }
            }}
          >
            <img src={bell} alt="Уведомление" className={styles.bell} />
           <div className={styles.notice}>5</div>
            <NotificationsPopup
              open={openNotification}
              setOpen={setIsOpenNotification}
            />
          </div> */}
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
