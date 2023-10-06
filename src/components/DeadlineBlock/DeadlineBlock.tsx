import { FC } from "react";
import styles from "./DeadlineBlock.module.scss";
import { NOT_ASSIGNED_DEAD } from "../../utils/constants";


export const DeadlineBlock: FC<{date:string}> = ({date}) => {
  return <div className={`${styles.block} ${date === NOT_ASSIGNED_DEAD && styles.block_not}`}>{date}</div>;
};
