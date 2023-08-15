import { FC } from "react";
import styles from "./ProfileWindowPopup.module.scss";
import { useNavigate } from "react-router";
import { items } from "./constants";
import { useAppDispatch } from "../../services/hooks";
import { deleteCookie, getCookie } from "../../utils/cookies";
import { logout, setAuth } from "../../services/slices/user";
type TProfileWindowPopup = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const ProfileWindowPopup: FC<TProfileWindowPopup> = ({ open }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div
      className={`${styles.profileWindow__container} ${open && styles.opened}`}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            if (item.id === 2) {
              localStorage.removeItem("refreshToken");
              deleteCookie("accessToken");
              dispatch(logout());
              dispatch(setAuth(false));
            }
            navigate(item.route);
          }}
          className={`${styles.item} ${
            items.length > item.id && styles.bottomBorder
          }`}
        >
          <img
            className={styles.icons}
            src={String(item.img)}
            alt={String(item.name)}
          />
          {item.name}
        </div>
      ))}
    </div>
  );
};
