import React from 'react';
import styles from './Scheme.module.scss';

export const Scheme = () => {
    return (
        // <div >

        <div className={styles.scheme}>
            <div className={styles.wrapper}>
                <span className={styles.label}>Менеджер</span>
                <div className={styles.branch}>
                    {/* <div className={styles.entry}> */}
                        <span className={styles.label}>Инженер</span>
                        <div className={styles.branch}>
                            <div className={styles.entry}>
                                <span className={styles.label}>Отдел закупок</span>
                            </div>
                            <div className={styles.entry}>
                                <span className={styles.label}>Проектный отдел</span>
                            </div>
                            <div className={styles.entry}>
                                <span className={styles.label}>Юридический отдел</span>
                            </div>
                            <div className={styles.entry}>
                                <span className={styles.label}>Бригадир и монтажники</span>
                            </div>
                        </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};