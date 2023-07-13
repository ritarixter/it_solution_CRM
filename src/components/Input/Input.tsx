import { FC } from "react";
import styles from "./Input.module.scss";

type TInput = {
  setValue: (value: string) => void;
  value: string;
  type: "text" | "date" | "email";
  name: string;
  text: string;
  error?: boolean;
  errorText?: string;
  big?: boolean;
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
      <p className={styles.caption}>{text}</p>
      <input
        type={type}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        className={`${styles.input} ${error && styles.error}`}
        placeholder={name}
      />
      {error && <span className={styles.error_text}>{errorText}</span>}
    </div>
  );
};
