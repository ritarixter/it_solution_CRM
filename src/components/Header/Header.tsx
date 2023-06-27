import { FC } from "react";
import styles from "./Header.module.scss";
import logo from "../../images/icons/logo.svg";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { routes } from "./constants";

export const Header: FC = () => {
  const { pathname } = useLocation();
  return (
    <header className={styles.header}>
      <img src={logo} alt="Лого IT solutions" className={styles.logo} />
      <nav>
        <ul className={styles.nav}>
          {routes.map((item, index) => (
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
    </header>
  );
};