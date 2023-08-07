import React, { useState } from "react";
import avatar from "../../../images/photo_3.jpg";
import inProgress from "../../../images/icons/in_process.svg";
import { UserBlock } from "../../UserBlock/UserBlock";
import { AvatarDefault } from "../../AvatarDefault/AvatarDefault";
import styles from "./Scheme.module.scss";

export const Scheme = () => {
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
                <a>Главный Инженер</a>
              {/* {isPriority && getInfo()} */}
              <ul>
                <li className={styles.purchasing}>
                  <a href="#">
                    Отдел закупок
                  </a>
                  {getAvatars()}
                </li>
                <li className={styles.stock}>
                  <a href="#">
                    Склад
                  </a>
                  {getAvatars()}
                </li>
                <li className={styles.project}>
                  <a href="#">
                    Проектный отдел
                  </a>
                  {getAvatars()}
                </li>
                <li className={styles.lawyer}>
                  <a href="#">
                    Юридический отдел
                  </a>
                  {getAvatars()}
                </li>
                <li className={styles.deputyEng}>
                  <a href="#">
                    Заместитель Инженера
                  </a>
                  <ul>
                    <li className={styles.firstEng}>
                      <a href="#">
                        Инженер
                      </a>
                      <ul>
                        <li>
                          <a href="#">Бригада монтажников</a>
                          {getAvatars()}
                        </li>
                      </ul>
                    </li>
                    <li className={styles.secondEng}>
                      <a href="#">
                        Инженер
                      </a>
                      {isPriority && getInfo()}
                      <ul>
                        <li className={styles.thirdEngBrigade}>
                          <a href="#">Бригада монтажников</a>
                          {getAvatars()}
                        </li>
                      </ul>
                    </li>
                    <li className={styles.thirdEng}>
                      <a href="#">
                        Инженер
                      </a>
                      <ul>
                        <li>
                          <a href="#">Бригада монтажников</a>
                          {getAvatars()}
                        </li>
                      </ul>
                      {/* <ul>
                                                    <li>
                                                        <a href="#">Бригада монтажников</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Бригада монтажников</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Бригада монтажников</a>
                                                    </li>
                                                </ul> */}
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
            <li className={styles.colorInfo_item}> Работу не началась</li>
        </ul>
      </div>
    </div>
    // </div>

    //     <div className={styles.main_manager}>
    //         <div className={styles.manager}>Менеджер</div>
    //     React.</div>
    //     <div>
    //         <div className={styles.enginer}>
    //             Инженер
    //         </div>
    //         <div>
    //             Высокий приоритет
    //         </div>
    //         <div>
    //             Дедлайн 20.12.23
    //         </div>
    //     </div>
    //     <div className={styles.rightBlock}>
    //         <div className={styles.firstBlock}>
    //             <div className={styles.purchasing}>
    //                 Отдел закупок
    //             </div>
    //             <div className={styles.avatars}>

    //             </div>
    //         </div>
    //         <div className={styles.firstBlock}>
    //             <div className={styles.projectDep}>
    //                 Проектный отдел
    //             </div>
    //             <div className={styles.avatars}>

    //             </div>
    //         </div>
    //         <div className={styles.firstBlock}>
    //             <div className={styles.legal}>
    //                 Юридический отдел
    //             </div>
    //             <div className={styles.avatars}>

    //             </div>
    //         </div>
    //         <div className={styles.firstBlock}>
    //             <div className={styles.brigade}>
    //                 Бригадир и монтажники
    //             </div>
    //             <div className={styles.avatars}>

    //             </div>
    //         </div>
    //     </div>
    // </div>
  );
};
