import { FC } from "react";
import styles from "./Analytics.module.scss";
import { BlockAnalics } from "../../components/BlockAnalics/BlockAnalics";
import editTasks from "../../images/icons/editTasks.svg";
import editList from "../../images/icons/editList.svg";
import { BlockList } from "../../components/BlockList/BlockList";
import { HeaderTop } from "../../components/HeaderTop/HeaderTop";
import { TableTask, Task, Wrapper } from "../../components";
import { useAppSelector } from "../../services/hooks";
import { Calendar } from "../Calendar/Calendar";
import { CalendarComponent } from "../../components/Calendar/CalendarComponent";
import { Diagram } from "../../components/Diagram/Diagram";

export const Analytics: FC = () => {
  const { tasks } = useAppSelector((state) => state.task);
  return (
    <Wrapper>
      <HeaderTop />
      <div className={styles.container}>
        <div className={styles.container__header}>
          <Diagram />
          <BlockAnalics
            name={"Задачи"}
            count={28}
            icon={editTasks}
            title={"Завершенные задачи"}
            countMade={20}
          />

          <BlockAnalics
            name={"Заявки"}
            count={128}
            icon={editList}
            title={"В работе"}
            countMade={80}
          />

          <BlockList />
        </div>
        <div className={styles.container__bottom}>
          <TableTask mini={true} />
          <Task tasks={tasks} />
          <CalendarComponent />
        </div>
      </div>
    </Wrapper>
  );
};
