import { FC, useEffect, useState } from "react";
import styles from "./PopupAddTask.module.scss";
import { BlockButton } from "../BlockButton/BlockButton";
import "moment/locale/ru";
import { TTask } from "../../types";
import { formateDateOnlyTime } from "../../utils/utils-date";

type TPopupAddTask = {
  title?: string;
  date?: string;
  isOpen: boolean;
  titleButton?: string;
  setOpen: (value: boolean) => void;
  task?: TTask;
  onClick: (
    name?: string,
    description?: string,
    time?: string,
    status?: string,
    id?: number
  ) => void;
};

export const PopupAddTask: FC<TPopupAddTask> = ({
  title,
  date,
  isOpen,
  setOpen,
  onClick,
  titleButton,
  task,
}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [status, setStatus] = useState<string>("Несрочно");
  const [nameDefault, setNameDefault] = useState<string>("");
  const [descriptionDefault, setDescriptionDefault] = useState<string>("");
  const [timeDefault, setTimeDefault] = useState<string>("");
  const [statusDefault, setStatusDefault] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [timeError, setTimeError] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<boolean>(false);

  useEffect(() => {
    name === "" ? setNameError(true) : setNameError(false);
    time === "" ? setTimeError(true) : setTimeError(false);
  }, [name, time]);

  useEffect(() => {
    if (task) {
      setName(task.title);
      setDescription(task.description || "");
      setStatus(task.status);
      setTime(formateDateOnlyTime(task.endDate));

      setNameDefault(task.title);
      setDescriptionDefault(task.description || "");
      setStatusDefault(task.status);
      setTimeDefault(formateDateOnlyTime(task.endDate));
    }
  }, [task]);

  useEffect(() => {
    if (task) {
      if (
        name === nameDefault &&
        description === descriptionDefault &&
        time === timeDefault &&
        status == statusDefault
      ) {
        setUpdateError(true);
      } else {
        setUpdateError(false);
      }
    }
  }, [name, description, time, status]);

  return (
    <div className={`${styles.popup} ${isOpen && styles.popup_opened}`}>
      <div className={styles.popup_conteiner}>
        <div className={styles.containerTitle}>
          <h3 className={styles.popup_title}>{title}</h3>
          <p className={styles.popup_text}>{date}</p>
        </div>
        <div className={styles.create_task}>
          <input
            className={styles.inputTitle}
            placeholder="Введите название"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            maxLength={40}
          />
          <textarea
            className={styles.description}
            placeholder="Введите описание до 200 символов"
            value={description}
            maxLength={200}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <div className={styles.block}>
            <input
              className={styles.date}
              type="time"
              required
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
            />
            <select
              className={`${styles.dropdown} ${
                status === "Срочно"
                  ? styles.dropdown_red
                  : styles.dropdown_green
              }`}
              name="priority"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value="Срочно" className={styles.dropdown_red}>
                Срочно
              </option>
              <option
                selected
                value="Несрочно"
                className={styles.dropdown_green}
              >
                Несрочно
              </option>
            </select>
          </div>
        </div>
        <div className={styles.buttonBlock}>
          <BlockButton
            text={titleButton || "Добавить задачу"}
            disabled={nameError || timeError || updateError}
            onClick={() => {
              onClick(name, description, time, status, task?.id);
              setName("");
              setDescription("");
              setTime("");
            }}
          />
          <p
            className={styles.caption}
            onClick={() => {
              setOpen(false);
              if (task) {
                setName(nameDefault);
                setDescription(descriptionDefault);
                setStatus(statusDefault);
                setTime(timeDefault);
              } else {
                setName("");
                setDescription("");
                setStatus("");
                setTime("");
              }
            }}
          >
            Отменить
          </p>
        </div>
      </div>
    </div>
  );
};
