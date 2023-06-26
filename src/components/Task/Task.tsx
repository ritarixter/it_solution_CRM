import { FC, useEffect, useState } from "react";
import styles from "./Task.module.scss";
import { Item } from "./Item/Item";

export type TTask = {};

export type TData = {
  id: number;
  title: string;
  status: "Срочно" | "Несрочно";
  endDate: Date;
  done: boolean;
};

const data: Array<TData> = [
  {
    id: 1,
    title: "Закончить проект",
    status: "Срочно",
    endDate: new Date(),
    done: true
  },
  {
    id: 2,
    title: "Назначить встречу",
    status: "Несрочно",
    endDate: new Date(),
    done: false
  },
  {
    id: 3,
    title: "Провести собеседование",
    status: "Несрочно",
    endDate: new Date(),
    done: false
  },
  {
    id: 4,
    title: "Закончить проект",
    status: "Срочно",
    endDate: new Date(),
    done: false
  },
  {
    id: 5,
    title: "Назначить встречу",
    status: "Несрочно",
    endDate: new Date(),
    done: false
  },
  {
    id: 6,
    title: "Провести собеседование",
    status: "Несрочно",
    endDate: new Date(),
    done: false
  },
  {
    id: 7,
    title: "Назначить встречу",
    status: "Несрочно",
    endDate: new Date(),
    done: true
  },
];

export const Task: FC<TTask> = () => {
  const [tasks, setTasks] = useState<Array<TData>>([]);
  useEffect(() => {
    setTasks(
      data.sort((a, b) => {
        if (a.status < b.status) return 1;
        if (a.status > b.status) return -1;
        return 0;
      }).sort((a,b)=>{
        if (a.done) return 1;
        if (b.done) return -1;
        return 0;
      })
    );
  }, []);
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Мой список задач</h2>
        <button className={styles.plus}>+</button>
      </div>
      <ul className={styles.task}>
        {tasks.map((item) => (
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
