import { FC, useEffect, useState } from "react";
import styles from "./Task.module.scss";
import { Item } from "./Item/Item";
import { useAppSelector } from "../../services/hooks";
import { TTask } from "../../types";
import { dataTask } from "./constants";

type ITask = {
  tasks: Array<TTask>;
};

export const Task: FC<ITask> = ({ tasks }) => {
  const [tasksData, setTasksData] = useState<Array<TTask>>([]);
  useEffect(() => {
    if (tasks.length != 0) {
      const arr = [...tasks];
      setTasksData(
        arr
          .sort((a, b) => {
            if (a.status < b.status) return 1;
            if (a.status > b.status) return -1;
            return 0;
          })
          .sort((a, b) => {
            if (a.done) return 1;
            if (b.done) return -1;
            return 0;
          })
      );
    } else {
      setTasksData(
        dataTask
          .sort((a, b) => {
            if (a.status < b.status) return 1;
            if (a.status > b.status) return -1;
            return 0;
          })
          .sort((a, b) => {
            if (a.done) return 1;
            if (b.done) return -1;
            return 0;
          })
      );
    } //Если бэкенд выключен
  }, [tasks]);
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Мой список задач</h2>
        <button className={styles.plus}>+</button>
      </div>
      <ul className={styles.task}>
        {tasksData.map((item) => (
          <Item
            done={item.done}
            status={item.status}
            id={item.id}
            endDate={item.endDate}
            title={item.title}
          />
        ))}
      </ul>
    </section>
  );
};
