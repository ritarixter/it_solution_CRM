import { FC } from "react";
import styles from "./ApplicationTree.module.scss";
import { Scheme } from "./Scheme/Scheme";
import { TList, TUser } from "../../types";

type TApplicationTree = {
  users: Array<TUser>
  list: TList | null
}

export const ApplicationTree: FC<TApplicationTree> = ({users, list}) => {
  return (
    <div className={styles.applicationTree}>
      <div className={styles.rightBlock}>
        <Scheme users={users} list={list}/>
      </div>
    </div>
  );
};
