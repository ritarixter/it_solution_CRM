import { FC, useState } from "react";
import styles from "./Header.module.scss";
import logo from "../../images/icons/logo.svg";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { routes } from "./constants";
import { useAppSelector } from "../../services/hooks";
import { access } from "../../utils/constants";
import useResize from "../../hooks/useResize";
import menu from "../../images/icons/menu_gamburg.svg";

export const Header: FC = () => {
  const { pathname } = useLocation();
  const { user } = useAppSelector((state) => state.user);
  const size = useResize();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const links =
    user.access != access.SUPERUSER && user.access != access.VICEPREZIDENT
      ? routes.slice(1, 2)
      : user.access === access.SUPERUSER
      ? routes.slice(0, 2)
      : routes;
  {
    /* <div className={styles.gamburger}>
            <div className={styles.gamburger_btn}>
              <img src={menu} alt={"Иконка гамбургер-меню"}/>
            </div>
            <div className={styles.gamburger_menu}>
              <nav className={`${activeBurger && styles.active} ${styles.menu_nav}`}>
                <ul className={`${activeBurger && styles.active} ${styles.menu_ul}`}>
                  {links.map((item) => (
                    <li className={styles.nav__item}>
                    <a href={item.path} className={`${styles.link} ${
                    "/" + hash === item.path && styles.link_active
                  }`}>{item.name}</a>
                  </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div> */
  }
  return (
    <header
      className={`${styles.header} ${pathname === "/login" && styles.dn}`}
    >
      {size.width >= 1420 ? (
        <img src={logo} alt="Лого IT solutions" className={styles.logo} />
      ) : (
        <div className={styles.gamburger_btn}>
          <img src={menu} alt={"Иконка гамбургер-меню"} className={styles.menuIcon} />
        </div>
      )}
      <nav className={styles.menu}>
        <ul className={styles.nav}>
          {links.map((item, index) => (
            <li
              key={index}
              className={`${styles.nav__item}  ${
                pathname === item.path && styles.active
              }`}
            >
              {(size.width >= 1420 || size.width <= 682) && (
                <Link
                  to={item.path}
                  className={styles.link}
                  onClick={() => close()}
                >
                  <img src={item.icon} alt="иконка" className={styles.icon} />
                  {item.name}
                </Link>
              )}
              {size.width <= 1420 && size.width >= 682 && (
                <Link
                  to={item.path}
                  className={styles.link}
                  onClick={() => close()}
                >
                  <img src={item.icon} alt="иконка" className={styles.icon} />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
