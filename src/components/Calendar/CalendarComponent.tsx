import React, { FC, useEffect, useState } from "react";
import moment from "moment";
import ReactCalendar from "react-calendar";
import { TTask } from "../../types";
import { formateDate } from "./../../utils/utils-date";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getTaskByDate } from "../../services/slices/task";
import styles from "./Calendar.module.scss";
import "./Calendar.css";

export type TCalendar = {
  tasks?: Array<TTask>;
};

export const CalendarComponent: FC<TCalendar> = () => {
  const { tasks } = useAppSelector((state) => state.task);
  const [task, setTask] = useState<Array<TTask>>([]);
  const [clickedDay, setClickedDay] = useState<String>();
  const dispatch = useAppDispatch();
  console.log(tasks);

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

    dispatch(getTaskByDate(value.toJSON()));              // для получения данных по выбранному дню
    // console.log(new Date('2023-07-10T17:38:00.000Z') > new Date(value) ? "После" : "До");
  };

  if (!clickedDay) {
    dispatch(getTaskByDate(moment().format()));           // по умолчанию выбран сег день
    setClickedDay(moment().format());                     //
  }

  const checkEvents = () => {                             // проверка задач по дням
    const element = document.getElementsByClassName(
      "react-calendar__tile"
    ) as HTMLCollectionOf<HTMLElement>;
    if (element.length !== 0 && task.length != 0) {       // element это все кнопки (дни месяца и тп)
      for (let i = 0; i < element.length; i++) {          // ПРОБЕЖКА ПО КАЖДОМУ ЭЛЕМЕНТУ
        let day = element[i].children[0].ariaLabel?.split(" ")[0];
        day = day?.length !== 1 ? day : "0" + day;
        const month = parseMonth(
          element[i].children[0].ariaLabel?.split(" ")[1]
        );
        const year = element[i].children[0].ariaLabel?.split(" ")[2];
        const thisDate = year + "-" + month + "-" + day;  // из каждого эл-та получаю дату чтобы переформировать в таком формате yy-mm-dd
        for (let j = 0; j < task.length; j++) {           // ПРОБЕЖКА ПО КАЖДОМУ ТАСКУ ДЛЯ СВЕРКИ ДАТЫ
          // let taskOnCalendar = document.getElementsByClassName('taskOnCalendar')
          let taskOnCalendar = document.createElement('div');
            taskOnCalendar.id = 'taskOnCalendar'
            taskOnCalendar.className = 'taskOnCalendar'
          if (
            thisDate == formateDate(task[j].endDate).split(",")[0] &&
            !task[j].done
          ) {
            // setTimeout(() => {
            //   element[i].prepend(taskOnCalendar); // ДЛЯ ПОКАЗА СОЗДАННОЙ ЗАДАЧИ
            // }, 0);
            element[i].prepend(taskOnCalendar);
          }
          // else {
          //   let elem = document.getElementById('taskOnCalendar');
          //   elem?.remove();
          // }
        }
      }
    }
    return <></>;
  };

  const parseMonth = (month: string | undefined) => {     // текста перевожу в текстовый формат месяца
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

  const elementClick = (e: any) => {                      // для случай перехода к след или пред месяц или год (можно было использовать useLayoutEffect)
    setTimeout(() => {                                    // чтобы сделать асинхронным (можно было использовать промисы)
      checkEvents();
    }, 0);
  };

  useEffect(() => {
    setTask(tasks);
    checkEvents();
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
