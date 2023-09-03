import { FC, useEffect, useState } from "react";
import styles from "../Applications.module.scss";
import stylesCP from "../../CommercialProposal/CommercialProposal.module.scss"
import { useLocation, useNavigate } from "react-router";
import { ImpotanceBlock, StatusBlock, Wrapper } from "../../../components";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import { getListByIdApi} from "../../../utils/api";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { IProducts, TCommercialProposal, TList } from "../../../types";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { FileIcon } from "../../../components/File/FileIcon";
import { notFound } from "../../../utils/constants";
import { downloadExcel } from "react-export-table-to-excel";
import { ExcelButton } from "../../../components/ExcelButton/ExcelButton";
import { formateDateShort, formateDateOnlyTime } from "../../../utils/utils-date";
import { v4 as uuidv4 } from "uuid";
import { titles } from "../../CommercialProposal/constants";

export const ApplicationsBuyer: FC = () => {
  const location = useLocation();
  const { list } = useAppSelector((state) => state.list);
  const [currentList, setCurrentList] = useState<TList | null>(null);
  const navigate = useNavigate();

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
          "Количество, шт*",
          "Цена продажи, руб",
          "Закупочная цена, руб*",
          "Дата приезда на склад",
          "Сумма, руб",
          "Маржинальность, руб",
        ],
        body: exportArr,
      },
    });
  }

  const id_list = Number(location.pathname.slice(14));
  const dispatch = useAppDispatch();

  //Получение информации о текущей заявке
  useEffect(() => {
    getListByIdApi(id_list).then((res) => {
      setCurrentList(res);
      setCP(res.commercialProposal)
    });
  }, [list]);

  return (
    <Wrapper>
      <HeaderTop />
      <div className={styles.popup}>
        <div className={styles.infomation}>
          <div className={styles.infomation__container}>
            <h2 className={styles.conteiner_titleTree}>Текущая информация</h2>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>Название компании</p>
              <p className={styles.blockText_text}>
                {currentList?.company.nameCompany}
              </p>
            </div>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>Кодовое имя</p>
              <p className={styles.blockText_text}>{currentList?.name}</p>
            </div>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>Телефон</p>
              <p className={styles.blockText_text}>
                {currentList?.company.numberPhone}
              </p>
            </div>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>Почта</p>
              <p className={styles.blockText_text}>
                {currentList?.company.email
                  ? currentList.company.email
                  : notFound.NOT_SPECIFIED}
              </p>
            </div>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>Комментарий</p>
              <p className={styles.blockText_text}>
                {currentList?.description
                  ? currentList.description
                  : notFound.NO_COMMENTS}
              </p>
            </div>

            <div className={styles.blockInf}>
              <span>Статус: </span>
              <StatusBlock
                type={currentList?.status ? currentList.status : null}
              />
            </div>
            <div className={styles.blockInf}>
              <span>Важность: </span>
              <ImpotanceBlock
                type={currentList?.importance ? currentList.importance : null}
              />
            </div>
            <div className={styles.filesContainer}>
              {currentList?.files
                ? currentList.files.map((file) => (
                    <FileIcon name={file.name} url={file.url} />
                  ))
                : null}
            </div>
          </div>
        </div>

       {CP && CP.id !=0 ? <div className={stylesCP.container1}>
            <div className={stylesCP.header}>
              <h2 className={styles.conteiner_titleTree}>КП "{CP?.name}"</h2>
              <div className={styles.excelButtons}>
              <ExcelButton onClick={()=>{
                navigate(`/commercial-proposal/import/${id_list}`)
              }} text={"Загрузить КП"}/>
              <ExcelButton onClick={handleDownloadExcel} text={"Выгрузить КП"}/>
              </div>
            </div>
            <p className={stylesCP.subtitle}>
              {" "}
              <span className={stylesCP.subtitle__bold}>№{id_list}</span> ОТ{" "}
              <span className={stylesCP.subtitle__bold}>
                {CP?.createdAt && formateDateShort(CP.createdAt)}
              </span>{" "}
              (ОБНОВЛЕНО{" "}
              <span className={stylesCP.subtitle__bold}>
                {CP?.updatedAt && formateDateShort(CP.updatedAt)}
              </span>{" "}
              В{" "}
              <span className={stylesCP.subtitle__bold}>
                {CP?.updatedAt && formateDateOnlyTime(CP.updatedAt)}
              </span>
              )
            </p>

            <table className={stylesCP.table}>
              <thead className={stylesCP.table__head}>
                <tr className={stylesCP.row}>
                  {titles.map((title) => (
                    <th key={uuidv4()}>{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody className={stylesCP.table__container}>
                {CP?.products.map((item: IProducts) => (
                  <tr className={`${stylesCP.row} ${stylesCP.row__watch}`}>
                    <td className={stylesCP.row__item}>{item.name}</td>
                    <td className={stylesCP.row__item}>{item.count}</td>
                    <td className={stylesCP.row__item}>{item.units}</td>
                    <td className={stylesCP.row__item}>{item.price}</td>
                    <td className={stylesCP.row__item}>{item.actualPrice}</td>
                    <td className={stylesCP.row__item}>{item.date ? item.date : "Не указана"}</td>
                    <td className={stylesCP.row__item}>{item.totalPrice}</td>
                    <td className={stylesCP.row__item}>{item.marginalityPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={stylesCP.buttons}>
              <div className={styles.bigWidthButton}>
              <BlockButton bigWidth={true} text={"Отправить главному инженеру"} onClick={() => {}} />
              </div>
              <BlockButton text={"Составить сметы"} onClick={() => {
                navigate(`/commercial-proposal/estimate/${id_list}`)
              }} />
              <p
                className={stylesCP.cancel}
                onClick={() => {
                  navigate(`/commercial-proposal/edit/${id_list}`);
                }}
              >
                Изменить
              </p>
            </div>
          </div>:
          <div className={stylesCP.container1}> <h2 className={styles.conteiner_titleTree}>КП еще не создано</h2></div>
          }
      </div>
    </Wrapper>
  );
};
