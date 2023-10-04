import { FC, useEffect, useState } from "react";
import styles from "../Applications.module.scss";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { TList } from "../../../types";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { useLocation, useNavigate } from "react-router";
import { getListByIdApi, updateStepApi, uploadFiles } from "../../../utils/api";
import { FilesBlock } from "../../../components/FilesBlock";
import { updateList } from "../../../services/slices/list";
import { Input } from "../../../components/Input";


import { CommentsBlock } from "../../../components/CommentsBlock/CommentsBlock";
import { ApplicationsLayout } from "../../../components/ApplicationsLayout/ApplicationsLayout";
import { getStep } from "../../../services/slices/step";
import { changeCountNotify } from "../../../services/slices/user";
import { DeadlineSetting } from "../../../components/DeadlineSetting/DeadlineSetting";

export const ApplicationsLawyer: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { list } = useAppSelector((state) => state.list);
  const [currentList, setCurrentList] = useState<TList | null>(null);
  const { user } = useAppSelector((state) => state.user);
  const id_list = Number(location.pathname.slice(14));
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<FormData | undefined>(undefined);
  const [deadline, setDeadline] = useState("Выберите дату");
  const [openCalendar, setOpenCalendar] = useState(false);
  const [clickedDay, setClickedDay] = useState<String>();
  const [showDeadline, setShowDeadline] = useState(false);
  const headerData = ["Файлы", "Дедлайн", "Комментарии"];
  const [header, setHeader] = useState<string>("Файлы");

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
      {header === "Дедлайн" && (
        <DeadlineSetting text={"Установите дедлайн по договору"} onClick={() => {}}/>
      )}{" "}
      {header === "Комментарии" && <CommentsBlock />}
    </ApplicationsLayout>
  );
};
