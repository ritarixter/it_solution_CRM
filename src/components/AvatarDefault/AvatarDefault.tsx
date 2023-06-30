import { FC } from "react";
import styles from "./AvatarDefault.module.scss";

export const AvatarDefault: FC<{ name: string }> = ({ name }) => {
  let initials = "";
  if (name.includes("+")) {
    initials = name;
  } else {
    initials = name
      .split(" ")
      .reverse()
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
  }
  return (
    <div
      className={`${styles.circle} ${styles.default} ${
        name.includes("+") && name.length === 2 && styles.pl
      }`}
    >
      {initials}
    </div>
  );
};
