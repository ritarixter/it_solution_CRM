import { FC, useState } from "react";
import avatar from "../../../images/photo_3.jpg";
import { UserBlock } from "../../UserBlock/UserBlock";
import { AvatarDefault } from "../../AvatarDefault/AvatarDefault";
import styles from "./Scheme.module.scss";
import { TUser } from "../../../types";
import { access } from "../../../utils/constants";
type TScheme = {
  users: Array<TUser>;
};
export const Scheme: FC<TScheme> = ({ users }) => {
  const engineer = users.filter((user) => user.access === access.ENGINEER);
  const fitters = users.filter((user) => user.access === access.FITTER);
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
                  </li>
                  <li className={styles.stock}>
                    <a href="#">Склад</a>
                  </li>
                  <li className={styles.project}>
                    <a href="#">Проектный отдел</a>
                  </li>
                  <li className={styles.lawyer}>
                    <a href="#">Юридический отдел</a>
                  </li>
                  <li
                    className={`${styles.deputyEng} ${
                      engineer.length > 0 && styles.active
                    }`}
                  >
                    <a className={styles.title} href="#">
                      Инженер
                    </a>
                    {engineer.length > 0 ? (
                      <UserBlock
                        name={engineer[0].name}
                        fullName={true}
                        avatar={engineer[0].avatar}
                      />
                    ) : (
                      "Не назначен"
                    )}
                    <ul>
                      <li className={styles.firstEng}>
                        <a href="#">Бригада монтажников</a>
                        <div className={styles.block}>
                        {fitters.length > 0 ? (
                          fitters.map((item: any) => (
                            <UserBlock
                            name={item.name}
                            avatar={item.avatar}
                          />
                          ))
                        ) : (
                          "Не назначен"
                        )}
                        </div>
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
