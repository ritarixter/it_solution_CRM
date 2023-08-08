import { FC, useEffect, useState } from "react";
import styles from "../Applications.module.scss";
import { useLocation, useNavigate } from "react-router";
import { ImpotanceBlock, StatusBlock, Wrapper } from "../../../components";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import { getListByIdApi, uploadFiles } from "../../../utils/api";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { TList } from "../../../types";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { ApplicationTree } from "../../../components/ApplicationTree/ApplicationTree";
import { updateList } from "../../../services/slices/list";
import { FileIcon } from "../../../components/File/FileIcon";
import { BlockComments } from "../../../components/BlockComments/BlockComments";
import { DropdownList } from "../../../components/DropdownList";
import { importanceData, statusData } from "./constants";
import { notFound } from "../../../utils/constants";

export const ApplicationsItemTree: FC = () => {
  const location = useLocation();
  const { list } = useAppSelector((state) => state.list);
  const [currentList, setCurrentList] = useState<TList | null>(null);
  const navigate = useNavigate();
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

  const handleChangeList = () => {
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
      };
      dispatch(updateList(listNew));
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
              <BlockButton
                text={"Создать КП"}
                onClick={() => {
                  navigate(`/commercial-proposal/create/${id_list}`);
                }}
              />
            )}
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
            <ApplicationTree />
          ) : (
            <div className={styles.popup_edit}>
              <form method="POST" className={styles.edit__container}>
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