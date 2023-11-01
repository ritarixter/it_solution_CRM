import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ApplicationTree } from "../../../components/ApplicationTree/ApplicationTree";
import { ApplicationsLayout } from "../../../components/ApplicationsLayout/ApplicationsLayout";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { BlockComments } from "../../../components/BlockComments/BlockComments";
import { CommentsBlock } from "../../../components/CommentsBlock/CommentsBlock";
import { DeadlineSetting } from "../../../components/DeadlineSetting/DeadlineSetting";
import { DropdownList } from "../../../components/DropdownList";
import { DropdownListWithID } from "../../../components/DropdownList/DropdownListWithID/DropdownListWithID";
import { FileIcon } from "../../../components/File/FileIcon";
import { FilesBlock } from "../../../components/FilesBlock";
import { Input } from "../../../components/Input";
import { Performers } from "../../../components/Performers/Performers";
import { PopupDeadline } from "../../../components/PopupDeadline/PopupDeadline";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { getList, updateList } from "../../../services/slices/list";
import { getStep } from "../../../services/slices/step";
import { getUser } from "../../../services/slices/user";
import { TFile, TList, TUser, TWorkAbdExecuter } from "../../../types";
import {
  addCommentApi,
  addNotifyApi,
  getListByIdApi,
  updateNotifyApi,
  updateStepApi,
  uploadFiles,
} from "../../../utils/api";
import { access, message } from "../../../utils/constants";
import styles from "../Applications.module.scss";
import { importanceData, statusData } from "./constants";

