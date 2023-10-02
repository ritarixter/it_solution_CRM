import { FC, useEffect, useState } from "react";
import styles from "../Applications.module.scss";
import { useLocation, useNavigate } from "react-router";
import {
  addCommentApi,
  getListByIdApi,
  updateStepApi,
  uploadFiles,
} from "../../../utils/api";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { TList, TWorkAbdExecuter } from "../../../types";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { updateList } from "../../../services/slices/list";
import { BlockComments } from "../../../components/BlockComments/BlockComments";
import { importanceData, statusData } from "../ApplicationsItemTree/constants";
import { access } from "../../../utils/constants";
import { DropdownListForUsers } from "../../../components/DropdownList/DropdownListForUsers";
import { Performers } from "../../../components/Performers/Performers";
import { FilesBlock } from "../../../components/FilesBlock";
import { CommentsBlock } from "../../../components/CommentsBlock/CommentsBlock";
import { ApplicationsLayout } from "../../../components/ApplicationsLayout/ApplicationsLayout";
import { getStep } from "../../../services/slices/step";
import { changeCountNotify } from "../../../services/slices/user";

export const ApplicationsEngineer: FC = () => {
  const location = useLocation();
  const { list } = useAppSelector((state) => state.list);
  const { users, user } = useAppSelector((state) => state.user);
  const [currentList, setCurrentList] = useState<TList | null>(null);
  const headerData = [
    "Назначить бригаду",
    "Исполнители",
    "Файлы",
    "Комментарии",
  ];
  const [header, setHeader] = useState<string>("Назначить бригаду");
  const id_list = Number(location.pathname.slice(14));
  const dispatch = useAppDispatch();

  //ИЗМЕНЕНИЕ ИНФОРМАЦИИ
  const [files, setFiles] = useState<FormData | undefined>(undefined);
  const [textareaValue, setTextareaValue] = useState<string>("");

  const [fitters, setFitters] = useState<Array<TWorkAbdExecuter>>([]);
  const [dataFitters, setDataFitters] = useState<Array<TWorkAbdExecuter>>([]);

  //Получение информации о текущей заявке
  useEffect(() => {
    getListByIdApi(id_list).then((res) => {
      setCurrentList(res);
    });
  }, [list]);

  useEffect(() => {
    let arr = [...users];
    setFitters(arr.filter((item) => item.access === access.FITTER));
  }, [users]);

  const handleChangeList = () => {
    const fittersID = dataFitters.map((item) => {
      return item.id;
    });
    if (files) {
      uploadFiles(files).then((res) => {
        const listNew = {
          id: id_list,
          files: res,
          users: fittersID.length != 0 ? fittersID : undefined,
        };
        dispatch(updateList(listNew));
        if (currentList) {
          if (fittersID.length != 0) {
            updateStepApi(currentList.step.id, 3.1);
            dispatch(changeCountNotify(user.id, 1))
            dispatch(getStep())
          }
        }
      });
    } else {
      const listNew = {
        id: id_list,
        files: undefined,
        users: fittersID.length != 0 ? fittersID : undefined,
      };
      dispatch(updateList(listNew));
      if (currentList) {
        if (fittersID.length != 0) {
          updateStepApi(currentList.step.id, 3.1);
          dispatch(changeCountNotify(user.id, 1))
          dispatch(getStep())
        }
      }
    }

    if (textareaValue != "") {
      addCommentApi(id_list, user.id, textareaValue);
      setTextareaValue("");
    }
    setDataFitters([]);
    setFiles(undefined);
  };

  return (
    <ApplicationsLayout
      currentList={currentList}
      header={header}
      setHeader={setHeader}
      headerData={headerData}
    >
      {header === "Назначить бригаду" && (
        <div className={styles.popup_edit}>
          <form method="POST" className={styles.edit__container}>
            <DropdownListForUsers
              data={fitters}
              state={dataFitters}
              setState={setDataFitters}
              name="Состав бригады"
            />
            <div className={styles.manager__textarea}>
              <BlockComments
                setFiles={setFiles}
                value={textareaValue}
                setValue={setTextareaValue}
                files={files}
              />
            </div>
          </form>
          <div className={styles.editButton}>
            <BlockButton
              text={"Изменить"}
              disabled={
                dataFitters.length === 0 && !!!files && textareaValue === ""
              }
              onClick={() => handleChangeList()}
            />
          </div>
        </div>
      )}
      {header === "Исполнители" && (
        <Performers users={currentList?.users ? currentList?.users : []} />
      )}
      {header === "Файлы" && (
        <div className={styles.applications__container}>
          <FilesBlock fileData={currentList?.files ? currentList?.files : []} />
        </div>
      )}
      {header === "Комментарии" && <CommentsBlock />}
    </ApplicationsLayout>
  );
};
