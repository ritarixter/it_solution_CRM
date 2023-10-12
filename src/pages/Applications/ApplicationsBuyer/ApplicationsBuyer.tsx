import { FC, useEffect, useState } from "react";
import styles from "../Applications.module.scss";
import stylesCP from "../../CommercialProposal/CommercialProposal.module.scss";
import { useLocation, useNavigate } from "react-router";
import {
  addNotifyApi,
  getListByIdApi,
  updateStepApi,
  uploadFiles,
} from "../../../utils/api";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { IProducts, TCommercialProposal, TList } from "../../../types";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { downloadExcel } from "react-export-table-to-excel";
import { ExcelButton } from "../../../components/ExcelButton/ExcelButton";
import {
  formateDateShort,
  formateDateOnlyTime,
} from "../../../utils/utils-date";
import { v4 as uuidv4 } from "uuid";
import { titles } from "../../CommercialProposal/constants";
import { FilesBlock } from "../../../components/FilesBlock";
import { updateList } from "../../../services/slices/list";
import { CommentsBlock } from "../../../components/CommentsBlock/CommentsBlock";
import { ApplicationsLayout } from "../../../components/ApplicationsLayout/ApplicationsLayout";
import { getStep } from "../../../services/slices/step";
import { access, message } from "../../../utils/constants";

export const ApplicationsBuyer: FC = () => {
  const location = useLocation();
  const { list } = useAppSelector((state) => state.list);
  const [currentList, setCurrentList] = useState<TList | null>(null);
  const navigate = useNavigate();
  const { users } = useAppSelector((state) => state.user);
  const headerData = ["КП", "Файлы", "Комментарии"];
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
                  <div className={styles.excelButtons}>
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
                  </div>
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
                        <td className={stylesCP.row__item}>
                          {item.actualPrice}
                        </td>
                        <td className={stylesCP.row__item}>
                          {item.dateWarehouse
                            ? item.dateWarehouse
                            : "Не указана"}
                        </td>
                        <td className={stylesCP.row__item}>
                          {item.dateObject ? item.dateObject : "Не указана"}
                        </td>
                        <td className={stylesCP.row__item}>
                          {item.totalPrice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={stylesCP.buttons}>
                <div className={styles.bigWidthButton}>
                  <BlockButton
                    bigWidth={true}
                    text={"Отправить главному инженеру"}
                    onClick={() => {
                      const superuser = users.filter(
                        (user) => user.access === access.SUPERUSER
                      )[0];
                      if(currentList?.step && currentList?.step.agreementСonclusion_step10) {
                        updateStepApi(currentList?.step.id, 11);
                        addNotifyApi(id_list, [superuser.id], message[18]);
                      }
                      else if (currentList?.step && !currentList?.step.agreementСonclusion_step10) {
                        updateStepApi(currentList?.step.id, 6);
                        addNotifyApi(id_list, [superuser.id], message[8]);
                        dispatch(getStep());
                      }

                  alert('Отправлено главному инженеру')
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
              </div>
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
      )}{" "}
      {header === "Комментарии" && <CommentsBlock isAddComment={true}/>}
    </ApplicationsLayout>
  );
};
