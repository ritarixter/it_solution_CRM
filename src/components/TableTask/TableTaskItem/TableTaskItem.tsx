import { FC } from "react";
import styles from "../TableTask.module.scss";
import { UserBlock } from "../../UserBlock/UserBlock";
import { ImpotanceBlock } from "../../ImpotanceBlock/ImpotanceBlock";
import { TList } from "../../../types";
import { StatusBlock } from "../../StatusBlock/StatusBlock";
import { v4 as uuidv4 } from "uuid";

export type TTableTaskItem = {
  item: TList;
};

export const TableTaskItem: FC<TTableTaskItem> = ({ item }) => {
  return (
    <ul className={styles.row}>
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
          <p className={styles.implementers__notfound}>Не назначено</p>
        )}
      </li>
      <li key={uuidv4()}>
        <StatusBlock type={item.status} />
      </li>
      <li key={uuidv4()}>
        {item.endDate != null ? item.endDate?.slice(0, 10) : "Не назначен"}
      </li>
    </ul>
  );
};
