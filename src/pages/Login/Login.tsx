import { FC, useCallback, useState } from "react";
import styles from "./Login.module.scss";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import lockIcon from "../../images/icons/lock.svg";
import mailIcon from "../../images/icons/mail.svg";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { loginUser } from "../../services/slices/user";

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [typeInput, setTypeInput] = useState<boolean>(true);
  let location = useLocation();
  const { isAuth, isError } = useAppSelector((state) => state.user);

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
    return <Navigate to="/applications" state={{ from: location }} replace />;
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
              className={`${styles.input} ${isError && styles.input_error}`}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <img src={mailIcon} alt="Иконка email" className={styles.icon} />
          </label>
          <label className={styles.label}>
            <input
              type={typeInput ? "password" : "text"}
              className={`${styles.input} ${isError && styles.input_error}`}
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
          {isError && <p className={styles.error}>Неверный логин или пароль</p>}
          <button
            type="submit"
            className={styles.button}
            disabled={email.length < 2 || password.length < 2}
          >
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
