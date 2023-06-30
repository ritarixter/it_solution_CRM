import { FC, useEffect, useState } from "react";
import styles from "./TableTask.module.scss";
import excel from "../../images/icons/excel_icon.svg";
import { data, titles } from "./constants";
import { Pagination } from "../Pagination";
import { v4 as uuidv4 } from "uuid";
import { TableTaskItem } from "./TableTaskItem/TableTaskItem";
import { TList } from "../../types";

type TTableTask = {
  mini: boolean;
  list: Array<TList>;
};

export const TableTask: FC<TTableTask> = ({ mini, list }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentData, setCurrentData] = useState<Array<TList>>([]);

  useEffect(() => {
    if (list.length != 0) {
      const arr = [...list];
      setCurrentData(
      arr.slice(currentPage * pageSize - pageSize, currentPage * pageSize)
      );
    } else {
      setCurrentData(
        data.slice(currentPage * pageSize - pageSize, currentPage * pageSize)
      );
    }
  }, [currentPage, data]);
  const pageSize = 4;
  return (
    <section className={`${styles.container} ${styles.mini}`}>
      <div>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {mini ? "Заявки за последние 7 дней" : "Заявки"}
          </h2>
          <p className={styles.excel}>
            <img
              src={excel}
              className={styles.excel__icon}
              alt="Иконка excel"
            />
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

          {currentData.map((item) => (
            <li key={item.id}>
              <TableTaskItem item={item} />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.pagination}>
        <Pagination
          pageSize={pageSize}
          totalCount={list.length != 0 ? list.length : data.length/*Когда не работает бекенд! УБРАТЬ*/}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          style={"blue"}
        />
      </div>
    </section>
  );
};
