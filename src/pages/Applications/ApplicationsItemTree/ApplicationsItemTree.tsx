import { FC, useEffect, useState } from "react";
import styles from "../Applications.module.scss";
import { useLocation, useNavigate } from "react-router";
import {
  ImpotanceBlock,
  StatusBlock,
  UserBlock,
  Wrapper,
} from "../../../components";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import {
  addCommentApi,
  getListByIdApi,
  updateStepApi,
  uploadFiles,
} from "../../../utils/api";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { TList, TWorkAbdExecuter } from "../../../types";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { ApplicationTree } from "../../../components/ApplicationTree/ApplicationTree";
import { getList, updateList } from "../../../services/slices/list";
import { FileIcon } from "../../../components/File/FileIcon";
import { BlockComments } from "../../../components/BlockComments/BlockComments";
import { DropdownList } from "../../../components/DropdownList";
import { importanceData, statusData } from "./constants";
import {
  NOT_ASSIGNED,
  NOT_ASSIGNED_DEAD,
  access,
  notFound,
} from "../../../utils/constants";
import { DropdownListForUsers } from "../../../components/DropdownList/DropdownListForUsers";
import { Performers } from "../../../components/Performers/Performers";
import { Input } from "../../../components/Input";
import { DropdownListWithID } from "../../../components/DropdownList/DropdownListWithID/DropdownListWithID";
import { FilesBlock } from "../../../components/FilesBlock";
import { CommentsBlock } from "../../../components/CommentsBlock/CommentsBlock";
import { ApplicationsLayout } from "../../../components/ApplicationsLayout/ApplicationsLayout";
import { getStep } from "../../../services/slices/step";
import { changeCountNotify } from "../../../services/slices/user";
import { PopupDeadline } from "../../../components/PopupDeadline/PopupDeadline";
import { DeadlineSetting } from "../../../components/DeadlineSetting/DeadlineSetting";

