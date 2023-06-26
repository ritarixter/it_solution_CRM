import { FC } from "react";
import styles from "./StatusBlock.module.scss";

type TStatusBlock = {
  type: "В работе" | "Закончено" | "На согласовании" | "Статус";
};

export const StatusBlock: FC<TStatusBlock> = ({ type }) => {
  return (
    <div
      className={`${styles.block} ${
        (type === "В работе" && styles.block__do) ||
        (type === "На согласовании" && styles.block__todo)
      }`}
    >
      {type}
    </div>
  );
};
