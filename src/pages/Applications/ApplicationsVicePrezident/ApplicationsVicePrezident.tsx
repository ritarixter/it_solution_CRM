import { FC, useEffect, useState } from "react";
import styles from "../Applications.module.scss";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { TList, TUser } from "../../../types";
import { getListByIdApi, uploadFiles } from "../../../utils/api";
import { useLocation, useNavigate } from "react-router";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { ApplicationsVicePrezidentItem } from "./ApplicationsVicePrezidentItem";
import { Performers } from "../../../components/Performers/Performers";
import { FilesBlock } from "../../../components/FilesBlock";
import { updateList } from "../../../services/slices/list";
import { CommentsBlock } from "../../../components/CommentsBlock/CommentsBlock";
import { ApplicationsLayout } from "../../../components/ApplicationsLayout/ApplicationsLayout";

export const ApplicationsVicePrezident: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { list } = useAppSelector((state) => state.list);
  const [currentList, setCurrentList] = useState<TList | null>(null);
  const headerData = ["Маржинальность","Исполнители", "Файлы", "Комментарии"];
  const [header, setHeader] = useState<string>("Маржинальность");

  const id_list = Number(location.pathname.slice(14));
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<FormData | undefined>(undefined);

  //Получение информации о текущей заявке
  useEffect(() => {
    getListByIdApi(id_list).then((res) => {
      setCurrentList(res);
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
      {header === "Исполнители" && (
        <Performers users={currentList?.users ? currentList?.users : []} />
      )}
      {header === "Маржинальность" && (
        <div>
          {currentList?.commercialProposal ? (
            <ApplicationsVicePrezidentItem />
          ) : (
            "КП не создано"
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
      {header === "Комментарии" && <CommentsBlock />}
    </ApplicationsLayout>
  );
};
