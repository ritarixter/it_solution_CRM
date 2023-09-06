import { FC } from "react";
import styles from "./StatusBlock.module.scss";
import { statusConst } from "../../utils/constants";

type TStatusBlock = {
  type: string | null; //"В работе" | "Закончено" | "На согласовании" | "Не назначен";
};

export const StatusBlock: FC<TStatusBlock> = ({ type }) => {
  return (
    <div
      className={`${styles.block} ${
        (type === statusConst.IN_WORK && styles.block__do) ||
        (type === statusConst.BE_AGREED && styles.block__todo) ||
        ((type === null || type === statusConst.NOT_ASSIGNED_DEAD) &&
          styles.null)
      }`}
    >
      {type ? type : statusConst.NOT_ASSIGNED_DEAD}
    </div>
  );
};
