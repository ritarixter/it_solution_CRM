import { FC, useState } from "react";
import avatar from "../../../images/photo_3.jpg";
import { UserBlock } from "../../UserBlock/UserBlock";
import { AvatarDefault } from "../../AvatarDefault/AvatarDefault";
import styles from "./Scheme.module.scss";

export const Scheme: FC = () => {
  const [isPriority, setIsPriority] = useState<boolean>(true);

  const getAvatars = () => {
    return (
      <div className={styles.gotToWork}>
        <UserBlock avatar={avatar} name={""} />
        <UserBlock avatar={avatar} name={""} />
        <UserBlock avatar={avatar} name={""} />
        <UserBlock avatar={avatar} name={""} />
        <AvatarDefault name={"+4"} />
      </div>
    );
  };

  const getInfo = () => {
    return (
      <div className={styles.info}>
        <div className={styles.priority}>Высокий приоритет</div>
        <div className={styles.deadline}>Дедлайн 20.12.23</div>
      </div>
    );
  };

  return (
    <div className={styles.scheme}>
      <div className={styles.tree}>
        <ul>
          <li>
            <a href="#">Менеджер</a>
            <ul>
              <li className={styles.mainEng}>
                <a href="#">Главный Инженер</a>
                {/* {isPriority && getInfo()} */}
                <ul>
                  <li className={styles.purchasing}>
                    <a href="#">Отдел закупок</a>
                    {getAvatars()}
                  </li>
                  <li className={styles.stock}>
                    <a href="#">Склад</a>
                    {getAvatars()}
                  </li>
                  <li className={styles.project}>
                    <a href="#">Проектный отдел</a>
                    {getAvatars()}
                  </li>
                  <li className={styles.lawyer}>
                    <a href="#">Юридический отдел</a>
                    {getAvatars()}
                  </li>
                  <li className={styles.deputyEng}>
                    <a href="#">Инженер</a>
                    {getAvatars()}
                    <ul>
                      <li className={styles.firstEng}>
                        <a href="#">Бригада монтажников</a>
                        {getAvatars()}
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className={styles.acsynya}>
        <a href="#">Аксинья</a>
      </div>
      <div className={styles.colorInfo}>
        <ul className={styles.colorInfo_list}>
          <li className={styles.colorInfo_item}> Закончено</li>
          <li className={styles.colorInfo_item}> В процессе</li>
          <li className={styles.colorInfo_item}> Работа не началась</li>
        </ul>
      </div>
    </div>
  );
};
