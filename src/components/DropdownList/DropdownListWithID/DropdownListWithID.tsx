import { FC, useState } from "react";
import styles from "./DropdownListWithID.module.scss";
import arrow from "../../../images/icons/arrow_down.svg";
import { TWorkAbdExecuter } from "../../../types";

export type TDropdownList = {
  data: Array<TWorkAbdExecuter>;
  state: TWorkAbdExecuter;
  setState: (value: TWorkAbdExecuter) => void;
  name?: string;
  size?: "big" | "small";
  error?: boolean;

};

export const DropdownListWithID: FC<TDropdownList> = ({
  data,
  state,
  setState,
  name,
  error,
  size
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handlerClick = (index: number) => {
    setState({name:data[index].name, id:data[index].id});
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
        <span className={`${styles.title} ${state.name==='Выберите' && styles.title_null}`}>{state.name}</span>
        <img
          src={arrow}
          className={`${styles.arrow} ${open && styles.arrow_open}`}
          alt="Стрелка выпадающего списка"
        />
        {open && (
          <ul className={`${styles.menu} ${ error&& styles.menu_error}`}>
            {data.map((item, index) => (
              <li
                className={`${styles.option} ${size==='small' && styles.option_small} `}
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
