import { FC, useState } from "react";
import styles from "./MenuGamburger.module.scss";
import { Header } from "../Header";
import { access } from "../../utils/constants";
import { routes } from "../Header/constants";
import { useAppSelector } from "../../services/hooks";
import { Link, useLocation } from "react-router-dom";

type TMenuGamburger = {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export const MenuGamburger: FC = () => {
    const { pathname } = useLocation();
    const [open, setOpen] = useState<boolean>(false);
    const { user } = useAppSelector((state) => state.user);
    const links =
    user.access != access.SUPERUSER && user.access != access.VICEPREZIDENT
      ? routes.slice(1, 2)
      : user.access === access.SUPERUSER
      ? routes.slice(0, 2)
      : routes;

  return (
    <div className={styles.gamburger}>  
      {open && 
      <nav className={styles.menu}>
      <ul className={styles.nav}>
        {links.map((item, index) => (
          <li
            key={index}
            className={`${styles.nav__item}  ${
              pathname === item.path && styles.active
            }`}
          >
              <Link to={item.path} className={styles.link}>
                <img src={item.icon} alt="иконка" className={styles.icon} />
                {item.name}
              </Link>
          </li>
        ))}
      </ul>
    </nav>
      }
    </div>
  );
};