export const ApplicationsItemTree: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { users, user } = useAppSelector((state) => state.user);
  const { list } = useAppSelector((state) => state.list);
  const [currentList, setCurrentList] = useState<TList | null>(null);
  const headerData = [
    "Изменить информацию",
    "Обследование",
    "Дерево",
    "Исполнители",
    "Файлы",
    "Комментарии",
  ];
  const [header, setHeader] = useState<string>("Изменить информацию");
  const id_list = Number(location.pathname.slice(14));
  const dispatch = useAppDispatch();
  const [workNameValue, setWorkNameValue] = useState("");
  const [workNameValueError, setWorkNameValueError] = useState<boolean>(false);
  const [openDeadline, setOpenDeadline] = useState(false);

  //ИЗМЕНЕНИЕ ИНФОРМАЦИИ
  const [files, setFiles] = useState<FormData | undefined>(undefined);
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [importance, setImportance] = useState<string>(importanceData[0]);
  const [status, setStatus] = useState<string>(statusData[0]);
  const [engineer, setEngineer] = useState<TWorkAbdExecuter>({
    name: "Выберите",
    id: -1,
  });
  const [engineerDefault, setEngineerDefault] = useState<TWorkAbdExecuter>({
    name: "Выберите",
    id: -1,
  });
  const [engineerError, setEngineerError] = useState<boolean>(false);
  const [dataEngineer, setDataEngineer] = useState<Array<TWorkAbdExecuter>>([]);
  //Получение информации о текущей заявке\
  useEffect(() => {
    getListByIdApi(id_list).then((res: TList) => {
      setCurrentList(res);
      setWorkNameValue(res.name ? res.name : "");

      if (res.users) {
        const engineer = res.users.filter(
          (user) => user.access === access.ENGINEER
        );
        setEngineer({
          name: engineer[0] ? engineer[0].name : "Выберите",
          id: engineer[0] ? engineer[0].id : -1,
        });
        setEngineerDefault({
          name: engineer[0] ? engineer[0].name : "Выберите",
          id: engineer[0] ? engineer[0].id : -1,
        });
      }

      if (res.importance) {
        setImportance(res.importance);
      }
      if (res.status) {
        setStatus(res.status);
      }
      // if (res.description) {
      //   setTextareaValue(res.description);
      // }
    });
  }, [list]);

  useEffect(() => {
    let arr = [...users];
    arr = arr.filter((item) => item.access === access.ENGINEER);
    setDataEngineer(arr.map((item) => ({ name: item.name, id: item.id })));
  }, [users]);

  useEffect(() => {
    if (workNameValue.length > 1 && workNameValue.length < 30) {
      setWorkNameValueError(false);
    } else {
      setWorkNameValueError(true);
    }

    if (engineer.name === "Выберите") {
      setEngineerError(true);
    } else {
      setEngineerError(false);
    }
  }, [workNameValue, engineer]);

  const handleChangeList = () => {
    if (engineerError || workNameValueError) {
    } else {
      if (files) {
        uploadFiles(files).then((res) => {
          const listNew = {
            id: id_list,
            files: res,
            name:
              workNameValue === currentList?.name ? undefined : workNameValue,
            importance:
              importance === currentList?.importance ? undefined : importance,
            status: status === currentList?.status ? undefined : status,
            users: engineer != engineerDefault ? [engineer.id] : undefined,
          };
          dispatch(updateList(listNew));
          setFiles(undefined);
          if (currentList?.step)
            if (engineer != engineerDefault) {
              updateStepApi(currentList?.step.id, 2);
              dispatch(changeCountNotify(user.id, 1));
              dispatch(getStep());
            }
        });
      } else {
        const listNew = {
          id: id_list,
          name: workNameValue === currentList?.name ? undefined : workNameValue,
          files: undefined,
          importance:
            importance === currentList?.importance ? undefined : importance,
          status: status === currentList?.status ? undefined : status,
          users: engineer != engineerDefault ? [engineer.id] : undefined,
        };
        dispatch(updateList(listNew));
        if (currentList?.step)
          if (engineer != engineerDefault) {
            updateStepApi(currentList?.step.id, 2);
            dispatch(changeCountNotify(user.id, 1));
            dispatch(getStep());
          }
      }
      dispatch(getList());
      if (textareaValue != "") {
        addCommentApi(id_list, user.id, textareaValue);
        setTextareaValue("");
      }
    }
  };

  return (
    <ApplicationsLayout
      currentList={currentList}
      header={header}
      setHeader={setHeader}
      headerData={headerData}
    >
      {header === "Дерево" && (
        <ApplicationTree
          users={currentList?.users ? currentList?.users : []}
          list={currentList}
        />
      )}{" "}
      {header === "Изменить информацию" && (
        <div className={styles.popup_edit}>
          <form method="POST" className={styles.edit__container}>
            <Input
              type={"text"}
              name={"Введите кодовое имя"}
              text={"Кодовое имя*"}
              value={workNameValue}
              setValue={setWorkNameValue}
              error={workNameValueError}
              errorText={"Длина от 2 до 30 символов"}
            />
            <div className={styles.dropdownlist_padding}>
              <DropdownListWithID
                data={dataEngineer}
                state={engineer}
                setState={setEngineer}
                name={"Ответсвенный инженер*"}
                error={engineerError}
              />
            </div>
            <div className={styles.dropdownlist_padding}>
              <DropdownList
                data={statusData}
                setState={setStatus}
                state={status}
                name={"Статус"}
              />
            </div>
            <div className={styles.dropdownlist_padding}>
              <DropdownList
                data={importanceData}
                setState={setImportance}
                state={importance}
                name={"Важность"}
              />
            </div>
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
                workNameValue === currentList?.name &&
                engineer.id === engineerDefault.id &&
                importance === currentList?.importance &&
                status === currentList?.status &&
                textareaValue === "" &&
                !!!files
              }
              onClick={() => handleChangeList()}
            />
          </div>
        </div>
      )}
      {header === "Обследование" && (
        <DeadlineSetting text={"Установите дедлайн по договору"} onClick={() => {}}/>
        // <div className={styles.survey}>
        //   <div className={styles.survey_container}>
        //     {currentList?.files.map((file) => (
        //       <p className={styles.survey_item}>
        //         <FileIcon name={file.name} url={file.url} fullName={true} />
        //       </p>
        //     ))}
        //   </div>
        //   <div className={styles.survey_btn}>
        //     <BlockButton
        //       text={"Завершить обследование"}
        //       onClick={() => {
        //         setOpenDeadline(true);
        //       }}
        //       bigWidth={true}
        //     />
        //   </div>
        //   <PopupDeadline setOpen={setOpenDeadline} open={openDeadline} />
        // </div>
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
