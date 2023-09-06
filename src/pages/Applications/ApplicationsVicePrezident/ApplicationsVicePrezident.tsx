import { FC, useEffect, useState } from "react";
import styles from "../Applications.module.scss";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import {
  ImpotanceBlock,
  StatusBlock,
  UserBlock,
  Wrapper,
} from "../../../components";
import { TList } from "../../../types";
import { NOT_ASSIGNED, notFound } from "../../../utils/constants";
import { FileIcon } from "../../../components/File/FileIcon";
import { getListByIdApi } from "../../../utils/api";
import { useLocation, useNavigate } from "react-router";
import { BlockButton } from "../../../components/BlockButton/BlockButton";

export const ApplicationsVicePrezident: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { list } = useAppSelector((state) => state.list);
  const [currentList, setCurrentList] = useState<TList | null>(null);
  const [header, setHeader] = useState<"Исполнители" | "Маржинальность">(
    "Исполнители"
  );

  const id_list = Number(location.pathname.slice(14));
  const dispatch = useAppDispatch();

  //Получение информации о текущей заявке
  useEffect(() => {
    getListByIdApi(id_list).then((res) => {
      setCurrentList(res);
    });
  }, [list]);

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
        <div className={styles.blockUsers}>
          <div className={styles.blockUsers_header}>
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
            </div>
          </div>
          {header === "Исполнители" ? (
            <>
              <div className={styles.blockInfo}>
                <p className={styles.blockInfo_title}>Ответсвенный инженер</p>
                <p className={styles.blockInfo_text}>
                  {currentList?.users
                    ? currentList.users.map((user) => (
                        <UserBlock
                          name={user.name}
                          avatar={user.avatar}
                          fullName={true}
                        />
                      ))
                    : NOT_ASSIGNED}
                </p>
              </div>
              <div className={styles.blockInfo}>
                <p className={styles.blockInfo_title}>Бригада</p>
                <p className={styles.blockInfo_text}>
                  {currentList?.users
                    ? currentList.users.map((user) => (
                        <UserBlock
                          name={user.name}
                          avatar={user.avatar}
                          fullName={true}
                        />
                      ))
                    : NOT_ASSIGNED}
                </p>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};
