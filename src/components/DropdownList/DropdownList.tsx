import { FC, useState } from "react";
import styles from "./DropdownList.module.scss";
import arrow from "../../images/icons/arrow_down.svg";

export type TDropdownList = {
  data: Array<{ id: string; name: string; type?: string }>;
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
    setState(data[index].name);
    // setOpen(true);
  };

  return (
    <div className={styles.dropdownList}>
      {/* <Label text={name} /> */}
      <p className={styles.caption}>{name}</p>

      <div
        className={`${styles.select} ${open && styles.select_open} ${
          state.includes("Высокая") && styles.red
        } ${state.includes("Низкая") && styles.green} ${
          state.includes("В работе") && styles.blue
        } ${state.includes("На согласовании") && styles.red} ${
          state.includes("Закончено") && styles.green
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
                className={`${styles.option} ${
                  item.name.includes("Высокая") && styles.red
                } ${item.name.includes("Низкая") && styles.green} ${
                  item.name.includes("В работе") && styles.blue
                } ${item.name.includes("На согласовании") && styles.red} ${
                  item.name.includes("Закончено") && styles.green
                }`}
                key={item.id}
                onClick={() => {
                  handlerClick(index);
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
