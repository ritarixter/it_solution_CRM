import { FC, useEffect } from "react";
import styles from "../TableTask.module.scss";
import { UserBlock } from "../../UserBlock/UserBlock";
import { ImpotanceBlock } from "../../ImpotanceBlock/ImpotanceBlock";
import { TList } from "../../../types";
import { StatusBlock } from "../../StatusBlock/StatusBlock";
import { v4 as uuidv4 } from "uuid";
import { formateDateShort } from "../../../utils/utils-date";
import { WorkProgressBar } from "../../WorkProgressBar/WorkProgressBar";
import { useNavigate } from "react-router";
import { FileIcon } from "../../File/FileIcon";
import {
  NOT_ASSIGNED,
  NOT_ASSIGNED_DEAD,
  access,
  notFound,
} from "../../../utils/constants";

export type TTableTaskItem = {
  item: TList;
  mini: boolean;
  currentAccess: string; //"Менеджер" | "Главный инженер"
};

export const TableTaskItem: FC<TTableTaskItem> = ({
  item,
  mini,
  currentAccess,
}) => {
  const navigate = useNavigate();

  
  return (
    <>
      {/* ОТОБРАЖЕНИЕ ДЛЯ ГЛАВНОГО ИНЖЕНЕРА МИНИ-ВЕРСИЯ */}
      {mini && currentAccess === access.SUPERUSER && (
        <tr
          onClick={() => navigate(`/applications/${item.id}`)}
          className={`${styles.row} ${
            mini ? styles.row_mini : styles.row_maxi
          } ${styles.link}`}
        >
          <td key={uuidv4()}>{item.name}</td>
          <td key={uuidv4()}>
            <ImpotanceBlock type={item.importance} />
          </td>
          <td key={uuidv4()}>
            <WorkProgressBar />
          </td>

          {item.users.length != 0 ? (
            <td key={uuidv4()} className={styles.implements}>
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
            <td className={styles.implements__notfound}>Не назначено</td>
          )}

          <td key={uuidv4()}>
            <StatusBlock type={item.status} />
          </td>
          <td key={uuidv4()}>
            {item.endDate != null
              ? formateDateShort(item.endDate)
              : NOT_ASSIGNED_DEAD}
          </td>
        </tr>
      )}{" "}
      {/* ОТОБРАЖЕНИЕ ДЛЯ ГЛАВНОГО ИНЖЕНЕРА ПОЛНАЯ ВЕРСИЯ */}
      {!mini && currentAccess === access.SUPERUSER && (
        <tr
          onClick={() => navigate(`/applications/${item.id}`)}
          className={`${styles.row} ${
            mini ? styles.row_mini : styles.row_maxi
          } ${styles.link}`}
        >
          <td key={uuidv4()}>{item.company.nameCompany}</td>
          <td key={uuidv4()}>{item.name}</td>
          <td key={uuidv4()}>{formateDateShort(item.createdAt)}</td>
          <td key={uuidv4()}>
            {item.endDate != null
              ? formateDateShort(item.endDate)
              : NOT_ASSIGNED_DEAD}
          </td>
          <td key={uuidv4()}>
            {item.company.name.split(" ")[0] +
              " " +
              item.company.name.split(" ")[1][0] +
              "."}
          </td>
          <td key={uuidv4()}>{item.company.numberPhone}</td>

          {item.users.length != 0 ? (
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
            <td className={styles.implements__notfound}>{NOT_ASSIGNED}</td>
          )}

          <td key={uuidv4()}>
            <StatusBlock type={item.status} />
          </td>
          <td key={uuidv4()}>
            <ImpotanceBlock type={item.importance} />
          </td>
          <td key={uuidv4()}>
            <WorkProgressBar />
          </td>
          <td key={uuidv4()}>
            <div className={styles.implements__file}>
              {item.files
                ? item.files.map((file) => (
                    <FileIcon name={file.name} url={file.url} />
                  ))
                : notFound.NO_FILES}
            </div>
          </td>
        </tr>
      )}
      {/* ОТОБРАЖЕНИЕ ДЛЯ ИНЖЕНЕРА */}
      {!mini && currentAccess === access.ENGINEER && (
        <tr
          onClick={() => navigate(`/applications/${item.id}`)}
          className={`${styles.row} ${
            mini ? styles.row_mini : styles.row_maxi
          } ${styles.link}`}
        >
          <td key={uuidv4()}>{item.company.nameCompany}</td>
          <td key={uuidv4()}>{item.name}</td>
          <td key={uuidv4()}>{formateDateShort(item.createdAt)}</td>
          <td key={uuidv4()}>
            {item.endDate != null
              ? formateDateShort(item.endDate)
              : NOT_ASSIGNED_DEAD}
          </td>
          <td key={uuidv4()}>
            {item.company.name.split(" ")[0] +
              " " +
              item.company.name.split(" ")[1][0] +
              "."}
          </td>
          <td key={uuidv4()}>{item.company.numberPhone}</td>

          {item.users.length != 0 ? (
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
            <td className={styles.implements__notfound}>{NOT_ASSIGNED}</td>
          )}

          <td key={uuidv4()}>
            <StatusBlock type={item.status} />
          </td>
          <td key={uuidv4()}>
            <ImpotanceBlock type={item.importance} />
          </td>
          <td key={uuidv4()}>
            <WorkProgressBar />
          </td>
          <td key={uuidv4()}>
            <div className={styles.implements__file}>
              {item.files
                ? item.files.map((file) => (
                    <FileIcon name={file.name} url={file.url} />
                  ))
                : notFound.NO_FILES}
            </div>
          </td>
        </tr>
      )}
      {/* ОТОБРАЖЕНИЕ ДЛЯ МЕНЕДЖЕРА */}
      {mini && currentAccess === access.MANAGER && (
        <tr
          className={`${styles.row} ${
            mini ? styles.row_mini : styles.row_maxi
          } ${styles.link}`}
          onClick={() => navigate(`${item.id}`)}
        >
          <td key={uuidv4()}>{item.company.nameCompany}</td>
          <td key={uuidv4()}>{item.name}</td>
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
    </>
  );
};
