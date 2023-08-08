import { FC } from "react";
import styles from "./Wrapper.module.scss";

export type TWrapper = {
  children: React.ReactNode;
};

export const Wrapper: FC<TWrapper> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
