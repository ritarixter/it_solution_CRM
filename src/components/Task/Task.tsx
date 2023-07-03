import { FC, useEffect, useState } from "react";
import styles from "./Task.module.scss";
import { Item } from "./Item/Item";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { TTask } from "../../types";
import { dataTask } from "./constants";
import { deleteTaskUserApi, updateTaskUserApi } from "../../utils/api";
import { deleteTask, getTask, updateTask } from "../../services/slices/task";

type ITask = {
  tasks: Array<TTask>;
};

const sortData = (arr: Array<TTask>) => {
  return arr
    .sort((a, b) => {
      if (a.status < b.status) return 1;
      if (a.status > b.status) return -1;
      return 0;
    })
    .sort((a, b) => {
      if (a.done) return 1;
      if (b.done) return -1;
      return 0;
    });
};

export const Task: FC<ITask> = ({ tasks }) => {
  const [tasksData, setTasksData] = useState<Array<TTask>>([]);
  const [error, setError]=useState<boolean>(false)
  const dispatch = useAppDispatch()

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id))
  };

  const changeCheckedHandle = (id: number, checked: boolean) => {
   dispatch(updateTask(id,checked))
  }


  useEffect(() => {
    if (tasks.length != 0) {
      const arr = [...tasks];
      setTasksData(sortData(arr));
      setError(false)
    } else {
      setError(true)
    }
  }, [tasks]);
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Мой список задач</h2>
        <button className={styles.plus}>+</button>
      </div>
      {!error?
      <ul className={styles.task}>
        {tasksData.map((item) => (
          <Item task={item} handleDelete={handleDelete} changeCheckedHandle={changeCheckedHandle} />
        ))}
      </ul>
      : <p className={styles.error}>Задач нет</p>
      }
    </section>
  );
};
