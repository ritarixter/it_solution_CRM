import { FC, useEffect, useState } from "react";
import styles from "../CommercialProposal.module.scss";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import { Wrapper } from "../../../components";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { useLocation, useNavigate } from "react-router";
import { Preloader } from "../../../components/Preloader/Preloader";
import { getByIdCommercialProposalApi } from "../../../utils/api";
import { TCommercialProposal } from "../../../types";
import excel_logo from "../../../images/icons/excel_logo.svg";
import { v4 as uuidv4 } from "uuid";
import { downloadExcel } from "react-export-table-to-excel";
import {
  formateDateShort,
  formateDateOnlyTime,
} from "../../../utils/utils-date";
import close from "../../../images/icons/close.svg";
import { Input } from "../../../components/Input";

type TEstimate = {
  id: string;
  name: string;
  products: Array<TExportArr>;
};

type TExportArr = {
  name: string;
  count: number;
  price: number;
  actualPrice: number;
  date: string;
};

export const CommercialProposalEstimate: FC = () => {
  const { isLoadingUser } = useAppSelector((state) => state.user);
  const [nameSmeta, setNameSmeta] = useState<string>("");
  const [nameSmetaError, setNameSmetaError] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const id_list = Number(location.pathname.slice(30));
  const [CP, setCP] = useState<TCommercialProposal>({
    id: 0,
    name: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    products: [],
    summa: " ",
    marginality: "",
  });
  const [estimates, setEstimates] = useState<TEstimate[]>([]);

  useEffect(() => {
    getByIdCommercialProposalApi(id_list).then(
      (res: { commercialProposal: TCommercialProposal }) => {
        res.commercialProposal.products.forEach((product) => {
          product.checked = false;
          product.isAddInSmeta = false;
        });
        setCP(res.commercialProposal);
      }
    );
  }, []);

  const toggleChecked = (id: number) => {
    let updatedList = CP.products.map((item) => {
      if (item.id == id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setCP({ ...CP, products: updatedList });
  };

  function handleDownloadExcel(exportArr: TEstimate) {
    downloadExcel({
      fileName: `${exportArr.name}`,
      sheet: "Сметы",
      tablePayload: {
        header: [
          "Наименование*",
          "Количество*",
          "Ед. изм.",
          "Цена продажи, руб",
          "Закупочная цена, руб",
          "Дата доставки",
        ],
        body: exportArr.products,
      },
    });
  }

  useEffect(() => {
    nameSmeta === "" ? setNameSmetaError(true) : setNameSmetaError(false);
  }, [nameSmeta]);

  return (
    <Wrapper>
      {isLoadingUser ? (
        <Preloader />
      ) : (
        <>
          <HeaderTop />
          <div className={`${styles.container} ${styles.container__estimate}`}>
            <div>
              <h2 className={styles.title}>
                КП "{CP?.name}" (оборудование + количество)
              </h2>
              <p className={styles.subtitle}>
                {" "}
                <span className={styles.subtitle__bold}>
                  №{id_list}
                </span> ОТ{" "}
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
              <div className={styles.inputSmetaName}>
                <Input
                  type="text"
                  name="Введите название"
                  value={nameSmeta}
                  setValue={setNameSmeta}
                  text={"Название сметы"}
                  error={nameSmetaError}
                />
              </div>
              <ul className={styles.list}>
                <li className={`${styles.list__row} ${styles.list__header}`}>
                  <span>Наименование</span> <span>Количество</span>
                </li>
                {CP?.products ? (
                  CP?.products.map((product) => (
                    <li
                      className={`${styles.list__row} ${
                        product.isAddInSmeta && styles.list__row_add
                      }`}
                    >
                      <label className={styles.list__name}>
                        <input
                          type="checkbox"
                          className={styles.list__checkbox}
                          checked={product.checked}
                          onChange={() => toggleChecked(product.id)}
                        />
                        {product.name}
                      </label>{" "}
                      <span className={styles.list__count}>
                        {product.count}
                      </span>
                    </li>
                  ))
                ) : (
                  <li>Продкутов нет</li>
                )}
              </ul>
              <div className={styles.buttons}>
                <BlockButton
                  text={"Составить смету"}
                  disabled={
                    CP.products.every((product) => !product.checked) ||
                    nameSmetaError
                  }
                  onClick={() => {
                    setEstimates([
                      ...estimates,
                      {
                        id: uuidv4(),
                        name: nameSmeta,
                        products: CP.products
                          .filter((item) => item.checked)
                          .map((item) => ({
                            name: item.name,
                            count: item.count,
                            units: item.units,
                            price: item.price,
                            actualPrice: item.actualPrice,
                            date: item.date ? item.date : "Не указана",
                          })),
                      },
                    ]);
                    setCP({
                      ...CP,
                      products: CP.products.map((item) =>
                        item.checked
                          ? { ...item, isAddInSmeta: true }
                          : item
                      ),
                    });
                    setNameSmeta("");
                  }}
                />
                <p
                  className={styles.cancel}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Отмена
                </p>
              </div>
            </div>
            <div>
              {" "}
              <h2 className={styles.title}>Сметы</h2>
              <ul className={styles.estimates}>
                {estimates.length > 0 ? (
                  estimates.map((estimate) => (
                    <li className={styles.estimate}>
                      <img src={excel_logo} alt="excel logo" />
                      <span
                        className={styles.estimate__name}
                        onClick={() => {
                          handleDownloadExcel(estimate);
                        }}
                      >
                        Скачать в XLS смету "{estimate.name}"
                      </span>
                      <img
                        className={styles.deleteEstimate}
                        src={close}
                        alt={"Удалить"}
                        onClick={() => {
                          let arr = estimates.filter(
                            (i) => i.id != estimate.id
                          );
                          setEstimates(arr);
                        }}
                      />
                    </li>
                  ))
                ) : (
                  <li>Смет нет</li>
                )}
              </ul>
            </div>
          </div>
        </>
      )}
    </Wrapper>
  );
};
