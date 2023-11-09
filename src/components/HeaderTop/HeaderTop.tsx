import { FC, useState } from "react";
import styles from "./HeaderTop.module.scss";
import { UserBlock } from "../UserBlock/UserBlock";
import arrow from "../../images/icons/arrow.svg";
import { useAppSelector } from "../../services/hooks";
import { ProfileWindowPopup } from "../ProfileWindowPopup/ProfileWindowPopup";
//import { changeCountNotify } from "../../services/slices/user";
import { NotificationsBlock } from "../NotificationsBlock/NotificationsBlock";
import useResize from "../../hooks/useResize.js";
import { MenuGamburger } from "../MenuGamburger/MenuGamburger";

export const HeaderTop: FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const size = useResize();

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
          {size.width <= 682 && (
            <>
              <MenuGamburger
                open={openMenu}
                setOpen={() => setOpenMenu(!openMenu)}
              />
            </>
          )}
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
