import { FC } from "react";
import styles from "./HeaderTop.module.scss";
import { Search } from "../Search/Search";
import message from "../../images/icons/message.svg";
import bell from "../../images/icons/bell.svg";
import notice from "../../images/icons/notice.svg";
import { UserBlock } from "../UserBlock/UserBlock";
import photo from "../../images/photo1.jpg";
import arrow from "../../images/icons/arrow.svg";

export const HeaderTop: FC = () => {
  return (
    <div className={styles.block}>
      <Search />
      <div className={styles.block_users}>
        <div className={styles.block_icon}>
          <img src={message} alt="Сообщение" className={styles.message} />
          <img src={notice} alt="Кол-во сообщений" className={styles.notice} />
        </div>
        <div>
          <img src={bell} alt="Уведомление" className={styles.bell} />
        </div>
        <div className={styles.users}>
          <UserBlock name={"Master Doch"} avatar={photo} fullName={true} />
          <img src={arrow} alt="Стрелка" className={styles.arrow} />
        </div>
      </div>
    </div>
  );
};
