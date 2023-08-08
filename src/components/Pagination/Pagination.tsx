import { FC } from "react";
import styles from "./Pagination.module.scss";
import { DOTS, usePagination } from "./hooks/usePagintaion";

export type TPagination = {
  pageSize: number; //Кол-во отображаемых элементов на странице
  totalCount: number; //Кол-во всех элементов
  currentPage: number; //Текущая отображаемая страница
  setCurrentPage: (value: number) => void; //Изменение текущей страницы
  siblingCount?: number; //Как отображается пагинация: < 1 ... 30 > (значение: 1); < 1 2 ... 29 30 >(2); < 1 2 3 ... 28 29 30 >(3)
  style?: "blue";
};

export const Pagination: FC<TPagination> = ({
  pageSize,
  totalCount,
  currentPage,
  setCurrentPage,
  siblingCount = 2,
  style,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange!.length < 2) {
    return null;
  }

  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  };
  let lastPage = paginationRange![paginationRange!.length - 1];

  return (
    <div className={styles.container}>
      <button
        className={`${styles.arrow} ${style === "blue" && styles.arrow__blue}`}
        onClick={onPrevious}
        disabled={currentPage === 1}
      >{`<`}</button>
      <ul className={styles.pagination}>
        {paginationRange!.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li className={styles.dots} key={index}>
                &#8230;
              </li>
            );
          }
          return (
            <li
              className={`${styles.pagination__item} ${
                style === "blue" && styles.pagination__item_blue
              } ${
                pageNumber === currentPage &&
                (style === "blue" ? styles.active__blue : styles.active)
              }`}
              onClick={() => setCurrentPage(Number(pageNumber))}
              key={index}
            >
              {" "}
              {pageNumber}
            </li>
          );
        })}
      </ul>
      <button
        className={`${styles.arrow} ${style === "blue" && styles.arrow__blue}`}
        onClick={onNext}
        disabled={currentPage === lastPage}
      >{`>`}</button>
    </div>
  );
};
