import { FC, useEffect, useState } from "react";
import styles from "./CommercialProposal.module.scss";
import { HeaderTop } from "../../components/HeaderTop/HeaderTop";
import { Wrapper } from "../../components";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { useLocation, useNavigate } from "react-router";
import { Preloader } from "../../components/Preloader/Preloader";
import { TCommercialProposal } from "../../types/TCommercialProposal";
import {
  addNotifyApi,
  getByIdCommercialProposalApi,
  updateStepApi,
} from "../../utils/api";
import { titles } from "./constants";
import { v4 as uuidv4 } from "uuid";
import { IProducts } from "../../types/TProducts";
import { formateDateOnlyTime, formateDateShort } from "../../utils/utils-date";
import { BlockButton } from "../../components/BlockButton/BlockButton";
import { ExcelButton } from "../../components/ExcelButton/ExcelButton";
import { downloadExcel } from "react-export-table-to-excel";
import { access, message } from "../../utils/constants";
import { getStep } from "../../services/slices/step";
import { TList } from "../../types";

export const CommercialProposal: FC = () => {
  const { user, users, isLoadingUser } = useAppSelector((state) => state.user);
  const { list } = useAppSelector((state) => state.list);
  const navigate = useNavigate();
  const location = useLocation();
  const id_list = Number(location.pathname.slice(21));
  const dispatch = useAppDispatch();
  const [currentList, setCurrentList] = useState<TList | null>(null);
  const [CP, setCP] = useState<TCommercialProposal>({
    id: 0,
    name: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    products: [],
    summaSale: "",
    summaBuy: "",
    marginality: "",
  });

  function handleDownloadExcel() {
    const exportArr = CP.products.map((item) => ({
      name: item.name,
      count: item.count,
      price: item.price,
      actualPrice: item.actualPrice,
      dateWarehouse: item.dateWarehouse ? item.dateWarehouse : "Не указана",
      dateObject: item.dateObject ? item.dateObject : "Не указана",
      totalPrice: item.totalPrice,
    }));
    downloadExcel({
      fileName: `commercial_proposal_${CP.id}`,
      sheet: "Заявки",
      tablePayload: {
        header: [
          "Наименование*",
          "Количество, шт*",
          "Цена продажи, руб",
          "Закупочная цена, руб*",
          "Дата приезда на склад",
          "Дата приезда на объект",
          "Сумма, руб",
        ],
        body: exportArr,
      },
    });
  }
  useEffect(() => {
    getByIdCommercialProposalApi(id_list).then((res) => {
      setCP(res.commercialProposal);
      setCurrentList(res);
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
                      {item.dateWarehouse ? item.dateWarehouse : "Не указана"}
                    </td>
                    <td className={styles.row__item}>
                      {item.dateObject ? item.dateObject : "Не указана"}
                    </td>
                    <td className={styles.row__item}>{item.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {user.access === access.VICEPREZIDENT && (
              <div className={styles.buttons__marginality}>
                <BlockButton
                  text={"Рассчитать маржинальность"}
                  bigWidth={true}
                  onClick={() => {
                    navigate(`/marginality/${id_list}`);
                  }}
                />
              </div>
            )}
            {user.access === access.SUPERUSER && (
              <div className={styles.buttons}>
                <div className={styles.buttonAksynia}>
                  <BlockButton
                    bigWidth={true}
                    text={"Отправить заместителю директора"}
                    onClick={() => {
                      const currentList = list.filter(
                        (item) => item.id === id_list
                      );
                      const viceprezident = users.filter(
                        (user) => user.access === access.VICEPREZIDENT
                      )[0];
                      updateStepApi(currentList[0].step.id, 7);
                      addNotifyApi(id_list, [viceprezident.id], message[9]);
                      dispatch(getStep());
                      navigate(`/applications/${id_list}`);
                    }}
                  />
                </div>
                {currentList?.step &&
                  currentList?.step.calcMarginality_step8 && (
                    <div className={styles.buttonAksynia}>
                      <BlockButton
                        bigWidth={true}
                        text={"Отправить юристам"}
                        onClick={() => {
                          let arr = [...list];
                          const currentList = arr.filter(
                            (item) => item.id === id_list
                          );
                          const lawyers = users
                            .filter((user) => user.access === access.LAWYER)
                            .map((item) => item.id);
                          updateStepApi(currentList[0].step.id, 9);
                          addNotifyApi(id_list, lawyers, message[13]);
                          dispatch(getStep());
                          navigate(`/applications/${id_list}`);
                        }}
                      />
                    </div>
                  )}
                <div className={styles.buttonAksynia}>
                  <BlockButton
                    bigWidth={true}
                    text={"Отправить на доработку закупщику"}
                    style={true}
                    onClick={() => {
                      let arr = [...list];
                      const currentList = arr.filter(
                        (item) => item.id === id_list
                      );
                      const buyer = users.filter(
                        (user) => user.access === access.BUYER
                      )[0];
                      updateStepApi(currentList[0].step.id, 7.1);
                      addNotifyApi(id_list, [buyer.id], message[10]);
                      dispatch(getStep());
                      navigate(`/applications/${id_list}`);
                    }}
                  />
                </div>

                <p
                  className={styles.cancel}
                  onClick={() => {
                    navigate(`/commercial-proposal/edit/${id_list}`);
                  }}
                >
                  Изменить
                </p>
              </div>
            )}

            {user.access === access.ENGINEER && (
              <div className={styles.buttons}>
                <div className={styles.buttonAksynia}>
                  <BlockButton
                    text={"Изменить"}
                    onClick={() => {
                      navigate(`/commercial-proposal/edit/${id_list}`);
                    }}
                  />
                </div>
                <p
                  className={styles.cancel}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Отмена
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </Wrapper>
  );
};
