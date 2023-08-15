import { FC, useEffect, useState } from "react";
import styles from "../Applications.module.scss";
import { useLocation, useNavigate } from "react-router";
import { ImpotanceBlock, StatusBlock, Wrapper } from "../../../components";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import { getListByIdApi, uploadFiles } from "../../../utils/api";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { TList, TWorkAbdExecuter } from "../../../types";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { ApplicationTree } from "../../../components/ApplicationTree/ApplicationTree";
import { updateList } from "../../../services/slices/list";
import { FileIcon } from "../../../components/File/FileIcon";
import { BlockComments } from "../../../components/BlockComments/BlockComments";
import { DropdownList } from "../../../components/DropdownList";
import { importanceData, statusData } from "./constants";
import { access, notFound } from "../../../utils/constants";
import { DropdownListForUsers } from "../../../components/DropdownList/DropdownListForUsers";

export const ApplicationsItemTree: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { users } = useAppSelector((state) => state.user);
  const { list } = useAppSelector((state) => state.list);
  const [currentList, setCurrentList] = useState<TList | null>(null);
  const [header, setHeader] = useState<"Дерево" | "Изменить информацию">(
    "Изменить информацию"
  );
  const id_list = Number(location.pathname.slice(14));
  const dispatch = useAppDispatch();

  //ИЗМЕНЕНИЕ ИНФОРМАЦИИ
  const [files, setFiles] = useState<FormData | undefined>(undefined);
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [importance, setImportance] = useState<string>(importanceData[0]);
  const [status, setStatus] = useState<string>(statusData[0]);
  const [engineer, setEngineer] = useState<Array<TWorkAbdExecuter>>([]);
  const [engineerError, setEngineerError] = useState<boolean>(false);
  const [dataEngineer, setDataEngineer] = useState<Array<TWorkAbdExecuter>>([]);
  //Получение информации о текущей заявке
  useEffect(() => {
    getListByIdApi(id_list).then((res) => {
      setCurrentList(res);
      if (res.importance) {
        setImportance(res.importance);
      }
      if (res.status) {
        setStatus(res.status);
      }
      if (res.description) {
        setTextareaValue(res.description);
      }
    });
  }, [list]);

  useEffect(() => {
    let arr = [...users];
    setDataEngineer(arr.filter((item) => item.access === access.ENGINEER));
  }, [users]);

  const handleChangeList = () => {
    if (engineer.length > 1) {
      setEngineerError(true);
    } else {
      setEngineerError(false);

      if (files) {
        uploadFiles(files).then((res) => {
          const listNew = {
            id: id_list,
            description:
              textareaValue === "" || textareaValue === currentList?.description
                ? undefined
                : textareaValue,
            files: res,
            importance:
              importance === currentList?.importance ? undefined : importance,
            status: status === currentList?.status ? undefined : status,
            users: engineer.length != 0 ? [engineer[0].id] : undefined,
          };
          dispatch(updateList(listNew));
        });
      } else {
        const listNew = {
          id: id_list,
          description: textareaValue === "" ? undefined : textareaValue,
          files: undefined,
          importance:
            importance === currentList?.importance ? undefined : importance,
          status: status === currentList?.status ? undefined : status,
          users: engineer.length != 0 ? [engineer[0].id] : undefined,
        };
        dispatch(updateList(listNew));
      }
    }
  };

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
            <div className={styles.buttonCreate}>
              {currentList?.commercialProposal ? (
                <BlockButton
                  text={"Посмотреть КП"}
                  onClick={() => {
                    navigate(`/commercial-proposal/${id_list}`);
                  }}
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <section className={styles.tree}>
          <div className={styles.tree__header}>
            <button
              type="button"
              onClick={() => setHeader("Изменить информацию")}
              className={`${styles.button__nav} ${
                header === "Изменить информацию" && styles.active
              }`}
            >
              Изменить информацию
            </button>
            <button
              type="button"
              onClick={() => setHeader("Дерево")}
              className={`${styles.button__nav} ${
                header === "Дерево" && styles.active
              }`}
            >
              Дерево
            </button>
          </div>
          {header === "Дерево" ? (
            <ApplicationTree
              users={currentList?.users ? currentList?.users : []}
            />
          ) : (
            <div className={styles.popup_edit}>
              <form method="POST" className={styles.edit__container}>
                <DropdownListForUsers
                  data={dataEngineer}
                  setState={setEngineer}
                  state={engineer}
                  name={"Ответсвенный инженер"}
                  error={engineerError}
                  errorText={"Инженер может быть только 1"}
                />

                <DropdownList
                  data={statusData}
                  setState={setStatus}
                  state={status}
                  name={"Статус"}
                />
                <DropdownList
                  data={importanceData}
                  setState={setImportance}
                  state={importance}
                  name={"Важность"}
                />
                <div className={styles.manager__textarea}>
                  <BlockComments
                    setFiles={setFiles}
                    value={textareaValue}
                    setValue={setTextareaValue}
                  />
                </div>
              </form>
              <div className={styles.editButton}>
                <BlockButton
                  text={"Изменить"}
                  disabled={
                    engineer.length === 0 &&
                    importance === currentList?.importance &&
                    status === currentList?.status &&
                    textareaValue === currentList?.description &&
                    !!!files
                  }
                  onClick={() => handleChangeList()}
                />
              </div>
            </div>
          )}
        </section>
      </div>
    </Wrapper>
  );
};
