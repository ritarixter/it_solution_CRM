import { FC } from "react";
import styles from "./Input.module.scss";

type TInput = {
  setValue: (value: any) => void;
  value: any;
  type: "text" | "date" | "email" | "number";
  name: string;
  text?: string;
  error?: boolean;
  errorText?: string;
};

export const Input: FC<TInput> = ({
  value,
  type,
  name,
  error,
  text,
  errorText,
  setValue,
}) => {
  return (
    <div className={styles.block}>
      {text && <p className={styles.caption}>{text}</p>}
      <input
        type={type}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        min={0}
        value={value}
        className={`${styles.input} ${error && styles.error} ${
          text && styles.mb_8
        }`}
        placeholder={name}
      />
      {error && <span className={styles.error_text}>{errorText}</span>}
    </div>
  );
};
