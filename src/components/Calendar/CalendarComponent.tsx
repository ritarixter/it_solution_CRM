import React, { FC, useState } from "react";
import styles from "./Calendar.module.scss";
import ReactCalendar from 'react-calendar';
import './Calendar.css';



export const CalendarComponent: FC = () => {

    const [dateValue, setDateValue] = useState("")
    const onChange = () => {

    }

    const onClickDay = (value: any, event: any) => {
        value.setUTCHours(24)
        console.log(value.toJSON())
        const element = (document.getElementsByClassName('react-calendar__tile--now') as HTMLCollectionOf<HTMLElement>);
        if(element[0] != document.activeElement) element[0].style.opacity = '0.6'
    }



    return (
        <div className={styles.calendarTittleArea}>
            <div>
                <strong className={styles.calendarTittle}>Календарь</strong>
            </div>
            <div className="calendar-container">
                <ReactCalendar onChange={onChange} value={dateValue}
                    onClickDay={(value, event) => onClickDay(value, event)}
                />
            </div>
        </div>
    );
};