import { FC, useState } from "react";
import styles from "./NotFound.module.scss";
import img from "../../images/404PageNotFound.jpg";

export const NotFound: FC = () => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={img} alt={"Страница не найдена"} />
    </div>
  );
};
