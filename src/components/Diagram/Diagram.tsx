import { FC } from "react";
import "chart.js/auto";
// import { Pie } from "react-chartjs-2";
import styles from "./Diagram.module.scss";



// const pieChartData = {
//   type: "pie",
//   labels: [" В обработке", "Новые", "Завершенные"],
//   datasets: [
//     {
//       radius: 43.22,
//       data: [10, 5, 2],
//       label: "Infected People",
//       backgroundColor: ["#72DC00", "#F47633", "#E6EAEE"],
//       hoverBackgroundColor: ["#175000", "#003350", "#993d00"],
//     },
//   ],
//   options: {
//     // plugins: {
//       title: {
//           display: true,
//           text: "Заявки",
//           fontSize: 15
//       },
//       legend: {
//         display: true, //Is the legend shown?
//         position: "top" //Position of the legend.
//       },
//     // },
//   },
// };

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
