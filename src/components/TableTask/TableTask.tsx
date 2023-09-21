import { FC, useEffect, useState } from "react";
import styles from "./TableTask.module.scss";
import excel from "../../images/icons/excel_icon.svg";
import { titles, titlesHistory, titlesManager, titlesMini } from "./constants";
import { Pagination } from "../Pagination";
import { v4 as uuidv4 } from "uuid";
import { TableTaskItem } from "./TableTaskItem/TableTaskItem";
import { TList } from "../../types";
import { Link, useLocation } from "react-router-dom";
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
  const { isLoadingList } = useAppSelector((state) => state.list);
  const { user } = useAppSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentData, setCurrentData] = useState<Array<TList>>([]);
  const [error, setError] = useState<boolean>(false);
  const location = useLocation();
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
      { isLoadingList ? (
        <PreloaderBlock />
      ) : (
        <>
          <div>
            <div className={styles.header}>
              <h2 className={styles.title}>
                {location.pathname != "/applications/history"
                  ? mini
                    ? "Заявки за последние 7 дней"
                    : "Заявки"
                  : "История заявок"}
              </h2>
              <div className={styles.title__block}>
                {(user.access === access.SUPERUSER ||
                  user.access === access.VICEPREZIDENT) &&
                  location.pathname != "/applications/history" && (
                    <Link
                      to={"/applications/history"}
                      className={styles.historyButton}
                    >
                      История заявок
                    </Link>
                  )}
                <ExcelButton onClick={handleDownloadExcel} />
              </div>
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
                    location.pathname != "/applications/history" &&
                    titlesMini.map((title, index) => (
                      <th key={index}>{title}</th>
                    ))}
                  {!mini &&
                    currentAccess === access.SUPERUSER &&
                    location.pathname != "/applications/history" &&
                    titles.map((title, index) => <th key={index}>{title}</th>)}
                  {mini &&
                    location.pathname === "/applications/history" &&
                    titlesHistory.map((title, index) => (
                      <th key={index}>{title}</th>
                    ))}
                  {!mini &&
                    currentAccess === access.ENGINEER &&
                    location.pathname != "/applications/history" &&
                    titles.map((title, index) => <th key={index}>{title}</th>)}
                  {mini &&
                    currentAccess === access.MANAGER &&
                    location.pathname != "/applications/history" &&
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
