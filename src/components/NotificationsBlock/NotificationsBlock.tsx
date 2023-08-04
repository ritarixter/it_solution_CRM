import { FC } from "react";
import styles from './NotificationsBlock.module.scss';
import { DropdownList } from "../DropdownList";

export const NotificationsBlock: FC = () => {
    return <div className={styles.box}>
        <p className={styles.box_text}>Важные сообщения о дедлайне</p>
    </div>
}