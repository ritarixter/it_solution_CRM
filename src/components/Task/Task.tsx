import { FC, useEffect, useState } from "react";
import styles from "./Task.module.scss";
import { Item } from "./Item/Item";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { TTask } from "../../types";
import { dataTask } from "./constants";
import { deleteTaskUserApi, updateTaskUserApi } from "../../utils/api";
import {
  addTask,
  deleteTask,
  getTask,
  updateTask,
} from "../../services/slices/task";
import { PopupAddTask } from "../PopupAddTask/PopupAddTask";
import { ButtonCircle } from "../ButtonCircle/ButtonCircle";
import { formateDateShort } from "../../utils/utils-date";
<<<<<<< HEAD
import { TUpdateTask } from "../../types/TTask";
=======
import { PreloaderBlock } from "../PreloaderBlock/PreloaderBlock";
>>>>>>> cff02bbd5eb7c65eda5cc780b1d8592978857dd4

type ITask = {
  tasksByDay: Array<TTask>;
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

<<<<<<< HEAD
export const Task: FC<ITask> = ({ tasks }) => {
=======
export const Task: FC<ITask> = ({ tasksByDay }) => {
  // console.log('from task.tsx    ', tasks);
  // tasks.filter((e) => {
  //               const date = new Date('2023-07-10T17:39:00.000Z')
  //               if( new Date(e.endDate) < new Date(date)) console.log(e.endDate)
  //           })
<<<<<<< HEAD
>>>>>>> 50cd49d2f2363ea25349f1032405c29bd43c47d8
=======
  const { isLoadingTask } = useAppSelector((state) => state.task);
  const { isLoadingList } = useAppSelector((state) => state.list);
>>>>>>> cff02bbd5eb7c65eda5cc780b1d8592978857dd4
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [tasksData, setTasksData] = useState<Array<TTask>>([]);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
  };

  const changeCheckedHandle = (id: number, checked: boolean) => {
    const newTask: TUpdateTask = {
      id: id,
      done: checked,
      title: undefined,
      status:undefined,
      endDate: undefined,
      description:undefined
    }
    dispatch(updateTask(newTask));
  };

  const createTask = (
    name?: string,
    description?: string,
    time?: string,
    status?: string,
  ) => {
    let date = new Date()
    const times = time?.split(":");
    date.setHours(Number(times![0])+3, Number(times![0]), 0, 0); //КОСТЫЛЬ КАК В Item
    dispatch(addTask(false, status, date, name, description));
    setPopupOpen(false);
  };

  useEffect(() => {
    if (tasksByDay.length !== 0) {
      const arr = [...tasksByDay];
      setTasksData(sortData(arr));
      setError(false);
    } else {
      setError(true);
    }
  }, [tasksByDay]);

  return (
    <section className={styles.container}>
      {isLoadingTask || isLoadingList ? (
        <PreloaderBlock />
      ) : (
        <>
      <div className={styles.header}>
        <h2 className={styles.title}>Мой список задач</h2>
        <ButtonCircle onClick={() => setPopupOpen(true)}/>
        <PopupAddTask
          title={"Задача"}
          date={tasksByDay.length > 0 ? formateDateShort(tasksByDay[0].endDate) : ''}
          isOpen={isPopupOpen}
          setOpen={setPopupOpen}
          onClick={createTask}
        />
      </div>
      {!error ? (
        <ul className={styles.task}>
          {tasksData.map((item) => (
            <Item
              task={item}
              handleDelete={handleDelete}
              changeCheckedHandle={changeCheckedHandle}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.error}>Задач нет</p>
      )}
      </>
      )}
    </section>
  );
};
