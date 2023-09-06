import { FC, useEffect, useState } from "react";
import styles from "./Analytics.module.scss";
import { BlockAnalics } from "../../components/BlockAnalics/BlockAnalics";
import editTasks from "../../images/icons/editTasks.svg";
import editList from "../../images/icons/editList.svg";
import { BlockList } from "../../components/BlockList/BlockList";
import { HeaderTop } from "../../components/HeaderTop/HeaderTop";
import { TableTask, Task, Wrapper } from "../../components";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { CalendarComponent } from "../../components/Calendar/CalendarComponent";
import { Diagram } from "../../components/Diagram/Diagram";
import { access, statusConst } from "../../utils/constants";
import { TList } from "../../types";
import { getList } from "../../services/slices/list";

export const Analytics: FC = () => {
  const { tasks, tasksByDay } = useAppSelector((state) => state.task);
  const { list } = useAppSelector((state) => state.list);
  const [countDoneTasks, setCountDoneTasks] = useState<number>(0);
  const [countAtWorkList, setCountAtWorkList] = useState<number>(0);
  const [listLast7days, setListLast7days] = useState<Array<TList>>([]);
  const dispatch = useAppDispatch()

  useEffect(()=>{
    const interval = setInterval(() => {
      dispatch(getList());
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (tasks.length !== 0) {
      let arr = [...tasks];
      setCountDoneTasks(arr.filter((item) => item.done === true).length);
    }
  }, [tasks]);

  useEffect(() => {
    let arr = [...list];
    setCountAtWorkList(
      arr.filter((item) => item.status === statusConst.IN_WORK).length
    );
    let dateLast7days = new Date();
    dateLast7days.setDate(dateLast7days.getDate() - 7);
    arr = arr.filter((item) => new Date(item.createdAt) > dateLast7days);
    setListLast7days(arr.reverse());
  }, [list]);
  return (
    <Wrapper>
      <HeaderTop />
      <div className={styles.container}>
        <div className={styles.container__header}>
          <Diagram list={list} />
          <BlockAnalics
            name={"Задачи"}
            count={tasks.length}
            icon={editTasks}
            title={"Завершенные задачи"}
            countMade={countDoneTasks}
          />

          <BlockAnalics
            name={"Заявки"}
            count={list.length}
            icon={editList}
            title={"В работе"}
            countMade={countAtWorkList}
          />

          <BlockList />
        </div>
        <div className={styles.container__bottom}>
          <TableTask
            mini={true}
            list={listLast7days}
            currentAccess={access.SUPERUSER}
          />
          <Task tasksByDay={tasksByDay} />
          <CalendarComponent tasks={tasks} />
        </div>
      </div>
    </Wrapper>
  );
};
