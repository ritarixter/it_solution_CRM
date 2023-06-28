import { FC } from "react";
import styles from "./PopupNewList.module.scss";
import { Input } from "../Input";
import { BlockComments } from "../BlockComments/BlockComments";
import { BlockButton } from "../BlockButton/BlockButton";

export const PopupNewList: FC = () => {
  return (
    <div className={styles.popup}>
      <div className={styles.conteiner}>
        <h2 className={styles.conteiner_title}>Новая заявка</h2>
        <form className={styles.conteiner_form}>
          <Input
            type={"text"}
            name={"Введите название компании"}
            text={"Название компании*"}
          />
          <Input
            type={"text"}
            name={"Введите рабочее название"}
            text={"Рабочее название"}
          />
          <Input type={"text"} name={"Введите телефон"} text={"Телефон"} />
          <Input type={"email"} name={"Введите почту"} text={"Почта"} />
          <Input type={"text"} name={"Введите ИНН"} text={"ИНН"} />
          <Input type={"text"} name={"Введите ФИО "} text={"ФИО "} />
          <Input
            type={"date"}
            name={"Введите крайний срок"}
            text={"Крайний срок"}
          />
        </form>
        <BlockComments />
        <BlockButton text={"Добавить"} />
      </div>
    </div>
  );
};
