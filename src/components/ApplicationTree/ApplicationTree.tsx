import { FC } from "react";
import styles from "./ApplicationTree.module.scss";
import { Scheme } from "./Scheme/Scheme";
import { TUser } from "../../types";

type TApplicationTree = {
  users: Array<TUser>
}

export const ApplicationTree: FC<TApplicationTree> = ({users}) => {
  return (
    <div className={styles.applicationTree}>
      <div className={styles.rightBlock}>
        <Scheme users={users}/>
      </div>
    </div>
  );
};
