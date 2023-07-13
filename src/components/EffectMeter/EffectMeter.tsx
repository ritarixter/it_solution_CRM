import { useState } from 'react';
import styles from './EffectMeter.module.scss';
import 'moment/locale/ru'
import { TDates } from './TDates';
import { TEffectMeter } from './TEffectMeter';
import { useEffect } from 'react';
import { FC } from 'react';


export const EffectMeter: FC<TEffectMeter> = ({ arr, name }) => {

    const firstCircle = 16.6;                               // ДЛИНА КРУГА СПИДОМЕРТА
    const secondCircle = 16.7;
    const thirdCircle = 16.6;

    let rotate: number = 0;                                 // ДЛЯ ПОВОРОТА СТРЕЛКИ
    let legalDepartmentSpeed: String = 'Средняя'            // СТАТУС


    const [dates, setDates] = useState<Array<TDates>>([])

    useEffect(() => {
        setDates(arr)
    }, arr)

    const def = () => {                                     // Ф-Я ДЛЯ ОПРЕДЕЛЕНИЯ ПОВОРОТА СТРЕЛКИ
        if (dates[0]) {
            for (let i = 0; i < dates.length; i++) {
                if (isEarly(i)) {
                    getRotate(i, 90, 30)                    // РАНО
                }
                else if (isOnTime(i)) {
                    getRotate(i, 30)                        // ВО ВРЕМЯ
                }
                else getRotate(i, -30, 30)                  // ПОЗДНО
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

    const getRotate = (i: number, start: number, maxDate?: number) => {         // ПРИНИМАЕТ НАЧАЛЬНЫЙ ГРАДУС ПОВОРОТА В ЗАВИСИМОСТИ ОТ УСЛОВИИ И СРОК
        const maxDay = maxDate || (Date.parse(dates[i].toFinishData) -
            (Date.parse(dates[i].fromFinishDate))) / 1000 / 60 / 60 / 24        // ТОЛЬКО ЕСЛИ УСПЕВАЕТ ВО ВРЕМЯ. ИНАЧЕ ПО УМОЛЧАНИЮ 30 ДНЕЙ
        const implementationTime = (Date.parse(dates[i].implementationDate) -
            (Date.parse(dates[i].fromFinishDate))) / 1000 / 60 / 60 / 24        // ДИАПАЗОН ДЕДЛАЙНА
        rotate += start - (60 / maxDay) * implementationTime                    // ПОЛУЧАЕМ ПОВОРОТ В ГРАДУСЕ
    }

    const isEarly = (i: number) => {                                            // ЕСЛИ РАБОТА БЫЛА СДЕЛАНА ДО НАЧАЛА ДЕДЛАЙНА
        return (Date.parse(dates[i].implementationDate) -
            Date.parse(dates[i].fromFinishDate)) / 1000 / 60 / 60 / 24 < 0
    }

    const isOnTime = (i: number) => {                                           // ЕСЛИ РАБОТА БЫЛА СДЕЛАНА ПОСЛЕ НАЧАЛА ДЕДЛАЙНА И ДО КОНЦА ДЕДЛАЙНА
        return (Date.parse(dates[i].implementationDate) -                       // ДАТА ВЫПОЛНЕНИЯ 
            Date.parse(dates[i].fromFinishDate)) / 1000 / 60 / 60 / 24 > 0 &&   // КОНЕЧНАЯ ДАТА ДЕДЛАЙНА
            (Date.parse(dates[i].implementationDate) -
                Date.parse(dates[i].toFinishData)) / 1000 / 60 / 60 / 24 >      // НАЧАЛЬНАЯ ДАТА ДЕДЛАЙНА
            (Date.parse(dates[i].fromFinishDate) -
                Date.parse(dates[i].toFinishData)) / 1000 / 60 / 60 / 24
    }

    const setSpeed = () => {                                                    // ПОЛУЧАЕМ СТАТУС
        rotate >= -30 && rotate <= 30 ? legalDepartmentSpeed = 'Средняя' :
            rotate < -30 ? legalDepartmentSpeed = 'Тормозы' : legalDepartmentSpeed = 'Молодцы';
    }

    const CircleFunc = () => {                                                  // ПОЛУКРУГ ДЛЯ ПОКАЗАТЕЛЯ ЭФФЕКТИВНОСТИ
        return (
            <svg
                className={styles.chart}
                width={133}
                height={133}
                viewBox="0 0 34 34"
            >
                <circle className={styles.unit} style={{ 'strokeDasharray': `${firstCircle} 100` }} r={15.9} cx="50%" cy="50%" />
                <circle className={styles.unit} style={{ 'strokeDasharray': `${secondCircle} 100`, 'strokeDashoffset': - firstCircle }} r={15.9} cx="50%" cy="50%" />
                <circle className={styles.unit} style={{ 'strokeDasharray': `${thirdCircle} 100`, 'strokeDashoffset': -(firstCircle + secondCircle) }} r={15.9} cx="50%" cy="50%" />
            </svg>
        )
    }

    return (
        <div className={styles.effectMeter}>
            <div className={styles.CircleFunc}>
                {CircleFunc()}
            </div>
            <div className={styles.department}>
                {name}
            </div>
            {def()}
            <div className={styles.speed}>
                {legalDepartmentSpeed}
            </div>
        </div>
    );
};