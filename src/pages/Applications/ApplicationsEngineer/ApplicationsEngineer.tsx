import { FC, useEffect, useState } from "react";
import styles from "../Applications.module.scss";
import { useLocation, useNavigate } from "react-router";
import { ImpotanceBlock, StatusBlock, Wrapper } from "../../../components";
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
import { updateList } from "../../../services/slices/list";
import { FileIcon } from "../../../components/File/FileIcon";
import { BlockComments } from "../../../components/BlockComments/BlockComments";
import { DropdownList } from "../../../components/DropdownList";
import { importanceData, statusData } from "../ApplicationsItemTree/constants";
import {
  NOT_ASSIGNED,
  NOT_ASSIGNED_DEAD,
  access,
  notFound,
} from "../../../utils/constants";
import { DropdownListForUsers } from "../../../components/DropdownList/DropdownListForUsers";
import { Performers } from "../../../components/Performers/Performers";
import { FilesBlock } from "../../../components/FilesBlock";
import { CommentsBlock } from "../../../components/CommentsBlock/CommentsBlock";

export const ApplicationsEngineer: FC = () => {
  const location = useLocation();
  const { list } = useAppSelector((state) => state.list);
  const { users, user } = useAppSelector((state) => state.user);
  const [currentList, setCurrentList] = useState<TList | null>(null);
  const navigate = useNavigate();
  const [header, setHeader] = useState<
    "Назначить бригаду" | "Исполнители" | "Файлы" | "Комментарии"
  >("Назначить бригаду");
  const id_list = Number(location.pathname.slice(14));
  const dispatch = useAppDispatch();

  //ИЗМЕНЕНИЕ ИНФОРМАЦИИ
  const [files, setFiles] = useState<FormData | undefined>(undefined);
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [importance, setImportance] = useState<string>(importanceData[0]);
  const [status, setStatus] = useState<string>(statusData[0]);
  const [fitters, setFitters] = useState<Array<TWorkAbdExecuter>>([]);
  const [dataFitters, setDataFitters] = useState<Array<TWorkAbdExecuter>>([]);

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
        currentList &&
          fittersID.length != 0 &&
          updateStepApi(currentList.step.id, 3.1);
      });
    } else {
      const listNew = {
        id: id_list,
        files: undefined,
        users: fittersID.length != 0 ? fittersID : undefined,
      };
      dispatch(updateList(listNew));
      currentList &&
        fittersID.length != 0 &&
        updateStepApi(currentList.step.id, 3.1);
    }

    if (textareaValue != "") {
      addCommentApi(id_list, user.id, textareaValue);
      setTextareaValue("")
    }
    setDataFitters([])
    setFiles(undefined)
  };

  return (
    <Wrapper>
      <HeaderTop />
      <div className={styles.popup}>
        <div className={styles.infomation}>
          <div className={styles.infomation__container}>
            <div>
              <h2 className={styles.conteiner_titleTree}>Текущая информация</h2>
              <div className={styles.blockText}>
                <p className={styles.blockText_title}>Название компании</p>
                <p className={styles.blockText_text}>
                  {currentList?.company.nameCompany}
                </p>
              </div>
              <div className={styles.blockText}>
                <p className={styles.blockText_title}>Кодовое имя</p>
                <p className={styles.blockText_text}>
                  {currentList?.name != "" ? currentList?.name : NOT_ASSIGNED}
                </p>
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
                <p className={styles.blockText_title}>Адрес</p>
                <p className={styles.blockText_text}>
                  {currentList?.address
                    ? currentList.address
                    : NOT_ASSIGNED_DEAD}
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
              onClick={() => setHeader("Назначить бригаду")}
              className={`${styles.button__nav} ${
                header === "Назначить бригаду" && styles.active
              }`}
            >
              Назначить бригаду
            </button>
            <button
              type="button"
              onClick={() => setHeader("Исполнители")}
              className={`${styles.button__nav} ${
                header === "Исполнители" && styles.active
              }`}
            >
              Исполнители
            </button>
            <button
              type="button"
              onClick={() => setHeader("Файлы")}
              className={`${styles.button__nav} ${
                header === "Файлы" && styles.active
              }`}
            >
              Файлы
            </button>
            <button
              type="button"
              onClick={() => setHeader("Комментарии")}
              className={`${styles.button__nav} ${
                header === "Комментарии" && styles.active
              }`}
            >
              Комментарии
            </button>
          </div>
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
                  disabled={dataFitters.length === 0 && !!!files && textareaValue===""}
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
              <FilesBlock
                fileData={currentList?.files ? currentList?.files : []}
              />
            </div>
          )}
                {header === "Комментарии" && (
            <CommentsBlock/>
          )}
        </section>
      </div>
    </Wrapper>
  );
};
