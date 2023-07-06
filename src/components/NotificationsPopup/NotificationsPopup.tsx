import React from 'react';
import styles from "./NotificationsPopup.module.scss"
import moment from 'moment';
import 'moment/locale/ru'
import { events } from './constants';
import { useState } from 'react';

export const NotificationsPopup = () => {

    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <div
            className={`${styles.popup} ${isOpen && styles.popup_opened}`}
            onClick={() => setIsOpen(false)}
        >
            <div className={styles.popup__container} onClick={e => e.stopPropagation()}>
                {events.map(event=>
                    <div key={event.id} className={styles.truncate}>
                        {event.title}
                        <div className={styles.dateFromNow}>
                            {moment(event.createdAt, "YYYYMMDDhhmmss").fromNow()}
                        </div>
                    </div>
                )}
                <div className={styles.buttons}>
                    <button className={styles.btnShow}>Показать всё</button>
                </div>
            </div>
        </div>
    );
};