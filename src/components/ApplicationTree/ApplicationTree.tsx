import React from 'react';
import styles from "./ApplicationTree.module.scss";
import { aboutCompany } from './constants';
import { Scheme } from './Scheme';

export const ApplicationTree = () => {
    return (
        <div className={styles.applicationTree}>
            {/* <div className={styles.leftBlock}>
                <h2>Текущая информация</h2>
                <p>Название компании*</p>
                <b>{aboutCompany.company}</b>
                <p>Телефон</p>
                <b>{aboutCompany.phone}</b>
                <p>Почта</p>
                <b>{aboutCompany.email}</b>
                <p>Исполнители</p>
                <b>{aboutCompany.executor}</b>
                <p>Крайний срок</p>
                <b>{aboutCompany.deadline}</b>
                <p>Комментарий</p>
                <b>{aboutCompany.comment}</b>
                <div>{ aboutCompany.status }</div>
                <div>{ aboutCompany.importance }</div>
                <img src={aboutCompany.files[0].src} alt='sdf' />
                <img src={aboutCompany.files[1].src} alt='sdf' />
            </div> */}
            <div className={styles.rightBlock}>
                <h2>Статус заявки</h2>
                <Scheme />
            </div>
        </div>
    );
};