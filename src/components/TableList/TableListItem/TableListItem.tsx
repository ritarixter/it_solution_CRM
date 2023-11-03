import { FC, useEffect, useState } from "react";
import styles from "../TableList.module.scss";
import { UserBlock } from "../../UserBlock/UserBlock";
import { ImpotanceBlock } from "../../ImpotanceBlock/ImpotanceBlock";
import { TList } from "../../../types";
import { StatusBlock } from "../../StatusBlock/StatusBlock";
import { v4 as uuidv4 } from "uuid";
import { formateDateShort } from "../../../utils/utils-date";
import WorkProgressBar from "../../WorkProgressBar/WorkProgressBar";
import { useLocation, useNavigate } from "react-router";
import { FileIcon } from "../../File/FileIcon";
import {
  NOT_ASSIGNED,
  NOT_ASSIGNED_DEAD,
  access,
  notFound,
} from "../../../utils/constants";
import { useAppSelector } from "../../../services/hooks";

export type TTableListItem = {
  item: TList;
  style: any;
  columnCount: number;
};

export const TableListItem: FC<TTableListItem> = ({
  item,
  style,
  columnCount,
}) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const location = useLocation();

  return (
    <>
      {user.access != access.MANAGER && (
        <tr
          onClick={() => navigate(`/applications/${item.id}`)}
          className={`${styles.row} ${styles.link}`}
          style={style}
        >
          {columnCount > 0 && (
            <td className={styles.listId} key={uuidv4()}>
              {item.id}
            </td>
          )}
          {columnCount > 3 && (
            <td key={uuidv4()}>{item.company.nameCompany}</td>
          )}
          {columnCount > 1 && (
            <td key={uuidv4()}>{item.name != "" ? item.name : NOT_ASSIGNED}</td>
          )}
          {columnCount > 2 && (
            <td key={uuidv4()}>
              {item.endDate != null
                ? formateDateShort(item.endDate)
                : NOT_ASSIGNED_DEAD}
            </td>
          )}

          {columnCount > 4 ? (
            location.pathname != "/applications/history" ? (
              <div>
                {item.users && item.users.length != 0 ? (
                  <td className={styles.implements}>
                    {item.users.slice(0, 3).map((user) => (
                      <div className={styles.implements__item} key={user.id}>
                        <UserBlock avatar={user.avatar} name={user.name} />
                      </div>
                    ))}
                    {item.users.length > 3 && (
                      <UserBlock name={`+${String(item.users.length - 3)}`} />
                    )}
                  </td>
                ) : (
                  <td className={styles.implements__notfound}>
                    {NOT_ASSIGNED}
                  </td>
                )}
              </div>
            ) : (
              <td key={uuidv4()}>30000</td>
            )
          ) : null}
          {columnCount > 5 && (
            <td key={uuidv4()}>
              {location.pathname != "/applications/history" ? (
                <WorkProgressBar {...item.step} />
              ) : (
                "50000"
              )}
            </td>
          )}
          {columnCount > 6 && (
            <td key={uuidv4()}>{formateDateShort(item.createdAt)}</td>
          )}
          {columnCount > 7 && (
            <td key={uuidv4()}>
              <StatusBlock type={item.status} />
            </td>
          )}
          {columnCount > 8 && (
            <td key={uuidv4()}>
              <ImpotanceBlock type={item.importance} />
            </td>
          )}

          {columnCount > 9 && (
            <td key={uuidv4()}>{item.company.numberPhone}</td>
          )}
          {columnCount > 10 && (
            <td key={uuidv4()}>
              {item.company.name.split(" ")[0] +
                " " +
                item.company.name.split(" ")[1][0] +
                "."}
            </td>
          )}
          {columnCount > 11 && (
            <td key={uuidv4()} className={styles.file}>
              {item.files && item.files.length > 0 ? (
                <div className={styles.files}>
                  {item.files.slice(0, 2).map((file) => (
                    <FileIcon name={file.name} url={file.url} />
                  ))}
                  {item.files.length > 2 && (
                    <div className={styles.fileText}>
                      и еще {item.files.length - 2}
                    </div>
                  )}
                </div>
              ) : (
                "Файлов нет"
              )}
            </td>
          )}
        </tr>
      )}
      {/* ОТОБРАЖЕНИЕ ДЛЯ МЕНЕДЖЕРА */}
      {user.access === access.MANAGER &&
        location.pathname != "/applications/history" && (
          <tr
          className={`${styles.row} ${styles.link} ${styles.row__manager}`}
            onClick={() => navigate(`${item.id}`)}
          >
            <td className={styles.listId} key={uuidv4()}>
              {item.id}
            </td>
            <td key={uuidv4()}>{item.company.nameCompany}</td>
            <td key={uuidv4()}>{item.name != "" ? item.name : NOT_ASSIGNED}</td>
            <td key={uuidv4()}>
              {item.company.email ? item.company.email : "Пусто"}
            </td>
            <td key={uuidv4()}>
              {item.company.name.split(" ")[0] +
                " " +
                item.company.name.split(" ")[1][0] +
                "."}
            </td>
            <td key={uuidv4()}>{item.company.numberPhone}</td>
            <td key={uuidv4()}>{formateDateShort(item.createdAt)}</td>
          </tr>
        )}
      {/* ОТОБРАЖЕНИЕ ИСТОРИИ ЗАЯВОК */}
      {/* {(user.access === access.SUPERUSER ||
        user.access === access.VICEPREZIDENT) &&
        location.pathname === "/applications/history" && (
          <tr
            className={`${styles.row} ${styles.link}`}
            onClick={() => navigate(`/applications/${item.id}`)}
          >
            <td key={uuidv4()} className={styles.listId}>
              {item.id}
            </td>
            <td key={uuidv4()}>{item.name}</td>
            <td key={uuidv4()}>{item.company.nameCompany}</td>
            <td key={uuidv4()}>30000</td>
            <td key={uuidv4()}>50000</td>
            <td key={uuidv4()}>
              <StatusBlock type={"Закончено"} />
            </td>
            <td key={uuidv4()}>{formateDateShort(item.createdAt)}</td>
          </tr>
        )} */}
    </>
  );
};
