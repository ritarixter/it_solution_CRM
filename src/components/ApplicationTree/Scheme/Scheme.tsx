import { FC, useState } from "react";
import avatar from "../../../images/photo_3.jpg";
import { UserBlock } from "../../UserBlock/UserBlock";
import { AvatarDefault } from "../../AvatarDefault/AvatarDefault";
import styles from "./Scheme.module.scss";
import { TList, TUser } from "../../../types";
import { NOT_ASSIGNED_DEAD, NOT_ASSIGNED_DEAD_W, access } from "../../../utils/constants";
import { useLocation } from "react-router";
import { TStep } from "../../../types/TStep";
export type TScheme = {
  users: Array<TUser>;
  list: TList | null;
};
export const Scheme: FC<TScheme> = ({ users, list }) => {
  const [steps, setSteps] = useState<TStep | null>(list ? list.step : null);

  const engineer = users.filter((user) => user.access === access.ENGINEER);
  const fitters = users.filter((user) => user.access === access.FITTER);
  return (
    <div className={styles.scheme}>
      <div className={styles.tree}>
        <ul>
          <li>
            <a href="#" className={`${styles.manager}`}>
              Менеджер
            </a>
            <ul>
              <li
                className={`${styles.mainEng} ${
                  steps?.createList_step1 && styles.active
                }`}
              >
                <a href="#" className={styles.eng}>
                  Главный Инженер
                </a>

                {/* {isPriority && getInfo()} */}
                <ul>
                  <li
                    className={`${styles.purchasing}  ${
                      steps?.createCP_step3 && styles.active
                    }`}
                  >
                    <a href="#">Отдел закупок</a>
                  </li>
                  <li className={styles.project}>
                    <a href="#">Проектный отдел</a>
                  </li>
                  <li
                    className={`${styles.lawyer} ${
                      steps?.calcMarginality_step6 && styles.active
                    }`}
                  >
                    <a href="#">Юридический отдел</a>
                  </li>
                  <li
                    className={`${styles.deputyEng}
                     ${steps?.chooseEngineer_step2 && styles.active}
                      `}
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
                      NOT_ASSIGNED_DEAD
                    )}
                    <ul>
                      <li
                        className={`${styles.firstEng} ${
                          steps?.ChooseFitter_step3_1 && styles.active
                        }`}
                      >
                        <a href="#">Бригада монтажников</a>
                        <div className={styles.block}>
                          {fitters.length > 0
                            ? fitters.map((item: any) => (
                                <UserBlock
                                  name={item.name}
                                  avatar={item.avatar}
                                />
                              ))
                            : NOT_ASSIGNED_DEAD_W}
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
      <div
        className={`${styles.acsynya} ${
          steps?.checkCPbySuperEngineer_step5 && styles.active
        }`}
      >
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
