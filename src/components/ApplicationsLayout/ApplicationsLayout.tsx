import { FC } from "react";
import styles from "./ApplicationsLayout.module.scss";

import { StatusBlock, Wrapper } from "..";
import { HeaderTop } from "../HeaderTop/HeaderTop";

import { NOT_ASSIGNED_DEAD, access, notFound } from "../../utils/constants";
import { TList } from "../../types";
import { ApplicationsHeader } from "./ApplicationsHeader/ApplicationsHeader";
import { BlockButton } from "../BlockButton/BlockButton";
import { useLocation, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { DeadlineBlock } from "../DeadlineBlock/DeadlineBlock";
import useResize from "../../hooks/useResize";

type TApplicationsLayout = {
  children: any;
  currentList: TList | null;
  headerData: Array<string>;
  header: string;
  setHeader: (value: string) => void;
};

export const ApplicationsLayout: FC<TApplicationsLayout> = ({
  currentList,
  children,
  headerData,
  header,
  setHeader,
}) => {
  const location = useLocation();
  const id_list = Number(location.pathname.slice(14));
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user);
  const size = useResize();

  return (
    <Wrapper>
      <HeaderTop />
      <div
        className={`${styles.popup} ${
          size.width <= 1100 &&
          user.access === access.VICEPREZIDENT &&
          styles.vice
        }`}
      >
        <div
          className={`${styles.infomation} ${
            size.width <= 1100 &&
            user.access === access.VICEPREZIDENT &&
            styles.vice_inf
          }`}
        >
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

              <div className={styles.blockInf}>
                <span>Статус: </span>
                <StatusBlock
                  type={currentList?.status ? currentList.status : null}
                />
              </div>
              {(user.access === access.SUPERUSER ||
                user.access === access.VICEPREZIDENT ||
                user.access === access.LAWYER) && (
                <div className={styles.blockInf}>
                  <span>Дедлайн: </span>
                  <DeadlineBlock
                    date={
                      currentList?.endDate
                        ? currentList?.endDate
                        : NOT_ASSIGNED_DEAD
                    }
                  />
                </div>
              )}
              {(user.access === access.SUPERUSER ||
                user.access === access.VICEPREZIDENT ||
                user.access === access.ENGINEER ||
                user.access === access.PLANNER) && (
                <div className={styles.blockInf}>
                  <span>Дедлайн обследования:</span>
                  <DeadlineBlock
                    date={
                      currentList?.endDateForInspection
                        ? currentList?.endDateForInspection
                        : NOT_ASSIGNED_DEAD
                    }
                  />
                </div>
              )}
              {(user.access === access.SUPERUSER ||
                user.access === access.VICEPREZIDENT ||
                user.access === access.ENGINEER ||
                user.access === access.BUYER) && (
                <div className={styles.blockInf}>
                  <span>Дедлайн создание КП: </span>
                  <DeadlineBlock
                    date={
                      currentList?.endDateForCP
                        ? currentList?.endDateForCP
                        : NOT_ASSIGNED_DEAD
                    }
                  />
                </div>
              )}
              {(user.access === access.SUPERUSER ||
                user.access === access.VICEPREZIDENT ||
                user.access === access.ENGINEER) && (
                <div className={styles.blockInf}>
                  <span>Дедлайн монтажа: </span>
                  <DeadlineBlock
                    date={
                      currentList?.endDateForFitters
                        ? currentList?.endDateForFitters
                        : NOT_ASSIGNED_DEAD
                    }
                  />
                </div>
              )}
            </div>
          </div>
          {user.access === access.ENGINEER && (
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
          )}
          {(user.access === access.SUPERUSER ||
            user.access === access.LAWYER ||
            user.access === access.VICEPREZIDENT) && (
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
          )}
        </div>

        <div className={styles.tree}>
          <ApplicationsHeader
            header={header}
            setHeader={setHeader}
            headerData={headerData}
            currentList={currentList}
          />
          {children}
        </div>
      </div>
    </Wrapper>
  );
};
