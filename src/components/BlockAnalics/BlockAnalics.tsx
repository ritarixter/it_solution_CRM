import { FC } from "react";
import styles from "./BlockAnalics.module.scss";

type TBlockAnalics = {
  name: string;
  count: number;
  icon: string;
  title: string;
  countMade: number;
};

export const BlockAnalics: FC<TBlockAnalics> = ({
  name,
  count,
  icon,
  title,
  countMade,
}) => {
  const width = `${Math.round((100 * countMade) / count)}%`;

  return (
    <div className={styles.block}>
      <div className={styles.title}>
        <div>
          <h3 className={styles.title_caption}>{name}</h3>
          <p className={styles.title_count}>{count}</p>
        </div>
        <img src={icon} alt="Иконка" className={styles.icon} />
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progressBar_block}>
          <p className={styles.progressBar_title}>{title}</p>
          <p className={styles.progressBar_count}>
            {countMade}/{count}
          </p>
        </div>
        <div className={styles.progress}>
          <div className={styles.blueBar} style={{ width: width }}></div>
        </div>
      </div>
    </div>
  );
};