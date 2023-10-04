import { FC, useState } from "react";
import styles from "./PopupDeadline.module.scss";
import { Input } from "../Input";
import { BlockButton } from "../BlockButton/BlockButton";

type TPopupDeadline = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const PopupDeadline: FC<TPopupDeadline> = ({ open, setOpen }) => {
  const [daedline, setDeadline] = useState();
  return (
    <div
      className={`${styles.deadline} ${open && styles.deadline_opened}`}
      onClick={() => setOpen(false)}
    >
      <div className={styles.conteiner}>
        <h3 className={styles.deadline_header}>Установите дедлайн на КП</h3>
        <div className={styles.input}>
          <Input
            setValue={setDeadline}
            value={daedline}
            type={"date"}
            name={"Выберите дату"}
            text={"Установите делайн"}
          />
        </div>
        <BlockButton text={"Сохранить"} onClick={() => {}} />
      </div>
    </div>
  );
};
