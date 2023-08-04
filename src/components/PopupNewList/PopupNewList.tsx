import { FC, useState } from "react";
import styles from "./PopupNewList.module.scss";
import { Input } from "../Input";
import { BlockComments } from "../BlockComments/BlockComments";
import { BlockButton } from "../BlockButton/BlockButton";
import { DropdownList } from "../DropdownList";
import { StatusBlock } from "../StatusBlock/StatusBlock";
import { ImpotanceBlock } from "../ImpotanceBlock/ImpotanceBlock";
import { useNavigate } from "react-router";

export const PopupNewList: FC = () => {
  const [companyValue, setCompanyValue] = useState("");
  const [workNameValue, setWorkNameValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [foNumberValue, setFoNumberValue] = useState("");
  const [mailValue, setMailValue] = useState("");
  const [INNValue, setINNValue] = useState("");
  const [status, setStatus] = useState("Не назначен");
  const [importance, setImportance] = useState("Не назначен");
  const [work, setWork] = useState("Не назначен");
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [files, setFiles] = useState<any>()
  const navigate = useNavigate();
  return (
    <div className={styles.popup}>
      <div className={styles.infomation}>
        <h2 className={styles.conteiner_title}>Текущая информация</h2>
        <div className={styles.blockText}>
          <p className={styles.blockText_title}>Название компании*</p>
          <p className={styles.blockText_text}>ООО «Астери»</p>
        </div>
        <div className={styles.blockText}>
          <p className={styles.blockText_title}>Телефон</p>
          <p className={styles.blockText_text}>+7(999)7210393</p>
        </div>
        <div className={styles.blockText}>
          <p className={styles.blockText_title}>Почта</p>
          <p className={styles.blockText_text}>chat@gmail.com</p>
        </div>
        <div className={styles.blockText}>
          <p className={styles.blockText_title}>Исполнители</p>
          <p className={styles.blockText_text}>Иван Б.</p>
        </div>
        <div className={styles.blockText}>
          <p className={styles.blockText_title}>Крайний срок</p>
          <p className={styles.blockText_text}>22.09.2022</p>
        </div>
        <div className={styles.blockText}>
          <p className={styles.blockText_title}>Комментарий</p>
          <p className={styles.blockText_text}>Позвонит в понедельник</p>
        </div>
        <div className={styles.status}>
          <StatusBlock type={"В работе"} />
        </div>
        <ImpotanceBlock type={"Низкая"} />
      </div>
      <div className={styles.conteiner}>
        <h2 className={styles.conteiner_title}>Новая информация</h2>
        <form className={styles.conteiner_form}>
          <Input
            type={"text"}
            name={"Введите название компании"}
            text={"Название компании*"}
            value={companyValue}
            setValue={setCompanyValue}
          />
          <Input
            type={"text"}
            name={"Введите рабочее название"}
            text={"Рабочее название"}
            value={workNameValue}
            setValue={setWorkNameValue}
          />
          <Input
            type={"text"}
            name={"Введите ФИО"}
            text={"ФИО"}
            value={nameValue}
            setValue={setNameValue}
          />
          <Input
            type={"text"}
            name={"Введите телефон"}
            text={"Телефон"}
            value={foNumberValue}
            setValue={setFoNumberValue}
          />
          <Input
            type={"email"}
            name={"Введите почту"}
            text={"Почта"}
            value={mailValue}
            setValue={setMailValue}
          />
          <Input
            type={"text"}
            name={"Введите ИНН"}
            text={"ИНН"}
            value={INNValue}
            setValue={setINNValue}
          />
          <DropdownList
            name={"Статус"}
            state={status}
            setState={setStatus}
            data={[
              { name: "В работе", id: "1", type: "В работе" },
              { name: "На согласовании", id: "2", type: "На согласовании" },
              { name: "Закончено", id: "3", type: "Закончено" },
            ]}
          />
          <DropdownList
            name={"Важность"}
            state={importance}
            setState={setImportance}
            data={[
              { name: "Высокая", id: "1", type: "Высокая" },
              { name: "Низкая", id: "2", type: "Низкая" },
            ]}
          />
          <DropdownList
            name={"Виды работ"}
            state={work}
            setState={setWork}
            data={[
              { name: "СКУД", id: "1", type: "В работе" },
              { name: "Видеооборудование", id: "2", type: "В работе" },
              { name: "Турникеты", id: "3", type: "В работе" },
            ]}
          />
        </form>
        <BlockComments value={textareaValue} setValue={setTextareaValue} setFiles={setFiles}/>
        <div className={styles.buttonBlock}>
          <BlockButton text={"Изменить"} onClick={() => {}} />
          <p
            className={styles.caption}
            onClick={() => navigate("/applications")}
          ></p>
        </div>
      </div>
    </div>
  );
};
