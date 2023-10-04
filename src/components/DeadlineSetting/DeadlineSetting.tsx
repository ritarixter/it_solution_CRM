import { FC, useState } from "react";
import styles from "./DeadlineSetting.module.scss";
import { Input } from "../Input";
import { BlockButton } from "../BlockButton/BlockButton";
import calendar from "../../images/icons/calendar_grey.svg";
import ReactCalendar from "react-calendar";
import "../Calendar/Calendar.module.scss";

type TDeadlineSetting = {
    text: string;
    onClick: () => void;
}

export const DeadlineSetting: FC<TDeadlineSetting> = ({text, onClick}) => {
    const [deadline, setDeadline] = useState("Выберите дату");
  const [openCalendar, setOpenCalendar] = useState(false);
  const [clickedDay, setClickedDay] = useState<String>();
  const [showDeadline, setShowDeadline] = useState(false);

  const onClickDay = (value: any, event: any) => {
    setClickedDay(value);
    value.setUTCHours(24);
    const element = document.getElementsByClassName(
      "react-calendar__tile--now"
    ) as HTMLCollectionOf<HTMLElement>;
    if (element.length !== 0) {
      if (element[0] !== document.activeElement)
        element[0].style.opacity = "0.6";
      else element[0].style.opacity = "1";
    }
    setDeadline(new Date(value).toLocaleDateString("en-US"));

    setOpenCalendar(false);
    // для получения данных по выбранному дню
    // console.log(new Date('2023-07-10T17:38:00.000Z') > new Date(value) ? "После" : "До");
  };

    return (
        <>
          {!showDeadline ? (
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
                    <ReactCalendar
                      onClickDay={(value, event) => onClickDay(value, event)}
                    />
                  </div>
                )}
              </div>
              <BlockButton
                text={"Сохранить"}
                onClick={() => {
                  setShowDeadline(true);
                  onClick();
                //   if (currentList?.step.id)
                //     updateStepApi(currentList?.step.id, 8);
                //     dispatch(changeCountNotify(user.id, 1))
                //   dispatch(getStep());
                }}
                disabled={deadline === "Выберите дату"}
              />
            </div>
          ) : (
            <div className={styles.deadline}>
              <p className={styles.deadline__week}>
                {new Date(deadline).toLocaleString("ru", { weekday: "long" })}
              </p>
              <p className={styles.deadline__day}>
                Вы установили дедлайн на {deadline}
              </p>
              <BlockButton
                text={"Изменить дедлайн"}
                onClick={() => setShowDeadline(false)}
                bigWidth={true}
              />
            </div>
          )}
        </>
    )
}