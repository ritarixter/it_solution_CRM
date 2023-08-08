import { FC } from "react";
import styles from "./UserBlock.module.scss";
import { AvatarDefault } from "../AvatarDefault/AvatarDefault";
import { URL_BACKEND } from "../../utils/constants";

type TUserBlock = {
  avatar?: string;
  name: string;
  fullName?: boolean; //Отображение всего имени
};
export const UserBlock: FC<TUserBlock> = ({
  avatar,
  name,
  fullName = false,
}) => {
  return (
    <div className={styles.user}>
      {avatar ? (
        <img
          className={styles.avatar}
          src={`${URL_BACKEND}${avatar}`}
          alt="Аватар пользователя"
        />
      ) : (
        <AvatarDefault name={name} />
      )}

      {fullName && <p className={styles.name}>{name}</p>}
    </div>
  );
};
