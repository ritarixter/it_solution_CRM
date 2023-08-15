import { FC, useState } from "react";
import styles from "./DropdownList.module.scss";
import arrow from "../../images/icons/arrow_down.svg";
import { impotance, statusConst } from "../../utils/constants";

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
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handlerClick = (index: number) => {
    setState(data[index]);
    setOpen(false);
  };

  return (
    <div className={styles.dropdownList}>
      <p className={styles.caption}>{name}</p>

      <div
        className={`${styles.select} ${open && styles.select_open} 
        ${
          (state.includes(statusConst.NOT_ASSIGNED_DEAD) ||
            state.includes(impotance.NOT_ASSIGNED_DEAD)) &&
          styles.null
        } 
        ${
          (state.includes(statusConst.IN_WORK) ||
            state.includes(impotance.AVERAGE)) &&
          styles.blue
        } ${
          (state.includes(statusConst.BE_AGREED) ||
            state.includes(impotance.HIGH)) &&
          styles.red
        } ${
          (state.includes(statusConst.FINISHED) ||
            state.includes(impotance.LOW)) &&
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
                  (item.includes(statusConst.NOT_ASSIGNED_DEAD) ||
                    item.includes(impotance.NOT_ASSIGNED_DEAD)) &&
                  styles.null
                } 
                ${
                  (item.includes(statusConst.IN_WORK) ||
                    item.includes(impotance.AVERAGE)) &&
                  styles.blue
                } ${
                  (item.includes(statusConst.BE_AGREED) ||
                    item.includes(impotance.HIGH)) &&
                  styles.red
                } ${
                  (item.includes(statusConst.FINISHED) ||
                    item.includes(impotance.LOW)) &&
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
