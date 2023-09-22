import { FC, useEffect, useState } from "react";
import styles from "../Applications.module.scss";
import { useLocation } from "react-router";
import { getListByIdApi, updateStepApi, uploadFiles } from "../../../utils/api";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { IProducts, TCommercialProposal, TList } from "../../../types";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { FilesBlock } from "../../../components/FilesBlock";
import { updateList } from "../../../services/slices/list";
import stylesCP from "../../CommercialProposal/CommercialProposal.module.scss";
import {
  formateDateOnlyTime,
  formateDateShort,
} from "../../../utils/utils-date";
import { titlesPlanner } from "../../CommercialProposal/constants";
import { v4 as uuidv4 } from "uuid";
import { ApplicationsLayout } from "../../../components/ApplicationsLayout/ApplicationsLayout";
export const ApplicationsPlanner: FC = () => {
  const location = useLocation();
  const { list } = useAppSelector((state) => state.list);
  const [currentList, setCurrentList] = useState<TList | null>(null);
  const headerData = ["Файлы", "КП"];
  const [header, setHeader] = useState<string>("КП");
  const [files, setFiles] = useState<FormData | undefined>(undefined);
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
  // function handleDownloadExcel() {
  //   const exportArr = CP.products.map((item) => ({
  //     name: item.name,
  //     count: item.count,
  //     price: item.price,
  //     actualPrice: item.actualPrice,
  //     date: item.date ? item.date : "Не указана",
  //     totalPrice: item.totalPrice,
  //     marginalityPrice: item.marginalityPrice,
  //   }));
  //   downloadExcel({
  //     fileName: `commercial_proposal_${CP.id}`,
  //     sheet: "Заявки",
  //     tablePayload: {
  //       header: [
  //         "Наименование*",
  //         "Количество, шт*",
  //         "Цена продажи, руб",
  //         "Закупочная цена, руб*",
  //         "Дата приезда на склад",
  //         "Сумма, руб",
  //         "Маржинальность, руб",
  //       ],
  //       body: exportArr,
  //     },
  //   });
  // }

  const id_list = Number(location.pathname.slice(14));
  const dispatch = useAppDispatch();

  //Получение информации о текущей заявке
  useEffect(() => {
    getListByIdApi(id_list).then((res) => {
      setCurrentList(res);
      setCP(res.commercialProposal);
    });
  }, [list]);

  const handleUploadFiles = () => {
    uploadFiles(files).then((res) => {
      const listNew = {
        id: id_list,
        files: res,
      };
      dispatch(updateList(listNew));
      setFiles(undefined);
    });
  };

  return (
    <ApplicationsLayout
      currentList={currentList}
      header={header}
      setHeader={setHeader}
      headerData={headerData}
    >
      {header === "КП" && (
        <div className={styles.infomation__container}>
          {CP && CP.id != 0 ? (
            <>
              <div>
                <div className={stylesCP.header}>
                  <h2
                    className={`${styles.conteiner_titleTree} ${styles.conteiner_titleTree_mt0}`}
                  >
                    КП "{CP?.name}"
                  </h2>
                  {/* <div className={styles.excelButtons}>
                        <ExcelButton
                          onClick={() => {
                            navigate(`/commercial-proposal/import/${id_list}`);
                          }}
                          text={"Загрузить КП"}
                        />
                        <ExcelButton
                          onClick={handleDownloadExcel}
                          text={"Выгрузить КП"}
                        />
                      </div> */}
                </div>
                <p className={stylesCP.subtitle}>
                  {" "}
                  <span className={stylesCP.subtitle__bold}>
                    №{id_list}
                  </span> ОТ{" "}
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
                      {titlesPlanner.map((title) => (
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* <div className={stylesCP.buttons}>
                    <div className={styles.bigWidthButton}>
                      <BlockButton
                        bigWidth={true}
                        text={"Отправить главному инженеру"}
                        onClick={() => {
                          currentList?.step &&
                            updateStepApi(currentList?.step.id, 4);
                          navigate("/applications");
                        }}
                      />
                    </div>
                    <BlockButton
                      text={"Составить сметы"}
                      onClick={() => {
                        navigate(`/commercial-proposal/estimate/${id_list}`);
                      }}
                    />
                    <p
                      className={stylesCP.cancel}
                      onClick={() => {
                        navigate(`/commercial-proposal/edit/${id_list}`);
                      }}
                    >
                      Изменить
                    </p>
                  </div> */}
            </>
          ) : (
            <p>КП еще не создано</p>
          )}
        </div>
      )}
      {header === "Файлы" && (
        <div className={styles.infomation__container}>
          <FilesBlock
            fileData={currentList?.files ? currentList?.files : []}
            addFile={true}
            setFiles={setFiles}
            files={files}
          />
          <BlockButton
            text={"Сохранить"}
            disabled={files === undefined}
            onClick={handleUploadFiles}
          />
        </div>
      )}
    </ApplicationsLayout>
  );
};
