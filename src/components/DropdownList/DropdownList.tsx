import { FC, useState } from "react";
import styles from "./DropdownList.module.scss";
import arrow from "../../images/icons/arrow_down.svg";
import { impotance, statusConst } from "../../utils/constants";

export type TDropdownList = {
  data: Array<string>;
  state: string;
  setState: (value: string) => void;
  name?: string;
  size?: "big" | "small";
  error?: boolean;
};

export const DropdownList: FC<TDropdownList> = ({
  data,
  state,
  setState,
  name,
  error
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handlerClick = (index: number) => {
    setState(data[index]);
    setOpen(false);
  };

  return (
    <div className={styles.dropdownList}>
     {name && <p className={styles.caption}>{name}</p>}

      <div
        className={`${styles.select} ${open && styles.select_open} ${error && styles.select_error} `}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <span className={`${styles.title} ${state==='Выберите' && styles.title_null}`}>{state}</span>
        <img
          src={arrow}
          className={`${styles.arrow} ${open && styles.arrow_open}`}
          alt="Стрелка выпадающего списка"
        />
        {open && (
          <ul className={`${styles.menu} ${ error&& styles.menu_error}`}>
            {data.map((item, index) => (
              <li
                className={`${styles.option}  `}
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
