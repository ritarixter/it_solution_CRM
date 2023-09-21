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
          if (e.target.value === "0.") return setValue(e.target.value); // ЕСЛИ ДРОБЬ
          if (                                                          // ЕСЛИ ПОСЛЕ НУЛЯ ЦИФРА УДАЛЯЕТ ПЕРЕДНИЙ НУЛИК 01=>1
            String(value) &&
            e.target.value[0] === "0" &&
            e.target.value[1] &&
            e.target.value[1] !== "." &&
            e.target.value[3] !== "."
          )
            return setValue(e.target.value.substring(1));
          if (e.target.value === "00") return setValue(0);              // ЕСЛИ ДВА НУЛЯ
          setValue(e.target.value);
        }}
        min={0}
        maxLength={60}
        value={value}
        className={`${styles.input} ${error && styles.error} ${
          text && styles.mb_8
        }`}
        placeholder={name}
      />
      {error && <p className={styles.error_text}>{errorText}</p>}
    </div>
  );
};
