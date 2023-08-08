import { FC, useState } from "react";
import styles from "./DropdownList.module.scss";
import arrow from "../../images/icons/arrow_down.svg";

export type TDropdownList = {
  data: Array<string>;
  state: string;
  setState: (value: string) => void;
  name: string;
  size?: "big" | "small";
};

export const DropdownList: FC<TDropdownList> = ({
  data,
  state,
  setState,
  name,
  size,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handlerClick = (index: number) => {
    setState(data[index]);
    setOpen(false);
  };

  return (
    <div className={styles.dropdownList}>
      {/* <Label text={name} /> */}
      <p className={styles.caption}>{name}</p>

      <div
        className={`${styles.select} ${open && styles.select_open} 
        ${
          (state.includes("Не назначен") || state.includes("Не назначена")) &&
          styles.null
        } 
        ${
          (state.includes("В работе") || state.includes("Средняя")) &&
          styles.blue
        } ${
          (state.includes("На согласовании") || state.includes("Высокая")) &&
          styles.red
        } ${
          (state.includes("Закончено") || state.includes("Низкая")) &&
          styles.green
        }
        
          `}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <span className={styles.title}>{state}</span>
        <img
          src={arrow}
          className={`${styles.arrow} ${open && styles.arrow_open}`}
          alt="Стрелка выпадающего списка"
        />
        {open && (
          <ul className={styles.menu}>
            {data.map((item, index) => (
              <li
                className={`${styles.option}  
                ${
                  (item.includes("Не назначен") || state.includes("Не назначена")) &&
                  styles.null
                } 
                ${
                  (item.includes("В работе") || item.includes("Средняя")) &&
                  styles.blue
                } ${
                  (item.includes("На согласовании") ||
                  item.includes("Высокая")) &&
                  styles.red
                } ${
                  (item.includes("Закончено") || item.includes("Низкая")) &&
                  styles.green
                }`}
                key={item}
                onClick={() => {
                  handlerClick(index);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
