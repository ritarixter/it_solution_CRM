import React from 'react';
import styles from "./ProfileWindowPopup.module.scss"
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { items } from './constants'


export const ProfileWindowPopup = () => {
    
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const navigate = useNavigate();

    return (
        <div
            className={`${styles.profileWindow} ${isOpen && styles.profileWindow_opened}`}
            onClick={() => setIsOpen(false)}
        >
            <div className={styles.profileWindow__container} onClick={e => e.stopPropagation()}>
                {items.map(item =>
                    <div
                        key={item.id}
                        onClick={() => navigate(item.route)}
                        className={`${styles.item} ${items.length > item.id && styles.bottomBorder}`}
                    >
                        <img className={styles.icons} src={String(item.img)} alt={String(item.name)} />
                        {item.name}
                    </div>
                )}
            </div>
        </div>
    );
};