import { FC } from "react";
import styles from "./BlockList.module.scss";

export const BlockList: FC = () => {
  return (
    <div className={styles.block}>
      <h3 className={styles.block_title}>
        Количество заявок, которые находяться на различных этапах
      </h3>
      <div className={styles.block_stage}>
        <div>
          <p className={styles.count}>2</p>
          <p className={styles.text}>Новые заявки клиентов</p>
        </div>
        <div>
          <p className={styles.count}>12</p>
          <p className={styles.text}>Заявки в работе у отдела проектирования</p>
        </div>
        <div>
          <p className={styles.count}>8</p>
          <p className={styles.text}>Заявки в работе у юридического отдела</p>
        </div>
        <div>
          <p className={styles.count}>1</p>
          <p className={styles.text}>Заявки в работе у юридического отдела</p>
        </div>
      </div>
    </div>
  );
};
