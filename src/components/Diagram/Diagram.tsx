import { FC } from "react";
import styles from "./Diagram.module.scss";


export const Diagram: FC = () => {

  const firstCircle = 28;
  const secondCircle = 12;
  const thirfCircle = 100 - (firstCircle + secondCircle);
  const applicationCount = 7400;

  const CircleFunc = () => {
    return (
      <svg
        className={styles.chart}
        width={120}
        height={120}
        viewBox="0 0 50 50"
      >
        <circle className={styles.unit} style={{ 'strokeDasharray': `${firstCircle} 100` }} r={15.9} cx="50%" cy="50%" />
        <circle className={styles.unit} style={{ 'strokeDasharray': `${secondCircle} 100`, 'strokeDashoffset': -firstCircle }} r={15.9} cx="50%" cy="50%" />
        <circle className={styles.unit} style={{ 'strokeDasharray': `${thirfCircle} 100`, 'strokeDashoffset': -(firstCircle + secondCircle) }} r={15.9} cx="50%" cy="50%" />
      </svg>
    )
  }

  return (
    <div className={styles.block}>
      <div className={styles.legend}>
        <h2 className={styles.title}>Заявки</h2>
        <strong className={styles.application}>{applicationCount}</strong>
        <ul className={styles.caption_list}>
          <li className={styles.caption_item}>{firstCircle}% В обработке</li>
          <li className={styles.caption_item}>{secondCircle}% Новые</li>
          <li className={styles.caption_item}>{thirfCircle}% Завершенные</li>
        </ul>
      </div>
      <div className={styles.CircleFunc}>
        {CircleFunc()}
      </div>
    </div>
  );
};
