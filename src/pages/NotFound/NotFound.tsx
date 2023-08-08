import { FC } from "react";
import styles from "./NotFound.module.scss";
import { useNavigate } from "react-router";

export const NotFound: FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.conteiner}>
      <h1>404 Error Page</h1>
      <section className={styles.error_container}>
        <span className={styles.four}>
          <span className={styles.screen_reader_text}>4</span>
        </span>
        <span className={styles.zero}>
          <span className={styles.screen_reader_text}>0</span>
        </span>
        <span className={styles.four}>
          <span className={styles.screen_reader_text}>4</span>
        </span>
      </section>
      <div className={styles.link_container}>
        <a className={styles.more_link} onClick={() => navigate("/analytics")}>
          Вернуться на главную
        </a>
      </div>
    </div>
  );
};
