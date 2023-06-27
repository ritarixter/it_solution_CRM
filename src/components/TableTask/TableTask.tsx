import { FC, useState } from "react";
import styles from "./TableTask.module.scss";
import excel from "../../images/icons/excel_icon.svg";
import { data, titles } from "./constants";
import { Pagination } from "../Pagination";
import { v4 as uuidv4 } from 'uuid';
import { TableTaskItem } from "./TableTaskItem/TableTaskItem";


type TTableTask = {
  mini: boolean;
};

export const TableTask: FC<TTableTask> = ({ mini }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  return (
    <section className={`${styles.container} ${styles.mini}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {mini ? "Заявки за последние 7 дней" : "Заявки"}
        </h2>
        <p className={styles.excel}>
          <img src={excel} className={styles.excel__icon} alt="Иконка excel" />
          Экспорт
        </p>
      </div>
      <ul className={styles.table}>
        <li key={uuidv4()}>
          <ul className={`${styles.row} ${styles.header}`}>
            {titles.map((title, index) => (
              <li key={index}>{title}</li>
            ))}
          </ul>
        </li>

        {data.map((item) => (
          <li key={item.id}>
                <TableTaskItem item={item}/>
          </li>
        ))}

      </ul>
      <div className={styles.pagination}>
        <Pagination
          pageSize={5}
          totalCount={20}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          style={'blue'}
        />
        </div>
    </section>
  );
};
