import { FC, useState } from "react";
import styles from "./DeadlineSetting.module.scss";
import { Input } from "../Input";
import { BlockButton } from "../BlockButton/BlockButton";
import calendar from "../../images/icons/calendar_grey.svg";
import ReactCalendar from "react-calendar";
import "../Calendar/Calendar.module.scss";
import { formateDateToBackend } from "../../utils/utils-date";

type TDeadlineSetting = {
  text: string;
  onClick: () => void;
  setDeadline: (deadline: string) => void;
  deadline: string;
};

export const DeadlineSetting: FC<TDeadlineSetting> = ({
  text,
  onClick,
  setDeadline,
  deadline,
}) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const onClickDay = (value: Date) => {
    setDeadline(formateDateToBackend(value));

    setOpenCalendar(false);
  };

  return (
    <div className={styles.calendar}>
      <div>
        <div className={styles.calendar_block}>
          <Input
            type={"text"}
            name={"Выберите дату"}
            text={text}
            value={deadline}
            setValue={setDeadline}
          />
          <img
            src={calendar}
            className={styles.calendar_icon}
            alt="иконка календаря"
            onClick={() => setOpenCalendar(true)}
          />
        </div>
        {openCalendar && (
          <div className={styles.calendar_style}>
            <ReactCalendar onClickDay={(value) => onClickDay(value)} />
          </div>
        )}
      </div>
      <BlockButton
        text={"Сохранить"}
        onClick={onClick}
        disabled={deadline === "Выберите дату"}
      />
    </div>
  );
};
