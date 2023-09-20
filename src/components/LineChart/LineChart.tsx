import { FC, useState } from "react";
import styles from "./LineChart.module.scss";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart',
//     },
//   },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: [15, 3, 31, 15, 12, 13],
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: [12, 19, 3, 5, 2, 3],
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };
export const LineChart: FC = () => {
  const [data, setData] = useState({
    labels: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сент", "Окт", "Нояб", "Дек"],
    datasets: [
      {
        label: "Прибыль с заявок",
        data: [12, 19, 3, 5, 2, 7, 12, 19, 12, 10, 2, 3],
        fill: false,
        borderColor: "rgba(59,154,205,1)",
        lineTension: 0.1,
      },
    ],
  });
  return (
    <div className={styles.lineChart}>
     <Line  data={data}/>
    </div>
  );
};
