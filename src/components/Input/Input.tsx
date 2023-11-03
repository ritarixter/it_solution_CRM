import { FC } from "react";
import styles from "./Input.module.scss";

type TInput = {
  setValue: (value: any) => void;
  value: any;
  type: "text" | "date" | "email" | "number" | "password";
  name: string;
  text?: string;
  error?: boolean;
  errorText?: string;
  minLength?:number;
  maxLength?:number;
  min?:number;
};

export const Input: FC<TInput> = ({
  value,
  type,
  name,
  error,
  text,
  errorText,
  setValue,
  minLength=0,
  maxLength=60,
  min=0
}) => {
  return (

    <div className={styles.block}>
      {text && <p className={styles.caption}>{text}</p>}
      <input
        type={type}
        onChange={(e) => {
          // if (e.target.value === "0.") return setValue(e.target.value); // ЕСЛИ ДРОБЬ
          // if (                                                          // ЕСЛИ ПОСЛЕ НУЛЯ ЦИФРА УДАЛЯЕТ ПЕРЕДНИЙ НУЛИК 01=>1
          //   String(value) &&
          //   e.target.value[0] === "0" &&
          //   e.target.value[1] &&
          //   e.target.value[1] !== "." &&
          //   e.target.value[3] !== "."
          // )
          //   return setValue(e.target.value.substring(1));
          // if (e.target.value === "00") return setValue(0);              // ЕСЛИ ДВА НУЛЯ
          setValue(e.target.value);
        }}
        min={min}
        maxLength={maxLength}
        minLength={minLength}
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
