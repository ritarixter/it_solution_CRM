import React, { FC, useState } from "react";
import styles from "./Calendar.module.scss";
import ReactCalendar from 'react-calendar';
import './Calendar.css';


export const Calendar: FC = () => {

    const [dateValue, setDateValue] = useState("")
    const onChange = () => {

    }

    const onClickDay = (value: any, event: any) => {
        console.log(1900 + value.getYear() + " " + (1 + value.getMonth()) + " " + value.getDate())
    }

    return (
        <div>
            <div className={styles.calendarTittleArea}>
                <strong className={styles.calendarTittle}>Календарь</strong>
            </div>
            <div className="calendar-container">
                <ReactCalendar onChange={onChange} value={dateValue}
                    onClickDay={(value, event) => onClickDay(value, event)}
                />
            </div>
        </div>
    )
}