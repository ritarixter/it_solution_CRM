import { FC } from "react";
import styles from "./ImpotanceBlock.module.scss";

type TImpotanceBlock = {
  type: "Средняя" | "Низкая" | "Высокая" | "Статус";
};

export const ImpotanceBlock: FC<TImpotanceBlock> = ({ type }) => {
  return (
    <div
      className={`${styles.block} ${
        (type === "Средняя" && styles.block__do) ||
        (type === "Высокая" && styles.block__todo)
      }`}
    >
      {type}
    </div>
  );
};