import { FC } from "react";
import styles from "./ImpotanceBlock.module.scss";
import { impotance } from "../../utils/constants";

type TImpotanceBlock = {
  type: string | null; //"Средняя" | "Низкая" | "Высокая" | "Не назначена"
};

export const ImpotanceBlock: FC<TImpotanceBlock> = ({ type }) => {
  return (
    <div
      className={`${styles.block} ${
        (type === impotance.AVERAGE && styles.block__do) ||
        (type === impotance.HIGH && styles.block__todo) ||
        ((type === null || type === impotance.NOT_ASSIGNED_DEAD) && styles.null)
      }`}
    >
      {type ? type : impotance.NOT_ASSIGNED_DEAD}
    </div>
  );
};
