import React from 'react';
import styles from "./ApplicationTree.module.scss";
import { Scheme } from './Scheme/Scheme';

export const ApplicationTree = () => {
    return (
        <div className={styles.applicationTree}>
            <div className={styles.rightBlock}>
                <h2>Статус заявки</h2>
                <Scheme />
            </div>
        </div>
    );
};