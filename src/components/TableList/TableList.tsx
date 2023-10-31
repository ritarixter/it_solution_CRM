import { FC, useEffect, useState } from "react";
import styles from "./TableList.module.scss";

import { Pagination } from "../Pagination";
import { v4 as uuidv4 } from "uuid";
//import { TableListItem } from "./TableListItem/TableListItem";
import { TList } from "../../types";
import { useLocation } from "react-router-dom";
import { downloadExcel } from "react-export-table-to-excel";
import { formateDate } from "../../utils/utils-date";
import { useAppSelector } from "../../services/hooks";
import { PreloaderBlock } from "../PreloaderBlock/PreloaderBlock";
import { NOT_ASSIGNED, access } from "../../utils/constants";
import { ExcelButton } from "../ExcelButton/ExcelButton";
import { titlesTest } from "../TableTask/constants";
import { TableListItem } from "./TableListItem/TableListItem";
import useResize from "../../hooks/useResize";

type TTableList = {
  list: Array<TList>;
  titleTable: "Заявки" | "История заявок";
};

export const TableList: FC<TTableList> = ({ list, titleTable }) => {
  const { isLoadingList } = useAppSelector((state) => state.list);
  const { user } = useAppSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentData, setCurrentData] = useState<Array<TList>>([]);
  const [error, setError] = useState<boolean>(false);
  const [titles, setTitles] = useState<string[]>([]);
  const { width } = useResize();
  const pageSize = 7;

  useEffect(() => {
    setTitles(titlesTest);
  }, []);

  const sliceTitles = (end: number) => {
    setTitles(titlesTest.slice(0, end));
  };

  console.log(width);
  useEffect(() => {
    //АДАПТИВ
    if (width > 1790) {
      setTitles(titlesTest);
    }
    if (width <= 1790 && width > 1500) {
      sliceTitles(titlesTest.length - 1);
    }

    if (width <= 1500 && width > 1312) {
      sliceTitles(titlesTest.length - 2);
    }

    if (width <= 1312 && width > 1192) {
      sliceTitles(titlesTest.length - 3);
    }

    if (width <= 1192 && width > 1072) {
      sliceTitles(titlesTest.length - 4);
    }

    if (width <= 1072 && width > 921) {
      sliceTitles(titlesTest.length - 5);
    }

    if (width <= 921 && width > 781) {
      sliceTitles(titlesTest.length - 6);
    }

    if (width <= 781 && width > 484) {
      sliceTitles(titlesTest.length - 7);
    }

    if (width <= 484 && width > 373) {
      sliceTitles(titlesTest.length - 8);
    }

    if (width <= 373) {
      setTitles([titlesTest[0], titlesTest[2], titlesTest[3]]);
    }
  }, [width]);

  const style = {
    gridTemplateColumns: `25px repeat(${
      titles.length - 1
    }, minmax(105px, 1fr))`,
  };

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
      if (user.access === access.ENGINEER) {
        //Фильтр заявок для определенного менеджера, с бека не работает
        arr = arr.filter((list) =>
          list.users.some((cuurUser) => cuurUser.id === user.id)
        );
      }
      setCurrentData(
        arr.slice(currentPage * pageSize - pageSize, currentPage * pageSize)
      );
      setError(false);
    } else {
      setError(true);
    }
  }, [currentPage, list]);

  return (
    <section className={`${styles.container}`}>
      {isLoadingList ? (
        <PreloaderBlock />
      ) : (
        <>
          <div>
            <div className={styles.header}>
              <h2 className={styles.title}>{titleTable}</h2>

              <ExcelButton onClick={handleDownloadExcel} />
            </div>
            <table className={`${styles.table}`}>
              <thead key={uuidv4()}>
                <tr
                  className={`${styles.row} ${styles.row__header}  `}
                  style={style}
                >
                  {titles.map((title, index) => (
                    <th key={index}>{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {!error ? (
                  currentData.map((item) => (
                    <TableListItem
                      columnCount={titles.length}
                      style={style}
                      item={item}
                    />
                  ))
                ) : (
                  <p className={styles.error}>Заявок нет</p>
                )}
              </tbody>
            </table>
          </div>
          <div
            className={styles.pagination}
            //   (!mini || currentAccess === access.MANAGER) &&
            //   styles.pagination_without
          >
            {/* {mini &&
              currentAccess === access.SUPERUSER &&
              location.pathname != "/applications/history" && (
                <Link className={styles.linkAll} to="/applications">
                  Смотреть все
                </Link>
              )} */}

            <Pagination
              pageSize={pageSize}
              totalCount={list.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      )}
    </section>
  );
};
