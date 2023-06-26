import { FC, useState } from "react";
import styles from "./Login.module.scss";
import { Link } from "react-router-dom";
import lockIcon from "../../images/icons/lock.svg";
import mailIcon from "../../images/icons/mail.svg";
import { Pagination } from "../../components/Pagination/Pagination";

export const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [typeInput, setTypeInput] = useState<boolean>(true);
  const handleClick = () => {
    setPassword("");
    setEmail("");
  };
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <header className={styles.header}>Вход</header>
        <div>
          <p className={styles.text}>Давайте начнем, Добро пожаловать!</p>
        </div>
        <form action="" className={styles.form}>
          <label className={styles.label}>
            <img src={mailIcon} alt="Иконка email" className={styles.icon} />
            <input
              type="email"
              className={styles.input}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label className={styles.label}>
            <img
              src={lockIcon}
              alt="Иконка замка"
              className={styles.icon}
              onClick={() => {
                console.log('click')
                setTypeInput(!typeInput);
              }}
            />
            <input
              type={typeInput ? "password" : "text"}
              className={styles.input}
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <button type="button" className={styles.button} onClick={handleClick}>
            Войти
          </button>
        </form>
        <p className={styles.subtitle}>
          Забыли пароль?{" "}
          <Link className={styles.link} to="">
            Нажмите здесь
          </Link>
        </p>
      </div>

    </div>
  );
};
