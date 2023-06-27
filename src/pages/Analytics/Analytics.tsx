import { FC } from "react";
import styles from "./Analytics.module.scss";
import { BlockAnalics } from "../../components/BlockAnalics/BlockAnalics";
import editTasks from "../../images/icons/editTasks.svg";
import editList from "../../images/icons/editList.svg";
import { Search } from "../../components/Search/Search";
import { Diagram } from "../../components/Diagram/Diagram";
import { BlockList } from "../../components/BlockList/BlockList";
import { HeaderTop } from "../../components/HeaderTop/HeaderTop";

export const Analytics: FC = () => {
  return (
    <div>
      <HeaderTop />
      <div className={styles.block}>
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
    </div>
  );
};