export const ApplicationsItemTree: FC = () => {
  const location = useLocation();
  const { users, user } = useAppSelector((state) => state.user);
  const { list } = useAppSelector((state) => state.list);
  const [currentList, setCurrentList] = useState<TList | null>(null);
  const headerData = [
    "Изменить информацию",
    "Дерево",
    "Исполнители",
    "Обследование",
    "Монтаж",
    "Файлы",
    "Комментарии",
  ];
  const [header, setHeader] = useState<string>("Изменить информацию");
  const id_list = Number(location.pathname.slice(14));
  const dispatch = useAppDispatch();
  const [workNameValue, setWorkNameValue] = useState("");
  const [workNameValueError, setWorkNameValueError] = useState<boolean>(false);
  const [openDeadline, setOpenDeadline] = useState(false);
  const [deadlineForInspection, setDeadlineForInspection] =
    useState("Выберите дату");
  const [deadlineForFitter, setDeadlineForFitter] = useState("Выберите дату");
  const [deadlineForCP, setDeadlineForCP] = useState("Выберите дату");
  const [showDeadlineEdit, setShowDeadlineEdit] = useState<boolean>(false);
  const [showDeadlineFitterEdit, setShowDeadlineFitterEdit] =
    useState<boolean>(false);
  //ИЗМЕНЕНИЕ ИНФОРМАЦИИ
  const [files, setFiles] = useState<FormData | undefined>(undefined);
  const [filesFromInspection, setFilesFromInspection] = useState<Array<TFile>>(
    []
  );
  const [filesFromFitter, setFilesFromFitter] = useState<Array<TFile>>([]);
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
  const [planner, setPlanner] = useState<TUser>();
  //Получение информации о текущей заявке\
  useEffect(() => {
    dispatch(getUser());
  }, []);

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

      if (res.endDateForInspection) {
        setDeadlineForInspection(res.endDateForInspection);
      }

      if (res.endDateForFitters) {
        setDeadlineForFitter(res.endDateForFitters);
      }

      if (res.endDateForCP) {
        setDeadlineForCP(res.endDateForCP);
      }

      if (res.files) {
        setFilesFromInspection(
          res.files.filter((file) => file.url.includes("inspection"))
        );
        setFilesFromFitter(
          res.files.filter((file) => file.url.includes("fitter"))
        );
      }
      // if (res.description) {
      //   setTextareaValue(res.description);
      // }
    });
  }, [list]);

  useEffect(() => {
    const arr = [...users];
    let engineersCurrent = arr.filter(
      (item) => item.access === access.ENGINEER
    );
    setDataEngineer(
      engineersCurrent.map((item) => ({ name: item.name, id: item.id }))
    );
    setPlanner(arr.filter((item) => item.access === access.PLANNER)[0]);
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
          if (
            currentList?.step.WorkCertificate_step16 &&
            !currentList.step.SignTheAct_step17
          ) {
            const lawyer = users.filter(
              (user) => user.access === access.LAWYER
            )[0];
            updateStepApi(currentList?.step.id, 17);
            addNotifyApi(id_list, [lawyer.id], message[25]);
          }
          if (currentList?.step) {
            if (engineer.id != engineerDefault.id) {
              updateStepApi(currentList?.step.id, 2);
              addNotifyApi(id_list, [engineer.id], message[3]);
              const manager = users.filter(
                (user) => user.access === access.MANAGER
              );
              const notify = user.notifications
                .filter((notify) => notify.message.includes(message[1]))
                .filter((item) => item.list.id === id_list)[0];

              if (!notify.isWatched) {
                if (manager.length != 0) {
                  updateNotifyApi(notify.id, true)
                    .then(() => {
                      addNotifyApi(id_list, [manager[0].id], message[2]);
                      dispatch(getUser());
                    })
                    .catch((err) => console.log(err));
                }
              }
              dispatch(getStep());
            }
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
        if (currentList?.step) {
          if (engineer.id != engineerDefault.id) {
            updateStepApi(currentList?.step.id, 2);
            addNotifyApi(id_list, [engineer.id], message[3]);
            dispatch(getStep());

            const manager = users.filter(
              (user) => user.access === access.MANAGER
            );
            const notify = user.notifications
              .filter((notify) => notify.message.includes(message[1]))
              .filter((item) => item.list.id === id_list)[0];

            if (!notify.isWatched) {
              if (manager.length != 0) {
                updateNotifyApi(notify.id, true)
                  .then(() => {
                    addNotifyApi(id_list, [manager[0].id], message[2]);
                    dispatch(getUser());
                  })
                  .catch((err) => console.log(err));
              }
            }
          }
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
              minLength={2}
              maxLength={30}
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
        <div className={styles.inspection}>
          {!currentList?.endDateForInspection || showDeadlineEdit ? (
            <DeadlineSetting
              deadline={deadlineForInspection}
              setDeadline={setDeadlineForInspection}
              text={"Установите дедлайн на обследование"}
              onClick={() => {
                const listNew = {
                  id: id_list,
                  endDateForInspection: deadlineForInspection,
                };
                dispatch(updateList(listNew));
                addNotifyApi(
                  id_list,
                  [engineerDefault.id, planner!.id],
                  message[4]
                );
                setShowDeadlineEdit(false);
              }}
            />
          ) : (
            <div className={styles.deadlines}>
              <div className={styles.deadline}>
                <p className={styles.deadline__week}>
                  {new Date(deadlineForInspection).toLocaleString("ru", {
                    weekday: "long",
                  })}
                </p>
                <p className={styles.deadline__day}>
                  Вы установили дедлайн на обследование: {deadlineForInspection}
                </p>
                <BlockButton
                  text={"Изменить дедлайн"}
                  onClick={() => {
                    setShowDeadlineEdit(true);
                  }}
                  bigWidth={true}
                />
              </div>

              {currentList?.endDateForCP && (
                <div className={styles.deadline}>
                  <p className={styles.deadline__week}>
                    {new Date(currentList?.endDateForCP).toLocaleString("ru", {
                      weekday: "long",
                    })}
                  </p>
                  <p className={styles.deadline__day}>
                    Вы установили дедлайн на создание КП:{" "}
                    {currentList?.endDateForCP}
                  </p>
                  <BlockButton
                    text={"Изменить дедлайн"}
                    onClick={() => {
                      setOpenDeadline(true);
                    }}
                    bigWidth={true}
                  />
                </div>
              )}
            </div>
          )}
          <div className={styles.survey}>
            <div className={styles.survey_container}>
              <p className={styles.survey_photo}>Фото с обследования</p>
              {filesFromInspection.length != 0 ? (
                filesFromInspection.map((file) => (
                  <div className={styles.survey_item}>
                    {" "}
                    <FileIcon name={file.name} url={file.url} fullName={true} />
                  </div>
                ))
              ) : (
                <p className={styles.p_notFound}>Фото не добавлены</p>
              )}
            </div>
            <div className={styles.survey_btn}>
              <BlockButton
                text={"Завершить обследование"}
                onClick={() => {
                  setOpenDeadline(true);
                  if (currentList?.step) {
                    updateStepApi(currentList?.step.id, 4);
                  }
                }}
                disabled={
                  filesFromInspection.length === 0 ||
                  currentList?.endDateForCP != undefined
                }
                bigWidth={true}
              />
            </div>
            <PopupDeadline
              open={openDeadline}
              setDeadline={setDeadlineForCP}
              deadline={deadlineForCP}
              onClick={() => {
                const listNew = {
                  id: id_list,
                  endDateForCP: deadlineForCP,
                };
                dispatch(updateList(listNew));
                addNotifyApi(id_list, [engineerDefault.id], message[6]);
                setOpenDeadline(false);
              }}
            />
          </div>
        </div>
      )}
      {header === "Монтаж" && (
        <div className={styles.inspection}>
          {!currentList?.endDateForFitters || showDeadlineFitterEdit ? (
            <DeadlineSetting
              deadline={deadlineForFitter}
              setDeadline={setDeadlineForFitter}
              text={"Установите дедлайн на монтаж"}
              onClick={() => {
                const listNew = {
                  id: id_list,
                  endDateForFitters: deadlineForFitter,
                };
                dispatch(updateList(listNew));
                if (currentList?.step) {
                  updateStepApi(currentList?.step.id, 12);
                }
                addNotifyApi(id_list, [engineerDefault.id], message[19]);
                setShowDeadlineFitterEdit(false);
              }}
            />
          ) : (
            <div className={styles.deadlines}>
              <div className={styles.deadline}>
                <p className={styles.deadline__week}>
                  {new Date(deadlineForFitter).toLocaleString("ru", {
                    weekday: "long",
                  })}
                </p>
                <p className={styles.deadline__day}>
                  Вы установили дедлайн на монтаж: {deadlineForFitter}
                </p>
                <BlockButton
                  text={"Изменить дедлайн"}
                  onClick={() => {
                    setShowDeadlineFitterEdit(true);
                  }}
                  bigWidth={true}
                />
              </div>
            </div>
          )}
          <div className={styles.survey}>
            <div className={styles.survey_container}>
              <p className={styles.survey_photo}>Файлы с монтажа</p>
              {filesFromFitter.length != 0 ? (
                filesFromFitter.map((file) => (
                  <div className={styles.survey_item}>
                    {" "}
                    <FileIcon name={file.name} url={file.url} fullName={true} />
                  </div>
                ))
              ) : (
                <p className={styles.p_notFound}>Файлы не добавлены</p>
              )}
            </div>
            <div className={styles.survey_btn}>
              {currentList?.step && currentList?.step.checkWorkFitter_step15 ? (
                <BlockButton
                  text={"Монтаж завершен"}
                  onClick={() => {}}
                  disabled={true}
                />
              ) : (
                <BlockButton
                  text={"Завершить монтаж"}
                  onClick={() => {
                    const usersCurrent = users
                      .filter(
                        (user) =>
                          user.access === access.LAWYER ||
                          user.access === access.VICEPREZIDENT
                      )
                      .map((item) => item.id);
                    if (currentList?.step) {
                      updateStepApi(currentList?.step.id, 15);
                    }
                    addNotifyApi(id_list, usersCurrent, message[21]);
                    alert(
                      "Уведомление отправлено юристам и заместителю директора"
                    );
                  }}
                  disabled={filesFromFitter.length === 0}
                  bigWidth={true}
                />
              )}
            </div>
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
