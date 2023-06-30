import { FC, useCallback, useState } from "react";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import lockIcon from "../../images/icons/lock.svg";
import mailIcon from "../../images/icons/mail.svg";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { loginUser } from "../../services/slices/user";

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [typeInput, setTypeInput] = useState<boolean>(true);

  const { isAuth } = useAppSelector((state) => state.user);

  const handleSubmit = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      dispatch(loginUser(email, password));
      setPassword("");
      setEmail("");
    },
    [dispatch, email, password]
  );

  if (isAuth) {
    navigate("/analytics");
  }
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <header className={styles.header}>Вход</header>
        <div>
          <p className={styles.text}>Давайте начнем, Добро пожаловать!</p>
        </div>
        <form action="" className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            <input
              type="text"
              className={styles.input}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <img src={mailIcon} alt="Иконка email" className={styles.icon} />
          </label>
          <label className={styles.label}>
            <input
              type={typeInput ? "password" : "text"}
              className={styles.input}
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <img
              src={lockIcon}
              alt="Иконка замка"
              className={styles.icon}
              onClick={() => {
                setTypeInput(!typeInput);
              }}
            />
          </label>
          <button type="submit" className={styles.button}>
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
