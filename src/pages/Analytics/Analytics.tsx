import { FC, useEffect, useState } from "react";
import styles from "./Analytics.module.scss";
import { BlockAnalics } from "../../components/BlockAnalics/BlockAnalics";
import editTasks from "../../images/icons/editTasks.svg";
import editList from "../../images/icons/editList.svg";
import { BlockList } from "../../components/BlockList/BlockList";
import { HeaderTop } from "../../components/HeaderTop/HeaderTop";
import { Task, Wrapper } from "../../components";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { CalendarComponent } from "../../components/Calendar/CalendarComponent";
import { Diagram } from "../../components/Diagram/Diagram";
import { access, statusConst } from "../../utils/constants";
import { TList } from "../../types";
import { getList } from "../../services/slices/list";
import { LineChart } from "../../components/LineChart/LineChart";

import { Navigate, useLocation } from "react-router";
import useResize from "../../hooks/useResize";

import { titlesMini } from "../../components/TableList/contsants";
import { TableList } from "../../components/TableList/TableList";

export const Analytics: FC = () => {
  const { tasks, tasksByDay } = useAppSelector((state) => state.task);
  const { list } = useAppSelector((state) => state.list);
  const { user } = useAppSelector((state) => state.user);
  const [countDoneTasks, setCountDoneTasks] = useState<number>(0);
  const [countAtWorkList, setCountAtWorkList] = useState<number>(0);
  const [listLast7days, setListLast7days] = useState<Array<TList>>([]);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const size = useResize();

  useEffect(() => {
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
    setListLast7days(arr);
  }, [list]);

  return (
    <Wrapper>
      <HeaderTop />
      {/* Отображение для главного инженера */}
      {user.access === access.SUPERUSER && (
        <div className={`${styles.container}`}>
          <div className={styles.container__header}>
            <div className={styles.container__header_dev}>
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
            </div>
            {size.width >= 970 && <BlockList />} {/* БЛОК ДЛЯ Эффективности */}
          </div>
          <div className={styles.container__bottom}>
            <div className={styles.container__bottom_list}>
              {size.width >= 1865 && (
                <TableList
                  mini={true}
                  list={listLast7days}
                  titleTable={"Заявки за последние 7 дней"}
                  titlesInTable={titlesMini}
                />
              )}
            </div>
            <Task tasksByDay={tasksByDay} />
            <CalendarComponent />
          </div>
        </div>
      )}
      {/* Отображение для зам директора */}
      {user.access === access.VICEPREZIDENT && (
        <div className={styles.container}>
          <div className={styles.container__header}>
            <div className={styles.container__header_dev}>
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
            </div>
            {size.width >= 970 && <BlockList />} {/* БЛОК ДЛЯ Эффективности */}
          </div>
          <div className={styles.container__bottom}>
            {size.width >= 1865 && <LineChart />}
            <Task tasksByDay={tasksByDay} />
            <CalendarComponent />
          </div>
        </div>
      )}
    </Wrapper>
  );
};
