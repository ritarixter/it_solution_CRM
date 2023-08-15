import { FC, useEffect, useState } from "react";
import styles from "./TableTask.module.scss";
import excel from "../../images/icons/excel_icon.svg";
import { titles, titlesManager, titlesMini } from "./constants";
import { Pagination } from "../Pagination";
import { v4 as uuidv4 } from "uuid";
import { TableTaskItem } from "./TableTaskItem/TableTaskItem";
import { TList } from "../../types";
import { Link } from "react-router-dom";
import { downloadExcel } from "react-export-table-to-excel";
import { formateDate } from "../../utils/utils-date";
import { useAppSelector } from "../../services/hooks";
import { PreloaderBlock } from "../PreloaderBlock/PreloaderBlock";
import { NOT_ASSIGNED, access } from "../../utils/constants";
import { ExcelButton } from "../ExcelButton/ExcelButton";

type TTableTask = {
  mini: boolean;
  list: Array<TList>;
  currentAccess: string; //"Менеджер" | "Главный инженер"
};
function addSevenDay(date = new Date()) {
  date.setDate(date.getDate() + 7);

  return date;
}
export const TableTask: FC<TTableTask> = ({ mini, list, currentAccess }) => {
  const { isLoadingTask } = useAppSelector((state) => state.task);
  const { isLoadingList } = useAppSelector((state) => state.list);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentData, setCurrentData] = useState<Array<TList>>([]);
  const [error, setError] = useState<boolean>(false);
  const pageSize = currentAccess === access.SUPERUSER ? (mini ? 3 : 7) : 7;

  function handleDownloadExcel() {
    let arr = [...list];
    const exportArr = arr.map((item) => ({
      company: item.company.nameCompany,
      name: item.name,
      createdAt: formateDate(item.createdAt),
      endDate: item.endDate ? formateDate(item.endDate) : "",
      customer: item.company.name,
      phone: item.company.numberPhone,
      implements: item.users
        ? item.users
            .map((user) => {
              return user.name;
            })
            .toString()
        : "",
      status: item.status || NOT_ASSIGNED,
      importance: item.importance || NOT_ASSIGNED,
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
        body: exportArr,
      },
    });
  }

  useEffect(() => {
    if (list.length != 0) {
      let arr = [...list];
      const date = addSevenDay();

      if (mini) {
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
      {isLoadingTask || isLoadingList ? (
        <PreloaderBlock />
      ) : (
        <>
          <div>
            <div className={styles.header}>
              <h2 className={styles.title}>
                {mini ? "Заявки за последние 7 дней" : "Заявки"}
              </h2>
              <ExcelButton onClick={handleDownloadExcel} />
            </div>
            <table className={`${styles.table} ${mini && styles.table_mini}`}>
              <thead key={uuidv4()}>
                <tr
                  className={`${styles.row} ${
                    mini ? styles.row_mini : styles.row_maxi
                  } ${styles.header}`}
                >
                  {mini &&
                    currentAccess === access.SUPERUSER &&
                    titlesMini.map((title, index) => (
                      <th key={index}>{title}</th>
                    ))}
                  {!mini &&
                    currentAccess === access.SUPERUSER &&
                    titles.map((title, index) => <th key={index}>{title}</th>)}
                  {!mini &&
                    currentAccess === access.ENGINEER &&
                    titles.map((title, index) => <th key={index}>{title}</th>)}
                  {mini &&
                    currentAccess === access.MANAGER &&
                    titlesManager.map((title, index) => (
                      <th key={index}>{title}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {!error ? (
                  currentData.map((item) => (
                    <TableTaskItem
                      item={item}
                      mini={mini}
                      currentAccess={currentAccess}
                    />
                  ))
                ) : (
                  <p className={styles.error}>Заявок нет</p>
                )}
              </tbody>
            </table>
          </div>
          <div
            className={`${styles.pagination} ${
              (!mini || currentAccess === access.MANAGER) &&
              styles.pagination_without
            }`}
          >
            {mini && currentAccess === access.SUPERUSER && (
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
        </>
      )}
    </section>
  );
};
