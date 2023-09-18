import { FC, useEffect, useState } from "react";
import styles from "../Applications.module.scss";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import { ImpotanceBlock, StatusBlock, Wrapper } from "../../../components";
import { TList, TUser } from "../../../types";
import { NOT_ASSIGNED_DEAD, notFound } from "../../../utils/constants";
import { FileIcon } from "../../../components/File/FileIcon";
import { getListByIdApi, uploadFiles } from "../../../utils/api";
import { useLocation, useNavigate } from "react-router";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { ApplicationsVicePrezidentItem } from "./ApplicationsVicePrezidentItem";
import { Performers } from "../../../components/Performers/Performers";
import { FilesBlock } from "../../../components/FilesBlock";
import { updateList } from "../../../services/slices/list";

export const ApplicationsVicePrezident: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { list } = useAppSelector((state) => state.list);
  const [currentList, setCurrentList] = useState<TList | null>(null);
  const [header, setHeader] = useState<
    "Исполнители" | "Маржинальность" | "Файлы"
  >("Исполнители");

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
        setFiles(undefined)
      });
  }

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
                <p className={styles.blockText_title}>Адрес</p>
                <p className={styles.blockText_text}>
                  {currentList?.address
                    ? currentList.address
                    : NOT_ASSIGNED_DEAD}
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
            </div>
            <div>
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
        </div>
        <div className={styles.tree}>
          <div className={styles.tree__header}>
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
              onClick={() => setHeader("Маржинальность")}
              className={`${styles.button__nav} ${
                header === "Маржинальность" && styles.active
              }`}
            >
              Маржинальность
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

            <div className={styles.buttonClose}>
                <BlockButton text={"Закрыть заявку"} onClick={() => {}} />
              </div>
          </div>

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
                files={currentList?.files ? currentList?.files : []}
                addFile={true}
                setFiles={setFiles}
              />
              <BlockButton text={"Сохранить"} disabled={files === undefined} onClick={handleUploadFiles} />
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};
