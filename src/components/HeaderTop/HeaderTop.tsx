import { FC, useState } from "react";
import styles from "./HeaderTop.module.scss";
import { UserBlock } from "../UserBlock/UserBlock";
import arrow from "../../images/icons/arrow.svg";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { ProfileWindowPopup } from "../ProfileWindowPopup/ProfileWindowPopup";
//import { changeCountNotify } from "../../services/slices/user";
import { NotificationsBlock } from "../NotificationsBlock/NotificationsBlock";
import { routes } from "../Header/constants";
import { useLocation } from "react-router";
import { access } from "../../utils/constants";

export const HeaderTop: FC = () => {
  const { user, users } = useAppSelector((state) => state.user);
  const { step } = useAppSelector((state) => state.step);
  const { list } = useAppSelector((state) => state.list);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [count, setCount] = useState<number>(0);
  const [activeBurger, setActiveBurger] = useState<boolean>(false);
  const { hash } = useLocation();

  const links =
    user.access != access.SUPERUSER && user.access != access.VICEPREZIDENT
      ? routes.slice(1, 2)
      : user.access === access.SUPERUSER
      ? routes.slice(0, 2)
      : routes;

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
          <div className={styles.gamburger}>
            <div className={styles.gamburger_btn}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={styles.gamburger_menu}>
              <nav className={`${activeBurger && styles.active} ${styles.menu_nav}`}>
                <ul className={`${activeBurger && styles.active} ${styles.menu_ul}`}>
                  {links.map((item) => (
                    <li className={`${styles.nav__item}  ${
                      activeBurger && styles.active
                    }`}>
                    <a href={item.path} className={`${styles.link} ${
                    "/" + hash === item.path && styles.link_active
                  }`}>{item.name}</a>
                  </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
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
