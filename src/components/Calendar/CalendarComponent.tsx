import React, { FC, useEffect, useState } from "react";
import styles from "./Calendar.module.scss";
import ReactCalendar from "react-calendar";
import "./Calendar.css";
import { TTask } from "../../types";
import { formateDate } from "./../../utils/utils-date";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getTaskByDate } from "../../services/slices/task";
import moment from "moment";

export type TCalendar = {
  tasks: Array<TTask>;
};

export const CalendarComponent: FC<TCalendar> = ({ tasks }) => {
  const [task, setTask] = useState<Array<TTask>>([]);
  const [clickedDay, setClickedDay] = useState<String>();
  const dispatch = useAppDispatch();

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

    dispatch(getTaskByDate(value.toJSON()));
    // console.log(new Date('2023-07-10T17:38:00.000Z') > new Date(value) ? "После" : "До");
  };

  if (!clickedDay) {
    dispatch(getTaskByDate(moment().format()));
    setClickedDay(moment().format()); //КОСТЫЛЬ
  }

  const checkEvents = () => {
    const element = document.getElementsByClassName(
      "react-calendar__tile"
    ) as HTMLCollectionOf<HTMLElement>;
    if (element.length !== 0 && task.length != 0) {
      for (let i = 0; i < element.length; i++) {
        let day = element[i].children[0].ariaLabel?.split(" ")[0];
        day = day?.length !== 1 ? day : "0" + day;
        const month = parseMonth(
          element[i].children[0].ariaLabel?.split(" ")[1]
        );
        const year = element[i].children[0].ariaLabel?.split(" ")[2];
        const thisDate = year + "-" + month + "-" + day;
        for (let j = 0; j < task.length; j++) {
          if (
            thisDate == formateDate(task[j].endDate).split(",")[0] &&
            !task[j].done
          ) {
            let taskOnCalendar = document.createElement("div");
            taskOnCalendar.style.position = "absolute";
            taskOnCalendar.style.width = "10px";
            taskOnCalendar.style.height = "10px";
            taskOnCalendar.style.background = "#F47633";
            taskOnCalendar.style.borderRadius = "10px";
            element[i].prepend(taskOnCalendar);
          }
        }
      }
    }
    return <></>;
  };

  const parseMonth = (month: string | undefined) => {
    switch (month) {
      case "января":
        return "01";
      case "февраля":
        return "02";
      case "марта":
        return "03";
      case "апреля":
        return "04";
      case "мая":
        return "05";
      case "июня":
        return "06";
      case "июля":
        return "07";
      case "августа":
        return "08";
      case "сентября":
        return "09";
      case "октября":
        return "10";
      case "ноября":
        return "11";
      case "декабря":
        return "12";
      default:
        break;
    }
  };

  const elementClick = (e: any) => {
    setTimeout(() => {
      checkEvents();
    }, 0);
  };

  useEffect(() => {
    setTask(tasks);
  }, [tasks]);

  return (
    <div className={styles.calendarTittleArea} onClick={(e) => elementClick(e)}>
      <div>
        <strong className={styles.calendarTittle}>Календарь</strong>
      </div>
      <div className="calendar-container">
        <ReactCalendar
          onActiveStartDateChange={checkEvents}
          onClickDay={(value, event) => onClickDay(value, event)}
        />
        {checkEvents()}
      </div>
    </div>
  );
};
