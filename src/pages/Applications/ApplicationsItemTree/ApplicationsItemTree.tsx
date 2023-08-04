import { FC, useEffect, useState } from "react";
import styles from "../Applications.module.scss";
import { useLocation, useNavigate } from "react-router";
import { ImpotanceBlock, StatusBlock, Wrapper } from "../../../components";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import { getListByIdApi } from "../../../utils/api";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { TList } from "../../../types";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { ApplicationTree } from "../../../components/ApplicationTree/ApplicationTree";
import { getList } from "../../../services/slices/list";
import { FileIcon } from "../../../components/File/FileIcon";

export const ApplicationsItemTree: FC = () => {
  const location = useLocation();
  const { list } = useAppSelector((state) => state.list);
  const [currentList, setCurrentList] = useState<TList | null>(null);
  const navigate = useNavigate();
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
          <h2 className={styles.conteiner_title}>Текущая информация</h2>
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
                : "Не указана"}
            </p>
          </div>
          <div className={styles.blockText}>
            <p className={styles.blockText_title}>От кого заявка?</p>
            <p className={styles.blockText_text}>{currentList?.customer}</p>
          </div>

          <div className={styles.blockText}>
            <p className={styles.blockText_title}>Комментарий</p>
            <p className={styles.blockText_text}>
              {currentList?.description
                ? currentList.description
                : "Комментариев нет"}
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
            {currentList?.files ? currentList.files.map((file) => (
              <FileIcon name={file.name} url={file.url} />
            )) : null}
          </div>
        </div>
        <section className={styles.tree}>
          <div className={styles.buttonCreate}>
            {currentList?.commercialProposal ? (
              <BlockButton
                text={"Изменить КП"}
                onClick={() => {
                  // navigate(`/commercial-proposal/${id_list}`);
                }}
              />
            ) : (
              <BlockButton
                text={"Создать КП"}
                onClick={() => {
                  navigate(`/commercial-proposal/${id_list}`);
                }}
              />
            )}
          </div>
          <ApplicationTree />
        </section>
      </div>
    </Wrapper>
  );
};
