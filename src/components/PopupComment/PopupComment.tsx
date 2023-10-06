import { FC } from "react";
import styles from "./PopupComment.module.scss";
import { Input } from "../Input";
import { BlockButton } from "../BlockButton/BlockButton";
import close_icon from "../../images/icons/Close_Icon.svg";

type TPopupComment = {
  open: boolean;
  setOpen: (open:boolean)=>void,
  onClick: () => void;
  setComment: (deadline: string) => void;
  comment: string;
  title: string;
};

export const PopupComment: FC<TPopupComment> = ({
  open,
  setOpen,
  onClick,
  setComment,
  comment,
  title,
}) => {
  return (
    <div className={`${styles.deadline} ${open && styles.deadline_opened}`}>
      <div className={styles.conteiner}>
        <img src={close_icon} className={styles.close} alt="Иконка закрытия" onClick={()=>setOpen(false)} />
        <h3 className={styles.deadline_header}>{title}</h3>
        <div className={styles.input}>
          <Input
            setValue={setComment}
            value={comment}
            type={"text"}
            name={"Напишите комментарий главному инженеру (необязательно)"}
            text={"Комментарий"}
          />
        </div>
        <BlockButton text={"Отправить"} onClick={onClick} bigWidth={true} />
      </div>
    </div>
  );
};
