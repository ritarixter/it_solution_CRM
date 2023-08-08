import { FC, useEffect, useState } from "react";
import styles from "./Analytics.module.scss";
import { BlockAnalics } from "../../components/BlockAnalics/BlockAnalics";
import editTasks from "../../images/icons/editTasks.svg";
import editList from "../../images/icons/editList.svg";
import { BlockList } from "../../components/BlockList/BlockList";
import { HeaderTop } from "../../components/HeaderTop/HeaderTop";
import { TableTask, Task, Wrapper } from "../../components";
import { useAppSelector } from "../../services/hooks";
import { CalendarComponent } from "../../components/Calendar/CalendarComponent";
import { Diagram } from "../../components/Diagram/Diagram";
import { access, statusConst } from "../../utils/constants";

export const Analytics: FC = () => {
  const { tasks, tasksByDay } = useAppSelector((state) => state.task);
  const { list } = useAppSelector((state) => state.list);
  const [countDoneTasks, setCountDoneTasks] = useState<number>(0);
  const [countAtWorkList, setCountAtWorkList] = useState<number>(0);

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
          <TableTask mini={true} list={list} currentAccess={access.SUPERUSER} />
          <Task tasksByDay={tasksByDay} />
          <CalendarComponent tasks={tasks} />
        </div>
      </div>
    </Wrapper>
  );
};
