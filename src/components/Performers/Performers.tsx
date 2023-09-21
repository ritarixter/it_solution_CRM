import { FC } from "react";
import styles from "./Performers.module.scss";
import { TUser } from "../../types";
import { NOT_ASSIGNED_DEAD, access } from "../../utils/constants";
import { UserBlock } from "../UserBlock/UserBlock";
import { useAppSelector } from "../../services/hooks";

type TPerformers = {
  users: Array<TUser>;
};

export const Performers: FC<TPerformers> = ({users}) => {
  const engineer = users.filter((user) => user.access === access.ENGINEER);
  const fitters = users.filter((user) => user.access === access.FITTER);
  return (
    <>
      <div className={styles.blockInfo}>
        <p className={styles.blockInfo_title}>Ответсвенный инженер</p>
        <p className={styles.blockInfo_text}>
          {engineer.length > 0 ? (
            <UserBlock
              name={engineer[0].name}
              fullName={true}
              avatar={engineer[0].avatar}
              phone={engineer[0].phone}
            />
          ) : (
            NOT_ASSIGNED_DEAD
          )}
        </p>
      </div>
      <div className={styles.blockInfo}>
        <p className={styles.blockInfo_title}>Бригада</p>
        <p className={styles.blockInfo_text}>
          {fitters.length > 0
            ? fitters.map((item: any) => (
                <UserBlock
                  name={item.name}
                  avatar={item.avatar}
                  fullName={true}
                  phone={item.phone}
                />
              ))
            : NOT_ASSIGNED_DEAD}
        </p>
      </div>
    </>
  );
};
