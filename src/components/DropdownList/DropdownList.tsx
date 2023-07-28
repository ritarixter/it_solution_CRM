import { FC, useEffect, useState } from "react";
import styles from "./DropdownList.module.scss";
import arrow from "../../images/icons/arrow_down.svg";
import { at, isArray } from "lodash";

export type TDropdownList = {
  data: Array<{ id: string; name: string; type?: string }>;
  state: string;
  setState: (value: string) => void;
  name: string;
  size?: "big" | "small";
  selected?: Array<string>;
  setSelected?: (value: Array<string>) => void;
};

export const DropdownList: FC<TDropdownList> = ({
  data,
  state,
  setState,
  name,
  size,
  // selected,
  // setSelected,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Array<string>>([])
  const defaultState = "Выберите ...";
  let inSelected = selected!.join(", ");

  const handlerClick = (index: number) => {
    let inArray = false;
    if (selected && setSelected) {
      selected.map((work) => {
        if (work === data[index].name) {
          setSelected(
            selected.filter((currentWork) => {
              return currentWork !== data[index].name;
            })
          );
          setState(
            selected.length - 1 > 0
              ? arrForState(
                  selected.filter((currentWork) => {
                    return currentWork !== data[index].name;
                  })
                )
              : defaultState
          );
          inArray = true;
        }
      });
      if (!inArray) {
        setSelected([...selected, data[index].name]);
        setState(textForState(data[index].name));
      }
      console.log(inSelected);
    }
  };

  const textForState = (selected: string) => {
    if(inSelected.length < 1) inSelected += selected
    else inSelected += ', ' + selected
    return inSelected;
  };

  const arrForState = (selected: string[]) => {
    inSelected = selected.join(", ")
    return inSelected;
  };

  useEffect(() => {
    // console.log(selected);
  }, [selected, inSelected]);

  return (
    <div className={styles.dropdownList}>
      <p className={styles.caption}>{name}</p>

      <div className={`${styles.select} ${open && styles.select_open}`}>
        <span
          className={styles.title}
          onClick={() => {
            setOpen(!open);
          }}
        >
          {state}
        </span>
        <img
          src={arrow}
          className={`${styles.arrow} ${open && styles.arrow_open}`}
          onClick={() => {
            setOpen(!open);
          }}
          alt="Стрелка выпадающего списка"
        />
        {open && (
          <ul className={styles.menu}>
            {data.map((item, index) => {
              let clicked = "";
              let isSelected = false;
              if (selected) {
                for (let i = 0; i < selected.length; i++) {
                  if (item.name === selected[i]) {
                    isSelected = true;
                    break;
                  }
                }
                if (isSelected) clicked = `${styles.clicked}`;
                else clicked = "";
              }
              return (
                <li
                  className={`${styles.option} ${clicked}`}
                  key={item.id}
                  onClick={() => {
                    handlerClick(index);
                  }}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
