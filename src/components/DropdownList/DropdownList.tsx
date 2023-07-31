import { FC, useEffect, useState } from "react";
import styles from "./DropdownList.module.scss";
import arrow from "../../images/icons/arrow_down.svg";
import { at, isArray } from "lodash";
import { useAppSelector } from "../../services/hooks";
import { TUser } from "../../types";

export type TDropdownList = {
  data: any;
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
  const [selected, setSelected] = useState<Array<string>>([]);
  const [selectedWorks, setSelectedWorks] = useState<Array<string>>([]);
  const defaultState = "Выберите ...";
  let inSelected = selectedWorks!.join(", ");

  const handlerClick = (index: number) => {
    let inArray = false;
    if (selected && setSelected) {
      selected.map((work) => {
        if (work === data[index].id) {
          setSelected(
            selected.filter((currentWork) => {

              return currentWork !== data[index].id;
            })
          );
          setSelectedWorks(
            selectedWorks.filter((currentWork) => {

              return currentWork !== data[index].name;
            })
          );
          setState(
            selected.length - 1 > 0
              ? arrForState(
                  selected.filter((currentWork) => {
                    return currentWork !== data[index].id;
                  })
                )
              : defaultState
          );
          inArray = true;
        }
      });
      if (!inArray) {
        setSelectedWorks([...selectedWorks, data[index].name])
        setSelected([...selected, data[index].id]);
        setState(textForState(data[index].name));
      }
      console.log(inSelected);
    }
  };

  const textForState = (selectedWorks: string) => {
    if(inSelected.length < 1) inSelected += selectedWorks
    else inSelected += ', ' + selectedWorks
    return inSelected;
  };

  const arrForState = (selectedWorks: string[]) => {
    inSelected = selectedWorks.join(", ")
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
            {data.map((item: any, index: number) => {
              let clicked = "";
              let isSelected = false;
              if (selected) {
                for (let i = 0; i < selected.length; i++) {
                  if (item.id === selected[i]) {
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
