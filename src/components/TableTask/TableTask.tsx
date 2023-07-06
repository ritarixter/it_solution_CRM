import { FC, useEffect, useRef, useState } from "react";
import styles from "./TableTask.module.scss";
import excel from "../../images/icons/excel_icon.svg";
import { data, titles, titlesMini } from "./constants";
import { Pagination } from "../Pagination";
import { v4 as uuidv4 } from "uuid";
import { TableTaskItem } from "./TableTaskItem/TableTaskItem";
import { TList } from "../../types";
import { Link } from "react-router-dom";
import { DownloadTableExcel, downloadExcel } from "react-export-table-to-excel";
import { formateDate } from "../../utils/utils-date";

type TTableTask = {
  mini: boolean;
  list: Array<TList>;
};
function addSevenDay(date = new Date()) {
  date.setDate(date.getDate() + 7);

  return date;
}
export const TableTask: FC<TTableTask> = ({ mini, list }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentData, setCurrentData] = useState<Array<TList>>([]);
  const [error, setError] = useState<boolean>(false);
  const pageSize = mini ? 3 : 7;

  function handleDownloadExcel() {
    let arr = [...list];
    const exportArr = arr.map((item) => ({
      company: item.company.nameCompany,
      name: item.name,
      createdAt: formateDate(item.createdAt),
      endDate: formateDate(item.endDate),
      customer: item.company.name,
      phone: item.company.numberPhone,
      implements: item.users
        .map((user) => {
          return user.name;
        })
        .toString(),
      status: item.status || "Не назначено",
      importance: item.importance || "Не назначено",
      description: item.description || "",
    }));
    downloadExcel({
      fileName: "list_table",
      sheet: "Заявки",
      tablePayload: {
        header: [
          "Организация",
          "Кодовое имя",
          "Дата создания",
          "Дедлайн",
          "ФИО",
          "Телефон",
          "Исполнители",
          "Статус",
          "Приоритет",
          "Описание",
        ],
        // accept two different data structures
        body: exportArr,
      },
    });
  }

  useEffect(() => {
    if (list.length != 0) {
      let arr = [...list];
      const date = addSevenDay();

      if (mini) {
        /* let date = new Date();
        arr = arr.filter(
          (item) => {
            console.log(date + ' < ' + item.createdAt)
            if (date < item.createdAt) {
              return item;
            }
          } //Заявки за 7 дней
        );*/
        setCurrentData(
          arr.slice(currentPage * pageSize - pageSize, currentPage * pageSize)
        );
      } else {
        setCurrentData(
          arr.slice(currentPage * pageSize - pageSize, currentPage * pageSize)
        );
      }

      setError(false);
    } else {
      setError(true);
    }
  }, [currentPage, list]);

  return (
    <section className={`${styles.container} ${mini && styles.mini}`}>
      <div>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {mini ? "Заявки за последние 7 дней" : "Заявки"}
          </h2>
          <p className={styles.excel} onClick={handleDownloadExcel}>
            <img
              src={excel}
              className={styles.excel__icon}
              alt="Иконка excel"
            />
            Экспорт
          </p>
        </div>
        <table className={`${styles.table} ${mini && styles.table_mini}`}>
          <thead key={uuidv4()}>
            <tr
              className={`${styles.row} ${
                mini ? styles.row_mini : styles.row_maxi
              } ${styles.header}`}
            >
              {mini
                ? titlesMini.map((title, index) => <th key={index}>{title}</th>)
                : titles.map((title, index) => <th key={index}>{title}</th>)}
            </tr>
          </thead>
          <tbody>
            {!error ? (
              currentData.map((item) => (
                <TableTaskItem item={item} mini={mini} />
              ))
            ) : (
              <p className={styles.error}>Заявок нет</p>
            )}
          </tbody>
        </table>
      </div>
      <div
        className={`${styles.pagination} ${!mini && styles.pagination_without}`}
      >
        {mini && (
          <Link className={styles.linkAll} to="/applications">
            Смотреть все
          </Link>
        )}

        <Pagination
          pageSize={pageSize}
          totalCount={list.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          style={mini ? "blue" : undefined}
        />
      </div>
    </section>
  );
};
