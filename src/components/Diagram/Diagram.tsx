import { FC } from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import styles from "./Diagram.module.scss";

// const pieChartData = {
//   type: "doughnut",
//   labels: [" В обработке", "Новые", "Завершенные"],
//   datasets: [
//     {
//       radius: 43.22,
//       data: [3, 5, 2],
//       label: "Infected People",
//       backgroundColor: ["#72DC00", "#F47633", "#E6EAEE"],
//       hoverBackgroundColor: ["#175000", "#003350", "#993d00"],
//     },
//   ],
//   options: {
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//   },
// };

export const Diagram: FC = () => {
  return (
    <div className={styles.block}>
      <div className={styles.block_title}>
        <h2 className={styles.title}>Заявки</h2>
        <p className={styles.title_count}>7400</p>
      </div>
      <div className={styles.canvas}>{/* <Pie data={pieChartData} /> */}</div>
    </div>
  );
};
