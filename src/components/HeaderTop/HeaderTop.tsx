import { FC } from "react";
import styles from "./HeaderTop.module.scss";
import { Search } from "../Search/Search";
import message from "../../images/icons/message.svg";
import bell from "../../images/icons/bell.svg";
import notice from "../../images/icons/notice.svg";
import { UserBlock } from "../UserBlock/UserBlock";
import arrow from "../../images/icons/arrow.svg";
import { useAppSelector } from "../../services/hooks";

export const HeaderTop: FC = () => {
  const { user } = useAppSelector((state) => state.user);
  

  return (
    <div className={styles.block}>
     { user ? 
     <>
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
          <UserBlock name={user.name} avatar={user.avatar} fullName={true} />
          <img src={arrow} alt="Стрелка" className={styles.arrow} />
        </div>
      </div></> : 
      <span>Загрузка...</span>
      }
    </div>
  );
};
