import { FC, useState } from "react";
import styles from "./PopupDeadline.module.scss";
import { Input } from "../Input";
import { BlockButton } from "../BlockButton/BlockButton";
import { useAppDispatch } from "../../services/hooks";
import { updateList } from "../../services/slices/list";
import { addNotifyApi } from "../../utils/api";
import { message } from "../../utils/constants";

type TPopupDeadline = {
  open: boolean;
  onClick: () => void;
  setDeadline: (deadline: string)=>void;
  deadline: string
};

export const PopupDeadline: FC<TPopupDeadline> = ({
  open,
  onClick,
  setDeadline,
  deadline
}) => {

  return (
    <div className={`${styles.deadline} ${open && styles.deadline_opened}`}>
      <div
        className={styles.conteiner}
      >
        <h3 className={styles.deadline_header}>Установите дедлайн на КП</h3>
        <div className={styles.input}>
          <Input
            setValue={setDeadline}
            value={deadline}
            type={"date"}
            name={"Выберите дату"}
            text={"Установите дедлайн"}
          />
        </div>
        <BlockButton
          text={"Сохранить"}
          disabled={!deadline}
          onClick={onClick}
        />
      </div>
    </div>
  );
};
