import { FC, useState } from "react";
import styles from "./MenuGamburger.module.scss";
import { Header } from "../Header";
import { access } from "../../utils/constants";
import { routes } from "../Header/constants";
import { useAppSelector } from "../../services/hooks";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/icons/logo.svg";

type TMenuGamburger = {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const MenuGamburger: FC<TMenuGamburger> = ({open, setOpen}) => {
    const { pathname } = useLocation();
    const { user } = useAppSelector((state) => state.user);
    const links =
    user.access != access.SUPERUSER && user.access != access.VICEPREZIDENT
      ? routes.slice(1, 2)
      : user.access === access.SUPERUSER
      ? routes.slice(0, 2)
      : routes;

  return (
    <>
    <div className={styles.menuClick} onClick={() => setOpen(true)}>
      <span
        className={`${styles.line1} ${
          open ? styles.line1_active : styles.line1_NoActive
        }`}
      ></span>
      <span
        className={`${styles.line2} ${
          open ? styles.line2_active : styles.line2_NoActive
        }`}
      ></span>
      <span
        className={`${styles.line3} ${
          open ? styles.line3_active : styles.line3_NoActive
        }`}
      ></span>
    </div>
    <div className={`${styles.gamburger} ${open && styles.gamburger_active}`} onClick={(e) => e.stopPropagation()} >  
    <img src={logo} alt="Лого IT solutions" className={styles.logo} />
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
    </div>
    </>
  );
};
