import { FC } from "react";
import styles from "./DeadlineBlock.module.scss";
import { NOT_ASSIGNED_DEAD } from "../../utils/constants";
import { toDate } from "../../utils/utils-date";


export const DeadlineBlock: FC<{date:string}> = ({date}) => {
  const dateNow = new Date;
  const dateFormat = toDate(date)

  return <div className={`${styles.block} ${date === NOT_ASSIGNED_DEAD && styles.block_not} ${dateFormat<dateNow && styles.deadline}`}>{date}</div>;
};
