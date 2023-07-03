import { FC } from "react";
import styles from "../TableTask.module.scss";
import { UserBlock } from "../../UserBlock/UserBlock";
import { ImpotanceBlock } from "../../ImpotanceBlock/ImpotanceBlock";
import { TList } from "../../../types";
import { StatusBlock } from "../../StatusBlock/StatusBlock";
import { v4 as uuidv4 } from "uuid";
import { formateDateShort } from "../../../utils/utils-date";

export type TTableTaskItem = {
  item: TList;
  mini: boolean;
};

export const TableTaskItem: FC<TTableTaskItem> = ({ item, mini }) => {
  return (
    <ul
      className={`${styles.row} ${mini ? styles.row_mini : styles.row_maxi} ${
        styles.link
      }`}
    >
      {mini ? (
        <>
          <li key={uuidv4()}>{item.name}</li>
          <li key={uuidv4()}>
            <ImpotanceBlock type={item.importance} />
          </li>
          <li key={uuidv4()}>progressbar</li>
          <li key={uuidv4()}>
            {item.users.length != 0 ? (
              <ul className={styles.implements}>
                {item.users.slice(0, 3).map((user) => (
                  <li className={styles.implements__item} key={user.id}>
                    <UserBlock avatar={user.avatar} name={user.name} />
                  </li>
                ))}
                {item.users.length > 3 && (
                  <UserBlock name={`+${String(item.users.length - 3)}`} />
                )}
              </ul>
            ) : (
              <p className={styles.implements__notfound}>Не назначено</p>
            )}
          </li>
          <li key={uuidv4()}>
            <StatusBlock type={item.status} />
          </li>
          <li key={uuidv4()}>
            {item.endDate != null ? formateDateShort(item.endDate) : "Не назначен"}
          </li>
        </>
      ) : (
        <>
          <li key={uuidv4()}>{item.company.nameCompany}</li>
          <li key={uuidv4()}>{item.name}</li>
          <li key={uuidv4()}>{formateDateShort(item.createdAt)}</li>
          <li key={uuidv4()}>
            {item.endDate != null ? formateDateShort(item.endDate) : "Не назначен"}
          </li>
          <li key={uuidv4()}>
            {item.company.name.split(" ")[0] +
              " " +
              item.company.name.split(" ")[1][0] +
              "."}
          </li>
          <li key={uuidv4()}>{item.company.numberPhone}</li>
          <li key={uuidv4()}>
            {item.users.length != 0 ? (
              <ul className={styles.implements}>
                {item.users.slice(0, 3).map((user) => (
                  <li className={styles.implements__item} key={user.id}>
                    <UserBlock avatar={user.avatar} name={user.name} />
                  </li>
                ))}
                {item.users.length > 3 && (
                  <UserBlock name={`+${String(item.users.length - 3)}`} />
                )}
              </ul>
            ) : (
              <p className={styles.implements__notfound}>Не назначено</p>
            )}
          </li>
          <li key={uuidv4()}>
            <StatusBlock type={item.status} />
          </li>
          <li key={uuidv4()}>
            <ImpotanceBlock type={item.importance} />
          </li>
          <li key={uuidv4()}>progressbar</li>
          <li key={uuidv4()}>Файлы</li>
        </>
      )}
    </ul>
  );
};
