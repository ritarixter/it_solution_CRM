import { FC } from "react";
import styles from "./ExcelButton.module.scss";
import excel from "../../images/icons/excel_icon.svg";

export const ExcelButton: FC<{ onClick: () => void, text?:string }> = ({onClick, text='Экспорт'}) => {
  return (
    <p className={styles.excel} onClick={onClick}>
      <img src={excel} className={styles.excel__icon} alt="Иконка excel" />
      {text}
    </p>
  );
};
