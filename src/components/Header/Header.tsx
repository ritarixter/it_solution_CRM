import { FC, useState } from "react";
import styles from "./Header.module.scss";
import logo from "../../images/icons/logo.svg";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { routes } from "./constants";
import { useAppSelector } from "../../services/hooks";
import { access } from "../../utils/constants";
import useResize from "../../hooks/useResize.js";


export const Header: FC = () => {
  const { pathname } = useLocation();
  const { user } = useAppSelector((state) => state.user);
  const size = useResize();
  const links =
    user.access != access.SUPERUSER && user.access != access.VICEPREZIDENT
      ? routes.slice(1, 2)
      : user.access === access.SUPERUSER
      ? routes.slice(0, 2)
      : routes;

  return (
    <header
      className={`${styles.header} ${pathname === "/login" && styles.dn}`}
    >
      {size.width >= 1420 && (
        <img src={logo} alt="Лого IT solutions" className={styles.logo} />
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
              {size.width >= 1420 && (
                <Link to={item.path} className={styles.link}>
                  <img src={item.icon} alt="иконка" className={styles.icon} />
                  {item.name}
                </Link>
              )}
              {size.width <= 1420 && (
                <Link to={item.path} className={styles.link}>
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
