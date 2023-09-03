import { FC, useEffect, useState } from "react";
import styles from "./CommercialProposal.module.scss";
import { HeaderTop } from "../../components/HeaderTop/HeaderTop";
import { Wrapper } from "../../components";
import { useAppSelector } from "../../services/hooks";
import { useLocation, useNavigate } from "react-router";
import { Preloader } from "../../components/Preloader/Preloader";
import { TCommercialProposal } from "../../types/TCommercialProposal";
import { getByIdCommercialProposalApi } from "../../utils/api";
import { titles } from "./constants";
import { v4 as uuidv4 } from "uuid";
import { IProducts } from "../../types/TProducts";
import { formateDateOnlyTime, formateDateShort } from "../../utils/utils-date";
import { BlockButton } from "../../components/BlockButton/BlockButton";
import { ExcelButton } from "../../components/ExcelButton/ExcelButton";
import { downloadExcel } from "react-export-table-to-excel";

export const CommercialProposal: FC = () => {
  const { isLoadingUser } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const id_list = Number(location.pathname.slice(21));
  const [CP, setCP] = useState<TCommercialProposal>({
    id: 0,
    name: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    products: [],
  });

  function handleDownloadExcel() {
    const exportArr = CP.products.map((item) => ({
      name: item.name,
      count: item.count,
      units: item.units,
      price: item.price,
      actualPrice: item.actualPrice,
      date: item.date ? item.date : "Не указана",
      totalPrice: item.totalPrice,
      marginalityPrice: item.marginalityPrice,
    }));
    downloadExcel({
      fileName: `commercial_proposal_${CP.id}`,
      sheet: "Заявки",
      tablePayload: {
        header: [
          "Наименование*",
          "Количество*",
          "Ед.изм.*",
          "Цена продажи, руб",
          "Закупочная цена, руб",
          "Дата приезда на склад",
          "Сумма, руб",
          "Маржинальность, руб",
        ],
        body: exportArr,
      },
    });
  }
  useEffect(() => {
    getByIdCommercialProposalApi(id_list).then((res) => {
      setCP(res.commercialProposal);
    });
  }, []);
  return (
    <Wrapper>
      {isLoadingUser ? (
        <Preloader />
      ) : (
        <>
          <HeaderTop />
          <div className={styles.container}>
            <div className={styles.header}>
              <h2 className={styles.title}>КП "{CP?.name}"</h2>
              <ExcelButton onClick={handleDownloadExcel} />
            </div>
            <p className={styles.subtitle}>
              {" "}
              <span className={styles.subtitle__bold}>№{id_list}</span> ОТ{" "}
              <span className={styles.subtitle__bold}>
                {CP?.createdAt && formateDateShort(CP.createdAt)}
              </span>{" "}
              (ОБНОВЛЕНО{" "}
              <span className={styles.subtitle__bold}>
                {CP?.updatedAt && formateDateShort(CP.updatedAt)}
              </span>{" "}
              В{" "}
              <span className={styles.subtitle__bold}>
                {CP?.updatedAt && formateDateOnlyTime(CP.updatedAt)}
              </span>
              )
            </p>

            <table className={styles.table}>
              <thead className={styles.table__head}>
                <tr className={styles.row}>
                  {titles.map((title) => (
                    <th key={uuidv4()}>{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody className={styles.table__container}>
                {CP?.products.map((item: IProducts) => (
                  <tr className={`${styles.row} ${styles.row__watch}`}>
                    <td className={styles.row__item}>{item.name}</td>
                    <td className={styles.row__item}>{item.count}</td>
                    <td className={styles.row__item}>{item.units}</td>
                    <td className={styles.row__item}>{item.price}</td>
                    <td className={styles.row__item}>{item.actualPrice}</td>
                    <td className={styles.row__item}>
                      {item.date ? item.date : "Не указана"}
                    </td>
                    <td className={styles.row__item}>{item.totalPrice}</td>
                    <td className={styles.row__item}>
                      {item.marginalityPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.buttons}>
              <BlockButton text={"Принять КП"} onClick={() => {}} />
              <p
                className={styles.cancel}
                onClick={() => {
                  navigate(`/commercial-proposal/edit/${id_list}`);
                }}
              >
                Изменить
              </p>
            </div>
          </div>
        </>
      )}
    </Wrapper>
  );
};
