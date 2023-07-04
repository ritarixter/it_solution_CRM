import { useState } from 'react';
import styles from './EffectMeter.module.scss';
import 'moment/locale/ru'
import { TDates} from './TDates';
import { TEffectMeter } from './TEffectMeter';
import { useEffect } from 'react';
import { FC } from 'react';


export const EffectMeter: FC<TEffectMeter> = ({arr, name}) => {

    const firstCircle = 16.7;                           //  КРУГ СПИДОМЕРТА
    const secondCircle = 16.7;
    const thirdCircle = 16.6;

    let rotate: number = 0;                             // ДЛЯ ПОВОРОТА СТРЕЛКИ
    let legalDepartmentSpeed: String = 'Средняя'        // СТАТУС


    const [dates, setDates] = useState<Array<TDates>>([])

    useEffect(() => {
        setDates(arr)
    }, arr)

    const def = () => {
        if (dates[0]) {
            for (let i = 0; i < dates.length; i++) {
                if (isEarly(i)) {
                    console.log("Рано");
                    getRotate(i, 90, 30)       // рано
                }
                else if (isOnTime(i)) {
                    console.log("Во время");
                    getRotate(i, 30)     // во время
                }
                else getRotate(i, -30, 30)                 // поздно
            }
            rotate = rotate / dates.length
            if (rotate <= -90) rotate = -90
            else if (rotate >= 90) rotate = 90

            setSpeed()
        }
        return (
            <div className={styles.square} style={{ rotate: `${rotate}deg` }}>
                <div className={styles.pivont_point}></div>
            </div>
        )
    }

    const getRotate = (i: number, start: number, maxDate?: number) => {                    // принимает начальный градус поворота в зависимости от условии и срок
        const maxDay = maxDate || (Date.parse(dates[i].toFinishData) - (Date.parse(dates[i].fromFinishDate))) / 1000 / 60 / 60 / 24     // только если успевает во время. Иначе по умолчанию 30 дней
        const implementationTime = (Date.parse(dates[i].implementationDate) - (Date.parse(dates[i].fromFinishDate))) / 1000 / 60 / 60 / 24      // диапазон дедлайна
        rotate += start - (60 / maxDay) * implementationTime            // ПОЛУЧАЕМ ПОВОРОТ В ГРАДУСЕ
    }

    const isEarly = (i: number) => {
        return (Date.parse(dates[i].implementationDate) - Date.parse(dates[i].fromFinishDate)) / 1000 / 60 / 60 / 24 < 0
    }

    const isOnTime = (i: number) => {
        return (Date.parse(dates[i].implementationDate) - Date.parse(dates[i].fromFinishDate)) / 1000 / 60 / 60 / 24 > 0 &&
            (Date.parse(dates[i].implementationDate) - Date.parse(dates[i].toFinishData)) / 1000 / 60 / 60 / 24 >
            (Date.parse(dates[i].fromFinishDate) - Date.parse(dates[i].toFinishData)) / 1000 / 60 / 60 / 24
    }

    const setSpeed = () => {                                                // ПОЛУЧАЕМ СТАТУС
        rotate >= -30 && rotate <= 30 ? legalDepartmentSpeed = 'Средняя' :
            rotate < -30 ? legalDepartmentSpeed = 'Тормозы' : legalDepartmentSpeed = 'Молодцы';
    }

    const CircleFunc = () => {
        return (
            <svg
                className={styles.chart}
                width={210}
                height={210}
                viewBox="0 0 50 50"
            // filter = "drop-shadow(0px -5px 10px rgb(0 0 0 / 0.2))"
            >
                <circle className={styles.unit} style={{ 'strokeDasharray': `${firstCircle} 100` }} r={15.9} cx="50%" cy="50%" />
                <circle className={styles.unit} style={{ 'strokeDasharray': `${secondCircle} 100`, 'strokeDashoffset': -firstCircle }} r={15.9} cx="50%" cy="50%" />
                <circle className={styles.unit} style={{ 'strokeDasharray': `${thirdCircle} 100`, 'strokeDashoffset': -(firstCircle + secondCircle) }} r={15.9} cx="50%" cy="50%" />
            </svg>
        )
    }

    return (
        <div className={styles.effectMeter}>
            <div className={styles.CircleFunc}>
                {CircleFunc()}
            </div>
            <div className={styles.department}>{name}</div>
            {def()}
            <div className={styles.speed}>{legalDepartmentSpeed}</div>
        </div>
    );
};