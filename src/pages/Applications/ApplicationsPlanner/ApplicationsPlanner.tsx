import { FC, useEffect, useState } from "react";
import styles from "../Applications.module.scss";
import { useLocation } from "react-router";
import {
  addNotifyApi,
  getListByIdApi,
  updateStepApi,
  uploadFiles,
} from "../../../utils/api";
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
import { access, message } from "../../../utils/constants";
import { getStep } from "../../../services/slices/step";
export const ApplicationsPlanner: FC = () => {
  const location = useLocation();
  const { list } = useAppSelector((state) => state.list);
  const { users } = useAppSelector((state) => state.user);
  const [currentList, setCurrentList] = useState<TList | null>(null);
  const headerData = ["Файлы", "КП"];
  const [header, setHeader] = useState<string>("Файлы");
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
      const superuser = users.filter(
        (user) => user.access === access.SUPERUSER
      )[0];
      if(currentList?.step) {
        updateStepApi(currentList?.step.id, 13)
      }
      addNotifyApi(id_list, [superuser.id], message[20]);
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
