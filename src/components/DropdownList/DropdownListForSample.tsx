import { FC, useEffect, useState } from "react";
import styles from "./DropdownList.module.scss";
import arrow from "../../images/icons/arrow_down.svg";
import { at, isArray } from "lodash";
import { useAppSelector } from "../../services/hooks";
import { TUser } from "../../types";
import { TWorkAbdExecuter } from "../../types/TWorkAndExecuter";

export type TDropdownList = {
  data: any;
  state: Array<TWorkAbdExecuter>;
  setState: (value: Array<TWorkAbdExecuter>) => void;
  name: string;
};

export const DropdownListForSample: FC<TDropdownList> = ({
  data,
  state,
  setState,
  name,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Array<TWorkAbdExecuter>>([]);
  // const [selectedWorks, setSelectedWorks] = useState<Array<string>>([]);
  const [defaultState, setDefaultState] = useState<Array<string>>([]);
  // let inSelected = selectedWorks!.join(", ");

  const handlerClick = (index: number) => {
    let inArray = false;
    selected.map((work) => {
      if (work.id === data[index].id) {
        setSelected(
          selected.filter((currentWork) => {
            return currentWork.id !== data[index].id;
          })
        );
        setDefaultState(
          defaultState.filter((currentWorkName) => {
            return currentWorkName !== data[index].name;
          })
        )
        if (selected.length - 1 > 0) {
          setState(
            selected.filter((currentWork) => {
              return currentWork.id !== data[index].id;
            })
          );
        }
        inArray = true;
      }
    });
    if (!inArray) {
      // setSelectedWorks([...selectedWorks,data[index].id, data[index].name])
      setSelected([...selected, {id: data[index].id, name: data[index].name}]);
      setState([...selected, {id: data[index].id, name: data[index].name}]);
      setDefaultState([...defaultState, data[index].name])
    }
    console.log(defaultState);
  };

  // const textForState = (selectedWorks: string) => {
  //   if(inSelected.length < 1) inSelected += selectedWorks
  //   else inSelected += ', ' + selectedWorks
  //   return inSelected;
  // };

  // const arrForState = (selectedWorks: string[]) => {
  //   inSelected = selectedWorks.join(", ")
  //   return inSelected;
  // };

  useEffect(() => {
    // if (selected.length) {
    //   for (let i = 0; i < selected.length; i++) {
    //     setDefaultState([...defaultState, selected[i].name])
    //   }
    // }
  }, [selected, state]);

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
          {defaultState.length ? defaultState.join(", ") : <span className={styles.placeholder}>Выберите ...</span>}
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
                  if (item.id === selected[i].id) {
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
