import { FC, useEffect, useState } from "react";
import styles from "./Task.module.scss";
import { Item } from "./Item/Item";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { TTask } from "../../types";
import { addTask, deleteTask, getTaskByDate, updateTask } from "../../services/slices/task";
import { PopupAddTask } from "../PopupAddTask/PopupAddTask";
import { ButtonCircle } from "../ButtonCircle/ButtonCircle";
import { formateDateShort } from "../../utils/utils-date";
import { TUpdateTask } from "../../types/TTask";
import { PreloaderBlock } from "../PreloaderBlock/PreloaderBlock";

type ITask = {
  tasksByDay: Array<TTask>;
};

const sortData = (arr: Array<TTask>) => {   // СОРТИРОВКА ДЛЯ... НЕ ЗНАЮ ДЛЯ ЧЕГО
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

export const Task: FC<ITask> = ({ tasksByDay }) => {
  const { isLoadingTask, selectedDay } = useAppSelector((state) => state.task);
  const { isLoadingList } = useAppSelector((state) => state.list);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [tasksData, setTasksData] = useState<Array<TTask>>([]);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id, selectedDay));
  };

  const changeCheckedHandle = (id: number, checked: boolean) => { // ИЗМЕНЕНИЯ ЗАДАЧИ
    const newTask: TUpdateTask = {
      id: id,
      done: checked,
      title: undefined,
      status: undefined,
      endDate: new Date(selectedDay),
      description: undefined,
    };
    dispatch(updateTask(newTask));
  };

  const createTask = (                      // ДОБАВЛЕНИЕ ЗАДАЧ !!!!!!!!!НУЖНО СДЕЛАТЬ ЕЕ АСИНХРОННОЙ
    name?: string,
    description?: string,
    time?: string,
    status?: string
  ) => {
    let date = new Date(selectedDay);       // ДАТА ДЛЯ ЗАДАЧИ
    const times = time?.split(":");
    date?.setHours(Number(times![0]), Number(times![1]), 0, 0); //КОСТЫЛЬ КАК В Item // УЖЕ НЕ КОСТЫЛЬ
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
            <ButtonCircle onClick={() => setPopupOpen(true)} />
            <PopupAddTask
              title={"Задача"}
              date={                        // ДЛЯ ОТОБРАЖЕНИЯ ВЫБРАННОЙ ДАТЫ
                String(selectedDay).length > 0
                  ? formateDateShort(selectedDay)
                  : ""
              }
              isOpen={isPopupOpen}
              setOpen={setPopupOpen}
              onClick={createTask}
            />
          </div>
          {!error ? (                       // ЕСЛИ ЗАДАЧИ ЕСТЬ
            <ul className={styles.task}>
              {tasksData.map((item) => (
                <Item
                  task={item}
                  handleDelete={handleDelete}
                  changeCheckedHandle={changeCheckedHandle}
                />
              ))}
            </ul>
          ) : (                             // ЕСЛИ НЕТ ЗАДАЧ
            <p className={styles.error}>Задач нет</p>
          )}
        </>
      )}
    </section>
  );
};
